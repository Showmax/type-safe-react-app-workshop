// @flow
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import uuid from 'uuid';

import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import FilmPoster from './FilmPoster';
import FavoritesToggle from './FavoritesToggle';
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
        title
        episodeID
        poster
      }
    }
    favorites(userId: $userId) {
      id
      films
    }
  }
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
                      {films.map(({ id, title, episodeID, poster }) => {
                        const posterTitle = (episodeID != null) ? `Episode ${episodeID}` : 'Unknown episode';
                        const posterSubtitle = title || '';
                        const posterImageUrl = poster && `http://localhost:8080${poster}`;

                        return (
                          <FilmsListItem key={id}>
                            <Link to={`/film/${id}`} style={{ textDecoration: 'none' }}>
                              <FilmPoster
                                title={posterTitle}
                                subtitle={posterSubtitle}
                                imageUrl={posterImageUrl}
                              />
                            </Link>
                            <FavoritesToggle
                              toggleStatus={favoriteFilmIds.includes(id) ? 'active' : 'inactive'}
                              onActivate={() => {
                                addToFavorites({ variables: { userId, filmId: id } });
                              }}
                              onDeactivate={() => {
                                removeFromFavorites({ variables: { userId, filmId: id } });
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
