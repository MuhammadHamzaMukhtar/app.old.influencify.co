import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import Emitter from "../../../../../constants/Emitter";
import Button from "@components/global/Button";

import {
	HANDEL_ACCEPT_MESSAGE_OPTIONAL,
	HANDEL_REJECT_MESSAGE_OPTIONAL,
} from "@store/constants/action-types";
import Anchor from "@components/global/Anchor";

class ContentPendingApprovalTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			show: false,
			newRequestModal: false,
			newInstaPostRequestModal: false,
			acceptPreviewModal: false,
			approveContentModal: false,
			viewVideoModal: false,
			contentId: "",
			influencerId: "",
			responseTimeValue: 0,
			contentQualityValue: 0,
			storyVideoPath: "",
		};
	}

	setModalShow = (event) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				modalShow: event,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	viewVideo = (path) => {
		this.setState({
			viewVideoModal: true,
			storyVideoPath: path,
		});
	};

	handleClose = () => {
		this.setState({
			show: false,
			newRequestModal: false,
			newInstaPostRequestModal: false,
			acceptPreviewModal: false,
			approveContentModal: false,
			viewVideoModal: false,
		});
	};

	setResponseTimeValue = (e) => {
		this.setState({
			responseTimeValue: e,
		});
	};

	setContentQualityValue = (e) => {
		this.setState({
			contentQualityValue: e,
		});
	};

	// New Rquest Functions Start
	handleNewPostRquest = (contentId, influencerId) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				newRequestModal: true,
				contentId: contentId,
				influencerId: influencerId,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	brandNewRequest = () => {
		let query = {
			contentId: this.state.contentId,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handleBrandNewRequest(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	// New Rquest Functions End

	// New Insta Post Request Start
	handleInstaNewPostRequest = (contentId, influencerId) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				newInstaPostRequestModal: true,
				contentId: contentId,
				influencerId: influencerId,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	brandInstaNewPostRequest = () => {
		let query = {
			contentId: this.state.contentId,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handleBrandInstaNewPostRequest(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	// New Insta Post Request End

	// Accept Preview Post Start
	brandAcceptPreview = (contentId, influencerId) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				acceptPreviewModal: true,
				contentId: contentId,
				influencerId: influencerId,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	brandPreviewAccept = () => {
		let query = {
			contentId: this.state.contentId,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			acceptOptionalMessage: this.props.acceptOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handlebrandPreviewAccept(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	// Accept Preview Post End

	// Approve Final Content Start
	brandApproveConent = (contentId, influencerId) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				approveContentModal: true,
				contentId: contentId,
				influencerId: influencerId,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	brandContentApprove = () => {
		let query = {
			contentId: this.state.contentId,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			responseTimeValue: this.state.responseTimeValue,
			contentQualityValue: this.state.contentQualityValue,
			acceptOptionalMessage: this.props.acceptOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handleBrandContentApprove(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	// Approve Final Content End

	render() {
		return (
			<>
				<div className="grid grid-cols-12 gap-5 pb-12">
					{this.props.pendingCampaignContents.length ? (
						this.props.pendingCampaignContents.map((content, index) => (
							<div
								className="md:col-span-4 sm:col-span-6 col-span-12"
								key={index}
							>
								<div className="flex items-center">
									<img
										src={
											content.campaignInfluencerInfo.profile_picture_url
												? content.campaignInfluencerInfo.profile_picture_url
												: avatar
										}
										alt={content.campaignInfluencerInfo.infl_name}
										className="overflow-hidden rounded-full w-[52px] h-[52px]"
									/>
									<div className="ml-4">
										<h4 className="text-[16px] font-medium black">
											{content.campaignInfluencerInfo.infl_name}
										</h4>
										<span className="font-normal text-[12px] darkGray">
											{content.campaign.typeName}
										</span>
									</div>
								</div>
								<div className="mb-6 mt-4 storyCard shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] relative flex-col">
									<div className="w-full h-full relative border-0 rounded-[8px]">
										{/* {content.contentType === "Posts" ? (
											<> */}
										{content.instagramFeed ? (
											<>
												{content.instagramFeed.media_type === "VIDEO" ? (
													<video
														controls
														autoPlay
														className="h-[300px] w-full"
														src={content.instagramFeed.media_url}
													></video>
												) : (
													""
												)}
												{content.instagramFeed.media_type === "IMAGE" ||
													content.instagramFeed.media_type === "photo" ||
													content.instagramFeed.media_type ===
													"CAROUSEL_ALBUM" ? (
													<Anchor
														href={content.instagramFeed.permalink}
														target="_blank"
														rel="noopener noreferrer"
														prefix={
															<img
																alt={
																	content.campaignInfluencerInfo.infl_name
																}
																className="object-cover rounded-t-[8px] h-[300px] w-full"
																src={
																	content.instagramFeed.media_url
																		? content.instagramFeed.media_url
																		: ""
																}
															/>
														}
													/>
												) : (
													""
												)}
												{!content.instagramFeed.media_type ? (
													<Anchor
														href={content.instagramFeed.permalink}
														target="_blank"
														rel="noopener noreferrer"
														prefix={
															<img
																alt={
																	content.campaignInfluencerInfo.infl_name
																}
																className="object-cover rounded-t-[8px] h-[300px] w-full"
																src={
																	content.instagramFeed.media_url
																		? content.instagramFeed.media_url
																		: ""
																}
															/>
														}
													/>
												) : (
													""
												)}
											</>
										) : (
												content.contentStoryPath && 
											<img
												className="object-cover rounded-t-[8px] h-[300px] w-full"
												src={
													content.contentStoryPath
														? content.contentStoryPath
														: ""
												}
												alt={content.campaignInfluencerInfo.infl_name}
											/>
										)}
										{/* </>
										) : (
											""
										)} */}
										{content.contentType === "Story" ? (
											<>
												{content.contentStoryInsightPath ? (
													<img
														className="object-cover rounded-t-[8px] h-[300px] w-full"
														src={
															content.contentStoryInsightPath
																? content.contentStoryInsightPath
																: ""
														}
														alt={content.campaignInfluencerInfo.infl_name}
													/>
												) : (
													<img
														className="object-cover rounded-t-[8px] h-[300px] w-full"
														src={
															content.contentStoryPath
																? content.contentStoryPath
																: ""
														}
														alt={content.campaignInfluencerInfo.infl_name}
													/>
												)}
											</>
										) : (
											""
										)}
										<p className="text-white absolute top-0 bg-[#ef9b0f] left-0 right-0 w-[100px] m-auto text-center">
											{content.contentType}
										</p>
									</div>

									<div className="pt-3 pb-1 px-[1.25rem] [&_iframe]:!w-full">
										{content.tiktok_post_id && (
											<div
												dangerouslySetInnerHTML={{
													__html: content.tiktok_content,
												}}
											></div>
										)}
										{content.youtube_post_id && (
											<div
												dangerouslySetInnerHTML={{
													__html: content.youtube_content,
												}}
											></div>
										)}
										{content.contentStoryVideoPath ? (
											<span
												className="success"
												onClick={() =>
													this.viewVideo(content.contentStoryVideoPath)
												}
											>
												View Video
											</span>
										) : (
											""
										)}
									</div>
									<div className="bg-white border-0 pt-0 px-[0.75rem] pb-[1.25rem]">
										<div className="clearfix flex justify-center flex-wrap">
											{content.flag === 0 ? (
												<Button
													className="text-[12px] black px-[1rem] rounded-[8px] h-[30px] inline-flex items-center bg--lightGray hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.handleNewPostRquest(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="New Request"
												/>
											) : (
												""
											)}
											{content.flag === 1 && !content.isPreviewApproved ? ( //first approval
												<Button
													className="text-[12px] black px-[1rem] rounded-[8px] h-[30px] inline-flex items-center bg--lightGray hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.handleNewPostRquest(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="New Request"
												/>
											) : (
												""
											)}
											{content.flag === 1 && content.isPreviewApproved ? (
												<Button
													className="text-[12px] black px-[1rem] rounded-[8px] h-[30px] inline-flex items-center bg--lightGray hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.handleInstaNewPostRequest(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="New Request"
												/>
											) : (
												""
											)}
											{content.flag === 0 && !content.isSubmitedPreview ? (
												<Button
													className="px-[1rem] rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.brandAcceptPreview(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="Approve"
												/>
											) : (
												""
											)}
											{content.isSubmitedPreview &&
												!content.isPreviewApproved ? (
												<Button
													className="px-[1rem] rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.brandAcceptPreview(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="Approve"
												/>
											) : (
												""
											)}
											{content.isPreviewApproved ? (
												<Button
													className="px-[1rem] rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-2 mb-4"
													onClick={() =>
														this.brandApproveConent(
															content.uniqueId,
															content.infleuncerUniqueId
														)
													}
													text="Approve"
												/>
											) : (
												""
											)}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
				<Transition appear show={this.state.approveContentModal} as={Fragment}>
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
									<div className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<Dialog.Title className="text-[26px] black font-medium">
											Are you sure?
										</Dialog.Title>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</div>
									<div className="p-3">
										<div className="mb-6">
											<p className="mt-6">Content quality:</p>
											<div>
												{/* <Rating
													name="ratingValue"
													value={this.state.contentQualityValue}
													onChange={(event) =>
														this.setContentQualityValue(event)
													}
												/> */}
											</div>
											<p className="mt-6">Response time:</p>
											<div>
												{/* <Rating
													name="ratingValue"
													value={this.state.responseTimeValue}
													onChange={(event) => this.setResponseTimeValue(event)}
												/> */}
											</div>
											<label>Send message (optional)</label>
											<textarea
												rows="8"
												className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
												name="acceptOptionalMessage"
												value={this.props.acceptOptionalMessage}
												onChange={(event) =>
													this.props.handleAcceptChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={this.brandContentApprove}
												text="Approve"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.newRequestModal} as={Fragment}>
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
									<div className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<Dialog.Title className="text-[26px] black font-medium">
											Are you sure?
										</Dialog.Title>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</div>
									<div className="p-3">
										<div className="mb-6">
											<label>Send message (optional)</label>
											<textarea
												rows="8"
												className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
												name="rejectOptionalMessage"
												value={this.props.rejectOptionalMessage}
												onChange={(event) =>
													this.props.handleRejectChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={this.brandNewRequest}
												text="New Request"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition
					appear
					show={this.state.newInstaPostRequestModal}
					as={Fragment}
				>
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
									<div className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<Dialog.Title className="text-[26px] black font-medium">
											Are you sure?
										</Dialog.Title>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</div>
									<div className="p-3">
										<div className="mb-6">
											<label>Send message (optional)</label>
											<textarea
												rows="8"
												className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
												name="rejectOptionalMessage"
												value={this.props.rejectOptionalMessage}
												onChange={(event) =>
													this.props.handleRejectChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={this.brandInstaNewPostRequest}
												text="New Request Post"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.acceptPreviewModal} as={Fragment}>
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
									<div className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<Dialog.Title className="text-[26px] black font-medium">
											Are you sure?
										</Dialog.Title>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</div>
									<div className="p-3">
										<div className="mb-6">
											<label>Send message (optional)</label>
											<textarea
												rows="8"
												className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
												name="acceptOptionalMessage"
												value={this.props.acceptOptionalMessage}
												onChange={(event) =>
													this.props.handleAcceptChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={this.brandPreviewAccept}
												text="Approve"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.viewVideoModal} as={Fragment}>
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
									<div className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<Dialog.Title className="text-[26px] black font-medium">
											Video
										</Dialog.Title>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</div>
									<div className="p-3">
										<div className="mb-6">
											<video
												controls
												autoPlay
												className="w-full h-full"
												src={this.state.storyVideoPath}
											></video>
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
		campaign: state.BrandBookingCampaignReducer.campaign,
		pendingCampaignContents:
			state.BrandBookingCampaignReducer.pendingCampaignContents,
		acceptOptionalMessage:
			state.BrandBookingCampaignReducer.acceptOptionalMessage,
		rejectOptionalMessage:
			state.InfluencersBookingIDReducer.rejectOptionalMessage,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleAcceptChange: (event) =>
			dispatch({ type: HANDEL_ACCEPT_MESSAGE_OPTIONAL, payload: event }),
		handleRejectChange: (event) =>
			dispatch({ type: HANDEL_REJECT_MESSAGE_OPTIONAL, payload: event }),
		handleBrandNewRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleBrandNewRequest(query)),
		handleBrandInstaNewPostRequest: (query) =>
			dispatch(
				brandBookingCampaignActions.handleBrandInstaNewPostRequest(query)
			),
		handlebrandPreviewAccept: (query) =>
			dispatch(brandBookingCampaignActions.handlebrandPreviewAccept(query)),
		handleBrandContentApprove: (query) =>
			dispatch(brandBookingCampaignActions.handleBrandContentApprove(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentPendingApprovalTab);
