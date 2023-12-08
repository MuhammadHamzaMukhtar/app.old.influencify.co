// import axios from "axios";
import helper from "../../constants/helper";
import {
  HANDLE_USER_GENERAL_NOTIFICATIONS_SUCCESS,
  HANDLE_USER_GENERAL_NOTIFICATIONS_FAILURE,
  HANDLE_USER_CAMPAIGN_NOTIFICATIONS_SUCCESS,
  HANDLE_USER_CAMPAIGN_NOTIFICATIONS_FAILURE,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_SAVE_CHANGES_NOTIFICATIONS_SUCCESS,
  HANDLE_SAVE_CHANGES_NOTIFICATIONS_FAILURE,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const userGeneralNotifications = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/user-general-notifications')
  Api.UserGeneralNotifications()
    .then(res => {
      dispatch({
        type: HANDLE_USER_GENERAL_NOTIFICATIONS_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_USER_GENERAL_NOTIFICATIONS_FAILURE,
        payload: error,
      });
    });
};

export const userCampaignNotification = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .get(helper.url + "/api/v1/user-campaigns-notifications")
  Api.UserCampaignNotification()
    .then(res => {
      dispatch({
        type: HANDLE_USER_CAMPAIGN_NOTIFICATIONS_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_USER_CAMPAIGN_NOTIFICATIONS_FAILURE,
        payload: error,
      });
    });
};

export const saveChangesNotifications = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/save-changes-notifications", query)
  Api.SaveChangesNotifications(query)
    .then(res => {
      dispatch({
        type: HANDLE_SAVE_CHANGES_NOTIFICATIONS_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      toast.success(helper.successMsg);
    })
    .catch(error => {
      dispatch({
        type: HANDLE_SAVE_CHANGES_NOTIFICATIONS_FAILURE,
        payload: error,
      });
    });
};
