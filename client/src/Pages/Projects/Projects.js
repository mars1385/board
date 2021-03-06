import React from 'react';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import CreateProject from '../../Components/create-project/CreateProject';
import ProjectCard from '../../Components/card/ProjectCard';
import { getProjects } from '../../Redux/project/projectActions';
import { selectProjects } from '../../Redux/project/projectSelector';
import { selectCurrentUser } from '../../Redux/user/userSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// material ui style
const useStyles = makeStyles((theme) => ({
  projects: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(1),
  },
  container: {
    padding: 0,
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const Projects = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentProjects, currentUser } = useSelector(
    createStructuredSelector({
      currentProjects: selectProjects,
      currentUser: selectCurrentUser,
    })
  );

  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  return (
    <Container component='main' className={classes.container}>
      <div className={classes.projects}>
        <Grid container spacing={1}>
          <Grid item xs={6} className={classes.menu}>
            <Typography color='textSecondary' variant='subtitle1'>
              My Projects
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.menu} style={{ justifyContent: 'flex-end' }}>
            <CreateProject />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {currentProjects &&
            currentProjects.map((project) => (
              <Grid key={project._id} item md={4} sm={6} xs={12}>
                <ProjectCard
                  history={history}
                  projectId={project._id}
                  title={project.title}
                  description={project.description}
                  userId={currentUser.id}
                  creator={project.owner}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </Container>
  );
};

export default React.memo(Projects);
