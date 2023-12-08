import { 
    AJAX_CALL_FINSH,
    AJAX_CALL_INIT,
    HANDLE_USER_GENERAL_NOTIFICATIONS_SUCCESS,
    HANDLE_USER_CAMPAIGN_NOTIFICATIONS_SUCCESS,
    HANDLE_CHANGE_PUSH_NOTIFY_SUCCESS,
    HANDLE_CHANGE_EMAIL_NOTIFY_SUCCESS
} from "../constants/action-types";
const initialState = {
'isLoading'              : false,
'userNotifications'      : [],
'campaignNotifications'  : [],
}

const SettingNotificationReducer = (state = initialState, action) => {
    if (action.type === HANDLE_USER_GENERAL_NOTIFICATIONS_SUCCESS) {
        return {
            ...state,
            userNotifications : action.payload,
        };
    }
    else if (action.type === HANDLE_USER_CAMPAIGN_NOTIFICATIONS_SUCCESS) {
        return {
            ...state,
            campaignNotifications   : action.payload,
        };
    }
    else if(action.type === HANDLE_CHANGE_PUSH_NOTIFY_SUCCESS) {
        const value            = action.payload.target.checked;
        const updatedPushArray = state.userNotifications.map(el => (el.id === action.notifyId ? {...el, isActivePush : value} : el));
        return {
            ...state,
            userNotifications  : updatedPushArray,
        };
    }
    else if(action.type === HANDLE_CHANGE_EMAIL_NOTIFY_SUCCESS) {
        const value             = action.payload.target.checked;
        const updatedEmailArray = state.userNotifications.map(el => (el.id === action.notifyId ? {...el, isActiveEmail : value} : el));
        return {
            ...state,
            userNotifications  : updatedEmailArray,
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
            isLoading: false
        }
    }
    return state;
}

export default SettingNotificationReducer;