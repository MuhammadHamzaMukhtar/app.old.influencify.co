import { Component } from "react";
import { Tab } from "@headlessui/react";
import AllClosedInfluencerCampaigns from "./AllClosedInfluencerCampaigns";
import AbortedClosedInfluencerCampaigns from "./AbortedClosedInfluencerCampaigns";
import RejectedClosedInfluencerCampaigns from "./RejectedClosedInfluencerCampaigns";
import ClosedInfluencerCampaigns from "./ClosedInfluencerCampaigns";
import CanceledInfluencerCampaigns from "./CanceledInfluencerCampaigns";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencerCampaignsClosedTab extends Component {
	render() {
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[60vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<Tab.Group defaultIndex={0}>
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
								All
								<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
									{(this.props.closedAllInfluencerCampaigns || []).length}
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
									{(this.props.rejectedInfluencerCampaigns || []).length}
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
									{(this.props.closedInfluencerCampaigns || []).length}
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
									{(this.props.abortedInfluencerCampaigns || []).length}
								</div>
							</Tab> */}
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
								Canceled
								<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
									{(this.props.canceledInfluencerCampaigns || []).length}
								</div>
							</Tab> */}
						</Tab.List>
					</div>
					<div className="lg:col-span-9 col-span-12">
						<Tab.Panels className="bg-transparent">
							<Tab.Panel>
								<AllClosedInfluencerCampaigns />
							</Tab.Panel>
							<Tab.Panel>
								<RejectedClosedInfluencerCampaigns />
							</Tab.Panel>
							<Tab.Panel>
								<ClosedInfluencerCampaigns />
							</Tab.Panel>
							{/* <Tab.Panel>
								<AbortedClosedInfluencerCampaigns />
							</Tab.Panel> */}
							{/* <Tab.Panel>
								<CanceledInfluencerCampaigns />
							</Tab.Panel> */}
						</Tab.Panels>
					</div>
				</div>
			</Tab.Group>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencerBookingReducer.isLoading,
		closedAllInfluencerCampaigns:
			state.InfluencerBookingReducer.closedAllInfluencerCampaigns,
		abortedInfluencerCampaigns:
			state.InfluencerBookingReducer.abortedInfluencerCampaigns,
		rejectedInfluencerCampaigns:
			state.InfluencerBookingReducer.rejectedInfluencerCampaigns,
		closedInfluencerCampaigns:
			state.InfluencerBookingReducer.closedInfluencerCampaigns,
		canceledInfluencerCampaigns:
			state.InfluencerBookingReducer.canceledInfluencerCampaigns,
	};
};

export default connect(mapStateToProps, null)(InfluencerCampaignsClosedTab);
