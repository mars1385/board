import { GET_TASKS_FAILED, GET_TASKS_SUCCESS, RESET_ALL } from '../type';
import axios from 'axios';

export const addTask = ({ body, projectId }) => async (dispatch) => {
  try {
    const task = await axios.post(`/projects/${projectId}/tasks`, { body });
    console.log(task.data);
    dispatch(getTasks({ projectId }));
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const getTasks = ({ projectId }) => async (dispatch) => {
  try {
    const tasks = await axios.get(`/projects/${projectId}/tasks`);
    console.log(task.data);
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: tasks.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const resetProjects = () => ({
  type: RESET_ALL,
});
