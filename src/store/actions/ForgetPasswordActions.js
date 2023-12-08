import Api from "@services/axios";
import {
	HANDLE_VALIDATION_ERRORS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_FORGET_PASSWORD_SUBMIT_SUCEESS,
	HANDLE_FORGET_PASSWORD_SUBMIT_FAILURE,
	HANDLE_RESET_PASSWORD_VIEW_SUCEESS,
	HANDLE_RESET_PASSWORD_VIEW_FAILURE,
	HANDLE_RESET_PASSWORD_SUBMIT_SUCEESS,
	HANDLE_RESET_PASSWORD_SUBMIT_FAILURE,
} from "../constants/action-types";

export const handleForgetPasswrodSubmit = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	Api.HandleForgetPasswrodSubmit(query)
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
					type: HANDLE_FORGET_PASSWORD_SUBMIT_SUCEESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_FORGET_PASSWORD_SUBMIT_FAILURE,
				payload: error,
			});
		});
};

export const handleResetPasswordView = (token, email) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//axios
	// .post(helper.url + "/api/v1/password/reset/" + token)
	Api.HandleResetPasswordView(token, email)
		.then((res) => {
			dispatch({
				type: HANDLE_RESET_PASSWORD_VIEW_SUCEESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_RESET_PASSWORD_VIEW_FAILURE,
				payload: error,
			});
		});
};

export const handleBrandResetPasswrodSubmit = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/reset", query)
	Api.HandleBrandResetPasswrodSubmit(query)
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
					type: HANDLE_RESET_PASSWORD_SUBMIT_SUCEESS,
					payload: "",
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				if (res.data.name === "influencer") {
					window.location.href =
						process.env.REACT_APP_URL + "/influencer/login";
				} else {
					window.location.href =
						process.env.REACT_APP_URL + "/brand/login";
				}
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_RESET_PASSWORD_SUBMIT_FAILURE,
				payload: error,
			});
		});
};
