import { GET_TASKS_FAILED, GET_TASKS_SUCCESS, CLEAR_TASKS, UPDATE_TASK_FAILED } from '../type';
import axios from 'axios';

export const addTask = ({ body, projectId }) => async (dispatch) => {
  try {
    await axios.post(`/projects/${projectId}/tasks`, { body });
    dispatch(getTasks({ projectId }));
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const updateTask = ({ updatedData, taskId, projectId }) => async (dispatch) => {
  try {
    console.log(updatedData, taskId, projectId);
    await axios.patch(`/projects/${projectId}/tasks/${taskId}`, updatedData);
    dispatch(getTasks({ projectId }));
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const getTasks = ({ projectId }) => async (dispatch) => {
  try {
    const tasks = await axios.get(`/projects/${projectId}/tasks`);
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: tasks.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAILED,
      payload: error.response.data.errors,
    });
  }
};

export const clearTasks = () => ({
  type: CLEAR_TASKS,
});
