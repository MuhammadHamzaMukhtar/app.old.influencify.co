import {
	HANDLE_VALIDATION_ERRORS,
	AJAX_CALL_INIT,
	AJAX_CALL_FINSH,
	HANDLE_SEND_CONTACT_MESSAGE_SUCCESS,
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const sendMessage = (query) => (dispatch) => {
	dispatch({
		type: AJAX_CALL_INIT,
	});
	// axios.post(helper.url + '/api/v1/send-message', query)
	Api.SendMessage(query)
		.then((res) => {
			if (res.data.errors) {
				dispatch({
					type: HANDLE_VALIDATION_ERRORS,
					payload: res.data.errors,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
			} else {
				dispatch({
					type: HANDLE_SEND_CONTACT_MESSAGE_SUCCESS,
					payload: res.data,
				});
				dispatch({
					type: AJAX_CALL_FINSH,
				});
				toast.success("Message has been sent Successfully!");
			}
		})
		.catch((error) => {});
};
