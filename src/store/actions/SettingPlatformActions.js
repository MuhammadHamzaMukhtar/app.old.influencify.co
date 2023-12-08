// import axios from "axios";
import helper from "../../constants/helper";
import {
  fetchBrandNotableUsers,
  fetchInfluentialFollowers,
  fetchInfluentialLikers,
} from "./BrandAmbassadorsActions";
import { refreshReports } from "./HeaderActions";
import {
  HANDLE_FETCH_PLATFORMS_SUCCESS,
  HANDLE_FETCH_PLATFORMS_FAILURE,
  HANDLE_CONNECT_INSTAGRAM,
  HANDLE_CONNECT_FINISH,
  HANDLE_CONNECT_INIT,
  HANDLE_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
  HANDLE_CONNECT_INSTAGRAM_SUBMIT_FAILURE,
  HANDLE_VALIDATION_ERRORS,
  AJAX_CALL_INIT,
  AJAX_CALL_FINSH,
  HANDLE_SAVE_CHANGE_PLATFROM_SUCCESS,
  HANDLE_SAVE_CHANGE_PLATFROM_FAILURE,
  HANDLE_DISCONNECT_PLATFORM_SUCCESS,
  HANDLE_DISCONNECT_PLATFORM_FAILURE,
  HANDLE_INFLUENCER_REGISTRATION_FINSH_SUCCESS,
  HANDLE_INFLUENCER_REGISTRATION_FINSH_FAILURE,
  FETCH_USER_CATEGORIES_SUCCESS,
  FETCH_USER_CATEGORIES_FAILURE,
  USER_SELECTED_CATEGORIES_SUCCESS,
  USER_SELECTED_CATEGORIES_FAILURE,
  HANDLE_SAVE_CHANGE_CATEGORIES_SUCCESS,
  HANDLE_SAVE_CHANGE_CATEGORIES_FAILURE,
  HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
  HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_FAILURE,
  HANDLE_RESPONSE_SUCCESS_FALSE,
  SETTING_PLATFORM_SELECT_TIKTOK,
  HANDLE_REMOVE_VALIDATION_ERRORS
} from "../constants/action-types";
import { toast } from "react-toastify";
import Api from "@services/axios";

export const settingPlatformSelectTiktok = data => dispatch => {
  dispatch({
    type: SETTING_PLATFORM_SELECT_TIKTOK,
    payload: data,
  });
};

export const settingPlatformSelectYoutube = data => dispatch => {
  dispatch({
    type: "HANDLE_YOUTUBE_CONNECT_RES",
    payload: data,
  });
};

export const handleFetchPlatforms = flag => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  let params = { flag };
  // axios
  //   .get(helper.url + "/api/v1/platforms", { params: params })
  Api.HandleFetchPlatforms(params)
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_SUCCESS,
        payload: res.data.platforms,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_FAILURE,
        payload: res.error,
      });
    });
};

export const handleFetchInfluencerPlatforms = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // let params = { flag };
  // axios
  //   .get(helper.url + "/api/v1/platforms", { params: params })
  Api.HandleFetchInfluencerPlatforms()
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_SUCCESS,
        payload: res.data.platforms,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_FAILURE,
        payload: res.error,
      });
    });
};

export const handleGetPlatforms = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios
  //   .get(helper.url + "/api/v1/get-platforms")
  Api.HandleGetPlatforms()
    .then(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_SUCCESS,
        payload: res.data.platforms,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(res => {
      dispatch({
        type: HANDLE_FETCH_PLATFORMS_FAILURE,
        payload: res.error,
      });
    });
};

export const instagramOathCode = code => dispatch => {
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  const data = { code: code };
  //axios
  // .post(helper.url + "/api/v2/instagram/connect", data)
  Api.InstagramOathCode(data)
  .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
      } else {
        dispatch({
          type: HANDLE_CONNECT_INSTAGRAM,
          payload: res.data,
        });
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_CONNECT_FINISH,
      });
      dispatch({
        type: HANDLE_VALIDATION_ERRORS,
        payload: {},
      });
    });
};

export const instagramConnect = query => dispatch => {
  dispatch({
    type: HANDLE_VALIDATION_ERRORS,
    payload: {},
  });
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  window.FB.login(
    function (response) {
      if (response.status === "connected") {
        var accessToken = response.authResponse.accessToken;
        window.FB.api(
          "/me",
          "GET",
          {
            fields:
              "id,email,first_name,last_name,is_guest_user,name_format,name,short_name,accounts,picture",
          },
          function (response) {
            let data = {
              response: response,
              accessToken: accessToken,
              platform: query.platform,
            };
            //axios
            // .post(helper.url + "/api/v1/instagram/connect", data)
            Api.InstagramConnect(data)
              .then(res => {
                if (res.data.errors) {
                  dispatch({
                    type: HANDLE_VALIDATION_ERRORS,
                    payload: res.data.errors,
                  });
                  dispatch({
                    type: HANDLE_CONNECT_FINISH,
                  });
                }  else {
                  dispatch({
                    type: HANDLE_CONNECT_INSTAGRAM,
                    payload: res.data,
                  });
                  dispatch({
                    type: HANDLE_CONNECT_FINISH,
                  });
                }
              })
              .catch(error => {
                dispatch({
                  type: HANDLE_CONNECT_FINISH,
                });
                dispatch({
                  type: HANDLE_VALIDATION_ERRORS,
                  payload: {},
                });
              });
          }
        );
      } else {
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: {},
        });
      }
    },
    {
      scope:
        "email ,manage_pages ,instagram_basic,instagram_manage_insights, pages_read_engagement ",
      return_scopes: true,
    }
  );
};

export const submitInstagramConnect = query => dispatch => {
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  // axios
  //   .post(helper.url + "/api/v1/connect/instagram/submit", query)
  Api.SubmitInstagramConnect(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });

        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
      } else {
        dispatch({
          type: HANDLE_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
          payload: res.data,
        });
        dispatch(handleFetchPlatforms());
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_CONNECT_INSTAGRAM_SUBMIT_FAILURE,
        payload: error,
      });
    });
};

export const submitInstagramInfluencerConnect = query => dispatch => {
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  return new Promise((resolve)=>{
    Api.SubmitInstagramInfluencerConnect(query)
      .then(res => {
        if (res.data.errors) {
          dispatch({
            type: HANDLE_VALIDATION_ERRORS,
            payload: res.data.errors,
          });

          dispatch({
            type: HANDLE_CONNECT_FINISH,
          });
        } else {
          dispatch({
            type: HANDLE_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
            payload: res.data,
          });
          dispatch(handleFetchInfluencerPlatforms());
          dispatch({
            type: HANDLE_CONNECT_FINISH,
          });
        }
        resolve(res)
      })
      .catch(error => {
        dispatch({
          type: HANDLE_CONNECT_INSTAGRAM_SUBMIT_FAILURE,
          payload: error,
        });
      });
  })
  
};

export const infleuncerRegisterationFinish = (query, navigate) => dispatch => {
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  //axios
  // .post(helper.url + "/api/v1/influencer-registration-finish", query)
  Api.InfleuncerRegisterationFinish(query)
  .then(res => {
    if (res.data.errors || res.data.success == false) {
      dispatch({
        type: HANDLE_VALIDATION_ERRORS,
        payload: res.data.errors ?? res.data,
      });
      
      dispatch({
        type: HANDLE_CONNECT_FINISH,
      });
    } else {
      // window.gr("track", "conversion", { email: query.email });
        dispatch({
          type: HANDLE_INFLUENCER_REGISTRATION_FINSH_SUCCESS,
          payload: res.data,
        });
      navigate("/account-created")
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_INFLUENCER_REGISTRATION_FINSH_FAILURE,
        payload: error,
      });
    });
};

export const saveChangesPlatform = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .post(helper.url + "/api/v1/save-changes-platform", query)
  Api.SaveChangesPlatform(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: AJAX_CALL_FINSH,
        });

        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
      } else {
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        dispatch({
          type: HANDLE_SAVE_CHANGE_PLATFROM_SUCCESS,
          payload: res.data,
        });

        toast.success(helper.successMsg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_SAVE_CHANGE_PLATFROM_FAILURE,
        payload: error,
      });
    });
};

export const saveChangesInfluencerPlatform = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .post(helper.url + "/api/v1/save-changes-platform", query)
  Api.SaveChangesInfluencerPlatform(query)
    .then(res => {
      if (res.data.errors) {
        dispatch({
          type: AJAX_CALL_FINSH,
        });

        dispatch({
          type: HANDLE_VALIDATION_ERRORS,
          payload: res.data.errors,
        });
      } else {
        dispatch({
          type: AJAX_CALL_FINSH,
        });
        dispatch({
          type: HANDLE_SAVE_CHANGE_PLATFROM_SUCCESS,
          payload: res.data,
        });

        toast.success(helper.successMsg);
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_SAVE_CHANGE_PLATFROM_FAILURE,
        payload: error,
      });
    });
};

export const disconnectPlatform = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios
  //   .post(helper.url + "/api/v1/disconnect-platform", query)
  Api.DisconnectPlatform(query)
    .then(res => {
      dispatch({
        type: HANDLE_DISCONNECT_PLATFORM_SUCCESS,
        payload: res.data,
      });
      dispatch(handleFetchPlatforms());
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_DISCONNECT_PLATFORM_FAILURE,
        payload: error,
      });
    });
};

export const disconnectInfluencerPlatform = query => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  // axios
  //   .post(helper.url + "/api/v1/disconnect-platform", query)
  Api.DisconnectInfluencerPlatform(query)
    .then(res => {
      dispatch({
        type: HANDLE_DISCONNECT_PLATFORM_SUCCESS,
        payload: res.data,
      });
      dispatch(handleFetchInfluencerPlatforms());
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: HANDLE_DISCONNECT_PLATFORM_FAILURE,
        payload: error,
      });
    });
};

export const fetchUserCategories = () => dispatch => {
  // axios
  //   .get(helper.url + "/api/v1/fetch-user-categories")
  Api.FetchUserCategories()
    .then(res => {
      dispatch({
        type: FETCH_USER_CATEGORIES_SUCCESS,
        payload: res.data.categoires,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_USER_CATEGORIES_FAILURE,
        payload: error,
      });
    });
};

export const userSelectedCategories = () => dispatch => {
  dispatch({
    type: AJAX_CALL_INIT,
  });
  //axios
  // .get(helper.url + "/api/v1/user-selected-categories")
  Api.UserSelectedCategories()
    .then(res => {
      dispatch({
        type: USER_SELECTED_CATEGORIES_SUCCESS,
        payload: res.data.data,
      });
      dispatch({
        type: AJAX_CALL_FINSH,
      });
    })
    .catch(error => {
      dispatch({
        type: USER_SELECTED_CATEGORIES_FAILURE,
        payload: error,
      });
    });
};

export const saveChangesCategories = query => dispatch => {
  //axios
  // .post(helper.url + "/api/v1/save-changes-categories", query)
  Api.SaveChangesCategories(query)
    .then(res => {
      dispatch({
        type: HANDLE_SAVE_CHANGE_CATEGORIES_SUCCESS,
        payload: res.data,
      });
      toast.success(helper.successMsg);
    })
    .catch(error => {
      dispatch({
        type: HANDLE_SAVE_CHANGE_CATEGORIES_FAILURE,
        payload: error,
      });
    });
};

export const brandConnectInstagramSubmit = query => dispatch => {
  dispatch({
    type: HANDLE_CONNECT_INIT,
  });
  //axios
  // .post(helper.url + "/api/v1/brand/connect/instagram/submit", query)
  Api.BrandConnectInstagramSubmit(query)
    .then(res => {
      if (res.data.success === false) {
        dispatch({
          type: HANDLE_RESPONSE_SUCCESS_FALSE,
          data: res.data,
        });
        dispatch({
          type: HANDLE_CONNECT_FINISH,
        });
        dispatch({
          type: HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
        });
      } else {
        if (res.data.errors) {
          dispatch({
            type: HANDLE_VALIDATION_ERRORS,
            payload: res.data.errors,
          });
          dispatch({
            type: HANDLE_CONNECT_FINISH,
          });
        } else {
          toast.success('Instagram connected successfully!')
          dispatch({
            type: HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_SUCCESS,
            payload: res.data,
          });
          dispatch(
            fetchBrandNotableUsers({
              sortQuery: "followers",
              platform: "instagram",
            })
          );
          dispatch(
            fetchInfluentialFollowers(1, {
              sortQuery: "followers",
              platform: "instagram",
            })
          );
          dispatch(
            fetchInfluentialLikers(1, {
              sortQuery: "followers",
              platform: "instagram",
            })
          );
          dispatch(refreshReports());
          dispatch({
            type: HANDLE_CONNECT_FINISH,
          });
        }
      }
    })
    .catch(error => {
      dispatch({
        type: HANDLE_BRAND_CONNECT_INSTAGRAM_SUBMIT_FAILURE,
        payload: error,
      });
    });
};

export const settingRemoveValidationErrors = (data) => dispatch => {
  dispatch({
    type: HANDLE_REMOVE_VALIDATION_ERRORS,
    payload: data
  })
}