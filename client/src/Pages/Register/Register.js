// ------------imports---------------
import React, { memo, useEffect } from 'react';
import { Container, Avatar, Typography, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';

import { registerUser } from '../../Redux/user/userActions';
import { selectCurrentUser, selectServerErrors } from '../../Redux/user/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// ------------end imports-----------

// material ui style
const useStyles = makeStyles((theme) => ({
  register: {
    marginTop: theme.spacing(4),
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
}));

const Register = ({ history }) => {
  // state
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
  const classes = useStyles();

  const { currentUser, serverErrors } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
      serverErrors: selectServerErrors,
    })
  );

  useEffect(() => {
    if (serverErrors) {
      serverErrors.forEach((err) => {
        if (err.field) {
          setError(err.field, {
            message: err.message,
          });
        } else {
          setError('email', {
            message: err.message,
          });
        }
      });
    }
  }, [serverErrors, setError]);

  useEffect(() => {
    if (currentUser) {
      history.push('/projects');
    }
  }, [currentUser, history]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.confirmPassword === data.password) {
      dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
    } else {
      setError('confirmPassword', {
        type: 'validate',
        message: 'Passwords Must be Match',
      });
    }
  };
  // jsx
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.register}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='name'
                label='Name'
                name='name'
                autoComplete='name'
                autoFocus
                inputRef={register({ required: { value: true, message: 'Please add your Name' } })}
              />
              {errors.name && (
                <Typography align='inherit' color='error' variant='subtitle1'>
                  {errors.name.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                inputRef={register({ required: { value: true, message: 'Please add a valid Email' } })}
              />
              {errors.email && (
                <Typography align='inherit' color='error' variant='subtitle1'>
                  {errors.email.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Please add a Password!( Password must be more than 6 character)',
                  },
                })}
              />
              {errors.password && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {errors.password.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                inputRef={register({ required: { value: true, message: 'Please add password again' } })}
              />
              {errors.confirmPassword && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {errors.confirmPassword.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default memo(Register);
