import { Component, Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import avatar from "@assets/avatar.png";
import MessageModal from "@components/MessageModal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import { HANDEL_BRAND_SEND_MESSAGE } from "@store/constants/action-types";
import Emitter from "../../../../../constants/Emitter";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";

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

class AbortedPanelTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			openDialog: false,
			influencerId: "",
			profileModal: false,
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
		// if (this.props.refreshData.is_admin) {
		// 	if (id) {
		// 		this.setState({
		// 			profileModal: true,
		// 		});
		// 		let query = {
		// 			platform: platform,
		// 			user_id: id,
		// 		};
		// 		this.props.viewInfluencerProfile(id);
		// 	}
		// } else {
		// 	Emitter.emit("PERMISSION_POPUP");
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
		if (this.props.refreshData.is_admin) {
			this.setState({
				openDialog: false,
			});
			this.props.brandCampaignSendMessage(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	render() {
		const { isProfileLoading, platform } = this.props;
		return (
			<div>
				{this.props.abortedCampaignInfluencers.length ? (
					<div className="mt-12 md:!mt-0">
						<div className="bg-white rounded-[8px] p-3 bg-transparent lg:block hidden mb-4">
							<div className="grid grid-cols-12 gap-5 items-center">
								<div className="lg:col-span-3 col-span-12">
									<b className="font-normal">Name</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Reach</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Avg. Engssagement</b>
								</div>
								<div className="lg:col-span-2 col-span-12">
									<b className="font-normal">Est. Spending</b>
								</div>
							</div>
						</div>
						{this.props.abortedCampaignInfluencers.map((influencer, index) => (
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-4">
								<div
									className="grid grid-cols-12 gap-5 items-center"
									key={index}
								>
									<div className="lg:col-span-3 md:col-span-5 sm:col-span-4 col-span-11 flex items-center sm:justify-start justify-center">
										<img
											src={
												influencer.basicInfo &&
												influencer.basicInfo.profile_picture_url
													? influencer.basicInfo.profile_picture_url
													: avatar
											}
											alt={influencer.displayname}
											className="overflow-hidden rounded-full w-[52px] h-[52x]"
										/>
										<div className="ml-2">
											<h5 className="  text-[18px]">
												<Link
													to="#"
													onClick={() =>
														this.handleInfluencerProfileModal(influencer)
													}
													className="card-link"
												>
													{influencer.displayname}
												</Link>
											</h5>
											<span className="panel-status">
												@{influencer.basicInfo.infl_username}
											</span>
										</div>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="col-sm-2 text-center sm:text-left">
										<h4 className=" text-[20px]">
											<FormatedNumber
												num={influencer.basicInfo.followers_count}
											/>
										</h4>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className=" text-[20px]">
											{influencer.basicInfo &&
											influencer.basicInfo.engagement_rate
												? influencer.basicInfo.engagement_rate
												: 0}
											%
										</h4>
									</div>

									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 text-center sm:!text-left">
										<h4 className=" text-[20px]">
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
										<svg onClick={() =>
															this.handleInfluencerProfileModal(influencer)
														} className="text-purple-600 cursor-pointer ml-2"  width="18"  height="18"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

									</div>
								</div>
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
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isProfileLoading: state.influencerSearch.isProfileLoading,
		platform: state.BrandBookingCampaignReducer.platform,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		abortedCampaignInfluencers:
			state.BrandBookingCampaignReducer.abortedCampaignInfluencers,
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
		brandCampaignSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandCampaignSendMessage(query)),
		handleBrandMessage: (event) =>
			dispatch({ type: HANDEL_BRAND_SEND_MESSAGE, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AbortedPanelTab);
