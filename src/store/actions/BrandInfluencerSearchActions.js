import Api from "@services/axios";
// import axios from "axios";
import helper from "../../constants/helper";
import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_LANGS_SUCCESS,
  FETCH_LANGS_FAILURE,
  FETCH_INFLUENCERS_FAILURE,
  FETCH_INFLUENCERS_SUCCESS,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  FETCH_PLATFORMS_SUCCESS,
  FETCH_PLATFORMS_FAILURE,
  NO_CREDITS_EXIST,
} from "../constants/action-types";
import { refreshReports } from "./HeaderActions";

export const fetchInfluencers = (PaginationUrl, query) => dispatch => {
  let pageUrl = helper.url + "/api/v1/fetch-influencers";
  if (PaginationUrl) {
    const url = PaginationUrl.substr(1);
    pageUrl = helper.url + "/api/v1/fetch-influencers" + url;
  }
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios
  //   .post(pageUrl, query)
  Api.FetchInfluencers(pageUrl, query)
    .then(res => {
      if (res.data.code === "NoCreditsExist") {
        dispatch({
          type: NO_CREDITS_EXIST,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      } else {
        dispatch({
          type: FETCH_INFLUENCERS_SUCCESS,
          payload: {
            influencers: res.data.influencers,
            modashTotal: res.data.total,
            directProfiles: res.data.directProfiles,
          },
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
      }
      dispatch(refreshReports());
    })
    .catch(error => {
      dispatch({
        type: FETCH_INFLUENCERS_FAILURE,
        payload: error,
      });
    });
};

export const fetchPlatFroms = () => dispatch => {
  // axios
  //   .get(helper.url + "/api/v1/fetch-platforms")
  Api.FetchPlatFroms()
    .then(res => {
      dispatch({
        type: FETCH_PLATFORMS_SUCCESS,
        payload: res.data.platforms,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_PLATFORMS_FAILURE,
        payload: error,
      });
    });
};

export const fetchUserCategories = () => dispatch => {
  // axios.get(helper.url + '/api/v1/fetch-user-categories')
  Api.FetchUserCategories()
    .then(res => {
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: res.data.categoires,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error,
      });
    });
};

export const fetchCountries = () => dispatch => {
  //   axios
  //     .get(helper.url + "/api/v1/fetch-countries")
  Api.FetchCountries()
    .then(res => {
      dispatch({
        type: FETCH_COUNTRIES_SUCCESS,
        payload: res.data.countries,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_COUNTRIES_FAILURE,
        payload: error,
      });
    });
};

export const fetchLanguages = () => dispatch => {
  //   axios
  //     .get(helper.url + "/api/v1/fetch-langs")
  Api.FetchLanguages()
    .then(res => {
      dispatch({
        type: FETCH_LANGS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_LANGS_FAILURE,
        payload: error,
      });
    });
};
