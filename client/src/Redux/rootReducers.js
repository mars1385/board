//import
import { combineReducers } from 'redux';

//reducers
import userReducer from './user/userReducer';
import projectReducer from './project/projectReducer';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
});

export default rootReducer;
