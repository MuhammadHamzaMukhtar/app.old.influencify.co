import Api from "@services/axios";
import axios from "axios";
import Influencify from "../../constants/Influencify";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_FINISH = "LOGIN_FINISH";
export const HANDLE_LOGIN_SUBMIT = "HANDLE_LOGIN_SUBMIT";
export const HANDLE_LOGIN_CHANGE = "HANDLE_LOGIN_CHANGE";
export const HANDLE_LOGOUT_SUBMIT = "HANDLE_LOGOUT_SUBMIT";
export const FACEBOOK_LOGIN_BUTTON = "FACEBOOK_LOGIN_BUTTON";
export const HANDLE_LOGIN_SUBMIT_FAIL = "HANDLE_LOGIN_SUBMIT_FAIL";

export const facebookLoginLink = () => (dispatch) => {
	window.FB.login(
		function (response) {
			if (response.status === "connected") {
				var accessToken = response.authResponse.accessToken;
				window.FB.api(
					"/me",
					"GET",
					{
						fields:
							"id,email,age_range,first_name,last_name,gender,inspirational_people,is_guest_user,name_format,link,name,short_name,test_group,friends,posts,brand_teams,accounts,picture,hometown",
					},
					function (response) {
						let data = {
							response: response,
							accessToken: accessToken,
						};
						axios
							.post(
								process.env.REACT_APP_BASE_URL + "/api/v1/facebook/callback",
								data
							)
							// Api.FacebookLoginLink(data)
							.then((res) => {
								dispatch({
									type: FACEBOOK_LOGIN_BUTTON,
									payload: res.data,
								});
							})
							.catch((error) => {});
					}
				);
			} else {
			}
		},
		{ scope: "email", return_scopes: true }
	);
};

export const handleLoginSubmit =
	(email, password, remember_me) => (dispatch) => {
		let data = {
			email: email,
			password: password,
			remember_me: remember_me,
			type: "influencer",
		};
		dispatch({
			type: LOGIN_INIT,
		});
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/v1/login", data)
			// Api.influencerLogin(data)
			.then((res) => {
				if (res.data.errors) {
					dispatch({
						type: HANDLE_VALIDATION_ERRORS,
						payload: res.data.errors,
					});

					dispatch({
						type: LOGIN_FINISH,
					});
				} else {
					Influencify.setClientToken(res.data.access_token);
					Api.setClientToken(res.data.access_token);

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
	axios
		.get(process.env.REACT_APP_BASE_URL + "/api/v1/auth/facebook")
		// Api.CheckFacebookLogin()
		.then((res) => {})
		.catch((res) => {});
};

export const handleSubmit = () => (dispatch) => {};
