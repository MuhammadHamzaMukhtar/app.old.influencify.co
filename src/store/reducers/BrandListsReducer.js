import { 
    BRAND_LISTS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    AJAX_CALL_LIST_INIT,
    AJAX_CALL_LIST_FINISH,
    HANDLE_LIST_VALIDATION_ERRORS,
    HANDLE_SHOW_CREATE_NEW_LIST,
    HANDLE_HIDE_CREATE_NEW_LIST,
    ADD_NEW_LIST_SUCCESS,
    HANDLE_SHOW_LIST_MODAL,
    HANDLE_HIDE_LIST_MODAL,
    ADD_INFLUENCER_TO_LIST_SUCCESS,
    HANDLE_SORT_LIST_SUCCESS,
    HANDLE_SEARCH_LISTS_SUCCESS,
    HANDLE_SORT_LIST_INFLUENCER_SUCCESS,
    INVALID_BODY_PARAMS,
    BRAND_INSTAGRAM_LIST_VIEW_SUCCESS,
    HANDLE_LIST_NAME_EDIT_SUCCESS
} from "../constants/action-types";

const initialState = {
    isLoading                       : false,
    isLoader                        : false,
    sortQuery                       : 'newestFirst',
    searchQuery                     : '',
    pagination                      : {},
    brandLists                      : [],
    errorsObj                       : {},
    addNewListFlag                  : false,
    listModalFlag                   : false,
    brandListInfluencers            : [],
    reportInfo                      : {},
    influencerListSortQuery         : 'newestFirst',
    invalidBodyParams               : false,
    currentList                     : '',
    overlappingAudience             : 0,
    uniqueAudience                  : 0,
    totalFollowers                  : 0,
    totalUniqueFollowers            : 0,
};

const BrandListsReducer =  (state = initialState, action) => {
    if (action.type === BRAND_LISTS_SUCCESS) {
        let pagination  = {
              nextPageUrl           :   action.makePagination.links.next,
              previousPageUrl       :   action.makePagination.links.prev,
              lastPageUrl           :   action.makePagination.links.last,
              currentPageNumber     :   action.makePagination.meta.current_page,
              from                  :   action.makePagination.meta.from,
              to                    :   action.makePagination.meta.to,
              total                 :   action.makePagination.meta.total,
        }
        return {
            ...state,
            brandLists : action.payload,
            pagination : pagination,
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
    else if (action.type === AJAX_CALL_LIST_INIT) {
        return {
            ...state,
            isLoader: true
        }
    } 
    else if (action.type === AJAX_CALL_LIST_FINISH) {
        return {
            ...state,
            isLoader: false
        }
    }
    else if (action.type === HANDLE_LIST_VALIDATION_ERRORS) {
        return {
            ...state,
            errorsObj: action.payload
        }
    }
    else if (action.type === HANDLE_LIST_VALIDATION_ERRORS) {
        return {
            ...state,
            errorsObj: action.payload
        }
    }
    else if (action.type === ADD_NEW_LIST_SUCCESS) {
        return {
            ...state,
            addNewListFlag  : false,
            brandLists      : action.payload.lists
        }
    }
    else if (action.type === HANDLE_SHOW_CREATE_NEW_LIST) {
        return {
            ...state,
            addNewListFlag  : true,
        }
    }
    else if (action.type === HANDLE_HIDE_CREATE_NEW_LIST) {
        return {
            ...state,
            addNewListFlag  : false,
        }
    }
    else if (action.type === HANDLE_SHOW_LIST_MODAL) {
        return {
            ...state,
            listModalFlag  : true,
        }
    }
    else if (action.type === HANDLE_HIDE_LIST_MODAL) {
        return {
            ...state,
            listModalFlag  : false,
        }
    }
    else if (action.type === ADD_INFLUENCER_TO_LIST_SUCCESS) {
        return {
            ...state,
            listModalFlag  : false,
        }
    }
    else if (action.type === HANDLE_SEARCH_LISTS_SUCCESS) {
        return {
            ...state,
            searchQuery: action.payload.target.value
        }
    }
    else if (action.type === HANDLE_SORT_LIST_SUCCESS) {
        return {
            ...state,
            sortQuery: action.payload.target.value
        }
    }
    else if (action.type === HANDLE_SORT_LIST_INFLUENCER_SUCCESS) {
        return {
            ...state,
            influencerListSortQuery: action.payload.target.value
        }
    }
    else if (action.type === INVALID_BODY_PARAMS) {
        return {
            ...state,
            invalidBodyParams: true,
            currentList      : action.list,
        }
    }
    else if (action.type === BRAND_INSTAGRAM_LIST_VIEW_SUCCESS) {
        return {
            ...state,
            invalidBodyParams       : false,
            brandListInfluencers    : action.payload,
            totalFollowers          : action.reportInfo?.totalFollowers,
            totalUniqueFollowers    : action.reportInfo?.totalUniqueFollowers,
            currentList             : action.list,
            overlappingAudience     : action?.overlappingAudience,
            uniqueAudience          : action?.uniqueAudience,
        }
    }
    else if (action.type === HANDLE_LIST_NAME_EDIT_SUCCESS) {
        let newList =  Object.assign({}, state.currentList, {list_name: action.payload.target.value});
        return {
            ...state,
            currentList : newList
        }
    }
    return state;
}

export default BrandListsReducer;