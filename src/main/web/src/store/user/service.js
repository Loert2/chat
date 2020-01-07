import { user } from "./actions";
import ajax from "../../utils/ajax";

const request = ajax("http://localhost:8900/");

export const registrationUser = ({ login, password }) => dispatch => {
  dispatch(user.createOrLoad.request());

  request({
    type: "POST",
    url: 'login',
    data: { fullName: login, password }
  })
    .then(response => {
      dispatch(user.createOrLoad.success(response));
    })
    .catch(error => {
      dispatch(user.createOrLoad.error(error));
    });
};
