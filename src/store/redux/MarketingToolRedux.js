import Influencify from "../../constants/Influencify";
export const types = {
  FETCH_SEARCH_INSTAGRAM_INFLUENCER_PENDING:
    "FETCH_SEARCH_INSTAGRAM_INFLUENCER_PENDING",
  FETCH_SEARCH_INSTAGRAM_INFLUENCER_SUCCESS:
    "FETCH_SEARCH_INSTAGRAM_INFLUENCER_SUCCESS",
  FETCH_SEARCH_INSTAGRAM_INFLUENCER_FAILURE:
    "FETCH_SEARCH_INSTAGRAM_INFLUENCER_FAILURE",

  FETCH_SEARCH_INSTAGRAM_LOCATION_PENDING:
    "FETCH_SEARCH_INSTAGRAM_LOCATION_PENDING",
  FETCH_SEARCH_INSTAGRAM_LOCATION_SUCCESS:
    "FETCH_SEARCH_INSTAGRAM_LOCATION_SUCCESS",
  FETCH_SEARCH_INSTAGRAM_LOCATION_FAILURE:
    "FETCH_SEARCH_INSTAGRAM_LOCATION_FAILURE",

  FETCH_SEARCH_YOUTUBE_INFLUENCER_PENDING:
    "FETCH_SEARCH_YOUTUBE_INFLUENCER_PENDING",
  FETCH_SEARCH_YOUTUBE_INFLUENCER_SUCCESS:
    "FETCH_SEARCH_YOUTUBE_INFLUENCER_SUCCESS",
  FETCH_SEARCH_YOUTUBE_INFLUENCER_FAILURE:
    "FETCH_SEARCH_YOUTUBE_INFLUENCER_FAILURE",

  FETCH_SEARCH_YOUTUBE_LOCATION_PENDING:
    "FETCH_SEARCH_YOUTUBE_LOCATION_PENDING",
  FETCH_SEARCH_YOUTUBE_LOCATION_SUCCESS:
    "FETCH_SEARCH_YOUTUBE_LOCATION_SUCCESS",
  FETCH_SEARCH_YOUTUBE_LOCATION_FAILURE:
    "FETCH_SEARCH_YOUTUBE_LOCATION_FAILURE",

  FETCH_SEARCH_TIKTOK_INFLUENCER_PENDING:
    "FETCH_SEARCH_TIKTOK_INFLUENCER_PENDING",
  FETCH_SEARCH_TIKTOK_INFLUENCER_SUCCESS:
    "FETCH_SEARCH_TIKTOK_INFLUENCER_SUCCESS",
  FETCH_SEARCH_TIKTOK_INFLUENCER_FAILURE:
    "FETCH_SEARCH_TIKTOK_INFLUENCER_FAILURE",

  FETCH_SEARCH_TIKTOK_LOCATION_PENDING: "FETCH_SEARCH_TIKTOK_LOCATION_PENDING",
  FETCH_SEARCH_TIKTOK_LOCATION_SUCCESS: "FETCH_SEARCH_TIKTOK_LOCATION_SUCCESS",
  FETCH_SEARCH_TIKTOK_LOCATION_FAILURE: "FETCH_SEARCH_TIKTOK_LOCATION_FAILURE",

  FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_PENDING:
    "FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_PENDING",
  FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_SUCCESS:
    "FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_SUCCESS",
  FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_FAILURE:
    "FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_FAILURE",

  FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_PENDING:
    "FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_PENDING",
  FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_SUCCESS:
    "FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_SUCCESS",
  FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_FAILURE:
    "FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_FAILURE",
  
  
  FETCH_TIKTOK_EMAIL_FINDER_PENDING:
    "FETCH_TIKTOK_EMAIL_FINDER_PENDING",
  FETCH_TIKTOK_EMAIL_FINDER_SUCCESS:
    "FETCH_TIKTOK_EMAIL_FINDER_SUCCESS",
  FETCH_TIKTOK_EMAIL_FINDER_FAILURE:
    "FETCH_TIKTOK_EMAIL_FINDER_FAILURE",
  
  
  FETCH_INSTAGRAM_EMAIL_FINDER_PENDING:
    "FETCH_INSTAGRAM_EMAIL_FINDER_PENDING",
  FETCH_INSTAGRAM_EMAIL_FINDER_SUCCESS:
    "FETCH_INSTAGRAM_EMAIL_FINDER_SUCCESS",
  FETCH_INSTAGRAM_EMAIL_FINDER_FAILURE:
    "FETCH_INSTAGRAM_EMAIL_FINDER_FAILURE",
  
  FETCH_YOUTUBE_EMAIL_FINDER_PENDING:
    "FETCH_YOUTUBE_EMAIL_FINDER_PENDING",
  FETCH_YOUTUBE_EMAIL_FINDER_SUCCESS:
    "FETCH_YOUTUBE_EMAIL_FINDER_SUCCESS",
  FETCH_YOUTUBE_EMAIL_FINDER_FAILURE:
    "FETCH_YOUTUBE_EMAIL_FINDER_FAILURE",

  FETCH_DISCOVER_CATEGORY_PENDING: "FETCH_DISCOVER_CATEGORY_PENDING",
  FETCH_DISCOVER_CATEGORY_SUCCESS: "FETCH_DISCOVER_CATEGORY_SUCCESS",
  FETCH_DISCOVER_CATEGORY_FAILURE: "FETCH_DISCOVER_CATEGORY_FAILURE",

  FETCH_DISCOVER_RECIPE_PENDING: "FETCH_DISCOVER_RECIPE_PENDING",
  FETCH_DISCOVER_RECIPE_SUCCESS: "FETCH_DISCOVER_RECIPE_SUCCESS",
  FETCH_DISCOVER_RECIPE_MORE: "FETCH_DISCOVER_RECIPE_MORE",
  FETCH_DISCOVER_RECIPE_FAILURE: "FETCH_DISCOVER_RECIPE_FAILURE",

  MARKETING_TOOL_ADD_FORM: "MARKETING_TOOL_ADD_FORM",

  RESET_EMAIL_FINDER: "RESET_EMAIL_FINDER",
};

export const actions = {
  fetchSearchInstagramInfluencers: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchSearchInstagramLocation: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_INSTAGRAM_LOCATION_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_INSTAGRAM_LOCATION_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_INSTAGRAM_LOCATION_FAILURE,
        data: json.data,
      });
    }
  },

  fetchSearchYoutubeInfluencers: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_YOUTUBE_INFLUENCER_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_YOUTUBE_INFLUENCER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_YOUTUBE_INFLUENCER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchSearchYoutubeLocation: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_YOUTUBE_LOCATION_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_YOUTUBE_LOCATION_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_YOUTUBE_LOCATION_FAILURE,
        data: json.data,
      });
    }
  },

  fetchSearchTiktokInfluencers: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_TIKTOK_INFLUENCER_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_TIKTOK_INFLUENCER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_TIKTOK_INFLUENCER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchSearchTiktokLocation: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SEARCH_TIKTOK_LOCATION_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SEARCH_TIKTOK_LOCATION_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SEARCH_TIKTOK_LOCATION_FAILURE,
        data: json.data,
      });
    }
  },

  fetchInstagramEngagementCalculator: async (dispatch, data) => {
    dispatch({ type: types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_FAILURE,
        data: json.data,
      });
    }
  },

  fetchTiktokEngagementCalculator: async (dispatch, data) => {
    dispatch({ type: types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_PENDING });
    const json = await Influencify.findInfluencerTools(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_FAILURE,
        data: json.data,
      });
    }
  },

  fetchTiktokEmailFinder: async (dispatch, data) => {
    dispatch({ type: types.FETCH_TIKTOK_EMAIL_FINDER_PENDING });
    const json = await Influencify.findInfluencerContacts(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_TIKTOK_EMAIL_FINDER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_TIKTOK_EMAIL_FINDER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchInstagramEmailFinder: async (dispatch, data) => {
    dispatch({ type: types.FETCH_INSTAGRAM_EMAIL_FINDER_PENDING });
    const json = await Influencify.findInfluencerContacts(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_INSTAGRAM_EMAIL_FINDER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_INSTAGRAM_EMAIL_FINDER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchYoutubeEmailFinder: async (dispatch, data) => {
    dispatch({ type: types.FETCH_YOUTUBE_EMAIL_FINDER_PENDING });
    const json = await Influencify.findInfluencerContacts(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_YOUTUBE_EMAIL_FINDER_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_YOUTUBE_EMAIL_FINDER_FAILURE,
        data: json.data,
      });
    }
  },

  fetchDiscoverCategory: async (dispatch) => {
    dispatch({ type: types.FETCH_DISCOVER_CATEGORY_PENDING });
    const json = await Influencify.fetchDiscoverCategory();
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_DISCOVER_CATEGORY_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_DISCOVER_CATEGORY_FAILURE,
        data: json.data,
      });
    }
  },

  fetchDiscoverRecipe: async (dispatch, page, params) => {
    dispatch({ type: types.FETCH_DISCOVER_RECIPE_PENDING });
    const json = await Influencify.fetchDiscoverRecipe(page, params);

    if (json === undefined) {
      dispatch({
        type: types.FETCH_DISCOVER_RECIPE_FAILURE,
        data: { message: ["Can't get data from server"] },
      });
    } else if (200 !== json.status) {
      dispatch({ type: types.FETCH_DISCOVER_RECIPE_FAILURE });
    } else {
      if (page > 1) {
        dispatch({
          type: types.FETCH_DISCOVER_RECIPE_MORE,
          data: json.data,
          params: params,
        });
      } else {
        dispatch({
          type: types.FETCH_DISCOVER_RECIPE_SUCCESS,
          data: json.data,
          params: params,
        });
      }
    }
  },

  addForm: (dispatch, data) => {
    dispatch({ type: types.MARKETING_TOOL_ADD_FORM, data: data });
  },

  resetEmailFinder: () => {
    return { type: types.RESET_EMAIL_FINDER };
  },
};

const initialState = {
  searchInstagramInfluencers: [],
  searchInstagramTotalInfluencers: 0,
  searchInstagramCountInfluencers: 0,
  searchInstagramInfluencerLoader: false,

  searchInstagramLocation: [],
  searchInstagramTotalLocation: 0,
  searchInstagramCountLocation: 0,
  searchInstagramLocationLoader: false,

  searchYoutubeInfluencers: [],
  searchYoutubeTotalInfluencers: 0,
  searchYoutubeCountInfluencers: 0,
  searchYoutubeInfluencerLoader: false,

  searchYoutubeLocation: [],
  searchYoutubeTotalLocation: 0,
  searchYoutubeCountLocation: 0,
  searchYoutubeLocationLoader: false,

  searchTiktokInfluencers: [],
  searchTiktokTotalInfluencers: 0,
  searchTiktokCountInfluencers: 0,
  searchTiktokInfluencerLoader: false,

  searchTiktokLocation: [],
  searchTiktokTotalLocation: 0,
  searchTiktokCountLocation: 0,
  searchTiktokLocationLoader: false,

  instaEngagementData: [],
  instaEngagementCount: 0,
  instaEngagementLoader: false,

  tiktokEngagementData: [],
  tiktokEngagementCount: 0,
  tiktokEngagementLoader: false,

  tiktokEmailData: {},
  tiktokEmailMessage:"",
  tiktokEmailCount: 0,
  tiktokEmailLoader: false,

  instagramEmailData: {},
  instagramEmailMessage:"",
  instagramEmailCount: 0,
  instagramEmailLoader: false,

  youtubeEmailData: {},
  youtubeEmailMessage:"",
  youtubeEmailCount: 0,
  youtubeEmailLoader: false,

  discoverCategories: [],

  discoverRecipes: {},
  discoverRecipeLoader: false,

  form: {},
};

export const reducer = (state = initialState, action) => {
  const { type, data, params } = action;
  switch (type) {
    /***************** Search instagram by keyword */
    case types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_PENDING: {
      return {
        ...state,
        searchInstagramInfluencerLoader: true,
        searchInstagramTotalInfluencers: 0,
      };
    }
    case types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_SUCCESS: {
      return {
        ...state,
        searchInstagramInfluencerLoader: false,
        searchInstagramInfluencers: data.data,
        searchInstagramTotalInfluencers: data.total,
        searchInstagramCountInfluencers:state.searchInstagramCountInfluencers + 1
      };
    }
    case types.FETCH_SEARCH_INSTAGRAM_INFLUENCER_FAILURE: {
      return {
        ...state,
        searchInstagramInfluencerLoader: false,
      };
    }

    /***************** Search instagram by location */

    case types.FETCH_SEARCH_INSTAGRAM_LOCATION_PENDING: {
      return {
        ...state,
        searchInstagramLocationLoader: true,
        searchInstagramTotalLocation: 0,
      };
    }
    case types.FETCH_SEARCH_INSTAGRAM_LOCATION_SUCCESS: {
      return {
        ...state,
        searchInstagramLocationLoader: false,
        searchInstagramLocation: data.data,
        searchInstagramTotalLocation: data.total,
        searchInstagramCountLocation:state.searchInstagramCountLocation + 1
      };
    }
    case types.FETCH_SEARCH_INSTAGRAM_LOCATION_FAILURE: {
      return {
        ...state,
        searchInstagramLocationLoader: false,
      };
    }

    /***************** Search youtube by keyword */
    case types.FETCH_SEARCH_YOUTUBE_INFLUENCER_PENDING: {
      return {
        ...state,
        searchYoutubeInfluencerLoader: true,
        searchYoutubeTotalInfluencers: 0,
      };
    }
    case types.FETCH_SEARCH_YOUTUBE_INFLUENCER_SUCCESS: {
      return {
        ...state,
        searchYoutubeInfluencerLoader: false,
        searchYoutubeInfluencers: data.data,
        searchYoutubeTotalInfluencers: data.total,
        searchYoutubeCountInfluencers:state.searchYoutubeCountInfluencers + 1
      };
    }
    case types.FETCH_SEARCH_YOUTUBE_INFLUENCER_FAILURE: {
      return {
        ...state,
        searchYoutubeInfluencerLoader: false,
      };
    }

    /***************** Search youtube by location */

    case types.FETCH_SEARCH_YOUTUBE_LOCATION_PENDING: {
      return {
        ...state,
        searchYoutubeLocationLoader: true,
        searchYoutubeTotalLocation: 0,
      };
    }
    case types.FETCH_SEARCH_YOUTUBE_LOCATION_SUCCESS: {
      return {
        ...state,
        searchYoutubeLocationLoader: false,
        searchYoutubeLocation: data.data,
        searchYoutubeTotalLocation: data.total,
        searchYoutubeCountLocation:state.searchYoutubeCountLocation + 1
      };
    }
    case types.FETCH_SEARCH_YOUTUBE_LOCATION_FAILURE: {
      return {
        ...state,
        searchYoutubeLocationLoader: false,
      };
    }

    /***************** Search tiktok by keyword */
    case types.FETCH_SEARCH_TIKTOK_INFLUENCER_PENDING: {
      return {
        ...state,
        searchTiktokInfluencerLoader: true,
        searchTiktokTotalInfluencers: 0,
      };
    }
    case types.FETCH_SEARCH_TIKTOK_INFLUENCER_SUCCESS: {
      return {
        ...state,
        searchTiktokInfluencerLoader: false,
        searchTiktokInfluencers: data.data,
        searchTiktokTotalInfluencers: data.total,
        searchTiktokCountInfluencers:state.searchTiktokCountInfluencers + 1
      };
    }
    case types.FETCH_SEARCH_TIKTOK_INFLUENCER_FAILURE: {
      return {
        ...state,
        searchTiktokInfluencerLoader: false,
      };
    }

    /***************** Search tiktok by location */

    case types.FETCH_SEARCH_TIKTOK_LOCATION_PENDING: {
      return {
        ...state,
        searchTiktokLocationLoader: true,
        searchTiktokTotalLocation: 0,
      };
    }
    case types.FETCH_SEARCH_TIKTOK_LOCATION_SUCCESS: {
      return {
        ...state,
        searchTiktokLocationLoader: false,
        searchTiktokLocation: data.data,
        searchTiktokTotalLocation: data.total,
        searchTiktokCountLocation:state.searchTiktokCountLocation + 1
      };
    }
    case types.FETCH_SEARCH_TIKTOK_LOCATION_FAILURE: {
      return {
        ...state,
        searchTiktokLocationLoader: false,
      };
    }

    /***************** Search instagram engagement calculator */

    case types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_PENDING: {
      return {
        ...state,
        instaEngagementLoader: true,
      };
    }
    case types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_SUCCESS: {
      return {
        ...state,
        instaEngagementLoader: false,
        instaEngagementData: data.data,
        instaEngagementCount:state.instaEngagementCount + 1
      };
    }
    case types.FETCH_INSTAGRAM_ENGAGEMENT_CALCULATOR_FAILURE: {
      return {
        ...state,
        instaEngagementLoader: false,
      };
    }

    /***************** Search tiktok engagement calculator */

    case types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_PENDING: {
      return {
        ...state,
        tiktokEngagementLoader: true,
      };
    }
    case types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_SUCCESS: {
      return {
        ...state,
        tiktokEngagementLoader: false,
        tiktokEngagementData: data.data,
        tiktokEngagementCount:state.tiktokEngagementCount + 1
      };
    }
    case types.FETCH_TIKTOK_ENGAGEMENT_CALCULATOR_FAILURE: {
      return {
        ...state,
        tiktokEngagementLoader: false,
      };
    }
      
      
    /***************** Search tiktok email finder */

    case types.FETCH_TIKTOK_EMAIL_FINDER_PENDING: {
      return {
        ...state,
        tiktokEmailLoader: true,
      };
    }
    case types.FETCH_TIKTOK_EMAIL_FINDER_SUCCESS: {
      return {
        ...state,
        tiktokEmailLoader: false,
        tiktokEmailData: data.data,
        tiktokEmailMessage: data.message,
        tiktokEmailCount:state.tiktokEmailCount + 1
      };
    }
    case types.FETCH_TIKTOK_EMAIL_FINDER_FAILURE: {
      return {
        ...state,
        tiktokEmailLoader: false,
      };
    }
      
    /***************** Search instagram email finder */

    case types.FETCH_INSTAGRAM_EMAIL_FINDER_PENDING: {
      return {
        ...state,
        instagramEmailLoader: true,
      };
    }
    case types.FETCH_INSTAGRAM_EMAIL_FINDER_SUCCESS: {
      return {
        ...state,
        instagramEmailLoader: false,
        instagramEmailData: data.data,
        instagramEmailMessage: data.message,
        instagramEmailCount:state.instagramEmailCount + 1
      };
    }
    case types.FETCH_INSTAGRAM_EMAIL_FINDER_FAILURE: {
      return {
        ...state,
        instagramEmailLoader: false,
      };
    }
      
    /***************** Search youtube email finder */

    case types.FETCH_YOUTUBE_EMAIL_FINDER_PENDING: {
      return {
        ...state,
        youtubeEmailLoader: true,
      };
    }
    case types.FETCH_YOUTUBE_EMAIL_FINDER_SUCCESS: {
      return {
        ...state,
        youtubeEmailLoader: false,
        youtubeEmailData: data.data,
        youtubeEmailMessage: data.message,
        youtubeEmailCount:state.youtubeEmailCount + 1
      };
    }
    case types.FETCH_YOUTUBE_EMAIL_FINDER_FAILURE: {
      return {
        ...state,
        youtubeEmailLoader: false,
      };
    }

    /**************** Discover categories */
    case types.FETCH_DISCOVER_CATEGORY_PENDING: {
      return {
        ...state,
      };
    }
    case types.FETCH_DISCOVER_CATEGORY_SUCCESS: {
      return {
        ...state,
        discoverCategories: data,
      };
    }
    case types.FETCH_DISCOVER_CATEGORY_FAILURE: {
      return {
        ...state,
      };
    }

    /**************** Discover recipe */
    case types.FETCH_DISCOVER_RECIPE_PENDING: {
      return {
        ...state,
        discoverRecipeLoader:true
      };
    }
    case types.FETCH_DISCOVER_RECIPE_SUCCESS: {
      return {
        ...state,
        discoverRecipeLoader:false,
        discoverRecipes: {
          ...state.discoverRecipes,
          [params.category]: data,
        },
      };
    }
    case types.FETCH_DISCOVER_RECIPE_MORE: {
      return {
        ...state,
        discoverRecipeLoader:false,
        discoverRecipes: {
          ...state.discoverRecipes,
          [params.category]: {
            ...state.discoverRecipes[params.category],
            data: state.discoverRecipes[params.category].data.concat(data.data),
            is_more: data.is_more,
          },
        },
      };
    }

    case types.FETCH_DISCOVER_RECIPE_FAILURE: {
      return {
        ...state,
        discoverRecipeLoader:false,
      };
    }

    case types.MARKETING_TOOL_ADD_FORM: {
      return {
        ...state,
        form: data,
      };
    }

    case types.RESET_EMAIL_FINDER:{
      return {
        ...state,
        tiktokEmailMessage:"",
        instagramEmailMessage:"",
        youtubeEmailMessage:"",
      };
    }

    default: {
      return state;
    }
  }
};
//https://html-online.com/editor/
