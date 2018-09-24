// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';


const styles = {
  item: {
    margin: '0 15px 30px',
  },
};

type Props = {
  classes: { [string]: string },
  children: Node,
};

const FilmsListItem = ({ classes, children }: Props) => (
  <li className={classes.item}>{children}</li>
);


export default injectSheet(styles)(FilmsListItem);
