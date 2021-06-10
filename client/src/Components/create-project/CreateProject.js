import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
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
  Box,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addProject } from '../../Redux/project/projectActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
  title: {
    marginBottom: 32,
  },
  form: {
    margin: 32,
  },
  addTask: {
    justifyContent: 'flex-start',
  },
  create: {
    display: 'flex',
    marginTop: 16,
    justifyContent: 'flex-end',
  },
}));

const CreateProject = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([{ body: '' }]);
  const { errors, register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(addProject({ title: data.title, description: data.description, history }));
  };

  const addTaskHandler = () => {
    setTasks((tasks) => [...tasks, { body: '' }]);
  };

  const changeTaskInput = (event, index) => {
    let newTasks = [...tasks];
    newTasks[index] = event.target.value;

    setTasks(newTasks);
  };
  return (
    <div>
      <Button
        variant='contained'
        size='medium'
        color='secondary'
        aria-label='add'
        onClick={handleOpen}
        startIcon={<SaveIcon />}>
        Create Project
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
            <Typography variant='h6' color='textSecondary' className={classes.title} align='center'>
              Create Project
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant='outlined'
                    margin='dense'
                    fullWidth
                    size='small'
                    id='title'
                    label='Title'
                    name='title'
                    autoComplete='title'
                    autoFocus
                    inputRef={register({ required: true })}
                  />
                  {errors.title && (
                    <Typography align='inherit' color='error' variant='subtitle2'>
                      {'Please add a Title for project'}
                    </Typography>
                  )}
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    multiline
                    rows={3}
                    id='description'
                    label='Description'
                    name='description'
                    autoComplete='description'
                    inputRef={register({ required: true })}
                  />
                  {errors.description && (
                    <Typography align='inherit' color='error' variant='subtitle2'>
                      {'Please add a Description for project'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {React.Children.toArray(
                    tasks.map((task, index) => (
                      <TextField
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        size='small'
                        id='task'
                        label='Task'
                        name='task'
                        onChange={(e) => changeTaskInput(e, index)}
                        defaultValue={task.body}
                      />
                    ))
                  )}
                  <Button
                    fullWidth
                    variant='text'
                    className={classes.addTask}
                    color='secondary'
                    onClick={addTaskHandler}
                    startIcon={<AddCircleOutlineIcon />}>
                    Add New Task
                  </Button>
                </Grid>
              </Grid>
              <Box className={classes.create}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='medium'
                  startIcon={<SaveIcon />}>
                  Create Project
                </Button>
              </Box>
            </form>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(CreateProject);

{
  /* <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='title'
                    label='Title'
                    name='title'
                    autoComplete='title'
                    autoFocus
                    inputRef={register({ required: true })}
                  />
                  {errors.title && (
                    <Typography align='inherit' color='error' variant='subtitle2'>
                      {'Please add a Title for project'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='description'
                    label='Description'
                    name='description'
                    autoComplete='description'
                    inputRef={register({ required: true })}
                  />
                  {errors.description && (
                    <Typography align='inherit' color='error' variant='subtitle2'>
                      {'Please add a Description for project'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<SaveIcon />}
                    className={classes.submit}>
                    Create
                  </Button>
                </Grid> */
}
