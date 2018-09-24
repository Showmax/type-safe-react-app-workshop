// @flow
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import { ArabicToRomanNumber } from '../../utils';
import type { HomePageFilm } from './__generated__/HomePageFilm';
import e1Thumb from '../../assets/e1.jpg';
import e2Thumb from '../../assets/e2.jpg';
import e3Thumb from '../../assets/e3.jpg';
import e4Thumb from '../../assets/e4.jpg';
import e5Thumb from '../../assets/e5.jpg';
import e6Thumb from '../../assets/e6.jpg';
import e7Thumb from '../../assets/e7.jpg';
import FilmPoster from '../FilmPoster';
import FavoritesToggle from '../FavoritesToggle';


const Images = {
  e1: e1Thumb,
  e2: e2Thumb,
  e3: e3Thumb,
  e4: e4Thumb,
  e5: e5Thumb,
  e6: e6Thumb,
  e7: e7Thumb,
};

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
  const episodeNumberRoman = film.episodeID != null ? ArabicToRomanNumber[film.episodeID] : 'UNKNOWN';
  const posterSubtitle = film.title || 'UNKNOWN';

  return (
    <Fragment>
      <Link to={`/film/${film.id}`} style={{ textDecoration: 'none' }}>
        <FilmPoster
          imageUrl={film.episodeID ? Images['e' + film.episodeID] : null}
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
