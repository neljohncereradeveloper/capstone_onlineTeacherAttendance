import { combineReducers } from 'redux';
import login from './slice/login';
import teacher from './slice/teacher';
import menu from './slice/menu';
import classroom from './slice/classroom';

export default combineReducers({
  login,
  teacher,
  menu,
  classroom,
});
