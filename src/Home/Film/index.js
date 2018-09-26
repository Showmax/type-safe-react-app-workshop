// @flow
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import { ArabicToRomanNumber } from '../../utils';
import type { HomePageFilm } from './__generated__/HomePageFilm';
import FilmPoster from '../FilmPoster';
import FavoritesToggle from '../FavoritesToggle';


export const HomePageFilmFragment = gql`
  fragment HomePageFilm on Film {
    id
    episodeID
    title
    poster
  }
`;

type Props = {
  film: HomePageFilm,
  favorite?: boolean,
  onAddToFavorites: (filmId: string) => mixed,
  onRemoveFromFavorites: (filmId: string) => mixed,
};

const Film = ({ film, favorite, onAddToFavorites, onRemoveFromFavorites }: Props) => {
  const episodeNumberRoman = film.episodeID != null ? ArabicToRomanNumber[film.episodeID] : 'UNKNOWN';
  const posterSubtitle = film.title || 'UNKNOWN';

  return (
    <Fragment>
      <Link to={`/film/${film.id}`} style={{ textDecoration: 'none' }}>
        <FilmPoster
          imageUrl={film.poster ? `http://localhost:8080${film.poster}` : ''}
          title={`Episode ${episodeNumberRoman}`}
          subtitle={posterSubtitle}
        />
      </Link>
      <FavoritesToggle
        toggleStatus={favorite ? 'active' : 'inactive'}
        onActivate={() => onAddToFavorites(film.id)}
        onDeactivate={() => onRemoveFromFavorites(film.id)}
      />
    </Fragment>
  );
};

export default Film;
