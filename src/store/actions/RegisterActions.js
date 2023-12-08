import axios from "axios";
import {
	HANDLE_VALIDATION_ERRORS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_REGISTER_SUBMIT_SUCEESS,
	HANDLE_REGISTER_SUBMIT_FAILURE,
	FETCH_USER_CATEGORIES_SUCCESS,
	FETCH_USER_CATEGORIES_FAILURE,
	HANDLE_REGISTER_INIVTED_INFLUENCER_SUCEESS,
	HANDLE_REGISTER_INIVTED_INFLUENCER_FAILURE,
	FETCH_PLAN_SUMMARY_SUCCESS,
	FETCH_PLAN_SUMMARY_FAILURE,
	HANDLE_APPLY_COUPON_SUCEESS,
	HANDLE_APPLY_COUPON_FAILURE,
	HANDLE_REGISTER_BRAND_SUBMIT_SUCEESS,
	HANDLE_REGISTER_BRAND_SUBMIT_FAILURE,
} from "../constants/action-types";
// import {currentLoggedInUser} from "./HeaderActions";
import { toast } from "react-toastify";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_FINISH = "LOGIN_FINISH";
export const HANDLE_LOGIN_SUBMIT = "HANDLE_LOGIN_SUBMIT";
export const HANDLE_LOGIN_CHANGE = "HANDLE_LOGIN_CHANGE";
export const HANDLE_LOGOUT_SUBMIT = "HANDLE_LOGOUT_SUBMIT";
export const FACEBOOK_LOGIN_BUTTON = "FACEBOOK_LOGIN_BUTTON";
export const HANDLE_LOGIN_SUBMIT_FAIL = "HANDLE_LOGIN_SUBMIT_FAIL";

export const handleRegisterBrand = (query, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.post(process.env.REACT_APP_BASE_URL + "/api/v1/register-brand", query)
		// Api.HandleRegisterBrand(query)
		//HandleRegisterBrands(query)
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
				//This line is commit beacuse response cannot get with this line run
				// window.gr("track", "conversion", { email: query.email });
				
				dispatch({
					type: HANDLE_REGISTER_BRAND_SUBMIT_SUCEESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				if (res) {
				}
				// dispatch(currentLoggedInUser());
				// ownProps.history.push('/email-verification');
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REGISTER_BRAND_SUBMIT_FAILURE,
				payload: error.response.data,
			});
		});
};

export const handleJoinBrand = (query, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.post(process.env.REACT_APP_BASE_URL + "/api/v1/join-brand", query)
		// Api.HandleJoinBrand(query)
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
				// window.gr("track", "conversion", { email: query.email });
				dispatch({
					type: "HANDLE_LOGIN_SUBMIT",
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				// dispatch(currentLoggedInUser());
				// ownProps.history.push('/email-verification');
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REGISTER_BRAND_SUBMIT_FAILURE,
				payload: error,
			});
		});
};

export const acceptBrandInvitation = (query, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	dispatch({
		type: "BRAND_REQUEST_INVITATION_PENDING",
	});
	axios
		.post(process.env.REACT_APP_BASE_URL + "/api/v1/accept-invitation", query)
		// Api.AcceptBrandInvitation(query)
		.then((res) => {
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch({
				type: "BRAND_REQUEST_INVITATION_SUCCESS",
				payload: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		});
};

export const fetchInvitedUser = (id, ownProps) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.get(process.env.REACT_APP_BASE_URL + "/api/v1/invitation-user", {
			params: { id: id },
		})
		// Api.FetchInvitedUser(id)
		.then((res) => {
			if (res.data.id) {
				dispatch({
					type: "HANDLE_CHANGE_SUCCESS",
					payload: {
						target: { name: "email", value: res.data.email, type: "email" },
					},
				});
				dispatch({
					type: "HANDLE_CHANGE_SUCCESS",
					payload: {
						target: { name: "invitation_id", value: res.data.id, type: "text" },
					},
				});
				dispatch({
					type: "HANDLE_CHANGE_SUCCESS",
					payload: {
						target: {
							name: "brand_name",
							value: res.data.brand.name,
							type: "text",
						},
					},
				});
			}
		})
		.catch((error) => {});
};

export const handleBrandRegisterSubmit = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// Api.brandRegister(query)
	axios
		.post(process.env.REACT_APP_BASE_URL + "/api/v1/brand-register", query)
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
				window.gr("track", "conversion", { email: query.email });
				dispatch({
					type: HANDLE_REGISTER_SUBMIT_SUCEESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REGISTER_SUBMIT_FAILURE,
				payload: error,
			});
		});
};

export const handleInfluencerRegisterSubmit = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.post(process.env.REACT_APP_BASE_URL + "/api/v1/influencer-register", query)
		// Api.HandleInfluencerRegisterSubmit(query)
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
					type: HANDLE_REGISTER_SUBMIT_SUCEESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})

		.catch((error) => {
			dispatch({
				type: HANDLE_REGISTER_SUBMIT_FAILURE,
				payload: error,
			});
		});
};

// export const fetchCountries = () => dispatch => {
//     axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/fetch-countries')
//     .then((res) => {
//         dispatch({
//             type: FETCH_COUNTRIES_SUCCESS,
//             payload: res.data.countries
//         });
//     })
//     .catch(error => {
//         dispatch({
//             type: FETCH_COUNTRIES_FAILURE,
//             payload: error
//         });
//     });
// };

export const fetchUserCategories = () => (dispatch) => {
	axios
		.get(process.env.REACT_APP_BASE_URL + "/api/v1/fetch-user-categories")
		// Api.FetchUserCategories()
		.then((res) => {
			dispatch({
				type: FETCH_USER_CATEGORIES_SUCCESS,
				payload: res.data.categoires,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_USER_CATEGORIES_FAILURE,
				payload: error,
			});
		});
};

export const handleRegisterInvitedInfluencer = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	axios
		.post(
			process.env.REACT_APP_BASE_URL + "/api/v1/register-invited-influencer",
			query
		)
		//Api.HandleRegisterInvitedInfluencer(query)
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
					type: HANDLE_REGISTER_INIVTED_INFLUENCER_SUCEESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_REGISTER_INIVTED_INFLUENCER_FAILURE,
				payload: error,
			});
		});
};

export const fetchPlanSummary = (id) => (dispatch) => {
	axios
		.get(process.env.REACT_APP_BASE_URL + "/api/v1/plan-summary/" + id)
		// Api.FetchPlanSummary(id)
		.then((res) => {
			dispatch({
				type: FETCH_PLAN_SUMMARY_SUCCESS,
				payload: res.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_PLAN_SUMMARY_FAILURE,
				payload: error,
			});
		});
};

export const applyCoupon = (query) => (dispatch) => {
	return new Promise((resolve) => {
		axios
			.post(process.env.REACT_APP_BASE_URL + "/api/v1/apply-coupon", query)
			//Api.ApplyCoupon(query)
			.then((res) => {
				if (res.data.code === "couponCode") {
					toast.error(res.data.message);
				} else if (res.data.errors) {
					dispatch({
						type: HANDLE_VALIDATION_ERRORS,
						payload: res.data.errors,
					});
				} else {
					dispatch({
						type: HANDLE_APPLY_COUPON_SUCEESS,
						payload: res.data,
					});
					dispatch({
						type: AJAX_CALL_FINSH,
					});
					toast.success("Coupon applied successfully!");
				}
				resolve(true);
			})
			.catch((error) => {
				dispatch({
					type: HANDLE_APPLY_COUPON_FAILURE,
					payload: error,
				});
				resolve(true);
			});
	});
};
