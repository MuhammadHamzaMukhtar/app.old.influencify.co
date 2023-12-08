import helper from "../../constants/helper";
// import axios from "axios";

import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  BRAND_REPORTS_SUCCESS,
  BRAND_REPORTS_FAILURE,
} from "../constants/action-types";
import Api from "@services/axios";

export const fetchBrandInfluencersReports = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios.get(helper.url + '/api/v1/brand-influencers-reports')
  Api.FetchBrandInfluencersReports()
    .then(res => {
      dispatch({
        type: BRAND_REPORTS_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: BRAND_REPORTS_FAILURE,
      });
    });
};
