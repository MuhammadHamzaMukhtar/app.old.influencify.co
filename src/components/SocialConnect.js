import { Component } from "react";
import { Link } from "react-router-dom";
import SelectPage from "react-select";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import TikTokOauthPopup from "./TikTokOauthPopup";
import GoogleOauthPopup from "./GoogleOauthPopup";
import SocialListIcons from "../constants/SocialListIcons";
import { FcGoogle } from "react-icons/fc";
import { HANDLE_SELECT_PAGE } from "@store/constants/action-types";
import Api from "@services/axios";

class SocialConnect extends Component {
	componentDidMount = () => {};

	onTiktokConnect = async (code) => {
		if (code) {
			const data = {
				code: code,
			};
			const response = Api.TiktokConnect(data);
			//     await axios.post(
			//     helper.url + "/api/v2/tiktok/connect",
			//     data
			// );
			if (response.data.response) {
				this.props.settingPlatformSelectTiktok(response.data.response);
			}
		}
	};

	onGoogleConnect = async (code) => {
		if (code) {
			const data = { code: code };
			const response = Api.GoogleConnect(data);
			//         await axios.post(
			//     helper.url + "/api/v2/connect/youtube",
			//     data
			//   );
			if (response.data.response) {
				this.props.settingPlatformSelectYoutube(response.data.response);
			}
		}
	};

	finshIndluencerRegistration = () => {
		let query = {
			selected_platform: this.props.selected_platform,
			Page: this.props.selectedPage,
			displayName: this.props.displayName,
			email: this.props.email,
			password: this.props.password,
			userName: this.props.userName,
			dateOfBirth: this.props.dateOfBirth,
			gender: this.props.gender,
			phoneNumber: this.props.phoneNumber,
			country: this.props.selectedCountry,
			state: this.props.state,
			city: this.props.city,
			timeZone: this.props.timeZone,
			address: this.props.address,
			categories: this.props.selectedCategories,
			privacyPolicy: this.props.privacyPolicy,
			termOfUse: this.props.termOfUse,
			youtube_connect_res: this.props.youtube_connect_res,
			tiktok_connect_res: this.props.tiktok_connect_res,
			fee_type: this.props.fee_type,
			product_fee: this.props.product_value,
			story_fee: this.props.story_fee,
			post_fee: this.props.post_fee,
		};
		this.props.infleuncerRegisterationFinish(query);
	};

	render() {
		const {
			is_connected_youtube,
			platforms,
			loginSuccess,
			selected_platform,
			platform_name,
		} = this.props;
		const fbPages = this.props.fbPages.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<form>
				{this.props.errorsObj?.PageNotFound ||
				this.props.errorsObj?.followerLimitError ? (
					<div className="alert alert-danger" role="alert">
						<ul className="m-0">
							{this.props.errorsObj?.PageNotFound ? (
								<li className="text-white">
									{this.props.errorsObj.PageNotFound[0]}
								</li>
							) : (
								""
							)}
							{this.props.errorsObj?.followerLimitError ? (
								<li className="text-white">
									{this.props.errorsObj.followerLimitError[0]}
								</li>
							) : (
								""
							)}
						</ul>
					</div>
				) : (
					""
				)}
				{
				(selected_platform === "youtube" && is_connected_youtube) ||
				selected_platform === "tiktok" ? (
					<div>
						
						{selected_platform === "youtube" ? (
							<>
								<h4 className="mt-4 text-[20px]">Youtube is connected.</h4>
							</>
						) : (
							""
						)}
						{selected_platform === "tiktok" ? (
							<>
								<h4 className="mt-4 text-[20px]">Tiktok is connected.</h4>
							</>
						) : (
							""
						)}
					</div>
				) : (
					<div className="flex flex-col rounded-[8px]">
						<div className="border-0 pt-0 py-[8px] px-[16px] flex justify-between">
							<p className="darkGray">Platforms</p>
							<p className="darkGray">Connect</p>
						</div>
						<div className="st6-list">
							{platforms && platforms.length
								? this.props.platforms
										.filter((i) => {
											if (platform_name) {
												return i.name === platform_name;
											}
											return i;
										})
										.map((platform, index) => (
											<div
												className="bg-transparent items-center  py-[8px] px-[16px] flex justify-between"
												key={index}
											>
												<div className="flex items-center">
													<p>{SocialListIcons(platform.name, 25)}</p>
													<p className="ml-2 capitalize">{platform.name}</p>
												</div>
												<Link to="#">
													{platform.name === "tiktok" ? (
														<TikTokOauthPopup
															onCode={this.onTiktokConnect}
															onClose={() => {}}
														>
															<div className="text-[14px] flex items-center">
																{SocialListIcons(platform.name, 16)}
																<h6 className="ml-4 text-[10px] capitalize">
																	{platform.name} connect
																</h6>
															</div>
														</TikTokOauthPopup>
													) : platform.name === "youtube" ? (
														<GoogleOauthPopup
															scope={process.env.REACT_APP_GOOGLE_YOUTUBE_SCOPE}
															redirect_uri={
																process.env
																	.REACT_APP_GOOGLE_YOUTUBE_REDIRECT_URI
															}
															onCode={this.onGoogleConnect}
															onClose={(e) => console.log("")}
														>
															<div className="flex cursor-pointer rounded-[8px] p-1">
																<div className="pr-3 pt-2 sm:flex hidden ">
																	<FcGoogle size={18} />
																</div>
																<div className="flex justify-between grow items-center">
																	<div className="flex flex-col letter-spacing-2px grow">
																		<p className="text-[8px] gray">GOOGLE</p>
																		<h6 className="text-[10px]">
																			Youtube connect
																		</h6>
																	</div>
																</div>
															</div>
														</GoogleOauthPopup>
													):("")}
												</Link>
											</div>
										))
								: ""}
						</div>
					</div>
				)}
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.SettingPlatformReducer.isLoading,
		errorsObj: state.RegisterReducer.errorsObj,
		errorMessages: state.RegisterReducer.errorMessages,
		platforms: state.SettingPlatformReducer.platforms,
		fbPages: state.SettingPlatformReducer.fbPages,
		loginSuccess: state.SettingPlatformReducer.loginSuccess,
		displayName: state.RegisterReducer.displayName,
		email: state.RegisterReducer.email,
		password: state.RegisterReducer.password,
		userName: state.RegisterReducer.userName,
		dateOfBirth: state.RegisterReducer.dateOfBirth,
		gender: state.RegisterReducer.gender,
		phoneNumber: state.RegisterReducer.phoneNumber,
		selectedCountry: state.RegisterReducer.selectedCountry,
		state: state.RegisterReducer.state,
		city: state.RegisterReducer.city,
		timeZone: state.RegisterReducer.timeZone,
		address: state.RegisterReducer.address,
		selectedCategories: state.RegisterReducer.selectedCategories,
		selectedPage: state.SettingPlatformReducer.selectedPage,
		termOfUse: state.RegisterReducer.termOfUse,
		privacyPolicy: state.RegisterReducer.privacyPolicy,
		youtube_connect_res: state.SettingPlatformReducer.youtube_connect_res,
		tiktok_connect_res: state.SettingPlatformReducer.tiktok_connect_res,
		is_connected_youtube: state.SettingPlatformReducer.is_connected_youtube,
		selected_platform: state.SettingPlatformReducer.selected_platform,
		fee_type: state.SettingPlatformReducer.fee_type,
		product_value: state.SettingPlatformReducer.product_value,
		story_fee: state.SettingPlatformReducer.story_fee,
		post_fee: state.SettingPlatformReducer.post_fee,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/YoutubeAuthRedux");
	return {
		disconnectPlatform: (query) =>
			dispatch(settingPlatformActionCreator.disconnectPlatform(query)),
		handleGetPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleGetPlatforms()),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		infleuncerRegisterationFinish: (query) =>
			dispatch(
				settingPlatformActionCreator.infleuncerRegisterationFinish(query)
			),
		settingPlatformSelectTiktok: (data) =>
			dispatch(settingPlatformActionCreator.settingPlatformSelectTiktok(data)),
		settingPlatformSelectYoutube: (data) =>
			dispatch(settingPlatformActionCreator.settingPlatformSelectYoutube(data)),
		connectYoutube: () => {
			actions.connectYoutube(dispatch);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialConnect);
