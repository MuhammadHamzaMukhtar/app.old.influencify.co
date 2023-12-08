import Influencify from "../../constants/Influencify";
import moment from 'moment';
import {refreshReports} from "../actions/HeaderActions";

let counter = 0;

export const types = {
    HANLDE_SPONSORED_POST_DICTIONARIES      : "HANLDE_SPONSORED_POST_DICTIONARIES",
    HANDLE_SPONSORED_POSTS_FILTER           : "HANDLE_SPONSORED_POSTS_FILTER",
    FETCH_SPONSORED_POSTS_TOP_HASHTAGS      : "FETCH_SPONSORED_POSTS_TOP_HASHTAGS",
    FETCH_SPONSORED_POSTS_TOP_MENTIONS      : "FETCH_SPONSORED_POSTS_TOP_MENTIONS",
    FETCH_SPONSORED_POSTS_TOP_SPONSORS      : "FETCH_SPONSORED_POSTS_TOP_SPONSORS",
    FETCH_SPONSORED_POSTS                   : "FETCH_SPONSORED_POSTS",
    FETCH_SPONSORED_POSTS_LOADING           : "FETCH_SPONSORED_POSTS_LOADING",
    HANDLE_SPONSORED_POSTS_ERROR            : "HANDLE_SPONSORED_POSTS_ERROR",
    HANDLE_CHECKED_POSTS                    : "HANDLE_CHECKED_POSTS",
    LOAD_MORE_SPONSORED_POSTS_LOADING       : "LOAD_MORE_SPONSORED_POSTS_LOADING",
    HANDLE_LOAD_MORE_POSTS_SUCCESS          : "HANDLE_LOAD_MORE_POSTS_SUCCESS",
    HANDLE_DOWNLOAD_CSV_LOADING             : "HANDLE_DOWNLOAD_CSV_LOADING",
    HANDLE_DOWNLOAD_CSV_SUCCESS             : "HANDLE_DOWNLOAD_CSV_SUCCESS",
};

export const actions = {
    sponsoredPostDictionaries : async (dispatch) => {
        const json = await Influencify.sponsoredPostDictionaries();
        dispatch({type: types.HANLDE_SPONSORED_POST_DICTIONARIES, data:json.data});
    },
    sponsoredPostFilter : (dispatch, payload, form) => {
        dispatch({type: types.HANDLE_SPONSORED_POSTS_FILTER, payload:payload, form:form});
    },
    searchSponsoredPosts : async (dispatch, data) => {
        let top_payload     = Object.assign({} , data.payload);
        let search_payload  = Object.assign({} , data.payload);
        top_payload['sort']         = {direction:'desc', field:'count'};
        search_payload['paging']    = {limit:30, skip:0};
        dispatch({type: types.FETCH_SPONSORED_POSTS_LOADING});
        const top_hashtags_json = await Influencify.sponsoredPostsTopHashtags(top_payload);
        if(top_hashtags_json.data && typeof top_hashtags_json.data.success != 'undefined' && top_hashtags_json.data.success === true){
            dispatch({type: types.FETCH_SPONSORED_POSTS_TOP_HASHTAGS, data:top_hashtags_json.data.data.data.top});
        }
        const top_mentions_json = await Influencify.sponsoredPostsTopMentions(top_payload);
        if(top_mentions_json.data && typeof top_mentions_json.data?.success != 'undefined' && top_mentions_json.data?.success === true){
            dispatch({type: types.FETCH_SPONSORED_POSTS_TOP_MENTIONS, data:top_mentions_json.data.data.data.top});
        }
        const top_sponsors_json = await Influencify.sponsoredPostsTopSponsors(top_payload);
        if(top_sponsors_json.data && typeof top_sponsors_json.data.success != 'undefined' && top_sponsors_json.data.success === true){
            dispatch({type: types.FETCH_SPONSORED_POSTS_TOP_SPONSORS, data:top_sponsors_json.data.data.data.top});
        }
        const json = await Influencify.searchSponsoredPosts({payload:search_payload, isCreditDeduct:data.isCreditDeduct});
        if(json.data && typeof json.data.success != 'undefined' && json.data.success === true){
            dispatch({type: types.FETCH_SPONSORED_POSTS, data:json.data.data});
        }
        else{
            dispatch({type: types.HANDLE_SPONSORED_POSTS_ERROR, data:json});
        }
        dispatch(refreshReports());
    },

    loadMoreSponsoredPosts : async (dispatch, data) => {
        let payload                = Object.assign({} , data.payload);
        counter += 30
        if (payload.hasOwnProperty('paging') === false) {
            payload['paging'] = {limit : 30, skip:counter};
        }
        dispatch({type: types.LOAD_MORE_SPONSORED_POSTS_LOADING});
        const json = await Influencify.searchSponsoredPosts({payload:payload, isCreditDeduct:data.isCreditDeduct});
        if(json.data && typeof json.data.success != 'undefined' && json.data.success === true){
            dispatch({type: types.HANDLE_LOAD_MORE_POSTS_SUCCESS, data:json.data.data});
        }
        else{
            dispatch({type: types.HANDLE_SPONSORED_POSTS_ERROR, data:json.data});
        }

        dispatch(refreshReports());
    },
    downloadCsv : async (dispatch, data) => {
        let payload  = Object.assign({} , data.payload);
        if (payload.hasOwnProperty('paging') === false) {
            payload['paging'] = {limit : 10000, skip:0};
        }
        dispatch({type: types.HANDLE_DOWNLOAD_CSV_LOADING});
        const json = await Influencify.downloadCsv(payload);
        var link = document.createElement("a");
        link.download = 'posts.csv';
        link.href = json.data;
        link.click();
        dispatch({type: types.HANDLE_DOWNLOAD_CSV_SUCCESS});        
    }
};

var max_date         = new Date();
var min_date = max_date.setDate(max_date.getDate() - 90);
const initialState = {
    payload : {
        filter:{
            created_at:{
                left_number:  moment(moment().subtract(90, 'days').format('YYYY-MM-DD')).unix(),
                right_number: moment(moment().add(1, 'days').format('YYYY-MM-DD')).unix(),
            }
        }
    },
    form : {
        filter:{
            created_at:{
                left_number: new Date(min_date).toDateString().replace(/^\S+\s/,''),
                right_number: new Date().toDateString().replace(/^\S+\s/,'')
            }
        },
        likes_left_number      : '',
        likes_right_number     : '',
        followers_left_number  : '',
        followers_right_number : ''
    },
    countries               : [],
    is_loading              : false,
    load_more_loading       : false,
    top_hashtags            : [],
    top_mentions            : [],
    top_sponsors            : [],
    total_posts             : 0,
    limit_count             : 0,
    posts                   : [],
    checked_posts           : [],
    error_obj               : {},
    download_csv_loading    : false
};

export const reducer = (state = initialState, action) => {
    const {type, payload, form, data} = action;
    switch (type) {
        case types.HANLDE_SPONSORED_POST_DICTIONARIES:
            return{
                ...state,
                countries : data.countries
            }
        case types.HANDLE_SPONSORED_POSTS_FILTER:
            return{
                ...state,
                payload : payload,
                form    : form
            }
        case types.FETCH_SPONSORED_POSTS_LOADING:
            counter = 0;
            return{
                ...state,
                is_loading      : true,
                top_hashtags    : [],
                top_mentions    : [],
                top_sponsors    : [],
                posts           : [],
                limit_count     : 0,
                total_posts     : 0,
                error_obj       : {}
            }
        case types.FETCH_SPONSORED_POSTS_TOP_HASHTAGS:
            return{
                ...state,
                top_hashtags : data
            }
        case types.FETCH_SPONSORED_POSTS_TOP_MENTIONS:
            return{
                ...state,
                top_mentions : data
            }
        case types.FETCH_SPONSORED_POSTS_TOP_SPONSORS:
            return{
                ...state,
                top_sponsors : data
            }
        case types.FETCH_SPONSORED_POSTS:
            let limit = 0;
            limit += (data.posts && data.posts.length) ?  data.posts.length : 0; 
            return{
                ...state,
                posts           : data.posts,
                total_posts     : data.total,
                checked_posts   : data.posts,
                limit_count     : limit,
                is_loading      : false
            }
        case types.LOAD_MORE_SPONSORED_POSTS_LOADING: {
            return {
                ...state,
                load_more_loading : true
            }
        }
        case types.HANDLE_LOAD_MORE_POSTS_SUCCESS: {
            const form = Object.assign({}, state.form);
            let limit  = state.limit_count;
            limit     += (data.posts && data.posts.length) ?  data.posts.length : 0; 
            return {
                ...state,
                form                : form,
                posts               : state.posts.concat(data.posts),
                checked_posts       : state.checked_posts.concat(data.posts),
                limit_count         : limit,
                load_more_loading   : false
            };
            } 
        case types.HANDLE_SPONSORED_POSTS_ERROR:
            return{
                ...state,
                error_obj   : data,
                is_loading  : false
            }
        case types.HANDLE_CHECKED_POSTS:
            if (data.checked) {
                return {
                    ...state,
                    checked_posts: [...state.checked_posts, data.item]
                }
            }
            return{
                ...state,
                checked_posts: state.checked_posts.filter(el =>  el.post_id !== data.item.post_id)
            } 
        case types.HANDLE_DOWNLOAD_CSV_LOADING:
            return{
                ...state,
                download_csv_loading   : true,
            } 
        case types.HANDLE_DOWNLOAD_CSV_SUCCESS:
            return{
                ...state,
                download_csv_loading   : false,
            }        
        default:
            return state;
    }

}