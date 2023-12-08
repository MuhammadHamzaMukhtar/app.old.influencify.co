import { Component, Fragment } from "react";
import Tooltip from "@components/global/Tooltip";
import { Dialog, Transition, Menu } from "@headlessui/react";
import Select from "react-select";
import { HiDotsHorizontal } from "react-icons/hi";
import avatar from "@assets/avatar.png";
import MessageModal from "@components/MessageModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import { HANDEL_BRAND_SEND_MESSAGE } from "@store/constants/action-types";
import Emitter from "../../../../../constants/Emitter";
import { BsQuestionCircle } from "react-icons/bs";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import { FiX } from "react-icons/fi";

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

class WaitingForApprovalPanelTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			openDialog: false,
			influencerId: "",
			profileModal: false,
			acceptShow: false,
			rejectShow: false,
			product_id: "",
		};
	}

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

	handleInfluencerProfileModal = (influencer) => {
		const { platform } = this.props;

		if (this.props.refreshData.is_admin) {
			// if (id) {
			// 	this.setState({
			// 		profileModal: true,
			// 	});
			// 	let query = {
			// 		platform: platform,
			// 		user_id: id,
			// 	};
			// 	this.props.viewInfluencerProfile(query);
			// }
			const data = {
				campaign_id:this.props.campaignId,
				user_id:influencer.id
			}
			Emitter.emit("INFLUENCER_POPUP", data);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleClose = () => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				openDialog: false,
				profileModal: false,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
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
		if (this.props.refreshData.is_admin) {
			this.setState({
				openDialog: false,
			});
			this.props.brandCampaignSendMessage(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	addDefaultSrc(ev) {
		ev.target.src = avatar;
	}

	handleAcceptShow = (e) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				acceptShow: true,
				influencerId: e,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleRejectShow = (e) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				rejectShow: true,
				influencerId: e,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	brandBookingCampaignAccept = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			product_id: this.state.product_id,
			acceptOptionalMessage: this.props.acceptOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handleAcceptInfluncerRequest(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	brandBookingCampaignReject = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		if (this.props.refreshData.is_admin) {
			this.props.handleRejectInfluncerRequest(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleChange = (value, id) => {
		let data = [];
		let { waitingCampaignInfluencers } = this.props;
		waitingCampaignInfluencers.map((item, i) => {
			return (data[i] = {
				...item,
				product: item.id === id ? value : null,
			});
		});
		if (this.props.refreshData.is_admin) {
			this.setState({ product_id: value ? value.value : "" });
			this.props.updateWaitingCampaignInfluencer(data);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	render() {
		const { isProfileLoading, platform, waitingCampaignInfluencers, campaign } =
			this.props;
		const products = this.props.products.length
			? this.props.products.map((data) => ({
					label: data.name,
					value: data.id,
					price: data.value,
			  }))
			: [];
		return (
			<div>
				{waitingCampaignInfluencers.length ? (
					<div className="mt-12 md:!mt-0">
						<div className="rounded-[8px] p-3 bg-white lg:block hidden">
							<div className="grid grid-cols-12 gap-5 items-center">
								<div className="lg:col-span-3 col-span-12">
									<b className="font-normal">Name</b>
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
							</div>
						</div>
						{waitingCampaignInfluencers.map((influencer, index) => (
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-4">
								<div
									className="grid grid-cols-12 gap-5 items-center"
									key={index}
								>
									<div className="lg:col-span-3 md:col-span-5 sm:col-span-4 col-span-11 flex items-center sm:justify-start justify-center">
										<img
											onError={this.addDefaultSrc}
											src={
												influencer.basicInfo &&
												influencer.basicInfo.profile_picture_url
													? influencer.basicInfo.profile_picture_url
													: avatar
											}
											alt={influencer.displayname}
											className="rounded-full w-[52px]"
										/>
										<div className="ml-2">
											<h5 className="  text-[18px]">
												<div
													onClick={() =>
														this.handleInfluencerProfileModal(influencer)
													}
													className="card-link cursor-pointer"
												>
													{influencer.displayname}
												</div>
											</h5>
											<span className="panel-status">
												@{influencer.userName}
											</span>
										</div>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className="black font-medium text-[16px]">
											<FormatedNumber
												num={influencer.basicInfo.followers_count}
											/>
										</h4>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className="black font-medium text-[16px]">
											{influencer.basicInfo &&
											influencer.basicInfo.engagement_rate
												? influencer.basicInfo.engagement_rate
												: 0}
											%
										</h4>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className="black font-medium text-[16px]">
											{influencer.price} {this.props.campaign.currency_code}{" "}
											{influencer.product ? (
												<LinkTo
													target="_blank"
													to={`/products/${influencer.product.value}`}
													text={`+ ${influencer.product.label}`}
												/>
											) : (
												""
											)}
										</h4>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 ml-auto sm:!mt-4 lg:!mt-0 flex sm:justify-end justify-center">
										<Menu as="div" className="relative inline-block text-left">
											<div>
												<Menu.Button
													as="div"
													className="inline-flex items-center cursor-pointer"
												>
													<HiDotsHorizontal size={20} className="darkGray" />
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
													<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
														<Menu.Item>
															<Button
																onClick={() =>
																	this.setModalShow(true, influencer.id)
																}
																className="text-[14px] p-3 w-full text-left"
																text="Send message"
															/>
														</Menu.Item>
													</div>
													{campaign.campaignType === "quoteCampaign" &&
													influencer.is_sent === 1 ? (
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
														<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
															<span className="text-[#6c757d] px-4 whitespace-nowrap">
																Waiting from influencer
															</span>
														</div>
													)}
												</Menu.Items>
											</Transition>
										</Menu>
										<MessageModal
											handleChangeMessage={(e) => this.handleMessageChange(e)}
											show={this.state.modalShow}
											brandMessage={this.props.brandMessage}
											messageSend={() => this.sendBrandMessage()}
											onHide={() => this.setModalShow(false)}
										/>
									</div>
								</div>
								{influencer.is_sent === 1 && (
									<>
										<div className="grid grid-cols-12 gap-5">
											<div className="md:col-span-4 col-span-12">
												Post fee: <b>{influencer.post_fee} USD</b>
											</div>
											<div className="md:col-span-4 col-span-12">
												Story fee: <b>{influencer.story_fee} USD</b>
											</div>
											<div className="md:col-span-4 col-span-12">
												Product/Discount:{" "}
												<b>
													{influencer.product_fee > 0 ? (
														<>
															<Select
																options={products.filter(
																	(i) => i.price >= influencer.product_fee
																)}
																isClearable={true}
																isSearchable={true}
																placeholder={"Product"}
																value={influencer.product}
																onChange={(e) =>
																	this.handleChange(e, influencer.id)
																}
															/>
														</>
													) : (
														"Not acceptable"
													)}
												</b>
											</div>
										</div>
										{influencer.product &&
											influencer.product?.value &&
											influencer.product.type === "voucher" && (
												<div className="grid grid-cols-12 gap-5 mt-6">
													<div className="lg:col-span-2 col-span-12">
														<b className="font-normal">Discount</b>
														<Tooltip
															trigger={
																<BsQuestionCircle size={22} className="ml-2" />
															}
															tooltipText="Shows the discount details created in the assets
															section and assigned to the influencer in the
															campaign"
															placement="top-left"
														/>
													</div>
													<div className="lg:col-span-3 col-span-12">
														<b className="font-normal">
															Influencer Discount:{" "}
															{parseInt(
																influencer.product.influencer_discount || 0
															)}
															%
														</b>
													</div>
													{influencer.product.is_discount_for_follower && (
														<div className="lg:col-span-3 col-span-12">
															<b className="font-normal">
																Followers Discount:{" "}
																{parseInt(
																	influencer.product.follower_discount || 0
																)}
																%
															</b>
														</div>
													)}
													{influencer.product.is_comission && (
														<div className="lg:col-span-3 col-span-12">
															<b className="font-normal">
																Sales Commission:{" "}
																{parseInt(influencer.product.commission || 0)}%
															</b>
														</div>
													)}
												</div>
											)}
									</>
								)}
							</div>
						))}
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
				<Transition appear show={this.state.acceptShow} as={Fragment}>
					<Dialog
						onClose={() => this.setState({ acceptShow: false })}
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
											onClick={() => this.setState({ acceptShow: false })}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
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
												onClick={() => this.setState({ acceptShow: false })}
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
						onClose={() => this.setState({ rejectShow: false })}
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
											onClick={() => this.setState({ rejectShow: false })}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
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
												onClick={() => this.setState({ rejectShow: false })}
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.global.products,
		isProfileLoading: state.influencerSearch.isProfileLoading,
		platform: state.BrandBookingCampaignReducer.platform,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		waitingCampaignInfluencers:
			state.BrandBookingCampaignReducer.waitingCampaignInfluencers,
		brandMessage: state.BrandBookingCampaignReducer.brandMessage,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
		handleAcceptInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleAcceptInfluncerRequest(query)),
		handleRejectInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleRejectInfluncerRequest(query)),
		brandCampaignSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandCampaignSendMessage(query)),
		handleBrandMessage: (event) =>
			dispatch({ type: HANDEL_BRAND_SEND_MESSAGE, payload: event }),

		updateWaitingCampaignInfluencer: (data) =>
			dispatch({
				type: "UPDATE_WAITING_CAMPAIGN_INFLUENCER",
				payload: data,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WaitingForApprovalPanelTab);
