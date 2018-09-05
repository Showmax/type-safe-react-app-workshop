// @flow
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import type { HomePageFilm } from './__generated__/HomePageFilm';

export const HomePageFilmFragment = gql`
  fragment HomePageFilm on Film {
    id
    episodeID
    title
  }
`;

type Props = {
  film: HomePageFilm,
  favorite?: boolean,
  onAddToFavorites: (filmId: string) => mixed,
  onRemoveFromFavorites: (filmId: string) => mixed,
};

const Film = ({ film, favorite, onAddToFavorites, onRemoveFromFavorites }: Props) => {
  return (
    <Fragment>
      <Link to={`/film/${film.id}`}>
        Episode {film.episodeID}
      </Link>
      <br />
      {favorite 
        ? <span onClick={() => onRemoveFromFavorites(film.id)}>{'\u2605'}</span> 
        : <span onClick={() => onAddToFavorites(film.id)}>{'\u2606'}</span>}
    </Fragment>
  );
};

export default Film;