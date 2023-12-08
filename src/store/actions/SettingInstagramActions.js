import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_CONNECT_INSTAGRAM,
  HANDLE_VALIDATION_ERRORS,
  HANDLE_CONNECT_FINISH,
  HANDLE_REMOVE_VALIDATION_ERRORS,
} from "../constants/action-types";
import Api from "@services/axios";

export const brandVerifyInstagramCode = async (data, dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  const api = await Api.InstagramOathCode(data);
  // .then((res) => {

  if (api.data.errors) {
    dispatch({
      type: HANDLE_VALIDATION_ERRORS,
      payload: api.data.errors,
    });
    dispatch({
      type: HANDLE_CONNECT_FINISH,
    });
  } else {
    dispatch({
      type: HANDLE_REMOVE_VALIDATION_ERRORS
    });
    dispatch({
      type: HANDLE_CONNECT_INSTAGRAM,
      payload: api.data 
    });
    dispatch({
      type: AJAX_CALL_FINSH,
    });
  }
  // })
  // .catch((error) => {
  //   return error;
  // });
  return api.data;
};
