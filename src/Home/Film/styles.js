const YELLOW = '#ffe81e';

export default {
  poster: {
    width: '166px',
    height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    marginBottom: '15px',
    borderRadius: '4px',
    transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
  },
  link: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    width: '166px',

    '&:hover $episodeNumber, &:hover $title': {
      color: YELLOW,
    },

    '&:hover $poster': {
      boxShadow: '0 0 20px 0 rgba(255, 232, 30, .8)',
    },
  },
  episodeNumber: {
    fontSize: '1.62em',
    fontWeight: 300,
    transition: 'color 300ms ease-out'
  },
  title: {
    lineHeight: 1.2,
    fontWeight: 700,
    transition: 'color 300ms ease-out',
    height: '40px',
  },
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

    '&:hover, &.active': {
      background: YELLOW,
      color: '#505050',
    },
  },
};
