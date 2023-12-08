import Api from "@services/axios";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_INFLUENCER_FIND_CAMPAIGNS_SUCCESS,
	FETCH_INFLUENCER_FIND_CAMPAIGNS_FAILURE,
} from "../constants/action-types";

export const fetchInfluencerFindCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-influencer-find-campaigns')
	Api.InfluencerFindCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_INFLUENCER_FIND_CAMPAIGNS_SUCCESS,
				payload: {
					findInfluencerCampaigns: res.data.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_FIND_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};
