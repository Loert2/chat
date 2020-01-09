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
    [user.createOrLoad.request]: state => ({
      ...state,
      loading: true
    }),
    [user.createOrLoad.success]: (state, action) => ({
      ...initialState,
      user: action.payload
    }),
    [user.createOrLoad.error]: (state, action) => ({
      ...initialState,
      error: action.payload
    })
  },
  initialState
);
