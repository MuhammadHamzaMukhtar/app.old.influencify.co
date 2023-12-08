// import * as productsActions from "../actions/ProductsActions";
import { FETCH_PRODUCTS_SUCCESS } from "../constants/action-types";
import { HANDLE_FETCH_ALL_PRODUCTSS_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";

const initialState = {
    products 		: [],
    meta:{},
    retire_as_well 	: false
};

const ProductsReducer = (state = initialState, action) => {
    if (action.type === FETCH_PRODUCTS_SUCCESS) {
        return {
            ...state,
            products: action.payload?.data,
            meta: action.payload?.meta,
        };
    }
    else if (action.type === HANDLE_FETCH_ALL_PRODUCTSS_SUCCESS) {

        return {
            ...state,
            products: action.payload?.data,
            meta: action.payload?.meta,
        };
    }
    else if(action.type === HANDLE_CHANGE_SUCCESS) {
    	return {
            ...state,
            [action.payload.target.name]: action.payload.target.type === "checkbox" ? action.payload.target.checked : action.payload.target.value
        };
    }
    return state;
}

export default ProductsReducer;