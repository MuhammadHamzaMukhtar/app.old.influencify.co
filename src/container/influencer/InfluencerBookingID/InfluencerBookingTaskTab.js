import { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import DOMPurify from "dompurify";
import Loader from "@components/global/Loader";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import Button from "@components/global/Button";
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import SelectPage from "react-select";
import { HANDLE_CANCEL_INSTAGRAM_CONNECT, HANDLE_SELECT_PAGE } from "@store/constants/action-types";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import SocialListIcons from "../../../constants/SocialListIcons";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import GoogleOauthPopup from "@components/GoogleOauthPopup";
import { FcGoogle } from "react-icons/fc";
import TikTokOauthPopup from "@components/TikTokOauthPopup";

class InfluencerBookingTaskTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDropdown: false,
			workDoneModal: false,
			active: null,
		};
	}

	componentDidMount() {
		switch (this.props.platformName) {
			case "tiktok":
				this.props.fetchTiktokListVideo();
				break;
			case "youtube":
				this.props.fetchYoutubeListVideo();
				break;
			case "instagram":
				this.props.fetchInstagramPost();
				break;
			default:
		}
	}

	connectInstagramSubmit = async () => {
		let query = {
			Page: this.props.selectedPage,
		};
		const json = await this.props.submitInstagramConnect(query);
		if (!json.data?.errors) {
			this.props.influencerBookingCampaignContent(this.props.campaignID);
			this.props.fetchInstagramPost();
		}
	};

	handleRequestWorkDone = (taskId) => {
		let query = {
			campaignId: this.props.campaignID,
			taskId: taskId
		};
		this.props.handleWorkDoneRequest(query);
		this.setState({
			workDoneModal: false,
			showDropdown: true,
		});
	};

	handleSelectPost = (taskId, event) => {
		let query = {
			campaignId: this.props.campaignID,
			taskId: taskId,
			// contentId: contentId,
			instagramFeedId: event.target.value,
		};
		this.props.selectedFeedPost(query);
	};

	handleToggle = (index) => {
		if (this.state.active === index) {
			this.setState({ active: null });
		} else {
			this.setState({ active: index });
		}
	};

	handleModalWorkDone = (e) => {
		this.setState({
			workDoneModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			workDoneModal: false,
		});
	};

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	handleSelectYoutube = (taskId, event) => {
		let item = this.props.youtubeData.items.find(
			(i) => i.id === event.target.value
		);
		let id = "";
		let name = "";
		if (item?.snippet?.type === "upload") {
			id = item.contentDetails.upload.videoId;
			name = item.snippet.title;
		} else {
			id = item?.snippet?.channelId;
			name = item?.snippet?.channelTitle;
		}
		let query = {
			campaignId: this.props.campaignID,
			taskId: taskId,
			youtube_post_id: id,
			youtube_content:
				'<iframe width="220" height="200" src="https://www.youtube.com/embed/' +
				id +
				'" title="' +
				name +
				'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>',
		};
		this.props.handleSelectYoutube(query);
	};

	handleSelectTiktok = (taskId, event) => {
		let item = this.props.tiktokData.videos.find(
			(i) => i.id === event.target.value
		);
		let query = {
			campaignId: this.props.campaignID,
			taskId: taskId,
			tiktok_post_id: event.target.value,
			tiktok_content:
				'<iframe with="' +
				item?.width +
				'" height=568 frameBorder="0" src="https://www.tiktok.com/embed/v2/' +
				item?.id +
				'"></iframe>',
		};
		this.props.handleSelectTiktok(query);
		this.setState({ showDropdown: true })
	};

	render() {
		const { campaignInfluencer, isLoadingSubmit, campaignTasks, isReconnectFlag, FlowStatus, platformName, influencerCampaignContent } = this.props;
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[46vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		const fbPages = this.props.fbPages?.map((data) => {
			return {
				label: data.name,
				value: data.id,
				access_token: data.access_token,
			};
		});
		return (
			// <div className="grid grid-cols-12 gap-5 mb-12">
			// 	<div className="lg:col-span-6 col-span-12">
			// 		<h5 className="mb-2 text-[18px]">Brief</h5>
			// 		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
			// 			<div className="flex flex-col">
			// 				<div className="flex justify-between px-[16px] py-[8px]">
			// 					<p>Wording</p>
			// 					<strong>{this.props.postWordingType}</strong>
			// 				</div>
			// 				<div className="flex justify-between px-[16px] py-[8px]">
			// 					<p>Sample Wording</p>
			// 					<div
			// 						dangerouslySetInnerHTML={this.createMarkup(
			// 							this.props.postWording
			// 						)}
			// 					></div>
			// 				</div>
			// 				<div className="flex justify-between px-[16px] py-[8px]">
			// 					<p className="mr-4 sm:mr-12 w-1/5">Instructions</p>
			// 					<div>
			// 						<div
			// 							dangerouslySetInnerHTML={this.createMarkup(
			// 								this.props.campaignInstruction
			// 							)}
			// 						></div>
			// 					</div>
			// 				</div>
			// 				<div className="flex justify-between px-[16px] py-[8px]">
			// 					<p>Links to share</p>
			// 					<strong>{this.props.linkToShare}</strong>
			// 				</div>
			// 				{this.props.campaignPreview ? (
			// 					<div className="flex justify-between px-[16px] py-[8px]">
			// 						<p className="mr-4 sm:mr-12 whitespace-nowrap w-1/5">
			// 							Preview need
			// 						</p>
			// 						<p>
			// 							The brand wants to preview your content first, so you will
			// 							have to create it in advance. Once approved, publish it and
			// 							you'll get paid.
			// 						</p>
			// 					</div>
			// 				) : (
			// 					""
			// 				)}
			// 				<div className="flex justify-between px-[16px] py-[8px]"></div>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
			<>
				{FlowStatus === "requested" && campaignInfluencer?.message && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-1/2 text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">Quote rejected. Resubmit new quote to get started</p>}
				{FlowStatus === "requested" && !campaignInfluencer?.message && <p className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 w-1/2 shadow-[0px_4px_5px_#96969640] text-[14px] font-medium">Submit your quote to start working</p>}
				{FlowStatus === "inprogress" && <p className="p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 w-1/2 text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">Submit your tasks to get paid</p>}
				{FlowStatus === "workdone" && <p className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 w-1/2  text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">Waiting for the approval by Brand</p>}
				{FlowStatus === "closed" && !campaignInfluencer?.is_paid && <p className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-1/2  text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">Waiting for payment</p>}
				{FlowStatus === "closed" && campaignInfluencer?.is_paid == 1 ? <p className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-1/2  text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">Confirm your payment propsal to get paid</p> : ""}
				{FlowStatus === "closed" && campaignInfluencer?.is_paid == 2 ? <p className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-1/2  text-[14px] shadow-[0px_4px_5px_#96969640] font-medium">You campaign has been closed and completed</p> : ""}
				{FlowStatus !== "requested" && FlowStatus !== "rejected" ?
					<div className="grid grid-cols-12 mb-12">
						<div className="col-span-12 text-[18px]">
							<h5 className="mb-2">Tasks & Delivery</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:p-4">
								{FlowStatus !== "closed" &&
									<div className="flex justify-between mx-8">
										{fbPages?.length === 0 && isReconnectFlag ?
											<span className="text-red-500 text-[14px]">Please connect with {platformName} to continue and submit your tasks.</span> : ""
										}
										{platformName === "instagram" && isReconnectFlag ?
											<>
												{
													fbPages && fbPages.length > 0 ?
														<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
															{/* <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12"> */}
															<h4 className="mt-4 text-[20px]">
																Select the Facebook Page that is associated with your
																Instagram Bussiness Account
															</h4>
															<div className="grid grid-cols-12 gap-5">
																<div className="mt-4 md:col-span-12 sm:col-span-8 col-span-12">
																	<SelectPage
																		value={this.props.selectedPage}
																		options={fbPages}
																		isClearable={true}
																		isSearchable={true}
																		placeholder={"Select Page"}
																		onChange={this.props.handleSelectPage}
																	/>
																	{this.props.platformErrorsObj.Page ? (
																		<span className="red">
																			{this.props.platformErrorsObj.Page[0]}
																		</span>
																	) : (
																		""
																	)}
																	{this.props.platformErrorsObj.BusinessAccountError ? (
																		<span className="red">
																			{this.props.platformErrorsObj.BusinessAccountError[0]}
																		</span>
																	) : (
																		""
																	)}
																</div>
															</div>
															<div className="flex justify-end gap-4 text-center">
																<Button
																	className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																	onClick={this.props.cancelConnect}
																	text="Cancel"
																/>
																<Button
																	className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																	onClick={() => this.connectInstagramSubmit()}
																	disabled={this.props.instaLoading}
																	text={
																		this.props.instaLoading ? (
																			<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																		) : (
																			"Submit"
																		)
																	}
																/>
															</div>
															{/* </div> */}
														</div>
														:
														<>
													
														</>
												}
											</>
											: ""
										}
										{platformName ===
											"youtube" && isReconnectFlag ? (
											<form>
												<div
													className="mb-[1rem]"
													controlId="exampleForm.ControlSelect1"
												>
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
														brandType={this.props.campaignID}
													>
														<div className="px-12 cursor-pointer rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
															<div className="pr-3 sm:flex hidden ">
																<FcGoogle size={18} />
															</div>
															<div className="flex justify-between grow items-center">
																{this.props.platformErrorsObj.Page ? (
																	<span className="font-bold red">
																		{this.props.platformErrorsObj.Page[0]}
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
												</div>
											</form>
										) : ""
										}
										{platformName === "tiktok" && isReconnectFlag ?
											<TikTokOauthPopup
												onCode={this.onTiktokConnect}
												brandType={this.props.campaignID}
												//onClose={(e)=>this.onTiktokConnect("vgSm_WTFj3qP-Jxw1W-6Xs8PffmiC92d8U2uMHul9PHHFPKa2obslszZkqLOHnfiPK8rzJtZmZO9zasj_PNqtzeRsF-p9B7rCMAPjyIrw1A*1")}
												onClose={(e) => console.log("")}
											>
												<div className="px-12 cursor-pointer rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
													{SocialListIcons(
														"tiktok",
														16
													)}
													<h6 className="ml-4 text-[10px] capitalize">
														Tiktok connect
													</h6>
												</div>
											</TikTokOauthPopup> :
											""
										}
									</div>
								}

								{campaignTasks && campaignTasks.length > 0 ? (
									campaignTasks.map((task, index) => {
										return (
											<div key={index} className="flex gap-3 my-3">
												<div className="mt-4">
													{
														task.content?.is_submited_preview && task.content?.is_preview_approved ?
															<BsCheckCircleFill color={`#43e0b7`} /> :
															(
																task.content?.is_submited_preview ?
																	<BsCheckCircleFill color={`#ff9f00`} /> :
																	<BsCheckCircle />
															)
													}
												</div>
												<div className="grid grid-cols-12 gap-3 w-full">
													<div className="lg:col-span-8 col-span-12 border-[1px] border-[#00000020] bg-[#49749a08] flex flex-col relative rounded-[8px] p-2 px-5">
														<div className="flex justify-between items-center md:divide-y-0 divide-y divide-[#0000001f]"
														// onClick={() => this.handleToggle(index)}
														>
															<h6 className="text-[20px] font-medium break-all">
																{task.title}
															</h6>
															{!task.is_mandatory &&
																<div className="flex justify-between gap-7">
																	<p className="text-green-900 text-[15px] font-semibold">(Optional)</p>
																</div>
															}
														</div>
														{/* {active === index && */}
														<div className="relative top-0 overflow-hidden">
															<div className="transition-[height] overflow-auto ease-in-out duration-[0.35s]">
																<div className="min-w-[550px] overflow-x-auto">
																	{task.description &&
																		<div className="my-4 space-y-10">
																			<p className="rounded-[8px] inline-flex w-full items-center px-3 bg-gray-100 text-slate-600 break-all">{task.description}</p>
																		</div>
																	}
																	{!isReconnectFlag && !task.content?.is_submited_preview && FlowStatus !== "closed" &&
																		<>
																			{/* <span className="text-red-500 text-[14px] flex justify-end px-[20px] cursor-pointer" onClick={() => this.setState({ showDropdown: task.id })}>Deleiver</span> */}
																			<div className="mt-12 max-w-5xl">
																				{platformName === "instagram" &&
																					<div>
																						<div
																							className="mb-[1rem]"
																							controlId="exampleForm.ControlSelect1"
																						>
																							<label className="text-[14px] font-medium">
																								My latest Instagram posts
																							</label>
																							<div className="input-group gap-3 flex mb-4">
																								<select
																									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																									onChange={(event) =>
																										this.handleSelectPost(
																											task.id,
																											event
																										)
																									}
																								>
																									<option value={""}>
																										Select post
																									</option>
																									{this.props
																										.influencerInstagramPosts &&
																										this.props.influencerInstagramPosts.map(
																											(feed, index) => (
																												<option
																													selected={
																														this.props.instagramIsFetching.id == task.id ? false : (task.content?.instagram_feed_id === feed.id
																															? true
																															: false)
																													}
																													key={index}
																													value={feed.id}
																												>
																													{feed.caption}
																												</option>
																											)
																										)}
																								</select>
																								{
																									this.props.instagramIsFetching.id == task.id ?
																										<div className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80">
																											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																										</div> :
																										<Button
																											className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																											onClick={() =>
																												this.props.fetchInstagramPost(task.id)
																											}
																											text={<FaSyncAlt />}
																										/>
																								}
																								<Button
																									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 ml-4"
																									onClick={() => this.handleRequestWorkDone(task.id)}
																									disabled={!task.content?.instagram_feed_id || isLoadingSubmit?.id == task.id}
																									text={
																										isLoadingSubmit && isLoadingSubmit.id == task.id ? (
																											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																										) : (
																											"Submit"
																										)
																									}
																								/>
																							</div>
																						</div>
																					</div>
																				}
																				{platformName === "youtube" && (
																					<>
																						<label className="text-[14px] font-medium">
																							My latest Youtube posts
																						</label>
																						<div className="input-group mb-4 flex gap-3">
																							<select
																								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																								onChange={(event) =>
																									this.handleSelectYoutube(
																										task.id,
																										event
																									)
																								}
																							>
																								<option value={""}>
																									Select post
																								</option>
																								{this.props
																									.youtubeData &&
																									this.props.youtubeData
																										.items &&
																									this.props.youtubeData.items
																										.filter(
																											(i) =>
																												i.snippet
																													.type ===
																												"upload"
																										)
																										.map(
																											(feed, index) => (
																												<option
																													selected={this.props.youtubeIsFetching.id == task.id ? false : (task.content?.youtube_post_id === feed.contentDetails?.upload?.videoId
																														? true
																														: false)}
																													key={index}
																													value={
																														feed.id
																													}
																												>
																													{feed.snippet
																														.title
																														? feed
																															.snippet
																															.title
																														: feed
																															.snippet
																															.channelTitle}
																												</option>
																											)
																										)}
																							</select>
																							{this.props.youtubeIsFetching.id == task.id ? (
																								<div className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80">
																									<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																								</div>
																							) : (
																								<Button
																									className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																									onClick={() =>
																										this.props.fetchYoutubeListVideo(task.id)
																									}
																									text={<FaSyncAlt />}
																								/>
																							)}
																							<Button
																								className="px-12 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 ml-4"
																								onClick={() => this.handleRequestWorkDone(task.id)}
																								disabled={!task.content?.youtube_post_id || isLoadingSubmit.id == task.id}
																								text={
																									isLoadingSubmit && isLoadingSubmit.id == task.id ? (
																										<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																									) : (
																										"Submit"
																									)
																								}
																							/>
																						</div>
																					</>
																				)}
																				{platformName === "tiktok" && (
																					<div>
																						<div
																							className="mb-[1rem]"
																							controlId="exampleForm.ControlSelect1"
																						>
																							<label className="text-[14px] font-medium">
																								My latest Tiktok posts
																							</label>
																							<div className="input-group mb-4 flex gap-3 ">
																								<select
																									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																									onChange={(event) =>
																										this.handleSelectTiktok(
																											task.id,
																											event
																										)
																									}
																								>
																									<option value={""}>
																										Select post
																									</option>
																									{this.props
																										.tiktokData &&
																										this.props.tiktokData
																											.videos &&
																										this.props.tiktokData.videos.map(
																											(feed, index) => (
																												<option
																													selected={
																														this.props.tiktokIsFetching.id == task.id ? false : (task.content?.tiktok_post_id === feed.id
																															? true
																															: false)
																													}
																													key={index}
																													value={feed.id}
																												>
																													{feed.title
																														? feed.title
																														: `Untitled - ${index + 1
																														}`}
																												</option>
																											)
																										)}
																								</select>
																								{this.props.tiktokIsFetching.id == task.id ? (
																									<div className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80">
																										<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																									</div>
																								) : (
																									<Button
																										className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																										onClick={() =>
																											this.props.fetchTiktokListVideo(task.id)
																										}
																										text={<FaSyncAlt />}
																									/>
																								)}
																								<Button
																									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 ml-4"
																									disabled={!task.content?.tiktok_post_id || isLoadingSubmit.id == task.id}
																									onClick={() => this.handleRequestWorkDone(task.id)}
																									text={
																										isLoadingSubmit && isLoadingSubmit.id == task.id ? (
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
																			{/* {showDropdown === task.id &&
																			} */}
																		</>
																	}
																</div>
															</div>
														</div>
														<div>
														</div>
														{/* } */}
													</div>

													{/* isLoadingPreview ? <Loader
														className="h-[46vh] w-full flex justify-center items-center"
														size="47"
													/> :  */}
													{
														influencerCampaignContent && influencerCampaignContent.length > 0 &&
														<div className="lg:col-span-4 col-span-12 ">
															{/* <h5 className="mb-2 text-[18px]">Preview</h5> */}
															{influencerCampaignContent.map((content) => (
																content.taskId === task.id &&
																<>
																	{this.props.platformName === "tiktok" &&
																		content.tiktok_post_id && (
																			<div
																				width="100%"
																				height="80%"
																				dangerouslySetInnerHTML={{
																					__html: content.tiktok_content,
																				}}
																			></div>
																		)}
																	{this.props.platformName === "youtube" &&
																		content.youtube_post_id && (
																			<div
																				width="100%"
																				height="100%"
																				dangerouslySetInnerHTML={{
																					__html: content.youtube_content,
																				}}
																			></div>
																		)}
																	<div>
																		{content.instagramFeed && (
																			<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-[#E9EAEC] rounded-[8px] p-3" >
																				{content.instagramFeed.media_type ===
																					"VIDEO" ? (
																					<video
																						controls
																						autoPlay
																						width="100%"
																						height="100%"
																						src={
																							content.instagramFeed.media_url
																						}
																					></video>
																				) : (
																					""
																				)}
																				{content.instagramFeed.media_type ===
																					"IMAGE" ||
																					content.instagramFeed.media_type ===
																					"photo" ||
																					content.instagramFeed.media_type ===
																					"CAROUSEL_ALBUM" ? (
																					<a
																						href={
																							content.instagramFeed.permalink
																						}
																						target="_blank"
																						rel="noopener noreferrer"
																					>
																						<img
																							htmlFor="photo-upload"
																							alt="Preview upload"
																							className="w-[350px] h-[350px]"
																							src={
																								content.instagramFeed.media_url
																							}
																						/>
																						<p className="p-3">
																							{content.instagramFeed.caption}
																						</p>
																					</a>
																				) : (
																					""
																				)}
																				{!content.instagramFeed.media_type ? (
																					<a
																						href={
																							content.instagramFeed.permalink
																						}
																						target="_blank"
																						rel="noopener noreferrer"
																					>
																						<img
																							htmlFor="photo-upload"
																							alt="Preview upload"
																							className="w-[350px] h-[350px]"
																							src={
																								content.instagramFeed.media_url
																							}
																						/>
																						<p className="p-3">
																							{content.instagramFeed.caption}
																						</p>
																					</a>
																				) : (
																					""
																				)}
																			</div>
																		)}
																	</div>
																</>
															))}
														</div>
													}
												</div>
											</div>
										)
									})
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
					</div> :
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				}
				<Transition appear show={this.state.workDoneModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2>Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="mt-6">
											This will conclude your work on this campaign
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.handleRequestWorkDone}
												text="Finsh"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoadingPreview: state.InfluencersBookingIDReducer.isLoadingPreview,
		isLoadingSubmit: state.InfluencersBookingIDReducer.isLoadingSubmit,
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		campaignTitle: state.InfluencersBookingIDReducer.campaignTitle,
		campaignPayout: state.InfluencersBookingIDReducer.campaignPayout,
		products: state.InfluencersBookingIDReducer.products,
		fixedFee: state.InfluencersBookingIDReducer.fixedFee,
		FlowStatus: state.InfluencersBookingIDReducer.FlowStatus,
		contentPostType: state.InfluencersBookingIDReducer.contentPostType,
		campaignInfluencer: state.InfluencersBookingIDReducer.campaignInfluencer,
		quotePaymentIsProcessing:
			state.InfluencersBookingIDReducer.quotePaymentIsProcessing,
		postWordingType: state.InfluencersBookingIDReducer.postWordingType,
		postWording: state.InfluencersBookingIDReducer.postWording,
		campaignInstruction: state.InfluencersBookingIDReducer.campaignInstruction,
		linkToShare: state.InfluencersBookingIDReducer.linkToShare,
		campaignPreview: state.InfluencersBookingIDReducer.campaignPreview,
		platformName: state.InfluencersBookingIDReducer.platformName,
		is_appsumo: state.InfluencersBookingIDReducer.is_appsumo,
		payment_processing: state.InfluencersBookingIDReducer.payment_processing,
		influencerProduct: state.InfluencersBookingIDReducer.influencerProduct,
		selectedProducts: state.InfluencersBookingIDReducer.selectedProducts,
		isReconnectFlag: state.InfluencersBookingIDReducer.isReconnectFlag,
		campaignTasks: state.InfluencersBookingIDReducer.campaignTasks,
		influencerInstagramPosts:
			state.InfluencersBookingIDReducer.influencerInstagramPosts,
		influencerCampaignContent: state.InfluencersBookingIDReducer.influencerCampaignContent,
		fbPages: state.SettingPlatformReducer.fbPages,
		selectedPage: state.SettingPlatformReducer.selectedPage,
		platformErrorsObj: state.SettingPlatformReducer.errorsObj,
		instagramIsFetching: state.InfluencersBookingIDReducer.instagramIsFetching,
		campaignId: state.InfluencersBookingIDReducer.campaignId,
		isAllUploadedContent: state.InfluencersBookingIDReducer.isAllUploadedContent,
		youtubeData: state.InfluencersBookingIDReducer.youtubeData,
		youtubeIsFetching: state.InfluencersBookingIDReducer.youtubeIsFetching,
		tiktokData: state.InfluencersBookingIDReducer.tiktokData,
		tiktokIsFetching: state.InfluencersBookingIDReducer.tiktokIsFetching,
		instaLoading: state.SettingPlatformReducer.isLoading,

	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fastPaymentSwitch: (query) =>
			dispatch(influencersBookingIDActions.fastPaymentSwitch(query)),
		submitRequestQuotePayment: (data) =>
			dispatch(influencersBookingIDActions.submitRequestQuotePayment(data)),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		submitInstagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.submitInstagramInfluencerConnect(query)),
		fetchInstagramPost: (id = null) =>
			dispatch(influencersBookingIDActions.influencerInstagramPosts(id)),
		influencerBookingCampaignContent: (id) =>
			dispatch(
				influencersBookingIDActions.influencerBookingCampaignContent(id)
			),
		selectedFeedPost: (query) =>
			dispatch(influencersBookingIDActions.selectedFeedPost(query)),
		handleWorkDoneRequest: (query) =>
			dispatch(influencersBookingIDActions.handleWorkDoneRequest(query)),
		handleSelectYoutube: (query) =>
			dispatch(influencersBookingIDActions.handleSelectYoutube(query)),
		fetchYoutubeListVideo: (id = null) =>
			dispatch(influencersBookingIDActions.fetchYoutubeListVideo(id)),
		handleSelectTiktok: (query) =>
			dispatch(influencersBookingIDActions.handleSelectTiktok(query)),
		fetchTiktokListVideo: (id = null) =>
			dispatch(influencersBookingIDActions.fetchTiktokListVideo(id)),
		cancelConnect: () =>
			dispatch({ type: HANDLE_CANCEL_INSTAGRAM_CONNECT })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingTaskTab);
