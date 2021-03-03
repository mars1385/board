import { GET_TASKS_FAILED, GET_TASKS_SUCCESS, RESET_ALL } from '../type';

const initialState = {
  tasks: null,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, error: null };
    case GET_TASKS_FAILED:
      return { ...state, tasks: null, error: action.payload };
    case RESET_ALL:
      return { ...state, projects: null, project: null, error: null };
    default:
      return state;
  }
};

export default tasksReducer;
