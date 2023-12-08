import {
	HTTP_404_ERROR,
	HTTP_500_ERROR,
    HTTP_OTHER_ERROR,
} from "../constants/action-types";
// import history from 'history';
import { useNavigate } from 'react-router-dom';


const initialState = {

};


const ExecuteOtherError = (state, action) => {
    console.log("ExecuteOtherError")
    return { ...state };
}

const Execute404 = (state, action) => {
    const history = useNavigate();
    // history.push('/404');
    history('/404');
    return { ...state };
}

const Execute500 = (state, action) => {
    const history = useNavigate();
    history('/500');
    return { ...state };
}

const ErrorHandlerReducer = (state = initialState, action) => {
    if (action.type === HTTP_404_ERROR) {
        return Execute404(state, action);
    }
    else if (action.type === HTTP_500_ERROR) {
        return Execute500(state, action);
          
    } else if (action.type === HTTP_OTHER_ERROR) {
        return ExecuteOtherError(state, action);
    }
    return state;
}

export default ErrorHandlerReducer;