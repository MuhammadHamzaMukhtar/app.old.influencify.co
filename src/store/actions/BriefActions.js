import Api from "@services/axios";

export const HANDLE_POST_WORDIND_CHANGE = "HANDLE_POST_WORDIND_CHANGE";
export const HANDLE_IMAGES_CHANGE = "HANDLE_IMAGES_CHANGE";
export const HANDLE_COVER_IMAGE_CHANGE = "HANDLE_COVER_IMAGE_CHANGE";
export const HANDLE_IMAGE_OPTION = "HANDLE_IMAGE_OPTION";
export const HANDLE_BRIEF_INPUT_CHANGE = "HANDLE_BRIEF_INPUT_CHANGE";

export const fetchPlatforms = () => (dispatch) => {
	//axios.get(helper.url + '/api/v1/platforms')
	Api.FetchPlatforms()
		.then((res) => {})
		.catch((error) => {});
};
