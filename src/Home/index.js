// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import FilmsList from './FilmsList';
import FilmsListItem from './FilmsListItem';
import FilmPoster from './FilmPoster';
import FavoritesToggle from './FavoritesToggle';
import HomePageData from './HomePageData';


class Home extends React.Component<{}> {
  render() {
    return (
      <HomePageData>
        {(result) => {
          if (result.loading) return <p>Home page is loading...</p>;
          if (result.failure) return <p>Error happened! {result.error}</p>;

          const { films, favoriteFilmIds, addToFavorites, removeFromFavorites } = result;

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
                    <FavoritesToggle
                      toggleStatus={favoriteFilmIds.includes(id) ? 'active' : 'inactive'}
                      onActivate={() => { addToFavorites(id); }}
                      onDeactivate={() => { removeFromFavorites(id); }}
                    />
                  </FilmsListItem>
                );
              })}
            </FilmsList>
          );
        }}
      </HomePageData>
    );
  }
}


export default Home;
