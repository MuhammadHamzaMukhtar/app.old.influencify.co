import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";

export const types = {
  FETCH_SAVED_SEARCH_PENDING: "FETCH_SAVED_SEARCH_PENDING",
  FETCH_SAVED_SEARCH_SUCCESS: "FETCH_SAVED_SEARCH_SUCCESS",
  FETCH_SAVED_SEARCH_FAILURE: "FETCH_SAVED_SEARCH_FAILURE",

  SUBMIT_SAVED_SEARCH_PENDING: "SUBMIT_SAVED_SEARCH_PENDING",
  SUBMIT_SAVED_SEARCH_SUCCESS: "SUBMIT_SAVED_SEARCH_SUCCESS",
  SUBMIT_SAVED_SEARCH_FAILURE: "SUBMIT_SAVED_SEARCH_FAILURE",

  UPDATE_SAVED_SEARCH_PENDING: "UPDATE_SAVED_SEARCH_PENDING",
  UPDATE_SAVED_SEARCH_SUCCESS: "UPDATE_SAVED_SEARCH_SUCCESS",
  UPDATE_SAVED_SEARCH_FAILURE: "UPDATE_SAVED_SEARCH_FAILURE",

  DELETE_SAVED_SEARCH_PENDING: "DELETE_SAVED_SEARCH_PENDING",
  DELETE_SAVED_SEARCH_SUCCESS: "DELETE_SAVED_SEARCH_SUCCESS",
  DELETE_SAVED_SEARCH_FAILURE: "DELETE_SAVED_SEARCH_FAILURE",
  
  ADD_SAVED_SEARCH_FORM:"ADD_SAVED_SEARCH_FORM"
};

export const actions = {
    fetchSavedSearch: async (dispatch, data, platform) => {
        dispatch({ type: types.FETCH_SAVED_SEARCH_PENDING });
        const json = await Influencify.savedSearches(data);
        if (json.status === 200) {
            dispatch({ type: types.FETCH_SAVED_SEARCH_SUCCESS, data: json.data, platform:platform });
        } else {
            dispatch({ type: types.FETCH_SAVED_SEARCH_FAILURE, data: json.data  });
        }
    },
    submitSavedSearch: async (dispatch, data, platform) => {
        dispatch({ type: types.SUBMIT_SAVED_SEARCH_PENDING });
        const json = await Influencify.submitSavedSearch(data);
        if (json.status === 200) {
            dispatch({ type: types.SUBMIT_SAVED_SEARCH_SUCCESS, data: json.data, platform: platform });
            toast.success(`Filter saved to ${data.name}`);

        } else {
            dispatch({ type: types.SUBMIT_SAVED_SEARCH_FAILURE, data: json.data });
        }
        return json;
    },
    updateSavedSearch: async (dispatch, data, platform) => {
        dispatch({ type: types.UPDATE_SAVED_SEARCH_PENDING });
        const json = await Influencify.submitSavedSearch(data);
        if (json.status === 200) {
            dispatch({ type: types.UPDATE_SAVED_SEARCH_SUCCESS, data: json.data, platform: platform });
            toast.success(`Filter saved to ${data.name}`);

        } else {
            dispatch({ type: types.UPDATE_SAVED_SEARCH_FAILURE, data: json.data });
        }
        return json;
    },
    deleteSavedSearch: async (dispatch, id, platform) => {
        dispatch({ type: types.DELETE_SAVED_SEARCH_SUCCESS, data: id, platform:platform });
        Influencify.deleteSavedSearch(id);
    },
    addForm: (dispatch, data) => {
        dispatch({ type: types.ADD_SAVED_SEARCH_FORM, data: data });
    }
};

const initialState = {
  form: {},
  isFetching: false,
  isSubmitting: false,
  data: {},
  error:{}
};

export const reducer = (state = initialState, action) => {
  const { type, data, platform } = action;
  switch (type) {
    case types.FETCH_SAVED_SEARCH_PENDING: {
        return {
            ...state,
            isFetching: true,
            error:{}
        };
    }
    case types.FETCH_SAVED_SEARCH_SUCCESS: {
        return {
            ...state,
            isFetching: false,
            error:{},
            data: {
                [platform]:data
            }
        };
    }
    case types.FETCH_SAVED_SEARCH_SUCCESS: {
        return {
            ...state,
            isFetching: false,
            error:data
        };
    }
          
    case types.SUBMIT_SAVED_SEARCH_PENDING: {
        return {
            ...state,
            isSubmitting: true,
            error:{}
        };
    }
    case types.SUBMIT_SAVED_SEARCH_SUCCESS: {
        return {
            ...state,
            isSubmitting: false,
            error:{},
            data: {
                [platform]:state.data[platform].concat([data])
            },
            form:{}
        };
    }
    case types.SUBMIT_SAVED_SEARCH_FAILURE: {
        return {
            ...state,
            isSubmitting: false,
            error:data
        };
    }

    case types.UPDATE_SAVED_SEARCH_PENDING: {
        return {
            ...state,
            isSubmitting: true,
            error:{}
        };
    }
    case types.UPDATE_SAVED_SEARCH_SUCCESS: {
        return {
            ...state,
            isSubmitting: false,
            error:{},
            // data: {
            //     [platform]:state.data[platform].concat([data])
            // },
            form:{}
        };
    }
    case types.UPDATE_SAVED_SEARCH_FAILURE: {
        return {
            ...state,
            isSubmitting: false,
            error:data
        };
    }

    case types.DELETE_SAVED_SEARCH_SUCCESS: {
        const array = state.data[platform].filter(i => i.id !== data);
        return {
            ...state,
            data: {
                [platform]:array
            }
        };
    }
          
    case types.ADD_SAVED_SEARCH_FORM: {
        return {
            ...state,
            form:data
        }
    } 
          
    default: {
      return state;
    }
  }
};