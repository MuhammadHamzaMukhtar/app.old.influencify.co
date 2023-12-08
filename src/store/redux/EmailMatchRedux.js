import Influencify from "../../constants/Influencify";
import { refreshReports } from "../actions/HeaderActions";
import { toast } from "react-toastify";

export const types = {
	SUBMIT_EMAIL_MATCH_FILE_PENDING: "SUBMIT_EMAIL_MATCH_FILE_PENDING",
	SUBMIT_EMAIL_MATCH_FILE_SUCCESS: "SUBMIT_EMAIL_MATCH_FILE_SUCCESS",
	SUBMIT_EMAIL_MATCH_FILE_FAILURE: "SUBMIT_EMAIL_MATCH_FILE_FAILURE",
};

export const actions = {
	submitEmailMatchFile: async (dispatch, data) => {
		dispatch({ type: types.SUBMIT_EMAIL_MATCH_FILE_PENDING });
		const json = await Influencify.submitEmailMatchFile(data);
		if (json !== undefined) {
			dispatch({
				type: types.SUBMIT_EMAIL_MATCH_FILE_SUCCESS,
				data: json.data,
			});
		}
		return json;
	},
	submitEmailMatchData: async (dispatch, data) => {
		dispatch({ type: types.SUBMIT_EMAIL_MATCH_FILE_PENDING });
		const json = await Influencify.submitEmailMatchData(data);
		if (json !== undefined) {
			if (json.status === 200) {
				if (!json.data.success) {
					toast.error(json.data.message);
				} else {
					dispatch(refreshReports());
				}
			}
			dispatch({
				type: types.SUBMIT_EMAIL_MATCH_FILE_SUCCESS,
				data: json.data,
			});
		}
		return json;
	},
};

const initialState = {
	data: [],
	isProcessing: false,
};

export const reducer = (state = initialState, action) => {
	const { type, data } = action;
	switch (type) {
		case types.SUBMIT_EMAIL_MATCH_FILE_PENDING: {
			return {
				...state,
				isProcessing: true,
			};
		}

		case types.SUBMIT_EMAIL_MATCH_FILE_SUCCESS: {
			return {
				...state,
				isProcessing: false,
				data: data,
			};
		}

		default: {
			return state;
		}
	}
};
