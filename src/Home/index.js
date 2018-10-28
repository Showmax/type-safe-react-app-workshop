// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { ApolloClient } from 'react-apollo';

import Film from './Film';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import useHomePageData from './useHomePageData';

type Context = {
  client: ApolloClient<{}>,
};

function Home(_: {}, context: Context) {
  const result = useHomePageData(context.client);

  if (result.loading) return <p>Home page is loading...</p>;
  if (result.failure) return <p>Error happened! {result.error}</p>;

  const { films, favoriteFilmIds } = result;

  return (
    <FilmsList>
      {films.map((film) => {
        const filmId = film.id;

        return (
          <FilmsListItem key={filmId}>
            <Film
              film={film}
              isFavorite={favoriteFilmIds.includes(filmId)}
              onAddToFavorites={() => alert('not implemented')}
              onRemoveFromFavorites={() => alert('not implemented')}
            />
          </FilmsListItem>
        );
      })}
    </FilmsList>
  );
}

Home.contextTypes = {
  client: PropTypes.object,
};


export default Home;
