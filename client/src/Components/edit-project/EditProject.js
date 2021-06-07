import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
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
import { updateProject } from '../../Redux/project/projectActions';

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

const EditProject = ({ projectId, title, description }) => {
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
    dispatch(updateProject({ data: { title: data.title, description: data.description }, projectId }));
  };
  return (
    <div>
      <Button variant='contained' size='small' color='primary' aria-label='add' onClick={handleOpen}>
        Edit
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
            <Typography variant='h4'>Edit Project</Typography>
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
                    defaultValue={title}
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
                    defaultValue={description}
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
                    startIcon={<EditIcon />}
                    className={classes.submit}>
                    Edit
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

export default EditProject;
