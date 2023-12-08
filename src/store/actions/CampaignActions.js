// import axios from "axios";
import helper from "../../constants/helper";
import {
	DELETE_CAMPAIGN_SUCCESS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_ACTIVE_CAMPAIGNS_SUCCESS,
	FETCH_ACTIVE_NEXT_CAMPAIGNS_SUCCESS,
	FETCH_ACTIVE_CAMPAIGNS_FAILURE,
	FETCH_DRAFT_CAMPAIGNS_SUCCESS,
	FETCH_DRAFT_NEXT_CAMPAIGNS_SUCCESS,
	FETCH_DRAFT_CAMPAIGNS_FAILURE,
	FETCH_CLOSED_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_NEXT_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_CAMPAIGNS_FAILURE,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const fetchActiveCampaigns =
	(query, type) => (dispatch) => {
		let pageUrl = helper.url + "/api/v1/campaigns/active";
		dispatch({
			type: AJAX_CALL_INIT,
		});
		Api.FetchActiveCampaigns(pageUrl, query, type)
			.then((res) => {
				dispatch({
					type:
						type === "next"
							? FETCH_ACTIVE_NEXT_CAMPAIGNS_SUCCESS
							: FETCH_ACTIVE_CAMPAIGNS_SUCCESS,
					payload: {
						activeCampaigns: res.data.data,
						sortQuery: query.sortQuery,
					},
					makePagination: {
						links: res.data.links,
						meta: res.data.meta,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_ACTIVE_CAMPAIGNS_FAILURE,
					payload: error,
				});
			});
	};

export const fetchDraftCampaigns =
	(query, type) => (dispatch) => {
		let pageUrl = helper.url + "/api/v1/campaigns/draft";
		dispatch({
			type: AJAX_CALL_INIT,
		});
		// axios
		//   .post(pageUrl, query)
		Api.FetchDraftCampaigns(pageUrl, query, type)
			.then((res) => {
				dispatch({
					type:
						type === "next"
							? FETCH_DRAFT_NEXT_CAMPAIGNS_SUCCESS
							: FETCH_DRAFT_CAMPAIGNS_SUCCESS,
					payload: {
						draftCampaigns: res.data.data,
						sortQuery: query.sortQuery,
					},
					makePagination: {
						links: res.data.links,
						meta: res.data.meta,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_DRAFT_CAMPAIGNS_FAILURE,
					payload: error,
				});
			});
	};

export const fetchClosedCampaigns =
	(query, type) => (dispatch) => {
		let pageUrl = process.env.REACT_APP_BASE_URL + "/api/v1/campaigns/closed";
		dispatch({
			type: AJAX_CALL_INIT,
		});
		// axios
		//   .post(pageUrl, query)
		Api.FetchClosedCampaigns(pageUrl, query, type)
			.then((res) => {
				dispatch({
					type:
						type === "next"
							? FETCH_CLOSED_NEXT_CAMPAIGNS_SUCCESS
							: FETCH_CLOSED_CAMPAIGNS_SUCCESS,
					payload: {
						closedCampaigns: res.data.data,
						sortQuery: query.sortQuery,
					},
					makePagination: {
						links: res.data.links,
						meta: res.data.meta,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			})
			.catch((error) => {
				dispatch({
					type: FETCH_CLOSED_CAMPAIGNS_FAILURE,
					payload: error,
				});
			});
	};

export const deleteCampaign = (id, Url, index, query) => (dispatch) => {
	let data = {
		campaign_id: id,
	};
	// axios
	//   .post(helper.url + "/api/v1/campaign/destroy", data)
	Api.DeleteCampaign(data)
		.then((res) => {
			dispatch({
				type: DELETE_CAMPAIGN_SUCCESS,
				payload: {
					campaign_type: "draft",
					index: index,
				},
			});
			toast.success("Campaign deleted successfully.");
			dispatch(fetchDraftCampaigns(Url, query));
		})
		.catch((error) => {});
};
