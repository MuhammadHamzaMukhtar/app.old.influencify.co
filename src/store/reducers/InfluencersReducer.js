import {
	FETCH_INFLUENCERS_SUCCESS,
	AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
} from "../constants/action-types";

const initialState = {
    influencers     : [],
    modashTotal     : [],
    isLoading       : false, 
    directProfiles  : [], 
    pagination      : {},
};

const InfluencersReducer = (state = initialState, action) => {
    if (action.type === FETCH_INFLUENCERS_SUCCESS) {
        let pagination  = {
            nextPageUrl           :   action.payload.influencers.next_page_url,
            previousPageUrl       :   action.payload.influencers.prev_page_url,
            lastPageUrl           :   action.payload.influencers.last_page_url,
            currentPageNumber     :   action.payload.influencers.current_page,
            from                  :   action.payload.influencers.from,
            to                    :   action.payload.influencers.to,
            total                 :   action.payload.influencers.total,
        }
        return {
            ...state,
            influencers     : action.payload.influencers.data,
            modashTotal     : action.payload.modashTotal,
            directProfiles  : action.payload.directProfiles,
            pagination      : pagination
        };
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    return state;
}

export default InfluencersReducer;