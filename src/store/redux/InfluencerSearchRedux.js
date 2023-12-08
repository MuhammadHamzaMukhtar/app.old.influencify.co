import { toast } from "react-toastify";
import Influencify from "../../constants/Influencify";
import helper from "../../constants/helper";
import { refreshReports } from "../actions/HeaderActions";
import Emitter from "../../constants/Emitter";
import { actions as smtpActions } from "@store/redux/SmtpRedux";

import {
  HANDLE_RESPONSE_SUCCESS_FALSE,
  INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_FAILURE,
} from "../constants/action-types";

const sortDropdown = [
  {
    field: "followers",
    id: 0,
    direction: "desc",
    text: "Followers",
    value: "followers",
  },
  {
    field: "engagements",
    id: 0,
    direction: "desc",
    text: "Engagements",
    value: "engagements",
  },
];

export const types = {
  HANDLE_PLATFORM_CHANGE: "HANDLE_PLATFORM_CHANGE",
  FETCH_INFLUENCER_IQDATA_SUCCESS: "FETCH_INFLUENCER_IQDATA_SUCCESS",
  HANDLE_INFLUENCER_SEARCH_FILTER: "HANDLE_INFLUENCER_SEARCH_FILTER",
  SAVE_INFLUENCER_SHIPPING_ERRORS: "SAVE_INFLUENCER_SHIPPING_ERRORS",
  SAVE_INFLUENCER_SHIPPING_INIT: "SAVE_INFLUENCER_SHIPPING_INIT",
  AJAX_CALL_INIT: "AJAX_CALL_INIT",
  AJAX_CALL_FINISH: "AJAX_CALL_FINISH",
  FETCH_INFLUENCER_NOTES_SUCCESS: "FETCH_INFLUENCER_NOTES_SUCCESS",
  SAVE_INFLUENCER_NOTES_INIT: "SAVE_INFLUENCER_NOTES_INIT",
  FETCH_INFLUENCER_SHIPPING_SUCCESS: "FETCH_INFLUENCER_SHIPPING_SUCCESS",
  FETCH_DICTIONARIES_SUCCESS: "FETCH_DICTIONARIES_SUCCESS",
  FETCH_DICTIONARIES_FAILURE: "FETCH_DICTIONARIES_FAILURE",
  REMOVE_VALIDATION_ERRORS: "REMOVE_VALIDATION_ERRORS",
  SEARCH_INFLUENCERS_LOADING: "SEARCH_INFLUENCERS_LOADING",
  SEARCH_INFLUENCERS_SUCCESS: "SEARCH_INFLUENCERS_SUCCESS",
  SEARCH_INFLUENCERS_FAILURE: "SEARCH_INFLUENCERS_FAILURE",
  HANDLE_CLEAR_SEARCH_FILTERS: "HANDLE_CLEAR_SEARCH_FILTERS",
  LOAD_MORE_LOADING: "LOAD_MORE_LOADING",
  HANDLE_LOAD_MORE_INFLUENCERS_SUCCESS: "HANDLE_LOAD_MORE_INFLUENCERS_SUCCESS",
  HANDLE_LOAD_MORE_INFLUENCERS_FAILURE: "HANDLE_LOAD_MORE_INFLUENCERS_FAILURE",
  VIEW_INFLUENCER_PROFILE_LOADING: "VIEW_INFLUENCER_PROFILE_LOADING",
  VIEW_INFLUENCER_PROFILE_SUCCESS: "VIEW_INFLUENCER_PROFILE_SUCCESS",
  SAVE_INFLUENCER_SHIPPING_FORM: "SAVE_INFLUENCER_SHIPPING_FORM",
  REMOVE_SHIPPING_VALIDATION_ERRORS: "REMOVE_SHIPPING_VALIDATION_ERRORS",
  VIEW_INFLUENCER_CONTENT_DATA: "VIEW_INFLUENCER_CONTENT_DATA",
  VIEW_INFLUENCER_PROFILE_FAILURE: "VIEW_INFLUENCER_PROFILE_FAILURE",
  FETCH_LOOKALIKES_SUCCESS: "FETCH_LOOKALIKES_SUCCESS",
  FETCH_LOOKALIKES_FAILURE: "FETCH_LOOKALIKES_FAILURE",
  FETCH_TOPIC_TAGS_SUCCESS: "FETCH_TOPIC_TAGS_SUCCESS",
  FETCH_TOPIC_TAGS_FAILURE: "FETCH_TOPIC_TAGS_FAILURE",
  HANDLE_HIDE_MODAL: "HANDLE_HIDE_MODAL",
  HANDLE_LOADING: "HANDLE_LOADING",
  FETCH_SEARCH_TOPIC_TAGS_SUCCESS: "FETCH_SEARCH_TOPIC_TAGS_SUCCESS",
  FETCH_INFLUENCER_INIT: "FETCH_INFLUENCER_INIT",
  FETCH_INFLUENCER_FAIL: "FETCH_INFLUENCER_FAIL",
  FETCH_INFLUENCER_SUCCESS: "FETCH_INFLUENCER_SUCCESS",
  FETCH_INFLUENCER_ERRORS: "FETCH_INFLUENCER_ERRORS",
  HANDLE_FLAG_SEARCH_BY_LOADING: "HANDLE_FLAG_SEARCH_BY_LOADING",
  HANDLE_FLAG_LOOKALIKE_LOADING: "HANDLE_FLAG_LOOKALIKE_LOADING",
  HANDLE_CLEAR_TOPIC_TAGS: "HANDLE_CLEAR_TOPIC_TAGS",
  HANDLE_REQUEST_PLATFORM: "HANDLE_REQUEST_PLATFORM",
  FETCH_BRANDLIST_SUCCESS: "FETCH_BRANDLIST_SUCCESS",
  SEARCH_BRAND_SUCCESS: "SEARCH_BRAND_SUCCESS",
  FETCH_INFLUENCER_LISTIDS: "FETCH_INFLUENCER_LISTIDS",
  LOADING_INFLUENCER_LISTIDS: "LOADING_INFLUENCER_LISTIDS",
  EXPORT_LIST_LOADING: "EXPORT_LIST_LOADING",
  EXPORT_LIST_FINISHING: "EXPORT_LIST_FINISHING",
  EXPORT_LIST_SUCCESS: "EXPORT_LIST_SUCCESS",
  EXPORT_ANALYZER_LIST_LOADING: "EXPORT_ANALYZER_LIST_LOADING",
  EXPORT_ANALYZER_LIST_SUCCESS: "EXPORT_ANALYZER_LIST_SUCCESS",
  EXPORT_INFLUENTIAL_FOLLOWERS_LOADING: "EXPORT_INFLUENTIAL_FOLLOWERS_LOADING",
  EXPORT_INFLUENTIAL_FOLLOWERS_SUCCESS: "EXPORT_INFLUENTIAL_FOLLOWERS_SUCCESS",
  EXPORT_LIST_INFLUENCER_LOADING: "EXPORT_LIST_INFLUENCER_LOADING",
  EXPORT_LIST_INFLUENCER_SUCCESS: "EXPORT_LIST_INFLUENCER_SUCCESS",
  EXPORT_LIKERS_FOLLOWERS_LOADING: "EXPORT_LIKERS_FOLLOWERS_LOADING",
  EXPORT_LIKERS_FOLLOWERS_SUCCESS: "EXPORT_LIKERS_FOLLOWERS_SUCCESS",
  DOWNLOAD_EXPORT_FILE_LOADING: "DOWNLOAD_EXPORT_FILE_LOADING",
  DOWNLOAD_EXPORT_FILE_SUCCESS: "DOWNLOAD_EXPORT_FILE_SUCCESS",
  HANDLE_SET_DEFAULT_SEARCH_FILTERS: "HANDLE_SET_DEFAULT_SEARCH_FILTERS",
  FETCH_BRAND_DASHBOARD_INFORMATION: "FETCH_BRAND_DASHBOARD_INFORMATION",

  UPDATE_SEARCH_FILTER_COUNTER_LOADING: "UPDATE_SEARCH_FILTER_COUNTER_LOADING",
  UPDATE_SEARCH_FILTER_COUNTER: "UPDATE_SEARCH_FILTER_COUNTER",
  QUOTE_PRICE_INFLUENCER_FORM: "QUOTE_PRICE_INFLUENCER_FORM",

  BRAND_ACCEPT_QUOTE_PRICE_PENDING: "BRAND_ACCEPT_QUOTE_PRICE_PENDING",
  BRAND_ACCEPT_QUOTE_PRICE_SUCCESS: "BRAND_ACCEPT_QUOTE_PRICE_SUCCESS",
  BRAND_ACCEPT_QUOTE_PRICE_FAILURE: "BRAND_ACCEPT_QUOTE_PRICE_FAILURE",

  SEARCH_INFLUENCER_COUNT_PENDING: "SEARCH_INFLUENCER_COUNT_PENDING",
  SEARCH_INFLUENCER_COUNT_SUCCESS: "SEARCH_INFLUENCER_COUNT_SUCCESS",

  SEARCH_IQ_GEOS_PENDING: "SEARCH_IQ_GEOS_PENDING",
  SEARCH_IQ_GEOS_SUCCESS: "SEARCH_IQ_GEOS_SUCCESS",

  INFLUENCER_EXPORT_LIST_PENDING: "INFLUENCER_EXPORT_LIST_PENDING",
  INFLUENCER_EXPORT_LIST_SUCCESS: "INFLUENCER_EXPORT_LIST_SUCCESS",
  INFLUENCER_CREATE_NEW_EXPORT: "INFLUENCER_CREATE_NEW_EXPORT",

  INFLUENCER_SEARCH_ACTIONS: "INFLUENCER_SEARCH_ACTIONS",
  INFLUENCER_ACTION_ADD: "INFLUENCER_ACTION_ADD",

  SEARCH_RELEVANT_TAGS: "SEARCH_RELEVANT_TAGS",

  INFLUENCER_SET_INFLUENCER_ID: "INFLUENCER_SET_INFLUENCER_ID",

  INFLUENCER_SET_IS_SHOW_MESSAGE: "INFLUENCER_SET_IS_SHOW_MESSAGE",
  FETCH_EMAIL_TEMPLATES_SUCCESS: "FETCH_EMAIL_TEMPLATES_SUCCESS",
  FETCH_EMAIL_TEMPLATES_FAIL: "FETCH_EMAIL_TEMPLATES_FAIL",

  FETCH_LOGS_INIT: "FETCH_LOGS_INIT",
  FETCH_LOGS_SUCCESS: "FETCH_LOGS_SUCCESS",
  FETCH_LOGS_FINISH: "FETCH_LOGS_FINISH",
  DELETE_LOGS_INIT: "DELETE_LOGS_INIT",
  DELETE_LOGS_FINISH: "DELETE_LOGS_FINISH",
  FETCH_BOARD_INFLUENCERS_SUCCESS: "FETCH_BOARD_INFLUENCERS_SUCCESS",
};

export const actions = {
  handlePlatform: (dispatch, data) => {
    dispatch({ type: types.HANDLE_PLATFORM_CHANGE, data: data });
  },
  quotePriceInfluencerForm: (dispatch, data) => {
    dispatch({ type: types.QUOTE_PRICE_INFLUENCER_FORM, data: data });
  },
  acceptQuotePrice: async (dispatch, data) => {
    dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_PENDING });
    let json = await Influencify.acceptQuotePrice(data);
    json = json.data;
    if (json.success) {
      dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_SUCCESS });
    } else {
      dispatch({
        type: types.BRAND_ACCEPT_QUOTE_PRICE_FAILURE,
        data: json.errors,
      });
    }

    return json;
  },

  fetchInfluencer: async (dispatch, params) => {
    dispatch({ type: types.FETCH_INFLUENCER_INIT });
    const json = await Influencify.fetchInfluencerInformation(params);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_SUCCESS,
        data: json.data,
      });
      dispatch(smtpActions.fetchSmtp(dispatch));
    } else {
      toast.error("Something went wrong");
      dispatch({ type: types.FETCH_INFLUENCER_FAIL });
    }
  },

  fetchBoardInfluencers: async (dispatch, id) => {
    dispatch({ type: types.FETCH_INFLUENCER_INIT });
    const json = await Influencify.fetchBoardInfluencerEmails(id);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BOARD_INFLUENCERS_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
      dispatch({ type: types.FETCH_INFLUENCER_FAIL });
    }
    return json.data;
  },

  fetchInfluencerContact: async (dispatch, data) => {
    dispatch({ type: types.VIEW_INFLUENCER_PROFILE_LOADING, data: true });
    const json = await Influencify.fetchInfluencerContactInformation(data);
    if (json.status === 200) {
      if (json.data?.success) {
        toast.success(`Influencer contact updated successfully`);
        dispatch(refreshReports());
      } else {
        toast.error("Email not found");
      }
      dispatch({
        type: types.FETCH_INFLUENCER_SUCCESS,
        data: json.data.influencer,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.HANDLE_LOADING });
    return json;
  },

  fetchInfluencerEmailTemplates: async (dispatch, params) => {
    const json = await Influencify.fetchInfluencerEmailTemplate(params);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_EMAIL_TEMPLATES_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.HANDLE_LOADING });
    return json;
  },

  saveEmailTemplate: async (dispatch, data) => {
    dispatch({ type: types.VIEW_INFLUENCER_PROFILE_LOADING, data: true });
    const json = await Influencify.saveInfluencerEmailTemplate(data);
    if (json.status == 200) {
      if (json.data?.errors) {
        dispatch({
          type: types.FETCH_EMAIL_TEMPLATES_FAIL,
          data: json.data,
        });
      } else {
        dispatch({
          type: types.FETCH_EMAIL_TEMPLATES_SUCCESS,
          data: json.data,
        });
        toast.success("Template saved successfully");
      }
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.HANDLE_LOADING });
    return json;
  },

  sendEmailToInfluencer: async (dispatch, data) => {
    dispatch({ type: types.VIEW_INFLUENCER_PROFILE_LOADING, data: true });
    const json = await Influencify.sendEmail(data);
    if (json.status == 200) {
      if (json.data?.errors) {
        dispatch({
          type: types.FETCH_EMAIL_TEMPLATES_FAIL,
          data: json.data,
        });
      } else {
        if (data?.schedule) {
          toast.success("Email scheduled successfully");
        } else {
          toast.success("Email sent successfully");
        }
      }
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.HANDLE_LOADING });
    return json;
  },

  fetchInfluencerIqdata: async (dispatch, id) => {
    dispatch({ type: types.AJAX_CALL_INIT });
    const json = await Influencify.fetchInfluencerIqdataInformation(id);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_IQDATA_SUCCESS,
        data: json.data,
      });
      dispatch({ type: types.AJAX_CALL_FINISH });
    }
    return json;
  },

  fetchInfluencerShipping: async (dispatch, id) => {
    dispatch({ type: types.AJAX_CALL_INIT });
    const json = await Influencify.fetchInfluencerShippingInformation(id);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_SHIPPING_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({ type: types.FETCH_INFLUENCER_FAIL });
    }
    dispatch({ type: types.AJAX_CALL_FINISH });
  },

  fetchInfluencerNotes: async (dispatch, id, params = {}) => {
    dispatch({ type: types.AJAX_CALL_INIT, data: params });
    const json = await Influencify.fetchInfluencerNotes(id, params);

    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_NOTES_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.AJAX_CALL_FINISH });
  },

  fetchInfluencerEmailLogs: async (dispatch, id, params = {}) => {
    dispatch({ type: types.FETCH_LOGS_INIT, data: params });
    const json = await Influencify.fetchInfluencerLogs(id, params);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_LOGS_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.FETCH_LOGS_FINISH });
  },

  deleteInfluencerEmailLog: async (dispatch, id) => {
    dispatch({ type: types.DELETE_LOGS_INIT });
    const json = await Influencify.deleteInfluencerLog(id);
    if (json.status === 200) {
      toast.success("Email log deleted");
      dispatch({
        type: types.FETCH_LOGS_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.DELETE_LOGS_FINISH });
  },

  saveInfluencer: async (dispatch, data) => {
    const json = await Influencify.saveInfluencerInformation(data);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_SUCCESS,
        data: json.data,
      });
    } else if (json.status == 403) {
      dispatch({
        type: types.FETCH_INFLUENCER_ERRORS,
        data: json.data,
      });
    }
    return json;
  },

  saveInfluencerNote: async (dispatch, data) => {
    dispatch({ type: types.SAVE_INFLUENCER_NOTES_INIT });
    const json = await Influencify.saveInfluencerNotes(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_NOTES_SUCCESS,
        data: json.data,
      });
    } else if (json.status === 400 && json.data?.errors) {
      toast.error(json.data?.errors?.attachment?.[0]);
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.AJAX_CALL_FINISH });
    return json;
  },

  updateInfluencerNote: async (dispatch, data) => {
    const json = await Influencify.updateInfluencerNote(data);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_NOTES_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },

  saveInfluencerShipping: async (dispatch, data) => {
    dispatch({ type: types.SAVE_INFLUENCER_SHIPPING_INIT });
    const json = await Influencify.saveInfluencerShippingInformation(data);
    if (json.status == 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_SHIPPING_SUCCESS,
        data: json.data,
      });
    } else if (json.status == 403) {
      dispatch({
        type: types.SAVE_INFLUENCER_SHIPPING_ERRORS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },

  acceptBrandQuotePrice: async (dispatch, data) => {
    dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_PENDING });
    let json = await Influencify.acceptBrandQuotePrice(data);
    json = json.data;
    if (json.success) {
      dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_SUCCESS });
    } else {
      const errors = { errors: json };
      dispatch({
        type: "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_FAILURE",
        payload: errors,
      });
      dispatch({
        type: types.BRAND_ACCEPT_QUOTE_PRICE_FAILURE,
        data: json.errors,
      });
    }

    return json;
  },

  confirmInfluencerPayment: async (dispatch, data) => {
    dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_PENDING });
    let json = await Influencify.confirmInfluencerPayment(data);
    json = json.data;
    if (json.success) {
      dispatch({ type: types.BRAND_ACCEPT_QUOTE_PRICE_SUCCESS });
    } else {
      const errors = { errors: json };
      dispatch({
        type: "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_FAILURE",
        payload: errors,
      });
      dispatch({
        type: types.BRAND_ACCEPT_QUOTE_PRICE_FAILURE,
        data: json.errors,
      });
    }

    return json;
  },

  clearFilters: (dispatch) => {
    dispatch({ type: types.HANDLE_CLEAR_SEARCH_FILTERS });
  },

  addInfluencerActions: (data) => ({
    type: types.INFLUENCER_SEARCH_ACTIONS,
    data: data,
  }),
  searchFilters: (dispatch, payload, form) => {
    dispatch({
      type: types.HANDLE_INFLUENCER_SEARCH_FILTER,
      payload: payload,
      form: form,
    });
  },

  fetchDictionaries: async (dispatch) => {
    const json = await Influencify.fetchDictionaries();
    dispatch({ type: types.FETCH_DICTIONARIES_SUCCESS, data: json });
  },

  fetchBrandDashboardInformation: async (dispatch) => {
    const json = await Influencify.fetchBrandDashboardInformation();

    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BRAND_DASHBOARD_INFORMATION,
        data: json.data,
      });
    }
  },

  searchLookalikes: async (dispatch, data) => {
    if (data.flag === "lookalike") {
      dispatch({ type: types.HANDLE_FLAG_LOOKALIKE_LOADING });
    } else {
      dispatch({ type: types.HANDLE_FLAG_SEARCH_BY_LOADING });
    }
    const json = await Influencify.searchLookalikes(data);
    if (json.data?.success === true) {
      if (data.type === "lookalike") {
        dispatch({ type: types.FETCH_LOOKALIKES_SUCCESS, data: json.data });
      } else {
        dispatch({ type: types.FETCH_TOPIC_TAGS_SUCCESS, data: json.data });
      }
    }
  },

  searchInfluencers: async (dispatch, data) => {
    dispatch({ type: types.LOAD_MORE_LOADING });
    dispatch({
      type: types.SEARCH_INFLUENCERS_LOADING,
      data: data.override_filter,
    });
    const json = await Influencify.searchInfluencers(data);

    if (json.data?.success === false) {
      dispatch({
        type: HANDLE_RESPONSE_SUCCESS_FALSE,
        data: data,
      });
      dispatch({ type: types.HANDLE_LOADING });
    } else {
      dispatch(refreshReports());
      dispatch({
        type: types.HANDLE_LOAD_MORE_INFLUENCERS_SUCCESS,
        data: json.data,
      });
    }
  },
  searchInfluencersCount: async (dispatch, data) => {
    dispatch({ type: types.SEARCH_INFLUENCER_COUNT_PENDING });
    const json = await Influencify.searchInfluencersCount(data);
    dispatch({ type: types.SEARCH_INFLUENCER_COUNT_SUCCESS, data: json.data });
    json.data?.error_message && toast.error(json.data?.error_message);
  },
  searchRelevantTags: async (dispatch, data) => {
    const json = await Influencify.searchRelevantTags(data);
    dispatch({ type: types.SEARCH_RELEVANT_TAGS, data: json.data });
  },
  viewInfluencerProfile: async (dispatch, data) => {
    return dispatch({ type: types.INFLUENCER_SET_INFLUENCER_ID, data: data });
    //dispatch({ type: types.VIEW_INFLUENCER_PROFILE_LOADING, data:true });
    // dispatch({ type: types.HANDLE_REQUEST_PLATFORM, data: data.platform });
    // const json = await Influencify.viewInfluencerExport(data);

    // if (json.status==200) {

    // 	if(json.data?.error){
    // 		toast.error(json.data?.error_message);
    // 		dispatch({ type: types.VIEW_INFLUENCER_PROFILE_LOADING, data:false });
    // 	} else {

    // 		if (!json.data?.account) {
    // 			setTimeout(async () => {
    // 				const json = await Influencify.viewInfluencerExport(data);

    // 				if (!json.data?.account) {
    // 					setTimeout(async () => {
    // 						const json = await Influencify.viewInfluencerExport(data);

    // 						dispatch(refreshReports());
    // 						dispatch({
    // 							type: types.VIEW_INFLUENCER_PROFILE_SUCCESS,
    // 							data: json.data,
    // 						});

    // 						if (!json.data?.account) {

    // 							const jsonData = await Influencify.exportInfluencerContentData(data);
    // 							if(jsonData.status==200){
    // 								dispatch({ type: types.VIEW_INFLUENCER_CONTENT_DATA, data: jsonData.data });
    // 							}
    // 						}

    // 					}, 5000);
    // 				} else {
    // 					dispatch(refreshReports());
    // 					dispatch({ type: types.VIEW_INFLUENCER_PROFILE_SUCCESS, data: json.data });
    // 					const jsonData = await Influencify.exportInfluencerContentData(data);
    // 					if(jsonData.status==200){
    // 						dispatch({ type: types.VIEW_INFLUENCER_CONTENT_DATA, data: jsonData.data });
    // 					}
    // 				}
    // 			}, 10000);
    // 		} else {
    // 			dispatch(refreshReports());
    // 			dispatch({ type: types.VIEW_INFLUENCER_PROFILE_SUCCESS, data: json.data });
    // 			const jsonData = await Influencify.exportInfluencerContentData(data);
    // 			if(jsonData.status==200){
    // 				dispatch({ type: types.VIEW_INFLUENCER_CONTENT_DATA, data: jsonData.data });
    // 			}
    // 		}
    // 	}
    // }
    // return json;
  },

  topicTags: async (dispatch, data) => {
    dispatch({ type: types.HANDLE_FLAG_SEARCH_BY_LOADING });
    const json = await Influencify.topicTags(data);
    dispatch({
      type: types.FETCH_SEARCH_TOPIC_TAGS_SUCCESS,
      data: json.data?.data,
    });
  },

  exportList: async (dispatch, data) => {
    dispatch({ type: types.EXPORT_LIST_LOADING });
    dispatch({ type: types.INFLUENCER_EXPORT_LIST_PENDING });
    let json = await Influencify.exportList(data);
    json = json.data;
    dispatch(refreshReports());
    if (json?.notification_body) {
      Emitter.emit("MESSAGE_POPUP", {
        title: json?.notification_title,
        description: json?.notification_body,
        button: "/export",
        button_text: "Exports List",
      });
    }

    if (json.success === false) {
      dispatch({
        type: HANDLE_RESPONSE_SUCCESS_FALSE,
        data: json,
      });
      dispatch({ type: types.EXPORT_LIST_FINISHING });
      dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
    } else {
      setTimeout(() => {
        dispatch(refreshReports());
        dispatch({ type: types.EXPORT_LIST_SUCCESS, data: json });
        dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
      }, 10000);
    }
    return json;
  },

  createNewExport: async (dispatch) => {
    dispatch({ type: types.INFLUENCER_CREATE_NEW_EXPORT });
  },
  AnalyzerInfluencer: async (dispatch, data) => {
    dispatch({ type: types.EXPORT_ANALYZER_LIST_LOADING });
    dispatch({ type: types.INFLUENCER_EXPORT_LIST_PENDING });
    let json = await Influencify.AnalyzerInfluencer(data);
    json = json.data;
    dispatch(refreshReports());
    if (json?.notification_body) {
      Emitter.emit("MESSAGE_POPUP", {
        title: json?.notification_title,
        description: json?.notification_body,
        button: "/export",
        button_text: "Exports List",
      });
    }
    if (json.success === false) {
      dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
    } else {
      setTimeout(() => {
        dispatch({ type: types.EXPORT_ANALYZER_LIST_SUCCESS, data: json });
        dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
      }, 10000);
    }
  },

  InfluentialFollowers: async (dispatch, data) => {
    dispatch({ type: types.EXPORT_INFLUENTIAL_FOLLOWERS_LOADING });
    dispatch({ type: types.INFLUENCER_EXPORT_LIST_PENDING });
    let json = await Influencify.InfluentialFollowers(data);
    json = json.data;
    if (json.success === false) {
      dispatch({
        type: HANDLE_RESPONSE_SUCCESS_FALSE,
        data: json,
      });
      dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
    } else {
      setTimeout(() => {
        dispatch({
          type: types.EXPORT_INFLUENTIAL_FOLLOWERS_SUCCESS,
          data: json,
        });
        dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
      }, 10000);
    }
  },

  ExportInfluencerList: async (dispatch, data) => {
    dispatch({ type: types.EXPORT_LIST_INFLUENCER_LOADING });
    dispatch({ type: types.INFLUENCER_EXPORT_LIST_PENDING });
    let json = await Influencify.ExportInfluencerList(data);
    json = json.data;
    dispatch(refreshReports());
    if (json?.notification_body) {
      Emitter.emit("MESSAGE_POPUP", {
        title: json?.notification_title,
        description: json?.notification_body,
        button: "/export",
        button_text: "Exports List",
      });
    }
    if (json.success === false) {
      dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
    } else {
      setTimeout(() => {
        dispatch(refreshReports());
        dispatch({ type: types.EXPORT_LIST_INFLUENCER_SUCCESS, data: json });
        dispatch({ type: types.INFLUENCER_EXPORT_LIST_SUCCESS, data: json });
      }, 10000);
    }
  },

  InfluentialLikers: async (dispatch, data) => {
    dispatch({ type: types.EXPORT_LIKERS_FOLLOWERS_LOADING });
    const json = await Influencify.InfluentialLikers(data);
    setTimeout(() => {
      dispatch({
        type: types.EXPORT_LIKERS_FOLLOWERS_SUCCESS,
        data: json.data,
      });
    }, 10000);
  },

  searchIqGeoData: async (dispatch, data, platform) => {
    dispatch({ type: types.SEARCH_IQ_GEOS_PENDING });
    const json = await Influencify.searchIqGeoData(data, platform);
    if (json.status === 200) {
      dispatch({ type: types.SEARCH_IQ_GEOS_SUCCESS, data: json.data });
    }
  },

  influencerActions: (dispatch, data) => {
    dispatch({ type: types.INFLUENCER_ACTION_ADD, data: data });
  },
};

const initialState = {
  isShowMessage: false,
  influencer_id: null,
  countries: [],
  langs: [],
  interests: [],
  brands: [],
  influencers: [],
  lookalikes: [],
  topictags: [],
  searchTopictags: [],
  ExportFileDownload: {},
  ExportAnalyzerDownload: {},
  ExportInfluentialFollowers: {},
  ExportInfluencerList: {},
  ExporTLikers: {},
  exportFileLoading: false,
  isInfluencerLoading: false,
  isLoading: false,
  isLookalikeLoading: false,
  searchTopicTagLoading: false,
  platform: "instagram",
  requestPlatform: "instagram",
  total: 0,
  is_show_modal: false,
  form: {
    searchType: true,
    searchBy: "keywords",
    filter: {
      with_contact: [
        {
          type: "email",
          action: "should",
        },
      ],
      gender: { code: "KNOWN" },
      last_posted: 30,
      followers: { left_number: "", right_number: 50000000 },
      audience_age_range: {
        left_number: "13",
        right_number: "65",
        weight: "0.01",
      },
      age: { left_number: "18", right_number: "65" },
    },
    loadMore: false,
    relvance_value: [],
    is_focused: false,
    sortOptions: sortDropdown,
    searchRelevantTags: [],
  },
  payload: {
    audience_source: "any",
    filter: {
      with_contact: [
        {
          type: "email",
          action: "should",
        },
      ],
      has_audience_data: true,
      gender: { code: "KNOWN" },
      last_posted: 30,
      followers: { left_number: "", right_number: 50000000 },
    },
    paging: {
      skip: 0,
      limit: helper.search_results_limit,
    },
    sort: {
      field: "followers",
      id: 0,
      direction: "desc",
    },
  },
  isProfileLoading: false,
  influencerShippingSaveLoading: false,
  current_influencer: {},
  influencer: {},
  influencerShipping: {},
  brandDashboardInformation: {},
  searchResults: 0,
  searchResultsLoader: false,
  quotePriceInfluencerForm: {},
  influencerErrors: {},
  influencerNotesMeta: {},
  influencerIqdata: {},
  influencerShippingErrors: {},
  influencerNotes: {},
  influencerEmailTemplatesErrors: {},
  acceptQuotePriceLoading: false,
  isInfluencerNotesLoading: false,
  influencerNotesSaveLoader: false,
  acceptQuotePriceError: "",
  influencerTotal: 0,
  influencerCountLoading: false,
  influencerCount: 0,
  exportListLoading: false,
  exportListDone: false,
  influencerLoader: false,
  influencerLogsLoading: false,
  isInfluencerLogsLoading: false,
  influencerLogsDeleteLoading: false,
  actions: [],
  influencerContentData: [],
  influencerEmailTemplates: [],
  boardInfluencerEmails: [],
  influencerEmailLogs: [],
  influencerLogsMetadeta: {},
  influencerContentLoader: false,
};

export const reducer = (state = initialState, action) => {
  const { type, data, payload, form } = action;
  switch (type) {
    case types.HANDLE_INFLUENCER_SEARCH_FILTER: {
      return {
        ...state,
        payload: payload,
        form: form,
      };
    }
    case types.HANDLE_PLATFORM_CHANGE: {
      return {
        ...state,
        platform: data,
      };
    }
    case types.FETCH_INFLUENCER_INIT: {
      return {
        ...state,
        influencerLoader: true,
      };
    }
    case types.FETCH_LOGS_INIT: {
      return {
        ...state,
        influencerLogsLoading: (data?.page || 1) > 1 ? false : true,
        isInfluencerLogsLoading: (data?.page || 1) > 1 ? true : false,
      };
    }
    case types.FETCH_LOGS_SUCCESS: {
      return {
        ...state,
        influencerEmailLogs:
          data?.current_page > 1
            ? state.influencerEmailLogs.concat(data.data)
            : data.data,
        influencerLogsMetadeta: data,
      };
    }
    case types.FETCH_LOGS_FINISH: {
      return {
        ...state,
        influencerLogsLoading: false,
        isInfluencerLogsLoading: false,
      };
    }
    case types.DELETE_LOGS_INIT: {
      return {
        ...state,
        influencerLogsDeleteLoading: true,
      };
    }
    case types.DELETE_LOGS_FINISH: {
      return {
        ...state,
        influencerLogsDeleteLoading: false,
      };
    }
    case types.SAVE_INFLUENCER_NOTES_INIT: {
      return {
        ...state,
        influencerNotesSaveLoader: true,
      };
    }
    case types.FETCH_INFLUENCER_FAIL: {
      return {
        ...state,
        influencerLoader: false,
        influencerShipping: {},
      };
    }
    case types.AJAX_CALL_FINISH: {
      return {
        ...state,
        isInfluencerLoading: false,
        influencerNotesSaveLoader: false,
      };
    }
    case types.SAVE_INFLUENCER_SHIPPING_INIT: {
      return {
        ...state,
        influencerShippingSaveLoading: true,
      };
    }
    case types.FETCH_INFLUENCER_SUCCESS: {
      return {
        ...state,
        influencer: data,
        influencerLoader: false,
        influencerShippingSaveLoading: false,
        influencerErrors: {},
        influencerShippingErrors: {},
      };
    }
    case types.FETCH_INFLUENCER_IQDATA_SUCCESS: {
      return {
        ...state,
        influencerIqdata: data,
        influencer: {
          ...state.influencer,
          engagements: data.account?.user_profile?.engagements,
          engagement_rate: data.account?.user_profile?.engagement_rate,
          followers: data.account?.user_profile?.followers,
        },
      };
    }
    case types.SAVE_INFLUENCER_SHIPPING_ERRORS: {
      return {
        ...state,
        influencerShippingErrors: data.errors,
        influencerShippingSaveLoading: false,
        isInfluencerLoading: false,
      };
    }
    case types.FETCH_EMAIL_TEMPLATES_SUCCESS: {
      return {
        ...state,
        influencerEmailTemplates: data.data,
        influencerEmailTemplatesErrors: {},
      };
    }
    case types.FETCH_EMAIL_TEMPLATES_FAIL: {
      return {
        ...state,
        influencerEmailTemplatesErrors: data.errors,
      };
    }
    case types.FETCH_BOARD_INFLUENCERS_SUCCESS: {
      return {
        ...state,
        boardInfluencerEmails: data,
      };
    }
    case types.FETCH_INFLUENCER_SHIPPING_SUCCESS: {
      return {
        ...state,
        influencerShipping: data,
        influencerShippingSaveLoading: false,
        isInfluencerLoading: false,
        influencerShippingErrors: {},
      };
    }
    case types.FETCH_INFLUENCER_NOTES_SUCCESS: {
      return {
        ...state,
        influencerNotes:
          (data?.current_page || 1) > 1
            ? (state.influencerNotes || []).concat(data.data)
            : data.data,
        influencerNotesMeta: data,
        isInfluencerLoading: false,
        influencerNotesSaveLoader: false,
        isInfluencerNotesLoading: false,
      };
    }
    case types.FETCH_INFLUENCER_ERRORS: {
      return {
        ...state,
        influencerErrors: data.errors,
        influencerLoader: false,
      };
    }
    case types.REMOVE_VALIDATION_ERRORS: {
      return {
        ...state,
        influencerErrors: {},
        influencerEmailTemplatesErrors: {},
      };
    }
    case types.INFLUENCER_ACTION_ADD: {
      const form = Object.assign({}, state.form);
      let filterActions = form?.filter?.actions || [];
      let filterContacts = form?.filter?.with_contact || [];
      if (data.key === "email") {
        filterContacts = [data.payload];
      } else {
        if (filterActions.filter((i) => i.filter == data.key).length == 0) {
          filterActions = [...filterActions, data.payload];
        } else {
          filterActions = filterActions.filter((i) => i.filter != data.key);
        }
      }

      return {
        ...state,
        actions: filterActions,
        form: {
          ...state.form,
          filter: {
            ...state.form.filter,
            actions: filterActions,
            with_contact: filterContacts,
          },
        },
      };
    }

    case types.FETCH_DICTIONARIES_SUCCESS: {
      return {
        ...state,
        countries: data && data.countries,
        langs: data && data.data && data.data.langs,
        interests: data && data.data && data.data.interests,
        brands: data && data.data && data.data.brands,
        searchRelevantTags: [],
      };
    }
    case types.HANDLE_SET_DEFAULT_SEARCH_FILTERS: {
      const form = {
        searchType: true,
        searchBy: state.platform === "instagram" ? "keywords" : "topic",
        filter: {
          gender: { code: "KNOWN" },
          last_posted: 30,
          followers: { left_number: "", right_number: 50000000 },
        },
        loadMore: false,
        relvance_value: [],
        sortOptions:
          state.platform !== "instagram"
            ? [
                {
                  field: "followers",
                  id: 0,
                  direction: "desc",
                  text: "Followers",
                  value: "followers",
                },
                {
                  field: "views",
                  id: 0,
                  direction: "desc",
                  text: "Views",
                  value: "views",
                },
                {
                  field: "engagements",
                  id: 0,
                  direction: "desc",
                  text: "Engagements",
                  value: "engagements",
                },
              ]
            : [
                {
                  field: "followers",
                  id: 0,
                  direction: "desc",
                  text: "Followers",
                  value: "followers",
                },
                {
                  field: "engagements",
                  id: 0,
                  direction: "desc",
                  text: "Engagements",
                  value: "engagements",
                },
              ],
      };
      const payload = {
        audience_source: "any",
        filter: {
          with_contact: [
            {
              type: "email",
              action: "should",
            },
          ],
          has_audience_data: true,
          gender: { code: "KNOWN" },
          last_posted: 30,
          followers: { left_number: "", right_number: 50000000 },
        },
        paging: {
          skip: 0,
          limit: helper.search_results_limit,
        },
        sort: {
          field: "followers",
          direction: "desc",
        },
      };
      return {
        ...state,
        form: form,
        payload: payload,
      };
    }
    case types.HANDLE_CLEAR_SEARCH_FILTERS: {
      const form = {
        searchType: true,
        searchBy: state.platform === "instagram" ? "keywords" : "topic",
        filter: {},
        loadMore: false,
        relvance_value: [],
        sortOptions:
          state.platform !== "instagram"
            ? [
                {
                  field: "followers",
                  id: 0,
                  direction: "desc",
                  text: "Followers",
                  value: "followers",
                },
                {
                  field: "views",
                  id: 0,
                  direction: "desc",
                  text: "Views",
                  value: "views",
                },
                {
                  field: "engagements",
                  id: 0,
                  direction: "desc",
                  text: "Engagements",
                  value: "engagements",
                },
              ]
            : [
                {
                  field: "followers",
                  id: 0,
                  direction: "desc",
                  text: "Followers",
                  value: "followers",
                },
                {
                  field: "engagements",
                  id: 0,
                  direction: "desc",
                  text: "Engagements",
                  value: "engagements",
                },
              ],
      };
      const payload = {
        audience_source: "any",
        filter: {
          with_contact: [
            {
              type: "email",
              action: "should",
            },
          ],
          has_audience_data: true,
        },
        paging: {
          skip: 0,
          limit: helper.search_results_limit,
        },
        sort: {
          field: "followers",
          direction: "desc",
        },
      };
      return {
        ...state,
        form: form,
        payload: payload,
      };
    }
    case types.FETCH_LOOKALIKES_SUCCESS: {
      return {
        ...state,
        lookalikes: data.data,
        isLookalikeLoading: false,
        searchTopicTagLoading: false,
      };
    }
    case types.FETCH_TOPIC_TAGS_SUCCESS: {
      return {
        ...state,
        topictags: data.data,
        isLookalikeLoading: false,
        searchTopicTagLoading: false,
      };
    }
    case types.SEARCH_INFLUENCERS_LOADING: {
      const payload = Object.assign({}, state.payload);
      var geo_info = localStorage.getItem("geo_info");
      geo_info = JSON.parse(geo_info);
      if (geo_info && !data) {
        const form = Object.assign({}, state.form);
        if ((payload["filter"]["audience_geo"] || []).length == 0) {
          payload["filter"]["audience_geo"] = [
            { id: geo_info.value, weight: 0.05 },
          ];
          payload["filter"]["gender"] = { code: "KNOWN" };
          payload["filter"]["last_posted"] = 30;
          payload["filter"]["followers"] = {
            left_number: "",
            right_number: 50000000,
          };
        }
        if ((form["filter"]["audience_geo"] || []).length == 0) {
          form["filter"]["audience_geo"] = [
            { id: geo_info.value, weight: 0.05, name: geo_info.text },
          ];
          form["filter"]["gender"] = { code: "KNOWN" };
          form["filter"]["last_posted"] = 30;
          form["filter"]["followers"] = {
            left_number: "",
            right_number: 50000000,
          };
        }

        return {
          ...state,
          payload,
          form,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case types.HANDLE_FLAG_LOOKALIKE_LOADING: {
      return {
        ...state,
        isLookalikeLoading: true,
      };
    }
    case types.SEARCH_INFLUENCERS_SUCCESS: {
      if (data && data.success === false) {
        return {
          ...state,
          is_show_modal: true,
          isLoading: false,
          influencers: data && data,
          total: 0,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          influencers: data && data.accounts,
          total: data && data.total,
          influencerTotal: data && data.total,
        };
      }
    }
    case types.HANDLE_HIDE_MODAL: {
      return {
        ...state,
        is_show_modal: false,
      };
    }
    case types.SAVE_INFLUENCER_SHIPPING_FORM: {
      return {
        ...state,
        influencerShipping: data,
      };
    }
    case types.REMOVE_SHIPPING_VALIDATION_ERRORS: {
      return {
        ...state,
        influencerShippingErrors: {},
      };
    }
    case types.LOAD_MORE_LOADING: {
      const form = Object.assign({}, state.form);
      form["loadMore"] = true;
      return {
        ...state,
        form: form,
      };
    }
    case types.HANDLE_LOAD_MORE_INFLUENCERS_SUCCESS: {
      const form = Object.assign({}, state.form);
      form["loadMore"] = false;
      return {
        ...state,
        form: form,
        influencers: data?.accounts || [],
        influencerTotal: data?.total || 0,
      };
    }
    case types.VIEW_INFLUENCER_PROFILE_LOADING: {
      return {
        ...state,
        isProfileLoading: data,
      };
    }
    case types.VIEW_INFLUENCER_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        isProfileLoading: false,
        influencer: data,
        influencerContentData: [],
        influencerContentLoader: true,
      });
    }

    case types.VIEW_INFLUENCER_CONTENT_DATA: {
      return Object.assign({}, state, {
        influencerContentData: data,
        influencerContentLoader: false,
      });
    }
    case types.HANDLE_LOADING: {
      return {
        ...state,
        isProfileLoading: false,
        isLoading: false,
      };
    }
    case types.HANDLE_FLAG_SEARCH_BY_LOADING: {
      return {
        ...state,
        searchTopicTagLoading: true,
      };
    }
    case types.AJAX_CALL_INIT: {
      return {
        ...state,
        isInfluencerLoading: (data?.page || 1) > 1 ? false : true,
        isInfluencerNotesLoading: (data?.page || 1) > 1 ? true : false,
      };
    }
    case types.FETCH_SEARCH_TOPIC_TAGS_SUCCESS: {
      return {
        ...state,
        searchTopicTagLoading: false,
        searchTopictags: data,
      };
    }
    case types.HANDLE_CLEAR_TOPIC_TAGS: {
      return {
        ...state,
        lookalikes: [],
        topictags: [],
        searchTopictags: [],
        searchRelevantTags: [],
      };
    }
    case types.HANDLE_REQUEST_PLATFORM: {
      return {
        ...state,
        requestPlatform: data,
      };
    }

    case types.EXPORT_LIST_LOADING: {
      return {
        ...state,
        exportFileLoading: true,
      };
    }
    case types.EXPORT_LIST_SUCCESS: {
      return {
        ...state,
        exportFileLoading: false,
        ExportFileDownload: data,
        payload: {
          ...state.payload,
          paging: { skip: 0, limit: 12 },
        },
      };
    }

    case types.EXPORT_ANALYZER_LIST_LOADING: {
      return {
        ...state,
        exportFileLoading: true,
      };
    }

    case types.EXPORT_ANALYZER_LIST_SUCCESS: {
      return {
        ...state,
        exportFileLoading: false,
        ExportAnalyzerDownload: data,
      };
    }

    case types.EXPORT_INFLUENTIAL_FOLLOWERS_LOADING: {
      return {
        ...state,
        exportFileLoading: true,
      };
    }

    case types.EXPORT_INFLUENTIAL_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        exportFileLoading: false,
        ExportInfluentialFollowers: data,
      };
    }

    case types.EXPORT_LIST_INFLUENCER_LOADING: {
      return {
        ...state,
        exportIsLoading: true,
        exportFileLoading: true,
      };
    }

    case types.EXPORT_LIST_INFLUENCER_SUCCESS: {
      return {
        ...state,
        exportIsLoading: false,
        exportFileLoading: false,
        ExportInfluencerList: data,
      };
    }

    case types.EXPORT_LIKERS_FOLLOWERS_LOADING: {
      return {
        ...state,
        exportIsLoading: true,
      };
    }

    case types.EXPORT_LIKERS_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        exportIsLoading: false,
        ExporTLikers: data,
      };
    }
    case types.EXPORT_LIST_FINISHING: {
      return {
        ...state,
        exportFileLoading: false,
      };
    }

    case types.FETCH_BRAND_DASHBOARD_INFORMATION: {
      return {
        ...state,
        brandDashboardInformation: data,
      };
    }

    case types.UPDATE_SEARCH_FILTER_COUNTER: {
      return {
        ...state,
        searchResults: data.total,
        searchResultsLoader: false,
      };
    }

    case types.UPDATE_SEARCH_FILTER_COUNTER_LOADING: {
      return {
        ...state,
        searchResultsLoader: true,
      };
    }

    case types.QUOTE_PRICE_INFLUENCER_FORM: {
      return {
        ...state,
        quotePriceInfluencerForm: data,
      };
    }

    case types.BRAND_ACCEPT_QUOTE_PRICE_PENDING: {
      return {
        ...state,
        acceptQuotePriceError: "",
        acceptQuotePriceLoading: true,
      };
    }

    case types.BRAND_ACCEPT_QUOTE_PRICE_SUCCESS: {
      return {
        ...state,
        acceptQuotePriceError: "",
        acceptQuotePriceLoading: false,
      };
    }

    case types.BRAND_ACCEPT_QUOTE_PRICE_FAILURE: {
      return {
        ...state,
        acceptQuotePriceLoading: false,
        acceptQuotePriceError: data,
      };
    }

    case types.SEARCH_INFLUENCER_COUNT_PENDING: {
      return {
        ...state,
        influencerCountLoading: true,
      };
    }

    case types.SEARCH_INFLUENCER_COUNT_SUCCESS: {
      return {
        ...state,
        influencerCountLoading: false,
        influencerCount: data && data.total,
      };
    }

    case types.SEARCH_IQ_GEOS_PENDING: {
      return {
        ...state,
      };
    }

    case types.SEARCH_IQ_GEOS_SUCCESS: {
      return {
        ...state,
        countries: data,
      };
    }

    case types.INFLUENCER_EXPORT_LIST_PENDING: {
      return {
        ...state,
        exportListLoading: true,
        exportListDone: false,
      };
    }

    case types.INFLUENCER_EXPORT_LIST_SUCCESS: {
      return {
        ...state,
        exportListLoading: false,
        exportListDone: data.success,
      };
    }

    case types.INFLUENCER_CREATE_NEW_EXPORT: {
      return {
        ...state,
        exportListLoading: false,
        exportListDone: false,
      };
    }

    case types.INFLUENCER_SEARCH_ACTIONS: {
      return {
        ...state,
        actions: data,
      };
    }

    case types.SEARCH_RELEVANT_TAGS: {
      return {
        ...state,
        searchRelevantTags: data,
      };
    }

    case types.INFLUENCER_SET_INFLUENCER_ID: {
      return {
        ...state,
        influencer_id: data,
      };
    }

    case types.INFLUENCER_SET_IS_SHOW_MESSAGE: {
      return {
        ...state,
        isShowMessage: data,
      };
    }

    default: {
      return state;
    }
  }
};
