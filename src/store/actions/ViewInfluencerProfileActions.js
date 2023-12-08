import {
	FETCH_INFLUENCER_PROFILE_INIT,
	FETCH_INFLUENCER_PROFILE_FINSH,
	FETCH_INFLUENCER_PROFILE_SUCCESS,
	FETCH_INFLUENCER_PROFILE_FAILURE,
	HANDLE_BRAND_REFRESH_INFLEUNCER_PROFILE_FAILURE,
	HANDLE_BRAND_REFRESH_INFLEUNCER_PROFILE_SUCCESS,
	ERROR_MESSAGE_DATA,
	BRADN_REFRESH_PROFILE_INIT,
	BRADN_REFRESH_PROFILE_FINISH,
} from "../constants/action-types";
import { refreshReports } from "./HeaderActions";
import Api from "@services/axios";

export const viewInfluencerProfile = (id) => (dispatch) => {
	dispatch({
		type: FETCH_INFLUENCER_PROFILE_INIT,
	});
	// axios.get(helper.url + '/api/v1/view-influencer-profile/'+id)
	Api.ViewInfluencerProfile(id)
		.then((res) => {
			if (res.data.error) {
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});
				dispatch({
					type: ERROR_MESSAGE_DATA,
					payload: {
						code: res.data.code,
						onFreeTrial: res.data.onFreeTrial,
					},
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
						influencerUniqueId: res.data.influencerUniqueId,
						country: res.data.country,
						countryCode: res.data.countryCode,
						isVerified: res.data.isVerified,
						avgInteractions: res.data.avgInteractions,
						earnedMedia: res.data.earnedMedia,
						isModash: res.data.isModash,
						audienceLookalikes: res.data.audienceLookalikes,
					},
				});
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});
			}
			dispatch(refreshReports());
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_PROFILE_FAILURE,
			});
		});
};

export const viewInfluencerProfileUsername = (username) => (dispatch) => {
	dispatch({
		type: FETCH_INFLUENCER_PROFILE_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/view-influencer-profile-username/" + username)
	Api.ViewInfluencerProfileUsername(username)
		.then((res) => {
			if (res.data.error) {
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});
				dispatch({
					type: ERROR_MESSAGE_DATA,
					payload: {
						code: res.data.code,
						onFreeTrial: res.data.onFreeTrial,
					},
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
						influencerUniqueId: res.data.influencerUniqueId,
						country: res.data.country,
						countryCode: res.data.countryCode,
						isVerified: res.data.isVerified,
						avgInteractions: res.data.avgInteractions,
						earnedMedia: res.data.earnedMedia,
						isModash: res.data.isModash,
						audienceLookalikes: res.data.audienceLookalikes,
					},
				});
				dispatch({
					type: FETCH_INFLUENCER_PROFILE_FINSH,
				});
			}
			dispatch(refreshReports());
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_PROFILE_FAILURE,
			});
		});
};

export const brandRefreshInfluencerProfile = (query) => (dispatch) => {
	dispatch({
		type: BRADN_REFRESH_PROFILE_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-refresh-influencer-profile", query)
	Api.BrandRefreshInfluencerProfile(query)
		.then((res) => {
			dispatch({
				type: HANDLE_BRAND_REFRESH_INFLEUNCER_PROFILE_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: BRADN_REFRESH_PROFILE_FINISH,
			});
			dispatch(viewInfluencerProfile(query.influencerId));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_BRAND_REFRESH_INFLEUNCER_PROFILE_FAILURE,
				payload: error,
			});
		});
};
