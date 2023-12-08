import {
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    FETCH_INFLUENCER_FIND_CAMPAIGNS_SUCCESS,
} from "../constants/action-types";

const initialState = {
    isLoading                     : false,
    findInfluencerCampaigns       : [],
};

const FindInfluencerCampaignsReducer = (state = initialState, action) => {
    if (action.type === FETCH_INFLUENCER_FIND_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            findInfluencerCampaigns       : action.payload.findInfluencerCampaigns,
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

export default FindInfluencerCampaignsReducer;