// @flow
import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';
import type { HomeData } from './__generated__/HomeData';


class FilmsQuery extends Query<HomeData, {}> {};

class Home extends React.Component<{}> {
  render() {
    return (
      <FilmsQuery
        query={gql`
          query HomeData {
            allFilms {
              films {
                id
                title
                episodeID
              }
            }
          }
        `}
      >
        {(queryResult) => {
          const { loading, error, data } = queryResult;

          if (loading) { return 'Loading Home'; }
          if (error) { return 'Error' + error.message; }
          if (!data || !data.allFilms || !data.allFilms.films) { return 'Unknown graphtql error'; }

          return (
            <ul>
              {data.allFilms.films.filter(Boolean).map((film) => (
                <li>
                  <Link to={`/film/${film.id}`}>
                    Episode {film.episodeID}
                    <br />
                    {film.title}
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </FilmsQuery>
    );
  }
}

export default Home;