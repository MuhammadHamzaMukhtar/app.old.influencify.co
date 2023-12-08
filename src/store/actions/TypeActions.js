import { HANDLE_SELECT_TYPE_SUCCESS } from "../constants/action-types";
// import axios from "axios";
import Api from "@services/axios";
export const FETCH_TYPES_SUCCESS = "FETCH_TYPES_SUCCESS";
export const FETCH_TYPES_FAILURE = "FETCH_TYPES_FAILURE";
export const SELECT_TYPE = "SELECT_TYPE";

export const fetchTypes = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/types')
	Api.FetchTypes()
		.then((res) => {
			dispatch({
				type: FETCH_TYPES_SUCCESS,
				payload: res.data.types,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_TYPES_FAILURE,
				payload: error,
			});
		});
};

export const handleTypeChange = (id, name) => (dispatch) => {
	dispatch({
		type: HANDLE_SELECT_TYPE_SUCCESS,
		payload: {
			id: id,
			name: name,
		},
	});
};
