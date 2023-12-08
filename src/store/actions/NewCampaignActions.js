import {
	HANDLE_SET_UP_NEW_CAMPAIGN_SUCCESS,
	HANDLE_SET_UP_NEW_CAMPAIGN_FAILURE,
	HANDLE_FETCH_CAMPAIGN_TYPES_SUCCESS,
	HANDLE_FETCH_CAMPAIGN_TYPES_FAILURE,
	HANDLE_BRAND_CAMPAIGN_ACTION,
} from "../constants/action-types";
import Api from "@services/axios";

export const fetchCampaginTypes = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-campaign-types')
	Api.FetchCampaginTypes()
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_CAMPAIGN_TYPES_SUCCESS,
				payload: res.data && res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_FETCH_CAMPAIGN_TYPES_FAILURE,
				payload: error,
			});
		});
};

export const newCampaignSetUp = (query, ownProps) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/set-up-new-campaign", query)
	Api.NewCampaignSetUp(query)
		.then((res) => {
			dispatch({
				type: HANDLE_SET_UP_NEW_CAMPAIGN_SUCCESS,
				payload: res.data.Campaign,
			});
			dispatch({
				type: HANDLE_BRAND_CAMPAIGN_ACTION,
				payload: ownProps.history,
			});

			ownProps.history.push(
				"/brand/campaigns/" + res.data.Campaign.id,
				"isNewCampaign"
			);
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_SET_UP_NEW_CAMPAIGN_FAILURE,
				payload: error,
			});
		});
};
