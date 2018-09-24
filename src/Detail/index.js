// @flow
import React from 'react';
import type { Match } from 'react-router'
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ArabicToRomanNumber } from '../utils';
import UserFavoritesData from '../UserFavoritesData';
import FilmDetailData from './FilmDetailData';
import styles from './styles';


type Props = {
  match: Match,
  classes: {[string]: string}
};

const Detail = ({ match, classes }: Props) => {
  if (!match.params || !match.params.id) {
    return <div>Not found!</div>
  }

  const id = match.params.id;

  return (
    <UserFavoritesData>
      {
        (userFavoritesResult) => {
          const { addToFavorites, removeFromFavorites } = userFavoritesResult;
          const favoriteFilms = userFavoritesResult.success ? userFavoritesResult.favoriteFilms : [];
          const favorite = favoriteFilms.includes(id);

          return (
            <FilmDetailData id={id}>
              {(filmDetailResult) => {
                if (filmDetailResult.loading) { return 'Loading...'; }

                if (filmDetailResult.failure) {
                  return `Error: ${filmDetailResult.error}`;
                }

                const { film } = filmDetailResult;
                const episodeNumberRoman = film.episodeID != null ? ArabicToRomanNumber[film.episodeID] : 'UNKNOWN';

                return (
                  <div className={classes.container}>
                    <div className={classes.row}>
                      <div className={classes.poster} style={{ backgroundImage: film.poster ? `url(http://localhost:8080${film.poster})`: '' }} />
                      <div className={`${classes.col} ${classes.heading}`}>
                        <h1 className={classes.episodeNumber}>Episode {episodeNumberRoman}</h1>
                        <h2 className={classes.title}>{film.title}</h2>
                      </div>
                      <div className={`${classes.col} ${classes.actions}`}>
                        <Link to="/" className={classes.backButton}>Back to home</Link>
                        <div
                          className={classNames(classes.favoriteButton, { active: favorite })}
                          onClick={() => favorite
                            ? removeFromFavorites(id)
                            : addToFavorites(id)}
                        >
                          <span className={classes.favoriteStar}>{'\u2605'}</span>
                          {favorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'}
                        </div>
                      </div>
                    </div>

                    <div className={classes.divider} />

                    <div className={classes.row}>
                      <div className={classes.col}>
                        {film.releaseDate && <div>
                          <div className={classes.label}>Release date:</div> {new Date(film.releaseDate).toLocaleDateString()}
                        </div>}
                        <div>
                          <div className={classes.label}>Director:</div> {film.director}
                        </div>
                        {film.characterConnection && film.characterConnection.characters && <div>
                          <div className={classes.label}>Characters:</div> {film.characterConnection.characters.filter(Boolean).map((ch) => ch.name).join(', ')}
                        </div>}
                        {film.planetConnection && film.planetConnection.planets && <div>
                          <div className={classes.label}>Planets:</div> {film.planetConnection.planets.filter(Boolean).map((p) => p.name).join(', ')}
                        </div>}
                      </div>

                      <div className={classes.col}>
                        <div className={classes.label}>Opening crawl:</div> {film.openingCrawl}
                      </div>
                    </div>
                  </div>
                );
              }}
            </FilmDetailData>
          );
        }
      }
    </UserFavoritesData>
  );
};


export default injectSheet(styles)(Detail);
