import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import * as settingTiktokActions from "@store/actions/SettingTiktokActions";
import Api from "@services/axios";
import { HANDLE_VALIDATION_ERRORS } from "@store/constants/action-types";

const TiktokCallbackScreen = (props) => {
	const locationn = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const search = locationn.search;
	const query = new URLSearchParams(search);
	const [verificationStatus, setVerificationStatus] = useState("");
	useEffect(() => {
		const data = {
			code: query.get("code"),
		};
		const tiktokAuth = async () => {
			if (!query.get('error')) {
				const res =
					query.get("state") === "influencer" || query.get("state") === "influencer_profile"
						? await Api.TiktokConnect(data)
						: (query.get("state") === "brand" ? await settingTiktokActions.brandVerifyTiktokCode(data, dispatch) : await Api.TiktokConnect(data));
				setVerificationStatus(res);
				if (query.get("state") !== "brand" && (res.response || res.data?.response)) {
					props.settingPlatformSelectTiktok(res.data?.response || res.response);
					props.removeValidationErrors(res.data?.response || res.response);
				} else if (res.success == false || res.data?.success == false) {
					dispatch({
						type: HANDLE_VALIDATION_ERRORS,
						payload: res.data.data ?? res.data
					})
				}
				if (res.message !== "error") {
					if (query.get("state") === "influencer")
						navigate("/influencer/register/Step5");
					else if (query.get("state") === "influencer_profile")
						navigate("/influencer/setting-influencer-platforms");
					else navigate(`/influencer/influencer-booking/${query.get("state")}?tab=1`, { state: res.data });
				}
			} else {
				if (query.get("state") === "influencer")
					navigate("/influencer/register/Step5");
				else if (query.get("state") === "influencer_profile")
					navigate("/influencer/setting-influencer-platforms");
				else navigate("/influencial/tiktok");
			};
		}
		tiktokAuth();
	}, []);
	return (
		<div className="flex h-screen items-center justify-center">
			{verificationStatus.message !== "error" ? (
				<div className="text-center">
					<p className="text-3xl text-gray-500 mt-2">Redirecting...</p>
				</div>
			) : (
				<div className="text-center">
					{verificationStatus.data && (
						<p className="text-lg text-red-500 mt-2">
							{verificationStatus.data.description}
						</p>
					)}
					{verificationStatus.exception && (
						<p className="text-2xl text-red-500 font-semibold">
							Access token expired! Please try again
						</p>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		errorsObj: state.RegisterReducer.errorsObj,
	}
}

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/YoutubeAuthRedux");
	return {
		settingPlatformSelectTiktok: (data) =>
			dispatch(settingPlatformActionCreator.settingPlatformSelectTiktok(data)),
		removeValidationErrors: (data) => {
			dispatch(settingPlatformActionCreator.settingRemoveValidationErrors(data))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TiktokCallbackScreen);
