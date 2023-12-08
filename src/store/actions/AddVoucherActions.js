// import axios from 'axios';
import helper from "../../constants/helper";
import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { FETCH_CATEGORIES_FAILURE } from "../constants/action-types";
import {
	HANDLE_VALIDATION_ERRORS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_VOUCHER_ADD_SUCCESS,
	HANDLE_VOUCHER_ADD_FAILURE,
	HANDLE_CREDITS_ERRORS,
} from "../constants/action-types";
import { refreshReports } from "./HeaderActions";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const fetchCategories = () => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-user-categories')
	Api.categoryFetch()
		.then((res) => {
			dispatch({
				type: FETCH_CATEGORIES_SUCCESS,
				payload: res.data.categoires,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CATEGORIES_FAILURE,
				payload: error,
			});
		});
};

export const handleVoucherAdd = (query, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	Api.VoucherAdd(query)
		// axios.post(helper.url+'/api/v1/add-vocher' , query)
		.then((res) => {
			if (res.data.error) {
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch({
					type: HANDLE_CREDITS_ERRORS,
				});
				toast.error(helper.productcreditMsg);
			} else if (res.data.errors) {
				if (res.data.errors.limit) {
					toast.error(res.data.errors.limit);
				}
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				dispatch({
					type: HANDLE_VOUCHER_ADD_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(refreshReports());
				ownProps.history.push("/products");
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_VOUCHER_ADD_FAILURE,
				payload: error,
			});
		});
};
