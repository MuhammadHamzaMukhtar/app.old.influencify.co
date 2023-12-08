import {
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
  INFLUENCER_BOOKING_CAMPAIGN_TASK,
  INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_SUCCESS,
  INFLUENCER_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
  HANDLE_ON_DROP_FILE,
  CAMPAIGN_CONTENT_UPLOAD_STORY_SUCCESS,
  HANDLE_INFLUENCER_BOOKING_REQUEST_SUCCESS,
  HANDLE_INFLUENCER_CANCEL_REQUEST_SUCCESS,
  FETCH_ABORT_REASONS_SUCCESS,
  HANDLE_SELECT_CHANGE_SUCCESS,
  INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
  HANDLE_CHANGE_SUCCESS,
  HANDEL_REJECT_MESSAGE_OPTIONAL,
  HANDEL_ACCEPT_MESSAGE_OPTIONAL,
  INFLUENCER_INSTAGRAM_FEEDS_SUCCESS,
  HANDLE_VALIDATION_ERRORS,
  INFLUENCER_SEND_MESSAGE_SUCCESS,
  CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_SUCCESS,
  CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_SUCCESS,
  HANDLE_CHANGE_CAMPAIGN_ID,
  INFLUENCER_CAMPAIGN_DETAILS_INIT,
  INFLUENCER_CAMPAIGN_DETAILS_FINISH,
  BRAND_BOOKING_CAMPAIGN_REJECT_SUCCESS,
  POST_UPLOAD_SUCCESS,
  INFLUENCER_SELECTED_FEED_POST_SUCCESS,
  POST_UPLOAD_FAILURE,
  WORK_DONE_SUCCESS,
  INFLUENCER_MESSAGE_INIT,
  INFLUENCER_MESSAGE_FINISH,
  HANDLE_INFLUENCER_WORK_DONE_REQUEST_SUCCESS,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  isLoader: false,
  campaignTitle: "",
  campaignType: "",
  typeName: "",
  campaignCountry: "",
  postingFrom: "",
  postingTo: "",
  completeInDays: "",
  postWordingType: "",
  postWording: "",
  campaignInstruction: "",
  linkToShare: "",
  campaignPreview: "",
  isInfluencerAttached: 0,
  campaignPayout: {},
  influencerCampaignContent: [],
  content_images: [],
  contentStoryPath: "",
  campaignInfluencerStatus: "",
  abortReasons: [],
  selectedReason: "",
  influencerBookingMessages: [],
  campaignAttachments: [],
  lightBoxImages: [],
  contentPostType: [],
  // products: [],
  campaignTasks: [],
  chatMessage: "",
  platformName: "",
  acceptOptionalMessage: "",
  rejectOptionalMessage: "",
  isAllUploadedPreviewContent: 0,
  isAllUploadedContent: 0,
  isSubmitedPreviewContent: 0,
  isSubmitedPreviewFlag: 0,
  previewApprovedFlag: 0,
  isReconnectFlag: 0,
  influencerInstagramPosts: [],
  isAllLinkedPosted: 0,
  // fixedFee: 0,
  // has_fixed_price: false,
  // is_influencer_propose: false,
  errorsObj: {},
  campaignPayment: {},
  brand: {},
  campaignId: "",
  activeTab: "Overview",
  instagramIsFetching: {},
  isLoadingPreview: false,
  isLoadingSubmit: {},
  tiktokIsFetching: {},
  tiktokData: {},
  youtubeIsFetching: {},
  isLoadingMessage: false,
  youtubeData: {},
  campaignInfluencer: {},
  selectedProducts: [],
  quotePaymentIsProcessing: false,
  is_appsumo: 0,
  payment_processing: 0,
  brandProducts: [],
  influencerProduct: {},
  quoteErrors: {},
};

const InfluencersBookingIDReducer = (state = initialState, action) => {
  if (action.type === INFLUENCER_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS) {
    return {
      ...state,
      campaignTitle:
        action.payload.influencerBookingCampaignOverview.campaignTitle,
      campaignType:
        action.payload.influencerBookingCampaignOverview.campaignType,
      typeName: action.payload.influencerBookingCampaignOverview.typeName,
      goalName: action.payload.influencerBookingCampaignOverview.goalName,
      campaignCountry:
        action.payload.influencerBookingCampaignOverview.campaignCountry,
      postingFrom:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .formatedPostingFrom,
      postingTo:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .formatedPostingTo,
      completeInDays:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .completeInDays,
      postWordingType:
        action.payload.influencerBookingCampaignOverview.postWordingType,
      postWording: action.payload.influencerBookingCampaignOverview.postWording,
      campaignInstruction:
        action.payload.influencerBookingCampaignOverview.campaignInstruction,
      linkToShare: action.payload.influencerBookingCampaignOverview.linkToShare,
      campaignPreview:
        action.payload.influencerBookingCampaignOverview.campaignPreview,
      isInfluencerAttached:
        action.payload.influencerBookingCampaignOverview.isInfluencerAttached,
      campaignInfluencerStatus:
        action.payload.influencerBookingCampaignOverview
          .campaignInfluencerStatus,
      platformName:
        action.payload.influencerBookingCampaignOverview.platformName,
      isContentUploaded:
        action.payload.influencerBookingCampaignOverview.isContentUploaded,
      isAllUploadedPreviewContent:
        action.payload.influencerBookingCampaignOverview
          .isAllUploadedPreviewContent,
      isAllUploadedContent: action.payload.influencerBookingCampaignOverview.isAllUploadedContent,
      isSubmitedPreviewContent:
        action.payload.influencerBookingCampaignOverview
          .isSubmitedPreviewContent,
      FlowStatus: action.payload.influencerBookingCampaignOverview.FlowStatus,
      isAllLinkedPosted:
        action.payload.influencerBookingCampaignOverview.isAllLinkedPosted,
      campaignAttachments:
        action.payload.influencerBookingCampaignOverview.campaignAttachments,
      lightBoxImages:
        action.payload.influencerBookingCampaignOverview.lightBoxImages,
      // products: action.payload.influencerBookingCampaignOverview.campaignPayment?.campaign_products,
      contentPostType:
        action.payload.influencerBookingCampaignOverview.contentPostType,
      campaignPayment: action.payload.influencerBookingCampaignOverview.campaignPayment,
      // is_influencer_propose: action.payload.influencerBookingCampaignOverview.campaignPayment?.is_influencer_propose,
      // has_fixed_price: action.payload.influencerBookingCampaignOverview.campaignPayment?.has_fixed_price,
      brand: action.payload.influencerBookingCampaignOverview.brand,
      is_appsumo: action.payload.influencerBookingCampaignOverview.is_appsumo,
      payment_processing:
        action.payload.influencerBookingCampaignOverview.payment_processing,
      activeTab: action.payload.flag ? "Overview" : state.activeTab,
      campaignInfluencer: action.payload.campaignInfluencer,
      selectedProducts: action.payload.selectedProducts,
      brandProducts: action.payload.products,
      influencerProduct: action.payload.product,
      campaignTasks: action.payload.influencerBookingCampaignOverview.campaignTasks,
      quoteErrors: {}
    };
  } else if (action.type === HANDLE_INFLUENCER_WORK_DONE_REQUEST_SUCCESS) {
    return {
      ...state,
      campaignTitle:
        action.payload.influencerBookingCampaignOverview.campaignTitle,
      campaignType:
        action.payload.influencerBookingCampaignOverview.campaignType,
      typeName: action.payload.influencerBookingCampaignOverview.typeName,
      goalName: action.payload.influencerBookingCampaignOverview.goalName,
      campaignCountry:
        action.payload.influencerBookingCampaignOverview.campaignCountry,
      postingFrom:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .formatedPostingFrom,
      postingTo:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .formatedPostingTo,
      completeInDays:
        action.payload.influencerBookingCampaignOverview.campaignDate
          .completeInDays,
      postWordingType:
        action.payload.influencerBookingCampaignOverview.postWordingType,
      postWording: action.payload.influencerBookingCampaignOverview.postWording,
      campaignInstruction:
        action.payload.influencerBookingCampaignOverview.campaignInstruction,
      linkToShare: action.payload.influencerBookingCampaignOverview.linkToShare,
      campaignPreview:
        action.payload.influencerBookingCampaignOverview.campaignPreview,
      isInfluencerAttached:
        action.payload.influencerBookingCampaignOverview.isInfluencerAttached,
      campaignInfluencerStatus:
        action.payload.influencerBookingCampaignOverview
          .campaignInfluencerStatus,
      platformName:
        action.payload.influencerBookingCampaignOverview.platformName,
      isContentUploaded:
        action.payload.influencerBookingCampaignOverview.isContentUploaded,
      isAllUploadedPreviewContent:
        action.payload.influencerBookingCampaignOverview
          .isAllUploadedPreviewContent,
      isAllUploadedContent: action.payload.influencerBookingCampaignOverview.isAllUploadedContent,
      isSubmitedPreviewContent:
        action.payload.influencerBookingCampaignOverview
          .isSubmitedPreviewContent,
      FlowStatus: action.payload.influencerBookingCampaignOverview.FlowStatus,
      isAllLinkedPosted:
        action.payload.influencerBookingCampaignOverview.isAllLinkedPosted,
      campaignAttachments:
        action.payload.influencerBookingCampaignOverview.campaignAttachments,
      lightBoxImages:
        action.payload.influencerBookingCampaignOverview.lightBoxImages,
      // products: action.payload.influencerBookingCampaignOverview.campaignPayment?.campaign_products,
      contentPostType:
        action.payload.influencerBookingCampaignOverview.contentPostType,
      campaignPayment: action.payload.influencerBookingCampaignOverview.campaignPayment,
      // is_influencer_propose: action.payload.influencerBookingCampaignOverview.campaignPayment?.is_influencer_propose,
      // has_fixed_price: action.payload.influencerBookingCampaignOverview.campaignPayment?.has_fixed_price,
      brand: action.payload.influencerBookingCampaignOverview.brand,
      is_appsumo: action.payload.influencerBookingCampaignOverview.is_appsumo,
      payment_processing:
        action.payload.influencerBookingCampaignOverview.payment_processing,
      campaignInfluencer: action.payload.campaignInfluencer,
      campaignTasks: action.payload.influencerBookingCampaignOverview.campaignTasks,
      quoteErrors: {}
    };
  } else if (action.type === INFLUENCER_BOOKING_CAMPAIGN_PAYMENT_SUCCESS) {
    return {
      ...state,
      // campaignPayout: action.payload.campaignPayout,
      selectedProducts: action.payload.selectedProducts,
      // campaignInfluencer:action.payload.campaignInfluencer,
      activeTab: "Payment",
    };
  } else if (action.type === INFLUENCER_BOOKING_CAMPAIGN_TASK) {
    return {
      ...state,
      activeTab: "Tasks",
    };
  } else if (action.type === HANDLE_VALIDATION_ERRORS) {
    return {
      ...state,
      errorsObj: action.payload,
    };
  } else if (action.type === INFLUENCER_BOOKING_CAMPAIGN_CONTENT_SUCCESS) {
    return {
      ...state,
      influencerCampaignContent:
        action.payload.influencerBookingCampaignContent,
      previewApprovedFlag: action.payload.previewApprovedFlag,
      campaignTasks: action.payload.campaignTasks,
      isReconnectFlag: action.payload.isReconnectFlag,
      isLoadingSubmit: {},
      activeTab: "Tasks & Delivery",
    };
  } else if (action.type === INFLUENCER_SELECTED_FEED_POST_SUCCESS) {
    return {
      ...state,
      influencerCampaignContent: action.payload.influencerBookingCampaignContent,
      campaignTasks: action.payload.campaignTasks,
      activeTab: "Tasks & Delivery",
    };
  } else if (action.type === HANDLE_INFLUENCER_BOOKING_REQUEST_SUCCESS) {
    return {
      ...state,
      isInfluencerAttached: 1,
    };
  } else if (action.type === HANDLE_INFLUENCER_CANCEL_REQUEST_SUCCESS) {
    return {
      ...state,
      isInfluencerAttached: 0,
    };
  } else if (action.type === FETCH_ABORT_REASONS_SUCCESS) {
    return {
      ...state,
      abortReasons: action.payload.abortReasons,
    };
  } else if (action.type === INFLUENCER_BOOKING_CAMPAIGN_MESSAGES_SUCCESS) {
    return {
      ...state,
      influencerBookingMessages: action.payload.influencerBookingMessages,
      chatMessage: "",
      activeTab: "Message",
    };
  } else if (action.type === HANDLE_CHANGE_SUCCESS) {
    return {
      ...state,
      [action.payload.target.name]: action.payload.target.value,
    };
  } else if (action.type === HANDLE_SELECT_CHANGE_SUCCESS) {
    return {
      ...state,
      selectedReason: action.payload,
      errorsObj: {},
    };
  } else if (action.type === HANDLE_ON_DROP_FILE) {
    return {
      ...state,
      content_images: action.payload,
    };
  } else if (action.type === AJAX_CALL_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === POST_UPLOAD_SUCCESS) {
    return {
      ...state,
      isLoadingPreview: true,
    };
  } else if (action.type === WORK_DONE_SUCCESS) {
    return {
      ...state,
      isLoadingSubmit: { id: action.payload },
    };
  } else if (action.type === INFLUENCER_MESSAGE_INIT) {
    return {
      ...state,
      isLoadingMessage: true,
    };
  } else if (action.type === INFLUENCER_MESSAGE_FINISH) {
    return {
      ...state,
      chatMessage: "",
      isLoadingMessage: false,
    };
  } else if (action.type === POST_UPLOAD_FAILURE) {
    return {
      ...state,
      isLoadingPreview: false,
    };
  } else if (action.type === AJAX_CALL_FINSH) {
    return {
      ...state,
      isLoadingSubmit: {},
      isLoading: false,
    };
  } else if (action.type === INFLUENCER_CAMPAIGN_DETAILS_INIT) {
    return {
      ...state,
      isLoader: true,
    };
  } else if (action.type === INFLUENCER_CAMPAIGN_DETAILS_FINISH) {
    return {
      ...state,
      isLoader: false,
    };
  }
  if (action.type === HANDEL_ACCEPT_MESSAGE_OPTIONAL) {
    return {
      ...state,
      [action.payload.target.name]: action.payload.target.value,
    };
  } else if (action.type === HANDEL_REJECT_MESSAGE_OPTIONAL) {
    return {
      ...state,
      [action.payload.target.name]: action.payload.target.value,
    };
  } else if (action.type === CAMPAIGN_CONTENT_UPLOAD_STORY_SUCCESS) {
    return {
      ...state,
      contentStoryPath: action.payload,
      activeTab: "Content",
    };
  } else if (action.type === "INFLUENCER_INSTAGRAM_FEEDS_PENDING") {
    return {
      ...state,
      instagramIsFetching: { id: action.payload },
    };
  } else if (action.type === "INFLUENCER_INSTAGRAM_FEEDS_FAILURE") {
    return {
      ...state,
      instagramIsFetching: {},
    };
  } else if (action.type === INFLUENCER_INSTAGRAM_FEEDS_SUCCESS) {
    return {
      ...state,
      instagramIsFetching: {},
      influencerInstagramPosts: action.payload,
    };
  } else if (action.type === INFLUENCER_SEND_MESSAGE_SUCCESS) {
    return {
      ...state,
      chatMessage: "",
    };
  } else if (action.type === CAMPAIGN_CONTENT_UPLOAD_STORY_VIDEO_SUCCESS) {
    return {
      ...state,
      errorsObj: {},
      activeTab: "Content",
    };
  } else if (action.type === CAMPAIGN_CONTENT_UPLOAD_STORY_INSIGHT_SUCCESS) {
    return {
      ...state,
      errorsObj: {},
      activeTab: "Content",
    };
  } else if (action.type === "FETCH_TIKTOK_LIST_VIDEO_PENDING") {
    return {
      ...state,
      tiktokIsFetching: { id: action.payload },
    };
  } else if (action.type === "FETCH_TIKTOK_LIST_VIDEO_SUCCESS") {
    return {
      ...state,
      tiktokIsFetching: {},
      tiktokData: action.payload,
    };
  } else if (action.type === "FETCH_TIKTOK_LIST_VIDEO_FAILURE") {
    return {
      ...state,
      tiktokIsFetching: {},
    };
  } else if (action.type === "FETCH_YOUTUBE_LIST_VIDEO_PENDING") {
    return {
      ...state,
      youtubeIsFetching: { id: action.payload },
    };
  } else if (action.type === "FETCH_YOUTUBE_LIST_VIDEO_SUCCESS") {
    return {
      ...state,
      youtubeIsFetching: {},
      youtubeData: action.payload,
    };
  } else if (action.type === "FETCH_YOUTUBE_LIST_VIDEO_FAILURE") {
    return {
      ...state,
      youtubeIsFetching: {},
    };
  } else if (
    action.type === "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_PENDING"
  ) {
    return {
      ...state,
      quotePaymentIsProcessing: true,
    };
  } else if (
    action.type === "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_SUCCESS"
  ) {
    return {
      ...state,
      quoteErrors: {},
      quotePaymentIsProcessing: false,
      campaignInfluencer: action.payload.campaignInfluencer,
      selectedProducts: action.payload.selected_products,
    };
  } else if (
    action.type === "SUBMIT_INFLUENCER_REQUEST_QUOTE_PAYMENT_FAILURE"
  ) {
    return {
      ...state,
      quoteErrors: action.payload.errors,
      quotePaymentIsProcessing: false
    };
  } else if (action.type === HANDLE_CHANGE_CAMPAIGN_ID) {
    return {
      ...state,
      campaignId: action.payload,
      campaignTitle: "",
      campaignType: "",
      typeName: "",
      campaignCountry: "",
      postingFrom: "",
      postingTo: "",
      completeInDays: "",
      postWordingType: "",
      postWording: "",
      campaignInstruction: "",
      linkToShare: "",
      campaignPreview: "",
      isInfluencerAttached: 0,
      campaignPayout: {},
      influencerCampaignContent: [],
      content_images: [],
      contentStoryPath: "",
      campaignInfluencerStatus: "",
      abortReasons: [],
      selectedReason: "",
      influencerBookingMessages: [],
      campaignAttachments: [],
      lightBoxImages: [],
      contentPostType: [],
      // products: [],
      chatMessage: "",
      platformName: "",
      acceptOptionalMessage: "",
      rejectOptionalMessage: "",
      isAllUploadedPreviewContent: 0,
      isSubmitedPreviewContent: 0,
      isSubmitedPreviewFlag: 0,
      previewApprovedFlag: 0,
      isReconnectFlag: 0,
      influencerInstagramPosts: [],
      isAllLinkedPosted: 0,
      // fixedFee: 0,
      // is_influencer_propose: false,
      // has_fixed_price: false,
      errorsObj: {},
      campaignPayment: {},
      brand: {},
    };
  } else if (action.type === BRAND_BOOKING_CAMPAIGN_REJECT_SUCCESS) {
    return {
      ...state,
      rejectOptionalMessage: "",
    }
  } else {
    return state;
  }
}

export default InfluencersBookingIDReducer;