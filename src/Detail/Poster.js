// @flow
import React from 'react';
import injectSheet from 'react-jss';


const styles = {
  poster: {
    width: '166px',
    height: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    background: '#1a1a1a',
    borderRadius: '4px',
    margin: '0 0 0 15px',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',

    '@media (max-width: 800px)': {
      margin: 0,
    },
  },
};

type Props = {
  url?: ?string,
  classes: { [string]: string },
};

const Poster = ({ url, classes }: Props) => (
  <div
    className={classes.poster}
    style={{ backgroundImage: url ? `url(http://localhost:8080${url})`: '' }}
  />
);


export default injectSheet(styles)(Poster);
