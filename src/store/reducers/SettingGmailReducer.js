import { 
    FETCH_GMAIL_SETTINGS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    HANDLE_GMAIL_SETTING_CHANGE,
    HANDLE_GMAIL_UPDATE_FAILED,
    HANDLE_GMAIL_UPDATE_SUCCESS
 } from "../constants/action-types";

const initialState = {
    isLoading      : false,
    email          : '',
    name           : '',
    subject        : '',
    message        : '',
    verifiedEmail  : false,
    daily_limit  : 0,
    daily_max_limit  : 0,
    hourly_limit  : 0,
    hourly_max_limit  : 0,
    delay_sending  : 0,
    errorsObj: {}
};

const SettingGmailReducer = (state = initialState, action) => {
    if(action.type === FETCH_GMAIL_SETTINGS_SUCCESS) {
        return {
            ...state,
            email           : action.payload.email,
            name            : action.payload.name,
            subject         : action.payload.subject,
            message         : action.payload.message,
            verifiedEmail   : action.payload.verifiedEmail,
            daily_limit   : action.payload.daily_limit,
            daily_max_limit   : action.payload.daily_max_limit,
            hourly_limit   : action.payload.hourly_limit,
            hourly_max_limit   : action.payload.hourly_max_limit,
            delay_sending   : action.payload.delay_sending,
        };
    }
    else if(action.type === HANDLE_GMAIL_SETTING_CHANGE) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        };
    }
    else if (action.type === HANDLE_GMAIL_UPDATE_SUCCESS) {
        return {
            ...state,
            errorsObj: {}
        };
    }
    else if (action.type === HANDLE_GMAIL_UPDATE_FAILED) {
        return {
            ...state,
            errorsObj: action.payload
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
            isLoading: false,
        }
    }
    return state;
}

export default SettingGmailReducer;