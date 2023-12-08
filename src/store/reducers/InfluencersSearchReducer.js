import { 
	HANDLE_CHANGE_SEARCH_SUCCESS,
	HANDLE_CLEAR_FILTER_SUCCESS,
    HANDLE_SELECT_SEARCH_BY_SUCCESS,
} from "../constants/action-types";

const initialState = {
    searchQuery : '',
    searchBy    : '@',
};

const InfluencersSearchReducer = (state = initialState, action) => {

    if (action.type === HANDLE_CHANGE_SEARCH_SUCCESS) {
        return {
            ...state,
            searchQuery: action.payload.target.value
        };
    }
    if (action.type === HANDLE_SELECT_SEARCH_BY_SUCCESS) {
        return {
            ...state,
            searchBy: action.payload.target.value
        };
    }
    else if(action.type === HANDLE_CLEAR_FILTER_SUCCESS) {
        if (action.payload === 'searchQuery') {
            return {
            ...state,  
                searchQuery : '', 
            };
        }
        else{
            return {
                ...state, 
                searchQuery : '',  
            };
        }
    }
    return state;
}

export default InfluencersSearchReducer;