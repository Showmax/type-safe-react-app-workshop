// @flow
import React from 'react';

import Film from './Film';
import FilmsData from './FilmsData';
import UserFavoritesData from '../UserFavoritesData';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';


const Home = () => (
  <UserFavoritesData>
    {(userFavoritesResult) => {
      const { addToFavorites, removeFromFavorites } = userFavoritesResult;
      const favoriteFilms = userFavoritesResult.success ? userFavoritesResult.favoriteFilms : [];

      return (
        <FilmsData>
          {(result) => {
            if (result.loading) return 'Loading Home';

            if (result.failure) return 'Error happened!';

            const films = result.films
              .sort((film1, film2) => {
                if (film1.episodeID == null || film2.episodeID == null) {
                  return 0;
                }

                return film1.episodeID - film2.episodeID;
              });

            return (
              <FilmsList>
                {films.map((film) => (
                  <FilmsListItem>
                    <Film
                      film={film}
                      favorite={favoriteFilms.includes(film.id)}
                      onAddToFavorites={addToFavorites}
                      onRemoveFromFavorites={removeFromFavorites}
                    />
                  </FilmsListItem>
                ))}
              </FilmsList>
            );
          }}
        </FilmsData>
      );
    }
    }
  </UserFavoritesData>
);


export default Home;
