// import axios from "axios";
import helper from "../../constants/helper";
import {
	brandBookingCampaignOverview,
	brandBookingCampaignInfluencers,
	brandBookingCampaignContent,
	brandBookingCampaignActivites,
	brandBookingCampaignChatUsers,
} from "./BrandBookingCampaignActions";
import {
	influencerBookingCampaignOverview,
	influencerBookingCampaignPayment,
	influencerBookingCampaignContent,
	influencerBookingCampaignMessages,
} from "./InfluencersBookingIDActions";
import {
	FETCH_NOTIFICATIONS_SUCCESS,
	FETCH_NOTIFICATIONS_FAILURE,
	CURRENT_LOGGED_IN_USER_SUCCESS,
	AJAX_CALL_NOTIFICATION_INIT,
	AJAX_CALL_NOTIFICATION_FINISH,
	MARK_AS_READ_NOTIFICATIONS_SUCCESS,
	MARK_AS_READ_NOTIFICATIONS_FAILURE,
	AJAX_CALL_FINSH,
	HANDLE_NOTIFY_TYPE,
	REFRESH_REPORTS_SUCCESS,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const fetchNotifications = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_NOTIFICATION_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-notifications')
	Api.FetchNotifications()
		.then((res) => {
			dispatch({
				type: FETCH_NOTIFICATIONS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_NOTIFICATION_FINISH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_NOTIFICATIONS_FAILURE,
				payload: error,
			});
		});
};

export const fetchInfluencerNotifications = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_NOTIFICATION_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-notifications')
	Api.FetchInfluencerNotifications()
		.then((res) => {
			dispatch({
				type: FETCH_NOTIFICATIONS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_NOTIFICATION_FINISH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_NOTIFICATIONS_FAILURE,
				payload: error,
			});
		});
};

export const currentLoggedInUser = (query) => (dispatch) => {
	// let headers = {
	// 	headers: helper.headers,
	// };
	//   axios
	//     .get(helper.url + "/api/v1/current-logged-in-user", headers)
	Api.CurrentLoggedInUser(query)
		.then((res) => {
			dispatch({
				type: CURRENT_LOGGED_IN_USER_SUCCESS,
				payload: res.data.data,
			});

			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};

export const refreshReports =  () => async (dispatch) => {
	let headers = {
		headers: helper.headers,
	};
	const params = { main_account: localStorage.getItem("main_account") };
	// axios
	//   .get(helper.url + "/api/v1/refresh", { params: params }, headers)

	const json = await Api.RefreshReports(params, headers);
	if(json.status==200){
		dispatch({
			type: REFRESH_REPORTS_SUCCESS,
			payload: json.data,
		});
		dispatch({
			type: AJAX_CALL_FINSH,
		});
	}

	return json;
};

export const markAsReadNotifications = (query) => (dispatch) => {
	let headers = {
		headers: helper.headers,
	};
	dispatch({
		type: AJAX_CALL_NOTIFICATION_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/mark-as-read-notifications", query, headers)
	Api.MarkAsReadNotifications(query, headers)
		.then((res) => {
			dispatch({
				type: MARK_AS_READ_NOTIFICATIONS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_NOTIFICATION_FINISH,
			});
			dispatch(fetchNotifications());
			dispatch(currentLoggedInUser('brand'));
			if (!query.flag) {
				toast.success(helper.successMsg);
			} 
		})
		.catch((error) => {
			dispatch({
				type: MARK_AS_READ_NOTIFICATIONS_FAILURE,
				payload: error,
			});
		});
};

export const markAsReadInfluencerNotifications = (query) => (dispatch) => {
	let headers = {
		headers: helper.headers,
	};
	dispatch({
		type: AJAX_CALL_NOTIFICATION_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/mark-as-read-notifications", query, headers)
	Api.MarkAsReadInfluencerNotifications(query, headers)
		.then((res) => {
			dispatch({
				type: MARK_AS_READ_NOTIFICATIONS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_NOTIFICATION_FINISH,
			});
			dispatch(fetchInfluencerNotifications());
			dispatch(currentLoggedInUser('influencer'));
			if (!query.flag) {
				toast.success(helper.successMsg);
			}
		})
		.catch((error) => {
			dispatch({
				type: MARK_AS_READ_NOTIFICATIONS_FAILURE,
				payload: error,
			});
		});
};

export const brandNotifyPush = (query, navigate, ownProps) => (dispatch) => {
	if (query.type === "/brand/setting-brand-invitation") {
		ownProps.history.push(query.type);
	} else {
		// dispatch(brandBookingCampaignOverview(query.id));
		// dispatch(brandBookingCampaignInfluencers(query.id));
		// dispatch(brandBookingCampaignContent(query.id));
		// dispatch(brandBookingCampaignActivites(query.id));
		// dispatch(brandBookingCampaignChatUsers(query.id));
		dispatch({
			type: HANDLE_NOTIFY_TYPE,
			payload: query.type,
		});
		navigate("/brand/brand-booking/" + query.id);
		// window.location.href = "/brand/brand-booking/" + query.id;
	}
};

export const influencerNotifyPush = (query, navigate, ownProps) => (dispatch) => {
	// dispatch(influencerBookingCampaignPayment(query.id));
	// dispatch(influencerBookingCampaignContent(query.id));
	// dispatch(influencerBookingCampaignMessages(query.id));
	// dispatch(influencerBookingCampaignOverview(query.id));
	dispatch({
		type: HANDLE_NOTIFY_TYPE,
		payload: query.type,
	});
	// window.location.href = "/influencer/influencer-booking/" + query.id;
	navigate("/influencer/influencer-booking/" + query.id);
};
