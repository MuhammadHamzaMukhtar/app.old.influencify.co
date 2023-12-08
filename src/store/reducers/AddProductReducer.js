import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_SELECT_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_PRODUCT_ADD_SUCCESS } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import {
	REST_RESPONSE_STATUS,
	HANDLE_CREDITS_ERRORS,
} from "../constants/action-types";

const initialState = {
	errorsObj: {},
	category: "",
	name: "",
	value: "",
	url: "",
	description: "",
	categories: [],
	selectedCategory: "",
	product_images: [],
	response_status: "",
	loading: false,
};

const AddProductReducer = (state = initialState, action) => {
	if (action.type === FETCH_CATEGORIES_SUCCESS) {
		return {
			...state,
			categories: action.payload,
		};
	} else if (action.type === HANDLE_CHANGE_SUCCESS) {
		return {
			...state,
			[action.payload.target.name]: action.payload.target.value,
		};
	} else if (action.type === HANDLE_SELECT_CHANGE_SUCCESS) {
		return {
			...state,
			selectedCategory: action.payload,
		};
	} else if (action.type === HANDLE_VALIDATION_ERRORS) {
		return {
			...state,
			errorsObj: action.payload,
			loading: false,
		};
	} else if (action.type === "ADD_PRODUCT_ON_DROP_FILE") {
		return {
			...state,
			product_images: action.payload,
		};
	} else if (action.type === "ADD_PRODUCT_ON_EMPTY_FILE"){
		return {
			...state,
			product_images: action.payload,
		};
	} else if (action.type === HANDLE_PRODUCT_ADD_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
			category: "",
			name: "",
			value: "",
			url: "",
			description: "",
			categories: [],
			selectedCategory: "",
			product_images: [],
			loading: false,
			errorsObj: {},
		};
	} else if (action.type === HANDLE_CREDITS_ERRORS) {
		return {
			...state,
			errorsObj: {},
			loading: false,
		};
	} else if (action.type === REST_RESPONSE_STATUS) {
		return {
			...state,
			response_status: "",
		};
	} else if (action.type === "HANDLE_PRODUCT_ADD_PENDING") {
		return {
			...state,
			loading: true,
		};
	}
	return state;
};

export default AddProductReducer;
