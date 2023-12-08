import Influencify from "../../constants/Influencify";

import { 
  HANDLE_RESPONSE_SUCCESS_FALSE,
  HANDLE_CLOSE_ERROR_MODAL
} from "../constants/action-types";

export const actions = {
  sendErrorBoundaryException: async (data) => {
    await Influencify.sendErrorBoundaryException(data);
  },
}

const initialState = {
  is_show_modal               : false,
  error_obj                   : {},
};

export const reducer = (state = initialState, action) => {
  const { type, data} = action;
  switch (type) {
    case HANDLE_RESPONSE_SUCCESS_FALSE:{
      return {
        ...state,
        is_show_modal : true,
        error_obj     : data  
      }
    }
    case HANDLE_CLOSE_ERROR_MODAL:{
      return {
        ...state,
        is_show_modal : false,
        error_obj     : {},
      }
    }
    default: {
      return state;
    }
  }
}



