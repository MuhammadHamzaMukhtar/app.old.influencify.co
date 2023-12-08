import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_YOUTUBE_CONNECT_RES,
} from "../constants/action-types";
import Api from "@services/axios";

export const brandVerifyYoutubeCode = async (data, dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  const api = await Api.GoogleConnect(data);
      dispatch({
        type: HANDLE_YOUTUBE_CONNECT_RES,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    return api.data;
};
