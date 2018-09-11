// @flow
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import injectSheet from 'react-jss';
import classNames from 'classnames';

import { ArabicToRomanNumber } from '../../utils';

import type { HomePageFilm } from './__generated__/HomePageFilm';

import e1Thumb from '../../assets/e1.jpg';
import e2Thumb from '../../assets/e2.jpg';
import e3Thumb from '../../assets/e3.jpg';
import e4Thumb from '../../assets/e4.jpg';
import e5Thumb from '../../assets/e5.jpg';
import e6Thumb from '../../assets/e6.jpg';
import e7Thumb from '../../assets/e7.jpg';

import styles from './styles';


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
  classes: { [string]: string },
  film: HomePageFilm,
  favorite?: boolean,
  onAddToFavorites: (filmId: string) => mixed,
  onRemoveFromFavorites: (filmId: string) => mixed,
};

const Film = ({ film, favorite, onAddToFavorites, onRemoveFromFavorites, classes }: Props) => {
  return (
    <Fragment>
      <Link to={`/film/${film.id}`} className={classes.link}>
        <div
          className={classes.poster}
          style={{
            backgroundImage: film.episodeID && `url(${Images['e' + film.episodeID]})`,
          }}
        >
        </div>
        <div className={classes.episodeNumber}>Episode {ArabicToRomanNumber[film.episodeID]}</div>
        <div className={classes.title}>{film.title}</div>
      </Link>
      <div
        className={classNames(classes.favorite, { active: favorite })}
        onClick={() => favorite ? onRemoveFromFavorites(film.id) : onAddToFavorites(film.id)}
      >
        {'\u2605'}
      </div>
    </Fragment>
  );
};

export default injectSheet(styles)(Film);
