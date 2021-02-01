// ------------imports---------------
import React from 'react';
import { Container, Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';
// ------------end imports-----------

// material ui style
const useStyles = makeStyles((theme) => ({
  login: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  // state
  const { register, handleSubmit, errors } = useForm();
  // style
  const classes = useStyles();
  // method
  const onSubmit = (data) => {
    console.log(data);
  };
  // jsx
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.login}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
