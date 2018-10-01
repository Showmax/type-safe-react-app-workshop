// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './styles';


type Props = {
  classes: { [string]: string },
  children: Node,
};

const AppLayout = ({ classes, children }: Props) => (
  <div className={classes.container}>
    <div className={classes.gradient} />
    <div className={classes.content}>
      <Link to="/" className={classes.logoLink}>
        <img src={logo} className={classes.logo} alt="logo" />
      </Link>
      {children}
    </div>
  </div>
);


export default injectSheet(styles)(AppLayout);
