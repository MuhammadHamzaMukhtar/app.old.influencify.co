import { toast } from "react-toastify";
// import axios from "axios";
import { fetchCampaignGoals } from "./BasicActions";
import {
	HANDLE_FETCH_CAMPAIGN_SUCCESS,
	HANDLE_FETCH_CAMPAIGN_FAILURE,
	FETCH_COUNTRIES_SUCCESS,
	FETCH_COUNTRIES_FAILURE,
	HANDLE_FETCH_RANGES,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	HANDLE_CREDIT_CARD_ERRORS,
	HANDLE_PAYMENT_GATEWAY_ERRORS,
	HANDLE_BANK_ERRORS,
	AJAX_CALL_FINSH,
	CREATE_CAMPAIGN_WITH_SELECTED,
	CREATE_CAMPAIGN_WITH_INVITE,
	HANDLE_VALIDATION_ERRORS,
	HANDLE_PAYMENT_PRICE_ERRORS,
	HANDLE_NOT_PUBLISHED_YET_ERRORS,
	NO_CREDITS_EXIST,
	HANDLE_RESPONSE_SUCCESS_FALSE,
} from "../constants/action-types";
import Api from "@services/axios";
export const SUBMIT_INIT = "SUBMIT_INIT";
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
export const SUBMIT_TYPE = "SUBMIT_TYPE";
export const SUBMIT_BASIC = "SUBMIT_BASIC";
export const SUBMIT_BRIEF = "SUBMIT_BRIEF";
export const SUBMIT_INVITATION = "SUBMIT_INVITATION";
export const SUBMIT_TIMING = "SUBMIT_TIMING";
export const SUBMIT_INFLUENCERS = "SUBMIT_INFLUENCERS";
export const SUBMIT_PAYMENT = "SUBMIT_PAYMENT";
export const SUBMIT_OVERVIEW = "SUBMIT_OVERVIEW";

export const fetchCampaign = (id) => (dispatch) => {
	// axios.get(helper.url + '/api/v1/fetch-campaign/'+ id)
	Api.FetchCampaign(id)
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_CAMPAIGN_SUCCESS,
				payload: {
					typeId: res.data.data.typeId,
					typeName: res.data.data.typeName,
					campaignID: res.data.data.id,
					campaignTitle: res.data.data.campaignTitle,
					campaignType: res.data.data.campaignType,
					paymentType: res.data.data.paymentType,
					campaignPreview: res.data.data.campaignPreview,
					campaignVisibility: res.data.data.campaignVisibility,
					contentType: res.data.data.contentType,
					selectedCountries: res.data.data.countries,
					campaignInstruction: res.data.data.campaignInstruction,
					postWording: res.data.data.postWording,
					postWordingType: res.data.data.postWordingType,
					linkToShare: res.data.data.linkToShare,
					subject_line: res.data.data.campaignInvitation.subject_line,
					verified_message: res.data.data.campaignInvitation.verified_message,
					non_verified_message:
						res.data.data.campaignInvitation.non_verified_message,
					gmail_connected_message:
						res.data.data.campaignInvitation.gmail_connected_message,
					applicationFrom: res.data.data.campaignDate.applicationFrom,
					applicationTo: res.data.data.campaignDate.applicationTo,
					postingFrom: res.data.data.campaignDate.postingFrom,
					postingTo: res.data.data.campaignDate.postingTo,
					completeInDays: res.data.data.campaignDate.completeInDays,
					selectedInfluencers: res.data.data.selectedInfluencers,
					campaignAttachments: res.data.data.campaignAttachments,
					campaignCover: res.data.data.campaignCover,
					imageOption: res.data.data.imageOption,
					campaignBudget: res.data.data.campaignPayment.follower_range_budget,
					serviceFee: res.data.data.campaignPayment.service_fee,
					spendable: res.data.data.campaignPayment.spenable_fee,
					handlingFee: res.data.data.campaignPayment.handlingFee,
					payPerClickAmount: res.data.data.campaignPayment.pay_per_click_amount,
					payPerClickLimitPost: res.data.data.campaignPayment.limit_per_post,
					payPerClickWaitingTime: res.data.data.campaignPayment.waiting_time,
					price_per_image: res.data.data.campaignPayment.price_per_image,
					price_per_video: res.data.data.campaignPayment.price_per_video,
					price_per_story: res.data.data.campaignPayment.price_per_story,
					contentProduct: res.data.data.campaignPayment.contentProduct,
					campaignStatus: res.data.data.campaignStatus,
					goalName: res.data.data.goalName,
					campaignCategories: res.data.data.campaignCategories,
					campaignPostType: res.data.data.campaignPostType,
					currency_code: res.data.data.currency_code,
					contentPostType: res.data.data.contentPostType,
				},
			});
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_FETCH_CAMPAIGN_FAILURE,
				payload: error,
			});
		});
};

export const submitType = (query, ownProps) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	// axios
	// .post(helper.url + "/api/v1/submit/type", query)
	Api.SubmitType(query)
		.then((res) => {
			if (res.data.code === "NoCreditsExist") {
				dispatch({
					type: NO_CREDITS_EXIST,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
				setTimeout(() => {
					ownProps.history.replace("/brand/campaigns");
				}, 5000);
			} else {
				dispatch({
					type: SUBMIT_TYPE,
					payload: {
						tab: query.tab,
						typeName: query.typeName,
					},
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			}
		})
		.catch((error) => {
			alert("Couldn't connect to the server.");
		});
};

export const fetchCountries = () => (dispatch) => {
	//axios;
	// .get(helper.url + "/api/v1/fetch-countries")
	Api.FetchCountries()
		.then((res) => {
			dispatch({
				type: FETCH_COUNTRIES_SUCCESS,
				payload: res.data.countries,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_COUNTRIES_FAILURE,
				payload: error,
			});
		});
};

export const submitBasic = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	// axios
	// .post(helper.url + "/api/v1/submit/basic", query)
	Api.SubmitBasic(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			} else {
				dispatch({
					type: SUBMIT_BASIC,
					payload: query.tab,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
				dispatch(fetchCampaign(query.campaign_id));
				dispatch(fetchCampaignGoals());
			}
		})
		.catch((error) => {});
};

export const submitBrief = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});

	//   axios
	//     .post(helper.url + "/api/v1/submit/breif", query)
	Api.SubmitBrief(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			} else {
				dispatch({
					type: SUBMIT_BRIEF,
					payload: query.tab,
				});

				dispatch({
					type: SUBMIT_SUCCESS,
				});
				dispatch(fetchCampaign(query.campaign_id));
			}
		})
		.catch((error) => {});
};

export const submitInvitation = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});

	dispatch({
		type: SUBMIT_INVITATION,
		payload: query.tab,
	});

	dispatch({
		type: SUBMIT_SUCCESS,
	});
};

export const submitTiming = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	//axios
	// .post(helper.url + "/api/v1/submit/timing", query)
	Api.SubmitTiming(query)
		.then((res) => {
			dispatch({
				type: SUBMIT_TIMING,
				payload: query.tab,
			});
			dispatch({
				type: SUBMIT_SUCCESS,
			});
		})
		.catch((error) => {
			alert("Couldn't connect to the server.");
		});
};

export const submitInfluencers = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/submit/influencers", query)
	Api.SubmitInfluencers(query)
		.then((res) => {
			if (res.data.influencerError) {
				toast.dismiss();
				toast.error(res.data.influencerError);
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			} else {
				toast.dismiss();
				dispatch({
					type: SUBMIT_INFLUENCERS,
					payload: query.tab,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			}
		})
		.catch((error) => {
			alert("Couldn't connect to the server.");
		});
};

export const fetchRanges = () => (dispatch) => {
	//   axios
	//     .get(helper.url + "/api/v1/fetch/ranges")
	Api.FetchRanges()
		.then((res) => {
			dispatch({
				type: HANDLE_FETCH_RANGES,
				payload: res.data.ranges,
			});
		})
		.catch((error) => {});
};

export const fetchProducts = () => (dispatch) => {
	let query = {
		retire_as_well: false,
	};
	//   axios
	//     .post(helper.url + "/api/v1/fetch-products", query)
	Api.ProductsFetch(query)
		.then((res) => {
			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_PRODUCTS_FAILURE,
				payload: error,
			});
		});
};

export const submitPayment = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/submit/payment", query)
	Api.PaymentSubmit(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_PAYMENT_PRICE_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			} else if (res.data.priceError) {
				toast.dismiss();
				toast.error("Budget should be greater than or equal to $10");
				dispatch({
					type: SUBMIT_SUCCESS,
				});
			} else {
				dispatch({
					type: SUBMIT_PAYMENT,
					payload: query.tab,
				});

				dispatch({
					type: SUBMIT_SUCCESS,
				});
			}
		})
		.catch((error) => {});
};

export const submitOverview = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/submit/overview", query)
	Api.SubmitOverview(query)
		.then((res) => {
			if (res.data.creditCardErrors) {
				dispatch({
					type: HANDLE_CREDIT_CARD_ERRORS,
					payload: res.data.creditCardErrors,
				});
			} else if (res.data.NotActivePyamentGateway) {
				dispatch({
					type: HANDLE_PAYMENT_GATEWAY_ERRORS,
					payload: res.data.NotActivePyamentGateway,
				});
			} else if (res.data.NotPublishYet) {
				dispatch({
					type: HANDLE_NOT_PUBLISHED_YET_ERRORS,
					payload: res.data.NotPublishYet,
				});
			} else if (res.data.messages) {
				dispatch({
					type: HANDLE_BANK_ERRORS,
					payload: res.data.messages,
				});
			} else {
				dispatch({
					type: SUBMIT_OVERVIEW,
					payload: query.tab,
				});
			}

			dispatch({
				type: SUBMIT_SUCCESS,
			});
		})
		.catch((error) => {});
};

export const saveOverview = (query) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/save/overview", query)
	Api.SaveOverview(query)
		.then((res) => {
			if (res.data.creditCardErrors) {
				dispatch({
					type: HANDLE_CREDIT_CARD_ERRORS,
					payload: res.data.creditCardErrors,
				});
			} else if (res.data.NotActivePyamentGateway) {
				dispatch({
					type: HANDLE_PAYMENT_GATEWAY_ERRORS,
					payload: res.data.NotActivePyamentGateway,
				});
			} else if (res.data.NotPublishYet) {
				dispatch({
					type: HANDLE_NOT_PUBLISHED_YET_ERRORS,
					payload: res.data.NotPublishYet,
				});
			} else if (res.data.messages) {
				dispatch({
					type: HANDLE_BANK_ERRORS,
					payload: res.data.messages,
				});
			} else {
				dispatch({
					type: SUBMIT_OVERVIEW,
					payload: query.tab,
				});
			}

			dispatch({
				type: SUBMIT_SUCCESS,
			});
		})
		.catch((error) => {});
};

export const createCampaignWithSelected = (query, ownProps) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/create-campaign", query)
	Api.CreateCampaignWithSelected(query)
		.then((res) => {
			if (res.data && res.data.success === false) {
				dispatch({
					type: HANDLE_RESPONSE_SUCCESS_FALSE,
					data: res.data,
				});
			} else {
				dispatch({
					type: CREATE_CAMPAIGN_WITH_SELECTED,
					payload: {
						activeTab: 2,
						campaignId: res.data.data.id,
					},
				});

				dispatch({
					type: AJAX_CALL_FINSH,
				});
				ownProps.history.push("/brand/campaigns/" + res.data.data.id);
			}
		})
		.catch((error) => {});
};

export const createCampaignWithInvite = (query, ownProps) => (dispatch) => {
	//   axios
	//     .post(helper.url + "/api/v1/create-campaign-with-invite", query)
	Api.CreateCampaignWithInvite(query)
		.then((res) => {
			if (res.data.code === "NoCreditsExist") {
				dispatch({
					type: NO_CREDITS_EXIST,
				});
			} else {
				dispatch({
					type: CREATE_CAMPAIGN_WITH_INVITE,
					payload: {
						activeTab: 2,
						campaignId: res.data.data.id,
					},
				});
				ownProps.history.push("/brand/campaigns/" + res.data.data.id);
			}
		})
		.catch((error) => {});
};

export const updateInvitationMessage = (query) => (dispatch) => {
	dispatch({
		type: "SAVING_CAMPAIGN_TEMPLATE_PENDING",
	});
	//   axios
	//     .post(helper.url + "/api/v1/update-invitation-message", query)
	Api.UpdateInvitationMessage(query)
		.then((res) => {
			dispatch({
				type: "SAVING_CAMPAIGN_TEMPLATE_SUCCESS",
			});
		})
		.catch((error) => {});
};
