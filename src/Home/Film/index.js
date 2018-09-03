// @flow
import React from 'react';
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
};

const Film = ({ film }: Props) => {
  return (
    <Link to={`/film/${film.id}`}>
      Episode {film.episodeID}
      <br />
      {film.title}
    </Link>
  );
};

export default Film;