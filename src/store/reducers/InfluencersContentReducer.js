import {
	HANDLE_CHANGE_SORT_SUCCESS,
    HANDLE_CHANGE_NON_VERIFIED_SORT_SUCCESS
} from "../constants/action-types";

const initialState = {
    sortQuery 	         : 'followers',
    sortNonVerified      : 'followers',
    searchType           : 'verified',
};

const InfluencersContentReducer = (state = initialState, action) => {
    if (action.type === HANDLE_CHANGE_SORT_SUCCESS) {
        return {
            ...state,
            sortQuery: action.payload.target.value

        };
    }
    if (action.type === HANDLE_CHANGE_NON_VERIFIED_SORT_SUCCESS) {
        return {
            ...state,
            sortNonVerified: action.payload.target.value
        };
    }
    return state;
}

export default InfluencersContentReducer;