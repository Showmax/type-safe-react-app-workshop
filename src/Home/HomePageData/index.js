// @flow
import React from 'react';
import type { Node } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Cookies from 'js-cookie';
import uuid from 'uuid';

import type {
  FilmsData as FilmsDataType,
  FilmsData_allFilms_films as Film,
  FilmsDataVariables,
} from './__generated__/FilmsData';
import type {
AddToFavoritesMutation as AddToFavoritesMutationResult,
AddToFavoritesMutationVariables,
} from './__generated__/AddToFavoritesMutation';
import type {
RemoveFromFavoritesMutation as RemoveFromFavoritesMutationResult,
RemoveFromFavoritesMutationVariables,
} from './__generated__/RemoveFromFavoritesMutation';
import { FilmFragment } from '../Film'


const query = gql`
  query FilmsData($userId: ID!) {
    allFilms {
      films {
        id
        ...FilmFragment
      }
    }
    favorites(userId: $userId) {
      id
      films
    }
  }
  ${FilmFragment}
`;

const addToFavoritesMutation = gql`
  mutation AddToFavoritesMutation($userId: ID!, $filmId: ID!) {
    addToFavorites(userId: $userId, filmId: $filmId) {
      id
      films
    }
  }
`;

const removeFromFavoritesMutation = gql`
  mutation RemoveFromFavoritesMutation($userId: ID!, $filmId: ID!) {
    removeFromFavorites(userId: $userId, filmId: $filmId) {
      id
      films
    }
  }
`;

class FilmsQuery extends Query<FilmsDataType, FilmsDataVariables> {}
class AddToFavoritesMutation
  extends Mutation<AddToFavoritesMutationResult, AddToFavoritesMutationVariables> {}
class RemoveFromFavoritesMutation
  extends Mutation<RemoveFromFavoritesMutationResult, RemoveFromFavoritesMutationVariables> {}

type ResultLoading = {|
  loading: true,
  addToFavorites: (filmId: string) => mixed,
  removeFromFavorites: (filmId: string) => mixed,
|};

type ResultFailure = {|
  failure: true,
  error: string,
  addToFavorites: (filmId: string) => mixed,
  removeFromFavorites: (filmId: string) => mixed,
|};

type ResultSuccess = {|
  success: true,
  films: $ReadOnlyArray<Film>,
  favoriteFilmIds: $ReadOnlyArray<string>,
  addToFavorites: (filmId: string) => mixed,
  removeFromFavorites: (filmId: string) => mixed,
|};

type Props = {
  children: (ResultLoading | ResultFailure | ResultSuccess) => Node,
};

type State = {
  userId: string,
};

class HomePageData extends React.Component<Props, State> {
  static getUserId(): string {
    let userId = Cookies.get('sw_user_id');

    if (!userId) {
      userId = uuid();
      Cookies.set('sw_user_id', userId);
    }

    return userId;
  }

  constructor() {
    super();

    this.state = {
      userId: HomePageData.getUserId(),
    };
  }

  render() {
    const { userId } = this.state;

    return (
      <AddToFavoritesMutation mutation={addToFavoritesMutation}>
        {(addToFavoritesMutate) => (
          <RemoveFromFavoritesMutation mutation={removeFromFavoritesMutation}>
            {(removeFromFavoritesMutate) => (
              <FilmsQuery query={query} variables={{ userId }}>
                {({ loading, error, data }) => {
                  const addToFavorites = (filmId: string) => addToFavoritesMutate({ variables: { userId, filmId } });
                  const removeFromFavorites = (filmId: string) => removeFromFavoritesMutate({ variables: { userId, filmId } });

                  if (loading) {
                    return this.props.children({ loading: true, addToFavorites, removeFromFavorites});
                  }

                  if (error) {
                    return this.props.children({
                      failure: true,
                      error: error.message,
                      addToFavorites,
                      removeFromFavorites,
                    });
                  }

                  if (!data || !data.allFilms || !data.allFilms.films) {
                    return this.props.children({
                      failure: true,
                      error: 'HomePageData: Unexpected result of the FilmsData query',
                      addToFavorites,
                      removeFromFavorites,
                    });
                  }

                  const films = data.allFilms.films.filter(Boolean);
                  const favoriteFilmIds = data.favorites ? data.favorites.films : [];

                  return this.props.children({
                    success: true,
                    films,
                    favoriteFilmIds,
                    addToFavorites,
                    removeFromFavorites,
                  });
                }}
              </FilmsQuery>
            )}
          </RemoveFromFavoritesMutation>
        )}
      </AddToFavoritesMutation>
    );
  }
}


export default HomePageData;
