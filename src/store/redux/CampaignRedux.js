import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";
import { refreshReports } from "../actions/HeaderActions";

import { HANDLE_RESPONSE_SUCCESS_FALSE } from "../constants/action-types";

export const types = {
  FETCH_CAMPAIGN_TYPES_LOADING: "FETCH_CAMPAIGN_TYPES_LOADING",
  FETCH_CAMPAIGN_TYPES_SUCCESS: "FETCH_CAMPAIGN_TYPES_SUCCESS",
  FETCH_CAMPAIGN_LOADING: "FETCH_CAMPAIGN_LOADING",
  FETCH_CAMPAIGN_SUCCESS: "FETCH_CAMPAIGN_SUCCESS",
  FETCH_TYPES_SUCCESS: "FETCH_TYPES_SUCCESS",
  HANDLE_CAMPAIGN_FORM_DATA: "HANDLE_CAMPAIGN_FORM_DATA",
  HANDLE_CHANGE_TAB: "HANDLE_CHANGE_TAB",
  HANDLE_ACTIVE_TAB: "HANDLE_ACTIVE_TAB",
  HANDLE_ADD_INFLUENCER: "HANDLE_ADD_INFLUENCER",
  HANDLE_REMOVE_INFLUENCER: "HANDLE_REMOVE_INFLUENCER",
  HANDLE_REMOVE_ALL_INFLUENCERS: "HANDLE_REMOVE_ALL_INFLUENCERS",
  HANDLE_SAVE_CAMPAIGN_SUCCESS: "HANDLE_SAVE_CAMPAIGN_SUCCESS",
  HANDLE_PAYMENT_ERRORS: "HANDLE_PAYMENT_ERRORS",
  HANDLE_TASKS_ERRORS: "HANDLE_TASKS_ERRORS",
  HANDLE_SAVE_CAMPAIGN_LOADING: "HANDLE_SAVE_CAMPAIGN_LOADING",
  FETCH_GMAIL_SETTING_SUCCESS: "FETCH_GMAIL_SETTING_SUCCESS",
  HANDLE_TRANSACTION_ERRORS: "HANDLE_TRANSACTION_ERRORS",
  HANDLE_SAVE_CAMPAIGN_LOADING_FINISH: "HANDLE_SAVE_CAMPAIGN_LOADING_FINISH",
  HANDLE_CLEAR_SELECTED_INFLUENCERS: "HANDLE_CLEAR_SELECTED_INFLUENCERS",
  HANDLE_CAMPAIGN_FORM_ERROR: "HANDLE_CAMPAIGN_FORM_ERROR",
  HANDLE_CREATE_CAMPAIGN_ERRORS: "HANDLE_CREATE_CAMPAIGN_ERRORS",
  SAVING_CAMPAIGN_TEMPLATE_PENDING: "SAVING_CAMPAIGN_TEMPLATE_PENDING",
  SAVING_CAMPAIGN_TEMPLATE_SUCCESS: "SAVING_CAMPAIGN_TEMPLATE_SUCCESS",
  HANDLE_CAMPAIGN_IMAGE_SUCCESS: "HANDLE_CAMPAIGN_IMAGE_SUCCESS",

  ADD_SELECTED_INFLUENCERS: "ADD_SELECTED_INFLUENCERS",
};

export const actions = {
  fetchCampaginTypes: async (dispatch) => {
    dispatch({ type: types.FETCH_CAMPAIGN_TYPES_LOADING });
    const json = await Influencify.fetchCampaginTypes();

    dispatch({
      type: types.FETCH_CAMPAIGN_TYPES_SUCCESS,
      data: json.data?.data,
    });
  },
  addSelectedInfluencers: (dispatch, data, id) => {
    dispatch({ type: types.ADD_SELECTED_INFLUENCERS, data: data, id: id });
  },
  newCampaignSetUp: async (ownProps, data) => {
    const json = await Influencify.newCampaignSetUp(data);
    if (json.data?.success === true) {
      window.location.pathname = "/brand/campaign/" + json.data?.data?.id;
    }
  },
  fetchCampaign: async (dispatch, ownProps, id) => {
    dispatch({ type: types.FETCH_CAMPAIGN_LOADING });
    const types_json = await Influencify.fetchTypes();
    dispatch({ type: types.FETCH_TYPES_SUCCESS, data: types_json.data.data });
    const campaing_json = await Influencify.fetchCampaign(id);
    if (campaing_json.data && campaing_json.data?.success === true) {
      dispatch({
        type: types.FETCH_CAMPAIGN_SUCCESS,
        data: campaing_json.data?.data,
      });
    } else {
      window.location.href = "/404";
    }
  },

  fetchGmailSetting: async (dispatch) => {
    const json = await Influencify.fetchGmailSetting();
    dispatch({ type: types.FETCH_GMAIL_SETTING_SUCCESS, data: json.data.data });
    return json.data.data;
  },

  addForm: (dispatch, form) => {
    dispatch({ type: types.HANDLE_CAMPAIGN_FORM_DATA, data: form });
  },

  saveImages: async (dispatch, query) => {
    const json = await Influencify.saveCampaignImages(query);
    if (json.data?.success === true && json.status === 200) {
      dispatch({
        type: types.HANDLE_CAMPAIGN_IMAGE_SUCCESS,
        data: json.data?.data,
      });
    } else {
      toast.error(json.message);
    }
  },

  formErrors: (dispatch, error) => {
    dispatch({ type: types.HANDLE_CAMPAIGN_FORM_ERROR, data: error });
  },

  saveCampaign: async (dispatch, ownProps, data) => {
    dispatch({ type: types.HANDLE_SAVE_CAMPAIGN_LOADING });
    let json = await Influencify.saveCampaign(data);
    json = json.data;
    if (json && json.success === true) {
      if (json.is_redirect === true) {
        dispatch(refreshReports());
        window.location.href = "/brand/campaigns";
      } else {
        toast.dismiss();
        dispatch({ type: types.HANDLE_SAVE_CAMPAIGN_SUCCESS, data: json });
      }
    } else {
      if (json.type === "upgrade") {
        toast.error(json.message);
        setTimeout(() => {
          window.location.href = "/billing";
        }, 3000);
      } else if (json.type === "type") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "basic") {
        dispatch({ type: types.HANDLE_CREATE_CAMPAIGN_ERRORS, data: json });
      } else if (json.type === "brief") {
        dispatch({ type: types.HANDLE_CREATE_CAMPAIGN_ERRORS, data: json });
      } else if (json.type === "invitation") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "influencer") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "payment") {
        dispatch({ type: types.HANDLE_PAYMENT_ERRORS, data: json });
      } else if (json.type === "task") {
        dispatch({ type: types.HANDLE_TASKS_ERRORS, data: json });
      } else if (json.type === "credit_card") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "add_on_extension") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "overview") {
        toast.dismiss();
        toast.error(json.errors);
      } else if (json.type === "transaction") {
        dispatch({ type: types.HANDLE_TRANSACTION_ERRORS, data: json });
      }
    }
    dispatch({ type: types.HANDLE_SAVE_CAMPAIGN_LOADING_FINISH });
  },

  createCampaignInvite: async (data) => {
    const json = await Influencify.createCampaignInvite(data);
    if (json.data && json.data.success === true) {
      window.location.href = "/brand/campaign/" + json.data.id;
    }
  },

  createCampaignSelected: async (dispatch, ownProps, data, navigate) => {
    let json = await Influencify.createCampaignSelected(data);
    json = json.data;
    if (json && json.success === true) {
      dispatch({ type: types.HANDLE_CLEAR_SELECTED_INFLUENCERS });
      navigate("/brand/campaign/" + json.id);
    } else {
      if (json.error_message) {
        toast.error(json.error_message);
      }
      dispatch({
        type: HANDLE_RESPONSE_SUCCESS_FALSE,
        data: json,
      });
    }
  },
};

const initialState = {
  campaign_type_loading: false,
  campaign_types: [],
  typeItems: [],
  campaign_loading: false,
  save_campaign_loading: false,
  form: {},
  selected_influencers: [],
  selected_analyzer_influencers: [],
  selected_influential_influencers: [],
  activeTab: 2,
  payment_errors: [],
  gmail_setting: {},
  transaction_errors: [],
  creation_errors: {},
  tasks_errors: [],
  templateSaving: false,
  selected_mentions_influencers: [],
};

export const reducer = (state = initialState, action) => {
  const { type, data, id } = action;
  switch (type) {
    case types.FETCH_CAMPAIGN_TYPES_LOADING: {
      return {
        ...state,
        campaign_type_loading: true,
      };
    }
    case types.HANDLE_CAMPAIGN_IMAGE_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form,
          attachments: data,
        },
      };
    }
    case types.FETCH_CAMPAIGN_TYPES_SUCCESS: {
      return {
        ...state,
        campaign_types: data,
        campaign_type_loading: true,
        selected_analyzer_influencers: [],
      };
    }
    case types.FETCH_CAMPAIGN_LOADING: {
      return {
        ...state,
        campaign_loading: true,
        activeTab: 2,
        save_campaign_loading: false,
      };
    }
    case types.FETCH_TYPES_SUCCESS: {
      return {
        ...state,
        typeItems: data,
      };
    }
    case types.FETCH_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        campaign_loading: false,
        form: data,
        selected_influencers: data.selected_influencers,
      };
    }
    case types.HANDLE_SAVE_CAMPAIGN_LOADING: {
      return {
        ...state,
        save_campaign_loading: true,
        payment_errors: [],
        tasks_errors: [],
        transaction_errors: [],
        creation_errors: {},
      };
    }
    case types.HANDLE_SAVE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        save_campaign_loading: false,
        form: data.data,
        activeTab: data.prior_tab,
        selected_influencers: data.data.selected_influencers,
      };
    }
    case types.HANDLE_SAVE_CAMPAIGN_LOADING_FINISH: {
      return {
        ...state,
        save_campaign_loading: false,
      };
    }
    case types.HANDLE_PAYMENT_ERRORS: {
      return {
        ...state,
        save_campaign_loading: false,
        payment_errors: data.errors,
        activeTab: data.current_tab,
      };
    }
    case types.HANDLE_TASKS_ERRORS: {
      return {
        ...state,
        save_campaign_loading: false,
        tasks_errors: data.error,
        activeTab: data.current_tab,
      };
    }
    case types.HANDLE_TRANSACTION_ERRORS: {
      return {
        ...state,
        save_campaign_loading: false,
        transaction_errors: data.errors,
        activeTab: data.current_tab,
      };
    }
    case types.HANDLE_CAMPAIGN_FORM_DATA: {
      return {
        ...state,
        form: data,
      };
    }

    case types.HANDLE_CAMPAIGN_FORM_ERROR: {
      return {
        ...state,
        creation_errors: data,
      };
    }

    case types.HANDLE_ADD_INFLUENCER: {
      if (data.type === "analyzer") {
        if (data.status) {
          return {
            ...state,
            selected_analyzer_influencers: [
              ...state.selected_analyzer_influencers,
              data.influencer,
            ],
          };
        }
        return {
          ...state,
          selected_analyzer_influencers:
            state.selected_analyzer_influencers.filter(
              (el) => el.iq_user_id !== data.influencer.iq_user_id
            ),
        };
      } else if (data.type === "influential") {
        if (data.status) {
          return {
            ...state,
            selected_influential_influencers: [
              ...state.selected_influential_influencers,
              data.influencer,
            ],
          };
        }
        return {
          ...state,
          selected_influential_influencers:
            state.selected_influential_influencers.filter(
              (el) => el.user_id !== data.influencer.user_id
            ),
        };
      } else if (data.type === "mentions") {
        if (data.status) {
          return {
            ...state,
            selected_mentions_influencers: [
              ...state.selected_mentions_influencers,
              data.influencer,
            ],
          };
        }
        return {
          ...state,
          selected_mentions_influencers:
            state.selected_mentions_influencers.filter(
              (el) =>
                el.user_profile.user_id !== data.influencer.user_profile.user_id
            ),
        };
      } else {
        if (data.status) {
          return {
            ...state,
            selected_influencers: [
              ...state.selected_influencers,
              data.influencer,
            ],
            form: {
              ...state.form,
              selected_influencers: !data.flag
                ? [...state.form.selected_influencers, data.influencer]
                : [],
            },
          };
        }
        return {
          ...state,
          selected_influencers: state.selected_influencers.filter(
            (el) =>
              el.user_profile.user_id !== data.influencer.user_profile.user_id
          ),
          form: {
            ...state.form,
            selected_influencers: !data.flag
              ? state.selected_influencers.filter(
                  (el) =>
                    el.user_profile.user_id !==
                    data.influencer.user_profile.user_id
                )
              : [],
          },
        };
      }
    }
    case types.HANDLE_REMOVE_INFLUENCER: {
      if (data.type === "analyzer") {
        return {
          ...state,
          selected_analyzer_influencers:
            state.selected_analyzer_influencers.filter(
              (el) => el.user_id !== data.influencer.user_id
            ),
        };
      } else if (data.type === "influential") {
        return {
          ...state,
          selected_influential_influencers:
            state.selected_influential_influencers.filter(
              (el) => el.user_id !== data.influencer.user_id
            ),
        };
      } else {
        return {
          ...state,
          selected_influencers: state.selected_influencers.filter(
            (el) =>
              el.user_profile.user_id !== data.influencer.user_profile.user_id
          ),
          form: {
            ...state.form,
            selected_influencers: !data.flag
              ? state.selected_influencers.filter(
                  (el) =>
                    el.user_profile.user_id !==
                    data.influencer.user_profile.user_id
                )
              : [],
          },
        };
      }
    }
    case types.HANDLE_REMOVE_ALL_INFLUENCERS: {
      if (data.type === "analyzer") {
        return {
          ...state,
          selected_analyzer_influencers: [],
        };
      } else if (data.type === "influential") {
        return {
          ...state,
          selected_influential_influencers: [],
        };
      } else {
        return {
          ...state,
          selected_influencers: [],
          form: {
            ...state.form,
            selected_influencers: [],
          },
        };
      }
    }
    case types.HANDLE_CHANGE_TAB: {
      return {
        ...state,
        activeTab: data,
      };
    }
    case types.FETCH_GMAIL_SETTING_SUCCESS: {
      return {
        ...state,
        gmail_setting: data,
      };
    }
    case types.HANDLE_CLEAR_SELECTED_INFLUENCERS: {
      return {
        ...state,
        selected_influencers: [],
        selected_analyzer_influencers: [],
        selected_influential_influencers: [],
        creation_errors: {},
        form: {},
      };
    }

    case types.HANDLE_CREATE_CAMPAIGN_ERRORS: {
      return {
        ...state,
        save_campaign_loading: false,
        creation_errors: data.error,
        activeTab: data.current_tab,
      };
    }

    case types.SAVING_CAMPAIGN_TEMPLATE_PENDING: {
      return {
        ...state,
        templateSaving: true,
      };
    }
    case types.SAVING_CAMPAIGN_TEMPLATE_SUCCESS: {
      return {
        ...state,
        templateSaving: false,
      };
    }

    case types.ADD_SELECTED_INFLUENCERS: {
      let array = {};
      if (id === "analyzer") {
        array = {
          selected_analyzer_influencers: data,
        };
      } else if (id === "followers") {
        array = {
          selected_influential_influencers: data,
        };
      } else if (id === "mentions") {
        array = {
          selected_mentions_influencers: data,
        };
      } else {
        array = {
          selected_influencers: data,
        };
      }
      return {
        ...state,
        ...array,
      };
    }

    default: {
      return state;
    }
  }
};
