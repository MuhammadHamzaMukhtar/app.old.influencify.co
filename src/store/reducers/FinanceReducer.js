import { 
    BRAND_TRANSACTIONS_SUCCESS,
    INFLUENCER_FINANCES_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
} from "../constants/action-types";

const initialState = {
    'isLoading'                 : false,
    'brandTransactions'         : [],
    'allPayments'               : [],
    'pendingPayments'           : [],
    'totalSpending'             : 0.00,
    'subscriptionSpending'      : 0.00,
    'influencerSpending'        : 0.00,
    'influencerEarnings'        : 0.00,
};

const FinanceReducer = (state = initialState, action) => {
    if (action.type === BRAND_TRANSACTIONS_SUCCESS) {
        return {
            ...state,
            brandTransactions       : action.payload.transactions,
            totalSpending           : action.payload.totalSpending,
            subscriptionSpending    : action.payload.subscriptionSpending,
            influencerSpending      : action.payload.influencerSpending,
        };
    }
    if (action.type === INFLUENCER_FINANCES_SUCCESS) {
        return {
            ...state,
            pendingPayments     : action.payload.pendingPayments,
            processingPayments  : action.payload.processingPayments,
            allPayments         : action.payload.allPayments,
            influencerEarnings  : action.payload.earnings,
        };
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } 
    else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    return state;
}

export default FinanceReducer;