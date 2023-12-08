import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";
import {refreshReports} from "../actions/HeaderActions";

export const types = {
  FETCH_INFLUENCIAL_MENTION_PENDING : 'FETCH_INFLUENCIAL_MENTION_PENDING',
  FETCH_INFLUENCIAL_MENTION_SUCCESS : 'FETCH_INFLUENCIAL_MENTION_SUCCESS',
  FETCH_INFLUENCIAL_MENTION_FAILURE : 'FETCH_INFLUENCIAL_MENTION_FAILURE',
};

export const actions = {
    fetchInfluencialMention: async (dispatch, data) => {
        dispatch({type:types.FETCH_INFLUENCIAL_MENTION_PENDING, param:data});     
        const json = await Influencify.fetchInfluencialMention(data);
        if (json !== undefined) {
            if (json.data.success) {
                dispatch({ type: types.FETCH_INFLUENCIAL_MENTION_SUCCESS, data: json.data, param: data });
                dispatch(refreshReports());
            } else {
                dispatch({ type: types.FETCH_INFLUENCIAL_MENTION_FAILURE });
                toast.error(json.data.error_message);
            }
        }
        return json;
  }
};

const initialState = {
    data: [],
    isFetching: false,
    total: 0,
    page:0
};

export const reducer = (state = initialState, action) => {
    const { type, data, param } = action;
    switch (type) {
        case types.FETCH_INFLUENCIAL_MENTION_PENDING: {
            let page = param.payload.paging.skip;
            return {
                ...state,
                isFetching: true,
                page:page
            }
        }
        
        case types.FETCH_INFLUENCIAL_MENTION_FAILURE: {
            return {
                ...state,
                isFetching: false,
            }
        }
            
        case types.FETCH_INFLUENCIAL_MENTION_SUCCESS: {
            let page = param.payload.paging.skip;
            return {
                ...state,
                isFetching: false,
                data:page>1? state.data.concat(data.accounts):data.accounts,
                total: data.total,
                page:page
            }
        }

        default: {
            return state;
        }
          
    }
}



