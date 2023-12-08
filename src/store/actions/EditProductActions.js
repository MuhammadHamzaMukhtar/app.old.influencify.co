import Api from "@services/axios";
import { HANDLE_FETCH_OFFER_SUCCESS } from "../constants/action-types";
import { HANDLE_FETCH_OFFER_FAILURE } from "../constants/action-types";
import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { FETCH_CATEGORIES_FAILURE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_PRODUCT_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_PRODUCT_UPDATE_FAILURE } from "../constants/action-types";
import { HANDLE_REMOVE_PRODUCT_SUCCESS } from "../constants/action-types";
import { HANDLE_REMOVE_PRODUCT_FAILURE } from "../constants/action-types";
import { HANDLE_RETIRE_PRODUCT_SUCCESS } from "../constants/action-types";
import { HANDLE_RETIRE_PRODUCT_FAILURE } from "../constants/action-types";
import { HANDLE_REMOVE_RETIRE_PRODUCT_SUCCESS } from "../constants/action-types";
import {
	HANDLE_REMOVE_RETIRE_PRODUCT_FAILURE,
	HANDLE_REMOVE_VOUCHER_PDF_SUCCESS,
	HANDLE_REMOVE_VOUCHER_PDF_FAILURE,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_UPLOAD_VOUCHER_PDF_SUCCESS,
	HANDLE_UPLOAD_VOUCHER_PDF_FAILURE,
} from "../constants/action-types";
import { refreshReports } from "./HeaderActions";
import { toast } from "react-toastify";

export const fetchOffer = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-offer/'+ id)
	Api.FetchOffer(id)
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_OFFER_SUCCESS,
				payload: {
					name: res.data.data.name,
					status: res.data.data.status,
					value: res.data.data.value,
					url: res.data.data.url,
					offer_type: res.data.data.offer_type,
					code_num_of_vouchers: res.data.data.code_num_of_vouchers,
					link_num_of_vouchers: res.data.data.link_num_of_vouchers,
					code_vouchers: res.data.data.code_vouchers,
					link_vouchers: res.data.data.link_vouchers,
					voucher_type: res.data.data.voucher_type,
					retire: res.data.data.retire,
					format_of_voucher: res.data.data.format_of_voucher,
					description: res.data.data.description,
					category: res.data.data.category,
					images: res.data.data.images,
					voucher_pdf_path: res.data.data.voucher_pdf_path,
					voucher_pdf_name: res.data.data.voucher_pdf_name,
					influencer_tab_value: res.data.data.influencer_tab_value,
					influencer_discount_value: res.data.data.influencer_discount_value,
					influencer_discount_code: res.data.data.influencer_discount_code,
					is_discount_for_follower: res.data.data.is_discount_for_follower,
					follower_discount_value: res.data.data.follower_discount_value,
					follower_discount_code: res.data.data.follower_discount_code,
					is_affiliate_commission: res.data.data.is_affiliate_commission,
					affiliate_commission_value: res.data.data.affiliate_commission_value,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_FETCH_OFFER_FAILURE,
				payload: error,
			});
		});
};

export const fetchCategories = () => (dispatch) => {
	// axios;
	// .get(helper.url + "/api/v1/fetch-user-categories")
	Api.FetchCategories()
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

export const handleProductUpdate = (query, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	// .post(helper.url + "/api/v1/update-product", query)
	Api.ProductUpdateHandle(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				dispatch({
					type: HANDLE_PRODUCT_UPDATE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(refreshReports());
				// window.location.href = "/products";
				ownProps.Navigate("/products");
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_PRODUCT_UPDATE_FAILURE,
				payload: error,
			});
		});
};

export const handleImageDelete = (query) => (dispatch) => {
	// dispatch({
	// 	type: AJAX_CALL_INIT,
	// });
	Api.ProductImageDeleteHandle(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				dispatch({
					type: HANDLE_PRODUCT_UPDATE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(refreshReports());
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_PRODUCT_UPDATE_FAILURE,
				payload: error,
			});
		});
};

export const handleImageAdd = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
		payload: query
	});
	Api.ProductImageAddHandle(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				toast.error(res.data.errors.img_error[0]);
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				dispatch({
					type: HANDLE_PRODUCT_UPDATE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(refreshReports());
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_PRODUCT_UPDATE_FAILURE,
				payload: error,
			});
		});
};

export const handleProductRemove = (query, ownProps) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/remove-offer", query)
	Api.ProductRemoveHandle(query)
		.then((res) => {
			dispatch({
				type: HANDLE_REMOVE_PRODUCT_SUCCESS,
				payload: res.data,
			});
			ownProps.history.push("/products");
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REMOVE_PRODUCT_FAILURE,
				payload: error,
			});
		});
};

export const handleUploadProductPdf = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/upload-voucher-pdf", query)
	Api.UploadProductPdfHandle(query)
		.then((res) => {
			dispatch({
				type: HANDLE_UPLOAD_VOUCHER_PDF_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(fetchOffer(res.data.product.id));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPLOAD_VOUCHER_PDF_FAILURE,
				payload: error,
			});
		});
};

export const removeVoucherPdf = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/remove-voucher-pdf", query)
	Api.RemoveVoucherPdf(query)
		.then((res) => {
			dispatch({
				type: HANDLE_REMOVE_VOUCHER_PDF_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(fetchOffer(query.unique_id));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REMOVE_VOUCHER_PDF_FAILURE,
				payload: error,
			});
		});
};

export const handleProductRetire = (query) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/offer-retire", query)
	Api.ProductRetireHandle(query)
		.then((res) => {
			dispatch({
				type: HANDLE_RETIRE_PRODUCT_SUCCESS,
				payload: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_RETIRE_PRODUCT_FAILURE,
				payload: error,
			});
		});
};
export const handleRemoveProductRetire = (query) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/remove-offer-retire", query)
	Api.RemoveProductRetireHandle(query)
		.then((res) => {
			dispatch({
				type: HANDLE_REMOVE_RETIRE_PRODUCT_SUCCESS,
				payload: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REMOVE_RETIRE_PRODUCT_FAILURE,
				payload: error,
			});
		});
};
