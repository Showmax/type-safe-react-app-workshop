// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';


const styles = {
  col: {
    width: '50%',
    padding: '0 15px',

    '@media (max-width: 800px)': {
      width: 'auto',
      padding: 0,
    }
  },
};

type Props = {
  children: Node,
  classes: { [string]: string },
};

const Column = ({ children, classes }: Props) => (
  <div className={classes.col}>{children}</div>
);


export default injectSheet(styles)(Column);
