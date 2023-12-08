import * as types from "../actions/TimingActions";

const initialState = {
    postingPeriod       : '0',
    applicationFrom     : new Date(),
    applicationTo       : new Date(),
    postingFrom         : new Date(),
    postingTo           : new Date()
};

const TimingReducer = (state = initialState, action) => {
    if (action.type === types.DATE_CHANGE_HANDLER) {
        return {
            ...state,
            [action.name]: action.value
        };
    }
    return state;
}

export default TimingReducer;