import { chatList } from "./actions";
import ajax from "../../utils/ajax";
//import { createLoadAsyncAction } from '../../utils/service-utils';

const request = ajax("http://localhost:8900/");
const errorMessage = "Произошла ошибка при загрузке списка чатов";

export const getChatList = () => dispatch => {
  dispatch(chatList.request());

  request({
    type: "GET",
    url: 'getListChat'
  })
    .then(response => {
      dispatch(chatList.success(response));
    })
    .catch(error => {
      dispatch(chatList.error(errorMessage));
    });
};
