import helper from "../../constants/helper";

import {
  HANDLE_VALIDATION_ERRORS,
  HANDLE_REMOVE_VALIDATION_ERRORS,
  HANDLE_CHANGE_SUCCESS,
  HANDLE_REGISTER_SUBMIT_SUCEESS,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  DATE_CHANGE_HANDLER,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_USER_CATEGORIES_SUCCESS,
  HANDLE_CATEGORY_SELECT_SUCCESS,
  HANDLE_INFLUENCER_REGISTRATION_FINSH_SUCCESS,
  HANDLE_REGISTER_INIVTED_INFLUENCER_SUCEESS,
  HANDLE_RESET_TOKEN_SUCCESS,
  HANDLE_SELECT_COUNTRY_SUCCESS,
  HANDLE_SELECT_STATE_SUCCESS,
  HANDLE_SELECT_CITY_SUCCESS,
  HANDLE_SELECT_TIMEZONE_SUCCESS,
  FETCH_PLAN_SUMMARY_SUCCESS,
  HANDLE_CHANGE_COUPON_SUCCESS,
  HANDLE_REGISTER_BRAND_SUBMIT_SUCEESS,
  HANDLE_APPLY_COUPON_SUCEESS,
  HANDLE_REGISTER_SUCCESS,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  first_name: "",
  last_name: "",
  name: "",
  errorsObj: {},
  isError: false,
  sentVerifyEmail: false,
  displayName: "",
  email: "",
  password: "",
  brand_name: "",
  invitation_id: null,
  termOfUse: false,
  privacyPolicy: false,
  userName: "",
  address: "",
  dateOfBirth: new Date(),
  gender: "",
  phoneNumber: "",
  countries: [],
  selectedCountry: "",
  state: "",
  city: "",
  timeZone: "",
  userCategories: [],
  selectedCategories: [],
  errorMessages: [],
  followersLimitError: "",
  planName: "",
  planPrice: 0,
  planinterval: "",
  plantotal: 0,
  subTotal: 0,
  discount: 0,
  total: 0,
  couponCode: "",
  planType: "",
  fee_type: "product-and-cash",
  product_value: 0,
  story_fee: 0,
  post_fee: 0,
  plan: {},
  lock: false,
};

const RegisterReducer = (state = initialState, action) => {
  if (action.type === HANDLE_CHANGE_SUCCESS) {
    return {
      ...state,
      sentVerifyEmail: false,
      [action.payload.target.name]:
        action.payload.target.type === "checkbox"
          ? action.payload.target.checked
          : action.payload.target.value,
    };
  } else if (action.type === HANDLE_CHANGE_COUPON_SUCCESS) {
    return {
      ...state,
      couponCode: action.payload.target.value,
    };
  } else if (action.type === "HANDLE_BULK_SUCCESS") {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === HANDLE_REGISTER_BRAND_SUBMIT_SUCEESS) {
    if (action.payload.success === true) {
      return {
        ...state,
        ...initialState,
        sentVerifyEmail: true,
        first_name: action.payload.user.first_name,
        email: action.payload.user.email,
      };
    } else {
      return {
        ...state,
        errorsObj: {},
        displayName: "",
        email: "",
        password: "",
      };
    }
  } else if (action.type === HANDLE_REGISTER_SUBMIT_SUCEESS) {
    if (action.payload === "success") {
      return {
        ...state,
        // sentVerifyEmail: true,
        displayName: "",
        email: "",
        password: "",
        errorsObj: {},
      };
    } else {
      return {
        ...state,
        errorsObj: {},
        displayName: "",
        email: "",
        password: "",
      };
    }
  } else if (action.type === HANDLE_INFLUENCER_REGISTRATION_FINSH_SUCCESS) {
    if (action.payload === "success") {
      // window.location.replace("/account-created");
      return {
        ...state,
        sentVerifyEmail: true,
        displayName: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        termOfUse: false,
        privacyPolicy: false,
        userName: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: new Date(),
        selectedCountry: "",
        state: "",
        city: "",
        timeZone: "",
        address: "",
        selectedCategories: [],
        errorsObj: {},
        isLoading: false,
        isError: false,
      };
    } else {
      return {
        ...state,
        errorsObj: {},
        displayName: "",
        email: "",
        password: "",
      };
    }
  } else if (action.type === HANDLE_VALIDATION_ERRORS) {
    return {
      ...state,
      errorsObj: action.payload,
      errorMessages: action.payload,
    };
  } else if (action.type === HANDLE_REMOVE_VALIDATION_ERRORS) {
    return {
      ...state,
      errorsObj: {},
      errorMessages: {},
    };
  } else if (action.type === FETCH_PLAN_SUMMARY_SUCCESS) {
    return {
      ...state,
      planName: action.payload.planName,
      planPrice: action.payload.planPrice,
      planinterval: action.payload.planinterval,
      plantotal: action.payload.plantotal,
      subTotal: action.payload.subTotal,
      discount: action.payload.discount,
      total: action.payload.total,
      plan: action.payload,
    };
  } else if (action.type === DATE_CHANGE_HANDLER) {
    return {
      ...state,
      dateOfBirth: action.value,
    };
  } else if (action.type === FETCH_COUNTRIES_SUCCESS) {
    return {
      ...state,
      countries: action.payload,
    };
  } else if (action.type === FETCH_USER_CATEGORIES_SUCCESS) {
    return {
      ...state,
      userCategories: action.payload,
    };
  } else if (action.type === HANDLE_SELECT_COUNTRY_SUCCESS) {
    return {
      ...state,
      selectedCountry: action.payload,
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
  } else if (action.type === HANDLE_CATEGORY_SELECT_SUCCESS) {
    return {
      ...state,
      selectedCategories: action.payload,
    };
  } else if (action.type === HANDLE_RESET_TOKEN_SUCCESS) {
    localStorage.removeItem(helper.isLogin);
    localStorage.removeItem(helper.access_token);
    localStorage.removeItem(helper.token_type);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    return {
      ...state,
    };
  } else if (action.type === HANDLE_REGISTER_INIVTED_INFLUENCER_SUCEESS) {
    if (action.payload.campaignId) {
      localStorage.setItem(helper.access_token, action.payload.access_token);
      localStorage.setItem(helper.token_type, action.payload.token_type);
      localStorage.setItem(helper.isLogin, true);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("role", action.payload.role);
      window.location.href =
        "/influencer/influencer-booking/" + action.payload.campaignId;
    } else {
      window.location.href = "/";
    }
    return {
      ...state,
    };
  } else if (action.type === HANDLE_APPLY_COUPON_SUCEESS) {
    return {
      ...state,
      planName: action.payload.planName,
      planPrice: action.payload.planPrice,
      planinterval: action.payload.planinterval,
      plantotal: action.payload.plantotal,
      subTotal: action.payload.subTotal,
      discount: action.payload.discount,
      total: action.payload.total,
      plan: action.payload,
    };
  } else if (action.type === AJAX_CALL_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === AJAX_CALL_FINSH) {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === HANDLE_REGISTER_SUCCESS) {
    return initialState;
  } else {
    return state;
  }
};

export default RegisterReducer;
