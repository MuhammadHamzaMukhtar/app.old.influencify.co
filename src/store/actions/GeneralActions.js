import {
	FETCH_COUNTRIES_SUCCESS,
	FETCH_COUNTRIES_FAILURE,
	FETCH_STATES_SUCCESS,
	FETCH_STATES_FAILURE,
	FETCH_CITIES_SUCCESS,
	FETCH_CITIES_FAILURE,
	FETCH_TIMEZONES_SUCCESS,
	FETCH_TIMEZONES_FAILURE,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_CURRENCIES_FAILURE,
	HANDLE_SELECT_CURRENCY_SUCCESS,
} from "../constants/action-types";
// import axios from "axios";
import Api from "@services/axios";

export const fetchCountries = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-countries')
	Api.FetchCountries()
		.then((res) => {
			dispatch({
				type: FETCH_COUNTRIES_SUCCESS,
				payload: res.data.countries,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_COUNTRIES_FAILURE,
				payload: error,
			});
		});
};

export const fetchStates = (countryId) => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch-states/" + countryId)
	Api.FetchStates(countryId)
		.then((res) => {
			dispatch({
				type: FETCH_STATES_SUCCESS,
				payload: res.data.states,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_STATES_FAILURE,
				payload: error,
			});
		});
};

export const fetchCities = (stateId) => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch-cities/" + stateId)
	Api.FetchCities(stateId)
		.then((res) => {
			dispatch({
				type: FETCH_CITIES_SUCCESS,
				payload: res.data.cities,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CITIES_FAILURE,
				payload: error,
			});
		});
};

export const fetchTimeZones = (countryId) => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch-time-zones/" + countryId)
	Api.FetchTimeZones(countryId)
		.then((res) => {
			dispatch({
				type: FETCH_TIMEZONES_SUCCESS,
				payload: res.data.timeZones,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_TIMEZONES_FAILURE,
				payload: error,
			});
		});
};

export const fetchCurrencies = () => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch-currencies")
	Api.FetchCurrencies()
		.then((res) => {
			dispatch({
				type: FETCH_CURRENCIES_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CURRENCIES_FAILURE,
				payload: error,
			});
		});
};

export const fetchCurrency = (coutryCode) => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch-currencies")
	Api.FetchCurrency(coutryCode)
		.then((res) => {
			dispatch({
				type: FETCH_CURRENCIES_SUCCESS,
				payload: res.data.data,
			});
			let currency = {
				label: res.data.data[0]?.code,
				value: res.data.data[0]?.id,
			};
			dispatch({ type: HANDLE_SELECT_CURRENCY_SUCCESS, payload: currency });
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CURRENCIES_FAILURE,
				payload: error,
			});
		});
};
