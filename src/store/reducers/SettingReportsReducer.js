import { 
    FETCH_SUBSCRIPTION_REPORTS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
 } from "../constants/action-types";

const initialState = {
    isLoading               : false,
    currentSubscription     : {},
    previousSubscriptions   : [],
};

const SettingReportsReducer = (state = initialState, action) => {
    if(action.type === FETCH_SUBSCRIPTION_REPORTS_SUCCESS) {
        return {
            ...state,
            currentSubscription     : action.payload.currentSubscription,
            previousSubscriptions   : action.payload.previousSubscriptions
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

export default SettingReportsReducer;