import {
  HANDLE_FETCH_PALNS_SUCCESS,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_FETCH_BRAND_PALNS_SUCCESS,
  HANDLE_BILLING_TYPE,
  HANDLE_FETCH_PROMOTIONAL_PALNS_SUCCESS,
  HANDLE_DOWN_GRADE_MODAL_HIDE,
  HANDLE_DOWNGRADE_PLAN_SUCCESS,
  HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM,
  HANDLE_RESET_CANCEL_SUBSCRIPTION_FORM,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  promotionalPlans: [],
  monthlyPlans: [],
  yearlyPlans: [],
  amount: "",
  interval: "",
  isFree: false,
  isPromotional: false,
  billingType: false,
  planName: "",
  status: "",
  subscriptionStartAt: "",
  subscriptionEndAt: "",
  isDownGraded: false,
  addOnPlans: [],
  subscription: {},
  cancelSubscription: {
    step: 1,
    cancelReason: "",
    cancelDescription: "",
    cancelClicked: false,
  },
  subscribed: false,
  onGracePeriod: false,
};

const SettingSubscriptionReducer = (state = initialState, action) => {
  if (action.type === HANDLE_FETCH_PALNS_SUCCESS) {
    return {
      ...state,
      monthlyPlans: action.payload.monthlyPlans,
      yearlyPlans: action.payload.yearlyPlans,
    };
  } else if (action.type === HANDLE_FETCH_PROMOTIONAL_PALNS_SUCCESS) {
    return {
      ...state,
      promotionalPlans: action.payload,
    };
  } else if (action.type === HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM) {
    return {
      ...state,
      cancelSubscription: action.payload,
    };
  } else if (action.type === HANDLE_RESET_CANCEL_SUBSCRIPTION_FORM) {
    return {
      ...state,
      cancelSubscription: initialState.cancelSubscription,
    };
  } else if (action.type === HANDLE_FETCH_BRAND_PALNS_SUCCESS) {
    return {
      ...state,
      onGracePeriod: action.payload.onGracePeriod,
      subscribed: action.payload.subscribed,
      monthlyPlans: action.payload.monthlyPlans,
      yearlyPlans: action.payload.yearlyPlans,
      addOnPlans: action.payload.addOnPlans,
      subscription: action.payload.subscription,
      amount: action.payload.subscriptionInfo.amount,
      interval: action.payload.subscriptionInfo.interval,
      billingType:
        action.payload.subscriptionInfo.interval === "year" ? true : false,
      planName: action.payload.subscriptionInfo.name,
      isPromotional: action.payload.subscriptionInfo.isPromotional
        ? true
        : false,
      isFree: action.payload.subscriptionInfo.isFree ? true : false,
      status: action.payload.subscriptionInfo.status,
      subscriptionStartAt: action.payload.subscriptionInfo.subscriptionStartAt,
      subscriptionEndAt: action.payload.subscriptionInfo.subscriptionEndAt,
    };
  } else if (action.type === HANDLE_BILLING_TYPE) {
    return {
      ...state,
      billingType: action.payload,
    };
  } else if (action.type === HANDLE_DOWNGRADE_PLAN_SUCCESS) {
    return {
      ...state,
      isDownGraded: true,
    };
  } else if (action.type === HANDLE_DOWN_GRADE_MODAL_HIDE) {
    return {
      ...state,
      isDownGraded: false,
    };
  } else if (action.type === AJAX_CALL_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === AJAX_CALL_FINSH) {
    return {
      ...state,
      isLoading: false,
    };
  }
  return state;
};

export default SettingSubscriptionReducer;
