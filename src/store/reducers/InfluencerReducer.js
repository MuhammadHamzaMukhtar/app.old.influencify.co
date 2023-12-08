import * as types from "../actions/types";

const initialState = {
    influencers: [],
    selectedInfluencers: []
};

const InfluencerReducer = (state = initialState, action) => {
    if (action.type === types.FETCH_INFLUENCERS) {
        return {...state, influencers: [...action.payload]};
    } 
    else if (action.type === types.ADD_SELECTED_INFLUENCER) {
        if (action.payload.status) {
            return {
                ...state,
                selectedInfluencers: [...state.selectedInfluencers, action.payload.influencer]
            }
        }
        const updatedArray = state.selectedInfluencers.filter(
            selectedInfluencer => selectedInfluencer.id !== action.payload.influencer.id
        );
        return {
            ...state,
            selectedInfluencers: updatedArray
        }
    } 
    else if (action.type === types.REMOVE_SELECTED_INFLUENCER) {
        const updatedArray = state.selectedInfluencers.filter(
            selectedInfluencer => selectedInfluencer.id !== action.payload
        );
        return {
            ...state, selectedInfluencers: updatedArray
        }
    } 
    else if (action.type === types.REMOVE_ALL_SELECTED_INFLUENCER) {
        return {
            ...state, 
            selectedInfluencers: []
        }
    } 
    else {
        return state;
    }
}

export default InfluencerReducer;