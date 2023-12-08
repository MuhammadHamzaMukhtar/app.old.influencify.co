// import axios from "axios";
import helper from "../../constants/helper";
import { toast } from "react-toastify";

import {
  HANDLE_FETCH_PALNS_SUCCESS,
  HANDLE_FETCH_PALNS_FAILURE,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_UPGRADE_PLAN_SUCCESS,
  HANDLE_UPGRADE_PLAN_FAILURE,
  HANDLE_DOWNGRADE_PLAN_SUCCESS,
  HANDLE_FETCH_BRAND_PALNS_SUCCESS,
  HANDLE_FETCH_BRAND_PALNS_FAILURE,
  HANDLE_FETCH_PROMOTIONAL_PALNS_SUCCESS,
  HANDLE_FETCH_PROMOATIONAL_PALNS_FAILURE,
  HANDLE_BRAND_CANCEL_SUBSCRIPTION_SUCCESS,
  HANDLE_BRAND_CANCEL_SUBSCRIPTION_FAILURE,
  HANDLE_GET_STRATED_PAID,
  HANDLE_GET_STRATED_FREE,
} from "../constants/action-types";
import { currentLoggedInUser, refreshReports } from "./HeaderActions";
import Api from "@services/axios";

export const fetchSubscriptionPlans = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/fetch-subscription-plans')
  Api.FetchSubscriptionPlans()
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_PALNS_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_FETCH_PALNS_FAILURE,
        payload: error,
      });
    });
};

export const fetchBrandSubscriptionPlans = msg => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .get(helper.url + "/api/v1/fetch-brand-subscription-plans")
  Api.FetchBrandSubscriptionPlans()
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_BRAND_PALNS_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      if (msg) {
        toast.success(msg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_FETCH_BRAND_PALNS_FAILURE,
        payload: error,
      });
    });
};

export const fetchPromotionalPlans = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .get(helper.url + "/api/v1/fetch-promotional-plans")
  Api.FetchPromotionalPlans()
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_PROMOTIONAL_PALNS_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_FETCH_PROMOATIONAL_PALNS_FAILURE,
        payload: error,
      });
    });
};

export const upgradePlan = id => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .get(helper.url + "/api/v1/upgrade-plan/" + id)
  Api.UpgradePlan(id)
    .then(res => {
      if (res.data === "CreditCardNotAttached") {
        toast.error(
          "Credit card is not attached, Go to Payment settings Tab to attached credit card"
        );
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else if (res.data === "NotActivePyamentGateway") {
        toast.error("Something went wrong, Please contact to admin");
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else if (res.data.status && res.data.status === "error") {
        toast.error(res.data.message);
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_UPGRADE_PLAN_SUCCESS,
          payload: res.data.data,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        toast.success(helper.successMsg);
        dispatch(currentLoggedInUser());
        dispatch(refreshReports());
        dispatch(fetchBrandSubscriptionPlans());
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_UPGRADE_PLAN_FAILURE,
        payload: error,
      });
    });
};

export const downgradePlan = id => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .get(helper.url + "/api/v1/downgrade-plan/" + id)
  Api.DowngradePlan(id)
    .then(res => {
      if (res.data.status && res.data.status === "error") {
        toast.error(res.data.message);
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else if (res.data === "CreditCardNotAttached") {
        toast.error(
          "Credit card is not attached, Go to Payment settings Tab to attached credit card"
        );
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else if (res.data === "NotActivePyamentGateway") {
        toast.error("Something went wrong, Please contact to admin");
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: HANDLE_DOWNGRADE_PLAN_SUCCESS,
          payload: res.data.data,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        // toast.success(helper.successMsg);
        dispatch(currentLoggedInUser());
        dispatch(refreshReports());
        dispatch(fetchBrandSubscriptionPlans());
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_UPGRADE_PLAN_FAILURE,
        payload: error,
      });
    });
};

export const addOnPlan = data => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/add-on-subscribe", data)
  Api.AddOnPlan(data)
    .then(res => {
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      if (res.data.status) {
        dispatch(fetchBrandSubscriptionPlans(res.data.message));
        dispatch(refreshReports());
      } else {
        toast.error(res.data.message);
      }
    })
    .catch(error => {
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    });
};

export const addOnPlanUnSubscribe = data => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/add-on-cancelled", data)
  Api.AddOnPlanUnSubscribe(data)
    .then(res => {
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      if (res.data.status) {
        dispatch(fetchBrandSubscriptionPlans(res.data.message));
      } else {
        toast.error(res.data.message);
      }
    })
    .catch(error => {
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    });
};

export const getStartedPaid = (id, ownProps) => dispatch => {
  dispatch({
    type: HANDLE_GET_STRATED_PAID,
  });
  ownProps.history.push("/brand/register/" + id);
};

export const getStartedFree = (query, ownProps) => dispatch => {
  dispatch({
    type: HANDLE_GET_STRATED_FREE,
  });
  ownProps.history.push("/brand/get-started-free");
};

export const cancelSubscription = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .get(helper.url + "/api/v1/cancel-subscription")
  Api.CancelSubscription()
    .then(res => {
      dispatch({
        type: HANDLE_BRAND_CANCEL_SUBSCRIPTION_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
      toast.success("Your has been Canceled Successfully");
      dispatch(currentLoggedInUser());
      dispatch(refreshReports());
      dispatch(fetchBrandSubscriptionPlans());
    })
    .catch(error => {
      dispatch({
        type: HANDLE_BRAND_CANCEL_SUBSCRIPTION_FAILURE,
        payload: error,
      });
    });
};
