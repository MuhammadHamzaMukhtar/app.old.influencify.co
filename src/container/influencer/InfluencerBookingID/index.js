import { Component } from "react";
import { Tab } from "@headlessui/react";
import InfluencerBookingPaymentTab from "./InfluencerBookingPaymentTab";
import InfluencerBookingQuotePaymentTab from "./InfluencerBookingTaskTab";
import InfluencerBookingSubHeader from "./InfluencerBookingSubHeader";
import InfluencerBookingOverviewTab from "./InfluencerBookingOverviewTab";
import InfluencerBookingContentTab from "./InfluencerBookingContentTab";
import InfluencerBookingMessageTab from "./InfluencerBookingMessageTab";
import InfluencersBookingNoTab from "./InfluencerBookingNoTab";
import InfluencerBookingContentPreviewTab from "./InfluencerBookingContentPreviewTab";
import { connect } from "react-redux";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import { HANDLE_CHANGE_CAMPAIGN_ID } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import { Helmet } from "react-helmet";
import InfluencerBookingInstructionTab from "./InfluencerBookingTaskTab";
import InfluencerBookingTaskTab from "./InfluencerBookingTaskTab";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencersBookingID extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0
		};
	}

	componentDidMount() {
		const id = this.props.params.id;
		this.fetchOverview();
		this.props.handleChangeCampaignId(id);
	}

	fetchOverview = async () => {
		const id = this.props.params.id;
		const tab = this.props.tab;
		await this.props.influencerBookingCampaignOverview(id, true);
		if (tab) {
			switch (tab) {
				case "content":
					this.handleChange(1);
					break;
				case "message":
					if (this.props.FlowStatus == "rejected") {
						this.handleChange(1);
					} else {
						this.handleChange(2);
					}
					break;
				default:
					this.handleChange(1);
			}
		}
	}

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.platformName !== this.props.platformName) {
	// 		if (this.props.platformName === "tiktok") {
	// 			this.props.fetchTiktokListVideo();
	// 		} else if (this.props.platformName === "youtube") {
	// 			this.props.fetchYoutubeListVideo();
	// 		} else if (this.props.platformName === "instagram") {
	// 			this.props.fetchInstagramPost();
	// 		}
	// 	}
	// }

	handleChange = (event) => {
		const id = this.props.campaignId;
		this.setState({ activeTab: event })
		switch (event) {
			case 0:
				this.props.influencerBookingCampaignOverview(id, true);
				break;
			case 1:
				if (this.props.FlowStatus == "rejected") {
					this.props.influencerBookingCampaignMessages(id);
				} else {
					this.props.influencerBookingCampaignContent(id);
				}
				break;
			case 2:
				this.props.influencerBookingCampaignMessages(id);
				break;
			default:
				this.props.influencerBookingCampaignOverview(id, true);
		}
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		if (this.props.isLoader) {
			return (
				<Loader
					className="h-[82vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		// let activeTab =
		// 	this.props.activeTab === "Overview"
		// 		? 0
		// 		: this.props.activeTab === "Tasks & Delivery"
		// 			? 1
		// 			: this.props.activeTab === "Message"
		// 				? 2
		// 				: this.props.activeTab === ""
		// 					? 3
		// 					: null;
		const campaignID = this.props.campaignId;
		const { campaignType, FlowStatus } = this.props;
		const { activeTab } = this.state;
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Campaign Booking | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="bg-[#ffff] py-[20px] border-[1px] border-[#ddd]">
					<div className="containers">
						<InfluencerBookingSubHeader campaignID={campaignID} />
					</div>
				</div>
				{this.props.isInfluencerAttached === 0 ? (
					<InfluencersBookingNoTab />
				) : (
					<div>
						<Tab.Group
							defaultIndex={activeTab}
							selectedIndex={activeTab}
							onChange={(index) => {
								this.handleChange(index);
							}}
						>
							<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
								<div className="containers">
									<Tab.List className="flex mb-0">
										<Tab
											className={({ selected }) =>
												classNames(
													"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
													selected
														? "font-semibold before:w-full"
														: "font-normal before:w-0"
												)
											}
										>
											Overview
										</Tab>
										{FlowStatus !== "rejected" &&
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Tasks & Delivery
											</Tab>
										}
										{/* {FlowStatus !== "closed" && */}
										<Tab
											className={({ selected }) =>
												classNames(
													"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
													selected
														? "font-semibold before:w-full"
														: "font-normal before:w-0"
												)
											}
										>
											Message
										</Tab>
										{/* } */}
										{/* <Tab
											className={({ selected }) =>
												classNames(
													"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
													selected
														? "font-semibold before:w-full"
														: "font-normal before:w-0"
												)
											}
										>
											Delivery
										</Tab> */}

									</Tab.List>
								</div>
							</div>
							<div className="containers mb-12">
								<Tab.Panels className="bg-transparent">
									<Tab.Panel>
										<InfluencerBookingOverviewTab campaignID={campaignID} />
									</Tab.Panel>
									<Tab.Panel>
										{FlowStatus == "rejected" ?
											<InfluencerBookingMessageTab campaignID={campaignID} /> :
											(campaignType === "quoteCampaign" ? (
												<InfluencerBookingTaskTab
													campaignID={campaignID}
												/>
											) : (
												<InfluencerBookingPaymentTab campaignID={campaignID} />
											))
										}
									</Tab.Panel>
									<Tab.Panel>
										<InfluencerBookingMessageTab campaignID={campaignID} />
									</Tab.Panel>
									<Tab.Panel>
										{(this.props.FlowStatus === "inprogress" ||
											this.props.FlowStatus === "workdone" ||
											this.props.FlowStatus === "closed") &&
											!this.props.campaignPreview ? (
											<InfluencerBookingContentTab campaignID={campaignID} />
										) : (this.props.FlowStatus === "inprogress" ||
											this.props.FlowStatus === "preview" ||
											this.props.FlowStatus === "workdone" ||
											this.props.FlowStatus === "closed") &&
											this.props.campaignPreview ? (
											<InfluencerBookingContentPreviewTab
												campaignID={campaignID}
											/>
										) : (
											<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
												We have nothing to show you here.
											</div>
										)}
									</Tab.Panel>
								</Tab.Panels>
							</div>
						</Tab.Group>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeTab: state.InfluencersBookingIDReducer.activeTab,
		isLoader: state.InfluencersBookingIDReducer.isLoader,
		campaignId: state.InfluencersBookingIDReducer.campaignId,
		typeName: state.InfluencersBookingIDReducer.typeName,
		isInfluencerAttached:
			state.InfluencersBookingIDReducer.isInfluencerAttached,
		campaignInfluencerStatus:
			state.InfluencersBookingIDReducer.campaignInfluencerStatus,
		FlowStatus: state.InfluencersBookingIDReducer.FlowStatus,
		campaignPreview: state.InfluencersBookingIDReducer.campaignPreview,
		previewApprovedFlag: state.InfluencersBookingIDReducer.previewApprovedFlag,
		campaignType: state.InfluencersBookingIDReducer.campaignType,
		platformName: state.InfluencersBookingIDReducer.platformName,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		influencerBookingCampaignOverview: (id, flag) => {
			return dispatch(influencersBookingIDActions.influencerBookingCampaignOverview(id, flag));
		},
		influencerBookingCampaignTask: () =>
			dispatch(
				influencersBookingIDActions.influencerBookingCampaignTask()
			),
		influencerBookingCampaignContent: (id) =>
			dispatch(
				influencersBookingIDActions.influencerBookingCampaignContent(id)
			),
		influencerBookingCampaignMessages: (id) =>
			dispatch(
				influencersBookingIDActions.influencerBookingCampaignMessages(id)
			),
		handleChangeCampaignId: (id) =>
			dispatch({ type: HANDLE_CHANGE_CAMPAIGN_ID, payload: id }),
		fetchTiktokListVideo: () =>
			dispatch(influencersBookingIDActions.fetchTiktokListVideo()),
		fetchYoutubeListVideo: () =>
			dispatch(influencersBookingIDActions.fetchYoutubeListVideo()),
		fetchInstagramPost: () =>
			dispatch(influencersBookingIDActions.influencerInstagramPosts()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencersBookingID);
