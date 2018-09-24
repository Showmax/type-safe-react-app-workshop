// @flow
import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';


const YELLOW = '#ffe81e';

const styles = {
  favorite: {
    height: '30px',
    width: '30px',
    borderRadius: '100em',
    border: `1px solid ${YELLOW}`,
    color: YELLOW,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background 200ms ease-in-out, color 200ms ease-in-out',

    '&.active': {
      background: YELLOW,
      color: '#505050',
    },
  }
};

type Props = {
  classes: { [string]: string },
  toggleStatus: 'active' | 'inactive',
  onActivate: () => mixed,
  onDeactivate: () => mixed,
};

const FavoritesToggle = ({ classes, toggleStatus, onActivate, onDeactivate }: Props) => {
  return (
    <div
      className={classNames(classes.favorite, { active: toggleStatus === 'active' })}
      onClick={toggleStatus === 'active' ? onDeactivate : onActivate}
    >
      {'\u2605'}
    </div>
  );
};

export default injectSheet(styles)(FavoritesToggle);
