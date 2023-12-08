import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { ImUsers } from "react-icons/im";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const ageAudienceLeft = [
	{
		value: "13",
		text: "13",
	},
	{
		value: "18",
		text: "18",
	},
	{
		value: "25",
		text: "25",
	},
	{
		value: "35",
		text: "35",
	},
	{
		value: "45",
		text: "45",
	},
	{
		value: "65",
		text: "65",
	},
];

const ageAudienceRights = [
	{
		value: "17",
		text: "18",
	},
	{
		value: "24",
		text: "25",
	},
	{
		value: "34",
		text: "35",
	},
	{
		value: "44",
		text: "45",
	},
	{
		value: "64",
		text: "65",
	},
	{
		value: "65",
		text: "65+",
	},
];

const ageAudienceWeight = [
	{
		value: "0.01",
		text: ">1%",
	},
	{
		value: "0.05",
		text: ">5%",
	},
	{
		value: "0.1",
		text: ">10%",
	},
	{
		value: "0.15",
		text: ">15%",
	},
	{
		value: "0.2",
		text: ">20%",
	},
	{
		value: "0.25",
		text: ">25%",
	},
	{
		value: "0.3",
		text: ">30%",
	},
	{
		value: "0.35",
		text: ">35%",
	},
	{
		value: "0.4",
		text: ">40%",
	},
	{
		value: "0.45",
		text: ">45%",
	},
	{
		value: "0.5",
		text: ">50%",
	},
	{
		value: "0.55",
		text: ">55%",
	},
	{
		value: "0.6",
		text: ">60%",
	},
	{
		value: "0.65",
		text: ">65%",
	},
	{
		value: "0.7",
		text: ">70%",
	},
	{
		value: "0.75",
		text: ">75%",
	},
	{
		value: "0.8",
		text: ">80%",
	},
	{
		value: "0.85",
		text: ">85%",
	},
	{
		value: "0.9",
		text: ">90%",
	},
	{
		value: "0.95",
		text: ">95%",
	},
];

const ageInfluencerLeft = [
	{
		value: "18",
		text: "18",
	},
	{
		value: "25",
		text: "25",
	},
	{
		value: "35",
		text: "35",
	},
	{
		value: "45",
		text: "45",
	},
	{
		value: "65",
		text: "65",
	},
];

const ageInfluencerRights = [
	{
		value: "24",
		text: "25",
	},
	{
		value: "34",
		text: "35",
	},
	{
		value: "44",
		text: "45",
	},
	{
		value: "64",
		text: "65",
	},
	{
		value: "65",
		text: "65+",
	},
];

const audience_ages = [
	{ code: "13-17", weight: "0.01" },
	{ code: "18-24", weight: "0.01" },
	{ code: "25-34", weight: "0.01" },
	{ code: "35-44", weight: "0.01" },
	{ code: "45-64", weight: "0.01" },
	{ code: "65-", weight: "0.01" },
];

class Age extends Component {
	constructor(props) {
		super(props);
		this.state = {
			audience_left: "13",
			audience_right: "65-",
			influencer_left: "18",
			influencer_right: "65",
			enabled: this.props.actions.filter((i) => i.filter === "age").length > 0,
		};
	}

	audienceFilters = (data, key, type) => {
		let value = data.value;
		let payload = Object.assign({}, this.props.payload);
		let form = Object.assign({}, this.props.form);

		form = {
			...form,
			filter: {
				...form.filter,
				audience_age: {},
				[key]: {
					...form.filter[key],
					operator: "gte",
					[type]: value,
				},
			},
		};
		payload = {
			...payload,
			filter: {
				...payload.filter,
				audience_age: {},
				[key]: {
					...payload.filter[key],
					operator: "gte",
					[type]: value,
					...(type === "left_number" &&
						!payload.filter?.[key]?.right_number && { right_number: "" }),
					...(type === "right_number" &&
						!payload.filter?.[key]?.left_number && { left_number: "13" }),
				},
			},
		};

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	audienceAgeFilters = (data, key, type) => {
		let value = data.value;
		let payload = Object.assign({}, this.props.payload);
		let form = Object.assign({}, this.props.form);
		if (type === "left_number") {
		}
		form = {
			...form,
			filter: {
				...form.filter,
				audience_age: {},
				[key]: {
					...form.filter[key],
					[type]: value,
				},
			},
		};
		payload = {
			...payload,
			filter: {
				...payload.filter,
				audience_age: {},
				[key]: {
					...payload.filter[key],
					[type]: value,
					...(type === "left_number" &&
						!payload.filter?.[key]?.right_number && { right_number: "" }),
					...(type === "right_number" &&
						!payload.filter?.[key]?.left_number && { left_number: "18" }),
				},
			},
		};

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleSearchFilters = (e, data, key, type) => {
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		let audience_age_value = [];
		if (key === "audience_age") {
			if (type === "audience_left") {
				this.setState(
					{
						audience_left: value,
					},
					function () {
						audience_age_value = audience_ages.filter(
							(item) =>
								item.code.split("-")[0] >= this.state.audience_left &&
								item.code.split("-")[1].replace(/-/g, "") <=
									this.state.audience_right
						);
						let audience_age =
							this.state.audience_left + "-" + this.state.audience_right;
						payload["filter"][key] = audience_age_value;
						form["filter"][key] = [{ code: audience_age, weight: 0.01 }];

						if (typeof form["sortOptions"] !== "undefined") {
							form["sortOptions"] = form["sortOptions"].filter((el) => {
								return el.value !== key;
							});
							if (!form["sortOptions"].some((el) => el.value === key)) {
								form["sortOptions"].push({
									field: key,
									id: 0,
									direction: "desc",
									text: audience_age + " y.o",
									value: key,
								});
							}
						}
					}
				);
			} else {
				this.setState(
					{
						audience_right: value,
					},
					function () {
						if (this.state.audience_left > this.state.audience_right) {
							audience_age_value = audience_ages;
						} else {
							audience_age_value = audience_ages.filter(
								(item) =>
									item.code.split("-")[0] >= this.state.audience_left &&
									item.code.split("-")[0].replace(/-/g, "") <=
										this.state.audience_right
							);
						}
						let audience_age =
							this.state.audience_left + "-" + this.state.audience_right;
						payload["filter"][key] = audience_age_value;
						form["filter"][key] = [{ code: audience_age, weight: 0.01 }];

						if (typeof form["sortOptions"] !== "undefined") {
							form["sortOptions"] = form["sortOptions"].filter((el) => {
								return el.value !== key;
							});
							if (!form["sortOptions"].some((el) => el.value === key)) {
								form["sortOptions"].push({
									field: key,
									id: 0,
									direction: "desc",
									text: audience_age + " y.o",
									value: key,
								});
							}
						}
					}
				);
			}
		} else if (key === "age") {
			if (type === "influencer_left") {
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
		}
		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleFilterWeight = (e, data, key) => {
		let audience_age =
			this.state.audience_left + "-" + this.state.audience_right;
		const payload = Object.assign({}, this.props.payload);
		let audience_age_weights = payload["filter"][key];
		for (let index = 0; index < audience_age_weights.length; index++) {
			const element = audience_age_weights[index];
			element.weight = data.value;
		}
		payload["filter"][key] = audience_age_weights;

		const form = Object.assign({}, this.props.form);
		form["filter"][key] = [{ code: audience_age, weight: data.value }];
		form["filter"][key].weight = data.value;
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
		const { form, payload } = this.props;

		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						(payload.filter.audience_age_range &&
							payload.filter.audience_age_range) ||
						payload.filter.age
							? "bg-[#7c3292] !border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Age
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
									<div className="mb-1 font-medium whitespace-nowrap flex items-center">
										<ImUsers className="mr-2" /> Audience
										<Tooltip
											trigger={
												<div className="ml-2">
													<AiFillQuestionCircle color="#9ea1b2" size={18} />
												</div>
											}
											tooltipText={tooltip.age_audience_tooltip}
											placement="top-left"
										/>
									</div>
									<div>
										<div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
											<Listbox
												defaultValue={
													form?.filter?.audience_age_range?.left_number
												}
												onChange={(data) =>
													this.audienceFilters(
														data,
														"audience_age_range",
														"left_number"
													)
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{form?.filter?.audience_age_range?.left_number}
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
															{ageAudienceLeft.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.text ===
																		form?.filter?.audience_age_range
																			?.left_number
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.text ===
																			form?.filter?.audience_age_range
																				?.left_number
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
													this.audienceFilters(
														data,
														"audience_age_range",
														"right_number"
													)
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																ageAudienceRights,
																form?.filter?.audience_age_range?.right_number
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
															{ageAudienceRights.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.value ===
																		form?.filter?.audience_age_range
																			?.right_number
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.value ===
																			form?.filter?.audience_age_range
																				?.right_number
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
										<div className="mt-4">
											<Listbox
												onChange={(data) =>
													this.audienceFilters(
														data,
														"audience_age_range",
														"weight"
													)
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																ageAudienceWeight,
																form?.filter?.audience_age_range?.weight
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
															{ageAudienceWeight.map((weight, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		weight.value ===
																		form?.filter?.audience_age_range?.weight
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={weight}
																>
																	<span
																		className={`block ${
																			weight.value ===
																			form?.filter?.audience_age_range?.weight
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																		}`}
																	>
																		{weight.text}
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
							<div className="mt-6">
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
												tooltipText={tooltip.age_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("age")}
												className={`${
													this.state.enabled ? "bg-[#7c3292]" : "bg-white"
												} relative inline-flex h-[21px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
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
												onClick={() => this.addInfluencerActions("age")}
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
									<div>
										<div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
											<Listbox
												defaultValue={form?.filter?.age?.left_number}
												onChange={(data) =>
													this.audienceAgeFilters(data, "age", "left_number")
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{form?.filter?.age?.left_number}
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
															{ageInfluencerLeft.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.text === form?.filter?.age?.left_number
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.text ===
																			form?.filter?.age?.left_number
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
													this.audienceAgeFilters(data, "age", "right_number")
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																ageInfluencerRights,
																form?.filter?.age?.right_number
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
															{ageInfluencerRights.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.value ===
																		form?.filter?.age?.right_number
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.value ===
																			form?.filter?.age?.right_number
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

export default connect(mapStateToProps, undefined, mergeProps)(Age);
