import Api from "@services/axios";
// import axios from "axios";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_SUBSCRIPTION_REPORTS_SUCCESS,
} from "../constants/action-types";

export const fetchSubscriptionReports = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-subscription-reports')
	Api.FetchSubscriptionReports()
		.then((res) => {
			dispatch({
				type: FETCH_SUBSCRIPTION_REPORTS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};
