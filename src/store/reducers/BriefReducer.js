import * as briefAction from "../actions/BriefActions";

const initialState = {
    instructions: '',
    link_to_share: '',
    post_wording: '',
    post_wording_type: "1",
    images: [],
    cover: '',
    imagesOption: "1"
};

const BriefReducer = (state = initialState, action) => {
    if (action.type === briefAction.HANDLE_POST_WORDIND_CHANGE) {
        return {
            ...state,
            post_wording_type: action.value
        };
    } else if (action.type === briefAction.HANDLE_IMAGES_CHANGE) {
        return {
            ...state,
            images: action.imageURLs
        };
    } else if (action.type === briefAction.HANDLE_COVER_IMAGE_CHANGE) {
        return {
            ...state,
            images: action.coverImageURL
        };
    } else if (action.type === briefAction.HANDLE_IMAGE_OPTION) {
        return {
            ...state,
            imagesOption: action.value
        }
    } else if (action.type === briefAction.HANDLE_BRIEF_INPUT_CHANGE) {
        return {
            ...state,
            [action.name]: action.value
        }
    }
    return state;
}

export default BriefReducer;