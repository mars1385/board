import React from 'react';
import { getProject } from '../../Redux/project/projectActions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProject, selectServerErrors } from '../../Redux/project/projectSelector';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  TextareaAutosize,
  Paper,
  InputBase,
} from '@material-ui/core';
import ProjectCard from '../../Components/card/ProjectCard';

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
  input: {
    padding: theme.spacing(1),
    marginBottom: 6,
  },
}));

const Project = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentProject, errors } = useSelector(
    createStructuredSelector({
      currentProject: selectProject,
      errors: selectServerErrors,
    })
  );

  React.useEffect(() => {
    dispatch(getProject({ history, projectId: match.params.projectId }));
  }, [dispatch, history, match.params.projectId]);

  const getBack = () => {
    history.push('/projects');
  };
  return (
    <Container component='main' className={classes.container}>
      {currentProject && (
        <div className={classes.project}>
          <Breadcrumbs aria-label='breadcrumb' className={classes.header}>
            <Link color='inherit' className={classes.link} onClick={getBack}>
              My Projects
            </Link>
            <Typography color='textPrimary'>{currentProject.title}</Typography>
          </Breadcrumbs>
          <Grid container spacing={1}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              <Typography color='textSecondary' className={classes.title} variant='h6'>
                Tasks
              </Typography>
              <Paper elevation={1} className={classes.input}>
                <InputBase placeholder='Tasks' fullWidth />
              </Paper>
              <Paper elevation={1} className={classes.input}>
                <InputBase placeholder='Tasks' fullWidth />
              </Paper>
              <Paper elevation={1} className={classes.input}>
                <InputBase placeholder='Tasks' fullWidth />
              </Paper>
              <Paper elevation={1} className={classes.input}>
                <InputBase placeholder='Tasks' fullWidth />
              </Paper>

              <Typography color='textSecondary' className={classes.title} variant='h6'>
                General Notes
              </Typography>

              <Paper elevation={1} className={classes.input} style={{ minHeight: 100 }}>
                <InputBase placeholder='Note' fullWidth multiline />
              </Paper>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12}>
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
    </Container>
  );
};

export default Project;
