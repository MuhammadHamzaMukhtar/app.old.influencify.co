import { 
    FECTH_BRAND_ANALYZED_INFLUENCERS_SUCCESS,
    HANDLE_CHANGE_SEARCH_ANALYZER_SUCCESS,
    SEARCH_ANALYZER_SUCCESS,
    ANALYZER_SEARCH_INIT,
    ANALYZER_SEARCH_FINSH,
    HANDLE_CLOSE_DROPDOWN_SUCCESS,
    HANDLE_OPEN_DROPDOWN_SUCCESS,
    HANDLE_SORT_NOTABLE_LIKERS,
    BRAND_ANALYZED_INFLUENCERS_INIT,
    BRAND_ANALYZED_INFLUENCERS_FINSH
} from "../constants/action-types";

const initialState = {
    isLoading               : false,
    isSearchLoading         : false,
    analyzedInfluencers     : [],
    analyzerInfluencers     : [],
    pagination              : {},
    searchQuery             : "",
    sortQuery               : "followers",
    isSearched              : false,
};

const BrandAnalyzedInfluencersReducer =  (state = initialState, action) => {
    if (action.type === FECTH_BRAND_ANALYZED_INFLUENCERS_SUCCESS) {
        let pagination  = {
            nextPageUrl             :   action.payload.influencers.next_page_url,
            previousPageUrl         :   action.payload.influencers.prev_page_url,
            lastPageUrl             :   action.payload.influencers.last_page_url,
            currentPageNumber       :   action.payload.influencers.current_page,
            from                    :   action.payload.influencers.from,
            to                      :   action.payload.influencers.to,
            total                   :   action.payload.influencers.total,
        }   
        return {
            ...state,
            analyzedInfluencers     : action.payload.influencers.data,
            pagination              : pagination
        };
    }
    if (action.type === HANDLE_CHANGE_SEARCH_ANALYZER_SUCCESS) {
        if (action.payload.target.value === "") {
            return {
                ...state,
                analyzerInfluencers : [],
                isSearched          : false,
                searchQuery         : ''
            }

        }
        return {
            ...state,
            searchQuery: action.payload.target.value
        };
    }
    if (action.type === SEARCH_ANALYZER_SUCCESS) {
        return {
            ...state,
            isSearched          : true,
            analyzerInfluencers : action.payload
        };
    }
    else if (action.type === HANDLE_SORT_NOTABLE_LIKERS) {
        return {
            ...state,
            sortQuery : action.payload,
        };
    }
    if (action.type === HANDLE_CLOSE_DROPDOWN_SUCCESS) {
        return {
            ...state,
            isSearched: false
        };
    }
    if (action.type === HANDLE_OPEN_DROPDOWN_SUCCESS) {
        return {
            ...state,
            isSearched: true
        };
    }
    else if (action.type === BRAND_ANALYZED_INFLUENCERS_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } 
    else if (action.type === BRAND_ANALYZED_INFLUENCERS_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    else if (action.type === ANALYZER_SEARCH_INIT) {
        return {
            ...state,
            isSearchLoading: true
        }
    } 
    else if (action.type === ANALYZER_SEARCH_FINSH) {
        return {
            ...state,
            isSearchLoading: false
        }
    }
    return state;
}

export default BrandAnalyzedInfluencersReducer;