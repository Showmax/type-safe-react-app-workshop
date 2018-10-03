// @flow
import React from 'react';

import Film from './Film';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import HomePageData from './HomePageData';


class Home extends React.Component<{}> {
  render() {
    return (
      <HomePageData>
        {(result) => {
          if (result.loading) return <p>Home page is loading...</p>;
          if (result.failure) return <p>Error happened! {result.error}</p>;

          const { films, favoriteFilmIds, addToFavorites, removeFromFavorites } = result;

          return (
            <FilmsList>
              {films.map((film) => {
                const filmId = film.id;

                return (
                  <FilmsListItem key={filmId}>
                    <Film
                      film={film}
                      isFavorite={favoriteFilmIds.includes(filmId)}
                      onAddToFavorites={addToFavorites}
                      onRemoveFromFavorites={removeFromFavorites}
                    />
                  </FilmsListItem>
                );
              })}
            </FilmsList>
          );
        }}
      </HomePageData>
    );
  }
}


export default Home;
