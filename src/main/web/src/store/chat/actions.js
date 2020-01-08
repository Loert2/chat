import { createActions } from 'redux-actions';
import { asyncActions } from '../../utils/constants';

export const { chatList } = createActions({
   CHAT_LIST: asyncActions
});