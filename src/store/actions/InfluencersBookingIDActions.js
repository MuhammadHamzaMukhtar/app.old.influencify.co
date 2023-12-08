import { toast } from "react-toastify";
import {
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
	INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_FAILURE,
	HANDLE_INFLUENCER_BOOKING_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_BOOKING_REQUEST_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_TASK,
	INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_SUCCESS,
	INFLUENCER_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
	INFLUENCER_BOOKING_CAMPAIGN_CONTENT_FAILURE,
	SWITCH_TO_FAST_PAYMENT_SUCCESS,
	SWITCH_TO_FAST_PAYMENT_FAILURE,
	CAMPAIGN_CONTENT_UPLOAD_STORY_SUCCESS,
	CAMPAIGN_CONTENT_UPLOAD_STORY_FAILURE,
	CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_SUCCESS,
	CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_FAILURE,
	HANDLE_INFLUENCER_CANCEL_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_CANCEL_REQUEST_FAILURE,
	FETCH_ABORT_REASONS_SUCCESS,
	FETCH_ABORT_REASONS_FAILURE,
	HANDLE_INFLUENCER_ABORT_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_ABORT_REQUEST_FAILURE,
	HANDLE_INFLUENCER_WORK_DONE_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_WORK_DONE_REQUEST_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
	INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_FAILURE,
	INFLUENCER_SEND_MESSAGE_SUCCESS,
	INFLUENCER_SEND_MESSAGE_FAILURE,
	INFLUENCER_SEND_ATTACHMENT_SUCCESS,
	INFLUENCER_SEND_ATTACHMENT_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_ACCEPT_SUCCESS,
	INFLUENCER_BOOKING_CAMPAIGN_ACCEPT_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_REJECT_FAILURE,
	INFLUENCER_BOOKING_CAMPAIGN_REJECT_SUCCESS,
	HANDLE_INFLUENCER_PREVIEW_REQUEST_SUCCESS,
	HANDLE_INFLUENCER_PREVIEW_REQUEST_FAILURE,
	INFLUENCER_INSTAGRAM_FEEDS_SUCCESS,
	INFLUENCER_SELECTED_FEED_POST_SUCCESS,
	INFLUENCER_SELECTED_FEED_POST_FAILURE,
	HANDLE_VALIDATION_ERRORS,
	DOWNLOAD_FILE_SUCCESS,
	DOWNLOAD_FILE_FAILURE,
	CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_SUCCESS,
	CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_FAILURE,
	INFLUENCER_CAMPAIGN_DETAILS_INIT,
	INFLUENCER_CAMPAIGN_DETAILS_FINISH,
	POST_UPLOAD_SUCCESS,
	POST_UPLOAD_FAILURE,
	WORK_DONE_SUCCESS,
	INFLUENCER_MESSAGE_FINISH,
	INFLUENCER_MESSAGE_INIT,
} from "../constants/action-types";
import Api from "@services/axios";

export const influencerBookingCampaignOverview = (id, flag) => (dispatch) => {
	dispatch({
		type: INFLUENCER_CAMPAIGN_DETAILS_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer-booking-campaign-overview/" + id)
	return new Promise((resolve) => {
		Api.InfluencerBookingCampaignOverview(id)
			.then((res) => {
				if (res.data.success === true) {
					dispatch({
						type: INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
						payload: {
							influencerBookingCampaignOverview: res.data.data,
							campaignInfluencer: res.data.campaignInfluencer,
							selectedProducts: res.data.selectedProducts,
							product: res.data.product,
							flag: flag,
						},
					});
					dispatch({
						type: INFLUENCER_CAMPAIGN_DETAILS_FINISH,
					});
					resolve(res);
				} else {
					window.location.href = "/influencer/my-campaigns";
				}
			})
			.catch((error) => {
				dispatch({
					type: INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_FAILURE,
					payload: error,
				});
			});
	})
};

export const influencerBookingCampaignTask = () => (dispatch) => {
	dispatch({
		type: INFLUENCER_BOOKING_CAMPAIGN_TASK,
	});
};

export const influencerBookingCampaignPayment = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer-booking-campaign-payment/" + id)
	Api.InfluencerBookingCampaignPayment(id)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_SUCCESS,
				payload: {
					// campaignPayout: res.data.campaignPayout,
					campaignInfluencer: res.data.campaignInfluencer,
					selectedProducts: res.data.selectedProducts,
				},
			});

			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_FAILURE,
				payload: error,
			});
		});
}

export const fastPaymentSwitch = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/switch-to-fast-payment", query)
	Api.FastPaymentSwitch(query)
		.then((res) => {
			dispatch({
				type: SWITCH_TO_FAST_PAYMENT_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(influencerBookingCampaignPayment(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: SWITCH_TO_FAST_PAYMENT_FAILURE,
				payload: error,
			});
		});
};

export const influencerBookingCampaignContent = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer-booking-campaign-content/" + id)
	Api.InfluencerBookingCampaignContent(id)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
				payload: {
					influencerBookingCampaignContent: res.data.CampaignContentResource,
					campaignTasks: res.data.campaignTasks,
					previewApprovedFlag: res.data.previewApprovedFlag,
					isReconnectFlag: res.data.isReconnectFlag,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_CONTENT_FAILURE,
				payload: error,
			});
		});
	// influencerInstagramPosts();
};

export const influencerBookingCampaignMessages = (id) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer-booking-campaign-messages/" + id)
	Api.InfluencerBookingCampaignMessages(id)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
				payload: {
					influencerBookingMessages: res.data.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_FAILURE,
				payload: error,
			});
		});
};

export const influencerSendMessage = (query) => (dispatch) => {
	dispatch({
		type: INFLUENCER_MESSAGE_INIT,
	});
	// axios
	// .post(helper.url + "/api/v1/influencer-send-message", query)
	Api.InfluencerSendMessage(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
				payload: {
					influencerBookingMessages: res.data.data,
				},
			});
			dispatch({
				type: INFLUENCER_MESSAGE_FINISH,
			});

			// dispatch(influencerBookingCampaignMessages(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_SEND_MESSAGE_FAILURE,
				payload: error,
			});
		});
};

export const submitRequestQuotePayment = (query) => (dispatch) => {
	dispatch({
		type: "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_PENDING",
	});
	//   axios
	//     .post(helper.url + "/api/v1/submit-influencer-request-quote-payment", query)
	return new Promise((resolve) => {
		Api.SubmitRequestQuotePayment(query)
			.then((res) => {
				if (res.data.errors) {
					dispatch({
						type: "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_FAILURE",
						payload: res.data,
					});
				} else {
					toast.success(
						"Quote sent, waiting for the advertiser to accept or reject your quote."
					);
					dispatch({
						type: "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_SUCCESS",
						payload: res.data,
					});
				}
				resolve(res)
			})
			.catch((error) => {
				dispatch({
					type: INFLUENCER_SEND_MESSAGE_FAILURE,
					payload: error,
				});
			});
	})
};

export const handleUploadFile = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-upload-message-attachment", query)
	Api.UploadFile(query)
		.then((res) => {
			if (res.data?.errors) {
				toast.error(res.data?.errors?.attachment?.[0]);
			} else {
				dispatch({
					type: INFLUENCER_SEND_ATTACHMENT_SUCCESS,
					payload: res.data,
				});
				dispatch(influencerBookingCampaignMessages(res.data));
			}
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_SEND_ATTACHMENT_FAILURE,
				payload: error,
			});
		});
};

export const handleUploadContentStory = (query, campaignId) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(
	//       helper.url + "/api/v1/influencer-campaign-content-upload-story",
	//       query
	//     )
	Api.HandleUploadContentStory(query)
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
					type: CAMPAIGN_CONTENT_UPLOAD_STORY_SUCCESS,
					payload: {
						contentStoryPath: res.data,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});

				dispatch(influencerBookingCampaignContent(campaignId));
				dispatch(influencerBookingCampaignOverview(campaignId, false));
			}
		})
		.catch((error) => {
			dispatch({
				type: CAMPAIGN_CONTENT_UPLOAD_STORY_FAILURE,
				payload: error,
			});
		});
};

export const handleUploadContentVideo = (query, campaignId) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(
	//       helper.url + "/api/v1/influencer-campaign-content-upload-story-video",
	//       query
	//     )
	Api.HandleUploadContentVideo(query)
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
					type: CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_SUCCESS,
					payload: {
						contentStoryPath: res.data,
					},
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});

				dispatch(influencerBookingCampaignContent(campaignId));
				dispatch(influencerBookingCampaignOverview(campaignId, false));
			}
		})
		.catch((error) => {
			dispatch({
				type: CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_FAILURE,
				payload: error,
			});
		});
};

export const handleUploadContentStoryInsight =
	(query, campaignId) => (dispatch) => {
		dispatch({
			type: AJAX_CALL_INIT,
		});
		// axios
		//   .post(
		//     helper.url + "/api/v1/influencer-campaign-content-upload-story-insight",
		//     query
		//   )
		Api.HandleUploadContentStoryInsight(query)
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
						type: CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_SUCCESS,
						payload: {
							contentStoryPath: res.data,
						},
					});
					dispatch({
						type: AJAX_CALL_FINSH,
					});

					dispatch(influencerBookingCampaignContent(campaignId));
					dispatch(influencerBookingCampaignOverview(campaignId, false));
				}
			})
			.catch((error) => {
				dispatch({
					type: CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_FAILURE,
					payload: error,
				});
			});
	};

export const handleBookingRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-booking-request", query)
	Api.HandleBookingRequest(query)
		.then((res) => {
			dispatch({
				type: HANDLE_INFLUENCER_BOOKING_REQUEST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});

			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_BOOKING_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handleCancelRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-cancel-request", query)
	Api.HandleCancelRequest(query)
		.then((res) => {
			dispatch({
				type: HANDLE_INFLUENCER_CANCEL_REQUEST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_CANCEL_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handleFetchAbortReasons = () => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .get(helper.url + "/api/v1/fetch-abort-reasons")
	Api.HandleFetchAbortReasons()
		.then((res) => {
			dispatch({
				type: FETCH_ABORT_REASONS_SUCCESS,
				payload: {
					abortReasons: res.data,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_ABORT_REASONS_FAILURE,
				payload: error,
			});
		});
};

export const handleAbortRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-abort-request", query)
	Api.HandleAbortRequest(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
			} else {
				dispatch({
					type: HANDLE_INFLUENCER_ABORT_REQUEST_SUCCESS,
					payload: res.data,
				});
			}
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_ABORT_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handleWorkDoneRequest = (query) => (dispatch) => {
	dispatch({
		type: WORK_DONE_SUCCESS,
		payload: query.taskId
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-work-done-request", query)
	Api.HandleWorkDoneRequest(query)
		.then((res) => {
			dispatch({
				type: HANDLE_INFLUENCER_WORK_DONE_REQUEST_SUCCESS,
				payload: {
					influencerBookingCampaignOverview: res.data.data,
					campaignInfluencer: res.data.campaignInfluencer,
				},
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			// dispatch(influencerBookingCampaignOverview(query.campaignId, false));
			// dispatch(influencerBookingCampaignContent(query.campaignId));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_WORK_DONE_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handlePreviewRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-preview-request", query)
	Api.HandlePreviewRequest(query)
		.then((res) => {
			dispatch({
				type: HANDLE_INFLUENCER_PREVIEW_REQUEST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch(influencerBookingCampaignContent(query.campaignId));
			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: HANDLE_INFLUENCER_PREVIEW_REQUEST_FAILURE,
				payload: error,
			});
		});
};

export const handleInfluencerAcceptRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-booking-campaign-accept", query)
	Api.HandleInfluencerAcceptRequest(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_ACCEPT_SUCCESS,
				payload: res.data,
			});

			dispatch({
				type: AJAX_CALL_FINSH,
			});

			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: AJAX_CALL_FINSH,
			});
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_ACCEPT_FAILURE,
				payload: error,
			});
			if (error.response.data) {
				toast.error(error.response.data.message);
			}
		});
};

export const handleInfluencerRejectRequest = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-booking-campaign-reject", query)
	Api.HandleInfluencerRejectRequest(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_REJECT_SUCCESS,
				payload: res.data,
			});

			dispatch({
				type: AJAX_CALL_FINSH,
			});

			dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_BOOKING_CAMPAIGN_REJECT_FAILURE,
				payload: error,
			});
		});
};

export const influencerInstagramPosts = (id) => (dispatch) => {
	dispatch({
		type: "INFLUENCER_INSTAGRAM_FEEDS_PENDING",
		payload: id
	});
	//   axios
	//     .get(helper.url + "/api/v1/influencer-instagram-feeds")
	Api.InfluencerInstagramPosts()
		.then((res) => {
			dispatch({
				type: INFLUENCER_INSTAGRAM_FEEDS_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch((error) => {
			dispatch({
				type: "INFLUENCER_INSTAGRAM_FEEDS_FAILURE",
			});
		});
};

export const fetchTiktokListVideo = (id) => (dispatch) => {
	dispatch({
		type: "FETCH_TIKTOK_LIST_VIDEO_PENDING",
		payload: id
	});
	//   axios
	//     .get(helper.url + "/api/v2/tiktok/video")
	Api.FetchTiktokListVideo()
		.then((res) => {
			if (res.data.status) {
				dispatch({
					type: "FETCH_TIKTOK_LIST_VIDEO_SUCCESS",
					payload: res.data.data,
				});
			} else {
				dispatch({
					type: "FETCH_TIKTOK_LIST_VIDEO_FAILURE",
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: "FETCH_TIKTOK_LIST_VIDEO_FAILURE",
				payload: error,
			});
		});
};

export const fetchYoutubeListVideo = (id) => (dispatch) => {
	dispatch({
		type: "FETCH_YOUTUBE_LIST_VIDEO_PENDING",
		payload: id
	});
	//   axios
	//     .get(helper.url + "/api/v2/youtube/video")
	Api.FetchYoutubeListVideo()
		.then((res) => {
			if (res.data.status) {
				dispatch({
					type: "FETCH_YOUTUBE_LIST_VIDEO_SUCCESS",
					payload: res.data.data,
				});
			} else {
				dispatch({
					type: "FETCH_YOUTUBE_LIST_VIDEO_FAILURE",
				});
			}
		})
		.catch((error) => {
			dispatch({
				type: "FETCH_YOUTUBE_LIST_VIDEO_FAILURE",
				payload: error,
			});
		});
};

export const selectedFeedPost = (query) => (dispatch) => {
	dispatch({
		type: POST_UPLOAD_SUCCESS,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-selected-feed-post", query)
	Api.SelectedFeedPost(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: POST_UPLOAD_FAILURE,
			});
			// dispatch(influencerBookingCampaignContent(query.campaignId));
			// dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_FAILURE,
				payload: error,
			});
		});
};

export const handleSelectTiktok = (query) => (dispatch) => {
	dispatch({
		type: POST_UPLOAD_SUCCESS,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-selected-tiktok-post", query)
	Api.HandleSelectTiktok(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: POST_UPLOAD_FAILURE,
			});
			// dispatch(influencerBookingCampaignContent(query.campaignId));
			// dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_FAILURE,
				payload: error,
			});
		});
};

export const handleSelectYoutube = (query) => (dispatch) => {
	dispatch({
		type: POST_UPLOAD_SUCCESS,
	});
	//   axios
	//     .post(helper.url + "/api/v1/influencer-selected-youtube-post", query)
	Api.HandleSelectYoutube(query)
		.then((res) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_SUCCESS,
				payload: res.data,
			});
			dispatch({
				type: POST_UPLOAD_FAILURE,
			});
			// dispatch(influencerBookingCampaignContent(query.campaignId));
			// dispatch(influencerBookingCampaignOverview(query.campaignId, false));
		})
		.catch((error) => {
			dispatch({
				type: INFLUENCER_SELECTED_FEED_POST_FAILURE,
				payload: error,
			});
		});
};

export const fileDownload = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	//   axios
	//     .post(helper.url + "/api/v1/file-download", query)
	Api.FileDownload(query)
		.then((res) => {
			dispatch({
				type: DOWNLOAD_FILE_SUCCESS,
				payload: res.data,
			});

			dispatch({
				type: AJAX_CALL_FINSH,
			});
		})
		.catch((error) => {
			dispatch({
				type: DOWNLOAD_FILE_FAILURE,
				payload: error,
			});
		});
};
