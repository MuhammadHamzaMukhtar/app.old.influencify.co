import { Component } from "react";
import { Tab } from "@headlessui/react";
import InfluencerCampaignsTodoTab from "./InfluencerCampaignsTodoTab";
import InfluencerCampaignsWaitingTab from "./InfluencerCampaignsWaitingTab";
import InfluencerCampaignsClosedTab from "./InfluencerCampaignsClosedTab";
import * as influencerBookingActions from "@store/actions/InfluencerBookingActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencerMyCampaign extends Component {
	componentDidMount() {
		this.props.fetchToDoInfluencerCampaigns();
	}

	handleChange = (event) => {
		if (event === 0) {
			this.props.fetchToDoInfluencerCampaigns();
		}
		if (event === 1) {
			this.props.fetchWaitingInfluencerCampaigns();
		}
		if (event === 2) {
			this.props.fetchClosedInfluencerCampaigns();
		}
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		return (
			<div className="campaigns-tab-header">
				<Helmet>
					<meta charSet="utf-8" />
					<title>My Campaigns | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="">
					<Tab.Group
						defaultIndex={0}
						onChange={(index) => {
							this.handleChange(index);
						}}
					>
						<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
							<div className="containers">
								<div className="flex flex-wrap">
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
											Todo
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
											Waiting
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
											Closed
										</Tab>
									</Tab.List>
								</div>
							</div>
						</div>
						<div className="containers">
							<Tab.Panels className="bg-transparent">
								<Tab.Panel>
									<InfluencerCampaignsTodoTab />
								</Tab.Panel>
								<Tab.Panel>
									<InfluencerCampaignsWaitingTab />
								</Tab.Panel>
								<Tab.Panel>
									<InfluencerCampaignsClosedTab />
								</Tab.Panel>
							</Tab.Panels>
						</div>
					</Tab.Group>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInfluencerCampaigns: () =>
			dispatch(influencerBookingActions.fetchInfluencerCampaigns()),
		fetchWaitingInfluencerCampaigns: () =>
			dispatch(influencerBookingActions.fetchWaitingInfluencerCampaigns()),
		fetchToDoInfluencerCampaigns: () =>
			dispatch(influencerBookingActions.fetchToDoInfluencerCampaigns()),
		fetchClosedInfluencerCampaigns: () =>
			dispatch(influencerBookingActions.fetchClosedInfluencerCampaigns()),
	};
};

export default connect(null, mapDispatchToProps)(InfluencerMyCampaign);
