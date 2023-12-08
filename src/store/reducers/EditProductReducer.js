import { HANDLE_FETCH_OFFER_SUCCESS } from "../constants/action-types";
import { FETCH_CATEGORIES_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_SELECT_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_SELECT_VOUCHER_TYPE } from "../constants/action-types";
import { HANDLE_SELECT_VOUCHER_FORMATE } from "../constants/action-types";
import { HANDLE_PRODUCT_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_REMOVE_PRODUCT_SUCCESS } from "../constants/action-types";
import { HANDLE_RETIRE_PRODUCT_SUCCESS } from "../constants/action-types";
import { REST_RESPONSE_STATUS } from "../constants/action-types";
import { HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_CODE_VOUCHER_VALUE } from "../constants/action-types";
import { HANDLE_CHANGE_LINK_VOUCHER_VALUE } from "../constants/action-types";
import {
	HANDLE_REMOVE_RETIRE_PRODUCT_SUCCESS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_INFLUENCER_DISCOUNT_VALUE,
	HANDLE_INFLUENCER_TAB_VALUE,
	HANDLE_FOLLOWER_DISCOUNT_VALUE,
	HANDLE_SAVE_NAME_VALUE,
	HANDLE_AFFILIATE_COMMISSION_VALUE,
} from "../constants/action-types";

const initialState = {
	isLoading: false,
	imgLoading: false,
	errorsObj: {},
	name: "",
	original_name: "",
	status: "",
	value: "",
	url: "",
	offer_type: "",
	category: "",
	voucher_type: "",
	retire: "",
	code_num_of_vouchers: "",
	link_num_of_vouchers: "",
	format_of_voucher: "",
	description: "",
	categories: [],
	images: [],
	response_status: "",
	code_vouchers: [],
	code_voucher_dummy: [],
	link_vouchers: [],
	link_voucher_dummy: [],
	voucher_pdf_path: "",
	voucher_pdf_name: "",
	influencer_tab_value: 3,
	influencer_discount_value: 70,
	influencer_discount_code: "",
	is_discount_for_follower: true,
	follower_discount_value: 10,
	follower_discount_code: "",
	is_affiliate_commission: true,
	affiliate_commission_value: 10,
};

const EditProductReducer = (state = initialState, action) => {
	if (action.type === HANDLE_FETCH_OFFER_SUCCESS) {
		return {
			...state,
			name: action.payload.name,
			original_name: action.payload.name,
			status: action.payload.status,
			value: action.payload.value,
			url: action.payload.url,
			offer_type: action.payload.offer_type,
			code_num_of_vouchers: action.payload.code_num_of_vouchers,
			code_vouchers: action.payload.code_vouchers,
			link_num_of_vouchers: action.payload.link_num_of_vouchers,
			link_vouchers: action.payload.link_vouchers,
			voucher_type: action.payload.voucher_type,
			retire: action.payload.retire,
			format_of_voucher: action.payload.format_of_voucher,
			description: action.payload.description,
			category: action.payload.category,
			images: action.payload.images,
			voucher_pdf_path: action.payload.voucher_pdf_path,
			voucher_pdf_name: action.payload.voucher_pdf_name,
			influencer_tab_value: action.payload.influencer_tab_value,
			influencer_discount_value: action.payload.influencer_discount_value,
			influencer_discount_code: action.payload.influencer_discount_code,
			is_discount_for_follower: action.payload.is_discount_for_follower,
			follower_discount_value: action.payload.follower_discount_value,
			follower_discount_code: action.payload.follower_discount_code,
			is_affiliate_commission: action.payload.is_affiliate_commission,
			affiliate_commission_value: action.payload.affiliate_commission_value,
			errorsObj: {},
		};
	}
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
	} else if (action.type === HANDLE_SELECT_CHANGE_SUCCESS) {
		return {
			...state,
			category: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_VOUCHER_TYPE) {
		return {
			...state,
			voucher_type: action.payload,
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
	} else if (action.type === "EDIT_PRODUCT_ON_DROP_FILE") {
		return {
			...state,
			images: action.payload,
		};
	} else if (action.type === HANDLE_PRODUCT_UPDATE_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
			images: action.payload.data ?? state.images,
			errorsObj: {},
		};
	} else if (action.type === HANDLE_REMOVE_PRODUCT_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
		};
	} else if (action.type === HANDLE_RETIRE_PRODUCT_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
			retire: true,
			status: "inactive",
		};
	} else if (action.type === HANDLE_REMOVE_RETIRE_PRODUCT_SUCCESS) {
		return {
			...state,
			response_status: action.payload,
			retire: false,
			status: "Active",
		};
	} else if (action.type === REST_RESPONSE_STATUS) {
		return {
			...state,
			response_status: "",
		};
	} else if (action.type === AJAX_CALL_INIT) {
		if(action.payload){
			return {
				...state,
				imgLoading: true,
			};
		}
		return {
			...state,
			isLoading: true,
		};
	} else if (action.type === AJAX_CALL_FINSH) {
		return {
			...state,
			isLoading: false,
			imgLoading: false,
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
	} else if (action.type === HANDLE_SAVE_NAME_VALUE) {
		return {
			...state,
			original_name: action.payload,
		};
	} else if (action.type === HANDLE_AFFILIATE_COMMISSION_VALUE) {
		return {
			...state,
			affiliate_commission_value: action.payload,
		};
	}
	return state;
}

export default EditProductReducer;
