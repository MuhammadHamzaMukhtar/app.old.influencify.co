import { 
    FETCH_INFLUENCER_PROFILE_INIT,
    FETCH_INFLUENCER_PROFILE_FINSH,
    FETCH_INFLUENCER_PROFILE_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    FETCH_INFLUENCER_TIKTOK_PROFILE_SUCCESS,
    ERROR_MESSAGE_DATA,
    HANDLE_CLEAR_ERROR_SUCCESS,
    BRADN_REFRESH_PROFILE_INIT,
    BRADN_REFRESH_PROFILE_FINISH,
    HANDLE_REFRESH_PROFILE_LOADING,
    HANDLE_REFRESH_INFLEUNCER_PROFILE_SUCCESS
} from "../constants/action-types";

const initialState = {
    inflName                    : '',
    inflUserName                : '',
    influencerEmail             : '',
    influencerUniqueId          : '',
    country                     : '',
    countryCode                 : '',
    modashCountry               : '',
    inflType                    : '',
    inflBio                     : '',
    inflWebsite                 : '',
    inflLocation                : '',   
    inflFollowersCount          : 0,   
    postStartPrice              : 0,   
    userProfile                 : '',   
    instaLink                   : '',   
    fbLink                      : '',   
    linknedLink                 : '',   
    twitterLink                 : '',   
    pinterestLink               : '',   
    webLink                     : '',   
    inflCategories              : [],
    instagramFeeds              : [],
    instagramFeedsVideos        : [],
    audienceAgeGenderValue      : [],
    audienceGenderPercentage    : [],
    audienceTopCities           : [],
    audienceTopInterests        : [],
    audienceTopCountries        : [],
    instagramStats              : [],
    averageInteractionData      : [],
    audienceLookalikes          : [],
    infl_interests              : [],
    geojson                     : [],
    engagementRate              : 0,
    isLoading                   : true,   
    isLoader                    : false,   
    avgInteractions             : 0,   
    earnedMedia                 : 0,   
    credibility                 : 0,   
    tikTokProfile               : {},   
    isModashUser                : false,   
    isInstagramConnected        : true,   
    isTikTokConnected           : false,   
    isVerified                  : false,   
    isModash                    : false,  
    noEmailExist                : false,  
    isOpenModal                 : false,  
    errorMessage                : false,  
    NoCreditsExist              : false,  
    onFreeTrial                 : false,
    refreshProfileLoading       : false,  
};

const InfluencerProfileReducer = (state = initialState, action) => {
    if (action.type === FETCH_INFLUENCER_PROFILE_SUCCESS) {
        if (action.payload === 'InstagramNotConnected') {
             return {
                ...state,
                isInstagramConnected    : false,
            };
        }
        else{
             return {
                ...state,
                isInstagramConnected        : true,
                errorMessage                : false,
                NoCreditsExist              : false,
                inflName                    : action.payload.influencerInfo.infl_name,
                inflUserName                : action.payload.influencerInfo.infl_username,
                userProfile                 : action.payload.influencerInfo.profile_picture_url,
                inflType                    : action.payload.influencerInfo.influencer_type,
                inflBio                     : action.payload.influencerInfo.infl_bio,
                inflWebsite                 : action.payload.influencerInfo.website,
                inflFollowersCount          : action.payload.influencerInfo.followers_count,
                credibility                 : action.payload.influencerInfo.credibility,
                inflLocation                : action.payload.influencerInfo.location,
                postStartPrice              : action.payload.influencerInfo.post_start_price,
                influencer_type             : action.payload.influencerInfo.influencer_type,
                infl_interests              : action.payload.influencerInfo.infl_interests,
                isModashUser                : action.payload.influencerInfo.isModashUser,
                modashCountry               : action.payload.influencerInfo.modashCountry,
                instaLink                   : action.payload.userSocialLink.insta_link,
                fbLink                      : action.payload.userSocialLink.fb_link,
                linknedLink                 : action.payload.userSocialLink.linkned_link,
                twitterLink                 : action.payload.userSocialLink.twitter_link,
                pinterestLink               : action.payload.userSocialLink.pinterest_link,
                webLink                     : action.payload.userSocialLink.web_link,
                instagramFeeds              : action.payload.instagramFeeds,
                instagramFeedsVideos        : action.payload.instagramFeedsVideos,
                audienceAgeGenderValue      : action.payload.audienceAgeGenderValue,
                audienceGenderPercentage    : action.payload.audienceGenderPercentage,
                audienceTopCities           : action.payload.audienceTopCities,
                audienceTopInterests        : action.payload.audienceTopInterests,
                audienceTopCountries        : action.payload.audienceTopCountries,
                instagramStats              : action.payload.instagramStats,
                inflCategories              : action.payload.categories,
                averageInteractionData      : action.payload.averageInteractionData,
                engagementRate              : action.payload.engagementRate,
                influencerEmail             : action.payload.influencerEmail,
                influencerUniqueId          : action.payload.influencerUniqueId,
                country                     : action.payload.country,
                countryCode                 : action.payload.countryCode,
                isVerified                  : action.payload.isVerified,
                avgInteractions             : action.payload.avgInteractions,
                earnedMedia                 : action.payload.earnedMedia,
                isModash                    : action.payload.isModash,
                audienceLookalikes          : action.payload.audienceLookalikes,
            };
        }       
    }
    else if (action.type === FETCH_INFLUENCER_PROFILE_INIT) {
        return {
            ...state,
            isLoading  : true,
            isOpenModal: true
        }
    } 
    else if (action.type === FETCH_INFLUENCER_PROFILE_FINSH) {
        return {
            ...state,
            isLoading: false,
            isOpenModal: false
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
    else if (action.type === BRADN_REFRESH_PROFILE_INIT) {
        return {
            ...state,
            isLoader: true
        }
    } 
    else if (action.type === BRADN_REFRESH_PROFILE_FINISH) {
        return {
            ...state,
            isLoader: false
        }
    }
    else if (action.type === ERROR_MESSAGE_DATA) {
        if (action.payload.code === 'NoCreditsExist') {
            return {
                ...state,
                isLoading      : false,
                NoCreditsExist : true,
                onFreeTrial    : action.payload.onFreeTrial,
                errorMessage   : false
            }
        }
        else{
            return {
                ...state,
                isLoading    : false,
                errorMessage : true
            }
        }
    }
    else if (action.type === HANDLE_CLEAR_ERROR_SUCCESS) {
        return {
            ...state,
            NoCreditsExist : false,
            errorMessage   : false
        }
    }
    else if (action.type === FETCH_INFLUENCER_TIKTOK_PROFILE_SUCCESS) {
        if (action.payload === 'TikTokNotConnected') {
            return {
                ...state,
                isTikTokConnected : false,
            }
        }
        else{
            return {
                ...state,
                isTikTokConnected           : true,
                tikTokProfile               : action.payload.tikTokProfile,
                audienceAgeGenderValue      : action.payload.audienceAgeGenderValue,
                audienceGenderPercentage    : action.payload.audienceGenderPercentage,
                audienceTopCities           : action.payload.audienceTopCities,
                audienceTopInterests        : action.payload.audienceTopInterests,
                audienceTopCountries        : action.payload.audienceTopCountries,
            }
        }
    }
    else if (action.type === HANDLE_REFRESH_PROFILE_LOADING) {
        return {
            ...state,
            refreshProfileLoading : true,
        }
    }
    else if (action.type === HANDLE_REFRESH_INFLEUNCER_PROFILE_SUCCESS) {
        return {
            ...state,
            refreshProfileLoading : false,
        }
    }
    return state;
}

export default InfluencerProfileReducer;