import { 
    HANDLE_SET_UP_NEW_CAMPAIGN_SUCCESS,
    HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS,
    HANDLE_FETCH_CAMPAIGN_TYPES_SUCCESS  
} from "../constants/action-types";

const initialState = {
    campaign_id     : '',
    campaign_types  : [],
};

const NewCampaignReducer = (state = initialState, action) => {
    if (action.type === HANDLE_SET_UP_NEW_CAMPAIGN_SUCCESS) {
        return {
            ...state,
            campaign_id : action.payload.id
        };
    }
    else if (action.type === HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS) {
        return {
            ...state,
            campaign_id : action.payload
        };
    }
    else if (action.type === HANDLE_FETCH_CAMPAIGN_TYPES_SUCCESS) {
        return {
            ...state,
            campaign_types : action.payload
        };
    }
    return state;
}

export default NewCampaignReducer;