import {
	DELETE_CAMPAIGN_SUCCESS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_ACTIVE_CAMPAIGNS_SUCCESS,
	FETCH_ACTIVE_NEXT_CAMPAIGNS_SUCCESS,
	FETCH_DRAFT_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_CAMPAIGNS_SUCCESS,
	HANDLE_SEARCH_ACTIVE_CAMPAIGNS_SUCCESS,
	HANDLE_SEARCH_DRAFT_CAMPAIGNS_SUCCESS,
	HANDLE_SEARCH_CLOSED_CAMPAIGNS_SUCCESS,
	HANDLE_SORT_ACTIVE_CAMPAIGNS_SUCCESS,
	HANDLE_SORT_DRAFT_CAMPAIGNS_SUCCESS,
	HANDLE_SORT_CLOSED_CAMPAIGNS_SUCCESS,
	HANDLE_ACITVE_CAMPAIGN_TAB_SUCCESS,
	FETCH_DRAFT_NEXT_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_NEXT_CAMPAIGNS_SUCCESS,
} from "../constants/action-types";

const initialState = {
	activeCampaigns: [],
	activeCampaignsTotal: 0,
	activeSkip: 0,
	activeHideLoadMore: false,

	draftCampaigns: [],
	draftCampaignsTotal: 0,
	draftSkip: 0,
	draftHideLoadMore: false,

	closedCampaigns: [],
	closedCampaignsTotal: 0,
	closedSkip: 0,
	closedHideLoadMore: false,

	isLoading: false,
	pagination: {},
	searchQuery: "",
	sortQuery: "newestFirst",
	activeCampaignTab: 0,
};

const CampaignReducer = (state = initialState, action) => {
	if (action.type === FETCH_ACTIVE_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			activeCampaigns: action.payload.activeCampaigns,
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === FETCH_ACTIVE_NEXT_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			activeCampaigns: state.activeCampaigns.concat(
				action.payload.activeCampaigns
			),
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === FETCH_DRAFT_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			draftCampaigns: action.payload.draftCampaigns,
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === FETCH_DRAFT_NEXT_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			draftCampaigns: state.draftCampaigns.concat(
				action.payload.draftCampaigns
			),
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === FETCH_CLOSED_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			closedCampaigns: action.payload.closedCampaigns,
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === FETCH_CLOSED_NEXT_CAMPAIGNS_SUCCESS) {
		let pagination = {
			nextPageUrl: action.makePagination.links.next,
			previousPageUrl: action.makePagination.links.prev,
			lastPageUrl: action.makePagination.links.last,
			currentPageNumber: action.makePagination.meta.current_page,
			from: action.makePagination.meta.from,
			to: action.makePagination.meta.to,
			total: action.makePagination.meta.total,
		};
		return {
			...state,
			closedCampaigns: state.closedCampaigns.concat(
				action.payload.closedCampaigns
			),
			pagination: pagination,
			sortQuery: action.payload.sortQuery,
		};
	} else if (action.type === DELETE_CAMPAIGN_SUCCESS) {
		if (action.payload.campaign_type === "active") {
			return {
				...state,
				activeCampaigns: state.activeCampaigns.filter(
					(campaign, index) => index !== action.payload.index
				),
			};
		} else if (action.payload.campaign_type === "draft") {
			return {
				...state,
				draftCampaigns: state.draftCampaigns.filter(
					(campaign, index) => index !== action.payload.index
				),
			};
		} else if (action.payload.campaign_type === "closed") {
			return {
				...state,
				closedCampaigns: state.closedCampaigns.filter(
					(campaign, index) => index !== action.payload.index
				),
			};
		}
	} else if (action.type === HANDLE_SEARCH_ACTIVE_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			searchQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SEARCH_DRAFT_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			searchQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SEARCH_CLOSED_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			searchQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SORT_ACTIVE_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			sortQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SORT_DRAFT_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			sortQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SORT_CLOSED_CAMPAIGNS_SUCCESS) {
		return {
			...state,
			sortQuery: action.payload.target.value,
		};
	} else if (action.type === HANDLE_ACITVE_CAMPAIGN_TAB_SUCCESS) {
		return {
			...state,
			activeCampaignTab: action.payload,
		};
	} else if (action.type === AJAX_CALL_INIT) {
		return {
			...state,
			isLoading: true,
		};
	} else if (action.type === AJAX_CALL_FINSH) {
		return {
			...state,
			isLoading: false,
		};
	} else {
		return state;
	}
}

export default CampaignReducer;
