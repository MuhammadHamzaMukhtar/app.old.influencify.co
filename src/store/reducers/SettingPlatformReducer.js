import { 
    HANDLE_FETCH_PLATFORMS_SUCCESS,
    HANDLE_CONNECT_INSTAGRAM,
    HANDLE_CONNECT_INIT,
    HANDLE_CONNECT_FINISH,
    HANDLE_SELECT_PAGE,
    HANDLE_VALIDATION_ERRORS,
    HANDLE_CHANGE_SUCCESS,
    HANDLE_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
    HANDLE_DISCONNECT_PLATFORM_SUCCESS,
    AJAX_CALL_INIT,
    AJAX_CALL_FINSH,
    FETCH_USER_CATEGORIES_SUCCESS,
    HANDLE_PLATFORM_CATEGORY_SUCCESS,
    USER_SELECTED_CATEGORIES_SUCCESS,
    HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
    HANDLE_CANCEL_CONNECT_INSTAGRAM,
    HANDLE_YOUTUBE_CONNECT_RES,
    SETTING_PLATFORM_SELECT_TIKTOK,
    HANDLE_CANCEL_INSTAGRAM_CONNECT
 } from "../constants/action-types";

const initialState = {
    errorsObj                   : {},
    platforms                   : [],
    selected_platform           : '',
    fbPages                     : [],
    userCategories              : [],
    selectedCategories          : [],
    isLoading                   : false,
    loginSuccess                : false,
    isInstagramConnected        : false,
    selectedPage                : '',
    storyFee                    : '',
    postFee                     : '',
    platformConnectSuccess      : false,
    platformDisconnectSuccess   : false,
    youtube_connect_res         : '',
    is_connected_youtube: false,
    tiktok_connect_res:{}
}

const SettingPlatformReducer = (state = initialState, action) => {
    if (action.type === HANDLE_FETCH_PLATFORMS_SUCCESS) {
        return {
            ...state,
            platforms     : action.payload,
        };
    }
    else if (action.type === HANDLE_CONNECT_INSTAGRAM) {
         return {
            ...state,
            fbPages                  : action.payload,
            loginSuccess             : true,
            selected_platform        : 'instagram',
            isInstagramConnected     : true,
            errorsObj                : {},
        };
    }
    else if (action.type === HANDLE_CANCEL_INSTAGRAM_CONNECT) {
         return {
            ...state,
            fbPages                  : [],
            errorsObj                : {},
            loginSuccess             : false
        };
    }
    else if (action.type === HANDLE_CONNECT_INIT) {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === HANDLE_CANCEL_CONNECT_INSTAGRAM) {
        return {
            ...state,
            isInstagramConnected: false
        }
    } 
    else if (action.type === HANDLE_CONNECT_FINISH) {
        return {
            ...state,
            selected_platform: '',
            isLoading: false
        }
    }
    else if (action.type === HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            errorsObj: {},
            isInstagramConnected: false
        }
    }
    else if(action.type === HANDLE_SELECT_PAGE) {
        return {
            ...state,
            selectedPage    : action.payload,
            errorsObj       : {},
        };
    }
    else if(action.type === HANDLE_VALIDATION_ERRORS) {
        return {
            ...state,
            errorsObj: action.payload,
            isInstagramConnected:false,
        };
    }
    else if(action.type === HANDLE_CONNECT_INSTAGRAM_SUBMIT_SUCCESS) {
        return {
            ...state,
            loginSuccess            : false,
            platformConnectSuccess  : true
        };
    }
    else if(action.type === HANDLE_DISCONNECT_PLATFORM_SUCCESS) {
        return {
            ...state,
            platformDisconnectSuccess  : true
        };
    }
    else if(action.type === HANDLE_CHANGE_SUCCESS) {
        return {
            ...state,
            [action.payload.target.name]: action.payload.target.value
        };
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
            isLoading: false,
            //errorsObj:{}
        }
    }
    else if (action.type === FETCH_USER_CATEGORIES_SUCCESS) {
        return {
            ...state,
            userCategories: action.payload
        };
    }
    else if(action.type === HANDLE_PLATFORM_CATEGORY_SUCCESS) {
        return {
            ...state,
            selectedCategories : action.payload
        };
    }
    else if(action.type === USER_SELECTED_CATEGORIES_SUCCESS) {
        const categories  = action.payload.map((data) => ({label: data.name, value: data.id}));
        return {
            ...state,
            selectedCategories : categories
        };
    }
    else if (action.type === HANDLE_YOUTUBE_CONNECT_RES) {
        return {
            ...state,
            youtube_connect_res : action.payload,
            is_connected_youtube: true,
            selected_platform   : 'youtube',
        }
    } else if (action.type === SETTING_PLATFORM_SELECT_TIKTOK) {
        return {
            ...state,
            tiktok_connect_res : action.payload,
            selected_platform   : 'tiktok',
            errorMessages: {},
            errorsObj: {},
        }
    }
    return state;
}

export default SettingPlatformReducer;