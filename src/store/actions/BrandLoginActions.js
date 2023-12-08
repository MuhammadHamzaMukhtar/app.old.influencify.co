import Api from "@services/axios";
import Influencify from "../../constants/Influencify";
import {
	HANDLE_BRAND_LOGIN_SUCCESS,
	BRAND_LOGIN_INIT,
	BRAND_LOGIN_FINISH,
	BRAND_EMAIL_INIT,
	BRAND_EMAIL_FINISH,
} from "../constants/action-types";
import { BrandsLogin } from "@services/brand/auth/BrandRegPost";
import { toast } from "react-toastify";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_FINISH = "LOGIN_FINISH";
export const HANDLE_LOGIN_SUBMIT = "HANDLE_LOGIN_SUBMIT";
export const HANDLE_LOGIN_CHANGE = "HANDLE_LOGIN_CHANGE";
export const HANDLE_LOGOUT_SUBMIT = "HANDLE_LOGOUT_SUBMIT";
export const FACEBOOK_LOGIN_BUTTON = "FACEBOOK_LOGIN_BUTTON";
export const HANDLE_LOGIN_SUBMIT_FAIL = "HANDLE_LOGIN_SUBMIT_FAIL";

export const handleLoginSubmit =
	(email, password, remember_me) => (dispatch) => {
		let data = {
			email: email,
			password: password,
			remember_me: remember_me,
			type: "brand",
		};
		dispatch({
			type: LOGIN_INIT,
		});
		dispatch({ type: "BRAND_LOGIN_HANDLE_VALIDATION_ERRORS_CLEAR" });
		BrandsLogin(data)
			.then((res) => {
				if (res.data.errors || res.data.error) {
					dispatch({
						type: "BRAND_LOGIN_HANDLE_VALIDATION_ERRORS",
						payload: res.data.errors ?? res.data.error,
					});
					dispatch({
						type: LOGIN_FINISH,
					});
				} else {
					Api.setClientToken(res.data.access_token);
					Influencify.setClientToken(res.data.access_token);

					dispatch({
						type: HANDLE_LOGIN_SUBMIT,
						payload: res.data,
					});
				}
			})
			.catch((error) => {
				dispatch({
					type: LOGIN_FINISH,
				});
				dispatch({
					type: HANDLE_LOGIN_SUBMIT_FAIL,
					payload: error,
				});
			});
	};

export const brandLoginAfterVerification = (userId) => (dispatch) => {
	dispatch({
		type: BRAND_LOGIN_INIT,
	});
	// Api.brandVerification(userId)
	// axios
	//   .get(process.env.REACT_APP_BASE_URL + "/api/v1/brand-login/" + userId)
	Api.brandVerification(userId)
		.then((res) => {
			dispatch({
				type: HANDLE_BRAND_LOGIN_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: BRAND_LOGIN_FINISH,
			});
		})
		.catch((error) => {
			window.location.href = "/"
			toast.error("Account Closed")
		});
};

export const sendVerificationLink = (email) => (dispatch) => {
	dispatch({
		type: BRAND_EMAIL_INIT,
	});
	// Api.brandVerification(userId)
	// axios
	//   .get(process.env.REACT_APP_BASE_URL + "/api/v1/brand-login/" + userId)
	Api.brandSendVerificationLink(email)
		.then((res) => {
			if (res.status == 200) {
				toast.success(res.data.message);
			} else {
				toast.error('Something went wrong')
			}
			dispatch({
				type: BRAND_EMAIL_FINISH,
			});
		})
		.catch((error) => {
			toast.error("Something went wrong")
		});
};

export const handleChange = (name, value) => (dispatch) => {
	dispatch({
		type: HANDLE_LOGIN_CHANGE,
		payload: {
			name: name[0],
			value: value,
		},
	});
};

export const checkFacebookLogin = () => (dispatch) => {
	Api.faceBook()
		// axios
		//   .get(helper.url + "/api/v1/auth/facebook")
		.then((res) => { })
		.catch((res) => { });
};

export const handleSubmit = () => (dispatch) => { };
