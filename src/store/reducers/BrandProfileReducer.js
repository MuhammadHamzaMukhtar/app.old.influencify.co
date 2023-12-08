import { 
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    FETCH_BRAND_PROFILE_SUCCESS,
    HANDLE_CLOSE_BRAND_PROFILE,
} from "../constants/action-types";

const initialState = {
    isLoading       : true,
    basicInfo       : {},   
    NoOfCampaigns   : 0,   
    brandProducts   : []   
};

const BrandProfileReducer = (state = initialState, action) => {
    if (action.type === FETCH_BRAND_PROFILE_SUCCESS) {
        return {
            ...state,
            basicInfo       : action.payload.bandResource,
            NoOfCampaigns   : action.payload.bandResource.NoOfCampaigns,
            brandProducts   : action.payload.brandProducts,
        };
    }
    if (action.type === HANDLE_CLOSE_BRAND_PROFILE) {
        return {
            ...state,
            basicInfo     : {},
            NoOfCampaigns : 0,
            brandProducts : [],
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
export default BrandProfileReducer;