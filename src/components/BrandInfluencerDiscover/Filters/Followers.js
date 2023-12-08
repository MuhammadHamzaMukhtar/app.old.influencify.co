import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const left_number = [
	{
		value: "",
		text: "From",
	},
	{
		value: "1000",
		text: "1k",
	},
	{
		value: "5000",
		text: "5k",
	},
	{
		value: "10000",
		text: "10k",
	},
	{
		value: "25000",
		text: "25k",
	},
	{
		value: "50000",
		text: "50k",
	},
	{
		value: "100000",
		text: "100k",
	},
	{
		value: "250000",
		text: "250k",
	},
	{
		value: "500000",
		text: "500k",
	},
	{
		value: "1000000",
		text: ">1m",
	}
];

const right_number = [
	{
		value: "",
		text: "To",
	},
	{
		value: "1000",
		text: "1k",
	},
	{
		value: "5000",
		text: "5k",
	},
	{
		value: "10000",
		text: "10k",
	},
	{
		value: "25000",
		text: "25k",
	},
	{
		value: "50000",
		text: "50k",
	},
	{
		value: "100000",
		text: "100k",
	},
	{
		value: "250000",
		text: "250k",
	},
	{
		value: "500000",
		text: "500k",
	},
	{
		value: "1000000",
		text: ">1m",
	}
];

class Followers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			left_number: "",
			right_number: "",
			enabled:
				this.props.actions.filter((i) => i.filter === "followers").length > 0,
		};
	}

	handleSearchFilters = (data, key, type) => {
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (type === "left") {
			payload["filter"][key] = {
				...payload["filter"][key],
				left_number: value,
			};
			form["filter"][key] = {
				...form["filter"][key],
				left_number: value,
			};
		} else {
			payload["filter"][key] = {
				...payload["filter"][key],
				right_number: value,
			};
			form["filter"][key] = {
				...form["filter"][key],
				right_number: value,
			};
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
						account_type: [],
					},
				};
			}
			if (payload.filter.account_type.includes("3")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [],
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

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { form } = this.props;
		let leftNumber =
			form["filter"] &&
			form["filter"]["followers"] &&
			form["filter"]["followers"]["left_number"]
				? form["filter"]["followers"]["left_number"]
				: "";
		let rightNumber =
			form["filter"] &&
			form["filter"]["followers"] &&
			form["filter"]["followers"]["right_number"]
				? form["filter"]["followers"]["right_number"]
				: "";
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.followers
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Followers
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
					<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] sm:max-w-[450px] max-w-[320px]">
						<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
							<div className="flex items-center">
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
												tooltipText={tooltip.followers_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("followers")}
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
												onClick={() => this.addInfluencerActions("followers")}
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
									<div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
										<Listbox
											onChange={(data) =>
												this.handleSearchFilters(data, "followers", "left")
											}
										>
											<div className="relative w-full">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block">
														{this.defaultValue(left_number, leftNumber)}
													</span>
													<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<AiFillCaretDown
															size={12}
															className="text-black opacity-80"
															aria-hidden="true"
														/>
													</span>
												</Listbox.Button>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
														{left_number.map((age, key) => (
															<Listbox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	age.value === leftNumber
																		? "bg-[#00000008]"
																		: ""
																}`}
																value={age}
															>
																<span
																	className={`block ${
																		age.value === leftNumber
																			? "purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																>
																	{age.text}
																</span>
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</Listbox>
										<Listbox
											onChange={(data) =>
												this.handleSearchFilters(data, "followers", "right")
											}
										>
											<div className="relative w-full">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block">
														{this.defaultValue(right_number, rightNumber)}
													</span>
													<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<AiFillCaretDown
															size={12}
															className="text-black opacity-80"
															aria-hidden="true"
														/>
													</span>
												</Listbox.Button>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
														{right_number.map((age, key) => (
															<Listbox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	age.value === rightNumber
																		? "bg-[#00000008]"
																		: ""
																}`}
																value={age}
															>
																<span
																	className={`block ${
																		age.value === rightNumber
																			? "purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																>
																	{age.text}
																</span>
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</Listbox>
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

export default connect(mapStateToProps, undefined, mergeProps)(Followers);
