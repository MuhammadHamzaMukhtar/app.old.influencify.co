import {FETCH_DASHBOARD_CAMPAIGNS_SUCCESS ,AJAX_CALL_INIT ,AJAX_CALL_FINSH} from "../constants/action-types";

const initialState = {
    isLoading: false,
    influencerDashboardCampaigns: []
};

const InfluencerHomeReducer = (state = initialState, action) => {
    if (action.type === FETCH_DASHBOARD_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            influencerDashboardCampaigns: action.payload
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

export default InfluencerHomeReducer;