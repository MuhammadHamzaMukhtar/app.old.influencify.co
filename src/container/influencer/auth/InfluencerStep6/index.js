import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import SelectPage from "react-select";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import * as settingInstagramActions from "@store/actions/SettingInstagramActions";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import TikTokOauthPopup from "@components/TikTokOauthPopup";
import GoogleOauthPopup from "@components/GoogleOauthPopup";
import SocialListIcons from "../../../../constants/SocialListIcons";
import { FcGoogle } from "react-icons/fc";
import { HANDLE_SELECT_PAGE } from "@store/constants/action-types";
import Api from "@services/axios";
import LinkTo from "@components/global/LinkTo";

class InfluencerStep6 extends Component {
	componentDidMount = () => {
		this.props.handleGetPlatforms();
	};

	connectPlatform = (platformName) => {
		if (platformName === "instagram") {
			let query = {
				platform: "instagram",
			};
			this.props.instagramConnect(query);
		}
	};

	// onTiktokConnect = async (code) => {
	// 	if (code) {
	// 		const data = {
	// 			code: code,
	// 		};
	// 		const response = await Api.TiktokConnect(data);


	// 		if (response.data.response) {
	// 			this.props.settingPlatformSelectTiktok(response.data.response);
	// 		}
	// 	}
	// };

	onGoogleConnect = async (code) => {
		if (code) {
			const data = { code: code };
			const response = Api.GoogleConnect(data);
			//   await axios.post(
			//   helper.url + "/api/v2/connect/youtube",
			//   data
			// );
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
		this.props.infleuncerRegisterationFinish(query, this.props.navigate);
	};

	onCodeReceive = async (code) => {
		this.props.instagramOathCode(code);
	};

	render() {
		const { is_connected_youtube, platforms, loginSuccess, selected_platform } =
			this.props;
		const fbPages = (this.props.fbPages || []).map((data) => ({
			label: data.name,
			value: data.id,
			accessToken: data.access_token
		}));
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px] black">Step 5</h4>
					<h1 className="text-[40px] black font-semibold">
						Your Social Network
					</h1>
				</div>
				<div className="containers pb-12 pt-12">
					<div className="flex flex-wrap justify-center mt-6">
						<div className="lg:w-6/12 md:w-8/12 w-full">
							<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
								{this.props.errorsObj && 
									(this.props.errorsObj.displayName ||
									this.props.errorsObj.email ||
									this.props.errorsObj.password ||
									this.props.errorsObj.privacyPolicy ||
									this.props.errorsObj.termOfUse ||
									this.props.errorsObj.country ||
									this.props.errorsObj.state ||
									this.props.errorsObj.city ||
									this.props.errorsObj.categories ||
									this.props.errorsObj.PageNotFound ||
									this.props.errorsObj.followerLimitError ||
									this.props.errorsObj.error_message ||
									this.props.errorsObj.BusinessAccountError) ? (
									<div
										className="bg-[#dc3545] rounded-[8px] px-6 py-3"
										role="alert"
									>
										<ul className="m-0">
											{this.props.errorsObj.displayName ? (
												<li className="text-white">
													{this.props.errorsObj.displayName[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.error_message ? (
												<li className="text-white">
													{this.props.errorsObj.error_message}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.BusinessAccountError ? (
												<li className="text-white">
													{this.props.errorsObj.BusinessAccountError[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.email ? (
												<li className="text-white">
													{this.props.errorsObj.email[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.password ? (
												<li className="text-white">
													{this.props.errorsObj.password[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.privacyPolicy ? (
												<li className="text-white">
													{this.props.errorsObj.privacyPolicy[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.termOfUse ? (
												<li className="text-white">
													{this.props.errorsObj.termOfUse[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.country ? (
												<li className="text-white">
													{this.props.errorsObj.country[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.state ? (
												<li className="text-white">
													{this.props.errorsObj.state[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.city ? (
												<li className="text-white">
													{this.props.errorsObj.city[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.categories ? (
												<li className="text-white">
													{this.props.errorsObj.categories[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.PageNotFound ? (
												<li className="text-white">
													{this.props.errorsObj.PageNotFound[0]}
												</li>
											) : (
												""
											)}
											{this.props.errorsObj.followerLimitError ? (
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
								{(selected_platform === "instagram" && loginSuccess) ||
									(selected_platform === "youtube" && is_connected_youtube) ||
									selected_platform === "tiktok" ? (
									<div>
										{selected_platform === "instagram" ? (
											<>
												<h4 className="mt-4 text-[20px]">
													Select the Facebook Page associated with your
													Instagram Bussiness Account
												</h4>
												<div className="flex flex-wrap">
													<div className="mt-12 md:w-8/12 w-full">
														<SelectPage
															value={this.props.selectedPage}
															options={fbPages}
															isClearable={true}
															isSearchable={true}
															className="h-11"
															placeholder={"Select Page"}
															onChange={this.props.handleSelectPage}
														/>
														{this.props.errorsObj.Page ? (
															<span className="red block mt-0">
																{this.props.errorsObj.Page[0]}
															</span>
														) : (
															""
														)}
													</div>
												</div>
												<div className="mb-[1rem] flex justify-between mt-12 pt-12">
													<LinkTo
														className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														to="/influencer/register/Step4"
														text="Pervious"
													/>
													<Button
														disabled={!this.props.selectedPage}
														onClick={() => this.finshIndluencerRegistration()}
														type="submit"
														className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														text="Finish"
													/>
												</div>
											</>
										) : (
											""
										)}
										{selected_platform === "youtube" ? (
											<>
												<h4 className="mt-4 text-[20px]">
													Youtube is connected, Please click on Finish button to
													complete the registration process
												</h4>
												<div className="mb-[1rem] flex justify-between mt-12 pt-12">
													<LinkTo
														className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														to="/influencer/register/Step4"
														text="Pervious"
													/>
													<Button
														disabled={!this.props.selected_platform}
														onClick={() => this.finshIndluencerRegistration()}
														type="submit"
														className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														text="Finish"
													/>
												</div>
											</>
										) : (
											""
										)}
										{selected_platform === "tiktok" ? (
											<>
												<h4 className="mt-4 text-[20px]">
													Tiktok is connected, Please click on Finish button to
													complete the registration process
												</h4>
												<div className="mb-[1rem] flex justify-between mt-12 pt-12">
													<LinkTo
														className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														to="/influencer/register/Step4"
														text="Pervious"
													/>
													<Button
														disabled={!this.props.selected_platform}
														onClick={() => this.finshIndluencerRegistration()}
														type="submit"
														className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
														text="Finish"
													/>
												</div>
											</>
										) : (
											""
										)}
									</div>
								) : (
									<div className="flex flex-col">
										<div className="flex justify-between py-[0.75rem] px-[1.25rem]">
											<span>Platforms</span>
											<span>Connect</span>
										</div>
										<div className="st6-list rounded-[8px] border-[1px] border-[#00000020]">
											{platforms && platforms.length
												? this.props.platforms.map((platform, index) => (
													<div
														className={`bg-transparent py-[0.75rem] px-[1.25rem] flex justify-between items-center ${platform.name === "youtube"
															? ""
															: "border-b border-[#00000020]"
															}  `}
														key={index}
													>
														<div className="flex items-center">
															<p>{SocialListIcons(platform.name, 25)}</p>
															<p className="ml-2 capitalize">
																{platform.name}
															</p>
														</div>
														<Link to="#">
															{platform.name === "tiktok" ? (
																<TikTokOauthPopup
																	// onCode={this.onTiktokConnect}
																	onClose={() => { }}
																	brandType="influencer"
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
																	scope={
																		process.env.REACT_APP_GOOGLE_YOUTUBE_SCOPE
																	}
																	redirect_uri={
																		process.env
																			.REACT_APP_GOOGLE_YOUTUBE_REDIRECT_URI
																	}
																	onCode={this.onGoogleConnect}
																	onClose={(e) => console.log("")}
																	brandType="influencer"
																>
																	<div className="flex cursor-pointer rounded-[8px] p-1">
																		<div className="pr-3 pt-2 sm:flex hidden ">
																			<FcGoogle size={18} />
																		</div>
																		<div className="flex justify-between grow items-center">
																			<div className="flex flex-col letter-spacing-2px grow">
																				<p className="text-[8px] gray">
																					GOOGLE
																				</p>
																				<h6 className="text-[10px]">
																					Youtube connect
																				</h6>
																			</div>
																		</div>
																	</div>
																</GoogleOauthPopup>
															) : ("")}
														</Link>
													</div>
												))
												: ""}
										</div>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
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
		instagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.instagramConnect(query)),
		instagramOathCode: (code) =>
			dispatch(settingInstagramActions.brandVerifyInstagramCode(code)),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		infleuncerRegisterationFinish: (query, navigate) =>
			dispatch(
				settingPlatformActionCreator.infleuncerRegisterationFinish(query, navigate)
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

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerStep6);
