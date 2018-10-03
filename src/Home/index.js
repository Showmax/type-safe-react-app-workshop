// @flow
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Cookies from 'js-cookie';
import uuid from 'uuid';

import Film, { FilmFragment } from './Film';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import type { FilmsData as FilmsDataType, FilmsDataVariables } from './__generated__/FilmsData';
import type {
  AddToFavoritesMutation as AddToFavoritesMutationResult,
  AddToFavoritesMutationVariables,
} from './__generated__/AddToFavoritesMutation';
import type {
  RemoveFromFavoritesMutation as RemoveFromFavoritesMutationResult,
  RemoveFromFavoritesMutationVariables,
} from './__generated__/RemoveFromFavoritesMutation';

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

type State = {
  userId: string,
};

class Home extends React.Component<{}, State> {
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
      userId: Home.getUserId(),
    };
  }

  render() {
    const { userId } = this.state;

    return (
      <AddToFavoritesMutation mutation={addToFavoritesMutation}>
        {(addToFavorites) => (
          <RemoveFromFavoritesMutation mutation={removeFromFavoritesMutation}>
            {(removeFromFavorites) => (
              <FilmsQuery query={query} variables={{ userId }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Home page is loading...</p>;
                  if (error) return <p>Error happened! {error.message}</p>;
                  if (!data || !data.allFilms || !data.allFilms.films) return <p>Unexpected query result</p>;

                  const films = data.allFilms.films.filter(Boolean);
                  const favoriteFilmIds = data.favorites ? data.favorites.films : [];

                  return (
                    <FilmsList>
                      {films.map((film) => {
                        const filmId = film.id;

                        return (
                          <FilmsListItem key={filmId}>
                            <Film
                              film={film}
                              isFavorite={favoriteFilmIds.includes(filmId)}
                              onAddToFavorites={() => {
                                addToFavorites({ variables: { userId, filmId } });
                              }}
                              onRemoveFromFavorites={() => {
                                removeFromFavorites({ variables: { userId, filmId } });
                              }}
                            />
                          </FilmsListItem>
                        );
                      })}
                    </FilmsList>
                  );
                }}
              </FilmsQuery>
            )}
          </RemoveFromFavoritesMutation>
        )}
      </AddToFavoritesMutation>
    );
  }
}


export default Home;
