// ------------imports---------------
import React from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import mainImage from '../../assets/main.jpg';
// ------------end imports-----------

const useStyles = makeStyles({
  root: {
    background: `url(${mainImage})`,
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const classes = useStyles();
  // jsx
  return (
    <Box className={classes.root}>
      <Box></Box>
    </Box>
  );
};

export default Home;
