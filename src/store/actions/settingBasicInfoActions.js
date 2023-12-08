// import axios from "axios";
import helper from "../../constants/helper";
import { HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS } from "../constants/action-types";
import { HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE } from "../constants/action-types";
import { HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_SUCCESS } from "../constants/action-types";
import { HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_FAILURE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_UPDATE_AVATAR_SUCCESS } from "../constants/action-types";
import { HANDLE_UPDATE_AVATAR_FAILURE } from "../constants/action-types";
import { HANDLE_UPDATE_PROFILE_SUCCESS } from "../constants/action-types";
import { HANDLE_UPDATE_PROFILE_FAILURE } from "../constants/action-types";
import { HANDLE_UPDATE_INFLUENCER_AVATAR_SUCCESS } from "../constants/action-types";
import { HANDLE_UPDATE_INFLUENCER_AVATAR_FAILURE } from "../constants/action-types";
import { currentLoggedInUser } from "./HeaderActions";
import { AJAX_CALL_INIT, AJAX_CALL_FINSH } from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const brandBasicInfoSettigs = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/brand_basic_info_settings')
	Api.BrandBasicInfoSettigs()
		.then((res) => {
			dispatch({
				type: HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE,
				payload: error,
			});
		});
};
export const influencerBasicInfoSettigs = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer_basic_info_settings")
	Api.InfluencerBasicInfoSettigs()
		.then((res) => {
			dispatch({
				type: HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_FAILURE,
				payload: error,
			});
		});
};

export const handleChangeAvatar = (query) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/update-brand-avatar", query)
	Api.HandleChangeAvatar(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
			} else {
				dispatch({
					type: HANDLE_UPDATE_AVATAR_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: "HANDLE_ON_DROP_FILE",
					payload: query.brand_avatar?.[0],
				});

				dispatch(currentLoggedInUser());
				toast.success(helper.successMsg);
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPDATE_AVATAR_FAILURE,
				payload: error,
			});
		});
};

export const handleChangeInfluencerAvatar = (query) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/update-influencer-avatar", query)
	Api.HandleChangeInfluencerAvatar(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
			} else {
				dispatch({
					type: HANDLE_UPDATE_INFLUENCER_AVATAR_SUCCESS,
					payload: res.data,
				});

				dispatch(currentLoggedInUser());
				toast.success(helper.successMsg);
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPDATE_INFLUENCER_AVATAR_FAILURE,
				payload: error,
			});
		});
};

export const handleBrandBasicInfoUpdate = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand_update_basic_info", query)
	Api.HandleBrandBasicInfoUpdate(query)
		.then((res) => {
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
					type: HANDLE_UPDATE_PROFILE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(currentLoggedInUser());
				toast.success(helper.successMsg);
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPDATE_PROFILE_FAILURE,
				payload: error,
			});
		});
};

export const handleInfluencerBasicInfoUpdate = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer_update_basic_info", query)
	Api.HandleInfluencerBasicInfoUpdate(query)
		.then((res) => {
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
					type: HANDLE_UPDATE_PROFILE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(currentLoggedInUser());
				toast.success(helper.successMsg);
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPDATE_PROFILE_FAILURE,
				payload: error,
			});
		});
};
