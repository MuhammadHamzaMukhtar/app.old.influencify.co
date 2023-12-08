import { currentLoggedInUser } from "@store/actions/HeaderActions";
import { 
    FETCH_NOTIFICATIONS_SUCCESS ,
    CURRENT_LOGGED_IN_USER_SUCCESS,
    AJAX_CALL_NOTIFICATION_INIT, 
    AJAX_CALL_NOTIFICATION_FINISH,
    HANDLE_CHECK_NOTIFICATION_SUCCESS,
    MARK_AS_READ_NOTIFICATIONS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    REFRESH_REPORTS_SUCCESS,
    HANDLE_BRAND_GMAIL_TOKEN_SUCCESS
} from "../constants/action-types";

const initialState = {
    notifications                               : [],
    currentLoggedUser    	                    : {},
    refreshData                                 : {},
    offer                                       : {},
    isLoading                                   : false,
    checkedNotifications                        : [],
    discoverTiktokInfluencers                   : false,
    discoverYoutubeInfluencers                  : false,
    gmail                                       : false,
    influentialFollowers                        : false,
    analyzer                                    : false,
    contentCampaigns                            : false,
    shopify                                     : false,
    discoverInstagramInfluencers                : false,
    isLoadingNotification                       : false,
    campaignCommisonFee                         : 0,
    publicCampaigns                             : 0,
    directCampaigns                             : 0,
    payPerProduct                               : 0,
    discoverSearches                            : 0,
    reportCredits                               : 0,
    verifiedReportCredits                       : 0,
    nonVerifiedReportCredits                    : 0,
    remainingDiscoverSearches                   : 0,
    remainingCredits                            : 0,
    remainingDirectCampaigns                    : 0,
    remainingPayPerProducts                     : 0,
    remainingPublicCampaigns                    : 0,
    planName                                    : '',
    isPlanSubscribed                            : true,
    freeTrialEnd                                : '',
    isFreeTrial                                 : false,
    isOnFreeTrial                               : false,
    isPaid: false,
    requestInvitationStatus:false,
    requestInvitationMessage:"",
};

const HeaderReducer = (state = initialState, action) => {
    if (action.type === FETCH_NOTIFICATIONS_SUCCESS) {
        return {
            ...state,
            notifications: action.payload,
            currentLoggedUser: {
                ...state.currentLoggedUser,
                notificationCount: action.payload.length
            }
        };
    }
    if (action.type === CURRENT_LOGGED_IN_USER_SUCCESS) {
        return {
            ...state,
            currentLoggedUser: {
                ...action.payload,
                currency_code:"USD"
            }
        };
    }
    if (action.type === HANDLE_BRAND_GMAIL_TOKEN_SUCCESS) {
        return {
            ...state,
            currentLoggedUser: {
                ...action.payload,
                isGmailLinked: true
            }
        };
    }
    if (action.type === "HANDLE_BRAND_SHOPIFY_DISCONNECT") {
        return {
            ...state,
            currentLoggedUser: {
                ...state.currentLoggedUser,
                isShopifyLinked:false
            }
        };
    }
    if (action.type === REFRESH_REPORTS_SUCCESS) {
        return {
            ...state,
            refreshData                         : action.payload,
            planName                            : action.payload.planName,
            isPlanSubscribed                    : action.payload.isPlanSubscribed,
            freeTrialEnd                        : action.payload.freeTrialEnd,
            isFreeTrial                         : action.payload.isFreeTrial,
            isOnFreeTrial                       : action.payload.isOnFreeTrial,
            isPaid                              : action.payload.isPaid,
            remainingDiscoverSearches           : action.payload.remainingDiscoverSearches,
            remainingCredits                    : action.payload.remainingCredits,
            remainingDirectCampaigns            : action.payload.remainingDirectCampaigns,
            remainingPayPerProducts             : action.payload.remainingPayPerProducts,
            remainingPublicCampaigns            : action.payload.remainingPublicCampaigns,
            discoverTiktokInfluencers           : action.payload.offer?.discoverTiktokInfluencers ? action.payload.offer.discoverTiktokInfluencers : false,
            discoverYoutubeInfluencers          : action.payload.offer?.discoverYoutubeInfluencers ? action.payload.offer.discoverYoutubeInfluencers : false,
            gmail                               : action.payload.offer?.gmail ? action.payload.offer.gmail : false,
            influentialFollowers                : action.payload.offer?.influentialFollowers ? action.payload.offer.influentialFollowers : false,
            analyzer                            : action.payload.offer?.analyzer ? action.payload.offer.analyzer : false,
            contentCampaigns                    : action.payload.offer?.contentCampaigns ? action.payload.offer.contentCampaigns : false,
            shopify                             : action.payload.offer?.shopify ? action.payload.offer.shopify : false,
            discoverInstagramInfluencers        : action.payload.offer?.discoverInstagramInfluencers ? action.payload.offer.discoverInstagramInfluencers : false,
            campaignCommisonFee                 : action.payload.offer?.serviceFee ? action.payload.offer.serviceFee : 0,
            publicCampaigns                     : action.payload.offer?.publicCampaigns ? action.payload.offer.publicCampaigns : 0,
            directCampaigns                     : action.payload.offer?.directCampaigns ? action.payload.offer.directCampaigns : 0,
            payPerProduct                       : action.payload.offer?.payPerProduct ? action.payload.offer.payPerProduct : 0,
            discoverSearches                    : action.payload.offer?.discoverSearches ? action.payload.offer.discoverSearches : 0,
            reportCredits                       : action.payload.offer?.reportCredits ? action.payload.offer.reportCredits : 0,
            verifiedReportCredits               : action.payload.offer?.verifiedReportCredits ? action.payload.offer.verifiedReportCredits : 0,
            nonVerifiedReportCredits            : action.payload.offer?.nonVerifiedReportCredits ? action.payload.offer.nonVerifiedReportCredits : 0,
        }
    }
    if (action.type === HANDLE_CHECK_NOTIFICATION_SUCCESS) {
        if (action.payload.status) {
            return {
                ...state,
                checkedNotifications: [...state.checkedNotifications, action.payload.notification]
            }
        }
        const updatedArray = state.checkedNotifications.filter(
            selectedNotification => selectedNotification.id !== action.payload.notification.id
        );
        return {
            ...state,
            checkedNotifications: updatedArray
        }
    } else if (action.type === "BRAND_REQUEST_INVITATION_PENDING") {
        return {
                ...state,
                requestInvitationStatus: false,
                requestInvitationMessage: "",
            }
    } else if (action.type === "BRAND_REQUEST_INVITATION_SUCCESS") {
        return {
                ...state,
                requestInvitationStatus: action.payload.status,
                requestInvitationMessage: action.payload.message,
            }
    }
    else if (action.type === MARK_AS_READ_NOTIFICATIONS_SUCCESS) {
        return {
            ...state,
            checkedNotifications: []
        }
    }
    else if (action.type === AJAX_CALL_NOTIFICATION_INIT) {
        return {
            ...state,
            isLoadingNotification: true
        }
    } else if (action.type === AJAX_CALL_NOTIFICATION_FINISH) {
        return {
            ...state,
            isLoadingNotification: false
        }
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    return state;
}

export default HeaderReducer;