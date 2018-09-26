// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';

const styles = {
  actions: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
};

type Props = {
  classes: { [string]: string },
  children: Node,
};
const Actions = ({ children, classes }: Props) => (
  <div className={classes.actions}>{children}</div>
);


export default injectSheet(styles)(Actions);
