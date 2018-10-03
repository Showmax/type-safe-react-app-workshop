// @flow
import React from 'react';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import HomePageData from './HomePageData';
import Film from './Film';


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
              {films.map((film) => (
                <FilmsListItem key={film.id}>
                  <Film
                    film={film}
                    isFavorite={favoriteFilmIds.includes(film.id)}
                    onAddToFavorites={addToFavorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                </FilmsListItem>
              ))}
            </FilmsList>
          );
        }}
      </HomePageData>
    );
  }
}


export default Home;
