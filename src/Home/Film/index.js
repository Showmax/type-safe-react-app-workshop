// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import FilmPoster from '../FilmPoster';
import FavoritesToggle from '../FavoritesToggle';
import type { FilmFragment as FilmType } from './__generated__/FilmFragment';


export const FilmFragment = gql`
  fragment FilmFragment on Film {
    id
    episodeID
    title
    poster
  }
`;

type Props = {
  film: FilmType,
  isFavorite: boolean,
  onAddToFavorites: (filmId: string) => mixed,
  onRemoveFromFavorites: (filmId: string) => mixed,
};

const Film = ({ film, isFavorite, onAddToFavorites, onRemoveFromFavorites }: Props) => {
  const { id, episodeID, title, poster } = film;

  const posterTitle = (episodeID != null) ? `Episode ${episodeID}` : 'Unknown episode';
  const posterSubtitle = title || '';
  const posterImageUrl = poster && `http://localhost:8080${poster}`;

  return (
    <React.Fragment>
      <Link to={`/film/${id}`} style={{ textDecoration: 'none' }}>
        <FilmPoster
          title={posterTitle}
          subtitle={posterSubtitle}
          imageUrl={posterImageUrl}
        />
      </Link>
      <FavoritesToggle
        toggleStatus={isFavorite ? 'active' : 'inactive'}
        onActivate={() => { onAddToFavorites(id); }}
        onDeactivate={() => { onRemoveFromFavorites(id); }}
      />
    </React.Fragment>
  );
};


export default Film;
