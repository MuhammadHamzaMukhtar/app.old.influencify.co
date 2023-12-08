import Influencify from "@constants/Influencify";
import { refreshReports } from "@store/actions/HeaderActions";
import moment from "moment";
import { toast } from "react-toastify";

export const types = {
  HANDLE_NEXT_STEP: "HANDLE_NEXT_STEP",
  HANDLE_SAVE_FORM: "HANDLE_SAVE_FORM",
  HANDLE_CANCEL_STEPS: "HANDLE_CANCEL_STEPS",
  HANDLE_OPEN_CREATION_POPUP: "HANDLE_OPEN_CREATION_POPUP",
  SUBMIT_FILE_PENDING: "SUBMIT_FILE_PENDING",
  SUBMIT_FILE_SUCCESS: "SUBMIT_FILE_SUCCESS",
  HANDLE_MOVE_TO_STEP3: "HANDLE_MOVE_TO_STEP3",
  FILE_LOADING_SUCCESS: "FILE_LOADING_SUCCESS",
  CREATE_REPORT_INIT: "CREATE_REPORT_INIT",
  FETCH_REPORT_INIT: "FETCH_REPORT_INIT",
  CREATE_REPORT_FINISH: "CREATE_REPORT_FINISH",
  FETCH_REPORT_FINISH: "FETCH_REPORT_FINISH",
  FETCH_REPORT_SUCCESS: "FETCH_REPORT_SUCCESS",
  FETCH_REPORT_DETAIL_SUCCESS: "FETCH_REPORT_DETAIL_SUCCESS",
  DELETE_REPORT_INIT: "DELETE_REPORT_INIT",
  DELETE_REPORT_FINISH: "DELETE_REPORT_FINISH",
  UPDATE_REPORT_FINISH: "UPDATE_REPORT_FINISH",
  FETCH_REPORT_CREATORS_INIT: "FETCH_REPORT_CREATORS_INIT",
  FETCH_REPORT_CREATORS_FINISH: "FETCH_REPORT_CREATORS_FINISH",
  DELETE_CREATOR_INIT: "DELETE_CREATOR_INIT",
  FETCH_REPORT_CONTENT_INIT: "FETCH_REPORT_CONTENT_INIT",
  FETCH_REPORT_CONTENT_FINISH: "FETCH_REPORT_CONTENT_FINISH",
  HANDLE_SEARCH_QUERY: "HANDLE_SEARCH_QUERY",
  UPDATE_REPORT_CREATOR_FINISH: "UPDATE_REPORT_CREATOR_FINISH",
  HANDLE_END_CAMPAIGN: "HANDLE_END_CAMPAIGN",
  HANDLE_BACK_TO_PREVIOUS_STEP: "HANDLE_BACK_TO_PREVIOUS_STEP",
  FETCH_LIST_INFLUENCERS_SUCCESS: "FETCH_LIST_INFLUENCERS_SUCCESS",
  TRACK_REPORTS_INIT: "TRACK_REPORTS_INIT",
};

export const actions = {
  submitUsernameFile: async (dispatch, data) => {
    dispatch({ type: types.SUBMIT_FILE_PENDING });
    const json = await Influencify.submitInfluencerUsernameFile(data);
    if (json !== undefined) {
      dispatch({
        type: types.SUBMIT_FILE_SUCCESS,
        data: json.data,
      });
    }
    return json;
  },
  fetchBrandReports: async (dispatch, params = {}) => {
    dispatch({ type: types.FETCH_REPORT_INIT, data: params });
    const json = await Influencify.fetchBrandReports(params);
    if (json.status === 200) {
      dispatch({ type: types.FETCH_REPORT_SUCCESS, data: json.data.reports });
    }
    dispatch({ type: types.FETCH_REPORT_FINISH });
  },
  deleteBrandReports: async (dispatch, data) => {
    dispatch({ type: types.DELETE_REPORT_INIT });
    const json = await Influencify.deleteBrandReports(data);
    if (json.status === 200) {
      toast.success("Report(s) deleted successfully");
      dispatch({ type: types.FETCH_REPORT_SUCCESS, data: json.data.reports });
    }
    dispatch({ type: types.DELETE_REPORT_FINISH });
    return json;
  },
  fetchReportDetail: async (dispatch, id) => {
    dispatch({ type: types.FETCH_REPORT_INIT, data: {} });
    const json = await Influencify.fetchBrandReportDetail(id);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_REPORT_DETAIL_SUCCESS,
        data: json.data.report,
      });
    } else {
      toast.error("Something went wrong");
    }
    dispatch({ type: types.FETCH_REPORT_FINISH, data: {} });
  },
  editReportName: async (dispatch, params) => {
    const json = await Influencify.editBrandReportName(params);
    if (json.status === 200) {
      toast.success("Report name updated successfully");
      dispatch({ type: types.UPDATE_REPORT_FINISH, data: params });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  trackReportContent: async (dispatch, data) => {
    dispatch({ type: types.TRACK_REPORTS_INIT });
    const json = await Influencify.trackReportContent(data);
    if (json.status === 200) {
      toast.success("Report content tracked successfully");
      dispatch({
        type: types.FETCH_REPORT_DETAIL_SUCCESS,
        data: json.data.report,
      });
      dispatch(refreshReports());
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  confirmReportCreation: async (dispatch, data) => {
    dispatch({ type: types.CREATE_REPORT_INIT });
    const json = await Influencify.confirmReportCreation(data);
    if (json.status === 200 && !json.data?.error) {
      toast.success("Report created successfully");
      dispatch({ type: types.FETCH_REPORT_SUCCESS, data: json.data.reports });
      dispatch(refreshReports());
    }
    dispatch({ type: types.CREATE_REPORT_FINISH });
    return json;
  },
  fetchCreatorsDetails: async (dispatch, id, params = {}) => {
    dispatch({ type: types.FETCH_REPORT_CREATORS_INIT, data: params });
    const json = await Influencify.fetchReportCreatorsDetails(id, params);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_REPORT_CREATORS_FINISH,
        data: { creatorsData: json.data, params: params },
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  removeCreatorFromCampaign: async (dispatch, data) => {
    dispatch({ type: types.DELETE_CREATOR_INIT });
    const json = await Influencify.removeCampaignCreator(data);
    if (json.status === 200) {
      toast.success("Creator removed successfully");
      dispatch({
        type: types.FETCH_REPORT_CREATORS_FINISH,
        data: { creatorsData: json.data, params: {} },
      });
    }
    return json;
  },
  fetchContents: async (dispatch, id, params = {}) => {
    dispatch({ type: types.FETCH_REPORT_CONTENT_INIT, data: params });
    const json = await Influencify.fetchReportContents(id, params);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_REPORT_CONTENT_FINISH,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  updateCreatorData: async (dispatch, userId, query) => {
    const json = await Influencify.updateReportCreatorData(userId, query);
    if (json.status === 200) {
      toast.success(`Creator ${query.key} updated successfully`);
      dispatch({
        type: types.FETCH_REPORT_CREATORS_FINISH,
        data: { creatorsData: json.data, params: {} },
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  endReportCampaign: async (dispatch, reportId) => {
    dispatch({ type: types.HANDLE_END_CAMPAIGN });
    const json = await Influencify.endBrandReportCampaign(reportId);
    if (json.status === 200) {
      toast.success(`Campaign ended successfully`);
      dispatch({
        type: types.FETCH_REPORT_DETAIL_SUCCESS,
        data: json.data.report,
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
  addInfluencersFromList: async (dispatch, data) => {
    const json = await Influencify.addInfluencersFromList(data);
    if (json.status === 200) {
      dispatch({
        type: types.FETCH_LIST_INFLUENCERS_SUCCESS,
        data: json.data,
      });
    } else {
      toast.error("Something went wrong");
    }
    return json;
  },
};

const initialState = {
  creationForm: {
    step: 1,
    reportType: 1,
    totalFileInfluencers: 0,
    trackingPlatform: "tiktok",
    isTrackingPosts: true,
    isTrackingReels: true,
    isTrackingVideos: true,
    isTrackingStories: true,
    listImported: false,
    fileImporting: false,
    fileImported: false,
    hasCampaignEndDate: false,
    importInfluencers: false,
    isImportLoading: false,
    trackingUsernames: [],
  },
  isOpenCreationPopup: false,
  fileUploadingLoader: false,
  isReportCreationLoading: false,
  isReportFetching: false,
  isReportLoadMore: false,
  isReportCreatorsLoading: false,
  isCreatorRemoving: false,
  isCreatorLoadingMore: false,
  isContentLoading: false,
  isContentLoadMoreLoading: false,
  isCampaignEndLoading: false,
  isReportTracking: false,
  reportDetail: [],
  currentReportDetail: {},
  searchQuery: {
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    sortQuery: "Date",
    username: "",
    page: 1,
  },
  reportCreatorsDetail: {},
  reportPublishedContentDetail: {},
};

export const reducer = (state = initialState, action) => {
  const { type, data, form } = action;

  switch (type) {
    case types.HANDLE_NEXT_STEP: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          step: state.creationForm.step + 1,
        },
      };
    }
    case types.FETCH_REPORT_INIT: {
      return {
        ...state,
        isReportFetching: (data.page || 0) >= 1 ? false : true,
        isReportLoadMore: (data.page || 0) >= 1 ? true : false,
      };
    }
    case types.FETCH_REPORT_SUCCESS: {
      return {
        ...state,
        reportDetail: data,
      };
    }
    case types.UPDATE_REPORT_FINISH: {
      return {
        ...state,
        currentReportDetail: {
          ...state.currentReportDetail,
          report_name: data.name,
        },
      };
    }
    case types.FETCH_REPORT_DETAIL_SUCCESS: {
      const { mediaStartDate, mediaEndDate } = data;
      const { startDate, endDate } = state.searchQuery;
      return {
        ...state,
        currentReportDetail: data,
        isCampaignEndLoading: false,
        isReportTracking: false,
        searchQuery: {
          sortQuery: "Date",
          username: "",
          startDate: mediaStartDate
            ? moment(mediaStartDate).format("YYYY-MM-DD")
            : startDate,
          endDate: mediaEndDate
            ? moment(mediaEndDate).format("YYYY-MM-DD")
            : endDate,
        },
      };
    }
    case types.FETCH_REPORT_FINISH: {
      return {
        ...state,
        isReportFetching: false,
        isReportLoadMore: false,
      };
    }
    case types.TRACK_REPORTS_INIT: {
      return {
        ...state,
        isReportTracking: true,
      };
    }
    case types.DELETE_CREATOR_INIT: {
      return {
        ...state,
        isCreatorRemoving: true,
      };
    }
    case types.HANDLE_END_CAMPAIGN: {
      return {
        ...state,
        isCampaignEndLoading: true,
      };
    }
    case types.FETCH_REPORT_CONTENT_FINISH: {
      return {
        ...state,
        reportPublishedContentDetail: data,
        isContentLoading: false,
        isContentLoadMoreLoading: false,
      };
    }
    case types.FETCH_REPORT_CONTENT_INIT: {
      return {
        ...state,
        isContentLoading: data.hasOwnProperty("page") ? false : true,
        isContentLoadMoreLoading: data.hasOwnProperty("page") ? true : false,
      };
    }
    case types.CREATE_REPORT_INIT: {
      return {
        ...state,
        isReportCreationLoading: true,
      };
    }
    case types.FETCH_REPORT_CREATORS_INIT: {
      return {
        ...state,
        isReportCreatorsLoading: data.page > 1 ? false : true,
        isCreatorLoadingMore: data.page > 1 ? true : false,
      };
    }
    case types.FETCH_REPORT_CREATORS_FINISH: {
      const { params, creatorsData } = data;
      const { reportCreatorsDetail, currentReportDetail } = state;
      const updatedReportCreatorsDetail =
        params?.page > 1
          ? {
              ...creatorsData,
              data: creatorsData.data.concat(reportCreatorsDetail.data),
            }
          : creatorsData;

      return {
        ...state,
        isReportCreatorsLoading: false,
        isCreatorLoadingMore: false,
        isCreatorRemoving: false,
        reportCreatorsDetail: updatedReportCreatorsDetail,
        currentReportDetail: {
          ...currentReportDetail,
          brand_report_usernames: creatorsData.data,
          reportCreatorsCount: creatorsData.total,
        },
      };
    }
    case types.DELETE_REPORT_INIT: {
      return {
        ...state,
        isReportDeleting: true,
      };
    }
    case types.DELETE_REPORT_FINISH: {
      return {
        ...state,
        isReportDeleting: false,
      };
    }
    case types.CREATE_REPORT_FINISH: {
      return {
        ...state,
        creationForm: {
          step: 1,
          reportType: 1,
          totalFileInfluencers: 0,
          trackingPlatform: "tiktok",
          isTrackingPosts: true,
          isTrackingReels: true,
          isTrackingVideos: true,
          isTrackingStories: true,
          listImported: false,
          fileImporting: false,
          fileImported: false,
          hasCampaignEndDate: false,
          importInfluencers: false,
          isImportLoading: false,
          trackingUsernames: [],
        },
        isOpenCreationPopup: false,
        isReportCreationLoading: false,
      };
    }
    case types.HANDLE_CANCEL_STEPS: {
      return {
        ...state,
        creationForm: {
          step: 1,
          reportType: 1,
          totalFileInfluencers: 0,
          trackingPlatform: "tiktok",
          isTrackingPosts: true,
          isTrackingReels: true,
          isTrackingVideos: true,
          isTrackingStories: true,
          listImported: false,
          fileImporting: false,
          fileImported: false,
          hasCampaignEndDate: false,
          importInfluencers: false,
          trackingUsernames: [],
          isImportLoading: false,
        },
        isOpenCreationPopup: false,
      };
    }
    case types.HANDLE_OPEN_CREATION_POPUP: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          step: 1,
        },
        isOpenCreationPopup: true,
      };
    }
    case types.HANDLE_SAVE_FORM: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          ...form,
        },
      };
    }
    case types.SUBMIT_FILE_PENDING: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          isImportLoading: true,
        },
      };
    }
    case types.FILE_LOADING_SUCCESS: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          isImportLoading: false,
          csvFile: "",
        },
      };
    }
    case types.SUBMIT_FILE_SUCCESS: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          trackingUsernames: [
            ...new Set(state.creationForm.trackingUsernames.concat(data.data)),
          ],
          totalImportedInfluencers: data.total,
          skippedInfluencers: data.skipped,
        },
      };
    }
    case types.FETCH_LIST_INFLUENCERS_SUCCESS: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          trackingUsernames: [
            ...new Set(state.creationForm.trackingUsernames.concat(data)),
          ].slice(0, 3),
          listImported: false,
        },
      };
    }
    case types.HANDLE_MOVE_TO_STEP3: {
      return {
        ...state,
        creationForm: {
          ...state.creationForm,
          step: 3,
          importInfluencers: false,
          fileImporting: false,
        },
      };
    }
    case types.HANDLE_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: data,
      };
    }
    case types.HANDLE_BACK_TO_PREVIOUS_STEP: {
      const { creationForm } = state;
      const { step, listImported, fileImporting } = creationForm;
      if (step === 3 && (listImported || fileImporting)) {
        const updatedForm = {
          ...creationForm,
          listImported: listImported ? false : creationForm.listImported,
          fileImporting: fileImporting ? false : creationForm.fileImporting,
        };
        return {
          ...state,
          creationForm: updatedForm,
        };
      } else {
        return {
          ...state,
          creationForm: {
            ...creationForm,
            step: step - 1,
          },
        };
      }
    }
    default: {
      return state;
    }
  }
};
