//import
import { combineReducers } from 'redux';

//reducers
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
