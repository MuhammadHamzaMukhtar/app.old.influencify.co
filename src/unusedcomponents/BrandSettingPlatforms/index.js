import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandTopTab from "@components/SettingBrandTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import SocialListIcons from "../../constants/SocialListIcons";
import SelectPage from "react-select";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import {
	HANDLE_SELECT_PAGE,
	HANDLE_CHANGE_SUCCESS,
} from "@store/constants/action-types";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import Noty from "noty";

class SettingBrandPlatforms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reach: "",
		};
	}

	componentDidMount = () => {
		this.props.handleFetchPlatforms();
	};

	connectInstagramAccount = (platformName, index) => {
		if (platformName === "Instagram") {
			let query = {
				platform: "Instagram",
			};
			this.props.instagramConnect(query);
		}
	};

	platfromSaveChanges = (platformId, platformName, index) => {
		if (platformName === "Instagram") {
			let query = {
				platform: platformId,
				storyFee: this.props.storyFee,
				postFee: this.props.postFee,
			};
			this.props.saveChangesPlatform(query);
		}
		this.showSuccessMessage("Changes have been saved Successfully");
	};

	platformDisconnect = (platformId, platformName, index) => {
		if (platformName === "Instagram") {
			let query = {
				platform: platformId,
			};
			this.props.disconnectPlatform(query);
		}
	};

	connectInstagramSubmit = () => {
		let query = {
			Page: this.props.selectedPage,
		};
		this.props.submitInstagramConnect(query);
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

	render() {
		const fbPages = this.props.fbPages.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandTopTab />
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						{this.props.loginSuccess === false ? (
							<div className="md:col-span-9 sm:col-span-8 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
									<div className="grid grid-cols-12 gap-5">
										<div className="md:col-span-10 md:col-start-2 col-span-12">
											<div className="flex flex-col">
												<div className="flex justify-between px-[16px] py-[8px]">
													<span>Connected platforms</span>
													<span>Followers</span>
												</div>
												{this.props.platforms
													? this.props.platforms.map((platform, index) => (
															<div key={index}>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<div className="flex items-center">
																		<p className="mr-2">
																			{SocialListIcons(platform.name, 16)}
																		</p>
																		<p>{platform.name}</p>
																	</div>
																	{platform.platformUser ? (
																		<Link
																			to="#"
																			onClick={() =>
																				this.platformDisconnect(
																					platform.id,
																					platform.name,
																					index
																				)
																			}
																		>
																			<u>Disconnect</u>
																		</Link>
																	) : (
																		<Link
																			to="#"
																			onClick={() =>
																				this.connectInstagramAccount(
																					platform.name,
																					index
																				)
																			}
																		>
																			<u>Connect</u>
																		</Link>
																	)}
																</div>
																{platform.platformUser ? (
																	<div className="grid grid-cols-12 gap-5 my-12">
																		<div className="md:col-span-2 col-span-12">
																			<div className="bg-[#ccc] w-[1px] h-full m-auto"></div>
																		</div>
																		<div className="md:col-span-8 col-span-12">
																			<form>
																				<div className="mb-[1rem] flex items-center">
																					<label className="w-25 tex-[14px] font-medium">
																						Story Fee
																					</label>
																					<input
																						value={
																							this.props.storyFee
																								? this.props.storyFee
																								: platform.platformUser.storyFee
																						}
																						type="number"
																						placeholder="Story Fee"
																						className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																						onChange={(e) =>
																							this.props.handleChange(e)
																						}
																						name="storyFee"
																					/>
																				</div>
																			</form>
																			<form>
																				<div className="mb-[1rem] flex items-center">
																					<label className="w-25 tex-[14px] font-medium">
																						Post Fee
																					</label>
																					<input
																						className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																						value={
																							this.props.postFee
																								? this.props.postFee
																								: platform.platformUser.postFee
																						}
																						type="number"
																						placeholder="Post Fee"
																						onChange={(e) =>
																							this.props.handleChange(e)
																						}
																						name="postFee"
																					/>
																				</div>
																			</form>
																			<div className="text-center">
																				<Button
																					className="w-50 mt-6 m-auto"
																					onClick={() =>
																						this.platfromSaveChanges(
																							platform.id,
																							platform.name,
																							index
																						)
																					}
																					text="Save Changes"
																				/>
																			</div>
																		</div>
																	</div>
																) : (
																	""
																)}
															</div>
													  ))
													: ""}
											</div>
											<form className="mt-12">
												<label className="text-[14px] font-medium">
													Select a category
												</label>
												<div>
													<label className="text-[10px] darkGray">Reach</label>
													<Listbox>
														<div className="relative w-full">
															<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
																<span className="block text-[14px] darkGray">
																	{this.state.reach !== ""
																		? this.state.reach
																		: "Reach"}
																</span>
																<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																	<AiFillCaretDown
																		size={12}
																		className="text-black opacity-80"
																		aria-hidden="true"
																	/>
																</span>
															</Listbox.Button>
															<Transition
																as={Fragment}
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
																	<Listbox.Option
																		onClick={() =>
																			this.setState({ reach: "10" })
																		}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			this.state.reach === "10"
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value="10"
																	>
																		<span
																			className={`block ${
																				this.state.reach === "10"
																					? "purple font-semibold"
																					: "text-gray-900 font-medium"
																			}`}
																		>
																			Ten
																		</span>
																	</Listbox.Option>
																	<Listbox.Option
																		onClick={() =>
																			this.setState({ reach: "20" })
																		}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			this.state.reach === "20"
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value="20"
																	>
																		<span
																			className={`block ${
																				this.state.reach === "20"
																					? "purple font-semibold"
																					: "text-gray-900 font-medium"
																			}`}
																		>
																			Twenty
																		</span>
																	</Listbox.Option>
																	<Listbox.Option
																		onClick={() =>
																			this.setState({ reach: "30" })
																		}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			this.state.reach === "30"
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value="30"
																	>
																		<span
																			className={`block ${
																				this.state.reach === "30"
																					? "purple font-semibold"
																					: "text-gray-900 font-medium"
																			}`}
																		>
																			Thirty
																		</span>
																	</Listbox.Option>
																</Listbox.Options>
															</Transition>
														</div>
													</Listbox>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="md:col-span-9 sm:col-span-4 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
									<h4 className="mt-4 text-[20px]">
										Select the Facebook Page associated with your Instagram
										Bussiness Account
									</h4>
									<div className="sm:w-8/12 mt-12">
										<SelectPage
											value={this.props.selectedPage}
											options={fbPages}
											isClearable={true}
											className="h-11"
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
									</div>
									<div className="text-center">
										<Button
											className="w-30 mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
											text="Submit"
											onClick={() => this.connectInstagramSubmit()}
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleFetchPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleFetchPlatforms()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		instagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.instagramConnect(query)),
		submitInstagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.submitInstagramConnect(query)),
		saveChangesPlatform: (query) =>
			dispatch(settingPlatformActionCreator.saveChangesPlatform(query)),
		disconnectPlatform: (query) =>
			dispatch(settingPlatformActionCreator.disconnectPlatform(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingBrandPlatforms);
