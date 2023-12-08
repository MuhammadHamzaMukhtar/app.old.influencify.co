import {
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    BRAND_BOOKING_CAMPAIGN_INFLUENCERS_SUCCESS,
    BRAND_BOOKING_CAMPAIGN_BRIEF_SUCCESS,
    HANDEL_ACCEPT_MESSAGE_OPTIONAL,
    BRAND_BOOKING_CAMPAIGN_CONTENT_SUCCESS,
    BRAND_BOOKING_CAMPAIGN_ACTIVITES_SUCCESS,
    BRAND_BOOKING_CAMPAIGN_MESSAGES_SUCCESS,
    BRAND_BOOKING_CAMPAIGN_CHAT_USERS_SUCCESS,
    FETCH_CHAT_USER_MESSAGES_SUCCESS,
    BRAND_SEND_MESSAGE_SUCCESS,
    HANDLE_CHANGE_SUCCESS,
    BRAND_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS,
    HANDEL_BRAND_SEND_MESSAGE,
    BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_SUCCESS,
    FETCH_DRAFT_DROPDOWN_CAMPAIGNS_SUCCESS,
    FETCH_CLOSED_DROPDOWN_CAMPAIGNS_SUCCESS,
    HANDLE_VALIDATION_ERRORS,
    FETCH_MESSAGE_INIT,
    FETCH_MESSAGE_FINSH,
    HANDLE_NOTIFY_TYPE,
    EMAIL_CALL_INIT,
    EMAIL_CALL_FINISH,
    BRAND_SEND_ATTACHMENT_SUCCESS,
} from "../constants/action-types";

const initialState = {
    isLoading                           : false,
    isLoadingMessages                   : false,
    errorsObj                           : {},
    requestedCampaignInfluencers        : [],
    waitingCampaignInfluencers          : [],
    inprogressCampaignInfluencers       : [],
    closedCampaignInfluencers           : [],
    rejectedCampaignInfluencers         : [],
    abortedCampaignInfluencers          : [],
    canceledCampaignInfluencers         : [],
    allCampaignInfluencersCount         : 0,
    allCampaignContentsCount            : 0,
    engagementPercentage                : 0,
    invitation_open_rate                : 0,
    sent_count                : 0,
    read_count                : 0,
    requestedCampaignInfluencersCount   : 0,
    waitingCampaignInfluencersCount     : 0,
    inprogressCampaignInfluencersCount  : 0,
    closedCampaignInfluencersCount      : 0,
    rejectedCampaignInfluencersCount    : 0,
    abortedCampaignInfluencersCount     : 0,
    canceledCampaignInfluencersCount    : 0,
    bookingCampaignBrief                : {},
    optionalMessage                     : '',
    acceptOptionalMessage               : '',
    rejectOptionalMessage               : '',
    typeName                            : '',
    platform                            : '',

    waitingCampaignContents             : [],
    pendingCampaignContents             : [],
    acceptedCampaignContents            : [],
    waitingCampaignContentsCount        : 0,
    pendingCampaignContentsCount        : 0,
    acceptedCampaignContentsCount       : 0,
    spendedBudget                       : 0,
    spendedPercentage                   : 0,

    bookingCampaignChatUsers            : [],
    bookingCampaignMessages             : [],
    chatUserMessages                    : [],
    chatMessage                         : '',
    bookingCampaignActivies             : [],
    influencersGraph                    : {},
    postsGraph                          : {},
    reachGraph                          : {},
    engagementGraph                     : {},
    contents                            : [],
    campaign                            : {},
    brandMessage                        : '',
    notifyType                          : '',
    randomNumber                        : Math.random(),
    reinviteInfluencerLoading: {},
    influencerEmailLogLoading: false,
    influencerEmailLogData:[]
};

const BrandBookingCampaignReducer =   (state = initialState, action) => {
    if (action.type === BRAND_BOOKING_CAMPAIGN_INFLUENCERS_SUCCESS) {
        return {
            ...state,
            requestedCampaignInfluencers       : action.payload.bookingCampaignInfluencers.requestedCampaignInfluencers,
            waitingCampaignInfluencers         : action.payload.bookingCampaignInfluencers.waitingCampaignInfluencers,
            inprogressCampaignInfluencers      : action.payload.bookingCampaignInfluencers.inprogressCampaignInfluencers,
            closedCampaignInfluencers          : action.payload.bookingCampaignInfluencers.closedCampaignInfluencers,
            rejectedCampaignInfluencers        : action.payload.bookingCampaignInfluencers.rejectedCampaignInfluencers,
            abortedCampaignInfluencers         : action.payload.bookingCampaignInfluencers.abortedCampaignInfluencers,
            canceledCampaignInfluencers        : action.payload.bookingCampaignInfluencers.canceledCampaignInfluencers,
            requestedCampaignInfluencersCount  : action.payload.bookingCampaignInfluencers.requestedCampaignInfluencersCount,
            waitingCampaignInfluencersCount    : action.payload.bookingCampaignInfluencers.waitingCampaignInfluencersCount,
            inprogressCampaignInfluencersCount : action.payload.bookingCampaignInfluencers.inprogressCampaignInfluencersCount,
            closedCampaignInfluencersCount     : action.payload.bookingCampaignInfluencers.closedCampaignInfluencersCount,
            rejectedCampaignInfluencersCount   : action.payload.bookingCampaignInfluencers.rejectedCampaignInfluencersCount,
            abortedCampaignInfluencersCount    : action.payload.bookingCampaignInfluencers.abortedCampaignInfluencersCount,
            canceledCampaignInfluencersCount   : action.payload.bookingCampaignInfluencers.canceledCampaignInfluencersCount,
            typeName                           : action.payload.bookingCampaignInfluencers.typeName,
            platform                           : action.payload.bookingCampaignInfluencers.platform,
        }
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_CONTENT_SUCCESS) {
        return {
            ...state,
            waitingCampaignContents         : action.payload.bookingCampaignContent.waitingCampaignContents,
            pendingCampaignContents         : action.payload.bookingCampaignContent.pendingCampaignContents,
            acceptedCampaignContents        : action.payload.bookingCampaignContent.acceptedCampaignContents,
            waitingCampaignContentsCount    : action.payload.bookingCampaignContent.waitingCampaignContentsCount,
            pendingCampaignContentsCount    : action.payload.bookingCampaignContent.pendingCampaignContentsCount,
            acceptedCampaignContentsCount   : action.payload.bookingCampaignContent.acceptedCampaignContentsCount,
            platform                        : action.payload.bookingCampaignContent.platform,
            acceptOptionalMessage           : '',
        }
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_BRIEF_SUCCESS) {
        return {
            ...state,
            bookingCampaignBrief  : action.payload.bookingCampaignBrief,
        }
    }
    if (action.type === EMAIL_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === EMAIL_CALL_FINISH) {
        return {
            ...state,
            isLoading: false
        }
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_CHAT_USERS_SUCCESS) {
        return {
            ...state,
            bookingCampaignChatUsers  : action.payload.bookingCampaignChatUsers,
        }
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_MESSAGES_SUCCESS) {
        return {
            ...state,
            bookingCampaignMessages  : action.payload.bookingCampaignMessages,
        }
    }
    if (action.type === FETCH_CHAT_USER_MESSAGES_SUCCESS) {
        return {
            ...state,
            chatUserMessages  : action.payload.chatUserMessages,
     
        }
    }
    else if(action.type === HANDLE_CHANGE_SUCCESS) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        };
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_ACTIVITES_SUCCESS) {
        return {
            ...state,
            bookingCampaignActivies  : action.payload.bookingCampaignActivies,
        }
    }
    if (action.type === BRAND_BOOKING_CAMPAIGN_OVERVIEW_SUCCESS) {
        return {
            ...state,
            randomNumber                : Math.random(),
            influencersGraph            : action.payload.bookingCampaignOverview.influencers,
            postsGraph                  : action.payload.bookingCampaignOverview.posts,
            reachGraph                  : action.payload.bookingCampaignOverview.reach,
            contents                    : action.payload.bookingCampaignOverview.contents,
            campaign                    : {...action.payload.bookingCampaignOverview.campaign,currency_code:"USD"},
            spendedBudget               : action.payload.bookingCampaignOverview.spendedBudget,
            spendedPercentage           : action.payload.bookingCampaignOverview.spendedPercentage,
            allCampaignInfluencersCount : action.payload.bookingCampaignOverview.allCampaignInfluencersCount,
            allCampaignContentsCount    : action.payload.bookingCampaignOverview.allCampaignContentsCount,
            engagementGraph             : action.payload.bookingCampaignOverview.engagementGraph,
            invitation_open_rate        : action.payload.bookingCampaignOverview.invitation_open_rate,
            sent_count                  : action.payload.bookingCampaignOverview.sent_count,
            read_count                  : action.payload.bookingCampaignOverview.read_count,
        }
    }
    if (action.type === HANDEL_ACCEPT_MESSAGE_OPTIONAL) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        }
    }
    if (action.type === HANDEL_BRAND_SEND_MESSAGE) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        }
    }
    if (action.type === BRAND_SEND_MESSAGE_SUCCESS) {
        return {
            ...state,
            chatMessage: ''
        }
    }
    if (action.type === FETCH_ACTIVE_DROPDOWN_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            activeCampaigns: action.payload
        }
    }
    if (action.type === FETCH_DRAFT_DROPDOWN_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            draftCampaigns: action.payload
        }
    }
    if (action.type === FETCH_CLOSED_DROPDOWN_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            closedCampaigns: action.payload
        }
    }
    if (action.type === BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS) {
        return {
            ...state,
            campaignId                      : action.payload,
            campaign                        : {},
            requestedCampaignInfluencers    : [],
            waitingCampaignInfluencers      : [],
            inprogressCampaignInfluencers   : [],
            closedCampaignInfluencers       : [],
            rejectedCampaignInfluencers     : [],
            abortedCampaignInfluencers      : [],
            canceledCampaignInfluencers     : [],
            waitingCampaignContents         : [],
            pendingCampaignContents         : [],
            acceptedCampaignContents        : [],
            bookingCampaignChatUsers        : [],
            bookingCampaignMessages         : [],
            chatMessage                     : '',
            chatUserMessages                : [],
            bookingCampaignActivies         : [],
        }
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true,
        }
    } 
    else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    else if (action.type === BRAND_SEND_ATTACHMENT_SUCCESS) {
        return {
            ...state,
            errorsObj: {}
        }
    }
    else if (action.type === FETCH_MESSAGE_INIT) {
        return {
            ...state,
            isLoadingMessages: true
        }
    } 
    else if (action.type === FETCH_MESSAGE_FINSH) {
        return {
            ...state,
            isLoadingMessages: false
        }
    }
    else if(action.type === HANDLE_VALIDATION_ERRORS) {
        return {
            ...state,
            errorsObj : action.payload
        };
    } 
    else if(action.type === HANDLE_NOTIFY_TYPE) {
        return {
            ...state,
            notifyType : action.payload
        };
    } 
    else if (action.type === "UPDATE_WAITING_CAMPAIGN_INFLUENCER") {
        return {
            ...state,
            waitingCampaignInfluencers:action.payload
        }
    } else if (action.type === "SEND_REINVITE_INFLUENCER_PENDING") {
        return {
            ...state,
            reinviteInfluencerLoading:{
                ...state.reinviteInfluencerLoading,
                [action.payload.id]:true
            }
        }
    } else if (action.type === "SEND_REINVITE_INFLUENCER_SUCCESS") {
        return {
            ...state,
            reinviteInfluencerLoading:{
                ...state.reinviteInfluencerLoading,
                [action.payload.id]:false
            }
        }
    } else if (action.type === "SEND_REINVITE_INFLUENCER_FAILURE") {
        return {
            ...state,
            reinviteInfluencerLoading:{
                ...state.reinviteInfluencerLoading,
                [action.payload.id]:false
            }
        }
    } else if (action.type === "INFLUENCER_EMAIL_LOG_PENDING") {
        return {
            ...state,
            influencerEmailLogLoading:true
        }
    } else if (action.type === "INFLUENCER_EMAIL_LOG_SUCCESS") {
        return {
            ...state,
            influencerEmailLogLoading:false,
            influencerEmailLogData:action.payload,
        }
    } else if (action.type === "INFLUENCER_EMAIL_LOG_FAILURE") {
        return {
            ...state,
            influencerEmailLogLoading: false,
            influencerEmailLogData:[]
        }
    }
    else {
        return state;
    }
}

export default BrandBookingCampaignReducer;