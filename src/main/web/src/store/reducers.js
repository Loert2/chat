import { combineReducers } from 'redux';

import userStore from './user/reducer';
import chatStore from './chat/reducer';

export default combineReducers({
   userStore,
   chatStore
});