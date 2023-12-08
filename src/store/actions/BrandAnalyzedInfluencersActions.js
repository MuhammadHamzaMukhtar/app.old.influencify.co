import helper from "../../constants/helper";
// import axios from "axios";

import {
  AJAX_CALL_FINSH,
  FECTH_BRAND_ANALYZED_INFLUENCERS_SUCCESS,
  FECTH_BRAND_ANALYZED_INFLUENCERS_FAILURE,
  CREATE_CAMPAIGN_WITH_ANALYZED_USERS,
  SEARCH_ANALYZER_SUCCESS,
  ANALYZER_SEARCH_INIT,
  ANALYZER_SEARCH_FINSH,
  BRAND_ANALYZED_INFLUENCERS_INIT,
  BRAND_ANALYZED_INFLUENCERS_FINSH,
  NO_CREDITS_EXIST,
} from "../constants/action-types";
import Api from "@services/axios";

export const fetchBrandAnalyzedInfluencers =
  (PaginationUrl, query) => dispatch => {
    let pageUrl = helper.url + "/api/v1/brand-analyzed-influencers";
    if (PaginationUrl) {
      const url = PaginationUrl.substr(1);
      pageUrl = helper.url + "/api/v1/brand-analyzed-influencers" + url;
    }
    if (query.isSearchAnalyzer === false) {
      dispatch({
        type: BRAND_ANALYZED_INFLUENCERS_INIT,
      });
    }
    // axios.post(pageUrl, query)
    Api.FetchBrandAnalyzedInfluencers(pageUrl, query)
      .then(res => {
        dispatch({
          type: FECTH_BRAND_ANALYZED_INFLUENCERS_SUCCESS,
          payload: {
            influencers: res.data.influencers,
          },
        });
        dispatch({
          type: BRAND_ANALYZED_INFLUENCERS_FINSH,
        });
      })
      .catch(error => {
        dispatch({
          type: FECTH_BRAND_ANALYZED_INFLUENCERS_FAILURE,
        });
      });
  };

export const createCampaignWithAnalyzed = (query, ownProps) => dispatch => {
  //   axios.post(helper.url + "/api/v1/create-campaign-notable-users", query)
  Api.CampaignWithAnalyzed(query)
    .then(res => {
      if (res.data.code === "NoCreditsExist") {
        dispatch({
          type: NO_CREDITS_EXIST,
        });
      } else {
        dispatch({
          type: CREATE_CAMPAIGN_WITH_ANALYZED_USERS,
          payload: res.data.data.id,
        });
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        ownProps.history.push("/brand/campaigns/" + res.data.data.id);
      }
    })
    .catch(error => {});
};

export const searchAnalyzer = query => dispatch => {
  dispatch({
    type: ANALYZER_SEARCH_INIT,
  });

  //   axios
  //     .post(helper.url + "/api/v1/search-analyzer", query)
  Api.Analyzer(query)
    .then(res => {
      if (res.data.code === "NoCreditsExist") {
        dispatch({
          type: NO_CREDITS_EXIST,
        });
      } else {
        dispatch({
          type: SEARCH_ANALYZER_SUCCESS,
          payload: res.data.data,
        });
      }
      dispatch({
        type: ANALYZER_SEARCH_FINSH,
      });
    })
    .catch(error => {});
};
