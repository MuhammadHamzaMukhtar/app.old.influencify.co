import { 
    FETCH_INFLUENCER_PROFILE_INIT,
    FETCH_INFLUENCER_PROFILE_FINSH,
    FETCH_INFLUENCER_PROFILE_SUCCESS,
    NOT_EAMIL_EXIST,
} from "../constants/action-types";

const initialState = {
    inflName                    : '',
    inflUserName                : '',
    influencerEmail             : '',
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
    geojson                     : {},
    engagementRate              : 0,
    isLoading                   : true,
    isModash                    : false,
    avgInteractions             : 0,   
    earnedMedia                 : 0,    
    credibility                 : 0,    
    noEmailExist                : false,    
};

const ViewInfluencerProfileReducer = (state = initialState, action) => {
    if (action.type === FETCH_INFLUENCER_PROFILE_SUCCESS) {
        return {
            ...state,
            inflName                    : action.payload.influencerInfo.infl_name,
            inflUserName                : action.payload.influencerInfo.infl_username,
            userProfile                 : action.payload.influencerInfo.profile_picture_url,
            inflType                    : action.payload.influencerInfo.influencer_type,
            inflBio                     : action.payload.influencerInfo.infl_bio,
            inflWebsite                 : action.payload.influencerInfo.website,
            inflFollowersCount          : action.payload.influencerInfo.followers_count,
            credibility                  : action.payload.influencerInfo.credibility,
            inflLocation                : action.payload.influencerInfo.location,
            postStartPrice              : action.payload.influencerInfo.post_start_price,
            influencer_type             : action.payload.influencerInfo.influencer_type,
            inflCategories              : (action.payload.influencerInfo.infl_categories) ? action.payload.influencerInfo.infl_categories : [],
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
            averageInteractionData      : action.payload.averageInteractionData,
            engagementRate              : action.payload.engagementRate,
            influencerEmail             : action.payload.influencerEmail,
            avgInteractions             : action.payload.avgInteractions,
            earnedMedia                 : action.payload.earnedMedia,
            isModash                    : action.payload.isModash,
            audienceLookalikes          : action.payload.audienceLookalikes,
        };
    }
    else if (action.type === FETCH_INFLUENCER_PROFILE_INIT) {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === NOT_EAMIL_EXIST) {
        return {
            ...state,
            isLoading   : false,
            noEmailExist: true
        }
    } 
    else if (action.type === FETCH_INFLUENCER_PROFILE_FINSH) {
        return {
            ...state,
            isLoading: false
        }
    }
    return state;
}

export default ViewInfluencerProfileReducer;