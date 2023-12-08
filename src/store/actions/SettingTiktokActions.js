import { toast } from "react-toastify";
import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  SETTING_PLATFORM_SELECT_TIKTOK,
  HANDLE_RESPONSE_SUCCESS_FALSE,
} from "../constants/action-types";
import Api from "@services/axios";

export const brandVerifyTiktokCode = async (data, dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  const api = await Api.TiktokConnect(data);
  // .then((res) => {
  //   dispatch({
  //     type: SETTING_PLATFORM_SELECT_TIKTOK,
  //   });
  //   dispatch({
  //     type: AJAX_CALL_FINSH,
  //   });
  //   return res.data
  // })
  // .catch((error) => {
  //   return error;
  // });
  if (api.data.success == false) {
    dispatch({
      type: HANDLE_RESPONSE_SUCCESS_FALSE,
      data: api.data.data
    })
  } else {
    toast.success('Tiktok connected successfully!')
    dispatch({
      type: SETTING_PLATFORM_SELECT_TIKTOK,
    });
  }
  dispatch({
    type: AJAX_CALL_FINSH,
  });
  return api.data;
};
