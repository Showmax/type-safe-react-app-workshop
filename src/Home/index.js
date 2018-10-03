// @flow
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import FilmPoster from './FilmPoster';

const query = gql`
  query FilmsData {
    allFilms {
      films {
        id
        title
        episodeID
        poster
      }
    }
  }
`;

type FilmsDataType = {
  allFilms: ?{
    films: $ReadOnlyArray<?{
      id: string,
      title: ?string,
      episodeID: ?number,
      poster: ?string,
    }>
  }
};

class FilmsQuery extends Query<FilmsDataType, {}> {}

const Home = () => (
  <FilmsQuery query={query}>
    {({ loading, error, data }) => {
      if (loading) return <p>Home page is loading...</p>;
      if (error) return <p>Error happened! {error.message}</p>;
      if (!data || !data.allFilms) return <p>Unexpected query result</p>;

      const films = data.allFilms.films.filter(Boolean);

      return (
        <FilmsList>
          {films.map(({ id, title, episodeID, poster }) => {
            const posterTitle = (episodeID != null) ? `Episode ${episodeID}` : 'Unknown episode';
            const posterSubtitle = title || '';
            const posterImageUrl = poster && `http://localhost:8080${poster}`;

            return (
              <FilmsListItem key={id}>
                <Link to={`/film/${id}`} style={{ textDecoration: 'none' }}>
                  <FilmPoster
                    title={posterTitle}
                    subtitle={posterSubtitle}
                    imageUrl={posterImageUrl}
                  />
                </Link>
              </FilmsListItem>
            );
          })}
        </FilmsList>
      )
    }}
  </FilmsQuery>
);


export default Home;
