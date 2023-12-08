import * as types from "../actions/SetUpCampaignActions";
import {
	HANDLE_FETCH_CAMPAIGN_SUCCESS,
	HANDLE_SELECT_TYPE_SUCCESS,
	HANDLE_CAMPAIGN_BASIC_CHANGE_SUCCESS,
	FETCH_COUNTRIES_SUCCESS,
	HANDLE_SELECT_CHANGE_SUCCESS,
	HANDLE_SELECT_POST_TYPE,
	HANDLE_CHANGE_SINGLE_CONTENT,
	HANDLE_CHANGE_MULTI_CONTENT,
	HANDLE_CHANGE_CAMPAIGN_BRIEF,
	DATE_CHANGE_HANDLER,
	ADD_SELECTED_INFLUENCER,
	REMOVE_SELECTED_INFLUENCER,
	REMOVE_ALL_SELECTED_INFLUENCER,
	BUDGET_SERVICE_FEE_CHANGE,
	HANDLE_FETCH_RANGES,
	FETCH_PRODUCTS_SUCCESS,
	HANDLE_PAY_PER_CLICK,
	HANDLE_PRICE_PER_INFLUENCER,
	HANDLE_PLATFORM_CHANGE,
	HANDLE_PRODUCT_PER_INFLUENCER,
	HANDLE_ON_DROP_FILE,
	HANDLE_ON_DROP_COVER,
	HANDLE_IMAGE_OPTION,
	HANDLE_SUBMIT_OVERVIEW_CHANGE,
	HANDLE_CREDIT_CARD_ERRORS,
	HANDLE_MODIFY_CHANGE,
	HANDLE_CANCEL_REDIRECT,
	HANDLE_PRICE_PER_CONTENT_SUCCESS,
	HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS,
	HANDLE_SELECT_INFLUENCER_PAYMENT_TYPE_SUCCESS,
	HANDLE_SELECT_CONTENT_PAYMENT_TYPE_SUCCESS,
	HANDLE_FOLLOWER_RANGE_SUCCESS,
	HANDLE_SELECT_RANGE_PRODUCT_SUCCESS,
	HANDLE_SELECT_PRODUCT_CHANGE_SUCCESS,
	HANDLE_SELECT_CATEGORY_SUCCESS,
	HANDLE_GOAL_SELECT_SUCCESS,
	HANDLE_PAYMENT_GATEWAY_ERRORS,
	HANDLE_BANK_ERRORS,
	HANDLE_SELECT_PRICING_PER_CONTENT_TYPE_SUCCESS,
	CREATE_CAMPAIGN_WITH_SELECTED,
	HANDLE_CAMPAIGN_CACHE_CLEAR,
	CREATE_CAMPAIGN_WITH_INVITE,
	HANDLE_VALIDATION_ERRORS,
	HANDLE_PAYMENT_PRICE_ERRORS,
	HANDLE_NOT_PUBLISHED_YET_ERRORS,
	CREATE_CAMPAIGN_WITH_NOTABLE_USERS,
	ADD_NOTABEL_INFLUENCER,
	REMOVE_NOTABLE_INFLUENCER,
	REMOVE_ALL_NOTABLE_INFLUENCER,
	ADD_ANALYZED_INFLUENCER,
	REMOVE_ANALYZED_INFLUENCER,
	REMOVE_ALL_ANALYZED_INFLUENCERS,
	CREATE_CAMPAIGN_WITH_ANALYZED_USERS,
	HANDLE_BUDGET_ERRORS,
	HANDLE_FILL_SUGGESTED_FEE,
	HANDLE_SUGGESTED_FEE_FLAG,
	HANDLE_INSTRUCTION_CHANGE,
	HANDLE_WORDING_CHANGE,
	HANDLE_BRAND_CAMPAIGN_ACTION,
	NO_CREDITS_EXIST,
	HANDLE_HIDE_MODAL_SUCCESS,
	HANDLE_SUBJECT_CHANGE_SUCCESS,
	HANDLE_VERIFIED_MESSAGE_CHANGE_SUCCESS,
	HANDLE_NON_VERIFIED_MESSAGE_CHANGE_SUCCESS,
	HANDLE_GMAIL_CONNECTED_MESSAGE_CHANGE_SUCCESS,
	HANDLE_BRAND_GMAIL_VERIFY_TOKEN_SUCCESS,
	HANDLE_CLEAR_SELECTED_INFLUENCERS,
	ADD_SELECTED_ANALYZER_INFLUENCER,
	REMOVE_SELECTED_ANALYZER_INFLUENCER,
	EMPTY_SELECTED_ANALYZED_INFLUENCERS,
} from "@store/constants/action-types";

const initialState = {
	errorsObj: {},
	activeTab: "2",
	typeId: "43b38c37-7637-4ddc-8c0d-703f1a774590",
	typeName: "PUBLIC",
	campaignID: "",
	campaignTitle: "",
	campaignType: "",
	campaignPreview: false,
	campaignVisibility: false,
	countries: [],
	selectedCountries: [],
	selectedPlatform: "Instagram",
	selectedCategories: [],
	selectedGoal: "",
	contentType: "single",
	campaignPostType: "",
	singleContentPostId: "",
	multiContentValue: [],
	contentValue: {},
	campaignInstruction: "",
	postWording: "",
	postWordingType: "",
	linkToShare: "",
	subject_line: "",
	verified_message: "",
	non_verified_message: "",
	gmail_connected_message: "",
	applicationFrom: new Date(),
	applicationTo: new Date(),
	postingFrom: new Date(),
	postingTo: new Date(),
	completeInDays: "",
	selectedInfluencers: [],
	selectInfluencers: [],
	notableInfluencers: [],
	activeInfluencers: [],
	selectedAnalyzedInfluencers: [],
	errorMessages: [],
	campaignBudget: 0,
	handlingFee: 0,
	serviceFee: 0,
	spendable: 0,
	campaignRanges: [],
	rangeValue: {},
	products: [],
	payPerClickAmount: 0,
	payPerClickLimitPost: 0,
	payPerClickWaitingTime: 0,
	pricePerInfluencerValue: [],
	influencerValue: {},
	campaignPayment: {},
	productPerInfluencerValue: [],
	productValue: {},
	campaignAttachments: [],
	campaignCover: [],
	imageOption: "1",
	isLoading: false,
	campaignSubmitRedirect: false,
	notPublishedYet: "",
	creditCardErrors: "",
	notActivePyamentGateway: "",
	messages: "",
	campaignStatus: "",
	contentProduct: "",
	paymentType: "",
	contentCampaignPriceType: "",
	pricePerImage: 0,
	pricePerVideo: 0,
	pricePerStory: 0,
	payPerProduct: 0,
	randomNumber: 0,
	campaignId: "",
	currency_code: "USD",
	budgetError: "",
	campaignFlag: false,
	contentPostType: {},
	suggestedFeeFlag: false,
	pathName: "",
	noCreditsExist: false,
};

const SetUpNewCampaignReducer = (state = initialState, action) => {
	if (action.type === HANDLE_FETCH_CAMPAIGN_SUCCESS) {
		return {
			...state,
			typeId: action.payload.typeId
				? action.payload.typeId
				: "43b38c37-7637-4ddc-8c0d-703f1a774590",
			typeName: action.payload.typeName ? action.payload.typeName : "PUBLIC",
			campaignID: action.payload.campaignID,
			campaignTitle: action.payload.campaignTitle,
			campaignType: action.payload.campaignType,
			paymentType: action.payload.paymentType,
			campaignPreview: action.payload.campaignPreview,
			campaignVisibility: action.payload.campaignVisibility,
			contentType: action.payload.contentType
				? action.payload.contentType
				: "single",
			singleContentPostId: action.payload.singleContentPostId,
			selectedCountries: action.payload.selectedCountries,
			campaignInstruction: action.payload.campaignInstruction,
			postWording: action.payload.postWording,
			postWordingType: action.payload.postWordingType,
			linkToShare: action.payload.linkToShare,
			subject_line: action.payload.subject_line,
			verified_message: action.payload.verified_message,
			non_verified_message: action.payload.non_verified_message,
			gmail_connected_message: action.payload.gmail_connected_message,
			applicationFrom: action.payload.applicationFrom,
			applicationTo: action.payload.applicationTo,
			postingFrom: action.payload.postingFrom,
			postingTo: action.payload.postingTo,
			completeInDays: action.payload.completeInDays,
			selectedInfluencers: action.payload.selectedInfluencers,
			activeInfluencers: action.payload.selectedInfluencers,
			campaignAttachments: action.payload.campaignAttachments,
			campaignCover: action.payload.campaignCover,
			imageOption: action.payload.imageOption,
			campaignBudget: action.payload.campaignBudget,
			serviceFee: action.payload.serviceFee,
			spendable: action.payload.spendable,
			handlingFee: action.payload.handlingFee,
			payPerClickAmount: action.payload.payPerClickAmount,
			payPerClickLimitPost: action.payload.payPerClickLimitPost,
			payPerClickWaitingTime: action.payload.payPerClickWaitingTime,
			campaignStatus: action.payload.campaignStatus,
			selectedGoal: action.payload.goalName,
			selectedCategories: action.payload.campaignCategories,
			campaignPayment: action.payload.campaignPayment,
			pricePerImage: action.payload.price_per_image,
			pricePerVideo: action.payload.price_per_video,
			pricePerStory: action.payload.price_per_story,
			contentProduct: action.payload.contentProduct,
			campaignPostType: action.payload.campaignPostType,
			//currency_code            : action.payload.currency_code,
			contentPostType: action.payload.contentPostType,
			campaignFlag: true,
		};
	} else if (action.type === HANDLE_BRAND_CAMPAIGN_ACTION) {
		return {
			...state,
			pathName: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_TYPE_SUCCESS) {
		return {
			...state,
			typeId: action.payload,
			typeName: action.name,
		};
	} else if (action.type === HANDLE_CAMPAIGN_BASIC_CHANGE_SUCCESS) {
		return {
			...state,
			[action.payload.target.name]:
				action.payload.target.type === "checkbox"
					? action.payload.target.checked
					: action.payload.target.value,
		};
	}
	if (action.type === FETCH_COUNTRIES_SUCCESS) {
		return {
			...state,
			countries: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_CHANGE_SUCCESS) {
		return {
			...state,
			selectedCountries: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_POST_TYPE) {
		return {
			...state,
			contentType: action.payload,
		};
	} else if (action.type === HANDLE_PLATFORM_CHANGE) {
		return {
			...state,
			selectedPlatform: action.value,
		};
	} else if (action.type === HANDLE_CHANGE_SINGLE_CONTENT) {
		return {
			...state,
			campaignPostType: action.payload.target.value,
		};
	} else if (action.type === HANDLE_CHANGE_MULTI_CONTENT) {
		state.contentValue[action.postId] = action.payload.target.value;
		return {
			...state,
			multiContentValue: state.contentValue,
		};
	} else if (action.type === HANDLE_CHANGE_CAMPAIGN_BRIEF) {
		return {
			...state,
			[action.payload.target.name]:
				action.payload.target.type === "checkbox"
					? action.payload.target.checked
					: action.payload.target.value,
		};
	} else if (action.type === DATE_CHANGE_HANDLER) {
		return {
			...state,
			[action.name]: action.value,
		};
	} else if (action.type === ADD_SELECTED_INFLUENCER) {
		if (action.payload.status) {
			return {
				...state,
				selectedInfluencers: [
					...state.selectedInfluencers,
					action.payload.influencer,
				],
				selectInfluencers: [
					...state.selectInfluencers,
					action.payload.influencer,
				],
			};
		}
		const updatedArray = state.selectedInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_profile.user_id !==
				action.payload.influencer.user_profile.user_id
		);
		const updatedData = state.selectInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_profile.user_id !==
				action.payload.influencer.user_profile.user_id
		);
		return {
			...state,
			selectedInfluencers: updatedArray,
			selectInfluencers: updatedData,
		};
	} else if (action.type === REMOVE_SELECTED_INFLUENCER) {
		const updatedArray = state.selectedInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_profile.user_id !== action.payload
		);
		const updatedData = state.selectInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_profile.user_id !== action.payload
		);
		return {
			...state,
			selectedInfluencers: updatedArray,
			selectInfluencers: updatedData,
		};
	} else if (action.type === ADD_SELECTED_ANALYZER_INFLUENCER) {
		if (action.payload.status) {
			return {
				...state,
				selectedAnalyzedInfluencers: [
					...state.selectedAnalyzedInfluencers,
					action.payload.influencer,
				],
			};
		}
		const updatedArray = state.selectedAnalyzedInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_id !== action.payload.influencer.user_id
		);
		return {
			...state,
			selectedAnalyzedInfluencers: updatedArray,
		};
	} else if (action.type === REMOVE_SELECTED_ANALYZER_INFLUENCER) {
		const updatedArray = state.selectedAnalyzedInfluencers.filter(
			(selectedInfluencer) => selectedInfluencer.user_id !== action.payload
		);
		return {
			...state,
			selectedAnalyzedInfluencers: updatedArray,
		};
	} else if (action.type === ADD_ANALYZED_INFLUENCER) {
		if (action.payload.status) {
			return {
				...state,
				selectedAnalyzedInfluencers: [
					...state.selectedAnalyzedInfluencers,
					action.payload.influencer,
				],
			};
		}
		const updatedArray = state.selectedAnalyzedInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.id !== action.payload.influencer.id
		);
		return {
			...state,
			selectedAnalyzedInfluencers: updatedArray,
		};
	} else if (action.type === REMOVE_ANALYZED_INFLUENCER) {
		const updatedArray = state.selectedAnalyzedInfluencers.filter(
			(selectedInfluencer) => selectedInfluencer.id !== action.payload
		);
		return {
			...state,
			selectedAnalyzedInfluencers: updatedArray,
		};
	} else if (action.type === REMOVE_ALL_ANALYZED_INFLUENCERS) {
		return {
			...state,
			selectedAnalyzedInfluencers: [],
		};
	} else if (action.type === ADD_NOTABEL_INFLUENCER) {
		if (action.payload.status) {
			return {
				...state,
				notableInfluencers: [
					...state.notableInfluencers,
					action.payload.influencer,
				],
			};
		}
		const updatedArray = state.notableInfluencers.filter(
			(selectedInfluencer) =>
				selectedInfluencer.user_id !== action.payload.influencer.user_id
		);
		return {
			...state,
			notableInfluencers: updatedArray,
		};
	} else if (action.type === REMOVE_NOTABLE_INFLUENCER) {
		const updatedArray = state.notableInfluencers.filter(
			(selectedInfluencer) => selectedInfluencer.user_id !== action.payload
		);
		return {
			...state,
			notableInfluencers: updatedArray,
		};
	} else if (action.type === REMOVE_ALL_SELECTED_INFLUENCER) {
		return {
			...state,
			selectedInfluencers: [],
			selectInfluencers: [],
			selectedAnalyzedInfluencers: [],
		};
	} else if (action.type === REMOVE_ALL_NOTABLE_INFLUENCER) {
		return {
			...state,
			notableInfluencers: [],
		};
	} else if (action.type === CREATE_CAMPAIGN_WITH_NOTABLE_USERS) {
		return {
			...state,
			notableInfluencers: [],
		};
	} else if (action.type === CREATE_CAMPAIGN_WITH_ANALYZED_USERS) {
		return {
			...state,
			selectedAnalyzedInfluencers: [],
		};
	} else if (action.type === BUDGET_SERVICE_FEE_CHANGE) {
		return {
			...state,
			campaignBudget: action.payload.budget,
			serviceFee: action.payload.serviceFee,
			spendable: action.payload.spendable,
			handlingFee: action.payload.handlingFee,
		};
	} else if (action.type === HANDLE_FETCH_RANGES) {
		return {
			...state,
			campaignRanges: action.payload,
		};
	} else if (action.type === FETCH_PRODUCTS_SUCCESS) {
		return {
			...state,
			products: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_CONTENT_PAYMENT_TYPE_SUCCESS) {
		return {
			...state,
			paymentType: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_INFLUENCER_PAYMENT_TYPE_SUCCESS) {
		return {
			...state,
			paymentType: action.payload,
		};
	} else if (action.type === HANDLE_SELECT_PRICING_PER_CONTENT_TYPE_SUCCESS) {
		return {
			...state,
			contentCampaignPriceType: action.payload,
		};
	} else if (action.type === HANDLE_PRICE_PER_CONTENT_SUCCESS) {
		return {
			...state,
			[action.payload.target.name]:
				action.payload.target.type === "checkbox"
					? action.payload.target.checked
					: action.payload.target.value,
		};
	} else if (action.type === HANDLE_PAY_PER_CLICK) {
		return {
			...state,
			[action.payload.target.name]:
				action.payload.target.type === "checkbox"
					? action.payload.target.checked
					: action.payload.target.value,
		};
	} else if (action.type === HANDLE_PRICE_PER_INFLUENCER) {
		const value = parseInt(action.payload.target.value);
		const updateInfluencersArray = state.selectedInfluencers.map((el) =>
			el.id === action.influencerId ? { ...el, price: value } : el
		);
		return {
			...state,
			selectedInfluencers: updateInfluencersArray,
		};
	} else if (action.type === HANDLE_FILL_SUGGESTED_FEE) {
		const value = parseInt(action.payload);
		const updateInfluencersArray = state.selectedInfluencers.map((el) =>
			el.id === action.influencerId ? { ...el, price: value } : el
		);
		return {
			...state,
			selectedInfluencers: updateInfluencersArray,
		};
	} else if (action.type === HANDLE_FOLLOWER_RANGE_SUCCESS) {
		state.campaignRanges[action.key].price = action.value;
		return {
			...state,
			campaignRanges: state.campaignRanges,
			randomNumber: Math.random(),
		};
	} else if (action.type === HANDLE_SELECT_RANGE_PRODUCT_SUCCESS) {
		state.campaignRanges[action.key].offer = action.value;
		return {
			...state,
			campaignRanges: state.campaignRanges,
			randomNumber: Math.random(),
		};
	} else if (action.type === HANDLE_PRODUCT_PER_INFLUENCER) {
		const value = action.payload;
		const updateInfluencersArray = state.selectedInfluencers.map((el) =>
			el.id === action.influencerId ? { ...el, product: value } : el
		);
		return {
			...state,
			selectedInfluencers: updateInfluencersArray,
		};
	} else if (action.type === HANDLE_ON_DROP_FILE) {
		return {
			...state,
			campaignAttachments: action.payload,
		};
	} else if (action.type === HANDLE_ON_DROP_COVER) {
		return {
			...state,
			campaignCover: action.payload,
		};
	} else if (action.type === HANDLE_IMAGE_OPTION) {
		return {
			...state,
			imageOption: action.value,
		};
	} else if (action.type === types.SUBMIT_TYPE) {
		return {
			...state,
			activeTab: action.payload.tab,
			paymentType:
				action.payload.typeName === "PUBLIC"
					? "pricingByFollowerRange"
					: "pricingPerInfluencer",
		};
	} else if (action.type === types.SUBMIT_BASIC) {
		return {
			...state,
			activeTab: action.payload,
			errorsObj: {},
		};
	} else if (action.type === types.SUBMIT_BRIEF) {
		return {
			...state,
			activeTab: action.payload,
			errorsObj: {},
		};
	} else if (action.type === types.SUBMIT_INVITATION) {
		return {
			...state,
			activeTab: action.payload,
		};
	} else if (action.type === types.SUBMIT_TIMING) {
		return {
			...state,
			activeTab: action.payload,
		};
	} else if (action.type === types.SUBMIT_INFLUENCERS) {
		return {
			...state,
			activeTab: action.payload,
		};
	} else if (action.type === types.SUBMIT_PAYMENT) {
		return {
			...state,
			activeTab: action.payload,
			errorMessages: [],
		};
	} else if (action.type === types.SUBMIT_OVERVIEW) {
		return {
			...state,
			activeTab: action.payload,
			campaignSubmitRedirect: true,
			typeId: "",
			campaignTitle: "",
			campaignPreview: false,
			campaignVisibility: false,
			selectedCountries: [],
			contentType: "",
			selectedPlatform: "Instagram",
			campaignCategories: [],
			campaignInstruction: "",
			postWording: "",
			postWordingType: "",
			linkToShare: "",
			campaignAttachments: [],
			campaignCover: "",
			imageOption: "",
			campaignGoals: [],
			completeInDays: "",
			applicationFrom: "",
			applicationTo: "",
			postingFrom: "",
			postingTo: "",
			selectedInfluencers: [],
			campaignBudget: "",
			serviceFee: "",
			spendable: "",
			campaignRanges: [],
			products: [],
			payPerClickAmount: 0,
			payPerClickLimitPost: 0,
			payPerClickWaitingTime: 0,
			productPerInfluencerValue: [],
			campaignType: "",
			paymentType: "",
			campaignPayment: "",
			contentProduct: "",
			pricePerImage: 0,
			pricePerVideo: 0,
			pricePerStory: 0,
			selectedCategories: [],
			selectedGoal: "",
			notActivePyamentGateway: "",
			creditCardErrors: "",
			messages: [],
			notPublishedYet: "",
			campaignFlag: false,
		};
	} else if (action.type === HANDLE_CAMPAIGN_CACHE_CLEAR) {
		return {
			...state,
			activeTab: 2,
			typeId: "",
			campaignTitle: "",
			campaignPreview: false,
			campaignVisibility: false,
			selectedCountries: [],
			contentType: "",
			selectedPlatform: "Instagram",
			campaignCategories: [],
			campaignInstruction: "",
			postWording: "",
			postWordingType: "",
			linkToShare: "",
			campaignAttachments: [],
			campaignCover: "",
			imageOption: "",
			campaignGoals: [],
			completeInDays: "",
			applicationFrom: "",
			applicationTo: "",
			postingFrom: "",
			postingTo: "",
			selectedInfluencers: [],
			campaignBudget: "",
			serviceFee: "",
			spendable: "",
			campaignRanges: [],
			products: [],
			payPerClickAmount: 0,
			payPerClickLimitPost: 0,
			payPerClickWaitingTime: 0,
			productPerInfluencerValue: [],
			campaignType: "",
			paymentType: "",
			campaignPayment: "",
			contentProduct: "",
			pricePerImage: 0,
			pricePerVideo: 0,
			pricePerStory: 0,
			selectedCategories: [],
			selectedGoal: "",
			notActivePyamentGateway: "",
			creditCardErrors: "",
			messages: [],
			campaignFlag: false,
		};
	} else if (action.type === HANDLE_CREDIT_CARD_ERRORS) {
		return {
			...state,
			creditCardErrors: action.payload,
			notActivePyamentGateway: "",
			messages: "",
			campaignSubmitRedirect: false,
		};
	} else if (action.type === HANDLE_NOT_PUBLISHED_YET_ERRORS) {
		return {
			...state,
			creditCardErrors: "",
			notActivePyamentGateway: "",
			messages: "",
			notPublishedYet: action.payload,
			campaignSubmitRedirect: true,
		};
	} else if (action.type === HANDLE_PAYMENT_GATEWAY_ERRORS) {
		return {
			...state,
			notActivePyamentGateway: action.payload,
			campaignSubmitRedirect: false,
			creditCardErrors: "",
			messages: "",
		};
	} else if (action.type === HANDLE_BANK_ERRORS) {
		return {
			...state,
			messages: action.payload,
			creditCardErrors: "",
			notActivePyamentGateway: "",
			campaignSubmitRedirect: false,
		};
	} else if (action.type === HANDLE_SUBMIT_OVERVIEW_CHANGE) {
		return {
			...state,
			activeTab: action.payload,
		};
	} else if (action.type === HANDLE_MODIFY_CHANGE) {
		return {
			...state,
			campaignSubmitRedirect: true,
		};
	} else if (action.type === HANDLE_CANCEL_REDIRECT) {
		return {
			...state,
			campaignSubmitRedirect: false,
		};
	} else if (action.type === HANDLE_SELECT_CATEGORY_SUCCESS) {
		if (action.payload) {
			return {
				...state,
				selectedCategories: [...state.selectedCategories, action.category],
			};
		}
		const updatedArray = state.selectedCategories.filter(
			(selectedcategory) => selectedcategory.id !== action.category.id
		);
		return {
			...state,
			selectedCategories: updatedArray,
		};
	} else if (action.type === HANDLE_GOAL_SELECT_SUCCESS) {
		return {
			...state,
			selectedGoal: action.payload.target.value,
		};
	} else if (action.type === types.SUBMIT_INIT) {
		return {
			...state,
			isLoading: true,
		};
	} else if (action.type === types.SUBMIT_SUCCESS) {
		return {
			...state,
			isLoading: false,
		};
	} else if (action.type === HANDLE_SELECT_PRODUCT_CHANGE_SUCCESS) {
		return {
			...state,
			contentProduct: action.payload,
		};
	} else if (action.type === HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS) {
		return {
			...state,
			activeTab: 2,
		};
	} else if (action.type === CREATE_CAMPAIGN_WITH_SELECTED) {
		return {
			...state,
			activeTab: 2,
			campaignId: action.payload.campaignId,
		};
	} else if (action.type === CREATE_CAMPAIGN_WITH_INVITE) {
		return {
			...state,
			activeTab: 2,
			campaignId: action.payload.campaignId,
		};
	} else if (action.type === HANDLE_VALIDATION_ERRORS) {
		return {
			...state,
			errorsObj: action.payload,
		};
	} else if (action.type === HANDLE_PAYMENT_PRICE_ERRORS) {
		return {
			...state,
			errorMessages: action.payload,
		};
	} else if (action.type === HANDLE_BUDGET_ERRORS) {
		return {
			...state,
			budgetError: action.payload,
		};
	} else if (action.type === HANDLE_SUGGESTED_FEE_FLAG) {
		return {
			...state,
			suggestedFeeFlag: action.payload,
		};
	} else if (action.type === HANDLE_INSTRUCTION_CHANGE) {
		return {
			...state,
			campaignInstruction: action.payload,
		};
	} else if (action.type === HANDLE_WORDING_CHANGE) {
		return {
			...state,
			postWording: action.payload,
		};
	} else if (action.type === NO_CREDITS_EXIST) {
		return {
			...state,
			noCreditsExist: true,
		};
	} else if (action.type === HANDLE_HIDE_MODAL_SUCCESS) {
		return {
			...state,
			noCreditsExist: false,
		};
	} else if (action.type === HANDLE_SUBJECT_CHANGE_SUCCESS) {
		return {
			...state,
			subject_line: action.payload.target.value,
		};
	} else if (action.type === HANDLE_VERIFIED_MESSAGE_CHANGE_SUCCESS) {
		return {
			...state,
			verified_message: action.payload.target.value,
		};
	} else if (action.type === HANDLE_NON_VERIFIED_MESSAGE_CHANGE_SUCCESS) {
		return {
			...state,
			non_verified_message: action.payload.target.value,
		};
	} else if (action.type === HANDLE_GMAIL_CONNECTED_MESSAGE_CHANGE_SUCCESS) {
		return {
			...state,
			gmail_connected_message: action.payload.target.value,
		};
	} else if (action.type === HANDLE_BRAND_GMAIL_VERIFY_TOKEN_SUCCESS) {
		return {
			...state,
			activeTab: 4,
		};
	} else if (action.type === HANDLE_CLEAR_SELECTED_INFLUENCERS) {
		return {
			...state,
			selectedInfluencers: [],
		};
	} else if (action.type === EMPTY_SELECTED_ANALYZED_INFLUENCERS) {
		return {
			...state,
			selectedAnalyzedInfluencers: [],
		};
	}
	return state;
}

export default SetUpNewCampaignReducer;