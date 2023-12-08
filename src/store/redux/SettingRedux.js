import Influencify from "../../constants/Influencify";

export const types = {
  FETCH_USAGE_CREDIT_HISTORY_PENDING: "FETCH_USAGE_CREDIT_HISTORY_PENDING",
  FETCH_USAGE_CREDIT_HISTORY_SUCCESS: "FETCH_USAGE_CREDIT_HISTORY_SUCCESS",
  FETCH_USAGE_CREDIT_HISTORY_MORE: "FETCH_USAGE_CREDIT_HISTORY_MORE",
  FETCH_USAGE_CREDIT_HISTORY_FAILURE: "FETCH_USAGE_CREDIT_HISTORY_FAILURE",
  
  FETCH_ACCOUNT_HISTORY_PENDING: "FETCH_ACCOUNT_HISTORY_PENDING",
  FETCH_ACCOUNT_HISTORY_SUCCESS: "FETCH_ACCOUNT_HISTORY_SUCCESS",
  FETCH_ACCOUNT_HISTORY_MORE: "FETCH_ACCOUNT_HISTORY_MORE",
  FETCH_ACCOUNT_HISTORY_FAILURE: "FETCH_ACCOUNT_HISTORY_FAILURE",
};

export const actions = {
    fetchUsageCreditHistory: async (dispatch, page, params) => {
        dispatch({ type: types.FETCH_USAGE_CREDIT_HISTORY_PENDING });
        const json = await Influencify.fetchUsageCreditHistory(page, params);
        if (json.status === 200) {
            if (page > 1) {
                dispatch({ type: types.FETCH_USAGE_CREDIT_HISTORY_MORE, data: json.data });
            } else {
                dispatch({ type: types.FETCH_USAGE_CREDIT_HISTORY_SUCCESS, data: json.data });
            }
        } else {
            dispatch({ type: types.FETCH_USAGE_CREDIT_HISTORY_FAILURE });
        }
    },

    fetchAccountHistory: async (dispatch, page, params) => {
        dispatch({ type: types.FETCH_ACCOUNT_HISTORY_PENDING });
        const json = await Influencify.fetchAccountHistory(page, params);
        if (json.status === 200) {
            if (page > 1) {
                dispatch({ type: types.FETCH_ACCOUNT_HISTORY_MORE, data: json.data });
            } else {
                dispatch({ type: types.FETCH_ACCOUNT_HISTORY_SUCCESS, data: json.data });
            }
        } else {
            dispatch({ type: types.FETCH_ACCOUNT_HISTORY_FAILURE });
        }
    },
};

const initialState = {
  isFetching: false,
  creditHistory: [],
  totalCreditHistory: 0,
  hasMoreCreditHistory: false,
  totalCreditUsed: 0,
  
  
  isAccoutFetching: false,
  accountHistory: [],
  totalAccountHistory: 0,
  hasMoreAccountHistory:false
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.FETCH_USAGE_CREDIT_HISTORY_PENDING: {
        return {
            ...state,
            isFetching: true,
        };
    }
    case types.FETCH_USAGE_CREDIT_HISTORY_SUCCESS: {
        return {
            ...state,
            isFetching: false,
            creditHistory: data.data,
            hasMoreCreditHistory: data.has_more,
            totalCreditHistory: data.total,
            totalCreditUsed:data.total_credits
        };
    }
    case types.FETCH_USAGE_CREDIT_HISTORY_MORE: {
        return {
            ...state,
            isFetching: false,
            creditHistory: state.creditHistory.concat(data.data),
            hasMoreCreditHistory: data.has_more,
            totalCreditHistory: data.total,
            totalCreditUsed:data.total_credits
        };
    }
    case types.FETCH_USAGE_CREDIT_HISTORY_FAILURE: {
        return {
            ...state,
            isFetching: false,
        };
    }
          
          
    case types.FETCH_ACCOUNT_HISTORY_PENDING: {
        return {
            ...state,
            isAccoutFetching: true,
        };
    }
    case types.FETCH_ACCOUNT_HISTORY_SUCCESS: {
        return {
            ...state,
            isAccoutFetching: false,
            accountHistory: data.data,
            hasMoreAccountHistory: data.has_more,
            totalAccountHistory:data.total
        };
    }
    case types.FETCH_ACCOUNT_HISTORY_MORE: {
        return {
            ...state,
            isAccoutFetching: false,
            accountHistory: state.accountHistory.concat(data.data),
            hasMoreAccountHistory: data.has_more,
            totalAccountHistory:data.total
        };
    }
    case types.FETCH_ACCOUNT_HISTORY_FAILURE: {
        return {
            ...state,
            isAccoutFetching: false,
        };
    }
          
    
          
    default: {
      return state;
    }
  }
};