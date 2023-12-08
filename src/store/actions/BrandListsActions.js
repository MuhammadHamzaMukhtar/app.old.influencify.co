import helper from "../../constants/helper";
// import axios from "axios";

import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  AJAX_CALL_LIST_INIT,
  AJAX_CALL_LIST_FINISH,
  BRAND_LISTS_SUCCESS,
  BRAND_LISTS_FAILURE,
  ADD_NEW_LIST_SUCCESS,
  ADD_NEW_LIST_FAILURE,
  HANDLE_LIST_VALIDATION_ERRORS,
  ADD_INFLUENCER_TO_LIST_SUCCESS,
  ADD_INFLUENCER_TO_LIST_FAILURE,
  INVALID_BODY_PARAMS,
  BRAND_INSTAGRAM_LIST_VIEW_SUCCESS,
  BRAND_INSTAGRAM_LIST_VIEW_FAILURE,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const fetchBrandLists = (PaginationUrl, query) => dispatch => {
  let pageUrl = helper.url + "/api/v1/listAjax";
  if (PaginationUrl) {
    pageUrl = PaginationUrl;
  }
  dispatch({
    type: AJAX_CALL_LIST_INIT,
  });
  // axios
  //   .post(pageUrl, query)
  Api.FetchBrandLists(pageUrl, query)
    .then(res => {
      dispatch({
        type: BRAND_LISTS_SUCCESS,
        payload: res.data.data,
        makePagination: {
          links: res.data.links,
          meta: res.data.meta,
        },
      });
      dispatch({
        type: AJAX_CALL_LIST_FINISH,
      });
    })
    .catch(error => {
      dispatch({
        type: BRAND_LISTS_FAILURE,
      });
    });
};

export const addNewList = query => dispatch => {
  Api.NewList(query)
    // axios.post(helper.url + '/api/v1/list/store', query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_LIST_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
      } else {
        dispatch({
          type: ADD_NEW_LIST_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ADD_NEW_LIST_FAILURE,
      });
    });
};

export const addInfluencer = query => dispatch => {
  //   axios
  //     .post(helper.url + "/api/v1/list/add/influencer", query)
  Api.AddInfluencer(query)
    .then(res => {
      if (res.data.code === "already_exist") {
        toast.warning("This influencer already exist in the list");
      } else if (res.data.code === "handle_not_found") {
        toast.warning("This influencer is not found");
      } else if (res.data.code === "NoEmailExist") {
        toast.warning("This influencer does not have an email");
      } else if (res.data.code === "NoCreditsExist") {
        toast.warning("Credits does not exist");
      } else {
        dispatch({
          type: ADD_INFLUENCER_TO_LIST_SUCCESS,
          payload: res.data,
        });
        toast.success("This influencer has been added to list successfully!");
      }
    })
    .catch(error => {
      dispatch({
        type: ADD_INFLUENCER_TO_LIST_FAILURE,
      });
    });
};

export const fetchBrandInstagramListInfluencers = (Url, query) => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //   axios
  //     .post(helper.url + "/api/v1/brand/instagram/list/view", query)
  Api.FetchBrandInstagramListInfluencers(query)
    .then(res => {
      if (res.data.error === true && res.data.code === "not_found_list") {
        toast.warning("List is not found!");
        window.location.href = "/brand/lists";
      }
      if (res.data.error === true && res.data.code === "invalid_body_params") {
        dispatch({
          type: INVALID_BODY_PARAMS,
          list: res.data.list,
        });
      } else {
        dispatch({
          type: BRAND_INSTAGRAM_LIST_VIEW_SUCCESS,
          payload: res.data.data,
          reportInfo: res.data.reportInfo,
          list: res.data.list,
          overlappingAudience: res.data.overlappingAudience,
          uniqueAudience: res.data.uniqueAudience,
        });
      }
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: BRAND_INSTAGRAM_LIST_VIEW_FAILURE,
      });
    });
};
