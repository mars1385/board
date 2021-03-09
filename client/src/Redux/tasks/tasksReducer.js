import { GET_TASKS_FAILED, GET_TASKS_SUCCESS, CLEAR_TASKS, UPDATE_TASK_FAILED } from '../type';

const initialState = {
  tasks: null,
  error: null,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, error: null };
    case GET_TASKS_FAILED:
    case UPDATE_TASK_FAILED:
      return { ...state, tasks: null, error: action.payload };
    case CLEAR_TASKS:
      return { ...state, tasks: null, error: null };
    default:
      return state;
  }
};

export default tasksReducer;
