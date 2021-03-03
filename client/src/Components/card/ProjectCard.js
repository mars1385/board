import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 200,
  },
  title: {
    marginBottom: 16,
  },
  desc: {
    paddingLeft: 35,
  },
});

const ProjectCard = ({ history, title, description, projectId }) => {
  const classes = useStyles();

  const getProjectHandler = (event) => {
    history.push(`/projects/${projectId}`);
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
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Typography>
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
