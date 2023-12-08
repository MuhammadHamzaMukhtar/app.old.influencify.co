// import axios from "axios";
import helper from "../../constants/helper";
import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_BRAND_GMAIL_TOKEN_SUCCESS,
  FETCH_GMAIL_SETTINGS_SUCCESS,
  HANDLE_GMAIL_UPDATE_SUCCESS,
  HANDLE_GMAIL_DISCONNECT_SUCCESS,
  HANDLE_GMAIL_UPDATE_FAILED,
} from "../constants/action-types";
import { toast } from "react-toastify";
import { currentLoggedInUser } from "./HeaderActions";
import Api from "@services/axios";

export const brandVerifyGmailToken = (code, navigate) => (dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/brand-gmail-verify-token?code='+code)
  Api.BrandVerifyGmailToken(code)
    .then((res) => {
      dispatch({
        type: HANDLE_BRAND_GMAIL_TOKEN_SUCCESS,
        payload: res.data.user
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      navigate(res.data.redirect_url);
      //window.location.href = session ? session : res.data.redirect_url;
    })
    .catch((error) => {
      //ownProps.history.push("/brand/setting-brand-gmail");
    });
};

export const fetchGmailSetting = () => (dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .get(helper.url + "/api/v1/fetch-gmail-settings")
  Api.FetchGmailSetting()
    .then((res) => {
      dispatch({
        type: FETCH_GMAIL_SETTINGS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {});
  dispatch({
    type: AJAX_CALL_FINSH,
  });
};

export const handleGmailUpdate = (query) => (dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/gmail-update-info", query)
  Api.HandleGmailUpdate(query)
    .then((res) => {
      if(res.status == 200){
        dispatch({
          type: HANDLE_GMAIL_UPDATE_SUCCESS,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        toast.success(helper.successMsg);
      } else {
        dispatch({
          type: HANDLE_GMAIL_UPDATE_FAILED,
          payload: res.data.errors
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      }
    })
    .catch((error) => {
      if (error.response.data) {
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).map((item) => {
            return toast.error(error.response.data.errors[item][0]);
          });
        }
      }
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    });
};
export const disconnectGmail = () => (dispatch) => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .get(helper.url + "/api/v1/disconnect-gmail")
  Api.DisconnectGmail()
    .then((res) => {
      dispatch({
        type: HANDLE_GMAIL_DISCONNECT_SUCCESS,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      dispatch(currentLoggedInUser());
      toast.success("Gmail Disconnect Successfully!");
    })
    .catch((error) => {});
};
