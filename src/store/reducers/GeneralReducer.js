import { 
	FETCH_COUNTRIES_SUCCESS,
	FETCH_STATES_SUCCESS,
	FETCH_CITIES_SUCCESS,
	FETCH_TIMEZONES_SUCCESS,
    FETCH_CURRENCIES_SUCCESS,
} from "../constants/action-types";
const initialState = {
    countries 		: [],
    states 		    : [],
    cities 		    : [],
    timeZones 		: [],
    currencies      : [],
    selectedCountry : '',
};

const GeneralReducer = (state = initialState, action) => {
    if (action.type === FETCH_COUNTRIES_SUCCESS) {
        return {
            ...state,
            countries: action.payload
        };
    }
    else if (action.type === FETCH_STATES_SUCCESS) {
        return {
            ...state,
            states: action.payload
        };
    }
    else if (action.type === FETCH_CITIES_SUCCESS) {
        return {
            ...state,
            cities: action.payload
        };
    }
    else if (action.type === FETCH_TIMEZONES_SUCCESS) {
        return {
            ...state,
            timeZones: action.payload
        };
    }
    else if (action.type === FETCH_CURRENCIES_SUCCESS) {
        return {
            ...state,
            currencies: action.payload
        };
    }
    else {
        return state;
    }
}

export default GeneralReducer;