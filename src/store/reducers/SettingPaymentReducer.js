import { HANDLE_FETCH_CREDIT_CARDS_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_ADD_CREDIT_CARD_SUCCESS } from "../constants/action-types";
import { HANDLE_REMOVE_CREDIT_CARD_SUCCESS } from "../constants/action-types";
import { HANDLE_UPDATE_BILLING_ADDRESS_SUCCESS } from "../constants/action-types";
import { 
    AJAX_CALL_INIT, 
    AJAX_CALL_FINSH ,
    HANDLE_CHANGE_CONNECT_BANK_SUCCESS,
    FETCH_COUNTRIES_SUCCESS,
    HANDLE_SELECT_BANK_COUNTRY_SUCCESS,
    HANDLE_SELECT_CHANGE_SUCCESS,
    HANDLE_ADD_BANK_ACCOUNT_SUCCESS,
    FETCH_CURRENCIES_SUCCESS,
    HANDLE_SELECT_CURRENCY_SUCCESS,
    USER_ATTACHED_ACCOUNTS_SUCCESS 
} from "../constants/action-types";

const initialState = {
    'errorsObj'             : {},
    'card_holder_name'      : '',
    'card_number'           : '',
    'card_expiry_month'     : '',
    'card_expiry_year'      : '',
    'card_cvv'              : '',
    'card_type'             : '',
    'card_preview'          : '',
    'invoice_flag'          : false,
    'billing_name'          : '',
    'billing_vat_id'        : '',
    'billing_email'         : '',
    'billing_address'       : '',
    'billing_city'          : '',
    'billing_state'         : '',
    'billing_country'       : '',
    'billing_zip_code'      : '',
    'split_bills_flag'      : '',
    'cards'                 : [],
    'response_status'       : '',
    'isLoading'             : false,

    'countries'             : [],
    'currencies'            : [],
    'accountCurrency'       : '',
    'accountNumber'         : '',
    'swiftCode'             : '',
    'accountHolderName'     : '',
    'accountCity'           : '',
    'accountZipCode'        : '',
    'bankCountry'           : '',
    'accountCountry'        : '',
    'bankAccountAdded'      : false,
    'userAccount'           : {},
    'activePaymentGateway': '',
    'defaultPaymentMethod':{}


}

const SettingPaymentReducer = (state = initialState, action) => {
    if (action.type === HANDLE_FETCH_CREDIT_CARDS_SUCCESS) {
        return {
            ...state,
            cards                   : action.payload.cards,
            activePaymentGateway    : action.payload.activePaymentGateway,
            defaultPaymentMethod    : action.payload.defaultPaymentMethod,
        };
    }
    else if(action.type === HANDLE_CHANGE_SUCCESS) {
    	return {
            ...state,
            [action.payload.target.name]: action.payload.target.type === "checkbox" ? action.payload.target.checked : action.payload.target.value
        };
    }
    else if(action.type === HANDLE_VALIDATION_ERRORS) {
    	return {
            ...state,
            errorsObj : action.payload
        };
    }
    else if(action.type === HANDLE_ADD_CREDIT_CARD_SUCCESS) {
    	return {
            ...state,
            response_status : action.payload,
            errorsObj       : {}
        };
    }
    else if(action.type === HANDLE_REMOVE_CREDIT_CARD_SUCCESS) {
        return {
            ...state,
            response_status : action.payload,
            card_holder_name: "",
            card_number: "",
            card_expiry_month: "",
            card_expiry_year: "",
            card_cvv: "",
            errorsObj       : {}
        };
    }
    else if(action.type === HANDLE_UPDATE_BILLING_ADDRESS_SUCCESS) {
        return {
            ...state,
            response_status : action.payload,
            errorsObj       : {}
        };
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    else if(action.type === HANDLE_CHANGE_CONNECT_BANK_SUCCESS) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.type === "checkbox" ? action.payload.target.checked : action.payload.target.value
        };
    }
    if (action.type === FETCH_COUNTRIES_SUCCESS) {
        return {
            ...state,
            countries: action.payload
        };
    }
    if (action.type === FETCH_CURRENCIES_SUCCESS) {
        return {
            ...state,
            currencies: action.payload
        };
    }
    else if(action.type === HANDLE_SELECT_CHANGE_SUCCESS) {
        return {
            ...state,
            accountCountry : action.payload
        };
    }
    else if(action.type === HANDLE_SELECT_BANK_COUNTRY_SUCCESS) {
        return {
            ...state,
            bankCountry : action.payload
        };
    }
    else if(action.type === HANDLE_SELECT_CURRENCY_SUCCESS) {
        return {
            ...state,
            accountCurrency : action.payload
        };
    }
    else if(action.type === HANDLE_ADD_BANK_ACCOUNT_SUCCESS) {
        return {
            ...state,
            bankAccountAdded : (action.payload === 'success' ? true : false),
            errorsObj        : {}
        };
    }
    else if(action.type === USER_ATTACHED_ACCOUNTS_SUCCESS) {
        return {
            ...state,
            userAccount : action.payload
        };
    }
    return state;
}

export default SettingPaymentReducer;