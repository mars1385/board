import React from 'react';
import { Paper, InputBase, Checkbox, makeStyles, withStyles, TableSortLabel } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../Redux/tasks/tasksActions';
// material ui style
const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1),
    marginBottom: 6,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  completed: {
    color: grey[400],
    textDecoration: 'line-through',
  },
}));
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const UpdateTask = ({ task }) => {
  const classes = useStyles();
  const [taskBody, setTaskBody] = React.useState(task.body);
  const [status, setStatus] = React.useState(task.status);
  const [error, setError] = React.useState(null);

  const dispatch = useDispatch();

  const handelUpdateTask = (event) => {
    if (taskBody === '') {
      setError('error');
    } else if (event.key === 'Enter' && taskBody !== '') {
      dispatch(
        updateTask({ updatedData: { body: taskBody, status }, taskId: task._id, projectId: task.project })
      );
    } else if (event.target.name === 'status' && taskBody !== '') {
      setStatus((state) => !state);
      dispatch(
        updateTask({
          updatedData: { body: taskBody, status: event.target.checked },
          taskId: task._id,
          projectId: task.project,
        })
      );
    }
  };

  const onChange = (event) => {
    setTaskBody(event.target.value);
  };

  return (
    <Paper elevation={1} className={classes.input}>
      <InputBase
        onKeyDown={(event) => handelUpdateTask(event)}
        value={taskBody}
        disabled={status ? true : false}
        onChange={onChange}
        className={status ? classes.completed : ''}
        style={{ width: '92%' }}
        placeholder={error && 'Task can not be empty'}
        name='body'
        id='body'
      />
      <GreenCheckbox
        name='status'
        checked={status}
        onChange={(event) => {
          handelUpdateTask(event);
        }}
        id='status'
      />
    </Paper>
  );
};

export default UpdateTask;
