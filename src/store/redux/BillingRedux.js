import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";

export const types = {
  SUBMIT_BILLING_REQUEST_PENDING: "SUBMIT_BILLING_REQUEST_PENDING",
  SUBMIT_BILLING_REQUEST_SUCCESS: "SUBMIT_BILLING_REQUEST_SUCCESS",
  SUBMIT_BILLING_REQUEST_FAILURE: "SUBMIT_BILLING_REQUEST_FAILURE",

  FETCH_BILLING_PAYMENT_METHOD_PENDING: "FETCH_BILLING_PAYMENT_METHOD_PENDING",
  FETCH_BILLING_PAYMENT_METHOD_SUCCESS: "FETCH_BILLING_PAYMENT_METHOD_SUCCESS",
  FETCH_BILLING_PAYMENT_METHOD_FAILURE: "FETCH_BILLING_PAYMENT_METHOD_FAILURE",

  FETCH_BILLING_INVOICE_PENDING: "FETCH_BILLING_INVOICE_PENDING",
  FETCH_BILLING_INVOICE_SUCCESS: "FETCH_BILLING_INVOICE_SUCCESS",
  FETCH_BILLING_INVOICE_FAILURE: "FETCH_BILLING_INVOICE_FAILURE",

  FETCH_BILLING_NEXT_PAYMENT_PENDING: "FETCH_BILLING_NEXT_PAYMENT_PENDING",
  FETCH_BILLING_NEXT_PAYMENT_SUCCESS: "FETCH_BILLING_NEXT_PAYMENT_SUCCESS",
  FETCH_BILLING_NEXT_PAYMENT_FAILURE: "FETCH_BILLING_NEXT_PAYMENT_FAILURE",

  SET_BILLING_DEFAULT_PAYMENT_PENDING: "SET_BILLING_DEFAULT_PAYMENT_PENDING",
  SET_BILLING_DEFAULT_PAYMENT_SUCCESS: "SET_BILLING_DEFAULT_PAYMENT_SUCCESS",

  DELETE_BILLING_PAYMENT_PENDING: "DELETE_BILLING_PAYMENT_PENDING",
  DELETE_BILLING_PAYMENT_SUCCESS: "DELETE_BILLING_PAYMENT_SUCCESS",

  CANCEL_BILLING_SUBSCRIPTION_PENDING: "CANCEL_BILLING_SUBSCRIPTION_PENDING",
  CANCEL_BILLING_SUBSCRIPTION_SUCCESS: "CANCEL_BILLING_SUBSCRIPTION_SUCCESS",

  DOWNLOAD_BILLING_RECEIPT_PENDING: "DOWNLOAD_BILLING_RECEIPT_PENDING",
  DOWNLOAD_BILLING_RECEIPT_SUCCESS: "DOWNLOAD_BILLING_RECEIPT_SUCCESS",

  FETCH_BILLING_CHARGE_PENDING: "FETCH_BILLING_CHARGE_PENDING",
  FETCH_BILLING_CHARGE_SUCCESS: "FETCH_BILLING_CHARGE_SUCCESS",
  FETCH_BILLING_CHARGE_FAILURE: "FETCH_BILLING_CHARGE_FAILURE",

  APPLY_SUBSCRIPTION_DISCOUNT_PENDING: "APPLY_SUBSCRIPTION_DISCOUNT_PENDING",
  APPLY_SUBSCRIPTION_DISCOUNT_SUCCESS: "APPLY_SUBSCRIPTION_DISCOUNT_SUCCESS",
};

export const actions = {
  subscribe: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_BILLING_REQUEST_PENDING, id: data?.id });
    const json = await Influencify.billingSubscribe(data);
    if (json.status === 200) {
      dispatch({
        type: types.SUBMIT_BILLING_REQUEST_SUCCESS,
        data: json.data,
        id: data?.id,
      });
      if (json.data?.url) {
        window.location.href = json.data?.url;
      }
    } else {
      toast.error(json.data?.message);
      dispatch({
        type: types.SUBMIT_BILLING_REQUEST_FAILURE,
        data: json.data,
        id: data?.id,
      });
    }
    return json;
  },
  fetchPaymentMethod: async (dispatch) => {
    dispatch({ type: types.FETCH_BILLING_PAYMENT_METHOD_PENDING });
    const json = await Influencify.fetchPaymentMethod();
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BILLING_PAYMENT_METHOD_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_BILLING_PAYMENT_METHOD_FAILURE,
        data: json.data,
      });
    }
    return json;
  },
  fetchInvoices: async (dispatch, data = {}) => {
    dispatch({ type: types.FETCH_BILLING_INVOICE_PENDING });
    const json = await Influencify.fetchInvoices(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BILLING_INVOICE_SUCCESS,
        data: json.data,
        id: data,
      });
    } else {
      dispatch({
        type: types.FETCH_BILLING_INVOICE_FAILURE,
        data: json.data,
      });
    }
    return json;
  },

  fetchCharges: async (dispatch, data = {}) => {
    dispatch({ type: types.FETCH_BILLING_CHARGE_PENDING });
    const json = await Influencify.fetchCharges(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BILLING_CHARGE_SUCCESS,
        data: json.data,
        id: data,
      });
    } else {
      dispatch({
        type: types.FETCH_BILLING_CHARGE_FAILURE,
        data: json.data,
      });
    }
    return json;
  },

  fetchNextPayment: async (dispatch) => {
    dispatch({ type: types.FETCH_BILLING_NEXT_PAYMENT_PENDING });
    const json = await Influencify.fetchNextPayment();
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_BILLING_NEXT_PAYMENT_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_BILLING_NEXT_PAYMENT_FAILURE,
        data: json.data,
      });
    }
    return json;
  },

  setDefaultPayment: async (dispatch, data) => {
    dispatch({ type: types.SET_BILLING_DEFAULT_PAYMENT_PENDING, id: data?.id });
    const json = await Influencify.setDefaultPayment(data);
    dispatch({ type: types.SET_BILLING_DEFAULT_PAYMENT_SUCCESS, id: data?.id });
    return json;
  },

  deletePaymentMethod: async (dispatch, data) => {
    dispatch({ type: types.DELETE_BILLING_PAYMENT_PENDING, id: data?.id });
    const json = await Influencify.deletePaymentMethod(data);
    dispatch({ type: types.DELETE_BILLING_PAYMENT_SUCCESS, id: data?.id });
    return json;
  },

  cancelSubscription: async (dispatch, data) => {
    dispatch({ type: types.CANCEL_BILLING_SUBSCRIPTION_PENDING });
    const json = await Influencify.cancelSubscription(data);
    dispatch({ type: types.CANCEL_BILLING_SUBSCRIPTION_SUCCESS });
    return json;
  },

  updateSubscription: async (dispatch, data) => {
    dispatch({ type: types.APPLY_SUBSCRIPTION_DISCOUNT_PENDING });
    const json = await Influencify.updateUserSubscription(data);
    dispatch({ type: types.APPLY_SUBSCRIPTION_DISCOUNT_SUCCESS });
    return json;
  },

  resumeSubscription: async (dispatch, data) => {
    dispatch({ type: types.CANCEL_BILLING_SUBSCRIPTION_PENDING });
    const json = await Influencify.resumeSubscription(data);
    dispatch({ type: types.CANCEL_BILLING_SUBSCRIPTION_SUCCESS });
    return json;
  },

  downloadInvoice: async (dispatch, data) => {
    dispatch({ type: types.DOWNLOAD_BILLING_RECEIPT_PENDING, id: data?.id });
    const json = await Influencify.fetchDownloadInvoice(data);
    dispatch({ type: types.DOWNLOAD_BILLING_RECEIPT_SUCCESS, id: data?.id });
    return json;
  },
};

const initialState = {
  loader: {},
  defaultLoader: {},
  downloadLoader: {},
  deleteLoader: {},
  paymentMethods: [],
  defaultPaymentMethod: {},
  invoices: {},
  payment: {},
  canncelLoading: false,
  chargeLoading: false,
  discountLoading: false,
  charges: {},
};

export const reducer = (state = initialState, action) => {
  const { type, data, params, id } = action;
  switch (type) {
    case types.SUBMIT_BILLING_REQUEST_PENDING: {
      return {
        ...state,
        loader: {
          ...state.loader,
          [id]: true,
        },
      };
    }

    case types.SUBMIT_BILLING_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: {
          ...state.loader,
          [id]: false,
        },
      };
    }

    case types.SUBMIT_BILLING_REQUEST_FAILURE: {
      return {
        ...state,
        loader: {
          ...state.loader,
          [id]: false,
        },
      };
    }

    case types.FETCH_BILLING_PAYMENT_METHOD_PENDING: {
      return {
        ...state,
        paymentLoading: true,
      };
    }

    case types.FETCH_BILLING_PAYMENT_METHOD_SUCCESS: {
      return {
        ...state,
        paymentLoading: false,
        paymentMethods: data?.paymentMethods,
        defaultPaymentMethod: data?.defaultPaymentMethod,
      };
    }

    case types.FETCH_BILLING_PAYMENT_METHOD_FAILURE: {
      return {
        ...state,
        paymentLoading: false,
      };
    }

    case types.APPLY_SUBSCRIPTION_DISCOUNT_PENDING: {
      return {
        ...state,
        discountLoading: true,
      };
    }

    case types.APPLY_SUBSCRIPTION_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountLoading: false,
      };
    }

    case types.FETCH_BILLING_INVOICE_PENDING: {
      return {
        ...state,
        paymentLoading: true,
      };
    }

    case types.FETCH_BILLING_INVOICE_SUCCESS: {
      return {
        ...state,
        paymentLoading: false,
        invoices: {
          ...state.invoices,
          data: id?.next_page
            ? state.invoices.data.concat(data.data)
            : data.data,
          has_more: data.has_more,
          next_page: data.next_page,
          total_count: data.total_count,
        },
      };
    }

    case types.FETCH_BILLING_INVOICE_FAILURE: {
      return {
        ...state,
        paymentLoading: false,
      };
    }

    /** Chargges */

    case types.FETCH_BILLING_CHARGE_PENDING: {
      return {
        ...state,
        chargeLoading: true,
      };
    }

    case types.FETCH_BILLING_CHARGE_SUCCESS: {
      return {
        ...state,
        chargeLoading: false,
        charges: {
          ...state.charges,
          data: id?.next_page
            ? state.charges.data.concat(data.data)
            : data.data,
          has_more: data.has_more,
          next_page: data.next_page,
          total_count: data.total_count,
        },
      };
    }

    case types.FETCH_BILLING_CHARGE_FAILURE: {
      return {
        ...state,
        chargeLoading: false,
      };
    }

    /** billinng Cycle */

    case types.FETCH_BILLING_NEXT_PAYMENT_PENDING: {
      return {
        ...state,
        paymentLoading: true,
      };
    }

    case types.FETCH_BILLING_NEXT_PAYMENT_SUCCESS: {
      return {
        ...state,
        paymentLoading: false,
        payment: data,
      };
    }

    case types.FETCH_BILLING_NEXT_PAYMENT_FAILURE: {
      return {
        ...state,
        paymentLoading: false,
      };
    }

    /** Default payment set */

    case types.SET_BILLING_DEFAULT_PAYMENT_PENDING: {
      return {
        ...state,
        defaultLoader: {
          ...state.defaultLoader,
          [id]: true,
        },
      };
    }

    case types.SET_BILLING_DEFAULT_PAYMENT_SUCCESS: {
      return {
        ...state,
        defaultLoader: {
          ...state.defaultLoader,
          [id]: false,
        },
      };
    }

    /** Delete Payment Method */

    case types.DELETE_BILLING_PAYMENT_PENDING: {
      return {
        ...state,
        deleteLoader: {
          ...state.deleteLoader,
          [id]: true,
        },
      };
    }

    case types.DELETE_BILLING_PAYMENT_SUCCESS: {
      return {
        ...state,
        deleteLoader: {
          ...state.deleteLoader,
          [id]: false,
        },
      };
    }

    /** Cancel Subscription */

    case types.CANCEL_BILLING_SUBSCRIPTION_PENDING: {
      return {
        ...state,
        canncelLoading: true,
      };
    }

    case types.CANCEL_BILLING_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        canncelLoading: false,
      };
    }

    case types.DOWNLOAD_BILLING_RECEIPT_PENDING: {
      return {
        ...state,
        downloadLoader: {
          ...state.downloadLoader,
          [id]: true,
        },
      };
    }

    case types.DOWNLOAD_BILLING_RECEIPT_SUCCESS: {
      return {
        ...state,
        downloadLoader: {
          ...state.downloadLoader,
          [id]: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};
