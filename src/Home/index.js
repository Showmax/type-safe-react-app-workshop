// @flow
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import Film, { HomePageFilmFragment } from './Film';
import FilmsData from './FilmsData';


class Home extends React.Component<{}> {
  render() {
    return (
      <FilmsData>
        {(result) => {
          if (result.loading) return 'Loading Home';

          if (result.failure) return 'Error happened!';

          const films = result.films
            .sort((film1, film2) => {
              if (film1.episodeID == null || film2.episodeID == null) {
                return 0;
              }

              return film1.episodeID - film2.episodeID;
            });

          return (
            <ul>
              {films.map((film) => (
                <li>
                  <Film film={film}/>
                </li>
              ))}
            </ul>
          );
        }}
      </FilmsData>
    );
  }
}

export default Home;