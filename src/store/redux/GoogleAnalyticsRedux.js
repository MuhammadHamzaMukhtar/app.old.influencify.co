import Influencify from "../../constants/Influencify";
export const types = {
  FETCH_GOOGLE_ANALYTICS_STATUS_PENDING: 'FETCH_GOOGLE_ANALYTICS_STATUS_PENDING',
  FETCH_GOOGLE_ANALYTICS_STATUS_SUCCESS: 'FETCH_GOOGLE_ANALYTICS_STATUS_SUCCESS',
    FETCH_GOOGLE_ANALYTICS_STATUS_FAILURE: 'FETCH_GOOGLE_ANALYTICS_STATUS_FAILURE',
  
  FETCH_GOOGLE_ANALYTICS_SUMMARY_PENDING: 'FETCH_GOOGLE_ANALYTICS_SUMMARY_PENDING',
  FETCH_GOOGLE_ANALYTICS_SUMMARY_SUCCESS: 'FETCH_GOOGLE_ANALYTICS_SUMMARY_SUCCESS',
  FETCH_GOOGLE_ANALYTICS_SUMMARY_FAILURE: 'FETCH_GOOGLE_ANALYTICS_SUMMARY_FAILURE',
};

export const actions = {
  fetchGoogleAnalyticsStatus: async (dispatch) => {
    dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_STATUS_PENDING});
        const json = await Influencify.googleAnalyticsStatus();
        if (json !== undefined) {
            if (json.status === 200) {
                dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_STATUS_SUCCESS, data:json.data});
            } else {
                dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_STATUS_FAILURE});
            }
        }
        return json;
    },
    fetchGoogleAnalyticsSummary: async (dispatch) => {
    dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_SUMMARY_PENDING});
        const json = await Influencify.googleAnalyticsSummary();
        if (json !== undefined) {
            if (json.status === 200) {
                dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_SUMMARY_SUCCESS, data:json.data});
            } else {
                dispatch({ type: types.FETCH_GOOGLE_ANALYTICS_SUMMARY_FAILURE});
            }
        }
        return json
  },
};

const initialState = {
    loader: false,
    gaStatus: {},
    data:[]
  
};

export const reducer = (state = initialState, action) => {
  const { type, data} = action;
  switch (type) {
    case types.FETCH_GOOGLE_ANALYTICS_STATUS_PENDING:{
      return {
        ...state,
        loader      : true,
      }
    }
    case types.FETCH_GOOGLE_ANALYTICS_STATUS_SUCCESS:{
      return {
        ...state,
        loader      : false,
        gaStatus       : data,
      }
    }
    case types.FETCH_GOOGLE_ANALYTICS_STATUS_FAILURE:{
      return {
        ...state,
        loader : false,
      }
      }
          
          
    case types.FETCH_GOOGLE_ANALYTICS_SUMMARY_PENDING:{
      return {
        ...state,
        loader      : true,
      }
    }
    case types.FETCH_GOOGLE_ANALYTICS_SUMMARY_SUCCESS:{
      return {
        ...state,
        loader      : false,
        data       : data,
      }
    }
    case types.FETCH_GOOGLE_ANALYTICS_SUMMARY_FAILURE:{
      return {
        ...state,
        loader : false,
      }
    }
    default: {
      return state;
    }
  }
}



