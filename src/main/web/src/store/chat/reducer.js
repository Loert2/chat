import { handleActions } from 'redux-actions';
import { chatList } from './actions';

const initialState = {
   chatList: [],
   error: null,
   loading: false
};

export default handleActions(
   {
      [chatList.request]: (state) => ({
         ...state,
         loading: true
      }),
      [chatList.success]: (state, action) => ({
         ...initialState,
         chatList: action.payload
      }),
      [chatList.error]: (state, action) => ({
         ...initialState,
         error: action.payload
      })
   },
   initialState
);