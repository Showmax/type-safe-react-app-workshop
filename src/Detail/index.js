// @flow
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FilmDetailData from './FilmDetailData';
import type { Match } from 'react-router'

type Props = {
  match: Match,
};
 
class Detail extends React.Component<Props> {
  render() {
    const { match } = this.props; 

    if (!match.params || !match.params.id) {
      return <div>Not found!</div>
    }

    return (
      <FilmDetailData id={match.params.id}>
        {(filmDetailResult) => {
          if (filmDetailResult.loading) { return 'Loading...'; }

          if (filmDetailResult.failure) {
            return `Error: ${filmDetailResult.error}`;
          }

          const { film } = filmDetailResult;

          return (
            <div>
              <h1>Episode {film.episodeID}: {film.title}</h1>

              {film.releaseDate && <div>
                Release date: {new Date(film.releaseDate).toLocaleDateString()}
              </div>}
              <div>
                Director: {film.director}
              </div>
              <div>
                Opening crawl: {film.openingCrawl}
              </div>
              {film.characterConnection && film.characterConnection.characters && <div>
                Characters: {film.characterConnection.characters.filter(Boolean).map((ch) => ch.name).join(', ')}
              </div>}
              {film.planetConnection && film.planetConnection.planets && <div>
                Planets: {film.planetConnection.planets.filter(Boolean).map((p) => p.name).join(', ')}
              </div>}
            </div>
          );
        }}
      </FilmDetailData>
    );
  }
}


export default Detail;