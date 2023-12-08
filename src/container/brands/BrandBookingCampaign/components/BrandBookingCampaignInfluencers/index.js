import { Component } from "react";
import { Tab } from "@headlessui/react";
import RequestedPanelTab from "./RequestedPanelTab";
import WaitingForApprovalPanelTab from "./WaitingForApprovalPanelTab";
import WaitingForQuoteApprovalPanelTab from "./WaitingForQuoteApprovalPanelTab";
import WorkInProgressPanelTab from "./WorkInProgressPanelTab";
import ClosedPanelTab from "./ClosedPanelTab";
import RejectedPanelTab from "./RejectedPanelTab";
import AbortedPanelTab from "./AbortedPanelTab";
import CanceledPanelTab from "./CanceledPanelTab";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandBookingCampaignInfluencers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount() {
		const subTab = this.props.subTab;
		switch (subTab) {
			case "waiting":
				this.handleChange(1);
				break;
			case "inprogress":
				this.handleChange(2);
				break;
			case "closed":
				this.handleChange(3);
				break;
			case "rejected":
				this.handleChange(4);
				break;
			case "cancelled":
				this.handleChange(5);
				break;
			default:
				this.handleChange(0);
		}
	}

	handleChange = (event) => {
		this.setState({
			activeTab: event,
		});
	};

	render() {
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[50vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div className="">
				<div className="w-full">
					<Tab.Group
						defaultIndex={this.state.activeTab}
						onChange={(index) => {
							this.handleChange(index);
						}}
					>
						<div className="grid grid-cols-12 gap-5">
							<div className="md:col-span-3 col-span-12">
								<Tab.List className="flex flex-col mb-0 shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] rounded-[8px] overflow-hidden">
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Requested
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.requestedCampaignInfluencersCount}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Waiting for Approval
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.waitingCampaignInfluencersCount}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Work in Progress
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.inprogressCampaignInfluencersCount}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Closed
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.closedCampaignInfluencersCount}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Rejected
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.rejectedCampaignInfluencersCount}
										</div>
									</Tab>
									{/* <Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Aborted
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.abortedCampaignInfluencersCount}
										</div>
									</Tab> */}
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Canceled
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.canceledCampaignInfluencersCount}
										</div>
									</Tab>
								</Tab.List>
							</div>
							<div className="md:col-span-9 col-span-12">
								<Tab.Panels className="bg-transparent">
									<Tab.Panel>
										<RequestedPanelTab campaignId={this.props.campaignId} />
									</Tab.Panel>
									<Tab.Panel>
										{this.props.campaign.campaignType === "quoteCampaign" ? (
											<WaitingForQuoteApprovalPanelTab
												campaignId={this.props.campaignId}
											/>
										) : (
											<WaitingForApprovalPanelTab
												campaignId={this.props.campaignId}
											/>
										)}
									</Tab.Panel>
									<Tab.Panel>
										<WorkInProgressPanelTab
											campaignId={this.props.campaignId}
										/>
									</Tab.Panel>
									<Tab.Panel>
										<ClosedPanelTab campaignId={this.props.campaignId} />
									</Tab.Panel>
									<Tab.Panel>
										<RejectedPanelTab campaignId={this.props.campaignId} />
									</Tab.Panel>
									{/* <Tab.Panel>
										<AbortedPanelTab campaignId={this.props.campaignId} />
									</Tab.Panel> */}
									<Tab.Panel>
										<CanceledPanelTab campaignId={this.props.campaignId} />
									</Tab.Panel>
								</Tab.Panels>
							</div>
						</div>
					</Tab.Group>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		requestedCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.requestedCampaignInfluencersCount,
		waitingCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.waitingCampaignInfluencersCount,
		inprogressCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.inprogressCampaignInfluencersCount,
		closedCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.closedCampaignInfluencersCount,
		rejectedCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.rejectedCampaignInfluencersCount,
		abortedCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.abortedCampaignInfluencersCount,
		canceledCampaignInfluencersCount:
			state.BrandBookingCampaignReducer.canceledCampaignInfluencersCount,
		campaign: state.BrandBookingCampaignReducer.campaign,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/GlobalRedux");
	return {
		fetchUserProducts: (data) => {
			actions.fetchUserProducts(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandBookingCampaignInfluencers);
