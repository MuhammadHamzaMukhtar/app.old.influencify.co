import { useLocation, useNavigate, BrowserRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import Api from "@services/axios";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";

import * as settingYoutubeActions from "@store/actions/SettingYoutubeActions";
import { HANDLE_RESPONSE_SUCCESS_FALSE, HANDLE_VALIDATION_ERRORS } from "@store/constants/action-types";
import { toast } from "react-toastify";

const YoutubeCallbackScreen = (props) => {
  const locationn = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = locationn.search;
  const query = new URLSearchParams(search);
  const [verificationStatus, setVerificationStatus] = useState("");
  useEffect(() => {
    if (query.get("code") === null) {
      if (query.get("state") === "influencer") navigate("/influencer/register/Step5")
      else if (query.get("state") === "influencer_profile") navigate("/influencer/setting-influencer-platforms")
      else navigate("/influencial/youtube");
    }
    const data = {
      code: query.get("code"),
    };
    const YoutubeAuth = async () => {
      const response = query.get("state") === "influencer" || query.get("state") === "influencer_profile" ? await Api.GoogleConnect(data) : (query.get("state") === "brand" ? await settingYoutubeActions.brandVerifyYoutubeCode(
        data,
        dispatch
      ) : await Api.GoogleConnect(data))
      setVerificationStatus(response);
      if (query.get("state") !== "brand" && (response?.response || response?.data?.response)) {
        props.settingPlatformSelectYoutube(response.response || response.data.response);
        props.removeValidationErrors(response.response || response.data.response);
      } else if (response.success === false || response.data?.success === false) {
        if (query.get("state") === "influencer") {
          dispatch({
            type: HANDLE_VALIDATION_ERRORS,
            payload: response.data.data
          })
        } else {
          dispatch({
            type: HANDLE_RESPONSE_SUCCESS_FALSE,
            data: response.data
          })
        }
      } else if (response.data?.message == 'error') {
        toast.error(response.data?.data?.description)
      } else if (response.message !== 'error' && !response.exception) {
        toast.success('Youtube connected successfully!')
      }
      if (response.message !== "error" && !response.exception) {
        if (query.get("state") === "influencer") navigate("/influencer/register/Step5")
        else if (query.get("state") === "influencer_profile") navigate("/influencer/setting-influencer-platforms")
        else navigate(`/influencer/influencer-booking/${query.get("state")}?tab=1`, { state: response.data });
      }
    };

    YoutubeAuth();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      {verificationStatus.message !== "error" &&
        !verificationStatus.exception ? (
        <div className="text-center">
          <p className="text-3xl text-gray-500 mt-2">Redirecting...</p>
        </div>
      ) : (
        <div className="text-center space-y-6">
          {verificationStatus.data && (
            <p className="text-2xl text-red-500 font-semibold">
              {verificationStatus.data.description}
            </p>
          )}
          {verificationStatus.exception && (
            <p className="text-2xl text-red-500 font-semibold">
              Access token expired! Please try again
            </p>
          )}
          <Link to={'/influencial/youtube'} className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">Go Back</Link>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    settingPlatformSelectYoutube: (data) =>
      dispatch(settingPlatformActionCreator.settingPlatformSelectYoutube(data)),
    removeValidationErrors: (data) => {
      dispatch(settingPlatformActionCreator.settingRemoveValidationErrors(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeCallbackScreen);