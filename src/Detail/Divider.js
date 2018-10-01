// @flow
import React from 'react';
import injectSheet from 'react-jss';


const styles = {
  divider: {
    background: '#fff',
    height: '2px',
    margin: '15px 15px',

    '@media (max-width: 800px)': {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },
  },
};

type Props = {
  classes: { [string]: string },
};

const Divider = ({ classes }: Props) => (
  <div className={classes.divider} />
);


export default injectSheet(styles)(Divider);
