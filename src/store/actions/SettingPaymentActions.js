import Api from "@services/axios";
// import axios from "axios";
import { HANDLE_FETCH_CREDIT_CARDS_SUCCESS } from "../constants/action-types";
import { HANDLE_FETCH_CREDIT_CARDS_FAILURE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_ADD_CREDIT_CARD_SUCCESS } from "../constants/action-types";
import { HANDLE_ADD_CREDIT_CARD_FAILURE } from "../constants/action-types";
import { HANDLE_REMOVE_CREDIT_CARD_SUCCESS } from "../constants/action-types";
import { HANDLE_REMOVE_CREDIT_CARD_FAILURE } from "../constants/action-types";
import { HANDLE_UPDATE_BILLING_ADDRESS_SUCCESS } from "../constants/action-types";
import { HANDLE_UPDATE_BILLING_ADDRESS_FAILURE } from "../constants/action-types";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	FETCH_COUNTRIES_SUCCESS,
	FETCH_COUNTRIES_FAILURE,
	HANDLE_ADD_BANK_ACCOUNT_SUCCESS,
	HANDLE_ADD_BANK_ACCOUNT_FAILURE,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_CURRENCIES_FAILURE,
	USER_ATTACHED_ACCOUNTS_SUCCESS,
	USER_ATTACHED_ACCOUNTS_FAILURE,
	HANDLE_REMOVE_BANK_ACCOUNT_SUCCESS,
	HANDLE_REMOVE_BANK_ACCOUNT_FAILURE,
	HANDLE_SWTICH_PAYMENT_METHOD_SUCCESS,
	HANDLE_SWTICH_PAYMENT_METHOD_FAILURE,
} from "../constants/action-types";

export const handleFetchCreditCards = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.get(helper.url + '/api/v1/fetch-credit-cards')
	Api.HandleFetchCreditCards()
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_CREDIT_CARDS_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_FETCH_CREDIT_CARDS_FAILURE,
				payload: error,
			});
		});
};

export const handleAddCreditCard = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/add-new-card", query)
	Api.HandleAddCreditCard(query)
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
					type: HANDLE_ADD_CREDIT_CARD_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_ADD_CREDIT_CARD_FAILURE,
				payload: error,
			});
		});
};

export const handleRemoveCreditCard = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/remove-credit-card", query)
	Api.HandleRemoveCreditCard(query)
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
					type: HANDLE_REMOVE_CREDIT_CARD_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REMOVE_CREDIT_CARD_FAILURE,
				payload: error,
			});
		});
};

export const handleBillingAddressUpdate = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/update-billing-address", query)
	Api.HandleBillingAddressUpdate(query)
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
					type: HANDLE_UPDATE_BILLING_ADDRESS_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_UPDATE_BILLING_ADDRESS_FAILURE,
				payload: error,
			});
		});
};

export const fetchCountries = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/fetch-countries")
	Api.FetchCountries()
		.then((res) => {
			dispatch({
				type: FETCH_COUNTRIES_SUCCESS,
				payload: res.data.countries,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_COUNTRIES_FAILURE,
				payload: error,
			});
		});
};

export const fetchCurrencies = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/fetch-currencies")
	Api.FetchCurrencies()
		.then((res) => {
			dispatch({
				type: FETCH_CURRENCIES_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CURRENCIES_FAILURE,
				payload: error,
			});
		});
};

export const userAttachedAccounts = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//axios;
	// .get(helper.url + "/api/v1/user-attached-accounts")
	Api.UserAttachedAccounts()
		.then((res) => {
			dispatch({
				type: USER_ATTACHED_ACCOUNTS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: USER_ATTACHED_ACCOUNTS_FAILURE,
				payload: error,
			});
		});
};

export const handleAddBankAccount = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/add-bank-account", query)
	Api.HandleAddBankAccount(query)
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
					type: HANDLE_ADD_BANK_ACCOUNT_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				dispatch(userAttachedAccounts());
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_ADD_BANK_ACCOUNT_FAILURE,
				payload: error,
			});
		});
};

export const removeBankAccount = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//axios
	// .post(helper.url + "/api/v1/remove-bank-account", query)
	Api.RemoveBankAccount(query)
		.then((res) => {
			dispatch({
				type: HANDLE_REMOVE_BANK_ACCOUNT_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(userAttachedAccounts());
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REMOVE_BANK_ACCOUNT_FAILURE,
				payload: error,
			});
		});
};

export const switchPaymentMethod = (query) => (dispatch) => {
	//axios
	// .post(helper.url + "/api/v1/switch-payment-method", query)
	Api.SwitchPaymentMethod(query)
		.then((res) => {
			dispatch({
				type: HANDLE_SWTICH_PAYMENT_METHOD_SUCCESS,
				payload: res.data,
			});
			dispatch(userAttachedAccounts());
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_SWTICH_PAYMENT_METHOD_FAILURE,
				payload: error,
			});
		});
};
