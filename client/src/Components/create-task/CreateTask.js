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
import { useDispatch } from 'react-redux';
import { addTask } from '../../Redux/tasks/tasksActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '20px auto',
  },
  grid: {
    textAlign: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    height: 250,
    width: 550,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateTask = ({ projectId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { errors, register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTaskHandler = (data, event) => {
    event.preventDefault();
    dispatch(addTask({ body: data.body, projectId }));
  };
  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        size='small'
        aria-label='add'
        endIcon={<AddIcon />}
        onClick={handleOpen}>
        Add Task
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
              Add a Task
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(addTaskHandler)}>
              <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={8}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='body'
                    label='Add Task'
                    name='body'
                    autoComplete='Add Task'
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
                    Add
                  </Button>
                </Grid>
              </Grid>
              {errors.body && (
                <Typography align='inherit' color='error' variant='subtitle2'>
                  {'Please add a subject for task'}
                </Typography>
              )}
            </form>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateTask;
