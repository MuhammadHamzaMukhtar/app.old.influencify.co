import { 
    HANDLE_CHANGE_CONTACT_US_SUCCESS,
    HANDLE_SEND_CONTACT_MESSAGE_SUCCESS,
    HANDLE_VALIDATION_ERRORS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
 } from "../constants/action-types";

const initialState = {
    isLoading     : false,
    errorsObj     : {},
    name          : '',
    email         : '',
    phoneNumber   : '',
    company       : '',
    message       : '',
};

const ContactReducer =  (state = initialState, action) => {
    if(action.type === HANDLE_CHANGE_CONTACT_US_SUCCESS) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        };
    }
    else if(action.type === HANDLE_VALIDATION_ERRORS) {
        return {
            ...state,
            errorsObj : action.payload
        };
    }
    else if(action.type === HANDLE_SEND_CONTACT_MESSAGE_SUCCESS) {
        return {
            ...state,
            errorsObj     : {},
            name          : '',
            email         : '',
            phoneNumber   : '',
            company       : '',
            message       : '',
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
    return state;
}

export default ContactReducer;