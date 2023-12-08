import Influencify from "../../constants/Influencify";
import { fetchBrandNotableUsers } from "../actions/BrandAmbassadorsActions";
import { refreshReports } from "../actions/HeaderActions";


export const types = {
	AJAX_CALL_INIT: "AJAX_CALL_INIT",
	AJAX_CALL_FINISH: "AJAX_CALL_FINISH",
	HANDLE_BRAND_DISCONNECT_INSTAGRAM: "HANDLE_BRAND_DISCONNECT_INSTAGRAM",
};

export const actions = {
	disconnectPlatform: async (dispatch, data) => {
		const json = await Influencify.disconnectPlatform(data);
		if (json.data === "success") {
			dispatch(fetchBrandNotableUsers({ platform: data.platform }));
		}
	},

	submitInfluentialForm: async (dispatch, data) => {
		dispatch({ type: types.AJAX_CALL_INIT });
		const json = await Influencify.exportdryRunReports(data);
		dispatch({ type: types.AJAX_CALL_FINISH });
		dispatch(refreshReports());
		return json;
	},

	submitInfluentialTopData: async (dispatch, data) => {
		dispatch({ type: types.AJAX_CALL_INIT });
		const json = await Influencify.influentialLists(data);
		dispatch({ type: types.AJAX_CALL_FINISH });
		dispatch(refreshReports());
		return json;
	},
};

const initialState = {
	isLoading: false,
};

export const reducer = (state = initialState, action) => {
	const { type } = action;
	switch (type) {
		case types.HANDLE_BRAND_DISCONNECT_INSTAGRAM: {
			return {
				...state,
			};
		}

		case types.AJAX_CALL_INIT: {
			return {
				...state,
				isLoading: true,
			};
		}

		case types.AJAX_CALL_FINISH: {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return state;
		}
	}
};
