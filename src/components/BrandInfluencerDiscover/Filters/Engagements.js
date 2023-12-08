import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const engagementsLeftNumber = [
	{
		value: "",
		text: "From",
	},
	{
		value: "100",
		text: "100",
	},
	{
		value: "200",
		text: "200",
	},
	{
		value: "300",
		text: "300",
	},
	{
		value: "400",
		text: "400",
	},
	{
		value: "500",
		text: "500",
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
	},
];

const engagementsRightNumber = [
	{
		value: "",
		text: "To",
	},
	{
		value: "100",
		text: "100",
	},
	{
		value: "200",
		text: "200",
	},
	{
		value: "300",
		text: "300",
	},
	{
		value: "400",
		text: "400",
	},
	{
		value: "500",
		text: "500",
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
	},
];

const engagementRate = [
	{
		value: "",
		text: "From",
	},
	{
		value: "0.01",
		text: "≥ 1.0%",
	},
	{
		value: "0.02",
		text: "≥ 2.0%",
	},
	{
		value: "0.03",
		text: "≥ 3.0%",
	},
	{
		value: "0.04",
		text: "≥ 4.0%",
	},
	{
		value: "0.05",
		text: "≥ 5.0%",
	},
	{
		value: "0.06",
		text: "≥ 6.0%",
	},
	{
		value: "0.07",
		text: "≥ 7.0%",
	},
	{
		value: "0.08",
		text: "≥ 8.0%",
	},
	{
		value: "0.09",
		text: "≥ 9.0%",
	},
	{
		value: "0.10",
		text: "≥ 10.0%",
	},
	{
		value: "0.11",
		text: "≥ 11.0%",
	},
	{
		value: "0.12",
		text: "≥ 12.0%",
	},
	{
		value: "0.13",
		text: "≥ 13.0%",
	},
	{
		value: "0.14",
		text: "≥ 14.0%",
	},
	{
		value: "0.15",
		text: "≥ 15.0%",
	},
	{
		value: "0.16",
		text: "≥ 16.0%",
	},
	{
		value: "0.17",
		text: "≥ 17.0%",
	},
	{
		value: "0.18",
		text: "≥ 18.0%",
	},
	{
		value: "0.19",
		text: "≥ 19.0%",
	},
	{
		value: "0.20",
		text: "≥ 20.0%",
	},
];

class Engagements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			left_number: "",
			right_number: "",
			enabled:
				this.props.actions.filter((i) => i.filter === "engagements").length > 0,
			engagement_rate:
				this.props.actions.filter((i) => i.filter === "engagement_rate")
					.length > 0,
		};
	}

	handleSearchFilters = (data, key, type) => {
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (key === "engagements") {
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
		} else if (key === "engagement_rate") {
			if (
				typeof form["sortOptions"] !== "undefined" &&
				!form["sortOptions"].some((el) => el.value === key)
			) {
				form["sortOptions"].push({
					field: key,
					id: 0,
					direction: "desc",
					text: "Engagement Rate",
					value: key,
				});
			}
			payload["filter"][key] = { value: value, operator: "gte" };
			form["filter"][key] = { value: value, operator: "gte" };
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
		let checked;
		if (key === "engagements") {
			this.setState({ enabled: !this.state.enabled });
			checked = this.state.enabled;
		} else if (key === "engagement_rate") {
			this.setState({ engagement_rate: !this.state.engagement_rate });
			checked = this.state.engagement_rate;
		}

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
			form["filter"]["engagements"] &&
			form["filter"]["engagements"]["left_number"]
				? form["filter"]["engagements"]["left_number"]
				: "";
		let rightNumber =
			form["filter"] &&
			form["filter"]["engagements"] &&
			form["filter"]["engagements"]["right_number"]
				? form["filter"]["engagements"]["right_number"]
				: "";
		let defEngRate =
			form["filter"] &&
			form["filter"]["engagement_rate"] &&
			form["filter"]["engagement_rate"]["value"]
				? form["filter"]["engagement_rate"]["value"]
				: "";
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.engagement_rate || form.filter.engagements
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Engagements
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
											Engagements
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.engagements_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() =>
													this.addInfluencerActions("engagements")
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
												onClick={() => this.addInfluencerActions("engagements")}
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
												this.handleSearchFilters(data, "engagements", "left")
											}
										>
											<div className="relative w-full z-50">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block">
														{this.defaultValue(
															engagementsLeftNumber,
															leftNumber
														)}
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
														{engagementsLeftNumber.map((age, key) => (
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
												this.handleSearchFilters(data, "engagements", "right")
											}
										>
											<div className="relative w-full z-50">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block">
														{this.defaultValue(
															engagementsRightNumber,
															rightNumber
														)}
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
														{engagementsRightNumber.map((age, key) => (
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
							<div className="mt-6">
								<div className="w-full">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center">
										<div className="flex items-center grow">
											Engagement Rate
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.engagements_rate_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.engagement_rate}
												onChange={() =>
													this.addInfluencerActions("engagement_rate")
												}
												className={`${
													this.state.engagement_rate
														? "bg-[#7c3292]"
														: "bg-white"
												} relative inline-flex h-[21px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
											>
												<span
													aria-hidden="true"
													className={`${
														this.state.engagement_rate
															? "translate-x-[15px] bg-white"
															: "translate-x-[1px] bg-[#adb5bd]"
													} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
												/>
											</Switch>
											<span
												onClick={() =>
													this.addInfluencerActions("engagement_rate")
												}
												className="ml-2"
											>
												{this.state.engagement_rate ? "-" : "+"}
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
									<Listbox
										onChange={(data) =>
											this.handleSearchFilters(data, "engagement_rate", "")
										}
									>
										<div className="relative w-full z-40">
											<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
												<span className="block">
													{this.defaultValue(engagementRate, defEngRate)}
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
													{engagementRate.map((rate, key) => (
														<Listbox.Option
															key={key}
															className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																rate.value === defEngRate
																	? "bg-[#00000008]"
																	: ""
															}`}
															value={rate}
														>
															<span
																className={`block ${
																	rate.value === defEngRate
																		? "purple font-semibold"
																		: "text-gray-900 font-medium"
																}`}
															>
																{rate.text}
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

export default connect(mapStateToProps, undefined, mergeProps)(Engagements);
