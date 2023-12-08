import axios from "axios";
import {
	FETCH_DASHBOARD_CAMPAIGNS_FAILURE,
	FETCH_DASHBOARD_CAMPAIGNS_SUCCESS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
} from "../constants/action-types";

export const fetchInfluencerDashboardCampaigns = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.get(
			process.env.REACT_APP_BASE_URL +
				"/api/v1/fetch-influencer-dashboard-campaigns"
		)
		// Api.FetchInfluencerDashboardCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_DASHBOARD_CAMPAIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_DASHBOARD_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};
