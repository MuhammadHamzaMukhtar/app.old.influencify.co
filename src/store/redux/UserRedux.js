import Api from "@services/axios";

export const types = {
  AJAX_CALL_INIT: "AJAX_CALL_INIT",
  AJAX_CALL_FINSH: "AJAX_CALL_FINSH",
  HANDLE_CHANGE_SUCCESS: "HANDLE_CHANGE_SUCCESS",
  HANDEL_ACTIVE_MODAL_SHOW: "HANDEL_ACTIVE_MODAL_SHOW",
  HANDLE_SELECT_COUNTRY_SUCCESS: "HANDLE_SELECT_COUNTRY_SUCCESS",
  HANDLE_SELECT_STATE_SUCCESS: "HANDLE_SELECT_STATE_SUCCESS",
  HANDLE_SELECT_CITY_SUCCESS: "HANDLE_SELECT_CITY_SUCCESS",
  FETCH_COUNTRIES_SUCCESS: "FETCH_COUNTRIES_SUCCESS",
  FETCH_STATES_SUCCESS: "FETCH_STATES_SUCCESS",
  FETCH_TIMEZONES_SUCCESS: "FETCH_TIMEZONES_SUCCESS",
  FETCH_CITIES_SUCCESS: "FETCH_CITIES_SUCCESS",
  FETCH_CURRENCIES_SUCCESS: "FETCH_CURRENCIES_SUCCESS",
  FETCH_COUNTRIES_FAILURE: "FETCH_COUNTRIES_FAILURE",
  FETCH_CURRENCIES_FAILURE: "FETCH_CURRENCIES_FAILURE",
  HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS: "HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS",
  HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE: "HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE",
  USER_ADD_FORM: "USER_ADD_FORM"
};

export const actions = {
  setActivateModalShow: (dispatch, data) => {
    dispatch({ type: types.HANDEL_ACTIVE_MODAL_SHOW, data: data })
  },
  fetchCountries: async (dispatch) => {
    await Api.FetchCountries()
      .then((res) => {
        dispatch({
          type: types.FETCH_COUNTRIES_SUCCESS,
          data: res.data.countries,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_COUNTRIES_FAILURE,
          data: error,
        });
      });
  },
  fetchCurrencies: (dispatch) => {
    Api.FetchCurrencies()
      .then((res) => {
        dispatch({
          type: types.FETCH_CURRENCIES_SUCCESS,
          data: res.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_CURRENCIES_FAILURE,
          data: error,
        });
      });
  },
  fetchStates: (dispatch, data) => {
    Api.FetchStates(data)
      .then((res) => {
        dispatch({
          type: types.FETCH_STATES_SUCCESS,
          data: res.data.states,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_STATES_FAILURE,
          data: error,
        });
      });
  },
  brandBasicInfoSettigs: (dispatch) => {
    dispatch({
      type: types.AJAX_CALL_INIT,
    });
    // axios.get(helper.url + '/api/v1/brand_basic_info_settings')
    Api.BrandBasicInfoSettigs()
      .then((res) => {
        dispatch({
          type: types.HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS,
          data: res.data,
        });
        dispatch({
          type: types.AJAX_CALL_FINSH,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE,
          data: error,
        });
      });
  },
  fetchTimeZones: (dispatch, id) => {
    Api.FetchTimeZones(id)
      .then((res) => {
        dispatch({
          type: types.FETCH_TIMEZONES_SUCCESS,
          data: res.data.timeZones,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_TIMEZONES_FAILURE,
          data: error,
        });
      });
  },
  fetchCities: (dispatch, id) => {
    Api.FetchCities(id)
      .then((res) => {
        dispatch({
          type: types.FETCH_CITIES_SUCCESS,
          data: res.data.cities,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_CITIES_FAILURE,
          payload: error,
        });
      });
  },
  addForm: (data) => {
    return ({ type: types.USER_ADD_FORM, data: data })
  },
};

const initialState = {
  data: {},
  countries: [],
  currencies: [],
  cities: [],
  states: [],
  timeZones: [],
  isLoading: false,
  'errorsObj': {},
  'ActivateModalShow': false,
  'response_status': '',
  'is_currency_set': false,
};

export const reducer = (state = initialState, action) => {
  const { type, data, params } = action;
  switch (type) {

    case types.USER_ADD_FORM: {
      return {
        ...state,
        data: data
      }
    }
    
    case types.AJAX_CALL_INIT: {
      return {
        ...state,
        isLoading: true
      }
    }
    
    case types.AJAX_CALL_FINSH: {
      return {
        ...state,
        isLoading: false
      }
    }
    
    case types.HANDEL_BRAND_BASIC_INFO_SETTIGNS_SUCCESS: {
      return {
        ...state,
        data: data
      }
    }
    
    case types.HANDEL_BRAND_BASIC_INFO_SETTIGNS_FAILURE: {
      return {
        ...state,
        data: data
      }
    }

    case types.FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: data,
      };
    }
    
    case types.FETCH_TIMEZONES_SUCCESS: {
      return {
        ...state,
        timeZones: data
      };
    }
    
    case types.FETCH_CITIES_SUCCESS: {
      return {
        ...state,
        cities: data
      };
    }
    
    case types.FETCH_CURRENCIES_SUCCESS: {
      return {
        ...state,
        currencies: data
      };
    }

    case types.FETCH_STATES_SUCCESS: {
      return {
        ...state,
        states: data
      };
    }

    case types.HANDEL_ACTIVE_MODAL_SHOW: {
      return {
        ...state,
        ActivateModalShow: data
      };
    }

    default: {
      return state;
    }
  }
};
//https://html-online.com/editor/
