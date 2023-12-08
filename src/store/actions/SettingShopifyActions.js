// import axios from "axios";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_BRAND_SHOPIFY_VERIFY_TOKEN_SUCCESS,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const brandVerifyShopifyToken = async (ownProps, dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/brand-shopify-verify-token')
	const json = await Api.BrandVerifyShopifyToken(ownProps);
	dispatch({
		type: HANDLE_BRAND_SHOPIFY_VERIFY_TOKEN_SUCCESS,
	});
	dispatch({
		type: AJAX_CALL_FINSH,
	});

	return json;
};

export const disconnectShopifyStore = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//axios
	// .post(helper.url + "/api/v1/brand-shopify-disconnect")
	Api.DisconnectShopifyStore()
		.then((res) => {
			dispatch({
				type: "HANDLE_BRAND_SHOPIFY_DISCONNECT",
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};

export const startImportProduct = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/shopify-import-product-start")
	Api.StartImportProduct()
		.then((res) => {
			toast.success(res.data);
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};

export const startImportCustomer = (data) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios
	// .post(helper.url + "/api/v1/shopify-customer-email-start", data)
	Api.StartImportCustomer(data)
		.then((res) => {
			toast.success(res.data);
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {});
};
