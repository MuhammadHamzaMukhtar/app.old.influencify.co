import * as type from "../actions/BrandLoginActions";
import {
  HANDLE_LOGIN_SUBMIT_FAIL,
  LOGIN_FINISH,
  LOGIN_INIT,
} from "../actions/BrandLoginActions";
import helper from "../../constants/helper";
// import axios from "axios";
import {
  FACEBOOK_LOGIN_BUTTON,
  HANDLE_BRAND_LOGIN_SUCCESS,
  HANDLE_INFLUENCER_LOGIN_SUCCESS,
  HANDLE_REMOVE_VALIDATION_ERRORS,
} from "../constants/action-types";
import Api from "@services/axios";
export const HANDLE_LOGOUT_SUBMIT = "HANDLE_LOGOUT_SUBMIT";

const initialState = {
  isError: false,
  verifyEmailError: false,
  deactivatedError: false,
  emailLoader: false,
  email: "",
  password: "",
  remember_me: false,
  captchaCode: "",
  facebookLoginButton: "",
  isLoading: false,
  errorsObj: {},
};

const LoginReducer = (state = initialState, action) => {
  if (action.type === type.HANDLE_LOGIN_CHANGE) {
    const name = action.payload.name;
    return {
      ...state,
      [name]: action.payload.value,
    };
  } else if (action.type === type.HANDLE_LOGIN_SUBMIT) {
    localStorage.setItem(helper.access_token, action.payload.access_token);
    localStorage.setItem(helper.token_type, action.payload.token_type);
    localStorage.setItem(helper.remember_me, action.payload.remember_me);
    localStorage.setItem("main_account", action.payload.main_account);
    localStorage.setItem(helper.isLogin, true);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("role", action.payload.role);
    if (action.payload.role === "brand") {
      window.location.href = "/dashboard";
    }

    if (action.payload.role === "influencer") {
      if (action.payload.from === "register") {
        window.location.href = "/influencer/setting-influencer-platforms";
      } else {
        window.location.href = "/influencer/dashboard";
      }
    }
    return {
      ...state,
    };
  } else if (action.type === "SHOPIFY_HANDLE_LOGIN_SUBMIT") {
    localStorage.setItem(helper.access_token, action.payload.access_token);
    localStorage.setItem(helper.token_type, action.payload.token_type);
    localStorage.setItem(helper.remember_me, action.payload.remember_me);
    localStorage.setItem("main_account", action.payload.main_account);
    localStorage.setItem(helper.isLogin, true);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("role", action.payload.role);
    return {
      ...state,
    };
  } else if (action.type === type.HANDLE_LOGOUT_SUBMIT) {
    //   axios.get(helper.url + "/api/v1/logout")
    Api.LogOut().then(res => {
      if (localStorage.role === "brand") {
        window.location.href = "/brand/login";
      }
      if (localStorage.role === "influencer") {
        window.location.href = process.env.REACT_APP_LANDING_URL;
      }
      localStorage.removeItem(helper.access_token);
      localStorage.removeItem(helper.token_type);
      localStorage.removeItem(helper.isLogin);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      
    });
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === HANDLE_LOGIN_SUBMIT_FAIL) {
    let error = action.payload.response.data.error;
    if (error === "Unauthorized") {
      return {
        ...state,
        isError: true,
        verifyEmailError: false,
        deactivatedError: false,
        errorsObj: {},
      };
    }
    if (error === "verifyEmailError") {
      return {
        ...state,
        verifyEmailError: true,
        isError: false,
        deactivatedError: false,
        errorsObj: {},
      };
    }
    if (error === "deactivatedError") {
      return {
        ...state,
        deactivatedError: true,
        isError: false,
        verifyEmailError: false,
        errorsObj: {},
      };
    }
  } else if (action.type === FACEBOOK_LOGIN_BUTTON) {
    localStorage.setItem(helper.access_token, action.payload.access_token);
    localStorage.setItem(helper.token_type, action.payload.token_type);
    localStorage.setItem(helper.remember_me, action.payload.remember_me);
    localStorage.setItem(helper.isLogin, true);
    localStorage.setItem("main_account", action.payload.main_account);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("role", action.payload.role);
    if (action.payload.role === "brand") {
      window.location.href = "/dashboard";
    }
    if (action.payload.role === "influencer") {
      window.location.href = "/influencer/dashboard";
    }
    return {
      ...state,
      facebookLoginButton: action.payload,
    };
  } else if (action.type === HANDLE_BRAND_LOGIN_SUCCESS) {
    localStorage.setItem(helper.access_token, action.payload.access_token);
    localStorage.setItem(helper.token_type, action.payload.token_type);
    localStorage.setItem(helper.remember_me, action.payload.remember_me);
    localStorage.setItem(helper.isLogin, true);
    localStorage.setItem("main_account", action.payload.main_account);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
    localStorage.setItem("role", action.payload.role);
    window.location.href = "/dashboard";
  } else if (action.type === HANDLE_INFLUENCER_LOGIN_SUCCESS) {
    localStorage.setItem(helper.access_token, action.payload.data.access_token);
    localStorage.setItem(helper.token_type, action.payload.data.token_type);
    localStorage.setItem(helper.remember_me, action.payload.data.remember_me);
    localStorage.setItem(helper.isLogin, true);
    localStorage.setItem("main_account", action.payload.data.main_account);
    localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    localStorage.setItem("role", action.payload.data.role);
    if (action.payload.redirectUrl) {
      window.location.href = action.payload.redirectUrl;
    } else {
      window.location.href = "/influencer/dashboard";
    }
    return {
      ...state,
    };
    
  } else if (action.type === "BRAND_LOGIN_HANDLE_VALIDATION_ERRORS") {
    return {
      ...state,
      errorsObj: action.payload,
      isError: true
    };
  } else if (action.type === "BRAND_EMAIL_INIT") {
    return {
      ...state,
      emailLoader: true,
    };
  } else if (action.type === "BRAND_EMAIL_FINISH") {
    return {
      ...state,
      emailLoader: false,
      errorsObj: {}
    };
  } else if (action.type === "BRAND_LOGIN_HANDLE_VALIDATION_ERRORS_CLEAR") {
    return {
      ...state,
      errorMessages: {},
      errorsObj: {},
      isError: false
    };
  } else if (action.type === LOGIN_INIT) {
    return {
      ...state,
      isError: false,
      verifyEmailError: false,
      deactivatedError: false,
      isLoading: true,
    };
  } else if (action.type === LOGIN_FINISH) {
    return {
      ...state,
      isLoading: false,
    };
  } else {
    return state;
  }
}

export default LoginReducer;
