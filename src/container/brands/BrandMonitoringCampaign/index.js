import { Component } from "react";
import { Tab } from "@headlessui/react";
import MonitoringActiveCampaigns from "./MonitoringActiveCampaigns";
import MonitoringClosedCampaigns from "./MonitoringClosedCampaigns";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Emitter from "../../../constants/Emitter";
import LinkTo from "@components/global/LinkTo";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

class BrandMonitoringCampaign extends Component {
	permissionDenied = () => {
		if (!this.props.refreshData.is_admin) {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	render() {
		const { refreshData } = this.props;
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Story Tracking | {process.env.REACT_APP_NAME}</title>
				</Helmet>
				<Tab.Group defaultIndex={0}>
					<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
						<div className="containers">
							<div className="flex gap-5 flex-wrap items-center">
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
										Active
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
										Finish
									</Tab>
								</Tab.List>
								<div className="ml-auto">
									<LinkTo
										to={
											refreshData && refreshData.is_admin
												? "/brand/monitoring/campaign/new"
												: "#"
										}
										onClick={this.permissionDenied}
										text="New Campaign"
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="containers">
						<Tab.Panels className="bg-transparent">
							<Tab.Panel>
								<MonitoringActiveCampaigns />
							</Tab.Panel>
							<Tab.Panel>
								<MonitoringClosedCampaigns />
							</Tab.Panel>
						</Tab.Panels>
					</div>
				</Tab.Group>
			</>
		);
	}
}

const mapStateToProps = ({ HeaderReducer }) => {
	return {
		refreshData: HeaderReducer.refreshData,
	};
};

export default connect(mapStateToProps)(BrandMonitoringCampaign);
