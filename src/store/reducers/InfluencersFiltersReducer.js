import {
	FETCH_COUNTRIES_SUCCESS,
	FETCH_CATEGORIES_SUCCESS,
	HANDLE_CHANGE_FILTER_SUCCESS,
	FETCH_LANGS_SUCCESS,
	HANDLE_INFLUENCITY_LOCATION_SUCCESS,
	HANDLE_INFLUENCITY_CATEGORY_SUCCESS,
	HANDLE_CLEAR_FILTER_SUCCESS,
	HANDLE_CHANGE_FOLLOWRS_SUCCESS,
} from "../constants/action-types";

const initialState = {
	countries: [],
	categories: [],
	languages: [],
	influencityLocationValue: {},
	influencerLocation: "",
	influencerLang: "",
	influencerGender: "",
	influencerEngagement: "",
	influencerFollowers: "",
	influencerInterest: "",
	audienceAge: "",
	audienceGender: "",
	audienceInterest: "",
	audienceLang: "",
	audienceLocation: "",
	creditbilty: "",
	audienceLocationRandom: Math.random(),
	influencerLocationRandom: Math.random(),
	influencerLangRandom: Math.random(),
	audienceLangRandom: Math.random(),
};

const InfluencersFiltersReducer = (state = initialState, action) => {
	if (action.type === FETCH_CATEGORIES_SUCCESS) {
		return {
			...state,
			categories: action.payload,
		};
	}
	if (action.type === FETCH_COUNTRIES_SUCCESS) {
		return {
			...state,
			countries: action.payload,
		};
	}
	if (action.type === FETCH_LANGS_SUCCESS) {
		return {
			...state,
			languages: action.payload,
		};
	} else if (action.type === HANDLE_CHANGE_FILTER_SUCCESS) {
		return {
			...state,
			[action.name]: action.value,
		};
	} else if (action.type === HANDLE_INFLUENCITY_LOCATION_SUCCESS) {
		return {
			...state,
			influencerLocation: action.value.name,
			influencityLocationValue: action.value,
		};
	} else if (action.type === HANDLE_INFLUENCITY_CATEGORY_SUCCESS) {
		return {
			...state,
			influencerInterest: action.value,
		};
	} else if (action.type === HANDLE_CHANGE_FOLLOWRS_SUCCESS) {
		return {
			...state,
			influencerFollowers: action.payload,
		};
	} else if (action.type === HANDLE_CLEAR_FILTER_SUCCESS) {
		if (action.payload === "influencerFollowers") {
			return {
				...state,
				influencerFollowers: "",
			};
		} else if (action.payload === "influencerGender") {
			return {
				...state,
				influencerGender: "",
			};
		} else if (action.payload === "influencerLang") {
			return {
				...state,
				influencerLang: "",
				influencerLangRandom: Math.random(),
			};
		} else if (action.payload === "influencerLocation") {
			return {
				...state,
				influencerLocation: "",
				influencerLocationRandom: Math.random(),
			};
		} else if (action.payload === "influencerEngagement") {
			return {
				...state,
				influencerEngagement: "",
			};
		} else if (action.payload === "audienceAge") {
			return {
				...state,
				audienceAge: "",
			};
		} else if (action.payload === "audienceGender") {
			return {
				...state,
				audienceGender: "",
			};
		} else if (action.payload === "audienceInterest") {
			return {
				...state,
				audienceInterest: "",
			};
		} else if (action.payload === "audienceLang") {
			return {
				...state,
				audienceLang: "",
				audienceLangRandom: Math.random(),
			};
		} else if (action.payload === "audienceLocation") {
			return {
				...state,
				audienceLocation: "",
				audienceLocationRandom: Math.random(),
			};
		} else {
			return {
				...state,
				searchQuery: "",
				influencerGender: "",
				influencerLocation: "",
				influencerLang: "",
				influencerEngagement: "",
				influencerFollowers: "",
				influencerInterest: "",
				audienceAge: "",
				audienceGender: "",
				audienceInterest: "",
				audienceLang: "",
				audienceLocation: "",
				audienceLocationRandom: Math.random(),
				audienceLangRandom: Math.random(),
				influencerLocationRandom: Math.random(),
				influencerLangRandom: Math.random(),
			};
		}
	}

	return state;
}

export default InfluencersFiltersReducer;