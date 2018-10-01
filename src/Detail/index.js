// @flow
import React from 'react';
import type { Match } from 'react-router'

import { ArabicToRomanNumber } from '../utils';
import UserFavoritesData from '../UserFavoritesData';
import FilmDetailData from './FilmDetailData';
import Row from './Row';
import Column from './Column';
import Divider from './Divider';
import Poster from './Poster';
import Heading from './Heading';
import Actions from './Actions';
import FavoritesToggle from './FavoritesToggle';
import BackButton from './BackButton';
import Property from './Property';


type Props = {
  match: Match,
};

const Detail = ({ match }: Props) => {
  if (!match.params || !match.params.id) {
    return <div>Not found!</div>
  }

  const id = match.params.id;

  return (
    <UserFavoritesData>
      {(userFavoritesResult) => (
        <FilmDetailData id={id}>
          {(filmDetailResult) => {
            if (filmDetailResult.loading) return 'Loading...';

            if (filmDetailResult.failure) return `Error: ${filmDetailResult.error}`;

            const { addToFavorites, removeFromFavorites } = userFavoritesResult;
            const favoriteFilms = userFavoritesResult.success ? userFavoritesResult.favoriteFilms : [];
            const favorite = favoriteFilms.includes(id);

            const { film } = filmDetailResult;
            const episodeNumberRoman = film.episodeID != null ? ArabicToRomanNumber[film.episodeID] : 'UNKNOWN';

            return (
              <div>
                <Row>
                  <Poster url={film.poster} />
                  <Column>
                    <Heading
                      title={film.title || ''}
                      episodeNumber={episodeNumberRoman}
                    />
                  </Column>
                  <Column>
                    <Actions>
                      <FavoritesToggle
                        toggleState={favorite ? 'active' : 'inactive'}
                        onActivate={() => addToFavorites(id)}
                        onDeactivate={() => removeFromFavorites(id)}
                      />
                      <BackButton />
                    </Actions>
                  </Column>
                </Row>

                <Divider />

                <Row>
                  <Column>
                    {film.releaseDate && (
                      <Property
                        label="Release date:"
                        content={new Date(film.releaseDate).toLocaleDateString()}
                      />
                    )}
                    {film.director && <Property
                      label="Director:"
                      content={film.director}
                    />}
                    {film.characterConnection && film.characterConnection.characters && (
                      <Property
                        label="Characters:"
                        content={film.characterConnection.characters
                          .filter(Boolean)
                          .map((ch) => ch.name)
                          .join(', ')}
                      />
                    )}
                    {film.planetConnection && film.planetConnection.planets && (
                      <Property
                        label="Planets:"
                        content={film.planetConnection.planets
                          .filter(Boolean)
                          .map((p) => p.name)
                          .join(', ')}
                      />
                    )}
                  </Column>

                  <Column>
                    {film.openingCrawl && <Property
                      label="Opening crawl:"
                      content={film.openingCrawl}
                    />}
                  </Column>
                </Row>
              </div>
            );
          }}
        </FilmDetailData>
      )}
    </UserFavoritesData>
  );
};


export default Detail;
