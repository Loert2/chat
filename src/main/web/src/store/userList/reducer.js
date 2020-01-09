import { handleActions } from "redux-actions";
import { user } from "./actions";

const initialState = {
  user: {},
  userList: [],
  error: null,
  loading: false
};

export default handleActions(
  {
    [user.list.request]: state => ({
      ...state,
      loading: true
    }),
    [user.list.success]: (state, action) => ({
      ...initialState,
      userList: action.payload
    }),
    [user.list.error]: (state, action) => ({
      ...initialState,
      error: action.payload
    })
  },
  initialState
);