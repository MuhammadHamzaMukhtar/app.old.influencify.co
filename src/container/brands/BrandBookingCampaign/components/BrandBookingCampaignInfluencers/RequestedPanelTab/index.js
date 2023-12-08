import { Component, Fragment, createRef } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition, Menu } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import avatar from "@assets/avatar.png";
import MessageModal from "@components/MessageModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import {
	HANDEL_ACCEPT_MESSAGE_OPTIONAL,
	HANDEL_REJECT_MESSAGE_OPTIONAL,
} from "@store/constants/action-types";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import { HANDEL_BRAND_SEND_MESSAGE } from "@store/constants/action-types";
import { FaSpinner } from "react-icons/fa";
import moment from "moment";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { IoIosRefresh, IoMdClose } from "react-icons/io";
import Emitter from "../../../../../../constants/Emitter";
import Button from "@components/global/Button";
import Influencify from "../../../../../../constants/Influencify";
import LinkTo from "@components/global/LinkTo";
import { FiX } from "react-icons/fi";
import ChangeEmailModal from "@components/ChangeEmailModal";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class RequestedPanelTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			changeEmailModal: false,
			acceptShow: false,
			rejectShow: false,
			openDialog: false,
			influencerId: "",
			influencerEmail: "",
			profileModal: false,
			reinviteModal: false,
			showEmailLogs: false,
			influencer_log_id: null,
			showRefreshModal: false,
			updateInfluencerCounter: 0,
			startProgressBar: false,
			influencerIds: [],
			loader: false,
		};
		this.drawerRef = createRef();
	}

	componentDidMount() { }

	setModalShow = (event, id) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				modalShow: event,
				influencerId: id,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	setChangeEmailModalShow = (event, influencer) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				changeEmailModal: event,
				influencerId: influencer?.id,
				influencerEmail: influencer?.influencer_email
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	}

	handleAcceptClose = () => {
		this.setState({
			acceptShow: false,
		});
	};

	handleAcceptShow = (e) => {
		this.setState({
			acceptShow: true,
			influencerId: e,
		});
	};

	handleRejectClose = () => {
		this.setState({
			rejectShow: false,
		});
	};

	handleRejectShow = (e) => {
		this.setState({
			rejectShow: true,
			influencerId: e,
		});
	};

	handleInfluencerProfileModal = (influencer) => {
		// const { platform } = this.props;
		// if (id) {
		// 	this.setState({
		// 		profileModal: true,
		// 	});
		// 	let query = {
		// 		platform: platform,
		// 		user_id: id,
		// 	};
		// 	this.props.viewInfluencerProfile(id);
		// }
		const data = {
			campaign_id: this.props.campaignId,
			user_id: influencer.id
		}
		Emitter.emit("INFLUENCER_POPUP", data);
	};

	handleClose = () => {
		this.setState({
			openDialog: false,
			acceptShow: false,
			rejectShow: false,
			profileModal: false,
		});
	};

	brandBookingCampaignAccept = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			acceptOptionalMessage: this.props.acceptOptionalMessage,
		};
		this.props.handleAcceptInfluncerRequest(query);
	};

	brandBookingCampaignReject = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		this.props.handleRejectInfluncerRequest(query);
	};

	handleMessageChange = (e) => {
		this.props.handleBrandMessage(e);
	};

	sendBrandMessage = () => {
		let query = {
			brandMessage: this.props.brandMessage,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
		};
		this.setState({
			openDialog: false,
		});
		this.props.brandCampaignSendMessage(query);
	};

	handleChangeEmail = (email) => {
		this.setState({ influencerEmail: email })
	}

	changeEmailRequest = (reinvite) => {
		let query = {
			email: this.state.influencerEmail,
			re_invite: reinvite,
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
		}
		this.props.sendChangeEmailRequest(query);
		this.props.brandBookingCampaignInfluencers(this.props.campaignId);
	}

	sendEmailRequest = async (influencer) => {

		let query = {
			email: influencer?.influencer_email,
			re_invite: true,
			influencerId: influencer.id,
			campaignId: this.props.campaignId,
		}
		await this.props.sendChangeEmailRequest(query);
		this.props.brandBookingCampaignInfluencers(this.props.campaignId);

	}

	addDefaultSrc(ev) {
		ev.target.src = avatar;
	}

	sendReinviteInfluencer = async (id) => {
		const data = { campaign_id: this.props.campaignId, id: id };
		if (this.props.refreshData.is_admin) {
			this.props.sendReinviteInfluencer(data);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	showEmailLogs = (id) => {
		this.setState({ showEmailLogs: true, influencer_log_id: id });
		const data = { campaign_id: this.props.campaignId, user_id: id };
		this.props.showEmailLogs(data);
	};

	refreshLog = () => {
		const data = {
			campaign_id: this.props.campaignId,
			user_id: this.state.influencer_log_id,
		};
		this.props.showEmailLogs(data);
	};

	timeOut = (time) => {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve("resolve");
			}, time);
		});
	};

	updateInfluencers = async (email) => {
		let influencer_ids = [];
		let user_ids = [];
		(this.props.requestedCampaignInfluencers || []).forEach((influencer) => {
			if (influencer.iq_user_id) {
				influencer_ids.push(influencer.iq_user_id);
			} else if (influencer.basicInfo?.iq_user_id) {
				influencer_ids.push(influencer.basicInfo?.iq_user_id);
			}
			if (influencer.id) {
				user_ids.push(influencer.id);
			}
		});
		const data = {
			platform: this.props.platform,
			ids: influencer_ids,
			email: email,
			campaign_id: this.props.campaignId,
			user_ids: user_ids,
		};
		this.setState({ loader: true, showRefreshModal: false });
		const json = await Influencify.updateInfluencerStats(data);
		if (json !== undefined) {
			if (!json.data.status) {
				toast.error(json.data.message);
				this.setState({ loader: false });
			} else {
				this.props.brandBookingCampaignInfluencers(this.props.campaignId);
				this.props.brandBookingCampaignOverview(this.props.campaignId);
			}
		}
	};

	refreshInfluencer = async () => {
		if (this.props.campaign.isStatsEnable) {
			this.setState({ showRefreshModal: true });
		}
	};

	render() {
		const {
			isProfileLoading,
			platform,
			reinviteInfluencerLoading,
			influencerEmailLogLoading,
			influencerEmailLogData,
			requestedCampaignInfluencers,
		} = this.props;
		const { updateInfluencerCounter, startProgressBar } = this.state;
		const processBarvalue =
			parseInt(
				(updateInfluencerCounter * 100) / (requestedCampaignInfluencers || []).length
			) || 0;
		const enabled = this.props.campaign.isStatsEnable || false;

		return (
			<div>
				{(this.props.requestedCampaignInfluencers || []).length ? (
					<div className="mt-12 md:!mt-0">
						{startProgressBar && (
							<>
								<div
									className="progress relative"
									style={{ height: "13px", zIndex: "9992" }}
								>
									<div
										className="progress-bar progress-bar-striped progress-bar-animated important:Bg-purple"
										style={{ width: processBarvalue + "%" }}
									>
										{processBarvalue}%
									</div>
								</div>
								<div className="screen-lock fixed inset-0 bg-[#00000080] z-[9991]"></div>
							</>
						)}
						{this.props.campaign?.statsUpdatedAt && (
							<div className="w-full flex justify-end">
								<div className="bg-[#17a2b8] text-white whitespace-nowrap  text-center text-[11px] py-[0.25em] px-[0.4em] rounded-[4px]">
									Last stats updated: {this.props.campaign?.statsUpdatedAt}
								</div>
							</div>
						)}
						<div className="bg-white rounded-[8px] p-3 bg-transparent lg:block hidden mb-4">
							<div className="grid grid-cols-12 gap-6 items-end">
								<div className="lg:col-span-3 col-span-12">
									<b className="font-normal xl:pl-12 xl:ml-6">Name</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Reach</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Avg. Engagement</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Est. Spending</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Invitation</b>
								</div>
								{/* <div className="lg:col-span-1 col-span-12 flex justify-end">
									{this.state.loader ? (
										<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-[20px]" />
									) : (
										<Button
											onClick={this.refreshInfluencer}
											className={`px-[1rem] rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ${
												enabled ? "" : "disabled"
											}`}
											text="Update stats"
										/>
									)}
								</div> */}
							</div>
						</div>
						{(this.props.requestedCampaignInfluencers || []).map(
							(influencer, index) => (
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-4">
									<div
										className="grid grid-cols-12 gap-5 items-center"
										key={index}
									>
										<div className="lg:col-span-3 md:col-span-5 sm:col-span-4 col-span-11 flex items-center sm:justify-start justify-center">
											<img
												//onError={this.addDefaultSrc}
												src={
													influencer.basicInfo &&
														influencer.basicInfo.profile_picture_url
														? influencer.basicInfo.profile_picture_url
														: avatar
												}
												onError={({ currentTarget }) => {
													currentTarget.src =
														influencer.basicInfo &&
															influencer.basicInfo.profile_picture_url
															? influencer.basicInfo.profile_picture_url
															: avatar;
												}}
												alt={influencer.displayname}
												className="rounded-full w-[52px] h-[52px] overflow-hidden shrink-0"
											/>
											<div className="ml-2">
												<div
													onClick={() =>
														this.handleInfluencerProfileModal(influencer)
													}
													className="text-[18px] block cursor-pointer"
												>
													{influencer.displayname}
												</div>
												<span className="font-normal text-[#9ea1b2]">
													@{influencer.userName}
												</span>
											</div>
										</div>
										<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
										<div className="sm:col-span-2 col-span-12">
											<h4 className="black font-medium text-[16px]">
												<FormatedNumber
													num={influencer.basicInfo.followers_count}
												/>
											</h4>
										</div>
										<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
										<div className="sm:col-span-2 col-span-12">
											<h4 className="black font-medium text-[16px]">
												{influencer.basicInfo &&
													influencer.basicInfo.engagement_rate
													? influencer.basicInfo.engagement_rate
													: 0}
												%
											</h4>
										</div>
										<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
										<div className="sm:col-span-2 col-span-12">
											<h4 className="black font-medium text-[16px]">
												{influencer.price} {this.props.campaign.currency_code}{" "}
												{influencer.product ? (
													<LinkTo
														target="_blank"
														to={`/products/${influencer.product.value}`}
														state={{ id: influencer.product.value }}
														text={`+ ${influencer.product.label}`}
													/>
												) : (
													""
												)}
											</h4>
										</div>
										<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
										<div className="sm:col-span-2 col-span-12">
											{(influencer?.email_log_count || 0) > 0 ?
												<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Invited</span>
												:
												(influencer?.is_sent ?
													<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Sent</span> :
													<span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Pending</span>
												)
											}
										</div>
										<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
										<div className="sm:col-span-1 col-span-12 ml-auto sm:!mt-4 lg:!mt-0 flex sm:justify-end justify-center">
											{reinviteInfluencerLoading &&
												reinviteInfluencerLoading[influencer.id] ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
											) : (
												<>
													<Menu
														as="div"
														className="relative inline-block text-left"
													>
														<div>
															<Menu.Button
																as="div"
																className="inline-flex items-center cursor-pointer"
															>
																<HiDotsHorizontal
																	size={20}
																	className="darkGray"
																/>
															</Menu.Button>
														</div>
														<Transition
															as={Fragment}
															enter="transition ease-out duration-100"
															enterFrom="transform opacity-0 scale-95"
															enterTo="transform opacity-100 scale-100"
															leave="transition ease-in duration-75"
															leaveFrom="transform opacity-100 scale-100"
															leaveTo="transform opacity-0 scale-95"
														>
															<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-[8px] bg-white shadow-[0px_4px_5px_#96969640] focus:outline-none py-[0.5rem]">
																{(influencer?.influencer_email) &&
																	<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																		<Menu.Item>
																			<Button
																				onClick={() =>
																					this.sendEmailRequest(influencer)
																				}
																				className="text-[14px] p-3 w-full text-left"
																				text="Send Email"
																			/>
																		</Menu.Item>
																	</div>
																}
																{/* <div className="px-1  hover:bg-[#0000000a] rounded-[8px]">
																	<Menu.Item>
																		<Button
																			onClick={() =>
																				this.sendReinviteInfluencer(
																					influencer.id
																				)
																			}
																			className="text-[14px] p-3 w-full text-left"
																			text="Re-invite"
																		/>
																	</Menu.Item>
																</div> */}
																<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																	<Menu.Item>
																		<Button
																			onClick={() =>
																				this.showEmailLogs(influencer.id)
																			}
																			className="text-[14px] p-3 w-full text-left"
																			text="Show logs"
																		/>
																	</Menu.Item>
																</div>
																<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																	<Menu.Item>
																		<Button
																			onClick={() =>
																				this.setChangeEmailModalShow(true, influencer)
																			}
																			className="text-[14px] p-3 w-full text-left"
																			text="Change email"
																		/>
																	</Menu.Item>
																</div>
																{this.props.typeName === "PUBLIC" ? (
																	<>
																		<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																			<Menu.Item>
																				<Button
																					onClick={() =>
																						this.handleAcceptShow(influencer.id)
																					}
																					className="text-[14px] p-3 w-full text-left"
																					text="Accept"
																				/>
																			</Menu.Item>
																		</div>
																		<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																			<Menu.Item>
																				<Button
																					onClick={() =>
																						this.handleRejectShow(influencer.id)
																					}
																					className="text-[14px] p-3 w-full text-left"
																					text="Reject"
																				/>
																			</Menu.Item>
																		</div>
																	</>
																) : (
																	""
																)}
															</Menu.Items>
														</Transition>
													</Menu>
													<svg onClick={() =>
														this.handleInfluencerProfileModal(influencer)
													} className="text-purple-600 cursor-pointer ml-2" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

												</>
											)}
											<MessageModal
												handleChangeMessage={(e) => this.handleMessageChange(e)}
												show={this.state.modalShow}
												brandMessage={this.props.brandMessage}
												messageSend={() => this.sendBrandMessage()}
												onHide={() => this.setModalShow(false)}
											/>
											<ChangeEmailModal
												handleChangeEmail={(e) => this.handleChangeEmail(e)}
												show={this.state.changeEmailModal}
												influencerEmail={this.state.influencerEmail}
												isLoading={this.props.isLoading}
												changeEmail={(reinvite) => this.changeEmailRequest(reinvite)}
												onHide={() => this.setChangeEmailModalShow(false)}
											/>
										</div>
									</div>
								</div>
							)
						)}
						<Transition appear show={this.state.acceptShow} as={Fragment}>
							<Dialog
								onClose={this.handleAcceptClose}
								className="relative z-[9999]"
							>
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
												<h2 className="text-[26px] black font-medium">
													Are you sure?
												</h2>
												<div
													className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
													onClick={this.handleAcceptClose}
												>
													<FiX size={24} className="text-white stroke-white" />
												</div>
											</Dialog.Title>
											<div className="p-3">
												<div className="mb-6">
													<label>Send message (optional)</label>
													<textarea
														as="textarea"
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
														onClick={this.brandBookingCampaignAccept}
														text="Accept"
													/>
												</div>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition>

						<Transition appear show={this.state.rejectShow} as={Fragment}>
							<Dialog
								onClose={this.handleRejectClose}
								className="relative z-[9999]"
							>
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
												<h2 className="text-[26px] black font-medium">
													Are you sure?
												</h2>
												<div
													className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
													onClick={this.handleRejectClose}
												>
													<FiX size={24} className="text-white stroke-white" />
												</div>
											</Dialog.Title>
											<div className="p-3">
												<div className="mb-6">
													<label>Send message (optional)</label>
													<textarea
														as="textarea"
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
														onClick={this.brandBookingCampaignReject}
														text="Reject"
													/>
												</div>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition>

						<Transition appear show={this.state.showEmailLogs} as={Fragment}>
							<Dialog
								onClose={() => this.setState({ showEmailLogs: false })}
								className="relative z-[9999]"
							>
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
												<div className="flex flex-row">
													<h2 className="text-[26px] black font-medium">
														Email logs
													</h2>
													<div
														className="ml-2 cursor-pointer"
														onClick={this.refreshLog}
													>
														<IoIosRefresh />
													</div>
												</div>
												<div
													className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
													onClick={() =>
														this.setState({ showEmailLogs: false })
													}
												>
													<FiX size={24} className="text-white stroke-white" />
												</div>
											</Dialog.Title>
											<div className="p-3">
												<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
													<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
														<tr>
															<th scope="col" className="px-6 py-3">Date/Time</th>
															<th className="px-6 py-3">Source</th>
															<th className="px-6 py-3">Delivery Status</th>
															<th className="px-6 py-3">Seen Status</th>
														</tr>
													</thead>
													<tbody>
														{influencerEmailLogLoading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-center" />
														) : (
															influencerEmailLogData.map((item, index) => (
																<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
																	<th

																		scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
																	>
																		{moment
																			.utc(item.created_at)
																			.local()
																			.format("DD MMM YY, h:mm:ss a")}
																	</th>
																	<td className="px-6 py-4">
																		{item.source === "smtp" ? (
																			<MdOutlineMail />
																		) : item.source === "gmail" ? (
																			<SiGmail />
																		) : (
																			<p>
																				<Tooltip
																					trigger={
																						<div className="ml-2">
																							<BsQuestionCircle
																								className="darkGray"
																								size={18}
																							/>
																						</div>
																					}
																					tooltipText={item.message}
																					placement="top-left"
																				/>
																			</p>
																		)}
																	</td>
																	<td className="px-6 py-4">
																		{item.sent_at ? (
																			<AiOutlineCheck className="success" />
																		) : (
																			<IoMdClose className="red" />
																		)}
																	</td>
																	<td className="px-6 py-4">
																		{item.read_at ? (
																			<AiOutlineCheck className="success" />
																		) : (
																			<IoMdClose className="red" />
																		)}
																	</td>
																</tr>
															))
														)}
													</tbody>
												</table>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition>

						<Transition appear show={this.state.showRefreshModal} as={Fragment}>
							<Dialog
								onClose={() => this.setState({ showRefreshModal: false })}
								className="relative z-[9999]"
							>
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
												<h2 className="text-[26px] black font-medium">
													Please Confirm
												</h2>
												<div
													className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
													onClick={() =>
														this.setState({ showRefreshModal: false })
													}
												>
													<FiX size={24} className="text-white stroke-white" />
												</div>
											</Dialog.Title>
											<div className="p-3">
												{(this.props.requestedCampaignInfluencers ||
													(this.props.requestedCampaignInfluencers || []).length >
													0) && (
														<div className="w-full">
															<p className="mb-2">
																By clicking on below buttons, following expected
																cost will be deducted
															</p>
															<p className="mb-2">
																Total invited influencers:{" "}
																<b>
																	{(this.props.requestedCampaignInfluencers || []).length}
																</b>
															</p>
															<p className="mb-6">
																Expected credits cost:{" "}
																<b>
																	{(this.props.requestedCampaignInfluencers || []).length}
																</b>
															</p>

															<div className="w-full flex justify-end">
																<Button
																	className="px-[1rem] rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																	onClick={() => this.updateInfluencers(false)}
																	text="Update stats only"
																/>
																<Button
																	className="px-[1rem] rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-2"
																	onClick={() => this.updateInfluencers(true)}
																	text="Update stats and resend invitations"
																/>
															</div>
														</div>
													)}
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition>

					</div>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
				<>
					<InfluencerProfileModal
						newCampaignWithSelected={false}
						isProfileLoading={isProfileLoading}
						platform={platform}
						open={this.state.profileModal}
						onClose={() => this.handleClose()}
					/>
				</>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		isProfileLoading: state.influencerSearch.isProfileLoading,
		platform: state.BrandBookingCampaignReducer.platform,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		requestedCampaignInfluencers:
			state.BrandBookingCampaignReducer.requestedCampaignInfluencers,
		acceptOptionalMessage:
			state.BrandBookingCampaignReducer.acceptOptionalMessage,
		rejectOptionalMessage:
			state.BrandBookingCampaignReducer.rejectOptionalMessage,
		typeName: state.BrandBookingCampaignReducer.typeName,
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		brandMessage: state.BrandBookingCampaignReducer.brandMessage,
		reinviteInfluencerLoading:
			state.BrandBookingCampaignReducer.reinviteInfluencerLoading,
		influencerEmailLogLoading:
			state.BrandBookingCampaignReducer.influencerEmailLogLoading,
		influencerEmailLogData:
			state.BrandBookingCampaignReducer.influencerEmailLogData,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		handleAcceptChange: (event) =>
			dispatch({ type: HANDEL_ACCEPT_MESSAGE_OPTIONAL, payload: event }),
		handleRejectChange: (event) =>
			dispatch({ type: HANDEL_REJECT_MESSAGE_OPTIONAL, payload: event }),
		handleAcceptInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleAcceptInfluncerRequest(query)),
		handleRejectInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleRejectInfluncerRequest(query)),
		brandCampaignSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandCampaignSendMessage(query)),
		handleBrandMessage: (event) =>
			dispatch({ type: HANDEL_BRAND_SEND_MESSAGE, payload: event }),
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
		sendReinviteInfluencer: (query) =>
			brandBookingCampaignActions.sendReinviteInfluencer(dispatch, query),
		showEmailLogs: (query) =>
			brandBookingCampaignActions.showEmailLogs(dispatch, query),
		sendChangeEmailRequest: (query) => { return brandBookingCampaignActions.changeEmailRequest(dispatch, query) },
		brandBookingCampaignInfluencers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignInfluencers(id)),
		brandBookingCampaignOverview: (query) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignOverview(query)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestedPanelTab);
