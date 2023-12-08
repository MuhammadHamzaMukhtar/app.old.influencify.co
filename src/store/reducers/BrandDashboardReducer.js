import {
    HANDLE_TOP_INFLUENCERS_ANALYZED,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    HANDLE_GOOGLE_ANALYTICS,
    HANDLE_GOOGLE_ANALYTICS_ACTIVITY,
} from "../constants/action-types";

const initialState = {
    influencer_discovered   : 0,
    topinfluencersAnalyzed  : [],
    influencitySelection    : [],
    topSearches             : [],
    reports         : {},
    activity         : {},
    isLoading               : false,
};          

const BrandDashboardReducer =  (state = initialState, action) => {
    if (action.type === HANDLE_TOP_INFLUENCERS_ANALYZED) {
        return {
            ...state,
            influencer_discovered       : action.payload.influencer_discovered,
            influencitySelection        : action.payload.influencitySelection,
            topSearches                 : action.payload.topSearches,
            topinfluencersAnalyzed      : action.payload.topInfluencersAnalyzedArray,
        }
    }
    else if (action.type === HANDLE_GOOGLE_ANALYTICS) {
        return {
            ...state,
            reports         : action.payload
        }
    }
    else if (action.type === HANDLE_GOOGLE_ANALYTICS_ACTIVITY) {
        return {
            ...state,
            activity: action.payload
        }
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
    else {
        return state;
    }
}

export default BrandDashboardReducer;
