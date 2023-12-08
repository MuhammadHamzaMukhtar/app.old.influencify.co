import Api from "@services/axios";
import axios from "axios";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	DELETE_CAMPAIGN_SUCCESS,
	CAMPAIGN_LOAD_MORE_SUCCESS,
	FETCH_INFLUENCER_CAMPAIGNS_SUCCESS,
	FETCH_INFLUENCER_CAMPAIGNS_FAILURE,
	FETCH_WAITING_INFLUENCER_CAMPAIGNS_SUCCESS,
	FETCH_WAITING_INFLUENCER_CAMPAIGNS_FAILURE,
	FETCH_TODO_INFLUENCER_CAMPAIGNS_SUCCESS,
	FETCH_TODO_INFLUENCER_CAMPAIGNS_FAILURE,
	FETCH_CLOSED_INFLUENCER_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_INFLUENCER_CAMPAIGNS_FAILURE,
} from "../constants/action-types";

export const fetchInfluencerCampaigns = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-influencer-campaigns')
	Api.FetchInfluencerCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_INFLUENCER_CAMPAIGNS_SUCCESS,
				payload: {
					inProgressInfluencerCampaigns: res.data.inProgressInfluencerCampaigns,
					previewUploadInfluencerCampaigns:
						res.data.previewUploadInfluencerCampaigns,
					waitinginfluencerCampaigns: res.data.waitinginfluencerCampaigns,
					closedInfluencerCampaigns: res.data.closedInfluencerCampaigns,
					allInfluencerCampaignsTotal: res.data.allInfluencerCampaignsTotal,
					waitinginfluencerCampaignsTotal:
						res.data.waitinginfluencerCampaignsTotal,
					closedInfluencerCampaignsTotal:
						res.data.closedInfluencerCampaignsTotal,
				},
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_INFLUENCER_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const fetchWaitingInfluencerCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//axios
	// .get(helper.url + "/api/v1/fetch-waiting-influencer-campaigns")
	Api.FetchWaitingInfluencerCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_WAITING_INFLUENCER_CAMPAIGNS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_WAITING_INFLUENCER_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const fetchToDoInfluencerCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios
	// .get(helper.url + "/api/v1/fetch-todo-influencer-campaigns")
	Api.FetchToDoInfluencerCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_TODO_INFLUENCER_CAMPAIGNS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_TODO_INFLUENCER_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const fetchClosedInfluencerCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios
	// .get(helper.url + "/api/v1/fetch-closed-influencer-campaigns")
	Api.FetchClosedInfluencerCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_CLOSED_INFLUENCER_CAMPAIGNS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CLOSED_INFLUENCER_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const deleteCampaign = (id, campaign_type, index) => (dispatch) => {
	let data = {
		campaign_id: id,
	};
	//   axios
	//     .post(helper.url + "/api/v1/campaign/destroy", data)

	Api.DeleteCampaign(data)
		.then((res) => {
			dispatch({
				type: DELETE_CAMPAIGN_SUCCESS,
				payload: {
					campaign_type: campaign_type,
					index: index,
				},
			});
		})
		.catch((error) => {});
};

export const loadMore = (skip, load_more_type) => (dispatch) => {
	if (load_more_type === "active") {
		let s = skip + 1;
		let loaded = (s - 1) * 5;
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/v1/campaigns/load-more", {
				skip: s,
				status: "draft",
			})
			.then((res) => {
				dispatch({
					type: CAMPAIGN_LOAD_MORE_SUCCESS,
					payload: {
						draftCampaigns: res.data.campaigns,
						total: res.data.total,
						loaded: loaded,
					},
				});
			})
			.catch((error) => {});
	} else if (load_more_type === "draft") {
		let s = skip + 1;
		let loaded = (s - 1) * 5;
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/v1/campaigns/load-more", {
				skip: s,
				status: "draft",
			})
			.then((res) => {
				dispatch({
					type: CAMPAIGN_LOAD_MORE_SUCCESS,
					payload: {
						draftCampaigns: res.data.data,
						total: res.data.total,
						loaded: loaded,
					},
				});
			})
			.catch((error) => {});
	} else if (load_more_type === "closed") {
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/v1/campaigns/load-more", {
				skip: this.state.skip,
				status: "draft",
			})
			.then((res) => {
				this.setState({
					campaigns: [...this.state.campaigns, ...res.data.campaigns],
					total: res.data.total,
				});
			})
			.catch((error) => {});
	}
};
