import Influencify from "../../constants/Influencify";

export const types = {
	FILTER_ADS_LIBRARY_LOADING: "FILTER_ADS_LIBRARY_LOADING",
	FILTER_ADS_LIBRARY_SUCCESS: "FILTER_ADS_LIBRARY_SUCCESS",
	FETCH_ADS_LIBRARY_LOADING: "FETCH_ADS_LIBRARY_LOADING",
	FETCH_ADS_LIBRARY_SUCCESS: "FETCH_ADS_LIBRARY_SUCCESS",
	FETCH_ADS_LIBRARY_MORE: "FETCH_ADS_LIBRARY_MORE",
	ADD_FILTER_PAYLOAD: "ADD_FILTER_PAYLOAD",
	FETCH_MORE_ADS_LOADING: "FETCH_MORE_ADS_LOADING",
	FETCH_MORE_ADS_SUCCESS: "FETCH_MORE_ADS_SUCCESS",
};

const initialState = {
	is_loading: "",
	items: [],
	payload: { platforms: "instagram" },
	total: 0,
	is_loading_more: false,
};
export const actions = {
	fetchAdsLibrary: async (dispatch, page, filters) => {
		dispatch({ type: types.FETCH_ADS_LIBRARY_LOADING, data: page });
		const json = await Influencify.fetchAdsLibrary(page, filters);
		if (page > 1) {
			dispatch({ type: types.FETCH_ADS_LIBRARY_MORE, data: json.data });
		} else {
			dispatch({ type: types.FETCH_ADS_LIBRARY_SUCCESS, data: json.data });
		}
	},

	addFilterPayload: async (dispatch, payload) => {
		dispatch({ type: types.ADD_FILTER_PAYLOAD, data: payload });
	},

	applyFilters: async (dispatch, query) => {
		dispatch({ type: types.FILTER_ADS_LIBRARY_LOADING });
		const json = await Influencify.fetchAdsLibrary(query);
		dispatch({ type: types.FILTER_ADS_LIBRARY_SUCCESS, data: json.data });
	},

	changePageUrl: async (dispatch, query) => {
		dispatch({ type: types.FETCH_MORE_ADS_LOADING });
		const json = await Influencify.fetchAdsLibrary(query);
		dispatch({ type: types.FETCH_MORE_ADS_SUCCESS, data: json.data });
	},
};

export const reducer = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		case types.FETCH_ADS_LIBRARY_LOADING: {
			return {
				...state,
				is_loading: data > 1 ? false : true,
				is_loading_more: data > 1 ? true : false,
			};
		}
		case types.FETCH_ADS_LIBRARY_SUCCESS: {
			return {
				...state,
				is_loading: false,
				is_loading_more: false,
				items: data.data,
				total: data.total,
			};
		}

		case types.FETCH_ADS_LIBRARY_MORE: {
			return {
				...state,
				is_loading: false,
				is_loading_more: false,
				items: state.items.concat(data.data),
				total: data.total,
			};
		}

		case types.FETCH_MORE_ADS_LOADING: {
			return {
				...state,
				is_loading: true,
			};
		}
		case types.FETCH_MORE_ADS_SUCCESS: {
			return {
				...state,
				is_loading: false,
				items: data,
			};
		}

		case types.ADD_FILTER_PAYLOAD: {
			return {
				...state,
				payload: data,
			};
		}

		case types.FILTER_ADS_LIBRARY_LOADING: {
			return {
				...state,
				is_loading: true,
			};
		}
		case types.FILTER_ADS_LIBRARY_SUCCESS: {
			return {
				...state,
				is_loading: false,
				items: data,
			};
		}

		default: {
			return state;
		}
	}
};
