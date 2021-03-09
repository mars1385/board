import React from 'react';
import { getProject, clearProject } from '../../Redux/project/projectActions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProject, selectServerErrors } from '../../Redux/project/projectSelector';
import { selectTasks } from '../../Redux/tasks/tasksSelector';
import { getTasks, clearTasks } from '../../Redux/tasks/tasksActions';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  InputBase,
  withStyles,
} from '@material-ui/core';
import ProjectCard from '../../Components/card/ProjectCard';
import CreateTask from '../../Components/create-task/CreateTask';
import UpdateTask from '../../Components/update-task/UpdateTask';

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
  },
  card: {
    marginTop: 45,
  },
}));

const Project = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentProject, errors, currentTasks } = useSelector(
    createStructuredSelector({
      currentProject: selectProject,
      currentTasks: selectTasks,
      errors: selectServerErrors,
    })
  );

  React.useEffect(() => {
    if (currentProject) {
      dispatch(getTasks({ projectId: currentProject._id }));
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

  return (
    <Container component='main' className={classes.container}>
      {currentProject && (
        <div className={classes.project}>
          <Grid container spacing={1}>
            <Grid item xs>
              <Breadcrumbs aria-label='breadcrumb' className={classes.header}>
                <Link color='inherit' variant='subtitle1' className={classes.link} onClick={getBack}>
                  My Projects
                </Link>
                <Typography variant='subtitle1' color='textPrimary'>
                  {currentProject.title}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={2}>
              <CreateTask projectId={currentProject._id} />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              <Typography color='textSecondary' className={classes.title} variant='h6'>
                Tasks
              </Typography>

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
                <InputBase placeholder='Note' fullWidth multiline />
              </Paper>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12} className={classes.card}>
              <ProjectCard
                history={history}
                key={currentProject._id}
                title={currentProject.title}
                description={currentProject.description}
                projectId={currentProject._id}
              />
            </Grid>
          </Grid>
        </div>
      )}
      <div></div>
    </Container>
  );
};

export default Project;
