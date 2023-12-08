import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition } from "@headlessui/react";

class AccountType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled:
				this.props.actions.filter((i) => i.filter === "account_type").length >
				0,
		};
	}

	handleSearchFilters = (e, key) => {
		let value = e.target.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (e.target.checked) {
			if (value === 1) {
				payload["filter"]["gender"] = { code: "KNOWN" };
				form["filter"]["gender"] = { code: "KNOWN" };
			} else if (value === 2) {
				payload["filter"]["gender"] = { code: "UNKNOWN" };
				form["filter"]["gender"] = { code: "UNKNOWN" };
			} else if (value === 3) {
				payload["filter"]["gender"] = { code: "KNOWN" };
				form["filter"]["gender"] = { code: "KNOWN" };
			}
			payload["filter"][key] = [value];
			form["filter"][key] = [value];
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	requestInfluencerCount = (data) => {
		let payload = Object.assign({}, data);
		const actions = Object.assign([], this.props.actions);
		if (payload.filter.account_type) {
			if (payload.filter.account_type.includes("2")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [2],
					},
				};
			}
			if (payload.filter.account_type.includes("3")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [3],
					},
				};
			}
			if (payload.filter.account_type.includes("1")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [1, 3],
					},
				};
			}
		}
		if (actions.length > 0) {
			payload = {
				...payload,
				filter: {
					...payload.filter,
					actions: actions,
				},
			};
		}
		let query = {
			platform: this.props.platform,
			payload: payload,
		};

		this.props.searchInfluencersCount(query);
	};

	addInfluencerActions = (key) => {
		this.setState({ enabled: !this.state.enabled });
		let checked = this.state.enabled;

		const payload = Object.assign({}, this.props.payload);
		const data = {
			payload: { filter: key, action: "not" },
			checked: checked,
			key: key
		}
		this.props.InfluencerActions(data);

		setTimeout(() => {
			this.requestInfluencerCount(payload);
		}, 1000);
	};

	render() {
		const { form } = this.props;
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.account_type && form.filter.account_type.length
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Account Type
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
					<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] max-w-[250px]">
						<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
							<div className="flex items-center gx-5">
								<div className="w-full">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center justify-between">
										<div className="flex items-center">
											<HiSpeakerphone className="mr-2" />
											Influencer
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.accounttype_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() =>
													this.addInfluencerActions("account_type")
												}
												className={`${
													this.state.enabled ? "bg-[#7c3292]" : "bg-white"
												} relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
											>
												<span
													aria-hidden="true"
													className={`${
														this.state.enabled
															? "translate-x-[15px] bg-white"
															: "translate-x-[1px] bg-[#adb5bd]"
													} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
												/>
											</Switch>
											<span
												onClick={() =>
													this.addInfluencerActions("account_type")
												}
												className="ml-2"
											>
												{this.state.enabled ? "-" : "+"}
											</span>
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={"Enable negative search"}
												placement="top-left"
											/>
										</div>
									</div>
									<div className="mt-5 space-y-4">
										<label
											htmlFor="acc1"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="acc1"
												type="radio"
												checked={
													(form.filter.account_type || []).includes("2")
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "account_type")
												}
												value="2"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Business
										</label>
										<label
											htmlFor="acc2"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="acc2"
												type="radio"
												checked={
													(form.filter.account_type || []).includes("3")
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "account_type")
												}
												value="3"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Creator
										</label>
										<label
											htmlFor="acc3"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="acc3"
												type="radio"
												checked={
													(form.filter.account_type || []).includes("1")
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "account_type")
												}
												value="1"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Creator (Strict)
										</label>
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

const mapStateToProps = ({ influencerSearch }) => {
	return {
		payload: influencerSearch.payload,
		platform: influencerSearch.platform,
		form: influencerSearch.form,
		actions: influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		addInfluencerActions: (data) =>
			dispatch(actions.addInfluencerActions(data)),
		InfluencerActions: (data) =>
			actions.influencerActions(dispatch, data),
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(AccountType);
