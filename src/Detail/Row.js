// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';


const styles = {
  row: {
    display: 'flex',
    justifyContent: 'stretch',

    '@media (max-width: 800px)': {
      display: 'block',
    },
  },
};

type Props = {
  children: Node,
  classes: { [string]: string },
};

const Row = ({ children, classes }: Props) => (
  <div className={classes.row}>{children}</div>
);


export default injectSheet(styles)(Row);
