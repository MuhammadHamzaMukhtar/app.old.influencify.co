import { HANDLE_ACCOUNT_SETTING_SUCCESS } from "../constants/action-types";
import { HANDLE_CHANGE_SUCCESS } from "../constants/action-types";
import { HANDLE_VALIDATION_ERRORS } from "../constants/action-types";
import { HANDLE_EMAIL_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_USER_NAME_UPDATE_SUCCESS } from "../constants/action-types";
import { HANDLE_PASSWORD_UPDATE_SUCCESS } from "../constants/action-types";
import { 
    AJAX_CALL_INIT, 
    AJAX_CALL_FINSH,
    CLOSE_ACCOUNT_INIT,
    CLOSE_ACCOUNT_FINSH,
    HANDLE_USER_CLOSE_ACCOUNT_SUCCESS
} from "../constants/action-types";
import helper from '../../constants/helper';

const initialState = {
    'errorsObj'             : {},
    'email'                 : '',
    'username'              : '',
    'password'              : '',
    'password_strength'     : '',
    'response_status'       : '',
    'isLoading'             : false,
    'isSyn'                 : false,
}

const SettingAccountReducer = (state = initialState, action) => {
    if (action.type === HANDLE_ACCOUNT_SETTING_SUCCESS) {
        return {
            ...state,
            email               : action.payload.email,
            username            : action.payload.username,
            password_strength   : action.payload.password_strength,
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
    else if(action.type === HANDLE_EMAIL_UPDATE_SUCCESS) {
    	return {
            ...state,
            response_status : action.payload,
            errorsObj       : {}
        };
    }
    else if(action.type === HANDLE_USER_NAME_UPDATE_SUCCESS) {
        return {
            ...state,
            response_status : action.payload,
            errorsObj       : {}
        };
    }
    else if(action.type === HANDLE_PASSWORD_UPDATE_SUCCESS) {
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
    } 
    else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    else if (action.type === CLOSE_ACCOUNT_INIT) {
        return {
            ...state,
            isSyn: true
        }
    } 
    else if (action.type === CLOSE_ACCOUNT_FINSH) {
        return {
            ...state,
            isSyn: false
        }
    }
    else if (action.type === HANDLE_USER_CLOSE_ACCOUNT_SUCCESS) {
        localStorage.removeItem(helper.access_token);
        localStorage.removeItem(helper.token_type);
        localStorage.removeItem(helper.isLogin);
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        return {
            ...state,
        }

    }
    return state;
}

export default SettingAccountReducer;