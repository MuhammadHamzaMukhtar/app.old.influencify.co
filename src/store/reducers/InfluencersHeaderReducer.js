import { HANDLE_CHANGE_PLATFORM_SUCCESS } from "../constants/action-types";
import * as types from "../actions/SetUpCampaignActions";
import { 
    FETCH_PLATFORMS_SUCCESS,
    HANDLE_CHANGE_CREDIBILTY_SUCCESS,
    HANDLE_CLEAR_FILTER_SUCCESS,
    HANDLE_CHANGE_SEARCH_TYPE_SUCCESS,
    HANDLE_SELECT_PLATFORM
} from "../constants/action-types";

const initialState = {
    platforms 			   : [],
    creditbilty            : '',
    searchType             : true,
    selectedPlatform       : '840a3b2d-7ac1-4b87-8e10-75040ddc3f91',
    activePlatformTab      : 'Instagram',
};

const InfluencersHeaderReducer = (state = initialState, action) => {
    if(action.type === HANDLE_CHANGE_PLATFORM_SUCCESS) {
        return {
            ...state,
            selectedPlatform : action.payload.target.value
        };
    }
    else if(action.type === HANDLE_SELECT_PLATFORM) {
        return {
            ...state,
            activePlatformTab : action.payload
        };
    }
    else if (action.type === FETCH_PLATFORMS_SUCCESS) {
        return {
            ...state,
            platforms: action.payload
        };
    }
    else if (action.type === HANDLE_CHANGE_CREDIBILTY_SUCCESS) {
        return {
            ...state,
            creditbilty: action.payload.target.value

        };
    }
    else if(action.type === HANDLE_CLEAR_FILTER_SUCCESS) {
        return {
            ...state,  
            creditbilty : '', 
        };
    }
    else if (action.type === HANDLE_CHANGE_SEARCH_TYPE_SUCCESS) {
        return {
            ...state,
            searchType: action.payload

        };
    }
    else if (action.type === types.SUBMIT_TYPE) {
        return {
            ...state,
            searchType: action.payload.typeName === 'PUBLIC' ? false :true,
        }
    }
    return state;
}

export default InfluencersHeaderReducer;