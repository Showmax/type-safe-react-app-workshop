// @flow
const YELLOW = '#ffe81e';

const Button = {
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
}

export default {
  row: {
    display: 'flex',
    justifyContent: 'stretch',

    '@media (max-width: 800px)': {
      display: 'block',
    },
  },
  col: {
    width: '50%',
    padding: '0 15px',

    '@media (max-width: 800px)': {
      width: 'auto',
      padding: 0,
    }
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
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
  actions: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    '@media (max-width: 800px)': {
      width: 'auto',
      display: 'block',
    },
  },

  backButton: {
    ...Button,

    '@media (max-width: 800px)': {
      marginRight: '15px',
    },
  },
  favoriteButton: {
    ...Button,
    borderColor: YELLOW,
    color: YELLOW,

    '&:hover, &.active': {
      color: '#505050',
      background: YELLOW,
    },
  },
  favoriteStar: {
    display: 'inline-block',
    marginRight: '15px',
  },
  episodeNumber: {
    fontSize: `${1.62 * 1.62}em`,
    fontWeight: 300,
    color: YELLOW,
  },
  title: {
    fontSize: '1.62em',
    fontWeight: 700,
    color: YELLOW,
  },
  label: {
    fontWeight: 700,
    color: YELLOW,
  },
};
