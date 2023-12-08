import { 
    HANDLE_VALIDATION_ERRORS,
    HANDLE_CHANGE_SUCCESS,
    HANDLE_FORGET_PASSWORD_SUBMIT_SUCEESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    HANDLE_RESET_PASSWORD_SUBMIT_SUCEESS,
    HANDLE_RESET_PASSWORD_VIEW_SUCEESS,
} from "../constants/action-types"

const initialState = {
    isLoading               : false,
    errorsObj               : {},
    email                   : '',
    password                : '',
    password_confirmation   : '',
    response_message        : '',
};

const ForgetPasswordReducer = (state = initialState, action) => {
    if (action.type === HANDLE_CHANGE_SUCCESS) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.type === "checkbox" ? action.payload.target.checked : action.payload.target.value
        };
    } 
    else if (action.type === HANDLE_FORGET_PASSWORD_SUBMIT_SUCEESS) {
        return {
            ...state,
            errorsObj           : {},
            response_message    : action.payload.message,
            email               : '',
        }
        
    }
    else if (action.type === HANDLE_RESET_PASSWORD_SUBMIT_SUCEESS) {
        return {
            ...state,
            errorsObj              : {},
            response_message       : action.payload,
            email                  : '',
            password               : '',
            password_confirmation  : '',
        }
        
    } 
    else if (action.type === HANDLE_RESET_PASSWORD_VIEW_SUCEESS) {
        return {
            ...state,
            email      : action.payload.email
        }
    }
    else if(action.type === HANDLE_VALIDATION_ERRORS) {
        return {
            ...state,
            response_message:"",
            errorsObj : action.payload
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
    } else {
        return state;
    }
}

export default ForgetPasswordReducer;