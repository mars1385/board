import React from 'react';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { invite } from '../../Redux/project/projectActions';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    minWidth: 275,
    height: 200,
  },
  email: {
    marginBottom: 16,
  },
  title: {
    paddingLeft: 35,
  },
  grid: {
    textAlign: 'center',
    alignItems: 'center',
  },
  submit: {},
});

const InviteUserCard = ({ projectId, history }) => {
  const classes = useStyles();

  // const { errors, register, handleSubmit } = useForm();
  const [email, setEmail] = React.useState('');

  const error = useSelector((state) => state.project.error);

  const dispatch = useDispatch();

  const inviteUserHandler = () => {
    dispatch(invite({ email: email, projectId, history }));
  };
  return (
    <Card className={classes.root} variant='elevation'>
      <CardContent>
        <Typography variant='h6' className={classes.title} color='textPrimary'>
          Invite User
        </Typography>
        <CardActions className={classes.email}>
          {/* <form className={classes.form} onSubmit={handleSubmit(inviteUserHandler)}> */}
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='email'
                value={email}
                size='small'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label='Email Address'
                name='email'
                autoComplete='Email Address'
                autoFocus
                // inputRef={register({ required: true })}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {error[0].message}
                </Typography>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='outlined'
                color='primary'
                type='submit'
                className={classes.add}
                onClick={() => inviteUserHandler()}
                endIcon={<SendIcon />}>
                Invite
              </Button>
            </Grid>
          </Grid>
          {/* {errors.email && (
              <Typography align='inherit' color='error' variant='subtitle2'>
                {'Please Enter a Email'}
              </Typography>
            )} */}

          {/* </form> */}
        </CardActions>
      </CardContent>
    </Card>
  );
};

InviteUserCard.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default InviteUserCard;
