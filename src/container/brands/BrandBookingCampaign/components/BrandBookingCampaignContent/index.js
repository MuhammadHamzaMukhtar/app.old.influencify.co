import { Component } from "react";
import { Tab } from "@headlessui/react";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import ContentWaitingTab from "./ContentWaitingTab";
import ContentPendingApprovalTab from "./ContentPendingApprovalTab";
import ContentAcceptedTab from "./ContentAcceptedTab";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandBookingCampaignContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount(){
		const subTab = this.props.subTab;

		switch (subTab) {
			case "pending":
				this.handleChange(1);
				break;
			default:
				this.handleChange(0);
		}
	}
	
	handleChange = (event) => {
		this.setState({ activeTab: event });
		// const id = this.props.id;

		// switch (event) {
		// 	case 0:
		// 		this.props.brandBookingCampaignOverview(id);
		// 		break;
		// 	case 1:
		// 		this.props.brandBookingCampaignInfluencers(id);
		// 		break;
		// 	case 2:
		// 		this.props.brandBookingCampaignContent(id);
		// 		break;
		// 	default:
		// 		this.props.brandBookingCampaignOverview(id);
		// }
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
		const { activeTab } = this.state;

		return (
			<div className="campaigns-page">
				<div className="InfluencersContent w-full">
					<Tab.Group 
						defaultIndex={activeTab}
						selectedIndex={activeTab}
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
										Waiting for content
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{(this.props.waitingCampaignContents || []).length}
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
										Pending approval
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{(this.props.pendingCampaignContents || []).length}
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
										Accepted
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{(this.props.acceptedCampaignContents || []).length}
										</div>
									</Tab>
								</Tab.List>
							</div>
							<div className="md:col-span-9 col-span-12">
								<Tab.Panels className="bg-transparent">
									<Tab.Panel>
										<ContentWaitingTab />
									</Tab.Panel>
									<Tab.Panel>
										<ContentPendingApprovalTab
											campaignId={this.props.campaignId}
											subTab={this.props.subTab}
										/>
									</Tab.Panel>
									<Tab.Panel>
										<ContentAcceptedTab />
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
		waitingCampaignContents:
			state.BrandBookingCampaignReducer.waitingCampaignContents,
		pendingCampaignContents:
			state.BrandBookingCampaignReducer.pendingCampaignContents,
		acceptedCampaignContents:
			state.BrandBookingCampaignReducer.acceptedCampaignContents,
	};
};
export default connect(mapStateToProps, null)(BrandBookingCampaignContent);
