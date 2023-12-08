import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { ImUsers } from "react-icons/im";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Combobox, Transition, Listbox } from "@headlessui/react";

const Weight = [
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

class Language extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled: this.props.actions.filter((i) => i.filter === "lang").length > 0,
			query_language: "",
			defaultlang: "0.2",
		};
	}

	handleSearchFilters = (key, data) => {
		let text = data.text;
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);

		if (key === "audience_lang") {
			if (typeof form["sortOptions"] !== "undefined") {
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				if (!form["sortOptions"].some((el) => el.value === key)) {
					form["sortOptions"].push({
						field: key,
						id: 0,
						direction: "desc",
						text: text,
						value: key,
					});
				}
			}
			payload["filter"][key] = { code: value, weight: 0.2 };
			form["filter"][key] = { code: value, weight: 0.2, name: text };
		} else if (key === "lang") {
			payload["filter"][key] = { code: value };
			form["filter"][key] = { code: value, name: text };
		}
		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		setTimeout(() => {
			this.requestInfluencerCount(payload);
		}, 1000);
	};

	removeSearchFilters = (key) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (key === "audience_lang") {
			form["sortOptions"] = form["sortOptions"].filter((el) => {
				return el.value !== key;
			});
			payload["sort"]["field"] = "followers";
		}
		delete payload["filter"][key];
		delete form["filter"][key];

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleFilterWeight = (data, key) => {
		this.setState({ defaultlang: data.value });
		const payload = Object.assign({}, this.props.payload);
		payload["filter"][key].weight = data.value;

		const form = Object.assign({}, this.props.form);
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
		const { langs, form } = this.props;
		const { query_language, defaultlang } = this.state;
		let selected_audience =
			form["filter"] &&
			form["filter"]["audience_lang"] &&
			form["filter"]["audience_lang"]["name"]
				? form["filter"]["audience_lang"]["name"]
				: "";
		let selected_influencer =
			form["filter"] && form["filter"]["lang"] && form["filter"]["lang"]["name"]
				? form["filter"]["lang"]["name"]
				: "";
		let filteredLanguage =
			query_language === ""
				? langs
				: langs.filter((person) =>
						person.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_language.toLowerCase().replace(/\s+/g, ""))
				  );
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.audience_lang || form.filter.lang
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Language
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
							<div className="flex  flex-wrap sm:!flex-nowrap gx-5">
								<div className="w-full mb-4 sm:!mb-0">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center">
										<ImUsers className="mr-2" /> Audience
										<Tooltip
											trigger={
												<div className="ml-2">
													<AiFillQuestionCircle color="#9ea1b2" size={18} />
												</div>
											}
											tooltipText={tooltip.language_audience_tooltip}
											placement="top-left"
										/>
									</div>
									<Combobox
										value={selected_audience}
										onChange={(data) =>
											this.handleSearchFilters("audience_lang", data)
										}
									>
										<div className="relative mt-1 z-50 w-full">
											<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
												<Combobox.Button className="w-full">
													<Combobox.Input
														className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
														displayValue={selected_audience}
														placeholder="Add Language"
														onChange={(e) =>
															this.setState({
																query_language: e.target.value,
															})
														}
													/>
												</Combobox.Button>
												<div className="mx-2">
													<IoSearchOutline color="#9ea1b2" size={20} />
												</div>
											</div>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
													{filteredLanguage === undefined ||
													filteredLanguage.length === 0 ? (
														<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
															No results found.
														</div>
													) : (
														filteredLanguage.map((langs, key) => (
															<Combobox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	langs.text === selected_audience
																		? "bg-[#00000008] text-black font-semibold"
																		: "text-gray-900 font-medium"
																}`}
																value={langs}
															>
																<div className="flex items-center">
																	<span className={`block truncate `}>
																		{langs.text}
																	</span>
																</div>
															</Combobox.Option>
														))
													)}
												</Combobox.Options>
											</Transition>
										</div>
									</Combobox>
									<>
										{form.filter.audience_lang ? (
											<div className="flex justify-between mt-4">
												<div className="flex items-center grow shrink-0">
													<IoCloseCircle
														size={20}
														className="cursor-pointer purple"
														onClick={() =>
															this.removeSearchFilters("audience_lang")
														}
													/>
													<p>{form.filter.audience_lang.name}</p>
												</div>
												<div>
													<Listbox
														onChange={(data) =>
															this.handleFilterWeight(data, "audience_lang")
														}
													>
														<div className="relative w-full">
															<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
																<span className="block">
																	{this.defaultValue(Weight, defaultlang)}
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
																	{Weight.map((age, key) => (
																		<Listbox.Option
																			key={key}
																			className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																				age.value === defaultlang
																					? "bg-[#00000008]"
																					: ""
																			}`}
																			value={age}
																		>
																			<span
																				className={`block ${
																					age.value === defaultlang
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
										) : (
											""
										)}
									</>
								</div>
								<div className="ml-0 sm:!ml-6 w-full">
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
												tooltipText={tooltip.language_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("lang")}
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
												onClick={() => this.addInfluencerActions("lang")}
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
									<Combobox
										value={selected_influencer}
										onChange={(data) => this.handleSearchFilters("lang", data)}
									>
										<div className="relative mt-1 z-50 w-full">
											<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
												<Combobox.Button className="w-full">
													<Combobox.Input
														className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
														displayValue={selected_influencer}
														placeholder="Add Language"
														onChange={(e) =>
															this.setState({
																query_language: e.target.value,
															})
														}
													/>
												</Combobox.Button>
												<div className="mx-2">
													<IoSearchOutline color="#9ea1b2" size={20} />
												</div>
											</div>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
													{filteredLanguage === undefined ||
													filteredLanguage.length === 0 ? (
														<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
															No results found.
														</div>
													) : (
														filteredLanguage.map((langs, key) => (
															<Combobox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	langs.text === selected_influencer
																		? "bg-[#00000008] text-black font-semibold"
																		: "text-gray-900 font-medium"
																}`}
																value={langs}
															>
																<div className="flex items-center">
																	<span className={`block truncate `}>
																		{langs.text}
																	</span>
																</div>
															</Combobox.Option>
														))
													)}
												</Combobox.Options>
											</Transition>
										</div>
									</Combobox>
									<>
										{form.filter.lang ? (
											<div className="flex items-center justify-between mt-4">
												<div className="flex items-center ">
													<IoCloseCircle
														size={20}
														className="cursor-pointer purple"
														onClick={() => this.removeSearchFilters("lang")}
													/>
													<p>{form.filter.lang.name}</p>
												</div>
											</div>
										) : (
											""
										)}
									</>
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
		langs: influencerSearch.langs,
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

export default connect(mapStateToProps, undefined, mergeProps)(Language);
