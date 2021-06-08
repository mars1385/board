import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardActions, CardContent, Button, Typography, Box } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../Redux/project/projectActions';

import EditProject from '../edit-project/EditProject';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 16,
  },
  desc: {
    height: 80,
    paddingLeft: 35,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const ProjectCard = ({ history, title, description, projectId, creator, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getProjectHandler = (event) => {
    history.push(`/projects/${projectId}`);
  };

  const removeProjectHandler = () => {
    dispatch(removeProject({ history, projectId }));
  };

  return (
    <Card className={classes.root} variant='elevation'>
      <CardContent>
        <CardActions className={classes.title}>
          <TitleIcon color='primary' />
          <Button onClick={() => getProjectHandler()} size='small'>
            {title}
          </Button>
        </CardActions>
        <Typography variant='subtitle1' className={classes.desc} color='textSecondary'>
          {description.length > 100 ? `${description.substring(0, 40)}...` : description}
        </Typography>

        {creator === userId && (
          <Box className={classes.buttons}>
            <EditProject projectId={projectId} title={title} description={description} />
            <Button onClick={removeProjectHandler} color='secondary' size='small'>
              Remove
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default ProjectCard;
