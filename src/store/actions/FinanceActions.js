import Api from "@services/axios";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	BRAND_TRANSACTIONS_SUCCESS,
	BRAND_TRANSACTIONS_FAILURE,
	INFLUENCER_FINANCES_SUCCESS,
	INFLUENCER_FINANCES_FAILURE,
	HANDLE_DOWNLOAD_INVOICE_SUCCESS,
	HANDLE_DOWNLOAD_INVOICE_FAILURE,
	HANDLE_INFLUENCER_WITHDRAWAL_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_WITHDRAWAL_REQUEST_FAILURE,
} from "../constants/action-types";

export const fetchBrandTransactions = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.post(helper.url + '/api/v1/brand-transactions' ,query)
	Api.BrandTransactionsFetch(query)
		.then((res) => {
			dispatch({
				type: BRAND_TRANSACTIONS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_TRANSACTIONS_FAILURE,
				payload: error,
			});
		});
};

export const fetchInfluencerFinances = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-finances", query)
	Api.FetchInfluencerFinances(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_FINANCES_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_FINANCES_FAILURE,
				payload: error,
			});
		});
};

// export const downloadInvoice = (id) => (dispatch) => {
// 	dispatch({
// 		type: AJAX_CALL_INIT,
// 	});
// 	//   axios
// 	//     .get(helper.url + "/api/v1/download-invoice/" + id)
// 	Api.DownloadInvoice(id)
// 		.then((res) => {
// 			dispatch({
// 				type: HANDLE_DOWNLOAD_INVOICE_SUCCESS,
// 				payload: res.data,
// 			});
// 			dispatch({
// 				type: AJAX_CALL_FINSH,
// 			});
// 		})
// 		.catch((error) => {
// 			dispatch({
// 				type: HANDLE_DOWNLOAD_INVOICE_FAILURE,
// 				payload: error,
// 			});
// 		});
// };

export const sendWithdrawalRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-withdrawal-request", query)
	Api.SendWithdrawalRequest(query)
		.then((res) => {
			dispatch({
				type: HANDLE_INFLUENCER_WITHDRAWAL_REQUEST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_WITHDRAWAL_REQUEST_FAILURE,
				payload: error,
			});
		});
};
