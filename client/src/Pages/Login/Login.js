// ------------imports---------------
import React from 'react';
import { Container, Avatar, Typography, TextField, Button, makeStyles, Grid } from '@material-ui/core';
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  // state
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                autoFocus
                inputRef={register({ required: true })}
              />
              {errors.email && (
                <Typography align='inherit' color='error' variant='subtitle1'>
                  {'Please add a valid Email'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
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
                inputRef={register({ required: true, minLength: 6 })}
              />
              {errors.password && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {'Please add a Password!( Password must be more than 6 character)'}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
