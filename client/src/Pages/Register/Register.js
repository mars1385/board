// ------------imports---------------
import React from 'react';
import { Container, Avatar, Typography, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';
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

const Register = () => {
  // state
  const { register, handleSubmit, errors, setError } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => {
    if (data.confirmPassword === data.password) {
      console.log(data);
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
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
                autoComplete='name'
                autoFocus
                inputRef={register({ required: true })}
              />
              {errors.name && (
                <Typography align='inherit' color='error' variant='subtitle1'>
                  {'Please add your Name'}
                </Typography>
              )}
            </Grid>
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
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                inputRef={register({ required: true, minLength: 6 })}
              />
              {errors.confirmPassword && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {'Passwords Must be Match'}
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

export default Register;
