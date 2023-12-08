import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	BRAND_BOOKING_CAMPAIGN_INFLUENCERS_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_INFLUENCERS_FAILURE,
	BRAND_BOOKING_CAMPAIGN_BRIEF_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_BRIEF_FAILURE,
	BRAND_BOOKING_CAMPAIGN_ACCEPT_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_ACCEPT_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CONTENT_FAILURE,
	BRAND_BOOKING_CAMPAIGN_REJECT_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_REJECT_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_REQUEST_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_REQUEST_FAILURE,
	BRAND_BOOKING_CAMPAIGN_ACTIVITES_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_ACTIVITES_FAILURE,
	BRAND_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_MESSAGES_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CHAT_USERS_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CHAT_USERS_FAILURE,
	FETCH_CHAT_USER_MESSAGES_SUCCESS,
	FETCH_CHAT_USER_MESSAGES_FAILURE,
	BRAND_SEND_MESSAGE_SUCCESS,
	BRAND_SEND_MESSAGE_FAILURE,
	BRAND_SEND_ATTACHMENT_SUCCESS,
	BRAND_SEND_ATTACHMENT_FAILURE,
	BRAND_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_OVERVIEW_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_PREVIEW_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_PREVIEW_FAILURE,
	BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_POST_REQUEST_SUCCESS,
	BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_POST_REQUEST_FAILURE,
	BRAND_CAMPAIGN_SEND_MESSAGE,
	FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_SUCCESS,
	FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_FAILURE,
	FETCH_DRAFT_DROPDOWN_CAMPAIGNS_SUCCESS,
	FETCH_DRAFT_DROPDOWN_CAMPAIGNS_FAILURE,
	FETCH_CLOSED_DROPDOWN_CAMPAIGNS_SUCCESS,
	FETCH_CLOSED_DROPDOWN_CAMPAIGNS_FAILURE,
	HANDLE_VALIDATION_ERRORS,
	FETCH_MESSAGE_INIT,
	FETCH_MESSAGE_FINSH,
	DUPLICATE_CAMPAIGN_INIT,
	DUPLICATE_CAMPAIGN_FINSH,
	BRAND_DUPLICATE_CAMPAIGN_SUCCESS,
	BRAND_DUPLICATE_CAMPAIGN_FAILURE,
	EMAIL_CALL_INIT,
	EMAIL_CALL_FINISH,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const sendReinviteInfluencer = async (dispatch, data) => {
	dispatch({
		type: "SEND_REINVITE_INFLUENCER_PENDING",
		payload: data,
	});
	const json = Api.ReinviteInfluencer(data);
	//   await axios.post(
	//     helper.url + "/api/v1/send-reinvite-influencer",
	//     data
	//   );
	if (json.status === 200) {
		dispatch({
			type: "SEND_REINVITE_INFLUENCER_SUCCESS",
			payload: data,
		});
		if (json.data.status) {
			toast.success(json.data.message);
		} else {
			toast.error(json.data.message);
		}
	} else {
		dispatch({
			type: "SEND_REINVITE_INFLUENCER_FAILURE",
			payload: data,
		});
	}
	return json;
};

export const showEmailLogs = async (dispatch, data) => {
	dispatch({
		type: "INFLUENCER_EMAIL_LOG_PENDING",
	});
	const json = await Api.EmailLogs(data);

	if (json.status === 200) {
		dispatch({
			type: "INFLUENCER_EMAIL_LOG_SUCCESS",
			payload: json.data,
		});
	} else {
		dispatch({
			type: "INFLUENCER_EMAIL_LOG_FAILURE",
		});
	}
};

export const brandBookingCampaignInfluencers = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-influencers/" + id)
	Api.BrandBookingCampaignInfluencers(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_INFLUENCERS_SUCCESS,
				payload: {
					bookingCampaignInfluencers: res.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_INFLUENCERS_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignContent = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-content/" + id)
	Api.BrandBookingCampaignContent(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
				payload: {
					bookingCampaignContent: res.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignBrief = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-brief/" + id)
	Api.BrandBookingCampaignBrief(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_BRIEF_SUCCESS,
				payload: {
					bookingCampaignBrief: res.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_BRIEF_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignChatUsers = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-chat-users/" + id)
	Api.BrandBookingCampaignChatUsers(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CHAT_USERS_SUCCESS,
				payload: {
					bookingCampaignChatUsers: res.data.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CHAT_USERS_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignMessages = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-messages/" + id)
	Api.BrandBookingCampaignMessages(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
				payload: {
					bookingCampaignMessages: res.data.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_MESSAGES_FAILURE,
				payload: error,
			});
		});
};

export const fetchChatUserMessages = (query, param) => (dispatch) => {
	param === "default" &&
		dispatch({
			type: FETCH_MESSAGE_INIT,
		});

	// axios.post(helper.url + "/api/v1/fetch-chat-user-messages", query);
	return new Promise((resolve) => {
		Api.FetchChatUserMessages(query, param)
			.then((res) => {
				dispatch({
					type: FETCH_CHAT_USER_MESSAGES_SUCCESS,
					payload: {
						chatUserMessages: res.data.data,
					},
				});
				param === "default" &&
					dispatch({
						type: FETCH_MESSAGE_FINSH,
					});
				resolve(res);
			})
			.catch((error) => {
				dispatch({
					type: FETCH_CHAT_USER_MESSAGES_FAILURE,
					payload: error,
				});
			});
	})
};

export const brandSendMessage = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-send-message", query)
	Api.BrandSendMessage(query)
		.then(async (res) => {
			await dispatch(fetchChatUserMessages(query));
			dispatch(brandBookingCampaignChatUsers(query.campaignId));
			dispatch({
				type: BRAND_SEND_MESSAGE_SUCCESS,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_SEND_MESSAGE_FAILURE,
				payload: error,
			});
		});
};

export const handleUploadFile = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-upload-message-attachment", query)
	Api.HandleUploadFile(query)
		.then((res) => {
			if (res.status == 200) {
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
						type: BRAND_SEND_ATTACHMENT_SUCCESS,
						payload: res.data,
					});
					dispatch({
						type: AJAX_CALL_FINSH,
					});
	
					dispatch(fetchChatUserMessages(query));
					dispatch(brandBookingCampaignChatUsers(res.data));
				}
			} else if (res.status == 413) {
				toast.error('Content too large')
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				toast.error('Server Error')
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: BRAND_SEND_ATTACHMENT_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignActivites = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-activities/" + id)
	Api.BrandBookingCampaignActivites(id)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_ACTIVITES_SUCCESS,
				payload: {
					bookingCampaignActivies: res.data.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_ACTIVITES_FAILURE,
				payload: error,
			});
		});
};

export const handleAcceptInfluncerRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-booking-campaign-accept", query)
	Api.HandleAcceptInfluncerRequest(query)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_ACCEPT_SUCCESS,
				payload: {
					bookingCampaignBrief: res.data,
				},
			});

			dispatch(brandBookingCampaignInfluencers(query.campaignId));
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_ACCEPT_FAILURE,
				payload: error,
			});
		});
};

export const handleRejectInfluncerRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-booking-campaign-reject", query)
	Api.HandleRejectInfluncerRequest(query)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_REJECT_SUCCESS,
				payload: {
					bookingCampaignBrief: res.data,
				},
			});

			dispatch(brandBookingCampaignInfluencers(query.campaignId));
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_REJECT_FAILURE,
				payload: error,
			});
		});
};

export const handleBrandContentApprove = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-booking-campaign-content-approve", query)
	Api.HandleBrandContentApprove(query)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(brandBookingCampaignContent(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_FAILURE,
				payload: error,
			});
		});
};

export const handlebrandPreviewAccept = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	Api.HandleBrandPreviewAccept(query)
		//   axios
		//     .post(
		//       helper.url + "/api/v1/brand-booking-campaign-content-approve-preview",
		//       query
		//     )
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_PREVIEW_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(brandBookingCampaignContent(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_APPROVE_PREVIEW_FAILURE,
				payload: error,
			});
		});
};

export const handleBrandNewRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(
	//       helper.url + "/api/v1/brand-booking-campaign-content-new-request",
	//       query
	//     )
	Api.HandleBrandNewRequest(query)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_REJECT_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(brandBookingCampaignContent(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handleBrandInstaNewPostRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(
	//       helper.url +
	//         "/api/v1/brand-booking-campaign-content-insta-new-post-request",
	//       query
	//     )
	Api.HandleBrandInstaNewPostRequest(query)
		.then((res) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_POST_REQUEST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(brandBookingCampaignContent(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: BRAND_BOOKING_CAMPAIGN_CONTENT_NEW_POST_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const brandBookingCampaignOverview = (dispatch, id) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/brand-booking-campaign-overview/" + id)
	return new Promise((resolve, reject) => (
		Api.BrandBookingCampaignOverview(id)
			.then((res) => {
				dispatch({
					type: BRAND_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
					payload: {
						bookingCampaignOverview: res.data,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				resolve(res)
			})
			.catch((error) => {
				dispatch({
					type: BRAND_BOOKING_CAMPAIGN_OVERVIEW_FAILURE,
					payload: error,
				});
			})
	))
};

export const brandCampaignSendMessage = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/brand-campaign-send-message", query)
	Api.BrandCampaignSendMessage(query)
		.then((res) => {
			if (res.data.errors) {
				toast.error(res.data.errors.brandMessage[0]);
			} else {
				toast.success("Message has been sent Successfully!");
			}
			dispatch({
				type: BRAND_CAMPAIGN_SEND_MESSAGE,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			console.log(error, "error");
		});
};

export const fetchDropDownActiveCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/campaigns/dropdown/active")
	Api.FetchDropDownActiveCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const fetchDropDownDraftCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/campaigns/dropdown/draft")
	Api.FetchDropDownDraftCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_DRAFT_DROPDOWN_CAMPAIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_DRAFT_DROPDOWN_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const fetchDropDownClosedCampaigns = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/campaigns/dropdown/closed")
	Api.FetchDropDownClosedCampaigns()
		.then((res) => {
			dispatch({
				type: FETCH_CLOSED_DROPDOWN_CAMPAIGNS_SUCCESS,
				payload: res.data.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_CLOSED_DROPDOWN_CAMPAIGNS_FAILURE,
				payload: error,
			});
		});
};

export const duplicateCampaign = (id, ownProps) => (dispatch) => {
	dispatch({
		type: DUPLICATE_CAMPAIGN_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/duplicate-campaign/" + id)
	Api.DuplicateCampaign(id)
		.then((res) => {
			dispatch({
				type: BRAND_DUPLICATE_CAMPAIGN_SUCCESS,
				payload: res.data.Campaign,
			});
			dispatch({
				type: DUPLICATE_CAMPAIGN_FINSH,
			});
			ownProps.history.push("/brand/campaigns/" + res.data.Campaign.id);
		})
		.catch((error) => {
			dispatch({
				type: BRAND_DUPLICATE_CAMPAIGN_FAILURE,
				payload: error,
			});
		});
};

export const changeEmailRequest = async (dispatch, query) => {

	dispatch({
		type: EMAIL_CALL_INIT,
	});
	const json = await Api.ChangeInfluencerEmail(query)
	if (json.data.success === true && json.status === 200) {
		toast.success(json.data.message)
	} else if (json.status !== 200) {
		toast.error(json.message)
	} else {
		toast.error(json?.data?.errors?.email?.[0])
	}
	dispatch({
		type: EMAIL_CALL_FINISH,
	});
	return json;

};
