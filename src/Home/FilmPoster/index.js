// @flow
import React from 'react';
import injectSheet from 'react-jss';

const YELLOW = '#ffe81e';

const styles = {
  poster: {
    display: 'block',
    color: '#fff',
    width: '166px',
    textDecoration: 'none',

    '&:hover $episodeNumber, &:hover $title': {
      color: YELLOW,
    },

    '&:hover $image': {
      boxShadow: '0 0 20px 0 rgba(255, 232, 30, .8)',
    },
  },

  image: {
    width: '166px',
    height: '250px',
    backgroundColor: '#1a1a1a',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    marginBottom: '15px',
    borderRadius: '4px',
    transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
  },

  episodeNumber: {
    fontSize: '1.62em',
    fontWeight: 300,
    transition: 'color 300ms ease-out'
  },

  title: {
    lineHeight: 1.2,
    fontWeight: 700,
    transition: 'color 300ms ease-out',
    height: '40px',
  },
};

type Props = {
  classes: { [string]: string },
  imageUrl: ?string,
  title: string,
  subtitle: string,
};

const FilmPoster = ({ classes, imageUrl, title, subtitle }: Props) => (
  <div className={classes.poster}>
    <div
      className={classes.image}
      style={{
        backgroundImage: imageUrl && `url(${imageUrl})`,
      }}
    >
    </div>
    <div className={classes.episodeNumber}>{title}</div>
    <div className={classes.title}>{subtitle}</div>
  </div>
);


export default injectSheet(styles)(FilmPoster);
