// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';


const styles = {
  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
};

type Props = {
  classes: { [string]: string },
  children: Node,
};

const FilmsList = ({ classes, children }: Props) => (
  <ul className={classes.list}>{children}</ul>
);


export default injectSheet(styles)(FilmsList);
