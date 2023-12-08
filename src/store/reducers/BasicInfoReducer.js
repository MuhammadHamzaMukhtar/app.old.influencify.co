import { HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS } from "../constants/action-types";
import { HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDEL_ACTIVE_MODAL_SHOW } from "../constants/action-types";
import { HANDLE_ON_DROP_FILE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_UPDATE_PROFILE_SUCCESS } from "../constants/action-types";
import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_ON_DROP_INFLUENCER_FILE,
  HANDLE_SELECT_COUNTRY_SUCCESS,
  HANDLE_SELECT_STATE_SUCCESS,
  HANDLE_SELECT_CITY_SUCCESS,
  HANDLE_SELECT_TIMEZONE_SUCCESS,
  HANDLE_SELECT_CURRENCY_SUCCESS,
} from "../constants/action-types";

const initialState = {
  errorsObj: {},
  ActivateModalShow: false,
  name: "",
  city: "",
  email: "",
  country: "",
  state: "",
  timeZone: "",
  currency: {},
  website: "",
  user_description: "",
  profile_pic: "",
  avatar: "",
  review_visible: false,
  response_status: "",
  isLoading: false,
  is_currency_set: false,
};

const BasicInfoReducer = (state = initialState, action) => {
  if (action.type === HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS) {
    return {
      ...state,
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      name: action.payload.name,
      email: action.payload.email,
      country: action.payload.country,
      state: action.payload.state,
      city: action.payload.city,
      timeZone: action.payload.time_zone,
      currency: action.payload.currency,
      is_currency_set: action.payload.is_currency_set,
      website: action.payload.website,
      user_description: action.payload.user_description,
      profile_pic: action.payload.profile_pic,
      avatar: action.payload.avatar,
    };
  }
  if (action.type === HANDEL_INFLUENCER_BASIC_INFO_SETTIGNS_SUCCESS) {
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      country: action.payload.country,
      state: action.payload.state,
      city: action.payload.city,
      timeZone: action.payload.time_zone,
      currency: action.payload.currency,
      is_currency_set: action.payload.is_currency_set,
      website: action.payload.website,
      user_description: action.payload.user_description,
      profile_pic: action.payload.profile_pic,
    };
  } else if (action.type === HANDLE_CHANGE_SUCCESS) {
    return {
      ...state,
      [action.payload.target.name]:
        action.payload.target.type === "checkbox"
          ? action.payload.target.checked
          : action.payload.target.value,
    };
  } else if (action.type === HANDEL_ACTIVE_MODAL_SHOW) {
    return {
      ...state,
      ActivateModalShow: action.payload,
    };
  } else if (action.type === HANDLE_VALIDATION_ERRORS) {
    return {
      ...state,
      errorsObj: action.payload,
    };
  } else if (action.type === HANDLE_ON_DROP_FILE) {
    return {
      ...state,
      avatar: action.payload,
    };
  } else if (action.type === HANDLE_ON_DROP_INFLUENCER_FILE) {
    return {
      ...state,
      profile_pic: action.payload,
    };
  } else if (action.type === HANDLE_UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      response_status: action.payload,
      errorsObj: {},
    };
  } else if (action.type === AJAX_CALL_INIT) {
    return {
      ...state,
      isLoading: true,
      errorsObj: {},
    };
  } else if (action.type === AJAX_CALL_FINSH) {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === HANDLE_SELECT_COUNTRY_SUCCESS) {
    return {
      ...state,
      country: action.payload,
      state: "",
      city: "",
      timeZone: "",
    };
  } else if (action.type === HANDLE_SELECT_STATE_SUCCESS) {
    return {
      ...state,
      state: action.payload,
      city: "",
    };
  } else if (action.type === HANDLE_SELECT_CITY_SUCCESS) {
    return {
      ...state,
      city: action.payload,
    };
  } else if (action.type === HANDLE_SELECT_TIMEZONE_SUCCESS) {
    return {
      ...state,
      timeZone: action.payload,
    };
  } else if (action.type === HANDLE_SELECT_CURRENCY_SUCCESS) {
    return {
      ...state,
      currency: action.payload,
    };
  }
  return state;
};

export default BasicInfoReducer;
