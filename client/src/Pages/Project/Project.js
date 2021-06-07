import React from 'react';
import { getProject, clearProject, updateProject, getActivities } from '../../Redux/project/projectActions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProject, selectServerErrors, selectMembers } from '../../Redux/project/projectSelector';
import { selectTasks } from '../../Redux/tasks/tasksSelector';
import { selectCurrentUser } from '../../Redux/user/userSelectors';
import { getTasks, clearTasks } from '../../Redux/tasks/tasksActions';
import { getMember } from '../../Redux/project/projectActions';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  InputBase,
  Button,
  Avatar,
  Box,
  Divider,
} from '@material-ui/core';
import ProjectCard from '../../Components/card/ProjectCard';
import CreateTask from '../../Components/create-task/CreateTask';
import UpdateTask from '../../Components/update-task/UpdateTask';
import InviteUserCard from '../../Components/invite-user/InviteUserCard';
import Gravatar from 'react-gravatar';

// material ui style
const useStyles = makeStyles((theme) => ({
  project: {
    marginTop: theme.spacing(12),
    padding: theme.spacing(4),
  },
  container: {
    padding: 0,
  },
  link: {
    cursor: 'pointer',
  },
  header: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: '8px 0 ',
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 45,
  },
  avatars: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Project = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentProject, errors, currentTasks, currentUser, members } = useSelector(
    createStructuredSelector({
      currentProject: selectProject,
      currentTasks: selectTasks,
      errors: selectServerErrors,
      currentUser: selectCurrentUser,
      members: selectMembers,
    })
  );

  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (currentProject) {
      dispatch(getTasks({ projectId: currentProject._id }));

      dispatch(getActivities({ projectId: currentProject._id }));

      dispatch(getMember({ projectId: currentProject._id }));

      setNotes(currentProject.generalNote ? currentProject.generalNote : '');
    }

    return () => {
      dispatch(clearTasks());
    };
  }, [dispatch, getTasks, currentProject]);

  React.useEffect(() => {
    dispatch(getProject({ history, projectId: match.params.projectId }));

    return () => {
      dispatch(clearProject());
    };
  }, [dispatch, history, match.params.projectId]);

  const getBack = () => {
    history.push('/projects');
  };

  const updateNote = () => {
    if (currentProject) {
      dispatch(updateProject({ data: { generalNote: notes }, projectId: currentProject._id }));
    }
  };

  return (
    <Container component='main' className={classes.container}>
      {currentProject && (
        <div className={classes.project}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Breadcrumbs aria-label='breadcrumb' className={classes.header}>
                <Link color='inherit' variant='subtitle1' className={classes.link} onClick={getBack}>
                  My Projects
                </Link>
                <Typography variant='subtitle1' color='textPrimary'>
                  {currentProject.title}
                </Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={4}>
              {members && (
                <Box className={classes.avatars}>
                  {members.map((member) => (
                    <Avatar key={member} className={classes.small}>
                      <Gravatar email={member} />
                    </Avatar>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              <Box className={classes.title}>
                <Typography color='textSecondary' variant='h6'>
                  Tasks
                </Typography>

                <CreateTask projectId={currentProject._id} />
              </Box>

              {currentTasks && currentTasks.length > 0 ? (
                currentTasks.map((task) => <UpdateTask key={task._id} task={task} />)
              ) : (
                <Paper elevation={1} className={classes.input}>
                  <InputBase disabled placeholder='No Task Add!!!' fullWidth />
                </Paper>
              )}

              <Typography color='textSecondary' className={classes.title} variant='h6'>
                General Notes
              </Typography>

              <Paper elevation={1} className={classes.input} style={{ minHeight: 100 }}>
                <InputBase
                  placeholder='Note'
                  fullWidth
                  multiline
                  onChange={(event) => {
                    setNotes(event.target.value);
                  }}
                  value={notes}
                />
              </Paper>

              <Button variant='contained' color='primary' onClick={updateNote} style={{ marginTop: 10 }}>
                Save Notes
              </Button>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12} className={classes.card}>
              <ProjectCard
                history={history}
                key={currentProject._id}
                title={currentProject.title}
                description={currentProject.description}
                projectId={currentProject._id}
                creator={currentProject.owner}
                userId={currentUser.id}
              />
              {currentProject.owner === currentUser.id && (
                <InviteUserCard projectId={currentProject._id} history={history} />
              )}
            </Grid>
          </Grid>
        </div>
      )}
      <div></div>
    </Container>
  );
};

export default Project;
