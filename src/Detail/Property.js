// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { YELLOW } from '../styleConstants';


const styles = {
  label: {
    fontWeight: 700,
    color: YELLOW,
  },
};

type Props = {
  label: string,
  content: string,
  classes: { [string]: string },
};

const Property = ({ label, content, classes }: Props) => (
  <div>
    <div className={classes.label}>{label}</div> {content}
  </div>
);


export default injectSheet(styles)(Property);
