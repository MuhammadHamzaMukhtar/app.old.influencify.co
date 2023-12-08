/**
 * @format
 */
import axios from "axios";
import { Link } from "react-router-dom";

export default class Api {
  _api = null;

  static init = ({ url }) => {
    try {
      this._api = axios.create({
        baseURL: url,
        timeout: 40000,
      });
    } catch (error) {
      return error;
    }
  };

  static setClientToken = async (token) => {
    this._api.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };

  // static VerifyAuthUserToken = () => {
  //   // Add a response interceptor
  //   this._api.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       if (error.response.status === 401) {
  //         store.dispatch({
  //           type: "API_TOKEN_EXPIRE",
  //           payload: error,
  //         });
  //         return Promise.reject(error);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // };

  //Brand Login Axios Call
  // static brandLogin = async data => {
  //   try {
  //     const response = await this._api.post("/api/v1/login", data);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  //Brand Register

  // static brandRegister = async query => {
  //   try {
  //     const response = await this._api.post("/api/v1/brand-register", query);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  //Brand Login After Verification Call
  static brandVerification = async (userId) => {
    try {
      const response = await this._api.get("/api/v1/brand-login/" + userId);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static brandSendVerificationLink = async (email) => {
    try {
      const response = await this._api.get("/api/v1/brand-send-verification/" + email);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Check Facebook Login call
  static faceBook = async () => {
    try {
      const response = await this._api.get("/api/v1/auth/facebook");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Store > Action Axios Calls
  // Fetch category Call
  static categoryFetch = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-user-categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Product Add Handle
  static productAddHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/add-product", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Voucher handle
  static VoucherAdd = async (query) => {
    try {
      const response = await this._api.post("/api/v1/add-vocher", query);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch platform
  static Platforms = async () => {
    try {
      const response = await this._api.get("/api/v1/platforms");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Campaign Categories
  static CampaignCategories = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-campaign-categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Campaign Goals
  static CampaignGoals = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-campaign-goals");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Post Brand Notable Users
  static BrandNotableUsers = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-notable-users",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Notable Users Report
  static UsersReport = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/notable-users-reports",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Create Campaign With Notable Users
  static CampaignNotableUsers = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/create-campaign-notable-users",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Create Campaign With Analyzed
  static CampaignWithAnalyzed = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/create-campaign-notable-users",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  // Search Analyzer
  static Analyzer = async (query) => {
    try {
      const response = await this._api.post("/api/v1/search-analyzer", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //sendReinviteInfluencer
  static ReinviteInfluencer = async (data) => {
    try {
      const response = await this._api.post(
        "/api/v1/send-reinvite-influencer",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Show Email Logs
  static EmailLogs = async (data) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-email-log",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Brand Booking Campaign Influencers
  static BrandBookingCampaignInfluencers = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-influencers/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Brand Booking Campaign Content
  static BrandBookingCampaignContent = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-content/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Brand Booking Campaign Brief
  static BrandBookingCampaignBrief = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-brief/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Brand Booking Campaign Chat Users
  static BrandBookingCampaignChatUsers = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-chat-users/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Booking Campaign Messages
  static BrandBookingCampaignMessages = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-messages/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // fetch Chat User Messages
  static FetchChatUserMessages = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/fetch-chat-user-messages",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Send Message
  static BrandSendMessage = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-send-message",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Handle Upload File
  static HandleUploadFile = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-upload-message-attachment",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Booking Campaign Activites
  static BrandBookingCampaignActivites = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-activities/" +
        id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Accept Influncer Request
  static HandleAcceptInfluncerRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-accept",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Reject Influncer Request
  static HandleRejectInfluncerRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-reject",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Brand Content Approve
  static HandleBrandContentApprove = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-content-approve",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Brand Preview Accept
  static HandleBrandPreviewAccept = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-content-approve-preview",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Brand New Request
  static HandleBrandNewRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-content-new-request",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Brand Insta New Post Request
  static HandleBrandInstaNewPostRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-booking-campaign-content-insta-new-post-request",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Brand Booking Campaign Overview
  static BrandBookingCampaignOverview = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-booking-campaign-overview/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //bBrand Campaign Send Message

  static BrandCampaignSendMessage = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-campaign-send-message",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Drop Down Active Campaigns
  static FetchDropDownActiveCampaigns = async () => {
    try {
      const response = await this._api.get("/api/v1/campaigns/dropdown/active");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Drop Down Draft Campaigns
  static FetchDropDownDraftCampaigns = async () => {
    try {
      const response = await this._api.get("/api/v1/campaigns/dropdown/draft");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Drop Down Closed Campaigns
  static FetchDropDownClosedCampaigns = async () => {
    try {
      const response = await this._api.get("/api/v1/campaigns/dropdown/closed");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Duplicate Campaign
  static DuplicateCampaign = async (id) => {
    try {
      const response = await this._api.get("/api/v1/duplicate-campaign/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Change Influencer Email
  static ChangeInfluencerEmail = async (query) => {
    try {
      const response = await this._api.post("/api/v1/change-influencer-email", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Top Influencers Analyzed
  static FetchTopInfluencers = async () => {
    try {
      const response = await this._api.get("/api/v1/top-influencers-analyzed");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Google Analytics Users
  static FetchGoogleAnalyticsUser = async (params) => {
    try {
      const response = await this._api.get("/api/v2/analytics/reports", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };
    //Fetch Google Analytics Activity
  static FetchGoogleAnalyticsActivity = async (params) => {
    try {
      const response = await this._api.get("/api/v2/analytics/activity", {params:params});
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Brand Analyzed Influencers
  static FetchBrandAnalyzedInfluencers = async (pageUrl, query) => {
    try {
      const response = await this._api.post(pageUrl, query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch User Categories
  static FetchUserCategories = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-user-categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch User Countries
  static FetchCountries = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-countries");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Languages
  static FetchLanguages = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-langs");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Add New List
  static NewList = async (query) => {
    try {
      const response = await this._api.post("/api/v1/list/store", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Brand Instagram List Influencers
  static FetchBrandInstagramListInfluencers = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand/instagram/list/view",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //View Brand  Profile
  static BrandProfile = async (query) => {
    try {
      const response = await this._api.post("/api/v1/brand-profile", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Brand Influencers Reports
  static FetchBrandInfluencersReports = async () => {
    try {
      const response = await this._api.get("/api/v1/brand-influencers-reports");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Platforms
  static FetchPlatforms = async () => {
    try {
      const response = await this._api.get("/api/v1/platforms");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Load More
  // static LoadMore = async (skip, s, status) => {
  //   try {
  //     const response = await this._api.post("/api/v1/campaigns/load-more", {
  //       skip: s,
  //       status: "draft",
  //     });
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // HandleFetchPlatforms
  static HandleFetchPlatforms = async (params) => {
    try {
      const response = await this._api.get("/api/v1/platforms", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  static HandleFetchInfluencerPlatforms = async () => {
    try {
      const response = await this._api.get("/api/v1/influencer/platforms");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Invited User
  static FetchInvitedUser = async (id) => {
    try {
      const response = await this._api.get("/api/v1/invitation-user", {
        params: { id: id },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Refresh Reports
  static RefreshReports = async (params, headers) => {
    try {
      const response = await this._api.get(
        "/api/v1/refresh",
        { params: params },
        headers
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Send Message
  static SendMessage = async (query) => {
    try {
      const response = await this._api.post("/api/v1/send-message", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Offer
  static FetchOffer = async (id) => {
    try {
      const response = await this._api.get("/api/v1/fetch-offer/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Categories
  static FetchCategories = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-user-categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Handle Product Update
  static ProductUpdateHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/update-product", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //Handle Image Delete
  static ProductImageDeleteHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/delete-product-img", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //Handle Image Delete
  static ProductImageAddHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/add-product-img", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //Handle Product Remove
  static ProductRemoveHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/remove-offer", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Handle Upload Product Pdf
  static UploadProductPdfHandle = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/upload-voucher-pdf",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Remove Voucher Pdf
  static RemoveVoucherPdf = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/remove-voucher-pdf",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //HandleProductRetire
  static ProductRetireHandle = async (query) => {
    try {
      const response = await this._api.post("/api/v1/offer-retire", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Remove Product Retire
  static RemoveProductRetireHandle = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/remove-offer-retire",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Brand Transactions
  static BrandTransactionsFetch = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-transactions",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influencer Finances
  static FetchInfluencerFinances = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-finances",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Download Invoice
  // static DownloadInvoice = async (id) => {
  //   try {
  //     const response = await this._api.get("/download-invoice/" + id);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // Send Withdrawal Request
  static SendWithdrawalRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-withdrawal-request",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Influencer Find Campaigns
  static InfluencerFindCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-influencer-find-campaigns"
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Forget Passwrod Submit
  static HandleForgetPasswrodSubmit = async (query) => {
    try {
      const response = await this._api.post("/api/v1/forget-password", query);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Reset Password View
  static HandleResetPasswordView = async (token, email) => {
    try {
      const response = await this._api.post("/api/v1/password/reset/" + token + '/' + email);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Handle Brand Reset Passwrod Submit
  static HandleBrandResetPasswrodSubmit = async (query) => {
    try {
      const response = await this._api.post("/api/v1/reset", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch State
  static FetchStates = async (countryId) => {
    try {
      const response = await this._api.get("/api/v1/fetch-states/" + countryId);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Cities
  static FetchCities = async (stateId) => {
    try {
      const response = await this._api.get("/api/v1/fetch-cities/" + stateId);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Time Zones
  static FetchTimeZones = async (countryId) => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-time-zones/" + countryId
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Currencies
  static FetchCurrencies = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-currencies");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Currency
  static FetchCurrency = async (coutryCode) => {
    try {
      const response = await this._api.post(
        "/api/v1/fetch_country_currencies",
        coutryCode
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Notifications
  static FetchNotifications = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-notifications");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Notifications
  static FetchInfluencerNotifications = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-influencer-notifications");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Current Logged In User
  static CurrentLoggedInUser = async (role) => {
    try {
      const response = await this._api.get("/api/v1/current-logged-in-user", {params: {role: role}});
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Mark As Read Notifications
  static MarkAsReadNotifications = async (query, headers) => {
    try {
      const response = await this._api.post(
        "/api/v1/mark-as-read-notifications",
        query,
        { headers: headers }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
 // Mark As Read Notifications
  static MarkAsReadInfluencerNotifications = async (query, headers) => {
    try {
      const response = await this._api.post(
        "/api/v1/mark-as-read-influencer-notifications",
        query,
        { headers: headers }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influencer Campaigns
  static FetchInfluencerCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-influencer-campaigns"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Waiting Influencer Campaigns
  static FetchWaitingInfluencerCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-waiting-influencer-campaigns"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch To Do Influencer Campaigns
  static FetchToDoInfluencerCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-todo-influencer-campaigns"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Closed Influencer Campaigns
  static FetchClosedInfluencerCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-closed-influencer-campaigns"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influencer Dashboard Campaigns
  static FetchInfluencerDashboardCampaigns = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-influencer-dashboard-campaigns"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Facebook Login Link
  static FacebookLoginLink = async (data) => {
    try {
      const response = await this._api.post("/api/v1/facebook/callback", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Check Facebook Login
  static CheckFacebookLogin = async () => {
    try {
      const response = await this._api.get("/api/v1/auth/facebook");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Add Influencer
  static AddInfluencer = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/list/add/influencer",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //Influencer Login Axios Call
  static influencerLogin = async (data) => {
    try {
      const response = await this._api.post("/api/v1/login", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Fetch Influencer Profile
  static FetchInfluencerProfile = async () => {
    try {
      const response = await this._api.get("/api/v1/influencer-profile");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch TikTok Profile
  static FetchTikTokProfile = async (headers) => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-tiktok-profile",
        headers
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Refresh Influencer Profile
  static RefreshInfluencerProfile = async (headers) => {
    try {
      const response = await this._api.get(
        "/api/v1/refresh-influencer-profile",
        headers
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Booking Campaign Overview
  static InfluencerBookingCampaignOverview = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-booking-campaign-overview/" + id
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Booking Campaign Payment
  static InfluencerBookingCampaignPayment = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-booking-campaign-payment/" + id
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fast Payment Switch
  static FastPaymentSwitch = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/switch-to-fast-payment",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Booking Campaign Content
  static InfluencerBookingCampaignContent = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-booking-campaign-content/" + id
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Booking Campaign Messages
  static InfluencerBookingCampaignMessages = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-booking-campaign-messages/" + id
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Send Message
  static InfluencerSendMessage = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-send-message",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Request Quote Payment
  static SubmitRequestQuotePayment = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/submit-influencer-request-quote-payment",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Upload File
  static UploadFile = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-upload-message-attachment",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Upload Content Story
  static HandleUploadContentStory = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-campaign-content-upload-story",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Upload Content Video
  static HandleUploadContentVideo = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-campaign-content-upload-story-video",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Upload Content Story Insight
  static HandleUploadContentStoryInsight = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-campaign-content-upload-story-insight",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Booking Request
  static HandleBookingRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-booking-request",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Cancel Request
  static HandleCancelRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-cancel-request",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Fetch Abort Reasons
  static HandleFetchAbortReasons = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-abort-reasons");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Abort Request
  static HandleAbortRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-abort-request",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Work Done Request
  static HandleWorkDoneRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-work-done-request",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Preview Request
  static HandlePreviewRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-preview-request",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Influencer Accept Request
  static HandleInfluencerAcceptRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-booking-campaign-accept",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Influencer Reject Request
  static HandleInfluencerRejectRequest = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-booking-campaign-reject",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Closed Campaigns
  static FetchClosedCampaigns = async (pageUrl, query) => {
    try {
      const response = await this._api.get(pageUrl, {params:query});

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Delete Campaign
  static DeleteCampaign = async (data) => {
    try {
      const response = await this._api.post("/api/v1/campaign/destroy", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Draft Campaigns
  static FetchDraftCampaigns = async (pageUrl, query) => {
    try {
      const response = await this._api.get(pageUrl, {params:query});

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Active Campaigns
  static FetchActiveCampaigns = async (pageUrl, query) => {
    try {
      const response = await this._api.get(pageUrl,  {params:query});

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch BrandLists
  static FetchBrandLists = async (pageUrl, query) => {
    try {
      const response = await this._api.post(pageUrl, {params:query});

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influencers
  static FetchInfluencers = async (pageUrl, query) => {
    try {
      const response = await this._api.post(pageUrl, query);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Plat Froms
  static FetchPlatFroms = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-platforms");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Instagram Posts
  static InfluencerInstagramPosts = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer-instagram-feeds"
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Tiktok List Video
  static FetchTiktokListVideo = async () => {
    try {
      const response = await this._api.get("/api/v2/tiktok/video");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Youtube List Video
  static FetchYoutubeListVideo = async () => {
    try {
      const response = await this._api.get("/api/v2/youtube/video");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Selected Feed Post
  static SelectedFeedPost = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-selected-feed-post",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Select Tiktok
  static HandleSelectTiktok = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-selected-tiktok-post",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Select Youtube
  static HandleSelectYoutube = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-selected-youtube-post",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // File Download
  static FileDownload = async (query) => {
    try {
      const response = await this._api.post("/api/v1/file-download", query);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Campagin Types
  static FetchCampaginTypes = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-campaign-types");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // New Campaign SetUp
  static NewCampaignSetUp = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/set-up-new-campaign",
        query
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Ranges
  static FetchRanges = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch/ranges");

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Payment
  static SubmitPayment = async (data) => {
    try {
      const response = await this._api.post("/api/v1/submit/payment", data);

      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Products
  static FetchProducts = async (query) => {
    try {
      const response = await this._api.post("/api/v1/fetch-products", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch All Products
  static FetchAllProducts = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/fetch-all-products",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Register Brand
  static HandleRegisterBrand = async (query) => {
    try {
      const response = await this._api.post("/api/v1/register-brand", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Join Brand
  static HandleJoinBrand = async (query) => {
    try {
      const response = await this._api.post("/api/v1/join-brand", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Accept Brand Invitation
  static AcceptBrandInvitation = async (query) => {
    try {
      const response = await this._api.post("/api/v1/accept-invitation", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Influencer Register Submit
  static HandleInfluencerRegisterSubmit = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-register",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch User Categories
  // static FetchUserCategories = async () => {
  //   try {
  //     const response = await this._api.get("/api/v1/fetch-user-categories");
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // Handle Register Invited Influencer
  static HandleRegisterInvitedInfluencer = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/register-invited-influencer",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Plan Summary
  static FetchPlanSummary = async (id) => {
    try {
      const response = await this._api.get("/api/v1/plan-summary/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Apply Coupon
  static ApplyCoupon = async (query) => {
    try {
      const response = await this._api.post("/api/v1/apply-coupon", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Account Settings
  static BrandAccountSettings = async () => {
    try {
      const response = await this._api.get("/api/v1/account_settings");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Account Settings
  static InfluencerAccountSettings = async () => {
    try {
      const response = await this._api.get("/api/v1/influencer_account_settings");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Email Update
  static HandleEmailUpdate = async (query) => {
    try {
      const response = await this._api.post("/api/v1/update-email", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Username Update
  static HandleUsernameUpdate = async (query) => {
    try {
      const response = await this._api.post("/api/v1/update-username", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Password Update
  static HandlePasswordUpdate = async (query) => {
    try {
      const response = await this._api.post("/api/v1/update-password", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // User Close Account
  static UserCloseAccount = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/user-close-account",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Basic Info Settigs
  static BrandBasicInfoSettigs = async () => {
    try {
      const response = await this._api.get("/api/v1/brand_basic_info_settings");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Influencer Basic Info Settigs
  static InfluencerBasicInfoSettigs = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/influencer_basic_info_settings"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Change Avatar
  static HandleChangeAvatar = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/update-brand-avatar",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Change Influencer Avatar
  static HandleChangeInfluencerAvatar = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/update-influencer-avatar",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Brand Basic Info Update
  static HandleBrandBasicInfoUpdate = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand_update_basic_info",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Influencer Basic Info Update
  static HandleInfluencerBasicInfoUpdate = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer_update_basic_info",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Verify Gmail Token
  static BrandVerifyGmailToken = async (code) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-gmail-verify-token",
        { code }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Gmail Setting
  static FetchGmailSetting = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-gmail-settings");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Gmail Update
  static HandleGmailUpdate = async (query) => {
    try {
      const response = await this._api.post("/api/v1/gmail-update-info", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Disconnect Gmail
  static DisconnectGmail = async () => {
    try {
      const response = await this._api.get("/api/v1/disconnect-gmail");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // User General Notifications
  static UserGeneralNotifications = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/user-general-notifications"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // User Campaign Notification
  static UserCampaignNotification = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/user-campaigns-notifications"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Save Changes Notifications
  static SaveChangesNotifications = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/save-changes-notifications",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Fetch Credit Cards
  static HandleFetchCreditCards = async () => {
    try {
      // const response = await this._api.get("/api/v1/fetch-credit-cards");
      const response = await this._api.get("/api/v2/billing");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Add Credit Card
  static HandleAddCreditCard = async (query) => {
    try {
      // const response = await this._api.post("/api/v1/add-new-card", query);
      const response = await this._api.post("/api/v2/billing", query)
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Remove Credit Card
  static HandleRemoveCreditCard = async (query) => {
    try {
      // const response = await this._api.post(
      //   "/api/v1/remove-credit-card",
      //   query
      // );
      const response = await this._api.post("/api/v2/billing/remove-credit-card", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // HandleBillingAddressUpdate
  static HandleBillingAddressUpdate = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/update-billing-address",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // User Attached Accounts
  static UserAttachedAccounts = async () => {
    try {
      const response = await this._api.get("/api/v1/user-attached-accounts");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Add Bank Account
  static HandleAddBankAccount = async (query) => {
    try {
      const response = await this._api.post("/api/v1/add-bank-account", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Remove Bank Account
  static RemoveBankAccount = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/remove-bank-account",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Switch Payment Method
  static SwitchPaymentMethod = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/switch-payment-method",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Get Platforms
  static HandleGetPlatforms = async () => {
    try {
      const response = await this._api.get("/api/v1/get-platforms");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Instagram Oath Code
  static InstagramOathCode = async (data) => {
    try {
      const response = await this._api.post("/api/v2/instagram/connect", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Instagram Connect
  static InstagramConnect = async (data) => {
    try {
      const response = await this._api.post("/api/v1/instagram/connect", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Instagram Connect
  static SubmitInstagramConnect = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/connect/instagram/submit",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Instagram Connect
  static SubmitInstagramInfluencerConnect = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer/connect/instagram/submit",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Infleuncer Registeration Finish
  static InfleuncerRegisterationFinish = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/influencer-registration-finish",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Save Changes Platform
  static SaveChangesPlatform = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/save-changes-platform",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
 // Save Changes Influencer Platform
  static SaveChangesInfluencerPlatform = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/save-changes-influencer-platform",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Disconnect Platform
  static DisconnectPlatform = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/disconnect-platform",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Disconnect Influencer Platform
  static DisconnectInfluencerPlatform = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/disconnect-influencer-platform",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // User Selected Categories
  static UserSelectedCategories = async () => {
    try {
      const response = await this._api.get("/api/v1/user-selected-categories");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Save Changes Categories
  static SaveChangesCategories = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/save-changes-categories",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Connect Instagram Submit
  static BrandConnectInstagramSubmit = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand/connect/instagram/submit",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Subscription Reports
  static FetchSubscriptionReports = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-subscription-reports"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Verify Shopify Token
  static BrandVerifyShopifyToken = async (data) => {
    try {
      const response = await this._api.post(
        "/api/shopify/connect",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Disconnect Shopify Store
  static DisconnectShopifyStore = async () => {
    try {
      const response = await this._api.post("/api/v1/brand-shopify-disconnect");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Start Import Product
  static StartImportProduct = async () => {
    try {
      const response = await this._api.post(
        "/api/v1/shopify-import-product-start"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Start Import Customer
  static StartImportCustomer = async (data) => {
    try {
      const response = await this._api.post(
        "/api/v1/shopify-customer-email-start",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Subscription Plans
  static FetchSubscriptionPlans = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-subscription-plans");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Brand Subscription Plans
  static FetchBrandSubscriptionPlans = async () => {
    try {
      const response = await this._api.get(
        "/api/v1/fetch-brand-subscription-plans"
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Promotional Plans
  static FetchPromotionalPlans = async () => {
    try {
      const response = await this._api.get("/api/v1/fetch-promotional-plans");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Upgrade Plan
  static UpgradePlan = async (id) => {
    try {
      const response = await this._api.get("/api/v1/upgrade-plan/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Downgrade Plan
  static DowngradePlan = async (id) => {
    try {
      const response = await this._api.get("/api/v1/downgrade-plan/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Add On Plan
  static AddOnPlan = async (data) => {
    try {
      const response = await this._api.post("/api/v1/add-on-subscribe", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Add On Plan Un Subscribe
  static AddOnPlanUnSubscribe = async (data) => {
    try {
      const response = await this._api.post("/api/v1/add-on-cancelled", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Cancel Subscription
  static CancelSubscription = async () => {
    try {
      const response = await this._api.get("/api/v1/cancel-subscription");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Campaign
  static FetchCampaign = async (id) => {
    try {
      const response = await this._api.get("/api/v1/fetch-campaign/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Type
  static SubmitType = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/type", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Basic
  static SubmitBasic = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/basic", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Brief
  static SubmitBrief = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/breif", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Timing
  static SubmitTiming = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/timing", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // SubmitInfluencers
  static SubmitInfluencers = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/submit/influencers",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Products Fetch
  static ProductsFetch = async (query) => {
    try {
      const response = await this._api.post("/api/v1/fetch-products", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // PaymentSubmit
  static PaymentSubmit = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/payment", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Submit Overview
  static SubmitOverview = async (query) => {
    try {
      const response = await this._api.post("/api/v1/submit/overview", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Save Overview
  static SaveOverview = async (query) => {
    try {
      const response = await this._api.post("/api/v1/save/overview", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Create Campaign With Selected
  static CreateCampaignWithSelected = async (query) => {
    try {
      const response = await this._api.post("/api/v1/create-campaign", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Create Campaign With Invite
  static CreateCampaignWithInvite = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/create-campaign-with-invite",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Update Invitation Message
  static UpdateInvitationMessage = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/update-invitation-message",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // FetchTypes
  static FetchTypes = async () => {
    try {
      const response = await this._api.get("/api/v1/types");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // View Influencer Profile
  static ViewInfluencerProfile = async (id) => {
    try {
      const response = await this._api.get(
        "/api/v1/view-influencer-profile/" + id
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // View Influencer Profile Username
  static ViewInfluencerProfileUsername = async (username) => {
    try {
      const response = await this._api.get(
        "/api/v1/view-influencer-profile-username/" + username
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Brand Refresh Influencer Profile
  static BrandRefreshInfluencerProfile = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/brand-refresh-influencer-profile",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Common Calls in Components
  //Cards Add Component
  static CardsAdd = async (query) => {
    try {
      // const response = await this._api.post("/api/v1/add-new-card", query);
      const response = await this._api.post("/api/v2/billing", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Credit Card
  static CreditCardComponent = async (query) => {
    try {
      const response = await this._api.post("/api/v1/brand-register", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Credit Card component 2 Handle Start Free Trial
  static HandleStartFreeTrial = async (query) => {
    try {
      const response = await this._api.post(
        "/api/v1/rather-start-free-trial",
        query
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Google Oauth Popup
  static GoogleOauth = async (scope, redirect_uri, brandType) => {
    try {
      const response = await this._api.get(
        "/google/connect?scope=" +
        scope +
        "&redirect_uri=" +
        redirect_uri +
        "&brandType=" +
        brandType
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // On Container Click
  static ContainerClick = async (brandType) => {
    try {
      const response = await this._api.get("/facebook/connect/" + brandType);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // TiktokConnect
  static TiktokConnect = async (data) => {
    try {
      const response = await this._api.post("/api/v2/tiktok/connect", data);
      // if (response.data.message === "success")
      // <Link to={"/influencial/tiktok"} />;
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // On Google Connect
  static GoogleConnect = async (data) => {
    try {
      const response = await this._api.post("/api/v2/connect/youtube", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  // static GoogleConnect = async data => {
  //   try {
  //     const response = await this._api.post("/api/v2/connect/youtube", data);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // On Google Connect
  // static GoogleConnected = async data => {
  //   try {
  //     const response = await this._api.post("/api/v2/connect/youtube", data);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // On Container Click
  static ContainerClicked = async (brandType) => {
    try {
      const response = await this._api.get("/tiktok/connect/" + brandType);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influential Followers
  static FetchInfluentialFollowers = async (params) => {
    try {
      const response = await this._api.get(
        "/api/v1/brand-influential-followers",
        { params: params }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Fetch Influential Likers
  static FetchInfluentialLikers = async (params) => {
    try {
      const response = await this._api.get("/api/v1/brand-influential-likers", {
        params: params,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //   End of Store Actions
  // HandleRemoveCard
  static HandleRemoveCard = async () => {
    try {
      const response = await this._api.post("/api/v1/remove-credit-card");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // RemoveCard
  static RemoveCard = async () => {
    try {
      // const response = await this._api.post("/api/v1/remove-credit-card");
      const response = await this._api.post("/api/v2/billing/remove-credit-card");
      return response;
    } catch (error) {
      return error.response;
    }
  };

  //Logout Call
  static LogOut = async () => {
    try {
      const response = await this._api.get("/api/v1/logout");
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Draft Campaign
  static DraftCampaign = async (id) => {
    try {
      const response = await this._api.post("/api/v1/draft-campaign/" + id);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Disconnect Platform
  static PlatformDisconnect = async (data) => {
    try {
      const response = await this._api.post("/api/v2/tiktok/connect", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //  On Google Connect
  static GoogleConnectOn = async (data) => {
    try {
      const response = await this._api.post("/api/v2/connect/youtube", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Handle Next Click
  static HandleNextClick = async (data) => {
    try {
      const response = await this._api.post("/api/v1/brand-validation", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Buy Credits Now
  static BuyCreditsNow = async (credits) => {
    try {
      const response = await this._api.post("/api/v2/billing/purchase-credit", {
        credits,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Start Free Trial
  static StartFreeTrial = async (query) => {
    try {
      const response = await this._api.post("/api/v1/start-free-trial", query);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //common call
  // Navigate To Next
  static NavigateToNext = async (data) => {
    try {
      const response = await this._api.post(
        "/api/v1/register-validation",
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };
  // Connect Analysit
  static ConnectAnalysit = async (data) => {
    try {
      const response = await this._api.post("/api/v2/connect/analytics", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //Redux Calls
  // Fetch Dictionaries
  // static FetchDictionaries = async () => {
  //   try {
  //     const response = await this._api.get("/api/v2/search/dictionaries");
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // // Search Looka likes
  // static SearchLookalikes = async data => {
  //   try {
  //     const response = await this._api.post("/api/v2/search/lookalikes", data);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };
  // // Search Influencers
  // static SearchInfluencers = async data => {
  //   try {
  //     const response = await this._api.post("/api/v2/search/influencers", data);
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };

  //Brand Register Service
  // static BrandRegisterService = async query => {
  //   try {
  //     const response = await this._api.post(
  //       helper.url + "/api/v1/brand-register",
  //       query
  //     );
  //     return response;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };

  //  static fanFind = async () => {
  //    try {
  //      const response = await this._api.get(`fans/find`);
  //      return response;
  //    } catch (error) {
  //      return error.response;
  //    }
  //  };

  //  static leaderboard = async (creator_id,limit,index) => {
  //    try {
  //      const response = await this._api.get(`creators/leaderboard/${creator_id}/${limit}/${index}`);
  //      return response;
  //    } catch (error) {
  //      return error.response;
  //    }
  //  };

  //  static resolveOauth = async (creator_id, touchpoint, code, redirect_uri) => {
  //    try {
  //      let data = {
  //        redirectUri: redirect_uri,
  //        authToken: code,
  //        query: 'info'
  //      }

  //      const response = await this._api.patch(`fans/resolve-oauth/${touchpoint}/${creator_id}`, data);
  //      return response;
  //    } catch (error) {
  //      return error.response;
  //    }
  //  };

  //  static updateFan = async (body) => {
  //    try {
  //      const response = await this._api.patch(`fans/update`,body);
  //      return response;
  //    } catch (error) {
  //      return error.response;
  //    }
  //  };

  //  static fanTouchpoints = async (creator_id) => {
  //    try {
  //      const response = await this._api.get(`fans/touchpoints/${creator_id}`);
  //      return response;
  //    } catch (error) {
  //      return error.response;
  //    }
  //  };
}
