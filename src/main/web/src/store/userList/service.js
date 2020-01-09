import { user } from "./actions";
import ajax from "../../utils/ajax";

const request = ajax("http://localhost:8900/");

export const getUserList = () => dispatch => {
  dispatch(user.list.request());

  request({
    type: "GET",
    url: "getListUser"
  })
    .then(response => {
      dispatch(user.list.success(response));
    })
    .catch(error => {
      dispatch(user.list.error(error));
    });
};
