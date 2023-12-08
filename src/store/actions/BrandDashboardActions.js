import Api from "@services/axios";
import {
	HANDLE_TOP_INFLUENCERS_ANALYZED,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_GOOGLE_ANALYTICS,
	HANDLE_GOOGLE_ANALYTICS_ACTIVITY,
} from "../constants/action-types";

export const fetchTopInfluencersAnalyzed = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	Api.FetchTopInfluencers()
		.then((res) => {
			dispatch({
				type: HANDLE_TOP_INFLUENCERS_ANALYZED,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};

export const fetchGoogleAnalyticsUser = (params) => (dispatch) => {

	Api.FetchGoogleAnalyticsUser(params)
		.then((res) => {
			dispatch({
				type: HANDLE_GOOGLE_ANALYTICS,
				payload: res.data,
			});

		})
		.catch((error) => {});
};

export const fetchGoogleAnalyticsActivity = (params) => (dispatch) => {

	Api.FetchGoogleAnalyticsActivity(params)
		.then((res) => {
			dispatch({
				type: HANDLE_GOOGLE_ANALYTICS_ACTIVITY,
				payload: res.data,
			});
		})
		.catch((error) => {});
};
