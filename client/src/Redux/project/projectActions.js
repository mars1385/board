import { ADD_PROJECT_FAILED, ADD_PROJECT_SUCCESS, GET_PROJECTS_FAILED, GET_PROJECTS_SUCCESS } from '../type';
import axios from 'axios';

export const addProject = ({ title, description, history }) => async (dispatch) => {
  try {
    const project = await axios.post('/projects', { title, description });

    dispatch({
      type: ADD_PROJECT_SUCCESS,
      payload: project.data.data,
    });

    history.push(`/projects/${project.data.data._id}`);
  } catch (error) {
    dispatch({
      type: ADD_PROJECT_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const projects = await axios.get('/projects');

    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: projects.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILED,
      payload: error.response.data.error,
    });
  }
};