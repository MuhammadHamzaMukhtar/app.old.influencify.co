import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import { FiX } from "react-icons/fi";
import avatar from "@assets/avatar.png";
import ReasonSelect from "react-select";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import {
	HANDLE_SELECT_CHANGE_SUCCESS,
	HANDEL_ACCEPT_MESSAGE_OPTIONAL,
	HANDEL_REJECT_MESSAGE_OPTIONAL,
} from "@store/constants/action-types";
import "./styles.css";
import moment from "moment";
const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
class InfluencerBookingSubHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requestModal: false,
			cancelModal: false,
			abortModal: false,
			workDoneModal: false,
			ratingValue: 0,
			rejectModal: false,
			acceptModal: false,
			previewModal: false,
		};
	}

	handleRequestShow = (e) => {
		this.setState({
			requestModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			requestModal: false,
			cancelModal: false,
			abortModal: false,
			workDoneModal: false,
			rejectModal: false,
			acceptModal: false,
			previewModal: false,
		});
	};

	handleModalCancel = (e) => {
		this.setState({
			cancelModal: true,
		});
	};

	handleModalAbort = (e) => {
		this.setState({
			abortModal: true,
		});
		this.props.handleFetchAbortReasons();
	};

	handleModalWorkDone = (e) => {
		this.setState({
			workDoneModal: true,
		});
	};

	handleModalPreview = (e) => {
		this.setState({
			previewModal: true,
		});
	};

	handleModalReject = (e) => {
		this.setState({
			rejectModal: true,
		});
	};

	handleModalAccept = (e) => {
		this.setState({
			acceptModal: true,
		});
	};

	setRatingValue = (e) => {
		this.setState({
			ratingValue: e,
		});
	};

	handleBookRequest = () => {
		let query = {
			campaignId: this.props.campaignID,
		};
		this.props.handleBookingRequest(query);
		this.setState({
			requestModal: false,
		});
	};

	handleRequestCancel = () => {
		let query = {
			campaignId: this.props.campaignID,
		};
		this.props.handleCancelRequest(query);
		this.setState({
			cancelModal: false,
		});
	};

	handleRequestAbort = () => {
		let query = {
			campaignId: this.props.campaignID,
			reason: this.props.selectedReason,
			ratingValue: this.state.ratingValue,
		};
		this.props.handleAbortRequest(query);
		setTimeout(() => {
			if (Object.keys(this.props.errorsObj).length === 0) {
				this.setState({
					abortModal: false,
				});
			} else {
				this.setState({
					abortModal: true,
				});
			}
		}, 500);
	};

	handleRequestWorkDone = () => {
		let query = {
			campaignId: this.props.campaignID,
		};
		this.props.handleWorkDoneRequest(query);
		this.setState({
			workDoneModal: false,
		});
	};

	handleRequestPreview = () => {
		let query = {
			campaignId: this.props.campaignID,
		};
		this.props.handlePreviewRequest(query);
		this.setState({
			previewModal: false,
		});
	};

	influencerBookingCampaignAccept = () => {
		let query = {
			campaignId: this.props.campaignID,
			fixedFee: this.props.fixedFee,
			acceptOptionalMessage: this.props.acceptOptionalMessage,
			noOfPosts: this.props.campaignTasks.length,
		};
		this.props.handleInfluencerAcceptRequest(query);
		this.setState({
			acceptModal: false,
		});
	};

	influencerBookingCampaignReject = () => {
		let query = {
			campaignId: this.props.campaignID,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		this.props.handleInfluencerRejectRequest(query);
		this.setState({
			rejectModal: false,
		});
	};

	render() {
		const abortReasons = (this.props.abortReasons || []).map((data) => ({
			label: data.reason_name,
			value: data.id,
			price: data.abort_price,
		}));
		if (this.props.isLoading) {
			return (
				<div className="mb-12 relative h-50">
					<Loader />
				</div>
			);
		}
		return (
			<>
				{this.props.isInfluencerAttached === 1 ? (
					<>
						{this.props.campaignType === "contentCampaign" ? (
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-7 sm:col-span-6 col-span-12">
									<div className="flex">
										<div className=" pr-3">
											<img
												src={
													this.props.brand.avatar
														? this.props.brand?.avatar
														: avatar
												}
												alt={this.props.campaignTitle}
												className="w-[52px] rounded-full"
											/>
										</div>
										<div className="">
											<h3 className="text-black text-[28px] font-semibold">
												{this.props.campaignTitle}
											</h3>
											<p className="flex items-center mt-2">
												{this.props.platformName === "instagram" && (
													<FaInstagram className="mr-2" />
												)}
												{this.props.platformName === "tiktok" && (
													<FaTiktok className="mr-2" />
												)}
												{this.props.platformName === "youtube" && (
													<FaYoutube className="mr-2" />
												)}
												{this.props.campaignType === "quoteCampaign" &&
													"Request a Quote"}
												{this.props.campaignType === "influencerCampaign" &&
													"Influencer Campaign"}
												{this.props.campaignType === "contentCampaign" &&
													"Affiliate Campaign"}
												, {this.props.campaignCountry}
											</p>

											<span className="text-[#9EA1B2]">
												{this.props.postingFrom} - {this.props.postingTo}
											</span>
											<p className="mt-2">
												{this.props.campaignType === "quoteCampaign"
													? "Price"
													: "Fixed Fee"}{" "}
												: {this.props.campaign_payment?.has_fixed_price}{" "}
												{this.props.currentLoggedUser.currency_code}{" "}
												{this.props.campaign_payment?.campaign_products && this.props.campaign_payment?.campaign_products.length
													? "+ Product"
													: ""}
											</p>
										</div>
									</div>
								</div>
								<div className="md:col-span-5 sm:col-span-6 col-span-12 my-auto text-right">
									{this.props.FlowStatus === "rejected" ? (
										<h3>Rejected</h3>
									) : (
										""
									)}

									{this.props.FlowStatus === "aborted" ? <h3>Aborted</h3> : ""}
									{this.props.FlowStatus === "canceled" ? (
										<h3>Canceled</h3>
									) : (
										""
									)}
									{this.props.FlowStatus === "requested" ||
										this.props.FlowStatus === "preview" ||
										this.props.FlowStatus === "inprogress" ||
										this.props.FlowStatus === "workdone" ||
										this.props.FlowStatus === "closed" ? (
										<div className="flex justify-between items-center">
											<ul className="text-left pr-3 list-unstyled">
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-['']  ${this.props.FlowStatus === "requested"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Requested
												</li>
												{/* {this.props.campaignPreview ? (
													<li
														className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "preview"
															? "!text-[#ff9f00] active before:bg-[#ff9f00]"
															: ""
															}`}
													>
														Preview
													</li>
												) : (
													""
												)} */}
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "closed"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Closed
												</li>
											</ul>
											<div className="sm:table-cell align-middle mt-6 sm:!mt-0">
												<div className="multi-buttons">
													{this.props.FlowStatus === "requested" &&
														this.props.typeName === "DIRECT" ? (
														<div className="flex">
															<Button
																type="button"
																text="Reject"
																onClick={() => this.handleModalReject()}
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
															/>
															<Button
																onClick={() => this.handleModalAccept()}
																type="button"
																text="Accept"
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple hover:opacity-80 mr-2 text-white"
															/>
														</div>
													) : (
														""
													)}
													{this.props.FlowStatus === "requested" &&
														this.props.typeName !== "DIRECT" ? (
														<Button
															type="button"
															text="Cancel"
															onClick={() => this.handleModalCancel()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
														/>
													) : (
														""
													)}
													{this.props.FlowStatus === "preview" &&
														this.props.isSubmitedPreviewContent ? (
														<Button
															type="button"
															text="Cancel"
															onClick={() => this.handleModalCancel()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
														/>
													) : (
														""
													)}
													{this.props.FlowStatus === "preview" &&
														!this.props.isSubmitedPreviewContent ? (
														<div className="flex">
															<Button
																type="button"
																text="Cancel"
																onClick={() => this.handleModalCancel()}
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
															/>
															<Button
																disabled={
																	!this.props.isAllUploadedPreviewContent
																}
																onClick={() => this.handleModalPreview()}
																type="button"
																text="Submit"
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple hover:opacity-80 text-white"
															/>
														</div>
													) : (
														""
													)}
													{this.props.FlowStatus === "closed" ? "" : ""}
												</div>
											</div>
										</div>
									) : (
										""
									)}
								</div>
							</div>
						) : (
							""
						)}
						{this.props.campaignType === "influencerCampaign" ||
							this.props.campaignType === "quoteCampaign" ? (
							<div className="grid grid-cols-12 gap-x-8">
								<div className="lg:col-span-9 col-span-12 mb-12 lg:!mb-0">
									<div className="flex">
										<div className="pr-3">
											<img
												src={
													this.props.brand?.avatar
														? this.props.brand?.avatar
														: avatar
												}
												alt={this.props.campaignTitle}
												className="w-[52px] rounded-full"
											/>
										</div>
										<div className="">
											<h3 className="text-black text-[28px] font-semibold break-all">
												{this.props.campaignTitle}
											</h3>
											<p className="flex items-center mt-2">
												{this.props.platformName === "instagram" && (
													<FaInstagram className="mr-2" />
												)}
												{this.props.platformName === "tiktok" && (
													<FaTiktok className="mr-2" />
												)}
												{this.props.platformName === "youtube" && (
													<FaYoutube className="mr-2" />
												)}
												{this.props.campaignType === "quoteCampaign" &&
													capitalize(this.props.platformName) + " "}
												{this.props.campaignType === "influencerCampaign" &&
													"Influencer Campaign"}
												{this.props.campaignType === "contentCampaign" &&
													"Affiliate Campaign"}
												Campaign
												{/* , {this.props.campaignCountry} */}
											</p>

											<span className="text-[#9EA1B2]">
												{moment(this.props.postingFrom).format("DD-MM-YYYY")} -{" "}
												{moment(this.props.postingTo).format("DD-MM-YYYY")}
											</span>
											<p className="mt-2">
												{this.props.FlowStatus === "requested" ?
													"Price" : "Final Price"
												}
												: {this.props.FlowStatus === "requested" ?
													(this.props.campaign_payment?.has_fixed_price && this.props.campaign_payment?.price ? `${this.props.campaign_payment?.price} ${this.props.currentLoggedUser.currency_code}` : "") : (this.props.campaignInfluencer?.price ? `${this.props.campaign_payment?.influencer_price} ${this.props.currentLoggedUser.currency_code}` : "")
												}
												{this.props.campaign_payment?.has_fixed_price && this.props.campaign_payment?.campaign_products?.length > 0 && " + "}
												{this.props.campaign_payment?.campaign_products && this.props.campaign_payment?.campaign_products?.length
													? "Voucher"
													: ""}
											</p>
										</div>
									</div>
								</div>
								<div className="lg:col-span-3 col-span-12 my-auto text-right">
									{this.props.FlowStatus === "rejected" ? (
										<h3>Rejected</h3>
									) : (
										""
									)}
									{this.props.FlowStatus === "aborted" ? <h3>Aborted</h3> : ""}
									{this.props.FlowStatus === "canceled" ? (
										<h3>Canceled</h3>
									) : (
										""
									)}
									{this.props.FlowStatus === "requested" ||
										this.props.FlowStatus === "preview" ||
										this.props.FlowStatus === "inprogress" ||
										this.props.FlowStatus === "workdone" ||
										this.props.FlowStatus === "closed" ? (
										<div className="flex flex-col sm:flex-row justify-between sm:items-center items-start">
											<ul className="text-left pr-3 list-unstyled">
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "requested"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Requested
												</li>
												{/* {this.props.campaignPreview ? (
													<li
														className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "preview"
															? "!text-[#ff9f00] active before:bg-[#ff9f00]"
															: ""
															}`}
													>
														Preview
													</li>
												) : (
													""
												)} */}
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "inprogress"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Work in progress
												</li>
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "workdone"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Work done
												</li>
												<li
													className={`before:bg-[#43e0b7] before:absolute before:-left-[11px] before:h-[11px] before:rounded-full before:top-1/2 transform before:-translate-y-1/2 text-[#9ea1b2] before:w-[11px] relative pl-[16px] before:content-[''] ${this.props.FlowStatus === "closed"
														? "!text-[#ff9f00] active before:bg-[#ff9f00]"
														: ""
														}`}
												>
													Closed
												</li>
											</ul>
											<div className="mt-6 sm:!mt-0">
												{this.props.FlowStatus === "requested" &&
													this.props.typeName === "DIRECT" ? (
													this.props.campaignType !== "quoteCampaign" ? (
														<div className="flex">
															<Button
																type="button"
																text="Reject"
																onClick={() => this.handleModalReject()}
																className="px-12 rounded-[8px] h-[40px] inline-flex items-center bg--purple text-white hover:opacity-80 text-[14px] mr-2"
															/>
															<Button
																onClick={() => this.handleModalAccept()}
																type="button"
																text="Accept"
																className="px-12 rounded-[8px] h-[40px] inline-flex items-center bg--purple hover:opacity-80 text-[14px] text-white"
															/>
														</div>
													) : (
														<div className="flex">
															{/* Please update quote pricesss */}
															{/* Submit quote to proceed */}
															{/* <Button
																type="button"
																text="Reject"
																onClick={() => this.handleModalReject()}
																className="px-12 rounded-[8px] h-[40px] inline-flex items-center bg--purple text-white hover:opacity-80 text-[14px] mr-2"
															/> */}
														</div>
													)
												) : (
													""
												)}
												{this.props.FlowStatus === "requested" &&
													this.props.typeName !== "DIRECT" ? (
													<Button
														type="button"
														text="Cancel"
														onClick={() => this.handleModalCancel()}
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
													/>
												) : (
													""
												)}
												{this.props.FlowStatus === "preview" &&
													this.props.isSubmitedPreviewContent ? (
													<Button
														type="button"
														text="Cancel"
														onClick={() => this.handleModalCancel()}
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
													/>
												) : (
													""
												)}
												{/* {this.props.FlowStatus === "inprogress" ? (
													<div className="flex">
														<Button
															type="button"
															text="Abort"
															onClick={() => this.handleModalAbort()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
														/>
														<Button
															disabled={
																!this.props.isAllUploadedPreviewContent 
																// && !this.props.isAllLinkedPosted
															}
															text="Finish"
															onClick={() => this.handleModalWorkDone()}
															type="button"
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple hover:opacity-80 text-white"
														/>
													</div>
												) : (
													""
												)} */}
												{this.props.FlowStatus === "preview" &&
													!this.props.isSubmitedPreviewContent ? (
													<div className="flex">
														<Button
															type="button"
															text="Cancel"
															onClick={() => this.handleModalCancel()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
														/>
														<Button
															disabled={!this.props.isAllUploadedPreviewContent}
															onClick={() => this.handleModalPreview()}
															type="button"
															text="Submit"
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
														/>
													</div>
												) : (
													""
												)}
												{/* {this.props.FlowStatus === "workdone" ? (
													<div className="flex">
														<Button
															type="button"
															text="Abort"
															onClick={() => this.handleModalAbort()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
														/>
													</div>
												) : (
													""
												)} */}
												{this.props.FlowStatus === "closed" ? "" : ""}
											</div>
										</div>
									) : (
										""
									)}
								</div>
							</div>
						) : (
							""
						)}
					</>
				) : (
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-8 sm:col-span-6 col-span-12">
							<div className="table">
								<div className="table-cell pr-3">
									<img
										src={
											this.props.brand?.avatar ? this.props.brand?.avatar : avatar
										}
										alt={this.props.campaignTitle}
										className="w-[52px] runded-full"
									/>
								</div>
								<div className="table-cell">
									<h3>{this.props.campaignTitle}</h3>
									<p className="mt-2">
										{this.props.platformName === "Instagram" ? (
											<FaInstagram className="mr-2" />
										) : (
											""
										)}
										{this.props.typeName}, {this.props.campaignCountry}
									</p>
									<span style={{ color: "#9EA1B2" }}>
										{this.props.postingFrom}-{this.props.postingTo}
									</span>
									<p className="mt-2">
										{this.props.campaignType === "quoteCampaign"
											? "Price"
											: "Fixed Fee"}{" "}
										: {this.props.campaign_payment?.has_fixed_price && this.props.campaign_payment?.price + this.props.currentLoggedUser.currency_code}{" "}
										{/* {this.props.currentLoggedUser.currency_code} */}
									</p>
								</div>
							</div>
						</div>
						<div className="md:col-span-4 sm:col-span-6 col-span-12 my-auto">
							<div className="text-right">
								<Button
									onClick={() => this.handleRequestShow()}
									type="button"
									text="Request Booking"
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
								/>
							</div>
						</div>
					</div>
				)}

				<Transition appear show={this.state.requestModal} as={Fragment}>
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
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<h5 className=" text-[20px]">
											Your request for booking will be Request
										</h5>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.handleBookRequest}
												text="Request"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={this.state.cancelModal} as={Fragment}>
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
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<h5>Your request for booking will be Canceled</h5>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="No"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.handleRequestCancel}
												text="Yes"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={this.state.rejectModal} as={Fragment}>
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
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-[1rem]">
											<label className="text-[14px] font-medium">
												Send message (optional)
											</label>
											<textarea
												rows="8"
												className="rounded-[8px] py-2 inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												name="rejectOptionalMessage"
												value={this.props.rejectOptionalMessage}
												onChange={(event) =>
													this.props.handleRejectChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.influencerBookingCampaignReject}
												text="Reject"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={this.state.acceptModal} as={Fragment}>
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
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-[1rem]">
											<label className="text-[14px] font-medium">
												Send message (optional)
											</label>
											<textarea
												rows="8"
												className="rounded-[8px] py-2 inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												name="acceptOptionalMessage"
												value={this.props.acceptOptionalMessage}
												onChange={(event) =>
													this.props.handleAcceptChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.influencerBookingCampaignAccept}
												text="Accept"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={this.state.abortModal} as={Fragment}>
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
										<h2 className="text-[24px]">Abort Work?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p>Abort reason</p>
										<ReasonSelect
											options={abortReasons}
											isSearchable={true}
											placeholder={"Chose a reason"}
											onChange={(e) => this.props.handleSelectChange(e)}
										/>
										{this.props.errorsObj?.reason ? (
											<span className="red">
												{this.props.errorsObj.reason[0]}
											</span>
										) : (
											""
										)}
										<p className="mt-6">Abort cost</p>
										<p>
											{this.props.selectedReason
												? this.props.selectedReason.price
												: 0.0}{" "}
											{this.props.currentLoggedUser.currency_code}
										</p>
										<p className="mt-6">Brand's response rate:</p>
										<div>
											{/* <Rating
												name="ratingValue"
												value={this.state.ratingValue}
												onChange={(event) => this.setRatingValue(event)}
											/> */}
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.handleRequestAbort}
												text="Abort"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

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

				<Transition appear show={this.state.previewModal} as={Fragment}>
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
											This will submit your preview content for approval
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.handleRequestPreview}
												text="Submit"
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
		errorsObj: state.InfluencersBookingIDReducer.errorsObj,
		campaignTitle: state.InfluencersBookingIDReducer.campaignTitle,
		campaignType: state.InfluencersBookingIDReducer.campaignType,
		typeName: state.InfluencersBookingIDReducer.typeName,
		campaignCountry: state.InfluencersBookingIDReducer.campaignCountry,
		postingFrom: state.InfluencersBookingIDReducer.postingFrom,
		postingTo: state.InfluencersBookingIDReducer.postingTo,
		isInfluencerAttached:
			state.InfluencersBookingIDReducer.isInfluencerAttached,
		campaignInfluencerStatus:
			state.InfluencersBookingIDReducer.campaignInfluencerStatus,
		abortReasons: state.InfluencersBookingIDReducer.abortReasons,
		selectedReason: state.InfluencersBookingIDReducer.selectedReason,
		acceptOptionalMessage:
			state.InfluencersBookingIDReducer.acceptOptionalMessage,
		rejectOptionalMessage:
			state.InfluencersBookingIDReducer.rejectOptionalMessage,
		isAllUploadedContent:
			state.InfluencersBookingIDReducer.isAllUploadedContent,
		isAllUploadedPreviewContent:
			state.InfluencersBookingIDReducer.isAllUploadedPreviewContent,
		isAllLinkedPosted: state.InfluencersBookingIDReducer.isAllLinkedPosted,
		campaignPreview: state.InfluencersBookingIDReducer.campaignPreview,
		FlowStatus: state.InfluencersBookingIDReducer.FlowStatus,
		platformName: state.InfluencersBookingIDReducer.platformName,
		campaignAttachments: state.InfluencersBookingIDReducer.campaignAttachments,
		isSubmitedPreviewContent:
			state.InfluencersBookingIDReducer.isSubmitedPreviewContent,
		campaign_payment: state.InfluencersBookingIDReducer.campaignPayment,
		// has_fixed_price: state.InfluencersBookingIDReducer.has_fixed_price,
		// brand: state.InfluencersBookingIDReducer.brand,
		// products: state.InfluencersBookingIDReducer.products,
		campaignInfluencer: state.InfluencersBookingIDReducer.campaignInfluencer,
		campaignTasks: state.InfluencersBookingIDReducer.campaignTasks,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		handleAcceptChange: (event) =>
			dispatch({ type: HANDEL_ACCEPT_MESSAGE_OPTIONAL, payload: event }),
		handleRejectChange: (event) =>
			dispatch({ type: HANDEL_REJECT_MESSAGE_OPTIONAL, payload: event }),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleFetchAbortReasons: () =>
			dispatch(influencersBookingIDActions.handleFetchAbortReasons()),
		handleBookingRequest: (query) =>
			dispatch(influencersBookingIDActions.handleBookingRequest(query)),
		handleCancelRequest: (query) =>
			dispatch(influencersBookingIDActions.handleCancelRequest(query)),
		handleAbortRequest: (query) =>
			dispatch(influencersBookingIDActions.handleAbortRequest(query)),
		handleWorkDoneRequest: (query) =>
			dispatch(influencersBookingIDActions.handleWorkDoneRequest(query)),
		handleInfluencerRejectRequest: (query) =>
			dispatch(
				influencersBookingIDActions.handleInfluencerRejectRequest(query)
			),
		handleInfluencerAcceptRequest: (query) =>
			dispatch(
				influencersBookingIDActions.handleInfluencerAcceptRequest(query)
			),
		handlePreviewRequest: (query) =>
			dispatch(influencersBookingIDActions.handlePreviewRequest(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingSubHeader);
