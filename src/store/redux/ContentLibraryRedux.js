import Influencify from "../../constants/Influencify";

export const types = {
  FETCH_CONTENT_API_LOADING      : "FETCH_CONTENT_API_LOADING",
  FETCH_CONTENT_API_SUCCESS      : "FETCH_CONTENT_API_SUCCESS",
  FETCH_CONTENT_API_FAIL         : "FETCH_CONTENT_API_FAIL",
  SEARCH_CONTENT_LIBRARY_LOADING : "SEARCH_CONTENT_LIBRARY_LOADING",
  SEARCH_CONTENT_LIBRARY_SUCCESS : "SEARCH_CONTENT_LIBRARY_SUCCESS", 
  FETCH_CONTENT_LIBRARY_LOADING  : "FETCH_CONTENT_LIBRARY_LOADING",
  FETCH_CONTENT_LIBRARY_SUCCESS  : "FETCH_CONTENT_LIBRARY_SUCCESS",
  HANDLE_PAYLOAD_CONTENT         : "HANDLE_PAYLOAD_CONTENT",
  HANDLE_PLATFORM_CONTENT        :  "HANDLE_PLATFORM_CONTENT"
  
};

const initialState = {
 is_loading      : "",
 items           : [],
 filter_loading  : "",
 message         : "",
 campaign        : [],
 payload         : [],
platformOptions  : [],
influencer       : [],
platform         : "Select Platform"
};
export const actions = {
  fetchApiContent : async (dispatch,data) => {
    dispatch({type: types.FETCH_CONTENT_API_LOADING});
    let json = await Influencify.fetchApiContent(data);
    json = json.data;
    if(json.data.response === "updated" || json.data.response === "created" ){
      dispatch({type: types.FETCH_CONTENT_API_SUCCESS , data: json.data});
    } else {
      dispatch({type: types.FETCH_CONTENT_API_FAIL , data: json.data});
    }
  },

  fetchContentLibrary : async (dispatch,data) => {
    dispatch({type: types.FETCH_CONTENT_LIBRARY_LOADING});
    const json = await Influencify.fetchContentLibrary(data);
    dispatch({type: types.FETCH_CONTENT_LIBRARY_SUCCESS , data: json.data});
  },

  searchContentLibrary : async (dispatch,data) => {
    dispatch({type: types.SEARCH_CONTENT_LIBRARY_LOADING});
    const json = await Influencify.searchContentLibrary(data);
    dispatch({type: types.SEARCH_CONTENT_LIBRARY_SUCCESS , data: json.data});
  },

  addPayload : async (dispatch,data) => {
    dispatch({type: types.HANDLE_PAYLOAD_CONTENT , data: data});
  },
  handlePlatform : async (dispatch,platform) => {
    dispatch({type: types.HANDLE_PLATFORM_CONTENT , data: platform});
  },
  
};


export const reducer = (state = initialState, action) => {
  const { type, data} = action;
  switch (type) {
    case types.FETCH_CONTENT_API_LOADING:{
      return {
        ...state,
        is_loading : true
      }
    }
    case types.FETCH_CONTENT_API_SUCCESS:{
      return {
        ...state,
        is_loading  : false,
        message    : "Content is updated"
      }
    }

    case types.FETCH_CONTENT_API_FAIL:{
      return {
        ...state,
        is_loading  : false,
        message    : "Content is not updated for some reason"
      }
    }

    case types.FETCH_CONTENT_LIBRARY_LOADING:{
      return {
        ...state,
        filter_loading : true
      }
    }
    case types.FETCH_CONTENT_LIBRARY_SUCCESS:{
      return {
        ...state,
        filter_loading  : false,
        items       : data
      }
    }
    case types.SEARCH_CONTENT_LIBRARY_LOADING:{
      return {
        ...state,
        filter_loading : true
      }
    }
    case types.SEARCH_CONTENT_LIBRARY_SUCCESS:{
      return {
        ...state,
        filter_loading    : false,
        items             :( data && data.content) ? data.content : [] ,
        campaign          : data.campaignList,
        platformOptions   : data.platform,
        influencer        : data.influencerList,
      }
    }
    case types.HANDLE_PAYLOAD_CONTENT:{
      return {
        ...state,
        payload : data
      }
    }

    case types.HANDLE_PLATFORM_CONTENT:{
      return {
        ...state,
        platform : data
      }
    }


    default: {
      return state;
    }
  }
}



