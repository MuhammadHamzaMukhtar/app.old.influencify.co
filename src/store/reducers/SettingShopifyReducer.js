import { 
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    HANDLE_SHOPIFY_STORE_URL_CHANGE
 } from "../constants/action-types";

const initialState = {
    isLoading      : false,
    shopUrl        : '',
};

const SettingShopifyReducer = (state = initialState, action) => {
    if(action.type === HANDLE_SHOPIFY_STORE_URL_CHANGE) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
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

export default SettingShopifyReducer;