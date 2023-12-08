import {
	FETCH_BRAND_PROFILE_SUCCESS,
	FETCH_BRAND_PROFILE_FAILURE,
} from "../constants/action-types";
import Api from "@services/axios";

export const viewBrandProfile = (query) => (dispatch) => {
	Api.BrandProfile(query)
		.then((res) => {
			dispatch({
				type: FETCH_BRAND_PROFILE_SUCCESS,
				payload: {
					bandResource: res.data.bandResource,
					brandProducts: res.data.brandProducts,
				},
			});
		})
		.catch((error) => {
			dispatch({
				type: FETCH_BRAND_PROFILE_FAILURE,
			});
		});
};
