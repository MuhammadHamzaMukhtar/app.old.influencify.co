// import axios from "axios";
import helper from "../../constants/helper";
import { HANDLE_ACCOUNT_SETTING_SUCCESS } from "../constants/action-types";
import { HANDLE_ACCOUNT_SETTING_FAILURE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_EMAIL_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_EMAIL_UPDATE_FAILURE } from "../constants/action-types";
import { HANDLE_USER_NAME_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_USER_NAME_UPDATE_FAILURE } from "../constants/action-types";
import { HANDLE_PASSWORD_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_PASSWORD_UPDATE_FAILURE } from "../constants/action-types";
import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  CLOSE_ACCOUNT_INIT,
  CLOSE_ACCOUNT_FINSH,
  HANDLE_USER_CLOSE_ACCOUNT_SUCCESS,
  HANDLE_USER_CLOSE_ACCOUNT_FAILURE,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const brandAccountSettings = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/account_settings')
  Api.BrandAccountSettings()
    .then(res => {
      dispatch({
        type: HANDLE_ACCOUNT_SETTING_SUCCESS,
        payload: {
          email: res.data.data.email,
          username: res.data.data.username,
          password_strength: res.data.data.password_strength,
        },
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_ACCOUNT_SETTING_FAILURE,
        payload: error,
      });
    });
};

export const influencerAccountSettings = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/account_settings')
  Api.InfluencerAccountSettings()
    .then(res => {
      dispatch({
        type: HANDLE_ACCOUNT_SETTING_SUCCESS,
        payload: {
          email: res.data.data.email,
          username: res.data.data.username,
          password_strength: res.data.data.password_strength,
        },
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_ACCOUNT_SETTING_FAILURE,
        payload: error,
      });
    });
};

export const handleEmailUpdate = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/update-email", query)
  Api.HandleEmailUpdate(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_EMAIL_UPDATE_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        toast.success(helper.successMsg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_EMAIL_UPDATE_FAILURE,
        payload: error,
      });
    });
};

export const handleUsernameUpdate = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/update-username", query)
  Api.HandleUsernameUpdate(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_USER_NAME_UPDATE_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        toast.success(helper.successMsg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_USER_NAME_UPDATE_FAILURE,
        payload: error,
      });
    });
};

export const handlePasswordUpdate = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/update-password", query)
  Api.HandlePasswordUpdate(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_PASSWORD_UPDATE_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        toast.success(helper.successMsg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_PASSWORD_UPDATE_FAILURE,
        payload: error,
      });
    });
};

export const userCloseAccount = (query, ownProps) => dispatch => {
  dispatch({
    type: CLOSE_ACCOUNT_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/user-close-account", query)
  Api.UserCloseAccount(query)
    .then(res => {
      if (res.data.error) {
        toast.error(res.data.message);
        dispatch({
          type: CLOSE_ACCOUNT_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_USER_CLOSE_ACCOUNT_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLOSE_ACCOUNT_FINSH,
        });
        ownProps.history.push("/");
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_USER_CLOSE_ACCOUNT_FAILURE,
        payload: error,
      });
    });
};
