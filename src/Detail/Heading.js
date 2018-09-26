// @flow
import React from 'react';
import injectSheet from 'react-jss';

import { YELLOW } from '../styleConstants';


const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  episodeNumber: {
    fontSize: `${1.62 * 1.62}em`,
    fontWeight: 300,
    color: YELLOW,
  },
  title: {
    fontSize: '1.62em',
    fontWeight: 700,
    color: YELLOW,
  },
};

type Props = {
  title: string,
  episodeNumber: string,
  classes: { [string]: string },
};

const Heading = ({ title, episodeNumber, classes }: Props) => (
  <div className={classes.container}>
    <h1 className={classes.episodeNumber}>Episode {episodeNumber}</h1>
    <h2 className={classes.title}>{title}</h2>
  </div>
);


export default injectSheet(styles)(Heading);
