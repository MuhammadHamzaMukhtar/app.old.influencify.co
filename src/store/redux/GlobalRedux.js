import Influencify from "../../constants/Influencify";

export const types = {
  FETCH_COUNTRIES_SUCCESS: "FETCH_COUNTRIES_SUCCESS",
  FETCH_PLATFORM_SUCCESS: "FETCH_PLATFORM_SUCCESS",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_GOALS_SUCCESS: "FETCH_GOALS_SUCCESS",
  FETCH_USER_PRODUCTS_SUCCESS: "FETCH_USER_PRODUCTS_SUCCESS",
  FETCH_INVITATION_EMAIL_TEMPLATES_SUCCESS:
    "FETCH_INVITATION_EMAIL_TEMPLATES_SUCCESS",
};

export const actions = {
  fetchCountries: async dispatch => {
    const json = await Influencify.fetchCountries();
    if (json.data && json.data.success === true) {
      dispatch({ type: types.FETCH_COUNTRIES_SUCCESS, data: json.data.countries });
    }
  },

  fetchPlatforms: async dispatch => {
    const json = await Influencify.fetchPlatforms();
    if (json.data && json.data.success === true) {
      dispatch({ type: types.FETCH_PLATFORM_SUCCESS, data: json.data.platforms });
    }
  },

  fetchCampaignCategories: async dispatch => {
    const json = await Influencify.fetchCampaignCategories();
    if (json.data && json.data.success === true) {
      dispatch({ type: types.FETCH_CATEGORIES_SUCCESS, data: json.data.categoires });
    }
  },

  fetchCampaignGoals: async dispatch => {
    const json = await Influencify.fetchCampaignGoals();
    if (json.data && json.data.success === true) {
      dispatch({ type: types.FETCH_GOALS_SUCCESS, data: json.data.goals });
    }
  },

  fetchUserProducts: async dispatch => {
    const json = await Influencify.fetchUserProducts();
    if (json.data && json.data.success === true) {
      dispatch({
        type: types.FETCH_USER_PRODUCTS_SUCCESS,
        data: json.data.products,
      });
    }
  },

  fetchInvitationEmailTemplates: async dispatch => {
    const json = await Influencify.fetchInvitationEmailTemplates();
    if (json.data && json.data.success === true) {
      dispatch({
        type: types.FETCH_INVITATION_EMAIL_TEMPLATES_SUCCESS,
        data: json.data.templates,
      });
    }
  },
};

const initialState = {
  countries: [],
  platforms: [],
  categoires: [],
  goals: [],
  products: [],
  templates: [],
};

export const reducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case types.FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: data,
      };
    }
    case types.FETCH_PLATFORM_SUCCESS: {
      return {
        ...state,
        platforms: data,
      };
    }
    case types.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoires: data,
      };
    }
    case types.FETCH_GOALS_SUCCESS: {
      return {
        ...state,
        goals: data,
      };
    }
    case types.FETCH_USER_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: data,
      };
    }
    case types.FETCH_INVITATION_EMAIL_TEMPLATES_SUCCESS: {
      return {
        ...state,
        templates: data,
      };
    }
    default: {
      return state;
    }
  }
};
