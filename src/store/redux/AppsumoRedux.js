import Influencify from "../../constants/Influencify";
import helper from '../../constants/helper';

export const types = {
    HANDLE_INVALID_URL                  : "HANDLE_INVALID_URL",
    HANDLE_AJAX_LOADING                 : "HANDLE_AJAX_LOADING",
    HANDLE_APPSUMO_EMAIL_SUCCESS        : "HANDLE_APPSUMO_EMAIL_SUCCESS",
    HANDLE_APPSUMO_REGISGRATION_FORM    : "HANDLE_APPSUMO_REGISGRATION_FORM",
    HANDLE_VALIDATION_ERRORS            : "HANDLE_VALIDATION_ERRORS",
    HANDLE_APPSUMO_REGISGRATION_LOADING : "HANDLE_APPSUMO_REGISGRATION_LOADING",
    HANDLE_APPSUMO_REGISGRATION_SUCCESS : "HANDLE_APPSUMO_REGISGRATION_SUCCESS"
};

export const actions = {
    getAppsumoEmail : async (dispatch, data) => {
        dispatch({type: types.HANDLE_AJAX_LOADING});
        let json = await Influencify.getAppsumoEmail(data);
        json = json.data;
        if(json.success === false){
            dispatch({type: types.HANDLE_INVALID_URL});
        }
        else{
            if(json && json.token_type !== undefined && json.token_type === 'Bearer'){
                localStorage.setItem(helper.access_token, json.access_token);
                localStorage.setItem(helper.token_type, json.token_type);
                localStorage.setItem(helper.isLogin, true);
                localStorage.setItem('user', JSON.stringify(json.user));
                localStorage.setItem('role', json.role);
                window.location.href = '/dashboard';
            }
            else{
                dispatch({type: types.HANDLE_APPSUMO_EMAIL_SUCCESS , data:json});
            }
        }
    },
    appsumoRegistration : async (dispatch, data) => {
        dispatch({type: types.HANDLE_APPSUMO_REGISGRATION_LOADING});
        let json = await Influencify.appsumoRegistration(data);
        json = json.data;
        if(json){
            if(json.success === true){
                localStorage.setItem(helper.access_token, json.access_token);
                localStorage.setItem(helper.token_type, json.token_type);
                localStorage.setItem(helper.isLogin, true);
                localStorage.setItem('user', JSON.stringify(json.user));
                localStorage.setItem('role', json.role);
                window.location.href = '/dashboard';
            }
            else{
                dispatch({type: types.HANDLE_VALIDATION_ERRORS, data:json.errors});
            }
        }
    }
};


const initialState = {
    form             : {},
    error_obj        : {},
    invalid_url      : false,
    is_loading       : false
};

export const reducer = (state = initialState, action) => {
    const {type, data} = action;
    switch (type) {
        case types.HANDLE_AJAX_LOADING:
            return{
                ...state,
                is_loading : true
            }
        case types.HANDLE_INVALID_URL:
            return{
                ...state,
                invalid_url : true,
                is_loading  : false
            }
        case types.HANDLE_APPSUMO_EMAIL_SUCCESS:
            let form   = Object.assign({} , state.form);
            form.email = data.token;
            return{
                ...state,
                form        : form,
                invalid_url : false,
                is_loading  : false
            }
        case types.HANDLE_APPSUMO_REGISGRATION_FORM:
            return{
                ...state,
                form        : action.form,
                error_obj   : action.error_obj
            }
        case types.HANDLE_APPSUMO_REGISGRATION_LOADING:
            return{
                ...state,
                is_loading  : true,
                error_obj   : {}
            }
        case types.HANDLE_VALIDATION_ERRORS:
            return{
                ...state,
                error_obj : data,
                is_loading: false
            }
        case types.HANDLE_APPSUMO_REGISGRATION_SUCCESS:
            return{
                ...state,
                is_loading  : false
            }       
        default:
            return state;
    }

}