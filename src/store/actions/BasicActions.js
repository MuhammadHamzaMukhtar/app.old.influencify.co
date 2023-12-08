import Api from "@services/axios";
import {
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILURE,
	FETCH_GOALS_SUCCESS,
	FETCH_GOALS_FAILURE,
} from "../constants/action-types";
import {} from "../constants/action-types";
export var HANDLE_BASIC_CHANGE = "HANDLE_BASIC_CHANGE";
export const ADD_COUNTRY_FIELD = "ADD_COUNTRY_FIELD";
export const REMOVE_COUNTRY_FIELD = "REMOVE_COUNTRY_FIELD";
export const HANDLE_CHANGE = "HANDLE_CHANGE";
export const FETCH_PLATFORMS_SUCCESS = "FETCH_PLATFORMS_SUCCESS";
export const FETCH_PLATFORMS_FAILURE = "FETCH_PLATFORMS_FAILURE";
export const HANDLE_TITLE_CHANGE = "HANDLE_TITLE_CHANGE";
export const HANDLE_PLATFORM_CHANGE = "HANDLE_PLATFORM_CHANGE";

export const fetchPlatforms = () => (dispatch) => {
	Api.Platforms()
		// axios.get(helper.url + '/api/v1/platforms')
		.then((res) => {
			dispatch({
				type: FETCH_PLATFORMS_SUCCESS,
				payload: res.data.platforms,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_PLATFORMS_FAILURE,
				payload: error,
			});
		});
};

export const addCountryField = () => (dispatch) => {
	dispatch({
		type: ADD_COUNTRY_FIELD,
	});
};

export const removeCountryField = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_COUNTRY_FIELD,
		payload: id,
	});
};

export const handleCountryChange = (event, id) => (dispatch) => {
	dispatch({
		type: HANDLE_CHANGE,
		payload: {
			value: event.target.value,
			index: id,
		},
	});
};

export const handleBasicSubmit = (event, id) => (dispatch) => {
	dispatch({
		type: HANDLE_CHANGE,
		payload: {
			value: event.target.value,
			index: id,
		},
	});
};

export const fetchCampaignCategories = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-campaign-categories')
	Api.CampaignCategories()
		.then((res) => {
			dispatch({
				type: FETCH_CATEGORIES_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CATEGORIES_FAILURE,
				payload: error,
			});
		});
};
export const fetchCampaignGoals = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-campaign-goals')
	Api.CampaignGoals()
		.then((res) => {
			dispatch({
				type: FETCH_GOALS_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_GOALS_FAILURE,
				payload: error,
			});
		});
};
