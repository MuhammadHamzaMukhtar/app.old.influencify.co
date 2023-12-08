import Influencify from "../../constants/Influencify";
import { toast } from "react-toastify";
import { refreshReports } from "../actions/HeaderActions";
import { BRAND_INSTAGRAM_LIST_VIEW_SUCCESS } from "@store/constants/action-types";

export const types = {
	UPDATE_BRANDLIST_BOARDS: "UPDATE_BRANDLIST_BOARDS",
	FETCH_BRANDLIST_SUCCESS: "FETCH_BRANDLIST_SUCCESS",
	FETCH_BRANDLIST_LOADING: "FETCH_BRANDLIST_LOADING",
	ADD_BRANDLIST_BOARD_LOADING: "ADD_BRANDLIST_BOARD_LOADING",
	SEARCH_BRAND_SUCCESS: "SEARCH_BRAND_SUCCESS",
	FETCH_INFLUENCER_LISTIDS: "FETCH_INFLUENCER_LISTIDS",
	LOADING_INFLUENCER_LISTIDS: "LOADING_INFLUENCER_LISTIDS",
	HANDLE_VIEW_LIST_SUCCESS: "HANDLE_VIEW_LIST_SUCCESS",
	HANDLE_OVERLAPPING_LOADING: "HANDLE_OVERLAPPING_LOADING",
	HANDLE_OVERLAPPING_SUCCESSS: "HANDLE_OVERLAPPING_SUCCESSS",
	HANDLE_LIST_PAYLOAD_CHANGE: "HANDLE_LIST_PAYLOAD_CHANGE",
	HANDLE_ADD_FORM: "HANDLE_ADD_FORM",
	AJAX_MAIN_LOADING: "AJAX_MAIN_LOADING",
	HANDLE_LIST_VALIDATION_ERRORS: "HANDLE_LIST_VALIDATION_ERRORS",
	HANDLE_OVERLAPPING_LOADING_FINISH: "HANDLE_OVERLAPPING_LOADING_FINISH",
	DELETE_BRAND_LIST: "DELETE_BRAND_LIST",
	FETCH_BRANDLIST_BOARDS: "FETCH_BRANDLIST_BOARDS",
	FETCH_BRAND_EXPORT_LIST_PENDING: "FETCH_BRAND_EXPORT_LIST_PENDING",
	FETCH_BRAND_EXPORT_LIST_SUCCESS: "FETCH_BRAND_EXPORT_LIST_SUCCESS",
	FETCH_BRAND_EXPORT_LIST_FAILURE: "FETCH_BRAND_EXPORT_LIST_FAILURE",
	ADD_BRANDLIST_BOARD_FAILURE: "ADD_BRANDLIST_BOARD_FAILURE",
	HANDLE_REMOVE_BOARD_ERRORS: "HANDLE_REMOVE_BOARD_ERRORS",
	BULK_BRANDLIST_BOARDS_UPDATE: "BULK_BRANDLIST_BOARDS_UPDATE",
};

export const actions = {
	fetchBrandLists: async (dispatch, data) => {
		dispatch({ type: types.FETCH_BRANDLIST_LOADING, page: data.page });
		const json = await Influencify.fetchBrandLists(data);
		dispatch({
			type: types.FETCH_BRANDLIST_SUCCESS,
			data: json.data,
			param: data.sortQuery,
			page: data.page
		});
	},

	fetchListBoards: async (dispatch, data) => {
		let query = {
			listId: data
		}
		dispatch({ type: types.AJAX_MAIN_LOADING });
		const json = await Influencify.fetchListBoards(query);
		if (json.status == 200) {
			dispatch({
				type: types.FETCH_BRANDLIST_BOARDS,
				data: json.data,
			});
		} else {
			toast.error("Server Error")
		}
		return json;
	},

	deleteListBoard: async (dispatch, data) => {
		const json = await Influencify.deleteSelectedListBoard(data);
		if (json.status == 200) {
			toast.success("Column deleted")
			dispatch({
				type: types.FETCH_BRANDLIST_BOARDS,
				data: json.data,
			});
		} else {
			toast.error("Server Error")
		}
	},

	updateListBoardName: async (dispatch, data) => {
		const json = await Influencify.updateSelectedListBoardName(data);
		if (json.status == 200) {
			if (json.data?.errors) {
				dispatch({
					type: types.ADD_BRANDLIST_BOARD_FAILURE,
					data: json.data.errors,
				});
			} else {
				dispatch({
					type: types.FETCH_BRANDLIST_BOARDS,
					data: json.data,
				});
			}
		} else {
			toast.error("Server Error")
		}
		return json.data;
	},

	addNewBoard: async (dispatch, data) => {
		dispatch({ type: types.ADD_BRANDLIST_BOARD_LOADING });
		const json = await Influencify.addNewBoardToList(data);
		if (json.status == 200) {
			if (json.data?.errors) {
				dispatch({
					type: types.ADD_BRANDLIST_BOARD_FAILURE,
					data: json.data.errors,
				});
			} else {
				dispatch({
					type: types.FETCH_BRANDLIST_BOARDS,
					data: json.data,
				});
			}
		} else {
			toast.error("Server Error")
		}
		return json.data;
	},

	dragInfluencerToBoard: async (dispatch, data) => {
		dispatch({
			type: types.UPDATE_BRANDLIST_BOARDS,
			data: data,
		});
		const json = await Influencify.dragInfluencer(data);
		if (json.status !== 200) {
			toast.error("Server Error")
		}
		return json.data;
	},

	addInfluencerToBoard: async (dispatch, data) => {
		dispatch({ type: types.ADD_BRANDLIST_BOARD_LOADING });
		const json = await Influencify.addNewInfluencer(data);
		if (json.status == 200) {
			if (json.data?.errors) {
				dispatch({
					type: types.ADD_BRANDLIST_BOARD_FAILURE,
					data: json.data.errors,
				});
			} else {
				toast.success('Influencer added to board')
				dispatch({
					type: types.FETCH_BRANDLIST_BOARDS,
					data: json.data,
				});
			}
		} else {
			toast.error("Server Error")
		}
		return json.data;
	},

	removeFromList: async (dispatch, data) => {
		const json = await Influencify.removeInfluencerToList(data);
		if (!json.data.success) {
			toast.error(json.data.error_message);
		} else {
			dispatch({
				type: types.FETCH_BRANDLIST_BOARDS,
				data: json.data,
			});
		}
		return json.data;
	},

	updateList: async (dispatch, data) => {
		let json = await Influencify.updateList(data);
		json = json.data;
		if (json && json.errors) {
			dispatch({
				type: types.HANDLE_LIST_VALIDATION_ERRORS,
				data: json.errors,
			});
		} else {
			toast.dismiss();
			toast.success("List updated successfully");
			dispatch({ type: types.FETCH_BRANDLIST_SUCCESS, data: json.data });
		}
	},

	saveList: async (dispatch, data) => {
		let json = await Influencify.saveList(data);
		json = json.data;
		if (json && json.errors) {
			let message = "";
			Object.keys(json.errors).map((item) => {
				return (message += json.errors[item][0]);
			});
			toast.dismiss();
			toast.error(message);
		} else {
			toast.dismiss();
			toast.success("List updated successfully");
			dispatch({ type: types.FETCH_BRANDLIST_SUCCESS, data: json.data });
		}
	},

	searchBrand: async (dispatch, data) => {
		const json = await Influencify.searchBrand(data);
		dispatch({ type: types.SEARCH_BRAND_SUCCESS, data: json.data.data });
	},
	addNewBrand: async (dispatch, data) => {
		const json = await Influencify.saveBrand(data);
		if (json.data && json.data.success === false) {
			toast.dismiss();
			toast.error(json.data.error_message);
		} else {
			dispatch({ type: types.FETCH_BRANDLIST_SUCCESS, data: { data: json.data.lists } });
		}
	},

	addInfluencerToList: async (dispatch, data) => {
		const json = await Influencify.addInfluencerToList(data);
		if (json.data && json.data.success === true) {
			dispatch({ type: types.FETCH_BRANDLIST_SUCCESS, data: json.data.lists });
			toast.dismiss();
			toast.success("Influencer added successfully");
		} else {
			toast.dismiss();
			toast.error(json.data.error_message);
		}
	},

	addInfluencersToList: async (dispatch, data) => {
		const json = await Influencify.addInfluencersToList(data);
		if (json.data && json.data.success === true) {
			dispatch({ type: types.FETCH_BRANDLIST_SUCCESS, data: json.data.lists });
			toast.dismiss();
			toast.success(json.data.message);
		} else {
			toast.dismiss();
			toast.error(json.data.error_message);
		}
	},

	deleteBrandList: async (dispatch, id) => {
		dispatch({ type: types.DELETE_BRAND_LIST, data: id });
		Influencify.deleteBrandList(id);
	},

	viewList: async (dispatch, data) => {
		const json = await Influencify.viewList(data);
		dispatch({ type: types.HANDLE_VIEW_LIST_SUCCESS, data: json.data.data });
		return json;
	},

	getInfluencerList: async (dispatch, page, data) => {
		dispatch({ type: types.LOADING_INFLUENCER_LISTIDS, page: page });
		const json = await Influencify.InfluencerList(page, data);
		dispatch({ type: types.FETCH_INFLUENCER_LISTIDS, data: json.data, page: page });
	},

	audienceOverlap: async (dispatch, data) => {
		dispatch({ type: types.HANDLE_OVERLAPPING_LOADING });
		const json = await Influencify.audienceOverlap(data);
		if (json.status === 200 && json.data?.success) {
			dispatch({
				type: types.HANDLE_OVERLAPPING_SUCCESSS,
				data: json.data,
			});
			actions.fetchAudienceOverlaps(dispatch, json.data?.list?.id);
			// dispatch(refreshReports());
		} else {
			// toast.dismiss();
			toast.error(json.data?.error_message);
			dispatch({ type: types.HANDLE_OVERLAPPING_LOADING_FINISH });
		}
		return json;
	},

	fetchAudienceOverlaps: async (dispatch, data) => {
		dispatch({ type: types.HANDLE_OVERLAPPING_LOADING});
		const json = await Influencify.fetchAudienceOverlaps(data);
		dispatch({
			type: types.HANDLE_OVERLAPPING_SUCCESSS,
			data: json.data.data,
			list: json.data.list,
		});
	},

	fetchExportList: async (dispatch, data) => {
		dispatch({ type: types.FETCH_BRAND_EXPORT_LIST_PENDING });
		const json = await Influencify.fetchExportList(data);
		if (json?.status == 200) {
			dispatch({
				type: types.FETCH_BRAND_EXPORT_LIST_SUCCESS,
				data: json.data
			});
		} else {
			dispatch({ type: types.FETCH_BRAND_EXPORT_LIST_FAILURE });
		}

	},

	bulkUpdateBoards: async (dispatch, data) => {
		dispatch({ type: types.BULK_BRANDLIST_BOARDS_UPDATE, data: data });
	},
};

const initialState = {
	brandlists: [],
	influencerList: [],
	listBoards: [],
	list_loading: false,
	boardLoading: false,
	isLoading: false,
	current_list: {},
	overlapping_loading: false,
	overlapping_data: [],
	errorsObj: {},
	boardErrors: {},
	payload: {
		platform: "instagram",
		searchQuery: "",
		sortQuery: "date",
	},
	influencerTotal: 0,
	influncerLoader: false,
	IsMainLoading: false,
	sortQuery: "date",
	// influencerError: '',
	current_page: 1,
	exports: [],
	exportsTotal: 0,
	exportsLoading: false,
	exportsPerpage: 0
};

export const reducer = (state = initialState, action) => {
	const { type, data, page, param } = action;
	switch (type) {
		case types.FETCH_BRANDLIST_LOADING: {
			if (page > 1) {
				return {
					...state,
					isLoading: true,
					// brandlists: [],
					overlapping_data: [],
				}
			} else {
				return {
					...state,
					list_loading: true,
					// brandlists: [],
					overlapping_data: [],
				};
			}
		}

		case types.ADD_BRANDLIST_BOARD_LOADING: {
			return {
				...state,
				boardLoading: true
			}
		}

		case types.AJAX_MAIN_LOADING: {
			return {
				...state,
				IsMainLoading: true
			}
		}

		case types.HANDLE_REMOVE_BOARD_ERRORS: {
			return {
				...state,
				boardErrors: {}
			}
		}

		case types.FETCH_BRANDLIST_SUCCESS: {
			return {
				...state,
				isLoading: false,
				brandlists: (data.data || []),
				listBoards: [],
				list_loading: false,
				sortQuery: param,
				brandTotal: data.meta?.total ?? data.length,
				currentPage: data.meta?.current_page ?? page,
			};
		}

		case types.FETCH_BRANDLIST_BOARDS: {
			return {
				...state,
				listBoards: data?.data ? data.data : state.listBoards,
				current_list: { ...state.current_list, listInfluencersCount: data?.totalInfluencers },
				boardErrors: {},
				boardLoading: false,
				IsMainLoading: false,
			};
		}

		case types.UPDATE_BRANDLIST_BOARDS: {
			const previousList = state.listBoards.find((board) => board.id == data.previousBoardId)
			const draggedInf = previousList.board_influencers?.findIndex((inf) => inf.user_id === data.influencer.user_id)
			const sortedInf = previousList.board_influencers?.findIndex((inf) => inf.sort === data.currentPos)
			if (draggedInf !== -1) {
				previousList.board_influencers.splice(draggedInf, 1)
			}
			if (sortedInf !== -1) {
				previousList.board_influencers.splice(sortedInf, 1)
			}
			const selectedList = state.listBoards.find((board) => board.id == data.boardID)
			data.influencer['sort'] = data.droppedPos
			selectedList.board_influencers?.push(data.influencer)
			return {
				...state,
				listBoards: state.listBoards,
			};
		}

		case types.ADD_BRANDLIST_BOARD_FAILURE: {
			return {
				...state,
				boardErrors: (data || {}),
				boardLoading: false
			};
		}

		case types.SEARCH_BRAND_SUCCESS: {
			return {
				...state,
				brandlists: data,
			};
		}

		case types.FETCH_INFLUENCER_LISTIDS: {

			return Object.assign({}, state, {
				influencerList: (data.data || []),
				influencerTotal: data.total,
				isLoading: false,
				influncerLoader: false,
			})

		}

		case types.LOADING_INFLUENCER_LISTIDS: {
			return {
				...state,
				isLoading: page > 1 ? false : true,
				influncerLoader: true,
			};
		}

		case types.HANDLE_VIEW_LIST_SUCCESS: {
			return {
				...state,
				current_list: data,
			};
		}

		case types.HANDLE_OVERLAPPING_LOADING: {
			return {
				...state,
				overlapping_loading: true,
			};
		}

		case types.HANDLE_OVERLAPPING_SUCCESSS: {
			return {
				...state,
				overlapping_loading: false,
				overlapping_data: data,
			};
		}

		case types.HANDLE_OVERLAPPING_LOADING_FINISH: {
			return {
				...state,
				overlapping_loading: false,
			};
		}

		case types.HANDLE_LIST_PAYLOAD_CHANGE: {
			return {
				...state,
				payload: data,
			};
		}

		case types.HANDLE_ADD_FORM: {
			return {
				...state,
				current_list: data,
			};
		}

		case types.HANDLE_LIST_VALIDATION_ERRORS: {
			return {
				...state,
				errorsObj: data,
			};
		}

		case types.DELETE_BRAND_LIST: {
			const list = state.brandlists.filter((i) => i.id !== data);
			return {
				...state,
				brandlists: list,
			};
		}

		case types.FETCH_BRAND_EXPORT_LIST_PENDING: {
			return {
				...state,
				exportsLoading: true,
			};
		}

		case types.FETCH_BRAND_EXPORT_LIST_SUCCESS: {
			return {
				...state,
				exportsLoading: false,
				exports: data.data,
				exportsTotal: data.total,
				exportsPerpage: data.per_page
			};
		}

		case types.FETCH_BRAND_EXPORT_LIST_FAILURE: {
			return {
				...state,
				exportsLoading: false,
			};
		}

		case types.BULK_BRANDLIST_BOARDS_UPDATE: {
			return {
				...state,
				listBoards: data,
			};
		}

		default: {
			return state;
		}
	}
};
