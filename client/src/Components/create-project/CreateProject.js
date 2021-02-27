import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Fab,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
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
  },
}));

const CreateProject = ({ history }) => {
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

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(addProject({ title: data.title, description: data.description, history }));
  };
  return (
    <div>
      <Fab size='medium' color='secondary' aria-label='add' onClick={handleOpen}>
        <AddIcon />
      </Fab>
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
            <Typography variant='h4'>Create Project</Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
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
                    autoFocus
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
                </Grid>
              </Grid>
            </form>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(CreateProject);