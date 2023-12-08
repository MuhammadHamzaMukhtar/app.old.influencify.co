import Influencify from "../../constants/Influencify";
import { refreshReports } from "../actions/HeaderActions";

const initialState = {
	sponsorPostForm: {
		likes_left_number: "",
		likes_right_number: "",
		followers_left_number: "",
		followers_right_number: "",
	},
	form: [],
	fetchCompaigns: [],
	finishedCampaigns: [],
	campaignMonitorDetail: [],
	data: [],
	fetchSingleCampaign: {},
	payload: {
		// skip: 0
	},
	countries: [],
	mentions: [],
	isLoading: false,
	load_more_loading: false,
	detailLoading: false,
	download_csv_loading: false,
	total: "",
	finishTotal: "",
	finishTo: "",
	finishFrom: "",
	to: "",
	from: "",
	message: "",
	records: {},
	more_records: false,
	loadmorekey: "",
	loadMoreLoading: false,
	keyFilters: [
		"commentsFrom",
		"start_date",
		"end_date",
		"hashTag",
		"LikesFrom",
		"LikesTo",
		"country",
	],
	brandPages: [],
	activeLoadMore: false,
	campaignFound: false,
	errors: {},
	real_mentions: [],
};

export const types = {
	CREATE_COMPAIGN_LOADING: "CREATE_COMPAIGN_LOADING",
	CREATE_COMPAIGN_SUCCESS: "CREATE_COMPAIGN_SUCCESS",
	HANDLE_CAMPAIGN_FORM_DATA: "HANDLE_CAMPAIGN_FORM_DATA",
	FETCH_MONITOR_COMPAIGN_LOADING: "FETCH_MONITOR_COMPAIGN_LOADING",
	FETCH_MONITOR_COMPAIGN_SUCCESS: "FETCH_MONITOR_COMPAIGN_SUCCESS",
	SEARCH_MONITOR_COMPAIGN_LOADING: "SEARCH_MONITOR_COMPAIGN_LOADING",
	SEARCH_MONITOR_COMPAIGN_SUCCESS: "SEARCH_MONITOR_COMPAIGN_SUCCESS",
	FETCH_COMPAIGN_DETAIL_LOADING: "FETCH_COMPAIGN_DETAIL_LOADING",
	FETCH_COMPAIGN_DETAIL_SUCCESS: "FETCH_COMPAIGN_DETAIL_SUCCESS",
	FETCH_SINGLE_COMPAIGN_LOADING: "FETCH_SINGLE_COMPAIGN_LOADING",
	FETCH_SINGLE_COMPAIGN_SUCCESS: "FETCH_SINGLE_COMPAIGN_SUCCESS",
	HANDLE_SPONSORED_POSTS_FILTER: "HANDLE_SPONSORED_POSTS_FILTER",
	HANDLE_DOWNLOAD_CSV_LOADING: "HANDLE_DOWNLOAD_CSV_LOADING",
	HANDLE_DOWNLOAD_CSV_SUCCESS: "HANDLE_DOWNLOAD_CSV_SUCCESS",
	SEARCH_CAMPAIGN_CONTENT_LOADING: "SEARCH_CAMPAIGN_CONTENT_LOADING",
	SEARCH_CAMPAIGN_CONTENT_SUCCESS: "SEARCH_CAMPAIGN_CONTENT_SUCCESS",
	HANDLE_SEARCH_PAYLOAD: "HANDLE_SEARCH_PAYLOAD",
	EDIT_CAMPAIGN_NAME_LOADING: "EDIT_CAMPAIGN_NAME_LOADING",
	EDIT_CAMPAIGN_NAME_SUCCESS: "EDIT_CAMPAIGN_NAME_SUCCESS",
	FETCH_CONNECTED_MENTIONS_LOADING: "FETCH_CONNECTED_MENTIONS_LOADING",
	FETCH_CONNECTED_MENTIONS_SUCCESS: "FETCH_CONNECTED_MENTIONS_SUCCESS",
	FINISH_CAMPAIGN_LOADING: "FINISH_CAMPAIGN_LOADING",
	FINISH_CAMPAIGN_SUCCESS: "FINISH_CAMPAIGN_SUCCESS",
	LOADMORE_MONITOR_COMPAIGN_LOADING: "LOADMORE_MONITOR_COMPAIGN_LOADING",
	LOADMORE_MONITOR_COMPAIGN_SUCCESS: "LOADMORE_MONITOR_COMPAIGN_SUCCESS",
	FETCH_FINISHED_COMPAIGN_LOADING: "FETCH_FINISHED_COMPAIGN_LOADING",
	FETCH_FINISHED_COMPAIGN_SUCCESS: "FETCH_FINISHED_COMPAIGN_SUCCESS",
	MORE_MONITOR_CAMPAIGN_LOADING: "MORE_MONITOR_CAMPAIGN_LOADING",
	MORE_MONITOR_CAMPAIGN_SUCCESS: "MORE_MONITOR_CAMPAIGN_SUCCESS",
	HANDLE_SELECTED_USER: "HANDLE_SELECTED_USER",
	FETCH_MORE_CONTENT_LOADING: "FETCH_MORE_CONTENT_LOADING",
	FETCH_MORE_CONTENT_SUCCESS: "FETCH_MORE_CONTENT_SUCCESS",
	FETCH_BRAND_PAGES_SUCCESS: "FETCH_BRAND_PAGES_SUCCESS",
	CLEAR_MONITOR_CAMPAIGN_FORM: "CLEAR_MONITOR_CAMPAIGN_FORM",
	FETCH_SINGLE_COMPAIGN_ERROR: "FETCH_SINGLE_COMPAIGN_ERROR",
	MONITORING_CAMPAIGN_NEW_ERROR: "MONITORING_CAMPAIGN_NEW_ERROR",
};

export const actions = {
	createCampaign: async (dispatch, data, navigate) => {
		const json = await Influencify.createCampaign(data);
		if (json.data.success === true) {
			dispatch({ type: types.CLEAR_MONITOR_CAMPAIGN_FORM });
			dispatch(refreshReports());
			navigate("/brand/monitoring/campaign");
		} else if (json.data.errors) {
			dispatch({
				type: types.MONITORING_CAMPAIGN_NEW_ERROR,
				data: json.data.errors,
			});
		}
	},
	addForm: (dispatch, form) => {
		dispatch({ type: types.HANDLE_CAMPAIGN_FORM_DATA, data: form });
	},

	addPayload: (dispatch, payload) => {
		dispatch({ type: types.HANDLE_SEARCH_PAYLOAD, data: payload });
	},

	addSelectedUser: (dispatch, payload) => {
		dispatch({ type: types.HANDLE_SELECTED_USER, data: payload });
	},

	fetchMonitorCompaigns: async (dispatch, page, data) => {
		dispatch({ type: types.FETCH_MONITOR_COMPAIGN_LOADING });
		const json = await Influencify.fetchMonitorCompaigns(page, data);
		dispatch({
			type: types.FETCH_MONITOR_COMPAIGN_SUCCESS,
			data: json.data.data,
			page: page,
		});
	},

	fetchfinishedCampaigns: async (dispatch, page, data) => {
		dispatch({ type: types.FETCH_FINISHED_COMPAIGN_LOADING });
		const json = await Influencify.fetchfinishedCampaigns(page, data);

		dispatch({
			type: types.FETCH_FINISHED_COMPAIGN_SUCCESS,
			data: json.data.data,
			page: page,
		});
	},

	SearchCampaign: async (dispatch, data) => {
		if (data && data.payload && data.payload.skip > 0) {
			dispatch({ type: types.LOADMORE_MONITOR_COMPAIGN_LOADING });
			const json = await Influencify.fetchMonitorCompaigns(data);
			dispatch({ type: types.LOADMORE_MONITOR_COMPAIGN_SUCCESS, data: json.data });
		} else {
			dispatch({ type: types.SEARCH_MONITOR_COMPAIGN_LOADING });
			const json = await Influencify.fetchMonitorCompaigns(data);
			dispatch({
				type: types.SEARCH_MONITOR_COMPAIGN_SUCCESS,
				data: json.data.data,
			});
		}
	},

	findMonitorCampaign: async (dispatch, data) => {
		dispatch({ type: types.FETCH_SINGLE_COMPAIGN_LOADING });
		const json = await Influencify.findMonitorCampaign(data);
		if (json.data.status) {
			dispatch({ type: types.FETCH_SINGLE_COMPAIGN_ERROR, data: json.data });
		} else {
			dispatch({ type: types.FETCH_SINGLE_COMPAIGN_SUCCESS, data: json.data });
		}
	},

	fetchBrandPages: async (dispatch, data) => {
		const json = await Influencify.fetchBrandPages(data);
		dispatch({ type: types.FETCH_BRAND_PAGES_SUCCESS, data: json.data });
	},

	fetchCampaignDetail: async (dispatch, data) => {
		dispatch({ type: types.FETCH_COMPAIGN_DETAIL_LOADING });
		const json = await Influencify.fetchCampaignDetail(data);

		dispatch({ type: types.FETCH_COMPAIGN_DETAIL_SUCCESS, data: json.data });
	},

	sponsoredMonitorPostFilter: (dispatch, payload, form) => {
		dispatch({
			type: types.HANDLE_SPONSORED_POSTS_FILTER,
			sponsorPostpayload: payload,
			sponsorPostForm: form,
		});
	},
	downloadCsv: async (dispatch, data) => {
		let payload = Object.assign({}, data.payload);
		if (payload.hasOwnProperty("paging") === false) {
			payload["paging"] = { limit: 10000, skip: 0 };
		}
		dispatch({ type: types.HANDLE_DOWNLOAD_CSV_LOADING });
		const json = await Influencify.MonitorDownloadCsv(payload);
		var link = document.createElement("a");
		link.download = "posts.csv";
		link.href = json.data;
		link.click();
		dispatch({ type: types.HANDLE_DOWNLOAD_CSV_SUCCESS });
	},

	searchCampaignContent: async (dispatch, data) => {
		dispatch({ type: types.SEARCH_CAMPAIGN_CONTENT_LOADING });
		const json = await Influencify.searchCampaignContent(data);
		dispatch({ type: types.SEARCH_CAMPAIGN_CONTENT_SUCCESS, data: json.data });
	},

	editCampaignName: async (dispatch, data) => {
		dispatch({ type: types.EDIT_CAMPAIGN_NAME_LOADING });
		const json = await Influencify.editCampaignName(data);
		dispatch({ type: types.EDIT_CAMPAIGN_NAME_SUCCESS, data: json.data });
	},

	fetchMentions: async (dispatch, data) => {
		dispatch({ type: types.FETCH_CONNECTED_MENTIONS_LOADING });
		const json = await Influencify.fetchMentions(data);
		dispatch({ type: types.FETCH_CONNECTED_MENTIONS_SUCCESS, data: json.data });
	},

	finishCampaign: async (ownProps, data) => {
		const json = await Influencify.finishCampaign(data);
		if (json.data.success === true) {
			ownProps.history.push("/brand/monitoring/campaign");
			//window.location.pathname = "/brand/monitoring/campaign";
		}
	},
	loadMoreContent: async (dispatch, data) => {
		dispatch({ type: types.MORE_MONITOR_CAMPAIGN_LOADING });
		const json = await Influencify.loadMoreContent(data);
		dispatch({ type: types.MORE_MONITOR_CAMPAIGN_SUCCESS, data: json.data });
	},

	changePageUrl: async (dispatch, page, query) => {
		dispatch({ type: types.FETCH_MORE_CONTENT_LOADING });
		const json = await Influencify.fetchMoreMonitorContent(page, query);
		dispatch({ type: types.FETCH_MORE_CONTENT_SUCCESS, data: json.data });
	},
};

export const reducer = (state = initialState, action) => {
	const { type, data, page } = action;
	switch (type) {
		case types.CREATE_COMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.CREATE_COMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
			};
		}

		case types.HANDLE_CAMPAIGN_FORM_DATA: {
			return {
				...state,
				form: data,
			};
		}

		case types.HANDLE_SEARCH_PAYLOAD: {
			return {
				...state,
				payload: data,
			};
		}

		case types.HANDLE_SELECTED_USER: {
			return {
				...state,
				form: data,
			};
		}

		case types.FETCH_MONITOR_COMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.FETCH_MONITOR_COMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
				fetchCompaigns:
					page > 1 ? state.fetchCompaigns.concat(data.data) : data && data.data,
				total: data && data.total,
				to: data && data.to,
				from: data && data.from,
			};
		}

		case types.FETCH_FINISHED_COMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.FETCH_FINISHED_COMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
				finishedCampaigns:
					page > 1
						? state.finishedCampaigns.concat(data.data)
						: data && data.data,
				finishTotal: data && data.total,
				finishTo: data && data.to,
				finishFrom: data && data.from,
			};
		}

		case types.SEARCH_MONITOR_COMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.LOADMORE_MONITOR_COMPAIGN_LOADING: {
			return {
				...state,
				load_more_loading: true,
			};
		}

		case types.LOADMORE_MONITOR_COMPAIGN_SUCCESS: {
			return {
				...state,
				load_more_loading: false,
				fetchCompaigns: state.fetchCompaigns.concat(data),
			};
		}

		case types.SEARCH_MONITOR_COMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
				load_more_loading: false,
				fetchCompaigns: data.data,
				to: data.to,
				from: data.from,
				total: data.total,
			};
		}

		case types.FETCH_COMPAIGN_DETAIL_LOADING: {
			return {
				...state,
				detailLoading: true,
			};
		}

		case types.FETCH_COMPAIGN_DETAIL_SUCCESS: {
			return {
				...state,
				detailLoading: false,
				campaignMonitorDetail: data.content.data,
				data: data,
				records: data.countRecord,
				real_mentions: data.real_mentions,
			};
		}

		case types.FETCH_SINGLE_COMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.FETCH_SINGLE_COMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
				fetchSingleCampaign: data.campaign,
				countries: data.locations,
				campaignFound: true,
			};
		}
		case types.FETCH_SINGLE_COMPAIGN_ERROR: {
			return {
				...state,
				isLoading: false,
				campaignFound: false,
			};
		}
		case types.HANDLE_DOWNLOAD_CSV_LOADING:
			return {
				...state,
				download_csv_loading: true,
			};
		case types.HANDLE_DOWNLOAD_CSV_SUCCESS:
			return {
				...state,
				download_csv_loading: false,
			};

		case types.SEARCH_CAMPAIGN_CONTENT_LOADING: {
			return {
				...state,
				detailLoading: true,
			};
		}

		case types.SEARCH_CAMPAIGN_CONTENT_SUCCESS: {
			return {
				...state,
				detailLoading: false,
				campaignMonitorDetail: data.content.data,
				records: data.countRecord,
				real_mentions: data.real_mentions,
			};
		}
		case types.EDIT_CAMPAIGN_NAME_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.EDIT_CAMPAIGN_NAME_SUCCESS: {
			return {
				...state,
				isLoading: false,
				fetchSingleCampaign: data,
			};
		}

		case types.FETCH_CONNECTED_MENTIONS_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.FETCH_CONNECTED_MENTIONS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				mentions: data.data,
			};
		}

		case types.FINISH_CAMPAIGN_LOADING: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.FINISH_CAMPAIGN_SUCCESS: {
			return {
				...state,
				isLoading: false,
				message: "Campaign Finish!",
			};
		}

		case types.MORE_MONITOR_CAMPAIGN_LOADING: {
			return {
				...state,
				detailLoading: true,
			};
		}

		case types.MORE_MONITOR_CAMPAIGN_SUCCESS: {
			return {
				...state,
				detailLoading: false,
				campaignMonitorDetail: state.campaignMonitorDetail.concat(
					data.contents.items
				),
				more_records: data.contents.more_available === true ? true : false,
				loadmorekey: data.contents.end_cursor,
			};
		}
		case types.FETCH_MORE_CONTENT_LOADING: {
			return {
				...state,
				detailLoading: true,
			};
		}

		case types.FETCH_MORE_CONTENT_SUCCESS: {
			return {
				...state,
				detailLoading: false,
				campaignMonitorDetail: data.content.data,
				data: data,
				records: data.countRecord,
				real_mentions: data.real_mentions,
			};
		}

		case types.FETCH_BRAND_PAGES_SUCCESS: {
			return {
				...state,
				brandPages: data,
			};
		}

		case types.CLEAR_MONITOR_CAMPAIGN_FORM: {
			return {
				...state,
				errors: {},
				form: {},
			};
		}

		case types.MONITORING_CAMPAIGN_NEW_ERROR: {
			return {
				...state,
				errors: data,
			};
		}

		default: {
			return state;
		}
	}
};
