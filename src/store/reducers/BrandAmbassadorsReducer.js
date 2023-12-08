import { 
    FETCH_BRAND_NOTABLE_USERS_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    HANDLE_SORT_NOTABLE_USERS,
    HANDLE_NOTABLE_USER_REPORT_SUCCESS,
    HANDLE_CLOSE_PROCEED_MODAL,
    CREATE_CAMPAIGN_WITH_NOTABLE_USERS,
    BRAND_INFLUENCIAL_FOLLOWERS_LOADING 
} from "../constants/action-types";

const initialState = {
    isLoading                       : false,
    isProceedModalShow              : false,
    campaignId                      : '',
    brandInfo                       : {},
    userName                        : '',
    instaUserName                   : '',
    channelId                       : '',
    openId                          : '',
    notableUsers                    : [],
    notableLikers                   : [],
    sortQuery                       : "followers",
    inCorrectInfluencers            : [],
    correctInfluencers              : [],
    influencialFollowerLoading: false,
    influencialLikerLoading: false,
    notableTotalUser:0,
    notableTotalLiker:0,
};

const BrandAmbassadorsReducer = (state = initialState, action) => {
    if (action.type === FETCH_BRAND_NOTABLE_USERS_SUCCESS) {
        return {
            ...state,
            influencialFollowerLoading      : false,
            userName                        : action.payload.userName ?? '',
            channelId                       : action.payload.channelId ?? '',
            openId                          : action.payload.openId ?? '',
            instaUserName                   : action.payload.instaUserName ?? '',
            brandInfo                       : action.payload.brandInfo,
        };
    }
    else if (action.type === HANDLE_SORT_NOTABLE_USERS) {
        return {
            ...state,
            sortQuery : action.payload,
        };
    }
    else if(action.type === HANDLE_NOTABLE_USER_REPORT_SUCCESS) {
        return {
            ...state,
            isLoading            : false,
            isProceedModalShow   : true,
            correctInfluencers   : action.payload.correctInfluencers,
            inCorrectInfluencers : action.payload.inCorrectInfluencers
        };
    }
    else if (action.type === HANDLE_CLOSE_PROCEED_MODAL) {
        return {
            ...state,
            isProceedModalShow: false
        }
    } 
    else if (action.type === CREATE_CAMPAIGN_WITH_NOTABLE_USERS) {
        return {
            ...state,
            isProceedModalShow  : false,
            campaignId          : action.payload
        }
    }
    else if (action.type === BRAND_INFLUENCIAL_FOLLOWERS_LOADING) {
        return {
            ...state,
            influencialFollowerLoading: true
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
    } else if (action.type === "FETCH_INFLUENTIAL_FOLLOWER_PENDING") {
        return {
            ...state,
            influencialFollowerLoading: true
        }
    } else if (action.type === "FETCH_INFLUENTIAL_FOLLOWER_SUCCESS") {
        return {
            ...state,
            influencialFollowerLoading      : false,
            notableUsers                    : action.payload.data,
            notableTotalUser                    : action.payload.total,
        }
    } else if (action.type === "FETCH_INFLUENTIAL_FOLLOWER_MORE") {
        return {
            ...state,
            influencialFollowerLoading      : false,
            notableUsers                    : state.notableUsers.concat(action.payload.data),
            notableTotalUser                    : action.payload.total,
        }
    } else if (action.type === "FETCH_INFLUENTIAL_FOLLOWER_FAILURE") {
        return {
            ...state,
            influencialFollowerLoading      : false,
        }
    } else if (action.type === "FETCH_INFLUENTIAL_LIKER_PENDING") {
        return {
            ...state,
            influencialLikerLoading: true
        }
    } else if (action.type === "FETCH_INFLUENTIAL_LIKER_SUCCESS") {
        return {
            ...state,
            influencialLikerLoading      : false,
            notableLikers                    : action.payload.data,
            notableTotalLiker                    : action.payload.total,
        }
    } else if (action.type === "FETCH_INFLUENTIAL_LIKER_MORE") {
        return {
            ...state,
            influencialLikerLoading      : false,
            notableLikers                    : state.notableLikers.concat(action.payload.data),
            notableTotalLiker                    : action.payload.total,
        }
    } else if (action.type === "FETCH_INFLUENTIAL_LIKER_FAILURE") {
        return {
            ...state,
            influencialLikerLoading      : false,
        }
    }
     
    return state;
}
export default BrandAmbassadorsReducer;