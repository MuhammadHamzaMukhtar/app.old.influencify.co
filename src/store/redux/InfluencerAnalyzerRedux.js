import Influencify from "../../constants/Influencify";
export const types = {
  HANDLE_ANALYZER_PLATFORM_CHANGE         : 'HANDLE_ANALYZER_PLATFORM_CHANGE',
  HANDLE_SEARCH_QUERY_CHANGE              : 'HANDLE_SEARCH_QUERY_CHANGE',
  HANDLE_AUTOCOMPLETE_INFLUENCERS_LOADING : 'HANDLE_AUTOCOMPLETE_INFLUENCERS_LOADING',
  HANDLE_AUTOCOMPLETE_INFLUENCERS_SUCCESS : 'HANDLE_AUTOCOMPLETE_INFLUENCERS_SUCCESS',
  HANDLE_ANALYZED_USERS_LOADING           : 'HANDLE_ANALYZED_USERS_LOADING',
  HANDLE_ANALYZED_USERS_SUCCESS           : 'HANDLE_ANALYZED_USERS_SUCCESS',
  HANDLE_EVENT_CHANGE_SUCCESS             : 'HANDLE_EVENT_CHANGE_SUCCESS',
};

export const actions = {
  handlePlatform: (dispatch, data) => {
    dispatch({ type: types.HANDLE_ANALYZER_PLATFORM_CHANGE, data:data});
  },
  handleSearchQuery: (dispatch, data) => {
    dispatch({ type: types.HANDLE_SEARCH_QUERY_CHANGE, data:data});
  },
  autoCompleteUsers: async (dispatch, data) => {
    let report = '';
    if(data.report_user_id){
      report = data.report_user_id 
    }
    dispatch({ type: types.HANDLE_AUTOCOMPLETE_INFLUENCERS_LOADING});
    const json = await Influencify.autoCompleteUsers(data);
    dispatch({ type: types.HANDLE_AUTOCOMPLETE_INFLUENCERS_SUCCESS, data:json.data, report:report});

  },

  analyzedUsers: async (dispatch, page, data) => {
    dispatch({ type: types.HANDLE_ANALYZED_USERS_LOADING, page:page});
    const json = await Influencify.analyzedUsers(page, data);
    dispatch({ type: types.HANDLE_ANALYZED_USERS_SUCCESS, data:json.data, page:page}); 
  },
};

const initialState = {
  user_id               : '',
  handle                : '',
  search_query          : '',
  sort_query            : 'date',             
  platform              : 'instagram',
  autocompleteLoading   : false,
  analyzedUsersLoading  : false,
  isViewButton          : false,
  autocomplete          : [],
  analyzedUsers: [],
  analyzedMeta: {},
  loadMoreLoading:false
  
};

export const reducer = (state = initialState, action) => {
  const { type, data, report, page} = action;
  switch (type) {
    case types.HANDLE_ANALYZER_PLATFORM_CHANGE:{
      return {
        ...state,
        platform      : data,
        search_query  : '',
        user_id       : '',
        autocomplete  : []
      }
    }
    case types.HANDLE_SEARCH_QUERY_CHANGE:{
      return {
        ...state,
        search_query  : data.q,
        user_id       : data.user_id,
        handle        : data.handle ?? '',
        isViewButton  : false,
        autocomplete  : []
      }
    }
    case types.HANDLE_AUTOCOMPLETE_INFLUENCERS_SUCCESS:{
      let autocompleteUsers  = [];
      let isViewButton       = false;
      if(!report || report === null || report === 'null'){
        autocompleteUsers = (data?.data || [])
      }
      if(data.report){
        isViewButton = true;
      }
      return {
        ...state,
        // analyzedUsers       : autocompleteUsers,
        autocomplete        : autocompleteUsers,
        autocompleteLoading : false,
        isViewButton        : isViewButton
      }
    }
    case types.HANDLE_AUTOCOMPLETE_INFLUENCERS_LOADING:{
      return {
        ...state,
        autocompleteLoading : true
      }
    }
    case types.HANDLE_ANALYZED_USERS_LOADING:{
      return {
        ...state,
        analyzedUsersLoading: page>1?false:true,
        loadMoreLoading:true,
      }
    }
    case types.HANDLE_ANALYZED_USERS_SUCCESS:{
      return {
        ...state,
        analyzedUsersLoading: false,
        loadMoreLoading:false,
        analyzedUsers        : (data.data || []),
        analyzedMeta        : data,
      }
    }
    case types.HANDLE_EVENT_CHANGE_SUCCESS:{
      return {
        ...state,
        [data.key]: data.value
      }
    }
    default: {
      return state;
    }
  }
}



