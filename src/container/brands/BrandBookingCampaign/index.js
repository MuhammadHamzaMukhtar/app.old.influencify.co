import { Component } from "react";
import { Tab } from "@headlessui/react";
import BrandBookingSubHeader from "./components/BrandBookingSubHeader";
import BrandBookingCampaignOverview from "./components/BrandBookingCampaignOverview";
import BrandBookingCampaignInfluencers from "./components/BrandBookingCampaignInfluencers";
import BrandBookingCampaignContent from "./components/BrandBookingCampaignContent";
import BrandBookingCampaignMessages from "./components/BrandBookingCampaignMessages";
import BrandBookingCampaignBrief from "./components/BrandBookingCampaignBrief";
import BrandBookingCampaignActivity from "./components/BrandBookingCampaignActivity";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS } from "@store/constants/action-types";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandBookingCampaign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const id = this.props.id;
		this.props.handleChangeDropdown(id);
		this.props.fetchDropDownClosedCampaigns();
		this.props.fetchDropDownActiveCampaigns();
		this.fetchCampaignOverview(id)
		// if (this.props.campaign.campaignStatus == "closed") {
		// } else {
		// }
		// if (this.props.activeCampaignTab === 0) {
		// 	this.props.fetchDropDownActiveCampaigns();
		// }
		// if (this.props.activeCampaignTab === 1) {
		// 	this.props.fetchDropDownDraftCampaigns();
		// }
		// if (this.props.activeCampaignTab === 2) {
		// }

		const param = this.props.name;
		switch (param) {
			case "?tab=influencers":
				this.handleChange(1);
				break;
			case "?tab=content":
				this.handleChange(2);
				break;
			case "?tab=message":
				this.handleChange(3);
				break;
			default:
				this.handleChange(0);
		}
	};

	fetchCampaignOverview = async (id) => {
		await this.props.brandBookingCampaignOverview(id);
	}

	componentDidUpdate(preProps) {
		if (preProps.campaign && this.props.campaign) {
			if (
				preProps.campaign.campaignStatus !== this.props.campaign.campaignStatus
			) {
				if (this.props.campaign.campaignStatus === "draft") {
					this.props.navigate("/brand/campaign/" + this.props.campaign.id);
				}
			}
		}
	}

	handleChange = (event) => {
		this.setState({ activeTab: event });
		const id = this.props.id;

		switch (event) {
			case 0:
				// this.props.brandBookingCampaignOverview(id);
				break;
			case 1:
				this.props.brandBookingCampaignInfluencers(id);
				break;
			case 2:
				this.props.brandBookingCampaignContent(id);
				break;
			case 3:
				this.props.brandBookingCampaignChatUsers(id);
				let query = {
					campaignId: id,
				};
				this.props.fetchChatUserMessages(query, "default");
				break;
			case 4:
				if (this.props.campaign.campaignStatus == "closed") {
					this.props.brandBookingCampaignActivites(id);
				}
				break;
			case 5:
				this.props.brandBookingCampaignActivites(id);
				break;
			default:
				this.props.brandBookingCampaignOverview(id);
		}
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		const id = this.props.campaignId;
		// if (this.props.isLoading) {
		// 	return (
		// 		<Loader
		// 			className="h-[87vh] w-full flex justify-center items-center"
		// 			size="67"
		// 		/>
		// 	);
		// }
		if (this.props.notifyType === "chatMessage") {
			this.setState({ activeTab: 3 });
		}
		const { activeTab } = this.state;

		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Campaign Booking | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="py-[20px] bg-white border-[1px] border-[#ddd] min-h-[82px]">
					<div className="containers">
						<BrandBookingSubHeader navigate={this.props.navigate} />
					</div>
				</div>
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
								<Tab.List className="flex flex-wrap mb-0">
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
										Influencers ({this.props.allCampaignInfluencersCount})
									</Tab>
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
										Content ({this.props.allCampaignContentsCount})
									</Tab>
									{/* {(parseInt(this.props.campaign.chatInfluencers) > 0 || undefined) && */}
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
										Brief
									</Tab>
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
										Activity
									</Tab>
								</Tab.List>
							</div>
						</div>
						<div className="containers mb-12">
							<Tab.Panels className="bg-transparent">
								<Tab.Panel>
									<BrandBookingCampaignOverview />
								</Tab.Panel>
								<Tab.Panel>
									<BrandBookingCampaignInfluencers campaignId={id} subTab={this.props.subTab} />
								</Tab.Panel>
								<Tab.Panel>
									<BrandBookingCampaignContent campaignId={id} subTab={this.props.subTab} />
								</Tab.Panel>
								{/* {(parseInt(this.props.campaign.chatInfluencers) > 0 || undefined) && */}
								<Tab.Panel>
									<BrandBookingCampaignMessages campaignId={id} />
								</Tab.Panel>
								{/* } */}
								<Tab.Panel>
									<BrandBookingCampaignBrief />
								</Tab.Panel>
								<Tab.Panel>
									<BrandBookingCampaignActivity />
								</Tab.Panel>
							</Tab.Panels>
						</div>
					</Tab.Group>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		notifyType: state.BrandBookingCampaignReducer.notifyType,
		randomNumber: state.BrandBookingCampaignReducer.randomNumber,
		campaignId: state.BrandBookingCampaignReducer.campaignId,
		allCampaignInfluencersCount: state.BrandBookingCampaignReducer.allCampaignInfluencersCount,
		allCampaignContentsCount: state.BrandBookingCampaignReducer.allCampaignContentsCount,
		activeCampaignTab: state.CampaignReducer.activeCampaignTab,
		platform: state.BrandBookingCampaignReducer.platform,
		campaign: state.BrandBookingCampaignReducer.campaign,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		brandBookingCampaignInfluencers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignInfluencers(id)),
		brandBookingCampaignContent: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignContent(id)),
		brandBookingCampaignBrief: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignBrief(id)),
		brandBookingCampaignActivites: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignActivites(id)),
		brandBookingCampaignChatUsers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignChatUsers(id)),
		fetchChatUserMessages: (query, param) =>
			dispatch(brandBookingCampaignActions.fetchChatUserMessages(query, param)),
		brandBookingCampaignOverview: (query) => { return brandBookingCampaignActions.brandBookingCampaignOverview(dispatch, query) },
		fetchDropDownActiveCampaigns: () =>
			dispatch(brandBookingCampaignActions.fetchDropDownActiveCampaigns()),
		fetchDropDownDraftCampaigns: () =>
			dispatch(brandBookingCampaignActions.fetchDropDownDraftCampaigns()),
		fetchDropDownClosedCampaigns: () =>
			dispatch(brandBookingCampaignActions.fetchDropDownClosedCampaigns()),
		handleChangeDropdown: (id) =>
			dispatch({
				type: BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS,
				payload: id,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandBookingCampaign);
