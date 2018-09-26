// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';


const styles = {
  backButton: {
    display: 'inline-block',
    padding: '.5em 1.5em',
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'color 200ms ease-out, background 200ms ease-out',
    borderRadius: '100em',
    border: `1px solid #fff`,
    textDecoration: 'none',
    color: '#fff',
    marginTop: '15px',

    '&:hover': {
      background: '#fff',
      color: '#505050',
    },

    '@media (max-width: 800px)': {
      marginRight: '15px',
    },
  },
};

type Props = {
  classes: { [string]: string },
};

const BackButton = ({ classes }: Props) => (
  <Link to="/" className={classes.backButton}>Back to home</Link>
);


export default injectSheet(styles)(BackButton);
