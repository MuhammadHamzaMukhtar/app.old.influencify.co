import { 
    BRAND_REPORTS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
} from "../constants/action-types";

const initialState = {
    isLoading              : false,
};

const BrandReportsReducer = (state = initialState, action) => {
    if (action.type === BRAND_REPORTS_SUCCESS) {
        return {
            ...state,
            notableUsers : action.payload,
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

export default BrandReportsReducer;