import Influencify from "../../constants/Influencify";

export const types = {
  HANDLE_DISCONNECT_SMTP_LOADING_FNISH: "HANDLE_DISCONNECT_SMTP_LOADING_FNISH",
  HANDLE_FETCH_SMTP_LOADING: "HANDLE_FETCH_SMTP_LOADING",
  HANDLE_FETCH_SMTP_LOADING_FNISH: "HANDLE_FETCH_SMTP_LOADING_FNISH",
  HANDLE_FETCH_SMTP_SUCCESS: "HANDLE_FETCH_SMTP_SUCCESS",
  HANDLE_SMTP_FORM_CHANGE: "HANDLE_SMTP_FORM_CHANGE",
  HANDLE_TEST_SAVE_LOADING: "HANDLE_TEST_SAVE_LOADING",
  HANDLE_VALIDATION_ERRORS: "HANDLE_VALIDATION_ERRORS",
  HANDLE_INVALID_SMTP_CREDENTAILS: "HANDLE_INVALID_SMTP_CREDENTAILS",
  HANDLE_TEST_SAVE_SUCCESS: "HANDLE_TEST_SAVE_SUCCESS",
  HANDLE_TEST_LOADING: "HANDLE_TEST_LOADING"
};

export const actions = {
  fetchSmtp: async (dispatch, data) => {
    dispatch({ type: types.HANDLE_FETCH_SMTP_LOADING });
    const json = await Influencify.fetchSmtp(data);
    if (json.data.success === true) {
      dispatch({ type: types.HANDLE_FETCH_SMTP_SUCCESS, data: json.data.data });
    }
    dispatch({ type: types.HANDLE_FETCH_SMTP_LOADING_FNISH });
  },
  testSaveSmtp: async (dispatch, data) => {
    dispatch({ type: types.HANDLE_TEST_SAVE_LOADING });
    let json = await Influencify.testSaveSmtp(data);
    if (json !== undefined) {
      json = json.data;
      if (json.errors) {
        dispatch({ type: types.HANDLE_VALIDATION_ERRORS, data: json.errors });
      }
      else {
        if (json.success === false) {
          dispatch({ type: types.HANDLE_INVALID_SMTP_CREDENTAILS, data: json.message });
        }
        else {
          const data = {
            form: json.data,
            message: 'SMTP Connected & Save Successfuly!',
          }
          dispatch({ type: types.HANDLE_TEST_SAVE_SUCCESS, data: data });
        }
      }
    } else {
      dispatch({ type: types.HANDLE_INVALID_SMTP_CREDENTAILS, data: 'Invalid SMTP Credentials!' });
    }
  },

  testSmtp: async (dispatch, data) => {
    dispatch({ type: types.HANDLE_TEST_LOADING });
    const json = await Influencify.testSmtp(data);
    if (json !== undefined) {
      if (json?.data?.errors) {
        dispatch({ type: types.HANDLE_VALIDATION_ERRORS, data: json?.data?.errors });
      } else if (json?.data === 'error') {
        dispatch({ type: types.HANDLE_INVALID_SMTP_CREDENTAILS, data: 'Invalid SMTP Credentials!' });
      }
      else {
        const data = {
          message: 'SMTP Connected!',
        }
        dispatch({ type: types.HANDLE_TEST_SAVE_SUCCESS, data: data });
      }
    } else {
      dispatch({ type: types.HANDLE_INVALID_SMTP_CREDENTAILS, data: 'Invalid SMTP Credentials!' });
    }

  },

  disconnectSmtpMail: async (dispatch) => {
    dispatch({ type: types.HANDLE_TEST_SAVE_LOADING });
    const json = await Influencify.disconnectSmtpAccount();
    if (json.errors) {
      dispatch({ type: types.HANDLE_VALIDATION_ERRORS, data: json.errors });
    } else if (json === 'error') {
      dispatch({ type: types.HANDLE_INVALID_SMTP_CREDENTAILS, data: 'Invalid SMTP Credentials!' });
    }
    else {
      const data = {
        message: 'SMTP Disconnected Successfully!',
      }
      dispatch({ type: types.HANDLE_DISCONNECT_SMTP_LOADING_FNISH, data: data });
    }
  }
};

const initialState = {
  form: {},
  fetch_loading: false,
  test_loading: false,
  is_loading: false,
  error_obj: {},
  error_message: '',
  success_message: ''
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.HANDLE_FETCH_SMTP_LOADING: {
      return {
        ...state,
        fetch_loading: true,
        error_obj: {},
        error_message: '',
        success_message: ''
      }
    }
    case types.HANDLE_FETCH_SMTP_LOADING_FNISH: {
      return {
        ...state,
        fetch_loading: false,
      }
    }
    case types.HANDLE_DISCONNECT_SMTP_LOADING_FNISH: {
      return {
        ...state,
        is_loading: false,
        form: {},
        success_message: data.message,
      }
    }
    case types.HANDLE_FETCH_SMTP_SUCCESS: {
      return {
        ...state,
        form: data,
        fetch_loading: false
      }
    }
    case types.HANDLE_SMTP_FORM_CHANGE: {
      return {
        ...state,
        form: data
      }
    }
    case types.HANDLE_TEST_SAVE_LOADING: {
      return {
        ...state,
        is_loading: true,
        error_message: '',
        success_message: '',
        error_obj: {}
      }
    }
    case types.HANDLE_TEST_LOADING: {
      return {
        ...state,
        test_loading: true,
        error_message: '',
        success_message: '',
        error_obj: {}
      }
    }
    case types.HANDLE_VALIDATION_ERRORS: {
      return {
        ...state,
        error_obj: data,
        error_message: '',
        is_loading: false,
        test_loading: false
      }
    }
    case types.HANDLE_INVALID_SMTP_CREDENTAILS: {
      return {
        ...state,
        success_message: '',
        error_message: data,
        is_loading: false,
        test_loading: false
      }
    }
    case types.HANDLE_TEST_SAVE_SUCCESS: {
      return {
        ...state,
        error_obj: {},
        form: data.form ?? state.form,
        is_loading: false,
        test_loading: false,
        error_message: '',
        success_message: data.message,
      }
    }
    default: {
      return state;
    }
  }
}



