import Api from "@services/axios";
// import axios from "axios";
import { FETCH_PRODUCTS_SUCCESS } from "../constants/action-types";
import { FETCH_PRODUCTS_FAILURE } from "../constants/action-types";
import { HANDLE_FETCH_ALL_PRODUCTSS_SUCCESS } from "../constants/action-types";
import { HANDLE_FETCH_ALL_PRODUCTSS_FAILURE } from "../constants/action-types";

export const fetchProducts = (query) => (dispatch) => {
	// axios.post(helper.url + '/api/v1/fetch-products' , query)
	Api.FetchProducts(query)
		.then((res) => {
			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((res) => {
			dispatch({
				type: FETCH_PRODUCTS_FAILURE,
				payload: res.error,
			});
		});
};

export const fetchAllProducts = (query) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/fetch-all-products", query)
	Api.FetchAllProducts(query)
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_ALL_PRODUCTSS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((res) => {
			dispatch({
				type: HANDLE_FETCH_ALL_PRODUCTSS_FAILURE,
				payload: res.error,
			});
		});
};
