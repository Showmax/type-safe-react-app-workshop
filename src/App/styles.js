// @flow
import bg from '../assets/bg.jpg';


export default {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#505050',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    padding: '60px 0',
    margin: '0 auto',
    width: '1000px',

    '@media (max-width: 1060px)': {
      width: 'auto',
      paddingLeft: '30px',
      paddingRight: '30px',
    }
  },
  gradient: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(63, 111, 160, 0.5))',
  },
  logoLink: {
    display: 'block',
    margin: '0 auto 30px',
    width: '200px',
  },
  logo: {
    width: '200px',
  },
};
