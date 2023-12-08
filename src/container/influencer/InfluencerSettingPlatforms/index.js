import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import SettingInfluencerSidebar from "@components/SettingInfluencerSidebar";
import SelectPage from "react-select";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import SelectCategory from "react-select";
import {
	HANDLE_SELECT_PAGE,
	HANDLE_CHANGE_SUCCESS,
	HANDLE_PLATFORM_CATEGORY_SUCCESS,
	HANDLE_CANCEL_INSTAGRAM_CONNECT,
} from "@store/constants/action-types";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import helper from "../../../constants/helper";
import SocialListIcons from "../../../constants/SocialListIcons";
import TikTokOauthPopup from "@components/TikTokOauthPopup";
import * as headerActions from "@store/actions/HeaderActions";
import Google_Signin_Button from "@assets/btn_google_signin.png";
import Noty from "noty";
import GoogleOauthPopup from "@components/GoogleOauthPopup";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

class InfluencerSettingPlatforms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platform: "",
			platformSaveSetting: {},
		};
		this.tiktokOathRef = React.createRef();
	}

	componentDidMount = () => {
		this.props.handleFetchInfluencerPlatforms();
		// this.props.userSelectedCategories();
		// this.props.fetchUserCategories();
		this.connectedPlatformUsers();
	};

	connectedPlatformUsers = async () => {
		// const json = await Influencify.connectedPlatformUsers();
	};

	componentDidUpdate(prevProps) {
		if ((prevProps.platforms || []).length !== (this.props.platforms || []).length) {
			this.setPlatformSaveSeeting();
		}
	}

	setPlatformSaveSeeting = () => {
		let platformSaveSetting = {};
		this.props.platforms.map((item) => {
			if (item.platformUser && item.platformUser.storyFee) {
				platformSaveSetting[item.id] = {
					...platformSaveSetting[item.id],
					storyFee: parseInt(item.platformUser.storyFee) || "",
				};
			}
			if (item.platformUser && item.platformUser.postFee) {
				platformSaveSetting[item.id] = {
					...platformSaveSetting[item.id],
					postFee: parseInt(item.platformUser.postFee) || "",
				};
			}
			if (item.platformUser && item.platformUser.productFee) {
				platformSaveSetting[item.id] = {
					...platformSaveSetting[item.id],
					productFee: parseInt(item.platformUser.productFee) || "",
				};
			}
		});
		this.setState({ platformSaveSetting });
	};

	connectPlatform = (platformName) => {
		this.setState({ platform: platformName });
		if (platformName === "instagram") {
			let query = {
				platform: "instagram",
			};
			this.props.instagramConnect(query);
			this.props.currentLoggedInUser();
		}
	};

	onTiktokConnect = async (code) => {
		if (code) {
			// const data = { code: code };
			// const response = Api.TiktokConnect(data);
			//   await axios.post(
			//   helper.url + "/api/v2/tiktok/connect",
			//   data
			// );
			this.props.handleFetchPlatforms();
			this.props.currentLoggedInUser();
		}
	};

	onGoogleConnect = async (code) => {
		if (code) {
			// const data = { code: code };
			// const response = Api.GoogleConnect(data);
			//await axios.post(helper.url + '/api/v2/connect/youtube', data);
			this.props.handleFetchPlatforms();
			this.props.currentLoggedInUser();
		}
	};

	changePlatformInput = (platform_id, filed, value) => {
		let { platformSaveSetting } = this.state;
		platformSaveSetting[platform_id] = {
			...platformSaveSetting[platform_id],
			[filed]: parseInt(value) || "",
		};
		this.setState({ platformSaveSetting });
	};

	platfromSaveChanges = (platformId) => {
		let { platformSaveSetting } = this.state;
		if (platformSaveSetting[platformId]) {
			let query = {
				platform: platformId,
				storyFee: platformSaveSetting[platformId].storyFee,
				postFee: platformSaveSetting[platformId].postFee,
				productFee: platformSaveSetting[platformId].productFee,
			};
			if (localStorage.getItem("role") === "influencer") {
				this.props.saveChangesInfluencerPlatform(query);
			} else {
				this.props.saveChangesPlatform(query);
			}
		}
	};

	platformDisconnect = (platformId) => {
		let query = {
			platform: platformId,
		};
		if (localStorage.getItem("role") === "influencer") {
			this.props.disconnectInfluencerPlatform(query);
		} else {
			this.props.disconnectPlatform(query);
		}
	};

	connectInstagramSubmit = () => {
		let query = {
			Page: this.props.selectedPage,
		};
		this.props.submitInstagramConnect(query);
	};

	categoriesSaveChanges = () => {
		let query = {
			categories: this.props.selectedCategories,
		};
		this.props.saveChangesCategories(query);
	};

	showSuccessMessage = (msg) => {
		new Noty({
			type: "success",
			theme: "sunset",
			text: msg,
			layout: "topRight",
			timeout: 2000,
		}).show();
	};

	onCodeReceive = async (code) => {
		this.props.instagramOathCode(code);
	};

	redirectToYoutube = () => {
		window.location.href = helper.url + "/oauth/youtube";
	};

	render() {
		const { platformSaveSetting } = this.state;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		// if (this.props.isLoading) {
		// 	return (
		// 		<Loader
		// 			className="h-full w-full flex justify-center items-center"
		// 			size="67"
		// 		/>
		// 	);
		// }
		const fbPages = this.props.fbPages.map((data) => {
			return {
				label: data.name,
				value: data.id,
				access_token: data.access_token,
			};
		});
		const categories = this.props.userCategories.map((data, index) => {
			return {
				label: data.name,
				value: data.id,
			};
		});
		let newOptions = categories;
		if (
			this.props.selectedCategories !== null &&
			this.props.selectedCategories.length === 3
		) {
			newOptions = [];
		}
		return (
			<div>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingInfluencerSidebar />
						</div>
						{this.props.loginSuccess === false ? (
							<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
									<div className="grid grid-cols-12 gap-5">
										<div className="md:col-span-10 md:col-start-2 col-span-12">
											<div className="p-[0.75rem_1.25rem] flex justify-between">
												<span>Platforms</span>
												<span>Connect</span>
											</div>
											<div>
												{this.props.errors && this.props.errors.PageNotFound ? (
													<div className="bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4">
														<p className="text-white">{this.props.errors.PageNotFound}</p>
													</div>
												) : (
													""
												)}
												{this.props.platforms
													? this.props.platforms.map((platform, index) => {
														return (
															<div
																className="items-center p-[0_1.25rem] h-[40px] flex justify-between border-[1px] border-[#00000020] first:rounded-t-[8px] last:rounded-b-[8px] first:border-b-0 last:border-t-0"
																key={index}
															>
																<div className="flex items-center">
																	<p className="mr-2">
																		{SocialListIcons(platform.name, 16)}
																	</p>
																	<p className="capitalize">
																		{platform.name}
																	</p>
																</div>
																{(platform?.platformUser || []).length > 0 ? (
																	<Link
																		to="#"
																		onClick={() =>
																			this.platformDisconnect(platform.id)
																		}
																	>
																		<u>Disconnect</u>
																	</Link>
																) : (
																	<Link to="#">
																		{platform.name === "tiktok" ? (
																			<TikTokOauthPopup
																				onCode={this.onTiktokConnect}
																				brandType="influencer_profile"
																				//onClose={(e)=>this.onTiktokConnect("vgSm_WTFj3qP-Jxw1W-6Xs8PffmiC92d8U2uMHul9PHHFPKa2obslszZkqLOHnfiPK8rzJtZmZO9zasj_PNqtzeRsF-p9B7rCMAPjyIrw1A*1")}
																				onClose={(e) => console.log("")}
																			>
																				<div className="text-[14px] flex items-center">
																					{SocialListIcons(
																						platform.name,
																						16
																					)}
																					<h6 className="ml-4 text-[10px] capitalize">
																						{platform.name} connect
																					</h6>
																				</div>
																			</TikTokOauthPopup>
																		) : platform.name === "youtube" ? (
																			/* <div
																				className="flex cursor-pointer float-right"
																				onClick={this.redirectToYoutube}
																			>
																				<div>
																					<img
																						src={Google_Signin_Button}
																						className="float-right w-[40%]"
																						alt="Google Signin Button"
																					/>
																				</div>
																			</div> */
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
																				brandType="influencer_profile"
																			>
																				<div className="flex cursor-pointer rounded-[8px] p-1">
																					<div className="pr-3 pt-2 sm:flex hidden ">
																						<FcGoogle size={18} />
																					</div>
																					<div className="flex justify-between grow items-center">
																						{this.props.errorsObj?.Page ? (
																							<span className="font-bold red">
																								{this.props.errorsObj.Page[0]}
																							</span>
																						) : (
																							""
																						)}
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
																		):("")}
																	</Link>
																)}
															</div>
														);
													})
													: ""}
											</div>
										</div>
									</div>
								</div>
								{/* <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mt-6">
									<div className="grid grid-cols-12 gap-5">
										<div className="md:col-span-10 md:col-start-2 col-span-12">
											<div className="mb-[1rem]">
												<label className="text-[14px] font-medium">
													Select Category
												</label>
												<SelectCategory
													value={this.props.selectedCategories}
													closeMenuOnSelect={false}
													options={newOptions}
													isSearchable={true}
													isMulti={true}
													placeholder={"Select Category"}
													onChange={(e) => this.props.handleSelectChange(e)}
												/>
											</div>
											<div className="text-center">
												<Button
													className="mt-6 m-auto px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													onClick={(e) => this.categoriesSaveChanges(e)}
													text={
														this.props.isLoading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite]" />
														) : (
															"Save Changes"
														)
													}

												/>
											</div>
										</div>
									</div>
								</div> */}
							</div>
						) : (
							<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
									<h4 className="mt-4 text-[20px]">
										Select the Facebook Page that is associated with your
										Instagram Bussiness Account
									</h4>
									<div className="grid grid-cols-12 gap-5">
										<div className="mt-12 md:col-span-12 sm:col-span-8 col-span-12">
											<SelectPage
												value={this.props.selectedPage}
												options={fbPages}
												isClearable={true}
												isSearchable={true}
												placeholder={"Select Page"}
												onChange={this.props.handleSelectPage}
											/>
											{this.props.errorsObj?.Page ? (
												<span className="red">
													{this.props.errorsObj.Page[0]}
												</span>
											) : (
												""
											)}
											{this.props.errorsObj?.BusinessAccountError ? (
												<span className="red">
													{this.props.errorsObj.BusinessAccountError[0]}
												</span>
											) : (
												""
											)}
										</div>
									</div>
									<div className="space-x-3 text-center">
										<Button
											className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											onClick={this.props.cancelConnect}
											text="Cancel"
										/>
										<Button
											className="mt-6 m-auto px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											onClick={() => this.connectInstagramSubmit()}
											disabled={!this.props.selectedPage}
											text={
												this.props.isLoading ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite]" />
												) : (
													"Submit"
												)
											}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		storyFee: state.SettingPlatformReducer.storyFee,
		postFee: state.SettingPlatformReducer.postFee,
		platforms: state.SettingPlatformReducer.platforms,
		errorsObj: state.SettingPlatformReducer.errorsObj,
		isLoading: state.SettingPlatformReducer.isLoading,
		loginSuccess: state.SettingPlatformReducer.loginSuccess,
		fbPages: state.SettingPlatformReducer.fbPages,
		selectedPage: state.SettingPlatformReducer.selectedPage,
		platformConnectSuccess: state.SettingPlatformReducer.platformConnectSuccess,
		platformDisconnectSuccess:
			state.SettingPlatformReducer.platformDisconnectSuccess,
		userCategories: state.SettingPlatformReducer.userCategories,
		selectedCategories: state.SettingPlatformReducer.selectedCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/YoutubeAuthRedux");
	return {
		handleFetchInfluencerPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleFetchInfluencerPlatforms()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		instagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.instagramConnect(query)),
		instagramOathCode: (code) =>
			dispatch(settingPlatformActionCreator.instagramOathCode(code)),
		submitInstagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.submitInstagramInfluencerConnect(query)),
		saveChangesPlatform: (query) =>
			dispatch(settingPlatformActionCreator.saveChangesPlatform(query)),
		saveChangesInfluencerPlatform: (query) =>
			dispatch(settingPlatformActionCreator.saveChangesInfluencerPlatform(query)),
		disconnectPlatform: (query) =>
			dispatch(settingPlatformActionCreator.disconnectPlatform(query)),
		disconnectInfluencerPlatform: (query) =>
			dispatch(settingPlatformActionCreator.disconnectInfluencerPlatform(query)),
		fetchUserCategories: () =>
			dispatch(settingPlatformActionCreator.fetchUserCategories()),
		userSelectedCategories: () =>
			dispatch(settingPlatformActionCreator.userSelectedCategories()),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_PLATFORM_CATEGORY_SUCCESS, payload: event }),
		saveChangesCategories: (query) =>
			dispatch(settingPlatformActionCreator.saveChangesCategories(query)),
		connectYoutube: () => {
			actions.connectYoutube(dispatch);
		},
		currentLoggedInUser: () => dispatch(headerActions.currentLoggedInUser()),
		cancelConnect: () =>
			dispatch({ type: HANDLE_CANCEL_INSTAGRAM_CONNECT })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerSettingPlatforms);
