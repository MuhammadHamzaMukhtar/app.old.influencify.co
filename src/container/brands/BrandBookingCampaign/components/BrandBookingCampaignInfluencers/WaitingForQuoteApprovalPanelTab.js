import { Component, Fragment } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { HiDotsHorizontal } from "react-icons/hi";
import avatar from "@assets/avatar.png";
import MessageModal from "@components/MessageModal";
import { FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import { HANDEL_BRAND_SEND_MESSAGE, HANDEL_REJECT_MESSAGE_OPTIONAL } from "@store/constants/action-types";
import Emitter from "../../../../../constants/Emitter";
import { BsQuestionCircle } from "react-icons/bs";
import Button from "@components/global/Button";
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

class WaitingForQuoteApprovalPanelTab extends Component {
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
			revision: 0,
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
			campaign_id:this.props.campaignId,
			user_id:influencer.id
		}
		Emitter.emit("INFLUENCER_POPUP", data);
	};

	handleClose = () => {
		this.setState({
			openDialog: false,
			profileModal: false,
		});
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

	addDefaultSrc(ev) {
		ev.target.src = avatar;
	}

	handleAcceptShow = (e) => {
		this.setState({
			acceptShow: true,
			influencerId: e,
		});
	};

	handleRejectShow = (e, revision) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				rejectShow: true,
				influencerId: e,
				revision: revision,
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
		this.props.handleAcceptInfluncerRequest(query);
	};

	handleRejectChange = (e) => {
		this.props.handleRejectMessage(e);
	};

	brandBookingCampaignReject = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		this.props.handleRejectInfluncerRequest(query);
	};

	brandBookingCampaignRevision = () => {
		let query = {
			influencerId: this.state.influencerId,
			campaignId: this.props.campaignId,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
			revision: true,
		};
		this.props.handleRejectInfluncerRequest(query);
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
		this.setState({ product_id: value ? value.value : "" });
		this.props.updateWaitingCampaignInfluencer(data);
	};

	selectInfluencers = (influencer) => {
		if (this.props.refreshData.is_admin) {
			const { refreshData } = Object.assign({}, this.props);
			let handling_fee = 0;
			let service_fee = 0;
			let total_spendable = 0;
			let budget = 0;
			let products = [];
			const campaignCommission =
				refreshData && refreshData.offer ? refreshData.offer.serviceFee : 0;
			const form = Object.assign({}, this.props.form);
			const campaign = Object.assign({}, this.props.campaign);
			const influencers = Object.assign([], this.props.form.influencers);
			const index = influencers.findIndex((i) => i.id === influencer.id);
			if (index > -1) {
				influencers.splice(index, 1);
			} else {
				influencers.push(influencer);
			}
			influencers.map((item) => {
				total_spendable += parseFloat(item.price) || 0;
				if (item.product) {
					products.push(item.product);
				}
			});
			if (total_spendable > 0 && campaign.payment_processing === 1) {
				handling_fee = (total_spendable + 0.3) / (1 - 0.029) - total_spendable;
			}
			if (total_spendable > 0 && campaign.payment_processing === 1) {
				service_fee = (total_spendable * (campaignCommission || 0)) / 100;
			}
			if (total_spendable > 0) {
				budget = total_spendable + service_fee + handling_fee;
			}
			form["influencers"] = influencers;
			form["total_spendable"] = total_spendable.toFixed(2);
			form["handling_fee"] = handling_fee.toFixed(2);
			form["service_fee"] = service_fee.toFixed(2);
			form["budget"] = budget.toFixed(2);
			form["campaign_id"] = this.props.campaignId;
			form["products"] = products;
			this.props.addForm(form);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	acceptQuotePrice = async () => {
		const form = Object.assign({}, this.props.form);
		const json = await this.props.acceptQuotePrice(form);
		if (json.success) {
			this.props.addForm({});
			this.props.brandBookingCampaignInfluencers(this.props.campaignId);
		}
	};

	updateBudget = () => {
		if (this.props.refreshData.is_admin) {
			const { refreshData } = Object.assign({}, this.props);
			let handling_fee = 0;
			let service_fee = 0;
			let total_spendable = 0;
			let budget = 0;
			let products = [];
			const campaignCommission =
				refreshData && refreshData.offer ? refreshData.offer.serviceFee : 0;
			const form = Object.assign({}, this.props.form);
			const campaign = Object.assign({}, this.props.campaign);
			const influencers = Object.assign([], this.props.form.influencers);
			influencers.map((item) => {
				total_spendable += parseFloat(item.price) || 0;
				if (item.product) {
					products.push(item.product);
				}
			});
			if (total_spendable > 0 && campaign.payment_processing === 1) {
				handling_fee = (total_spendable + 0.3) / (1 - 0.029) - total_spendable;
			}
			if (total_spendable > 0 && campaign.payment_processing === 1) {
				service_fee = (total_spendable * (campaignCommission || 0)) / 100;
			}
			if (total_spendable > 0) {
				budget = total_spendable + service_fee + handling_fee;
			}
			form["influencers"] = influencers;
			form["total_spendable"] = total_spendable.toFixed(2);
			form["handling_fee"] = handling_fee.toFixed(2);
			form["service_fee"] = service_fee.toFixed(2);
			form["budget"] = budget.toFixed(2);
			form["campaign_id"] = this.props.campaignId;
			form["products"] = products;
			this.props.addForm(form);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	render() {
		const influencers = Object.assign([], this.props.form.influencers);
		const {
			acceptQuotePriceError,
			acceptQuotePriceLoading,
			isProfileLoading,
			platform,
			waitingCampaignInfluencers,
			campaign,
			currentLoggedUser,
			form,
			refreshData,
		} = this.props;
		//const products = this.props.products.length ? this.props.products.map(data =>({label:data.name,value:data.id, price:data.value})) : [];
		return (
			<div>
				{waitingCampaignInfluencers.length ? (
					<div className="mt-12 md:!mt-0">
						{influencers.length > 0 && (
							<div className="grid grid-cols-12 gap-5 items-center">
								<div className="lg:col-span-4 col-span-12"></div>
								<div className="lg:col-span-8 col-span-12">
									<div className="flex items-center justify-end">
										<div>
											<div className="flex items-center justify-between">
												<strong>Subtotal</strong>
												<strong className="font-medium ml-2">
													{form &&
														form.total_spendable &&
														(form.total_spendable || 0)}{" "}
													{currentLoggedUser.currency_code || "USD"}
												</strong>
											</div>
											{campaign.payment_processing === 1 && (
												<>
													<div className="flex items-center justify-between">
														<strong>
															Service fee ({refreshData?.offer?.serviceFee}
															%)
															<Tooltip
																trigger={
																	<BsQuestionCircle
																		size={22}
																		className="ml-2"
																	/>
																}
																tooltipText="This helps us operate our platform and offer 24/7
															customer support for your orders"
																placement="top-left"
															/>
														</strong>
														<strong className="font-medium ml-2">
															{form &&
																form.service_fee &&
																(
																	Number(form.service_fee || 0) +
																	Number(form.handling_fee || 0)
																).toFixed(2)}{" "}
															{currentLoggedUser.currency_code || "USD"}
														</strong>
													</div>
												</>
											)}
											<div className="flex items-center justify-between">
												<strong>Total</strong>
												<strong className="font-medium ml-2">
													{form && form.budget && (form.budget || 0)}{" "}
													{currentLoggedUser.currency_code || "USD"}
												</strong>
											</div>
											{form.products &&
												form.products.length > 0 &&
												form.products.map((product, key) => (
													<div key={key}>
														<strong>{product.label}</strong>
														<strong className="font-medium">
															${product.price}
														</strong>
													</div>
												))}
										</div>
									</div>
									{campaign.payment_processing !== 1 && (
										<div className="bg-[#f8d7da] p-3 rounded-[8px] mt-2">
											Use the messaging section to agree with the influencers on
											how they will be compensated ...
										</div>
									)}
									<div className="flex justify-end">
										{acceptQuotePriceLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink mt-2" />
										) : (
											<>
												<Button
													onClick={() => this.acceptQuotePrice()}
													className="px-[1rem] rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2"
													text={
														campaign.payment_processing !== 1
															? "Promise To Pay"
															: "Pay Now"
													}
												/>
											</>
										)}
									</div>
									{!!acceptQuotePriceError && (
										<p className="red mt-1">{acceptQuotePriceError}</p>
									)}
								</div>
							</div>
						)}
						<div className="bg-white rounded-[8px] p-3 bg-transparent lg:block hidden mb-4">
							<div className="grid grid-cols-12 gap-5 items-center">
								<div className="lg:col-span-3 col-span-12">
									<strong className="font-normal">Name</strong>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<strong className="font-normal">Reach</strong>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<strong className="font-normal">Avg. Engagement</strong>
								</div>
								<div className="lg:col-span-2 col-span-12 flex items-center">
									<strong className="font-normal">Est. Spending</strong>
									<Tooltip
										trigger={<BsQuestionCircle size={18} className="ml-2" />}
										tooltipText="Price excludes service fee and payment processing fee"
										placement="top-left"
									/>
								</div>
							</div>
						</div>

						{waitingCampaignInfluencers.map((influencer, index) => (
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-4">
								<div
									className="grid grid-cols-12 gap-5 items-center"
									key={index}
								>
									<div onClick={() =>
														this.handleInfluencerProfileModal(influencer)
													} className="cursor-pointer lg:col-span-3 md:col-span-5 sm:col-span-4 col-span-11 flex items-center sm:justify-start justify-center">
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
													
													className="card-link "
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
										<h4 className="text-[18px]">
											<FormatedNumber
												num={influencer.basicInfo.followers_count}
											/>
										</h4>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className="text-[18px]">
											{influencer.basicInfo &&
												influencer.basicInfo.engagement_rate
												? influencer.basicInfo.engagement_rate
												: 0}
											%
										</h4>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className="text-[18px]">
											{influencer.price}
											{this.props.campaign.currency_code ?? "USD"}{" "}
										</h4>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 ml-auto sm:!mt-4 lg:!mt-0 flex sm:justify-end justify-center">
										<div className="flex flex-row items-center">
											{/* {influencer.is_sent === 1 && (
												<label
													htmlFor="approveall"
													className="cursor-pointer flex items-center text-[15px] font-normal mr-3"
												>
													<input
														id="approveall"
														type="checkbox"
														checked={
															influencers.find((i) => i.id === influencer.id)
																? true
																: false
														}
														onChange={() => this.selectInfluencers(influencer)}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													{influencers.find((i) => i.id === influencer.id)
														? "Cancel"
														: "Approve"}
												</label>
											)} */}
											{!influencer.campaign_payment?.has_gift_product && !influencer.campaign_payment?.has_influencer_email && !influencer.campaign_payment?.is_influencer_propose ?
												"" :
												<Menu
													as="div"
													className={`relative inline-block text-left`}
												>
													<Menu.Button
														as="div"
														className="inline-flex items-center cursor-pointer"
													>
														<HiDotsHorizontal size={20} className="darkGray" />
													</Menu.Button>
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
															{/* {campaign.campaignType === "quoteCampaign" &&
																influencer.is_sent === 1 ? (
																<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																	<Menu.Item>
																		<Button
																			onClick={() =>
																				this.handleRejectShow(
																					influencer.id,
																					influencer.revision
																				)
																			}
																			className="text-[14px] p-3 w-full text-left"
																			text="Reject"
																		/>
																	</Menu.Item>
																</div>
															) : (
																<div className="px-1 hover:bg-[#0000000a] rounded-[8px]">
																	<span className="text-[#6c757d] px-4 whitespace-nowrap">
																		Waiting from influencer
																	</span>
																</div>
															)} */}
														</Menu.Items>
													</Transition>
												</Menu>
											}
										</div>
										<MessageModal
											handleChangeMessage={(e) => this.handleMessageChange(e)}
											show={this.state.modalShow}
											brandMessage={this.props.brandMessage}
											messageSend={() => this.sendBrandMessage()}
											onHide={() => this.setModalShow(false)}
										/>
										<svg onClick={() =>
															this.handleInfluencerProfileModal(influencer)
														} className="text-purple-600 cursor-pointer ml-2"  width="18"  height="18"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

									</div>
								</div>
								

								{/* {influencer.product &&
									influencer.product?.value &&
									influencer.product.type === "voucher" && (
										<div className="grid grid-cols-12 gap-5 mt-6">
											<div className="lg:col-span-2 col-span-12">
												<strong className="font-normal">Discount</strong>
												<Tooltip
													trigger={
														<BsQuestionCircle size={22} className="ml-2" />
													}
													tooltipText="Shows the discount details created in the assets
													section and assigned to the influencer in the campaign"
													placement="top-left"
												/>
											</div>
											<div className="lg:col-span-3 col-span-12">
												<strong className="font-normal">
													Influencer Discount:{" "}
													{parseInt(
														influencer.product.influencer_discount || 0
													)}
													%
												</strong>
											</div>
											{influencer.product.is_discount_for_follower && (
												<div className="lg:col-span-3 col-span-12">
													<strong className="font-normal">
														Followers Discount:{" "}
														{parseInt(
															influencer.product.follower_discount || 0
														)}
														%
													</strong>
												</div>
											)}
											{influencer.product.is_comission && (
												<div className="lg:col-span-3 col-span-12">
													<strong className="font-normal">
														Sales Commission:{" "}
														{parseInt(influencer.product.commission || 0)}%
													</strong>
												</div>
											)}
										</div>
									)} */}
							</div>
						))}
					</div>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}

				<InfluencerProfileModal
					newCampaignWithSelected={false}
					isProfileLoading={isProfileLoading}
					platform={platform}
					open={this.state.profileModal}
					onClose={() => this.handleClose()}
				/>
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
													this.handleRejectChange(event)
												}
											></textarea>
										</div>
										{/* <div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
												onClick={() => this.setState({ rejectShow: false })}
												text="Cancel"
											/>
											{this.state.revision <= 3 && (
												<Button
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mr-2"
													onClick={this.brandBookingCampaignRevision}
													text="Revision"
												/>
											)}
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={this.brandBookingCampaignReject}
												text="Reject"
											/>
										</div> */}
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
		acceptQuotePriceError: state.influencerSearch.acceptQuotePriceError,
		acceptQuotePriceLoading: state.influencerSearch.acceptQuotePriceLoading,
		platform: state.BrandBookingCampaignReducer.platform,
		rejectOptionalMessage: state.InfluencersBookingIDReducer.rejectOptionalMessage,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		waitingCampaignInfluencers:
			state.BrandBookingCampaignReducer.waitingCampaignInfluencers,
		brandMessage: state.BrandBookingCampaignReducer.brandMessage,
		form: state.influencerSearch.quotePriceInfluencerForm,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
		addForm: (data) => {
			actions.quotePriceInfluencerForm(dispatch, data);
		},
		acceptQuotePrice: (data) => {
			return actions.acceptQuotePrice(dispatch, data);
		},
		handleAcceptInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleAcceptInfluncerRequest(query)),
		handleRejectInfluncerRequest: (query) =>
			dispatch(brandBookingCampaignActions.handleRejectInfluncerRequest(query)),
		brandCampaignSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandCampaignSendMessage(query)),
		handleBrandMessage: (event) =>
			dispatch({ type: HANDEL_BRAND_SEND_MESSAGE, payload: event }),
		handleRejectMessage: (event) =>
			dispatch({ type: HANDEL_REJECT_MESSAGE_OPTIONAL, payload: event }),

		updateWaitingCampaignInfluencer: (data) =>
			dispatch({
				type: "UPDATE_WAITING_CAMPAIGN_INFLUENCER",
				payload: data,
			}),
		brandBookingCampaignInfluencers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignInfluencers(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WaitingForQuoteApprovalPanelTab);
