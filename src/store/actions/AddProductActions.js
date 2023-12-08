// import axios from 'axios';
import helper from "../../constants/helper";
import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { FETCH_CATEGORIES_FAILURE } from "../constants/action-types";
import { HANDLE_PRODUCT_ADD_SUCCESS } from "../constants/action-types";
import { HANDLE_PRODUCT_ADD_FAILURE } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_CREDITS_ERRORS } from "../constants/action-types";
import { refreshReports } from "./HeaderActions";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const fetchCategories = () => dispatch => {
  Api.categoryFetch()
    // axios.get(helper.url + '/api/v1/fetch-user-categories')
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

export const handleProductAdd = (query, ownProps) => dispatch => {
  dispatch({ type: "HANDLE_PRODUCT_ADD_PENDING" });
  Api.productAddHandle(query)
    // axios.post(helper.url+'/api/v1/add-product' , query)
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: HANDLE_CREDITS_ERRORS,
        });
        toast.error(helper.productcreditMsg);
      } else if (res.data.errors) {
        if (res.data.errors.limit) {
          toast.error(res.data.errors.limit);
        }
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
      } else {
        dispatch({
          type: HANDLE_PRODUCT_ADD_SUCCESS,
          payload: res,
        });
        dispatch(refreshReports());
        ownProps.Navigate("/products");
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_PRODUCT_ADD_FAILURE,
        payload: error,
      });
    });
};
