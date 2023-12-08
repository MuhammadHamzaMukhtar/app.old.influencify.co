import { Component } from "react";
import { Tab } from "@headlessui/react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import avatar from "@assets/avatar.png";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import { FaSpinner, FaSyncAlt } from "react-icons/fa";
import Google_Signin_Button from "@assets/btn_google_signin.png";
import LinkTo from "@components/global/LinkTo";
import Loader from "@components/global/Loader";
import Noty from "noty";
import SocialListIcons from "../../../constants/SocialListIcons";
import SelectPage from "react-select";
import { HANDLE_SELECT_PAGE } from "@store/constants/action-types";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencerBookingContentPreviewTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: "",
			storyPreviewUrl: "",
			videoPreviewUrl: "",
			insightPreviewUrl: "",
		};
	}

	fileChangedStoryHandler = (event, id) => {
		const file = event.target.files[0];
		const fileSize = event.target.files[0].size;
		const size = Math.round((fileSize / 1024));
		if (size >= 1024) {
			new Noty({
				type: "error",
				text: 'File too Big, please select a file less than 1MB',
				layout: 'topRight',
				timeout: 2000,
			}).show();
		} else {
			const formData = new FormData();
			formData.append("campaignId", this.props.campaignID);
			formData.append("contentId", id);
			formData.append("file", file);
			this.props.handleUploadContentStory(formData, this.props.campaignID);
		}
	};

	fileChangedInsightHandler = (event, id) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignID);
		formData.append("contentId", id);
		formData.append("insight", file);
		this.props.handleUploadContentStoryInsight(formData, this.props.campaignID);
	};

	fileChangedVideoHandler = (event, id) => {
		const video = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignID);
		formData.append("contentId", id);
		formData.append("video", video);
		this.props.handleUploadContentVideo(formData, this.props.campaignID);
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

	connectInstagramSubmit = () => {
		let query = {
			Page: this.props.selectedPage,
		};
		this.props.submitInstagramConnect(query);
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
				item.width +
				'" height="' +
				item.height +
				'" frameBorder="0" src="https://www.tiktok.com/embed/v2/' +
				item.id +
				'"></iframe>',
		};
		this.props.handleSelectTiktok(query);
	};

	handleSelectYoutube = (taskId, event) => {
		let item = this.props.youtubeData.items.find(
			(i) => i.id === event.target.value
		);
		let id = "";
		let name = "";
		if (item.snippet.type === "upload") {
			id = item.contentDetails.upload.videoId;
			name = item.snippet.title;
		} else {
			id = item.snippet.channelId;
			name = item.snippet.channelTitle;
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

	redirectToYoutube = () => {
		window.location.href = process.env.REACT_APP_BASE_URL + "/oauth/youtube";
	};

	render() {
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
		const { currentLoggedUser, campaignType, campaignTasks, influencerCampaignContent, isAllUploadedContent } = this.props;
		return (
			<>
				{/* {campaignType === "contentCampaign" ? (
					<>
						<div>
							{this.props.influencerCampaignContent.length &&
								this.props.previewApprovedFlag === 0
								? this.props.influencerCampaignContent.map((content, index) => (
									<div key={index}>
										{content.contentType === "Story" ? (
											<div>
												{content.isSubmitedPreview ? (
													<div className="grid grid-cols-12 gap-5">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		className="h-[350px] w-[350px]"
																		alt="Preview upload"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
													</div>
												) : (
													<div className="grid grid-cols-12 gap-5 mb-12">
														<div className="md:col-span-8 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">
																Story - Upload preview content
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-9 sm:col-span-8 col-span-12">
																		<p>
																			Create kick-ass content (photo/video)
																			based on the brief, upload it and click
																			on 'Submit'. Once approved, publish on
																			your social channel and you’ll get paid.
																		</p>
																	</div>
																	<div className="md:col-span-3 sm:col-span-4 col-span-12">
																		{content.contentStoryPath ||
																			this.state.storyPreviewUrl ? (
																			<Button
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Replace Preview"
																			/>
																		) : (
																			<Button
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Upload Preview"
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		)}
																		{this.props.errorsObj.file ? (
																			<span className="red">
																				{this.props.errorsObj.file[0]}
																			</span>
																		) : (
																			""
																		)}
																	</div>
																</div>
															</div>
														</div>
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		className="w-[350px] h-[350px]"
																		alt="Preview upload"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											""
										)}
										{content.contentType === "Posts" ? (
											<div>
												{content.isSubmitedPreview ? (
													<div className="grid grid-cols-12 gap-5">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		className="w-[350px] h-[350px]"
																		alt="Preview upload"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
													</div>
												) : (
													<div className="grid grid-cols-12 gap-5 mb-12">
														<div className="md:col-span-8 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">
																Post - Upload preview content
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-9 sm:col-span-8 col-span-12">
																		<p>
																			Create kick-ass content (photo/video)
																			based on the brief, upload it and click
																			on 'Submit'. Once approved, publish on
																			your social channel and you’ll get paid.
																		</p>
																	</div>
																	<div className="md:col-span-3 sm:col-span-4 col-span-12">
																		{content.contentStoryPath ||
																			this.state.storyPreviewUrl ? (
																			<Button
																				text="Replace Preview"
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		) : (
																			<Button
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Upload Preview"
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		)}
																		{this.props.errorsObj.file ? (
																			<span className="red">
																				{this.props.errorsObj.file[0]}
																			</span>
																		) : (
																			""
																		)}
																	</div>
																</div>
															</div>
														</div>
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[350px] h-[350px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											""
										)}
									</div>
								))
								: ""}
						</div>
						<div>
							{this.props.influencerCampaignContent.length &&
								this.props.previewApprovedFlag === 1
								? this.props.influencerCampaignContent.map((content, index) => (
									<div key={index}>
										{content.contentType === "Story" ? (
											<div>
												<div>
													<h5 className="mb-2 text-[18px]">
														Preview Content
													</h5>
													<div className="grid grid-cols-12 gap-5 pb-12">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<div className="">
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[250px] h-[250px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										) : (
											""
										)}
										<div className="bg-[#0000001f] h-[1px] w-full mt-4 mb-4 sm:!mt-0" />
										{content.contentType === "Posts" ? (
											<div>
												<div>
													<h5 className="mb-2 text-[18px]">
														Preview Content
													</h5>
													<div className="grid grid-cols-12 gap-5 pb-12">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<div className="">
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[250px] h-[250px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																		No preview selected yet...
																	</h4>
																)}
															</div>
														</div>
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
					</>
				) : ("")} */}
				{campaignType === "influencerCampaign" ||
					campaignType === "quoteCampaign" ? (
					<div>
						<div className="grid grid-cols-12 gap-5 mb-12">
							{campaignTasks && campaignTasks.length > 0 && campaignTasks.map((task, index) => (
								<>
									{!isAllUploadedContent &&
										<div className="md:col-span-8 sm:col-span-6 col-span-12">
											<h5 className="mb-2 text-[18px]">
												{task.title} - Upload task content {!task.is_mandatory && <span className="text-green-900 text-[15px] font-semibold">(Optional)</span>}
											</h5>
											<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
												<div className="grid grid-cols-12 gap-5 p-3">
													<div className="col-span-12">
														<p>
															1. Share the message (see brief) on
															your social media channel
														</p>
														<p>
															2. Come back here and select the post
															from the list below:
														</p>
														{this.props.platformName ===
															"instagram" && (
																<div className="mt-4">
																	{this.props.isReconnectFlag ? (
																		fbPages && fbPages.length > 0 ?
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
																					<div className="text-center">
																						<Button
																							className="mt-6 m-auto px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																							onClick={() => this.connectInstagramSubmit()}
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
																			:
																			<>
																			</>
																	) : (
																		<form>
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
																											(influencerCampaignContent?.filter((i) => i.taskId === task.id)).length > 0
																												? true
																												: false
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
																						!this.props
																							.instagramIsFetching && <Button
																							className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																							onClick={() =>
																								this.props.fetchInstagramPost()
																							}
																							text={<FaSyncAlt />}
																						/>
																					}
																				</div>
																				{
																					this.props
																						.instagramIsFetching && (
																						<p className="text-center">
																							loading...
																						</p>)
																				}
																			</div>
																		</form>
																	)}
																</div>
															)}
														{this.props.platformName ===
															"youtube" && (
																<div className="mt-4">
																	<form>
																		<div
																			className="mb-[1rem]"
																			controlId="exampleForm.ControlSelect1"
																		>
																			{!this.props.isReconnectFlag ? (
																				<>
																					<label className="text-[14px] font-medium">
																						My latest Youtube posts
																					</label>
																					<div className="input-group mb-4 ">
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
																												selected={
																													(influencerCampaignContent?.filter((i) => i.taskId === task.id)).length > 0
																														? true
																														: false
																												}
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
																						{this.props
																							.youtubeIsFetching ? (
																							<p className="text-center">
																								loading...
																							</p>
																						) : (
																							<Button
																								className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																								onClick={() =>
																									this.props.fetchYoutubeListVideo()
																								}
																								text={<FaSyncAlt />}
																							/>
																						)}
																					</div>
																				</>
																			) : (
																				<LinkTo
																					to="/influencer/setting-influencer-platforms"
																					text="Connect Youtube"
																					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																				/>
																			)}
																		</div>
																	</form>
																</div>
															)}
														{this.props.platformName ===
															"tiktok" && (
																<div className="mt-4">
																	<form>
																		<div
																			className="mb-[1rem]"
																			controlId="exampleForm.ControlSelect1"
																		>
																			{!this.props.isReconnectFlag ? (
																				<>
																					<label className="text-[14px] font-medium">
																						My latest Tiktok posts
																					</label>
																					<div className="input-group mb-4 ">
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
																												(influencerCampaignContent?.filter((i) => i.taskId === task.id)).length > 0
																													? true
																													: false
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
																						{this.props
																							.tiktokIsFetching ? (
																							<p className="text-center">
																								loading...
																							</p>
																						) : (
																							<Button
																								className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																								onClick={() =>
																									this.props.fetchTiktokListVideo()
																								}
																								text={<FaSyncAlt />}
																							/>
																						)}
																					</div>
																				</>
																			) : (
																				<LinkTo
																					to="/influencer/setting-influencer-platforms"
																					text="Connect Tiktok"
																					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																				/>
																			)}
																		</div>
																	</form>
																</div>
															)}
													</div>
												</div>
											</div>
										</div>
									}
									{influencerCampaignContent && influencerCampaignContent.length > 0 &&
										<div className="md:col-span-4 sm:col-span-6 col-span-12">
											{influencerCampaignContent.map((content) => (
												content.taskId === task.id &&
												<>
													<h5 className="mb-2 text-[18px]">Preview</h5>
													{this.props.platformName === "tiktok" &&
														content.tiktok_post_id && (
															<div
																width="100%"
																height="100%"
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
								</>
							))}
						</div>
						{/* <div>
							{campaignTasks && campaignTasks.length && campaignTasks.map((content) => (
								<div className="grid grid-cols-12 gap-5 mb-12">
									<div className="md:col-span-8 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px] flex gap-4">
											Task - Upload preview content
											{!content.is_mandatory &&
												<p className=" text-green-900 text-[15px] font-semibold">(Optional)</p>
											}
										</h5>
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
											<p>
												Create kick-ass content (photo/video)
												based on the brief, upload it and click
												on 'Submit'. Once approved, you’ll get paid.
											</p>
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12 mt-6">
													<p>
														Upload the Photo with this button
													</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryPath ||
														this.state.storyPreviewUrl ? (
														<Button
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
															prefix={
																<input
																	type="file"
																	name="image"
																	className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Preview"
														/>
													) : (
														<Button
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
															prefix={
																<input
																	type="file"
																	name="image"
																	className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Preview"
														/>
													)}
													{this.props.errorsObj.file ? (
														<span className="red">
															{this.props.errorsObj.file[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12">
													<p className="mt-6 mb-6">
														Upload the Video with this button:
													</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryVideoPath ? (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																	onChange={(e) =>
																		this.fileChangedVideoHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Video"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
														/>
													) : (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																	onChange={(e) =>
																		this.fileChangedVideoHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Video"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
														/>
													)}
													{this.props.errorsObj.video ? (
														<span className="red">
															{this.props.errorsObj.video[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="md:col-span-4 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px]">Preview</h5>
										<div
											className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
											style={{ backgroundColor: "#E9EAEC" }}
										>
											{content.contentStoryPath ||
												this.state.storyPreviewUrl ? (
												<img
													htmlFor="photo-upload"
													alt="Preview upload"
													className="w-[350px] h-[350px]"
													src={
														this.state.storyPreviewUrl
															? this.state.storyPreviewUrl
															: content.contentStoryPath
													}
												/>
											) : (
												<h4 className=" text-[20px]">
													No preview selected yet...
												</h4>
											)}
										</div>
										<div
											className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
											style={{ backgroundColor: "#E9EAEC" }}
										>
											{content.contentStoryVideoPath ? (
												<video
													controls
													autoPlay
													width="100%"
													height="100%"
													src={
														content.contentStoryVideoPath
													}
												></video>
											) : (
												<h4 className=" text-[20px]">
													No preview selected yet...
												</h4>
											)}
										</div>
									</div>
								</div>
							))
							}
						</div> */}
						<div>
							{this.props.influencerCampaignContent.length &&
								this.props.previewApprovedFlag === 0
								? this.props.influencerCampaignContent.map((content, index) => (
									<div key={index}>
										{content.contentType === "Story" ? (
											<div>
												{content.isSubmitedPreview ? (
													<div className="grid grid-cols-12 gap-5 pb-12">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[350px] h-[350px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												) : (
													<div className="grid grid-cols-12 gap-5 mb-12">
														<div className="md:col-span-8 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">
																Story - Upload preview content
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-9 sm:col-span-8 col-span-12">
																		<p>
																			Create kick-ass content (photo/video)
																			based on the brief, upload it and click
																			on 'Submit'. Once approved, publish on
																			your social channel and you’ll get paid.
																		</p>
																	</div>
																	<div className="md:col-span-3 sm:col-span-4 col-span-12">
																		{content.contentStoryPath ||
																			this.state.storyPreviewUrl ? (
																			<Button
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Replace Preview"
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		) : (
																			<Button
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Upload Preview"
																			/>
																		)}
																		{this.props.errorsObj.file ? (
																			<span className="red">
																				{this.props.errorsObj.file[0]}
																			</span>
																		) : (
																			""
																		)}
																	</div>
																</div>
															</div>
														</div>
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[350px] h-[350px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											""
										)}
										{content.contentType === "Posts" ? (
											<div>
												{content.isSubmitedPreview ? (
													<div className="grid grid-cols-12 gap-5">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[350px] h-[350px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryVideoPath ? (
																	<video
																		controls
																		autoPlay
																		width="100%"
																		height="100%"
																		src={
																			content.contentStoryVideoPath
																		}
																	></video>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												) : (
													<div className="grid grid-cols-12 gap-5 mb-12">
														<div className="md:col-span-8 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px] flex gap-4">
																Task - Upload preview content
																{!content.isMandatory &&
																	<p className=" text-green-900 text-[15px] font-semibold">(Optional)</p>
																}
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<p>
																	Create kick-ass content (photo/video)
																	based on the brief, upload it and click
																	on 'Submit'. Once approved, you’ll get paid.
																</p>
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-9 sm:col-span-8 col-span-12 mt-6">
																		<p>
																			Upload the Photo with this button
																		</p>
																	</div>
																	<div className="md:col-span-3 sm:col-span-4 col-span-12">
																		{content.contentStoryPath ||
																			this.state.storyPreviewUrl ? (
																			<Button
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				prefix={
																					<input
																						type="file"
																						name="image"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Replace Preview"
																			/>
																		) : (
																			<Button
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				prefix={
																					<input
																						type="file"
																						name="image"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedStoryHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Upload Preview"
																			/>
																		)}
																		{this.props.errorsObj.file ? (
																			<span className="red">
																				{this.props.errorsObj.file[0]}
																			</span>
																		) : (
																			""
																		)}
																	</div>
																</div>
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-9 sm:col-span-8 col-span-12">
																		<p className="mt-6 mb-6">
																			Upload the Video with this button:
																		</p>
																	</div>
																	<div className="md:col-span-3 sm:col-span-4 col-span-12">
																		{content.contentStoryVideoPath ? (
																			<Button
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedVideoHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Replace Video"
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		) : (
																			<Button
																				prefix={
																					<input
																						type="file"
																						className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																						onChange={(e) =>
																							this.fileChangedVideoHandler(
																								e,
																								content.uniqueId
																							)
																						}
																					/>
																				}
																				text="Upload Video"
																				className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																			/>
																		)}
																		{this.props.errorsObj.video ? (
																			<span className="red">
																				{this.props.errorsObj.video[0]}
																			</span>
																		) : (
																			""
																		)}
																	</div>
																</div>
															</div>
														</div>
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<h5 className="mb-2 text-[18px]">Preview</h5>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[350px] h-[350px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
															<div
																className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																style={{ backgroundColor: "#E9EAEC" }}
															>
																{content.contentStoryVideoPath ? (
																	<video
																		controls
																		autoPlay
																		width="100%"
																		height="100%"
																		src={
																			content.contentStoryVideoPath
																		}
																	></video>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												)}
											</div>
										) : (
											""
										)}
									</div>
								))
								: ""}
						</div>
						<div>
							{this.props.influencerCampaignContent.length &&
								this.props.previewApprovedFlag === 1
								? this.props.influencerCampaignContent.map((content, index) => (
									<div key={index}>
										{content.contentType === "Story" ? (
											<div>
												<div>
													{content.status === "accepted" ||
														content.status === "pending" ? (
														<div>
															<h5 className="mb-2 text-[18px]">
																Connected Story
															</h5>
															<div className="grid grid-cols-12 gap-5 p-3 mb-12">
																{content.contentStoryInsightPath ? (
																	<div className="md:col-span-4 sm:col-span-4 col-span-12">
																		<div className="flex items-center">
																			<img
																				src={
																					content.campaignInfluencerInfo
																						.profile_picture_url
																						? content.campaignInfluencerInfo
																							.profile_picture_url
																						: avatar
																				}
																				alt={
																					content.campaignInfluencerInfo
																						.infl_name
																				}
																				className="w-[52px] rounded-full"
																			/>
																			<div className="">
																				<h4 className="ml-4 text-[20px]">
																					{
																						content.campaignInfluencerInfo
																							.infl_name
																					}
																				</h4>
																				<span className="ml-4">
																					{content.campaign.typeName}
																				</span>
																			</div>
																		</div>
																		<div className="PostedGrid flex flex-col border-[1px] border-[#0000002d] rounded-[8px] mb-6 mt-6 sm:!mb-0 storyCard">
																			<div className="card-link PostedGridImage relative">
																				{content.flag &&
																					content.contentStoryInsightPath ? (
																					<div>
																						<img
																							src={
																								content.contentStoryInsightPath
																									? content.contentStoryInsightPath
																									: ""
																							}
																							alt="Type"
																							className="rounded-t-[8px]"
																						/>
																					</div>
																				) : (
																					<img
																						className="rounded-t-[8px]"
																						src={
																							content.contentStoryPath
																								? content.contentStoryPath
																								: ""
																						}
																						alt="Type"
																					/>
																				)}
																				<p className="text-white cardTopBadge">
																					{content.contentType}
																				</p>
																			</div>
																		</div>
																	</div>
																) : (
																	<h4 className=" text-[20px]">
																		Not Post Connected Yet
																	</h4>
																)}
															</div>
														</div>
													) : (
														<div className="grid grid-cols-12 gap-5 mb-12">
															<div className="md:col-span-8 sm:col-span-6 col-span-12">
																<h5 className="mb-2 text-[18px]">
																	Story - Upload content
																</h5>
																<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																	<div className="grid grid-cols-12 gap-5 p-3">
																		<div className="md:col-span-9 sm:col-span-8 col-span-12">
																			<p className="mt-6 mb-6">
																				Upload the insight screenshot with
																				this button:
																			</p>
																		</div>
																		<div className="md:col-span-3 sm:col-span-4 col-span-12">
																			{content.contentStoryInsightPath ? (
																				<Button
																					className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																					prefix={
																						<input
																							type="file"
																							className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																							onChange={(e) =>
																								this.fileChangedInsightHandler(
																									e,
																									content.uniqueId
																								)
																							}
																						/>
																					}
																					text="Replace Insight"
																				/>
																			) : (
																				<Button
																					prefix={
																						<input
																							type="file"
																							className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																							onChange={(e) =>
																								this.fileChangedInsightHandler(
																									e,
																									content.uniqueId
																								)
																							}
																						/>
																					}
																					text="Upload Insight"
																					className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				/>
																			)}
																			{this.props.errorsObj.insight ? (
																				<span className="red">
																					{this.props.errorsObj.insight[0]}
																				</span>
																			) : (
																				""
																			)}
																		</div>
																	</div>
																	<div className="grid grid-cols-12 gap-5 p-3">
																		<div className="md:col-span-9 sm:col-span-8 col-span-12">
																			<p className="mt-6 mb-6">
																				Upload the Video with this button:
																			</p>
																		</div>
																		<div className="md:col-span-3 sm:col-span-4 col-span-12">
																			{content.contentStoryVideoPath ? (
																				<Button
																					prefix={
																						<input
																							type="file"
																							className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																							onChange={(e) =>
																								this.fileChangedVideoHandler(
																									e,
																									content.uniqueId
																								)
																							}
																						/>
																					}
																					text="Replace Video"
																					className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				/>
																			) : (
																				<Button
																					prefix={
																						<input
																							type="file"
																							className="absolute opacity-0 inset-x-0 h-full cursor-pointer"
																							onChange={(e) =>
																								this.fileChangedVideoHandler(
																									e,
																									content.uniqueId
																								)
																							}
																						/>
																					}
																					text="Upload Video"
																					className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] text-center shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] mt-6 mb-6 w-full"
																				/>
																			)}
																			{this.props.errorsObj.video ? (
																				<span className="red">
																					{this.props.errorsObj.video[0]}
																				</span>
																			) : (
																				""
																			)}
																		</div>
																	</div>
																</div>
															</div>
															<div className="md:col-span-4 sm:col-span-6 col-span-12">
																<h5 className="mb-2 text-[18px]">Preview</h5>
																<div
																	className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																	style={{ backgroundColor: "#E9EAEC" }}
																>
																	<Tab.Group defaultIndex={0}>
																		<Tab.List className="border-b border-[#dee2e6] flex items-center">
																			<Tab
																				className={({ selected }) =>
																					classNames(
																						"border-[1px] py-[0.75rem] rounded-t-[8px] mb-[-1px] px-[1.25rem] text-[14px] flex items-center focus-visible:outline-[0px]",
																						selected
																							? "border-[#dee2e6_#dee2e6_#fff]"
																							: "border-transparent"
																					)
																				}
																			>
																				Insight
																			</Tab>
																			<Tab
																				className={({ selected }) =>
																					classNames(
																						"border-[1px] py-[0.75rem] rounded-t-[8px] mb-[-1px] px-[1.25rem] text-[14px] flex items-center focus-visible:outline-[0px]",
																						selected
																							? "border-[#dee2e6_#dee2e6_#fff]"
																							: "border-transparent"
																					)
																				}
																			>
																				Video
																			</Tab>
																		</Tab.List>
																		<Tab.Panels>
																			<Tab.Panel>
																				{content.contentStoryInsightPath ? (
																					<img
																						alt="Preview upload"
																						className="w-[300px] h-[300px]"
																						src={
																							content.contentStoryInsightPath
																						}
																					/>
																				) : (
																					<h4 className=" text-[20px]">
																						No insight selected yet...
																					</h4>
																				)}
																			</Tab.Panel>
																			<Tab.Panel>
																				{content.contentStoryVideoPath ? (
																					<video
																						controls
																						autoPlay
																						width="100%"
																						height="100%"
																						src={
																							content.contentStoryVideoPath
																						}
																					></video>
																				) : (
																					<h4 className=" text-[20px]">
																						No video selected yet...
																					</h4>
																				)}
																			</Tab.Panel>
																		</Tab.Panels>
																	</Tab.Group>
																</div>
															</div>
														</div>
													)}
													{content.instagramFeed ? (
														<div>
															<h5 className="mb-2 text-[18px]">
																Performance
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">-</h4>
																		<p>View</p>
																	</div>
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">
																			{content.instagramFeed
																				? content.instagramFeed.like_count
																				: 0}
																		</h4>
																		<p>Likes</p>
																	</div>
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">
																			{content.instagramFeed
																				? content.instagramFeed.comments_count
																				: 0}
																		</h4>
																		<p>Comments</p>
																	</div>
																</div>
															</div>
														</div>
													) : (
														""
													)}
													<h5 className="mb-2">Preview Content</h5>
													<div className="grid grid-cols-12 gap-5 pb-12 text-[18px]">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<div className="">
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[250px] h-[250px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												</div>
												<div className="bg-[#0000001f] h-[1px] w-full mt-4 mb-4 sm:!mt-0" />
											</div>
										) : (
											""
										)}
										{content.contentType === "Posts" ? (
											<div>
												<div>
													{content.status === "accepted" ||
														content.status === "pending" ? (
														<div className="grid grid-cols-12 gap-5">
															<div className="md:col-span-4 sm:col-span-6 col-span-12">
																<h5 className="mb-2 text-[18px]">
																	Connected Post
																</h5>
																<div
																	className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
																	style={{ backgroundColor: "#E9EAEC" }}
																>
																	{content.instagramFeed ? (
																		<div>
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
																	) : (
																		<div className="text-[20px]"></div>
																	)}
																	{this.props.platformName === "tiktok" &&
																		content.tiktok_post_id && (
																			<div
																				width="100%"
																				height="100%"
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
																</div>
															</div>
														</div>
													) : (
														<div className="grid grid-cols-12 gap-5 mb-12">
															<div className="md:col-span-8 sm:col-span-6 col-span-12">
																<h5 className="mb-2 text-[18px]">
																	Post - Upload content
																</h5>
																<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																	<div className="grid grid-cols-12 gap-5 p-3">
																		<div className="col-span-12">
																			<p>
																				1. Share the message (see brief) on
																				your social media channel
																			</p>
																			<p>
																				2. Come back here and select the post
																				from the list below:
																			</p>
																			{this.props.platformName ===
																				"instagram" && (
																					<div className="mt-4">
																						{this.props.isReconnectFlag ? (
																							<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
																								<p className="text-white">
																									If you want to get the latest
																									posts from your Instagram
																									Account , Please Reconnect
																									your Instagram Account under
																									settings in Platforms Tab and
																									then try Again! <br />
																									<LinkTo
																										className="px-6 mt-4 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-dark text-white hover:opacity-80"
																										to="/influencer/setting-influencer-platforms"
																										text="Go To Platforms"
																									/>
																								</p>
																							</div>
																						) : (
																							""
																						)}
																						<form>
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
																												content.uniqueId,
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
																														key={index}
																														value={feed.id}
																													>
																														{feed.caption}
																													</option>
																												)
																											)}
																									</select>
																									{
																										!this.props
																											.instagramIsFetching && <Button
																											className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																											onClick={() =>
																												this.props.fetchInstagramPost()
																											}
																											text={<FaSyncAlt />}
																										/>
																									}
																								</div>
																								{
																									this.props
																										.instagramIsFetching && (
																										<p className="text-center">
																											loading...
																										</p>)
																								}
																							</div>
																						</form>
																					</div>
																				)}
																			{this.props.platformName ===
																				"youtube" && (
																					<div className="mt-4">
																						<form>
																							<div
																								className="mb-[1rem]"
																								controlId="exampleForm.ControlSelect1"
																							>
																								{currentLoggedUser.isConnectedYoutube ? (
																									<>
																										<label className="text-[14px] font-medium">
																											My latest Youtube posts
																										</label>
																										<div className="input-group mb-4 ">
																											<select
																												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																												onChange={(event) =>
																													this.handleSelectYoutube(
																														content.uniqueId,
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
																																	selected={
																																		feed
																																			.contentDetails
																																			?.upload
																																			?.videoId ===
																																			content.youtube_post_id
																																			? true
																																			: false
																																	}
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
																											{this.props
																												.youtubeIsFetching ? (
																												<p className="text-center">
																													loading...
																												</p>
																											) : (
																												<Button
																													className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																													onClick={() =>
																														this.props.fetchYoutubeListVideo()
																													}
																													text={<FaSyncAlt />}
																												/>
																											)}
																										</div>
																									</>
																								) : (
																									<div
																										className="inline-flex cursor-pointer"
																										onClick={
																											this.redirectToYoutube
																										}
																									>
																										<img
																											src={Google_Signin_Button}
																											className="w-[55%]"
																											alt="Google Signin Button"
																										/>
																										{/* <div className="pr-3 pt-2 sm:flex hidden " >
                                                                                                        <FcGoogle size={18} />
                                                                                                    </div>
                                                                                                    <div className="flex justify-between grow items-center">
                                                                                                        <div className="flex flex-col letter-spacing-2px grow">
                                                                                                        <p className="text-[8px] gray">GOOGLE</p>
                                                                                                            <h6 className="text-[10px]">Youtube Connect</h6>
                                                                                                        </div>
                                                                                                    </div> */}
																									</div>
																								)}
																							</div>
																						</form>
																					</div>
																				)}
																			{this.props.platformName ===
																				"tiktok" && (
																					<div className="mt-4">
																						<form>
																							<div
																								className="mb-[1rem]"
																								controlId="exampleForm.ControlSelect1"
																							>
																								{currentLoggedUser.isConnectedTiktok ? (
																									<>
																										<label className="text-[14px] font-medium">
																											My latest Tiktok posts
																										</label>
																										<div className="input-group mb-4 ">
																											<select
																												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																												onChange={(event) =>
																													this.handleSelectTiktok(
																														content.uniqueId,
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
																																	feed.id ===
																																		content.tiktok_post_id
																																		? true
																																		: false
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
																											{this.props
																												.tiktokIsFetching ? (
																												<p className="text-center">
																													loading...
																												</p>
																											) : (
																												<Button
																													className="px-6 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																													onClick={() =>
																														this.props.fetchTiktokListVideo()
																													}
																													text={<FaSyncAlt />}
																												/>
																											)}
																										</div>
																									</>
																								) : (
																									<LinkTo
																										to="/influencer/setting-influencer-platforms"
																										text="Connect Tiktok"
																										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																									/>
																								)}
																							</div>
																						</form>
																					</div>
																				)}
																		</div>
																	</div>
																</div>
															</div>
															<div className="md:col-span-4 sm:col-span-6 col-span-12">
																<h5 className="mb-2 text-[18px]">Preview</h5>
																{this.props.platformName === "tiktok" &&
																	content.tiktok_post_id && (
																		<div
																			width="100%"
																			height="100%"
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
																<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-[#E9EAEC] rounded-[8px] p-3">
																	{content.instagramFeed ? (
																		<div>
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
																	) : (
																		<h4 className=" text-[20px]">
																		</h4>
																	)}
																</div>
															</div>
														</div>
													)}
													{content.instagramFeed ? (
														<div>
															<h5 className="mb-2 text-[18px]">
																Performance
															</h5>
															<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
																<div className="grid grid-cols-12 gap-5 p-3">
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">-</h4>
																		<p>View</p>
																	</div>
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">
																			{content.instagramFeed
																				? content.instagramFeed.like_count
																				: 0}
																		</h4>
																		<p>Likes</p>
																	</div>
																	<div className="md:col-span-4 sm:col-span-6 col-span-12">
																		<h4 className=" text-[20px]">
																			{content.instagramFeed
																				? content.instagramFeed.comments_count
																				: 0}
																		</h4>
																		<p>Comments</p>
																	</div>
																</div>
															</div>
														</div>
													) : (
														""
													)}
													<h5 className="mb-2 text-[18px]">
														Preview Content
													</h5>
													<div className="grid grid-cols-12 gap-5 pb-3">
														<div className="md:col-span-4 sm:col-span-6 col-span-12">
															<div className="">
																{content.contentStoryPath ||
																	this.state.storyPreviewUrl ? (
																	<img
																		htmlFor="photo-upload"
																		alt="Preview upload"
																		className="w-[250px] h-[250px]"
																		src={
																			this.state.storyPreviewUrl
																				? this.state.storyPreviewUrl
																				: content.contentStoryPath
																		}
																	/>
																) : (
																	<h4 className=" text-[20px]">
																	</h4>
																)}
															</div>
														</div>
													</div>
												</div>
												<div className="bg-[#0000001f] h-[1px] w-full mt-4 mb-4 sm:!mt-0" />
											</div>
										) : (
											""
										)}
									</div>
								))
								: ""}
						</div>
					</div>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)
				}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		errorsObj: state.InfluencersBookingIDReducer.errorsObj,
		campaignType: state.InfluencersBookingIDReducer.campaignType,
		influencerCampaignContent: state.InfluencersBookingIDReducer.influencerCampaignContent,
		campaignTasks: state.InfluencersBookingIDReducer.campaignTasks,
		previewApprovedFlag: state.InfluencersBookingIDReducer.previewApprovedFlag,
		isReconnectFlag: state.InfluencersBookingIDReducer.isReconnectFlag,
		influencerInstagramPosts:
			state.InfluencersBookingIDReducer.influencerInstagramPosts,
		platformName: state.InfluencersBookingIDReducer.platformName,
		tiktokData: state.InfluencersBookingIDReducer.tiktokData,
		tiktokIsFetching: state.InfluencersBookingIDReducer.tiktokIsFetching,
		instagramIsFetching: state.InfluencersBookingIDReducer.instagramIsFetching,
		youtubeData: state.InfluencersBookingIDReducer.youtubeData,
		youtubeIsFetching: state.InfluencersBookingIDReducer.youtubeIsFetching,
		fbPages: state.SettingPlatformReducer.fbPages,
		selectedPage: state.SettingPlatformReducer.selectedPage,
		platformErrorsObj: state.SettingPlatformReducer.errorsObj,
		isAllUploadedContent: state.InfluencersBookingIDReducer.isAllUploadedContent,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		handleUploadContentStory: (query, campaignId) =>
			dispatch(
				influencersBookingIDActions.handleUploadContentStory(query, campaignId)
			),
		handleUploadContentVideo: (query, campaignId) =>
			dispatch(
				influencersBookingIDActions.handleUploadContentVideo(query, campaignId)
			),
		handleUploadContentStoryInsight: (query, campaignId) =>
			dispatch(
				influencersBookingIDActions.handleUploadContentStoryInsight(
					query,
					campaignId
				)
			),
		selectedFeedPost: (query) =>
			dispatch(influencersBookingIDActions.selectedFeedPost(query)),
		handleSelectTiktok: (query) =>
			dispatch(influencersBookingIDActions.handleSelectTiktok(query)),
		handleSelectYoutube: (query) =>
			dispatch(influencersBookingIDActions.handleSelectYoutube(query)),
		fetchTiktokListVideo: () =>
			dispatch(influencersBookingIDActions.fetchTiktokListVideo()),
		fetchYoutubeListVideo: () =>
			dispatch(influencersBookingIDActions.fetchYoutubeListVideo()),
		fetchInstagramPost: () =>
			dispatch(influencersBookingIDActions.influencerInstagramPosts()),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		submitInstagramConnect: (query) =>
			dispatch(settingPlatformActionCreator.submitInstagramInfluencerConnect(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingContentPreviewTab);
