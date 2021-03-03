//import
import { combineReducers } from 'redux';

//reducers
import userReducer from './user/userReducer';
import projectReducer from './project/projectReducer';
import tasksReducer from './tasks/tasksReducer';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  tasks: tasksReducer,
});

export default rootReducer;
