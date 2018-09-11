// @flow
import React from 'react';
import injectSheet from 'react-jss';

import Film from './Film';
import FilmsData from './FilmsData';
import UserFavoritesData from '../UserFavoritesData';
import styles from './styles';


const Home = ({ classes }) => (
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
              <ul className={classes.list}>
                {films.map((film) => (
                  <li className={classes.item}>
                    <Film
                      film={film}
                      favorite={favoriteFilms.includes(film.id)}
                      onAddToFavorites={addToFavorites}
                      onRemoveFromFavorites={removeFromFavorites}
                    />
                  </li>
                ))}
              </ul>
            );
          }}
        </FilmsData>
      );
    }
    }
  </UserFavoritesData>
);


export default injectSheet(styles)(Home);
