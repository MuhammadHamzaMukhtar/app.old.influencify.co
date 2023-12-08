import { Component, Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import avatar from "@assets/avatar.png";
import MessageModal from "@components/MessageModal";
import { connect } from "react-redux";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import Emitter from "../../../../../constants/Emitter";
import Button from "@components/global/Button";
import { HANDEL_BRAND_SEND_MESSAGE } from "@store/constants/action-types";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";

class ContentWaitingTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			show: false,
			openDialog: false,
			influencerId: "",
			profileModal: false,
		};
	}

	setModalShow = (event, id) => {
		if (this.props.refreshData.is_admin) {
			this.setState({
				modalShow: event,
				influencerId: id
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleClose = () => {
		this.setState({
			show: false,
			openDialog: false,
			profileModal: false,
		});
	};

	handleMessageChange = (e) => {
		this.props.handleBrandMessage(e);
	};

	handleInfluencerProfileModal = async (id) => {
		const { platform } = this.props;
		if (id) {
			
			let query = {
				platform: platform,
				user_id: id,
			};
			await this.props.viewInfluencerProfile(id);
			this.setState({
				profileModal: true,
			});
		}
	};

	sendBrandMessage = (id) => {
		let query = {
			brandMessage: this.props.brandMessage,
			influencerId: this.state.influencerId,
			campaignId: id,
		};
		this.setState({
			openDialog: false,
		});
		this.props.brandCampaignSendMessage(query);
	};

	render() {
		const { isProfileLoading, platform } = this.props;
		return (
			<div>
				{this.props.waitingCampaignContents.length ? (
					<div className="mt-12 md:!mt-0">
						<div className="bg-white rounded-[8px] p-3 bg-transparent lg:block hidden">
							<div className="grid grid-cols-12 gap-5 items-center">
								<div className="lg:col-span-4 col-span-12">
									<b className="font-normal">Name</b>
								</div>
								<div className="lg:col-span-3 col-span-12">
									<b className="font-normal">DeadLine</b>
								</div>
								<div className="lg:col-span-3 col-span-12">
									<b className="font-normal">Waiting</b>
								</div>
							</div>
						</div>
						{this.props.waitingCampaignContents.map((content, index) => (
							<div key={index} className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-4">
								<div
									className="grid grid-cols-12 gap-5 items-center"
									key={index}
								>
									<div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-11 flex items-center sm:justify-start justify-center">
										<img
											src={
												content.campaignInfluencerInfo &&
												content.campaignInfluencerInfo.profile_picture_url
													? content.campaignInfluencerInfo.profile_picture_url
													: avatar
											}
											alt={content.infleuncerName}
											className="rounded-full w-[52px] h-[52px] overflow-hidden"
										/>
										<div className="ml-2">
											<h5 className="text-[18px]">
												<Link
													to="#"
													onClick={() =>
														this.handleInfluencerProfileModal(
															content.campaignInfluencerInfo &&
																content.campaignInfluencerInfo.iq_user_id
																? content.campaignInfluencerInfo.iq_user_id
																: ""
														)
													}
													className="card-link"
												>
													{content.campaignInfluencerInfo.infl_name}
												</Link>
											</h5>
											<span className="font-normal text-[#9ea1b2]">
												@{content.campaignInfluencerInfo.infl_username}
											</span>
										</div>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-3 col-span-12 text-center sm:!text-left">
										<h4 className="black font-medium text-[16px]">
											{content.campaign.campaignDate.formatedPostingTo}
										</h4>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-3 col-span-12 text-center sm:!text-left">
										<h4 className="black font-medium text-[16px]">1</h4>
									</div>
									<div className="bg-[#0000001f] h-[1px] block my-4 sm:hidden w-full" />
									<div className="sm:col-span-2 col-span-12 sm:!mt-4 lg:!mt-0 flex sm:justify-end justify-center">
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
																onClick={() => this.setModalShow(true, content.infleuncerUniqueId)}
																className="text-[14px] p-3 w-full text-left"
																text="Send message"
															/>
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
										<MessageModal
											show={this.state.modalShow}
											handleChangeMessage={(e) => this.handleMessageChange(e)}
											brandMessage={this.props.brandMessage}
											messageSend={() => this.sendBrandMessage(content.campaign.id)}
											onHide={() => this.setModalShow(false)}
										/>
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
		waitingCampaignContents:
			state.BrandBookingCampaignReducer.waitingCampaignContents,
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
		handleBrandMessage: (event) =>
			dispatch({ type: HANDEL_BRAND_SEND_MESSAGE, payload: event }),
		brandCampaignSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandCampaignSendMessage(query)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentWaitingTab);
