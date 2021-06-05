import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { useForm } from 'react-hook-form';
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { invite } from '../../Redux/project/projectActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '10px auto',
  },
  grid: {
    textAlign: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: 200,
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
  },
}));

const InviteUser = ({ projectId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { errors, register, handleSubmit } = useForm();

  const error = useSelector((state) => state.project.error);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inviteUserHandler = (data, event) => {
    event.preventDefault();
    dispatch(invite({ email: data.email, projectId }));
  };
  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        size='small'
        aria-label='add'
        endIcon={<AddIcon />}
        onClick={handleOpen}>
        Invite User
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Container component='main' maxWidth='sm' className={classes.paper}>
            <Typography variant='h6' className={classes.title}>
              Invite User
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(inviteUserHandler)}>
              <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='Email Address'
                    autoFocus
                    inputRef={register({ required: true })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='submit'
                    className={classes.add}
                    endIcon={<SendIcon />}>
                    Invite
                  </Button>
                </Grid>
              </Grid>
              {errors.email && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {'Please Enter a Email'}
                </Typography>
              )}
              {error && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {error[0].message}
                </Typography>
              )}
            </form>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};

export default React.memo(InviteUser);
