import { Component, Fragment } from "react";
import { MdGroup } from "react-icons/md";
import { connect } from "react-redux";
import moment from "moment";
import { Popover, Transition } from "@headlessui/react";

class Created extends Component {
	constructor(props) {
		super(props);
		this.state = {
			left_number: "",
			right_number: "",
			formated_left_number: "",
			formated_right_number: "",
		};
	}

	addPayload = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addPayload(payload);
	};
	render() {
		const { payload, fetchSingleCampaign } = this.props;
		if (
			moment(fetchSingleCampaign.created_at).diff(
				moment(fetchSingleCampaign.start_date),
				"days"
			) > 0
		) {
			var created_at = moment(fetchSingleCampaign.start_date).format(
				"YYYY-MM-DD"
			);
			var start_date = moment(fetchSingleCampaign.created_at).format(
				"YYYY-MM-DD"
			);
		} else {
			var created_at = moment(fetchSingleCampaign.created_at).format(
				"YYYY-MM-DD"
			);
			var start_date = moment(fetchSingleCampaign.start_date).format(
				"YYYY-MM-DD"
			);
		}

		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						payload.start_date || payload.end_date
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Created
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
										<MdGroup size={20} className="mr-2" />
										Created Date
									</p>
									<div>
										<div className="sm:flex items-center">
											<div className="mb-4 sm:!mb-0">
												<input
													type="date"
													min={created_at}
													max={created_at}
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) =>
														this.addPayload("start_date", e.target.value)
													}
												/>
											</div>
											<div className="ml-0 sm:!ml-4">
												<input
													type="date"
													min={created_at}
													max={start_date}
													InputProps={{
														inputProps: { min: created_at, max: start_date },
													}}
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) =>
														this.addPayload("end_date", e.target.value)
													}
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
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		payload: MonitoringCampaign.payload,
		fetchSingleCampaign: MonitoringCampaign.fetchSingleCampaign,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		clearPayload: () => {
			actions.clearPayload(dispatch);
		},

		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Created);
