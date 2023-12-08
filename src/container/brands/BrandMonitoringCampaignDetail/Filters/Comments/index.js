import { Component, Fragment } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { connect } from "react-redux";
import { Popover, Transition } from "@headlessui/react";

class Comments extends Component {
	addPayload = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addPayload(payload);
	};
	render() {
		const { payload } = this.props;
		return (
			<>
				<Popover className="flex items-center relative">
					<Popover.Button
						className={`${
							payload.comments_to || payload.comments_from
								? "bg-[#7c3292] border-[#7c3292] text-white"
								: "bg-whte border-[#ddd]"
						} ${
							this.props.className
						}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
					>
						Comments
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] sm:max-w-[534px] max-w-[320px]">
							<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
								<div className="flex items-center">
									<div className="w-full">
										<p className="mb-1 font-medium whitespace-nowrap flex items-center">
											<HiSpeakerphone className="mr-2" />
											Influencer Comments
										</p>
										<div>
											<div className="sm:flex items-center">
												<div className="mb-4 sm:!mb-0">
													<Input
														value={payload.comments_from}
														onChange={(e) =>
															this.addPayload("comments_from", e.target.value)
														}
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														placeholder="From"
														type="number"
													/>
												</div>
												<div className="ml-0 sm:!ml-4">
													<Input
														value={payload.comments_to}
														onChange={(e) =>
															this.addPayload("comments_to", e.target.value)
														}
														placeholder="To"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														type="number"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		payload: MonitoringCampaign.payload,
		keyFilters: MonitoringCampaign.keyFilters,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
		// searchCampaignContent: (data) => {
		//     actions.searchCampaignContent(dispatch, data);
		// },
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
