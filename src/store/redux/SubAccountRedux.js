import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";
import { refreshReports } from "../actions/HeaderActions";
export const types = {
  ADD_SUB_ACCOUNT_FORM: "ADD_SUB_ACCOUNT_FORM",

  FETCH_SUB_ACCOUNT_PENDING: "FETCH_SUB_ACCOUNT_PENDING",
  FETCH_SUB_ACCOUNT_SUCCESS: "FETCH_SUB_ACCOUNT_SUCCESS",
  FETCH_SUB_ACCOUNT_FAILURE: "FETCH_SUB_ACCOUNT_FAILURE",

  SUBMIT_SUB_ACCOUNT_PENDING: "SUBMIT_SUB_ACCOUNT_PENDING",
  SUBMIT_SUB_ACCOUNT_SUCCESS: "SUBMIT_SUB_ACCOUNT_SUCCESS",
  SUBMIT_SUB_ACCOUNT_FAILURE: "SUBMIT_SUB_ACCOUNT_FAILURE",

  DELETE_SUB_ACCOUNT_PENDING: "DELETE_SUB_ACCOUNT_PENDING",
  DELETE_SUB_ACCOUNT_SUCCESS: "DELETE_SUB_ACCOUNT_SUCCESS",
  DELETE_SUB_ACCOUNT_FAILURE: "DELETE_SUB_ACCOUNT_FAILURE",

  UPDATE_SUB_ACCOUNT_VALUE_PENDING: "UPDATE_SUB_ACCOUNT_VALUE_PENDING",
  UPDATE_SUB_ACCOUNT_VALUE_SUCCESS: "UPDATE_SUB_ACCOUNT_VALUE_SUCCESS",
  UPDATE_SUB_ACCOUNT_VALUE_FAILURE: "UPDATE_SUB_ACCOUNT_VALUE_FAILURE",

  SEND_SUB_ACCOUNT_INVITATION_PENDING: "SEND_SUB_ACCOUNT_INVITATION_PENDING",
  SEND_SUB_ACCOUNT_INVITATION_SUCCESS: "SEND_SUB_ACCOUNT_INVITATION_SUCCESS",
  SEND_SUB_ACCOUNT_INVITATION_FAILURE: "SEND_SUB_ACCOUNT_INVITATION_FAILURE",

  REMOVE_SUB_ACCOUNT_USER: "REMOVE_SUB_ACCOUNT_USER",

  FETCH_SUB_ACCOUNT_INVITATION_PENDING: "FETCH_SUB_ACCOUNT_INVITATION_PENDING",
  FETCH_SUB_ACCOUNT_INVITATION_SUCCESS: "FETCH_SUB_ACCOUNT_INVITATION_SUCCESS",
  FETCH_SUB_ACCOUNT_INVITATION_FAILURE: "FETCH_SUB_ACCOUNT_INVITATION_FAILURE",

  ACCEPT_SUB_ACCOUNT_INVITATION_PENDING:
    "ACCEPT_SUB_ACCOUNT_INVITATION_PENDING",
  ACCEPT_SUB_ACCOUNT_INVITATION_SUCCESS:
    "ACCEPT_SUB_ACCOUNT_INVITATION_SUCCESS",

  REJECT_SUB_ACCOUNT_INVITATION_PENDING:
    "REJECT_SUB_ACCOUNT_INVITATION_PENDING",
  REJECT_SUB_ACCOUNT_INVITATION_SUCCESS:
    "REJECT_SUB_ACCOUNT_INVITATION_SUCCESS",

  FETCH_INFLUENCER_SUB_ACCOUNT_PENDING: "FETCH_INFLUENCER_SUB_ACCOUNT_PENDING",
  FETCH_INFLUENCER_SUB_ACCOUNT_SUCCESS: "FETCH_INFLUENCER_SUB_ACCOUNT_SUCCESS",
  FETCH_INFLUENCER_SUB_ACCOUNT_FAILURE: "FETCH_INFLUENCER_SUB_ACCOUNT_FAILURE",
};

export const actions = {
  fetchSubAccount: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SUB_ACCOUNT_PENDING });
    const json = await Influencify.fetchSubAccount(data);

    if (json && json.status === 200) {
      dispatch({
        type: types.FETCH_SUB_ACCOUNT_SUCCESS,
        data: json && json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SUB_ACCOUNT_FAILURE,
        data: json && json.data,
      });
    }
  },
  fetchInvitation: async (dispatch, data) => {
    dispatch({ type: types.FETCH_SUB_ACCOUNT_INVITATION_PENDING });
    const json = await Influencify.fetchSubAccountInvitation(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_SUB_ACCOUNT_INVITATION_SUCCESS,
        data: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_SUB_ACCOUNT_INVITATION_FAILURE,
        data: json.data,
      });
    }
  },
  submitSubAccount: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_SUB_ACCOUNT_PENDING });
    const json = await Influencify.submitSubAccount(data);
    if (json.status === 200) {
      toast.success("Sub account successfully created.");
      dispatch({ type: types.SUBMIT_SUB_ACCOUNT_SUCCESS, data: json.data });
      dispatch(refreshReports());
    } else {
      dispatch({ type: types.SUBMIT_SUB_ACCOUNT_FAILURE, data: json.data });
    }
    return json;
  },
  sendSubAccountInvitation: async (dispatch, data) => {
    dispatch({ type: types.SEND_SUB_ACCOUNT_INVITATION_PENDING });
    const json = await Influencify.sendSubAccountInvitation(data);
    if (json.status === 200) {
      dispatch({
        type: types.SEND_SUB_ACCOUNT_INVITATION_SUCCESS,
        data: json.data,
      });
      toast.success(json.data.message);
    } else {
      dispatch({
        type: types.SEND_SUB_ACCOUNT_INVITATION_FAILURE,
        data: json.data,
      });
    }
    return json;
  },
  deleteSubAccount: async (dispatch, id) => {
    dispatch({ type: types.DELETE_SUB_ACCOUNT_PENDING });
    const json = await Influencify.deleteSubAccount(id);
    if (json.status === 200) {
      dispatch({ type: types.DELETE_SUB_ACCOUNT_SUCCESS, data: id });
      dispatch(refreshReports());
    } else {
      toast.error(json.data.message);
      dispatch({ type: types.DELETE_SUB_ACCOUNT_FAILURE, data: {} });
    }
    return json;
  },
  addForm: (dispatch, data) => {
    dispatch({ type: types.ADD_SUB_ACCOUNT_FORM, data: data });
  },
  updateSubAccountData: async (dispatch, data) => {
    dispatch({ type: types.UPDATE_SUB_ACCOUNT_VALUE_PENDING, data: data });
    const json = await Influencify.updateSubAccount(data);
    if (json.status === 200) {
      toast.success(json.data.message)
      dispatch({ type: types.UPDATE_SUB_ACCOUNT_VALUE_SUCCESS, data: data });
      dispatch(refreshReports());
    } else {
      toast.error(json.data.message);
      dispatch({ type: types.UPDATE_SUB_ACCOUNT_VALUE_FAILURE, data: data });
    }
  },
  removeSubAccountUser: (dispatch, data) => {
    dispatch({ type: types.REMOVE_SUB_ACCOUNT_USER, data: data });
    Influencify.deleteSubAccountInvitation(data);
  },
  switchBrandAccount: async (dispatch, data) => {
    const json = await Influencify.switchBrandAccount(data);
    if (json.status === 200) {
      dispatch({
        type: "HANDLE_LOGIN_SUBMIT",
        payload: json.data,
      });
    }
  },
  switchInfluencerAccount: async (dispatch, data) => {
    const json = await Influencify.switchBrandAccount(data);
    if (json.status === 200) {
      dispatch({
        type: "HANDLE_LOGIN_SUBMIT",
        payload: json.data,
      });
    }
  },
  acceptInvitation: async (dispatch, data) => {
    dispatch({ type: types.ACCEPT_SUB_ACCOUNT_INVITATION_PENDING });
    const json = await Influencify.acceptSubAccountInvitation(data);
    if (json.status === 200) {
      dispatch({
        type: types.ACCEPT_SUB_ACCOUNT_INVITATION_SUCCESS,
        data: data,
      });
    }
    return json;
  },
  rejectInvitation: async (dispatch, data) => {
    dispatch({ type: types.REJECT_SUB_ACCOUNT_INVITATION_PENDING });
    const json = await Influencify.rejectSubAccountInvitation(data);
    if (json.status === 200) {
      dispatch({
        type: types.REJECT_SUB_ACCOUNT_INVITATION_SUCCESS,
        data: data,
      });
    }
  },
  fetchInfluencerSubAccount: async (dispatch, data) => {
    dispatch({ type: types.FETCH_INFLUENCER_SUB_ACCOUNT_PENDING });
    const json = await Influencify.connectedPlatformUsers(data);
    if (json && json.status === 200) {
      dispatch({
        type: types.FETCH_INFLUENCER_SUB_ACCOUNT_SUCCESS,
        data: json && json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_INFLUENCER_SUB_ACCOUNT_FAILURE,
        data: json && json.data,
      });
    }
  },
};

const initialState = {
  form: {},
  isFetching: false,
  isSubmitting: false,
  data: [],
  error: {},
  isSending: false,
  invitationError: {},
  updateProcess: {},
  isFetchingInvitation: false,
  totalInvitation: 0,
  invitation: [],
  isProcessInvitation: false,
  influencerSubAccounts: [],
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.FETCH_SUB_ACCOUNT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: {},
      };
    }
    case types.FETCH_SUB_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: {},
        main: data && data.main_account,
        data: data && data.sub_account,
      };
    }
    case types.FETCH_SUB_ACCOUNT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: data,
      };
    }

    case types.SUBMIT_SUB_ACCOUNT_PENDING: {
      return {
        ...state,
        isSubmitting: true,
        error: {},
      };
    }
    case types.SUBMIT_SUB_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
        error: {},
        data: state.data.concat([data]),
        form: {},
      };
    }
    case types.SUBMIT_SUB_ACCOUNT_FAILURE: {
      return {
        ...state,
        isSubmitting: false,
        error: data,
      };
    }

    case types.DELETE_SUB_ACCOUNT_PENDING: {
      return {
        ...state,
        isSubmitting: true,
        error: {},
      };
    }
    case types.DELETE_SUB_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
        error: {},
        data: state.data.filter(i => i.id !== data),
      };
    }
    case types.DELETE_SUB_ACCOUNT_FAILURE: {
      return {
        ...state,
        isSubmitting: false,
        error: data,
      };
    }

    case types.UPDATE_SUB_ACCOUNT_VALUE_PENDING: {
      return {
        ...state,
        updateProcess: { [data.id]: true },
      };
    }

    case types.UPDATE_SUB_ACCOUNT_VALUE_SUCCESS: {
      const newData = [...state.data];
      newData[data.index][data.key] = {
        ...newData[data.index][data.key],
        credits: data.value,
      };
      return {
        ...state,
        data: newData,
        // updateProcess: false,
        updateProcess: { [data.id]: false },
      };
    }

    case types.UPDATE_SUB_ACCOUNT_VALUE_FAILURE: {
      return {
        ...state,
        // updateProcess: false,
        updateProcess: { [data.id]: false },
      };
    }

    case types.ADD_SUB_ACCOUNT_FORM: {
      return {
        ...state,
        form: data,
      };
    }

    case types.SEND_SUB_ACCOUNT_INVITATION_PENDING: {
      return {
        ...state,
        isSending: true,
        invitationError: {},
      };
    }

    case types.SEND_SUB_ACCOUNT_INVITATION_SUCCESS: {
      const newData = [...state.data];
      const mainData = { ...state.main };
      const index = newData.findIndex(i => i.id === data.data.sub_account_id);
      if (index > -1) {
        newData[index]["users"].push(data.data);
      } else {
        mainData["users"].push(data.data);
      }

      return {
        ...state,
        isSending: false,
        form: {},
        invitationError: {},
        data: newData,
      };
    }
    case types.SEND_SUB_ACCOUNT_INVITATION_FAILURE: {
      return {
        ...state,
        isSending: false,
        invitationError: data,
      };
    }

    case types.REMOVE_SUB_ACCOUNT_USER: {
      const newData = [...state.data];
      const mainData = { ...state.main };
      if (typeof data.index !== "undefined") {
        newData[data.index][data.key] = newData[data.index][data.key].filter(
          i => i.email !== data.email
        );
      } else {
        mainData[data.key] = mainData[data.key].filter(
          i => i.email !== data.email
        );
      }

      return {
        ...state,
        data: newData,
        main: mainData,
      };
    }

    case types.FETCH_SUB_ACCOUNT_INVITATION_PENDING: {
      return {
        ...state,
        isFetchingInvitation: true,
      };
    }
    case types.FETCH_SUB_ACCOUNT_INVITATION_SUCCESS: {
      return {
        ...state,
        isFetchingInvitation: false,
        invitation: data,
      };
    }
    case types.FETCH_SUB_ACCOUNT_INVITATION_FAILURE: {
      return {
        ...state,
        isFetchingInvitation: false,
      };
    }

    case types.ACCEPT_SUB_ACCOUNT_INVITATION_PENDING: {
      return {
        ...state,
        isProcessInvitation: true,
      };
    }

    case types.ACCEPT_SUB_ACCOUNT_INVITATION_SUCCESS: {
      const newData = [...state.invitation];
      const index = newData.findIndex(i => i.id === data.id);
      if (index > -1) {
        newData[index]["status"] = 1;
      }
      return {
        ...state,
        isProcessInvitation: false,
        invitation: newData,
      };
    }

    case types.REJECT_SUB_ACCOUNT_INVITATION_PENDING: {
      return {
        ...state,
        isProcessInvitation: true,
      };
    }

    case types.REJECT_SUB_ACCOUNT_INVITATION_SUCCESS: {
      const newData = state.invitation.filter(i => i.id !== data.id);
      return {
        ...state,
        isProcessInvitation: false,
        invitation: newData,
      };
    }

    case types.FETCH_INFLUENCER_SUB_ACCOUNT_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: {},
      };
    }
    case types.FETCH_INFLUENCER_SUB_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: {},
        influencerSubAccounts: data,
      };
    }
    case types.FETCH_INFLUENCER_SUB_ACCOUNT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: data,
      };
    }

    default: {
      return state;
    }
  }
};
