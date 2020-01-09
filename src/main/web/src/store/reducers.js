import { combineReducers } from 'redux';

import userStore from './user/reducer';
import userListStore from './userList/reducer';
import chatStore from './chat/reducer';

export default combineReducers({
   userStore,
   userListStore,
   chatStore
});