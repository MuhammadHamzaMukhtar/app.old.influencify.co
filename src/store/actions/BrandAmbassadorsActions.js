import { refreshReports } from "../actions/HeaderActions";

import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_BRAND_NOTABLE_USERS_SUCCESS,
	FETCH_BRAND_NOTABLE_USERS_FAILURE,
	HANDLE_NOTABLE_USER_REPORT_SUCCESS,
	CREATE_CAMPAIGN_WITH_NOTABLE_USERS,
	BRAND_INFLUENCIAL_FOLLOWERS_LOADING,
	HANDLE_RESPONSE_SUCCESS_FALSE,
} from "../constants/action-types";
import Api from "@services/axios";

export const fetchBrandNotableUsers = (query) => (dispatch) => {
	dispatch({
		type: BRAND_INFLUENCIAL_FOLLOWERS_LOADING,
	});
	dispatch({
		type: AJAX_CALL_INIT,
	});

	Api.BrandNotableUsers(query)
		//   axios.post(helper.url + "/api/v1/brand-notable-users", query)
		.then((res) => {
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch({
				type: FETCH_BRAND_NOTABLE_USERS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch({
				type: FETCH_BRAND_NOTABLE_USERS_FAILURE,
			});
		});
};

export const fetchInfluentialFollowers = (page, data) => (dispatch) => {
	let params = { page: page };
	if (Object.keys(data).length > 0) {
		Object.keys(data).map((value) => {
			if (data[value]) {
				return (params[value] = data[value]);
			}
		});
	}
	dispatch({
		type: "FETCH_INFLUENTIAL_FOLLOWER_PENDING",
	});
	// axios
	//   .get(helper.url + "/api/v1/brand-influential-followers", { params: params })
	Api.FetchInfluentialFollowers(params)
		.then((res) => {
			if (page > 1) {
				dispatch({
					type: "FETCH_INFLUENTIAL_FOLLOWER_MORE",
					payload: res.data,
				});
				dispatch(refreshReports());
			} else {
				dispatch({
					type: "FETCH_INFLUENTIAL_FOLLOWER_SUCCESS",
					payload: res.data,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: "FETCH_INFLUENTIAL_FOLLOWER_FAILURE",
			});
		});
};

export const fetchInfluentialLikers = (page, data) => (dispatch) => {
	let params = { page: page };
	if (Object.keys(data).length > 0) {
		Object.keys(data).map((value) => {
			if (data[value]) {
				return (params[value] = data[value]);
			}
		});
	}
	dispatch({
		type: "FETCH_INFLUENTIAL_LIKER_PENDING",
	});
	// axios
	//   .get(helper.url + "/api/v1/brand-influential-likers", { params: params })
	Api.FetchInfluentialLikers(params)
		.then((res) => {
			if (page > 1) {
				dispatch({
					type: "FETCH_INFLUENTIAL_LIKER_MORE",
					payload: res.data,
				});
				dispatch(refreshReports());
			} else {
				dispatch({
					type: "FETCH_INFLUENTIAL_LIKER_SUCCESS",
					payload: res.data,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: "FETCH_INFLUENTIAL_LIKER_FAILURE",
			});
		});
};

export const notableUsersReport = (query) => (dispatch) => {
	//  axios .post(helper.url + "/api/v1/notable-users-reports", query)
	Api.UsersReport(query)

		.then((res) => {
			if (res.data && res.data.success === false) {
				dispatch({
					type: HANDLE_RESPONSE_SUCCESS_FALSE,
					data: res.data,
				});
			} else {
				dispatch({
					type: HANDLE_NOTABLE_USER_REPORT_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {});
};

export const createCampaignWithNotableUsers =
	(query, ownProps) => (dispatch) => {
		dispatch({
			type: AJAX_CALL_INIT,
		});

		// axios.post(helper.url + "/api/v1/create-campaign-notable-users", query)
		Api.CampaignNotableUsers(query)
			.then((res) => {
				if (res.data.success === false) {
					dispatch({
						type: HANDLE_RESPONSE_SUCCESS_FALSE,
						data: res.data,
					});
				} else {
					dispatch({
						type: CREATE_CAMPAIGN_WITH_NOTABLE_USERS,
						payload: res.data.id,
					});
					dispatch({
						type: AJAX_CALL_FINSH,
					});
					ownProps.history.push("/brand/campaign/" + res.data.id);
				}
			})
			.catch((error) => {});
	};
