import {
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    FETCH_INFLUENCER_CAMPAIGNS_SUCCESS,
    FETCH_TODO_INFLUENCER_CAMPAIGNS_SUCCESS,
    FETCH_WAITING_INFLUENCER_CAMPAIGNS_SUCCESS,
    FETCH_CLOSED_INFLUENCER_CAMPAIGNS_SUCCESS,
} from "../constants/action-types";

const initialState = {
    
    waitingAllInfluencerCampaigns       : [],
    requestedInfluencerCampaigns        : [],
    waitingAllInfluencerCampaignsCount  : 0,
    requestedInfluencerCampaignsCount   : 0,

    todoAllInfluencerCampaigns          : [],
    inProgressInfluencerCampaigns       : [],
    previewInfluencerCampaigns          : [],
    todoAllInfluencerCampaignsCount     : 0,
    inProgressInfluencerCampaignsCount  : 0,
    previewInfluencerCampaignsCount     : 0,

    closedAllInfluencerCampaigns        : [],
    abortedInfluencerCampaigns          : [],
    rejectedInfluencerCampaigns         : [],
    closedInfluencerCampaigns           : [],
    canceledInfluencerCampaigns         : [],
    closedAllInfluencerCampaignsCount   : 0,
    abortedInfluencerCampaignsCount     : 0,
    rejectedInfluencerCampaignsCount    : 0,

    allToDoPagination                   : {},
    inprogressPagination                : {},
    previewPagination                   : {},

};

const InfluencerBookingReducer = (state = initialState, action) => {
    if (action.type === FETCH_INFLUENCER_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            previewUploadInfluencerCampaigns    : action.payload.previewUploadInfluencerCampaigns,
            waitinginfluencerCampaigns          : action.payload.waitinginfluencerCampaigns,
            closedInfluencerCampaigns           : action.payload.closedInfluencerCampaigns,
            allInfluencerCampaignsTotal         : action.payload.allInfluencerCampaignsTotal,
            waitinginfluencerCampaignsTotal     : action.payload.waitinginfluencerCampaignsTotal,
            closedInfluencerCampaignsTotal      : action.payload.closedInfluencerCampaignsTotal
        }
    }
    if (action.type === FETCH_WAITING_INFLUENCER_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            waitingAllInfluencerCampaigns       : action.payload.waitingAllInfluencerCampaigns,
            requestedInfluencerCampaigns        : action.payload.requestedInfluencerCampaigns,
            waitingAllInfluencerCampaignsCount  : action.payload.waitingAllInfluencerCampaignsCount,
            requestedInfluencerCampaignsCount   : action.payload.requestedInfluencerCampaignsCount,
        }
    }
    if (action.type === FETCH_TODO_INFLUENCER_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            todoAllInfluencerCampaigns              : action.payload.todoAllInfluencerCampaigns,
            inProgressInfluencerCampaigns           : action.payload.inProgressInfluencerCampaigns,
            todoAllInfluencerCampaignsCount         : action.payload.todoAllInfluencerCampaignsCount,
            inProgressInfluencerCampaignsCount      : action.payload.inProgressInfluencerCampaignsCount,
            previewInfluencerCampaignsCount         : action.payload.previewInfluencerCampaignsCount,
        }
    }
    if (action.type === FETCH_CLOSED_INFLUENCER_CAMPAIGNS_SUCCESS) {
        return {
            ...state,
            closedAllInfluencerCampaigns         : action.payload.closedAllInfluencerCampaigns,
            abortedInfluencerCampaigns           : action.payload.abortedInfluencerCampaigns,
            rejectedInfluencerCampaigns          : action.payload.rejectedInfluencerCampaigns,
            closedInfluencerCampaigns            : action.payload.closedInfluencerCampaigns,
            canceledInfluencerCampaigns          : action.payload.canceledInfluencerCampaigns,
        }
    }
    else if (action.type === AJAX_CALL_INIT) {
        return {
            ...state,
            isLoading: true
        }
    } 
    else if (action.type === AJAX_CALL_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    } 
    else {
        return state;
    }
}

export default InfluencerBookingReducer;