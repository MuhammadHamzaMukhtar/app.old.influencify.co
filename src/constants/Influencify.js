import axios from "axios";
import Emitter from "./Emitter";

export default class Influencify {
  _influencify = null;
  static init = ({ url }) => {
    try {
      this._influencify = axios.create({
        baseURL: url,
        timeout: 40000,
      });
    } catch (error) {
      return error;
    }
  };
  static setClientToken = async (token) => {
    this._influencify.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  static middleware = () => {
    this._influencify.interceptors.response.use(
      function (response) {
        if (response.data?.success == false) {
          if (response.data?.error == "handle_no_credits_remaining") {
            Emitter.emit("MESSAGE_POPUP", {
              title: response.data?.message,
              description: response.data?.error_message,
              button: "/billing/credit",
              button_text: "Buy Credits",
            });
          }
        }
        return response;
      },
      function (error) {
        return error.response;
      }
    );
  };

  static fetchDictionaries = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/search/dictionaries"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static saveCampaignImages = async (query) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/save/images",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static authGmailUrl = async () => {
    try {
      const response = await this._influencify.get("/oauth/gmail");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchLookalikes = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/lookalikes",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchInfluencers = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/influencers",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchInfluencersCount = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/influencers-count",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchRelevantTags = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/relevant-tags",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static viewInfluencerProfile = async (data) => {
    data["main_account"] = localStorage.getItem("main_account");
    try {
      const response = await this._influencify.post(
        "/api/v2/view/influencer",
        data
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  static viewInfluencerExport = async (data) => {
    data["main_account"] = localStorage.getItem("main_account");
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/exports",
        data
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  static exportInfluencerContentData = async (data) => {
    data["main_account"] = localStorage.getItem("main_account");
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/content/data",
        data
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  static disconnectPlatform = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/brand/disconnect/platform",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addInfluentialFans = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influential",
        data
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  };

  static autoCompleteUsers = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/autocomplete/users",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static analyzedUsers = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v2/analyzed/users", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static topicTags = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/search/topic-tags",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateReinviteInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/update-reinvite-influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static campaignJobScheduleStared = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/campaign-start-job-schedule",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static campaignJobScheduleCheck = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/campaign-check-job-schedule",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sendReinviteInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/send-reinvite-influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sendErrorBoundaryException = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/error/boundary/exception",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCampaginTypes = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/external/campaign/types"
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  static newCampaignSetUp = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/new",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCampaign = async (id) => {
    try {
      const response = await this._influencify.get("/api/v2/campaign/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveCampaign = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/save",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchTypes = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/internal/campaign/types"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sponsoredPostDictionaries = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/sponsored/post/dictionaries"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sponsoredPostsTopHashtags = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/sponsored/posts/top_hashtags",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sponsoredPostsTopMentions = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/sponsored/posts/top_mentions",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sponsoredPostsTopSponsors = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/sponsored/posts/top_sponsors",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchSponsoredPosts = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/sponsored/posts/search",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static downloadCsv = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/sponsored/posts/download",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static getAppsumoEmail = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/appsumo/register/token",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static appsumoRegistration = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/appsumo/registration",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCountries = async () => {
    try {
      const response = await this._influencify.get("/api/v2/countries");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchPlatforms = async () => {
    try {
      const response = await this._influencify.get("/api/v2/platforms");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCampaignCategories = async () => {
    try {
      const response = await this._influencify.get("/api/v2/categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCampaignGoals = async () => {
    try {
      const response = await this._influencify.get("/api/v2/goals");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBrandLists = async (data) => {
    try {
      const response = await this._influencify.get("/api/v2/listAjax", {
        params: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchListBoards = async (data) => {
    try {
      const response = await this._influencify.get(`/api/v2/boards`, {
        params: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addNewBoardToList = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/boards", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static dragInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/boards/add-influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addNewInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/boards/add-new-influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteSelectedListBoard = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/boards/delete`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateSelectedListBoardName = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/boards/update`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static boardOrderUpdate = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/boards/sorting`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static boardItemOrderUpdate = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/boards/sortingItem`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateList = async (data) => {
    try {
      const response = await this._influencify.post("/api/v1/list/store", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveList = async (data) => {
    try {
      const response = await this._influencify.post("/api/v1/list/save", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchUserProducts = async () => {
    try {
      const response = await this._influencify.get("/api/v2/user/products");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchBrand = async (data) => {
    try {
      const response = await this._influencify.get("/api/v2/listAjax", {
        params: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchGmailSetting = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v1/fetch-gmail-settings"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveBrand = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/list/store", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteBrandList = async (id) => {
    try {
      const response = await this._influencify.post("/api/v2/list/delete", {
        id: id,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static createCampaignInvite = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/create/campaign/invite",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addInfluencerToList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/list/add/influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addInfluencersToList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/list/add/influencers",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static removeInfluencerToList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/list/remove/influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static createCampaignSelected = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/create/campaign/selected",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInvitationEmailTemplates = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/invitation/email/templates"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static InfluencerList = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v2/influencer-list", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static viewList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/brand/instagram/list/view",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static exportList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/exports",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static audienceOverlap = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/list/overlapping",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchAudienceOverlaps = async (data) => {
    try {
      const response = await this._influencify.get(
        "/api/v2/list/" + data + "/overlaps"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static AnalyzerInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/exports",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static InfluentialFollowers = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/export/InfluentialFollowers",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static ExportInfluencerList = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/exports",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchSmtp = async (data) => {
    try {
      const response = await this._influencify.get("/api/v2/smtp", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static InfluentialLikers = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/export/influentialLikers",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static testSaveSmtp = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/smtp/store", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  // New Monitoring Compaign
  static createCampaign = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/monitoring-compaign/createCompaign",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static testSmtp = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/smtp/test", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchMonitorCompaigns = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/fetch/monitoring-compaigns",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchApiContent = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/content/library",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static acceptQuotePrice = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/accept-influencer-quote-price",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static acceptBrandQuotePrice = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/influencer/accept-campaign",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static confirmInfluencerPayment = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/influencer/confirm-payment",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static findMonitorCampaign = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/fetch/monitoring-compaign",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCampaignDetail = async (data) => {
    let params = { page: 1 };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/fetch/monitor/campaign-detail",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static fetchBrandPages = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/monitoring-compaign/brands"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static fetchContentLibraries = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/content/library",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static MonitorDownloadCsv = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/monitor/posts/download",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchCampaignContent = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/search-content",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static editCampaignName = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/edit-campaign/name",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchMentions = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/fetch-mentions",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static finishCampaign = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/campaign/finish-campaign",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchfinishedCampaigns = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/campaign/fetch/finish-campaign",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static connectYoutube = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/connect/youtube",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static downloadUserinfo = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/export/download-userinfo",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static fetchContentLibrary = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/content/library-db",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static loadMoreContent = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/monitor/detail/load-more",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchContentLibrary = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/content/search-content",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchAdsLibrary = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/fetch/ads-library",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static applyFilters = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/fetch/ads-library/filters",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBrandDashboardInformation = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/brand-dashboard-info"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static fetchMoreAdsLibrary = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/fetch/ads-library?page=" + data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static fetchMoreMonitorContent = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/fetch/monitor/campaign-detail",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static searchIqGeoData = async (s, platform) => {
    let params = { s: s, platform: platform };
    try {
      const response = await this._influencify.get("/api/search-iq-geo-data", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static savedSearches = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v1/saved", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchUsageCreditHistory = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v1/credits-usage-history",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchAccountHistory = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v1/account-history", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitSavedSearch = async (data) => {
    try {
      const response = await this._influencify.post("/api/v1/saved", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteSavedSearch = async (id) => {
    try {
      const response = await this._influencify.delete(`/api/v1/saved/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencialMention = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/brand-influential-mentions",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitInfluencerUsernameFile = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/report/file/usernames",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBrandReports = async (params) => {
    try {
      const response = await this._influencify.get("/api/v2/report", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteBrandReports = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/report/delete",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBrandReportDetail = async (id) => {
    try {
      const response = await this._influencify.get(`/api/v2/report/${id}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static editBrandReportName = async (data) => {
    try {
      const response = await this._influencify.put(
        `/api/v2/report/${data.id}`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static trackReportContent = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/report/track/content`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateReportCreatorData = async (id, data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/report/update/creator/${id}`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static endBrandReportCampaign = async (id) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/report/end/campaign/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addInfluencersFromList = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/report/add/influencers`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static confirmReportCreation = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/report/create",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchReportCreatorsDetails = async (id, params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/report/${id}/creators`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static removeCampaignCreator = async (params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/report/${params.creatorId}/creator/remove`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchReportContents = async (id, params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/report/${id}/content`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitEmailMatchFile = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/list/email-match`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitEmailMatchData = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/list/email-match-request`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  /************ Sub account ******/

  static submitSubAccount = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/sub-account",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchSubAccount = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v1/sub-account", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteSubAccount = async (id) => {
    try {
      const response = await this._influencify.delete(
        `/api/v1/sub-account/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateSubAccount = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/update`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sendSubAccountInvitation = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/invitation`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteSubAccountInvitation = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/remove-invitation`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static switchBrandAccount = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/switch`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static switchInfluencerAccount = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/switch`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchSubAccountInvitation = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v1/sub-account/invitation",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static acceptSubAccountInvitation = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/accept-invitation`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static rejectSubAccountInvitation = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/sub-account/reject-invitation`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static findInfluencerTools = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/find/influencers/tools",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static findInfluencerContacts = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/find/influencers/contacts",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchDiscoverCategory = async () => {
    try {
      const response = await this._influencify.get(
        "/api/discover-recipes/categories"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchDiscoverRecipe = async (page, data) => {
    let params = { page: page };
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/discover-recipes", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static disconnectGoogleAnalytics = async () => {
    try {
      const response = await this._influencify.post(
        "/api/v2/disconnect/analytics"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static connectGoogleAnalytics = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/connect/analytics",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static googleAnalyticsStatus = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/analytics-account-status"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static googleAnalyticsSummary = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/analytics-account-summary"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveGoogleAnalyticsSummary = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/save-analytics-account-summary",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  // static campaignAnalytics = async (data) => {
  //   try {
  //     const response = await this._influencify.post(
  //       "/api/v2/campaign-analytics",
  //       data
  //     );
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };

  static updateInfluencerStats = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/update-influencer-stats",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static connectedPlatformUsers = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v1/sub-accounts", {
        params: params,
      });

      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateGmailMailboxSettings = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v1/update-gmail-mailbox-settings",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateSmtpMailboxSettings = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/update-smtp-mailbox-settings",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static disconnectSmtpAccount = async () => {
    try {
      const response = await this._influencify.post(
        "/api/v2/disconnect-smtp-account"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static influencerBookingCampaignByEmail = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v1/influencer-booking-campaign-overview-by-email`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static exportsNotableUsers = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/export/notable-users`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static exportdryRunReports = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/driver/notable/all`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static influentialLists = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/driver/notable/top`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchAllBrandList = async () => {
    try {
      const response = await this._influencify.get("/api/v2/list/all");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static downloadPdfReports = async () => {
    try {
      const response = await this._influencify.post("/download-report");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static businessDiscoveryMedia = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/business-discovery-media"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static businessDiscoveryStories = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/business-discovery-stories"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static demographicsInformation = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/instagram-demographics-information"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static instagramBusinessOverview = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get(
        "/api/v2/instagram-business-overview",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static influencerDeepScan = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/reports",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static influencerDownloadReports = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/reports/download",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sendInfluencerEmail = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influencer/send-email",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static billingSubscribe = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/subscribe",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchPaymentMethod = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/billing/payment-method"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static addPaymentMethod = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/billing/change-payment-method"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInvoices = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v2/billing/invoices", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchCharges = async (data) => {
    let params = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((value) => {
        if (data[value]) {
          params[value] = data[value];
        }
      });
    }
    try {
      const response = await this._influencify.get("/api/v2/billing/charges", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchNextPayment = async () => {
    try {
      const response = await this._influencify.get(
        "/api/v2/billing/next-billing-cycle"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static setDefaultPayment = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/default-payment",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deletePaymentMethod = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/delete-payment-method",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static cancelSubscription = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/cancel-subscription",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateUserSubscription = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/update-subscription",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static cancelSubscriptionNow = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/cancel-subscription-now",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static resumeSubscription = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/resume-subscription",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static subscriptionEndTrial = async () => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/end-trial"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchDownloadInvoice = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/receipt-download-url",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchConnectAnalyticsUrl = async () => {
    try {
      const response = await this._influencify.get("/api/v2/analytics");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static autoLogin = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/auto/login", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static autoLoginInfluencer = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influencer/auto/login",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchExportList = async (params) => {
    try {
      const response = await this._influencify.get("/api/v2/exports", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static downloadExport = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/driver/exports/download",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencer = async (data) => {
    try {
      const response = await this._influencify.get("/api/v2/influencer", {
        params: data,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerInformation = async (params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/${params.id}`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchBoardInfluencerEmails = async (id) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/board/${id}/influencers`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerContactInformation = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influencer/contact",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerEmailTemplate = async (params) => {
    try {
      const response = await this._influencify.get(
        "/api/v2/influencer/fetch/emailTemplate",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveInfluencerEmailTemplate = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influencer/save/emailTemplate",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static sendEmail = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/influencer/send/email",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerIqdataInformation = async (id) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/iqdata/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerShippingInformation = async (id) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/shipping/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerNotes = async (id, params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/notes/${id}`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static fetchInfluencerLogs = async (id, params) => {
    try {
      const response = await this._influencify.get(
        `/api/v2/influencer/logs/${id}`,
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static deleteInfluencerLog = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/influencer/delete/logs`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveInfluencerInformation = async (data) => {
    try {
      const response = await this._influencify.put(
        `/api/v2/influencer/${data.iq_user_id}`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveInfluencerNotes = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/influencer/notes`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static updateInfluencerNote = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/influencer/note/update`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static saveInfluencerShippingInformation = async (data) => {
    try {
      const response = await this._influencify.post(
        `/api/v2/influencer/shipping`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static submitInfluencer = async (data) => {
    try {
      const response = await this._influencify.post("/api/v2/influencer", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static shopifyInstall = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/shopify/install",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static approvePurchaseCredit = async (data) => {
    try {
      const response = await this._influencify.post(
        "/api/v2/billing/purchase-credit-approve",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
}
