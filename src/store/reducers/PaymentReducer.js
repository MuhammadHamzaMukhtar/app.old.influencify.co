import {FETCH_RANGES, PAYMENT_CHANGE, SERVICE_FEE_CHANGE} from "../actions/PaymentActions";

const initialState = {
    activeTab: "1",
    isLoading: false,
    campaignId: window.sessionStorage.getItem('campaignId'),
    ranges: [],
    budget: 0,
    serviceFee: 0,
    spendable: 0,
    amount: 0,
    limitPerPost: 0,
    waitingTime: 0
};

const PaymentReducer = (state = initialState, action) => {
    if (action.type === FETCH_RANGES) {
        return {
            ...state,
            ranges: action.payload
        };
    } else if (action.type === PAYMENT_CHANGE) {
        return {
            ...state,
            [action.name]: action.value
        }
    } else if (action.type === SERVICE_FEE_CHANGE) {
        return {
            ...state,
            [action.name]: action.budget,
            serviceFee: action.service,
            spendable: action.spendable
        }
    }

    return state;
}

export default PaymentReducer;