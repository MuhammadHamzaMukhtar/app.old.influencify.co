import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_SELECT_VOUCHER_TYPE } from "../constants/action-types";
import { HANDLE_SELECT_OFFER_CATEGORY_SUCCESS } from "../constants/action-types";
import { HANDLE_SELECT_VOUCHER_FORMATE } from "../constants/action-types";
import { HANDLE_VOUCHER_ADD_SUCCESS } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { REST_RESPONSE_STATUS } from "../constants/action-types";
import { HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_CODE_VOUCHER_VALUE } from "../constants/action-types";
import { HANDLE_CHANGE_LINK_VOUCHER_VALUE } from "../constants/action-types";
import {
	HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_CREDITS_ERRORS,
	HANDLE_INFLUENCER_DISCOUNT_VALUE,
	HANDLE_INFLUENCER_TAB_VALUE,
	HANDLE_FOLLOWER_DISCOUNT_VALUE,
	HANDLE_SAVE_NAME_VALUE,
	HANDLE_AFFILIATE_COMMISSION_VALUE,
} from "../constants/action-types";

const initialState = {
	errorsObj: {},
	categories: [],
	voucher_type: "gift",
	name: "",
	original_name: "",
	isLoading: false,
	format_of_voucher: "code",
	code_num_of_vouchers: "",
	link_num_of_vouchers: "",
	voucher_pdf: "",
	selectedCategory: "",
	value: "",
	description: "",
	voucher_images: [],
	response_status: "",
	code_vouchers: [],
	code_voucher_dummy: [],
	link_vouchers: [],
	link_voucher_dummy: [],
	influencer_tab_value: 3,
	influencer_discount_value: 70,
	influencer_discount_code: "",
	url: "",
	is_discount_for_follower: false,
	follower_discount_value: 10,
	follower_discount_code: "",
	is_affiliate_commission: false,
	affiliate_commission_value: 10,
};

const AddVoucherReducer = (state = initialState, action) => {
	if (action.type === FETCH_CATEGORIES_SUCCESS) {
		return {
			...state,
			categories: action.payload,
		};
	} else if (action.type === HANDLE_CHANGE_SUCCESS) {
		return {
			...state,
			[action.payload.target.name]:
				action.payload.target.type === "checkbox"
					? action.payload.target.checked
					: action.payload.target.value,
		};
	} else if (action.type === "HANDLE_CLEAR_VOUCHER") {
		return {
			...state,
			response_status: action.payload,
			code_vouchers: [],
			voucher_type: "gift",
			name: "",
			original_name: "",
			isLoading: false,
			format_of_voucher: "code",
			code_num_of_vouchers: "",
			link_num_of_vouchers: "",
			voucher_pdf: "",
			selectedCategory: "",
			value: "",
			description: "",
			voucher_images: [],
			code_voucher_dummy: [],
			link_vouchers: [],
			link_voucher_dummy: [],
			influencer_tab_value: 3,
			influencer_discount_value: 70,
			influencer_discount_code: "",
			url: "",
			is_discount_for_follower: false,
			follower_discount_value: 10,
			follower_discount_code: "",
			is_affiliate_commission: false,
			affiliate_commission_value: 10,
			errorsObj: {},
		};
	} else if (action.type === HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS) {
		let new_array = [];
		let code_num_of_vouchers = action.payload.target.value;
		for (var i = 0; i < code_num_of_vouchers; i++) {
			new_array.push("");
		}
		return {
			...state,
			code_num_of_vouchers: action.payload.target.value,
			code_vouchers: new_array,
		};
	} else if (action.type === HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS) {
		let new_array = [];
		let link_num_of_vouchers = action.payload.target.value;
		for (var j = 0; j < link_num_of_vouchers; j++) {
			new_array.push("");
		}
		return {
			...state,
			link_num_of_vouchers: action.payload.target.value,
			link_vouchers: new_array,
		};
	} else if (action.type === HANDLE_CHANGE_CODE_VOUCHER_VALUE) {
		return {
			...state,
			code_voucher_dummy: (state.code_vouchers[action.index] =
				action.payload.target.value),
		};
	} else if (action.type === HANDLE_CHANGE_LINK_VOUCHER_VALUE) {
		return {
			...state,
			link_voucher_dummy: (state.link_vouchers[action.index] =
				action.payload.target.value),
		};
	} else if (action.type === HANDLE_SELECT_VOUCHER_TYPE) {
		return {
			...state,
			voucher_type: action.payload,
		};
	} else if (action.type === HANDLE_SAVE_NAME_VALUE) {
		return {
			...state,
			original_name: action.payload,
		};
	} else if (action.type === HANDLE_INFLUENCER_TAB_VALUE) {
		let value = 0;
		if (action.payload === 0) {
			value = 70;
		}
		if (action.payload === 1) {
			value = 85;
		}
		if (action.payload === 2) {
			value = 100;
		}
		if (action.payload === 3) {
			value = 70;
		}
		return {
			...state,
			influencer_tab_value: action.payload,
			influencer_discount_value: value,
		};
	} else if (action.type === HANDLE_INFLUENCER_DISCOUNT_VALUE) {
		return {
			...state,
			influencer_discount_value: action.payload,
		};
	} else if (action.type === HANDLE_FOLLOWER_DISCOUNT_VALUE) {
		return {
			...state,
			follower_discount_value: action.payload,
		};
	} else if (action.type === HANDLE_AFFILIATE_COMMISSION_VALUE) {
		return {
			...state,
			affiliate_commission_value: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_OFFER_CATEGORY_SUCCESS) {
		return {
			...state,
			selectedCategory: action.payload.value,
		};
	} else if (action.type === HANDLE_SELECT_VOUCHER_FORMATE) {
		return {
			...state,
			format_of_voucher: action.payload,
		};
	} else if (action.type === HANDLE_VALIDATION_ERRORS) {
		return {
			...state,
			errorsObj: action.payload,
		};
	} else if (action.type === "ADD_VOUCHER_ON_DROP_FILE") {
		return {
			...state,
			voucher_images: action.payload,
		};
	} else if (action.type === HANDLE_VOUCHER_ADD_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
			voucher_type: "gift",
			name: "",
			original_name: "",
			isLoading: false,
			format_of_voucher: "code",
			code_num_of_vouchers: "",
			link_num_of_vouchers: "",
			voucher_pdf: "",
			selectedCategory: "",
			value: "",
			description: "",
			voucher_images: [],
			code_vouchers: [],
			code_voucher_dummy: [],
			link_vouchers: [],
			link_voucher_dummy: [],
			influencer_tab_value: 3,
			influencer_discount_value: 70,
			influencer_discount_code: "",
			url: "",
			is_discount_for_follower: false,
			follower_discount_value: 10,
			follower_discount_code: "",
			is_affiliate_commission: false,
			affiliate_commission_value: 10,
			errorsObj: {},
		};
	} else if (action.type === REST_RESPONSE_STATUS) {
		return {
			...state,
			response_status: "",
		};
	} else if (action.type === HANDLE_CREDITS_ERRORS) {
		return {
			...state,
			errorsObj: {},
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
	}

	return state;
};

export default AddVoucherReducer;
