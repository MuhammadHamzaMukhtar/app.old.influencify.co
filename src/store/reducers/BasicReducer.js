import * as basicAction from "../actions/BasicActions";
import { 
        FETCH_GOALS_SUCCESS,
        FETCH_CATEGORIES_SUCCESS,
     } from "../constants/action-types";
const initialState = {
    countries           : [],
    platforms           : [],
    campaignCategories  : [],
    campaignGoals       : [],
    feedPosts           : 0,
    storyPosts          : 0,
    selectedPlatform    : "Facebook",
};

const BasicReducer = (state = initialState, action) => {
    if (action.type === basicAction.FETCH_PLATFORMS_SUCCESS) {
        return {
            ...state,
            platforms: action.payload
        };
    } else if (action.type === basicAction.FETCH_PLATFORMS_FAILURE) {
        return {
            ...state,
            platforms: action.payload
        };
    } else if (action.type === basicAction.ADD_COUNTRY_FIELD) {
        return {
            ...state,
            countries: [...state.countries, ""]
        };
    } else if (action.type === basicAction.REMOVE_COUNTRY_FIELD) {
        const newArray = state.countries.filter((_, i) => i !== action.payload);
        return {
            ...state,
            countries: newArray
        };
    } else if (action.type === basicAction.HANDLE_CHANGE) {
        return {
            ...state,
            countries: state.countries[action.payload.index] = action.payload.value
        }
    } else if (action.type === basicAction.HANDLE_TITLE_CHANGE) {
        return {
            ...state,
            campaignTitle: action.value
        }
    }  
    else if (action.type === basicAction.HANDLE_BASIC_CHANGE) {
        return {
            ...state,
            [action.name]: action.value
        }
    }
    else if (action.type === FETCH_CATEGORIES_SUCCESS) {
        return {
            ...state,
            campaignCategories: action.payload
        }
    }
    else if (action.type === FETCH_GOALS_SUCCESS) {
        return {
            ...state,
            campaignGoals: action.payload
        }
    }
    return state;
}
export default BasicReducer;