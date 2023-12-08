import helper from "../../constants/helper";
import axios from "axios";
import { actions } from "../redux/InfluencerSearchRedux";

import {
	FETCH_INFLUENCER_PROFILE_INIT,
	FETCH_INFLUENCER_PROFILE_FINSH,
	FETCH_INFLUENCER_PROFILE_SUCCESS,
	FETCH_INFLUENCER_PROFILE_FAILURE,
	HANDLE_REFRESH_INFLEUNCER_PROFILE_SUCCESS,
	HANDLE_REFRESH_INFLEUNCER_PROFILE_FAILURE,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_INFLUENCER_TIKTOK_PROFILE_SUCCESS,
	FETCH_INFLUENCER_TIKTOK_PROFILE_FAILURE,
	HANDLE_REFRESH_PROFILE_LOADING,
} from "../constants/action-types";

export const fetchInfluencerProfile = () => (dispatch) => {
	dispatch({
		type: FETCH_INFLUENCER_PROFILE_INIT,
	});
	axios
		.get(helper.url + "/api/v1/influencer-profile")
		// Api.FetchInfluencerProfile()
		.then((res) => {
			if (res.data === "InstagramNotConnected") {
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});

				dispatch({
					type: FETCH_INFLUENCER_PROFILE_SUCCESS,
					payload: res.data,
				});
			} else {
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_SUCCESS,
					payload: {
						influencerInfo: res.data.influencerInfo,
						userSocialLink: res.data.userSocialLink,
						instagramFeeds: res.data.instagramFeeds,
						instagramFeedsVideos: res.data.instagramFeedsVideos,
						audienceAgeGenderValue: res.data.audienceAgeGenderValue,
						audienceGenderPercentage: res.data.audienceGenderPercentage,
						audienceTopCities: res.data.audienceTopCities,
						audienceTopInterests: res.data.audienceTopInterests,
						audienceTopCountries: res.data.audienceTopCountries,
						instagramStats: res.data.instagramStats,
						categories: res.data.categories,
						averageInteractionData: res.data.averageInteractionData,
						engagementRate: res.data.engagementRate,
						influencerEmail: res.data.influencerEmail,
						country: res.data.country,
						countryCode: res.data.countryCode,
						isVerified: res.data.isVerified,
						avgInteractions: res.data.avgInteractions,
						earnedMedia: res.data.earnedMedia,
						isModash: res.data.isModash,
					},
				});

				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_PROFILE_FAILURE,
			});
		});
};

export const fetchTikTokProfile = () => (dispatch) => {
	let headers = {
		headers: helper.headers,
	};
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.get(helper.url + "/api/v1/influencer-tiktok-profile", headers)
		//Api.FetchTikTokProfile(headers)
		.then((res) => {
			if (res.data === "TikTokNotConnected") {
				dispatch({
					type: AJAX_CALL_FINSH,
				});

				dispatch({
					type: FETCH_INFLUENCER_TIKTOK_PROFILE_SUCCESS,
					payload: res.data,
				});
			} else {
				dispatch({
					type: FETCH_INFLUENCER_TIKTOK_PROFILE_SUCCESS,
					payload: {
						tikTokProfile: res.data.tikTokProfile,
						audienceAgeGenderValue: res.data.audienceAgeGenderValue,
						audienceGenderPercentage: res.data.audienceGenderPercentage,
						audienceTopCities: res.data.audienceTopCities,
						audienceTopInterests: res.data.audienceTopInterests,
						audienceTopCountries: res.data.audienceTopCountries,
						influencerEmail: res.data.influencerEmail,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_TIKTOK_PROFILE_FAILURE,
			});
		});
};

export const refreshInfluencerProfile = (data) => (dispatch) => {
	let headers = {
		headers: helper.headers,
	};
	dispatch({
		type: HANDLE_REFRESH_PROFILE_LOADING,
	});
	axios
		.get(helper.url + "/api/v1/refresh-influencer-profile", headers)
		//Api.RefreshInfluencerProfile(headers)
		.then((res) => {
			dispatch({
				type: HANDLE_REFRESH_INFLEUNCER_PROFILE_SUCCESS,
				payload: res.data,
			});
			dispatch(actions.viewInfluencerProfile(dispatch, data));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REFRESH_INFLEUNCER_PROFILE_FAILURE,
				payload: error,
			});
		});
};
