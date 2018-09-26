// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

import { YELLOW } from '../styleConstants';


const styles = {
  button: {
    display: 'inline-block',
    padding: '.5em 1.5em',
    userSelect: 'none',
    cursor: 'pointer',
    transition: 'color 200ms ease-out, background 200ms ease-out',
    border: `1px solid ${YELLOW}`,
    borderRadius: '100em',
    textDecoration: 'none',
    marginTop: '15px',
    color: YELLOW,

    '&:hover, &.active': {
      color: '#505050',
      background: YELLOW,
    },
  },

  star: {
    display: 'inline-block',
    marginRight: '15px',
  },
};

type Props = {
  toggleState: 'active' | 'inactive';
  onActivate: () => mixed,
  onDeactivate: () => mixed,
  classes: { [string]: string },
};

const FavoritesToggle = ({ toggleState, onActivate, onDeactivate, classes }: Props) => (
  <div
    className={classNames(classes.button, { active: toggleState === 'active' })}
    onClick={() => toggleState === 'active'
      ? onDeactivate()
      : onActivate()}
  >
    <span className={classes.star}>{'\u2605'}</span>
    {toggleState === 'active'
      ? 'Remove from favorites'
      : 'Add to favorites'}
  </div>
);


export default injectSheet(styles)(FavoritesToggle);
