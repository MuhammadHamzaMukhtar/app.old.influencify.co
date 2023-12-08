import Api from "@services/axios";

export const SUBMIT_INIT = "SUBMIT_INIT";
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
export const FETCH_RANGES = "FETCH_RANGES";
export const PAYMENT_CHANGE = "PAYMENT_CHANGE";
export const SERVICE_FEE_CHANGE = "SERVICE_FEE_CHANGE";

export const fetchRanges = () => (dispatch) => {
	Api.FetchRanges()
		.then((res) => {
			dispatch({
				type: FETCH_RANGES,
				payload: res.data.ranges,
			});
		})
		.catch((error) => {});
};

export const onServiceFeeChange = (name, value) => (dispatch) => {
	dispatch({
		type: SERVICE_FEE_CHANGE,
	});
};

export const submitPayment = (event) => (dispatch) => {
	dispatch({
		type: SUBMIT_INIT,
	});

	let data = {};

	//   axios
	//     .post(helper.url + "/api/v1/submit/payment", data)
	Api.SubmitPayment(data)
		.then((res) => {
			dispatch({
				type: FETCH_RANGES,
			});
		})
		.catch((error) => {
			alert("Couldn't connect to the server.");
		});

	dispatch({
		type: SUBMIT_SUCCESS,
	});
};
