import * as types from "../actions/TypeActions";
// import { HANDLE_SELECT_TYPE_SUCCESS } from "../constants/action-types";
const initialState = {
    typeItems: [],
};

const TypeReducer = (state = initialState, action) => {
    if (action.type === types.FETCH_TYPES_SUCCESS) {
        return {
            ...state,
            typeItems: action.payload
        };
    }else {
        return state;
    }
}

export default TypeReducer;