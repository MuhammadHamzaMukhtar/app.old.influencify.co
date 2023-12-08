import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { ImUsers } from "react-icons/im";
import { HiSpeakerphone } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import tooltip from "../../../constants/tooltip";
import { Popover, Combobox, Transition } from "@headlessui/react";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class Lookalikes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: null,
			relvance_value: "",
			selected_brand: "",
			selected_influencer: "",
			enabled:
				this.props.actions.filter((i) => i.filter === "relevance").length > 0,
		};
		this.timeout = 0;
	}

	handleSearchFilters = (key, data) => {
		const { platform } = this.props;
		let value, text, name;
		name = data.handle || data.custom_name;
		if (platform === "youtube") {
			value = data.user_id;
			text = "@" + truncate(data.custom_name || data.handle);
		} else {
			value = data.username;
			text = "@" + truncate(data.username);
		}
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		let form_value = "";
		let payload_value = "";
		if (key === "audience_relevance") {
			this.setState({ selected_brand: data.username });
			payload["filter"][key] = { value: value };
			form["filter"][key] = { value: "@" + (platform === "youtube" ? name : value) };
			payload["sort"]["field"] = key;

			if (
				typeof form["sortOptions"] !== "undefined" &&
				!form["sortOptions"].some((el) => el.value === key)
			) {
				form["sortOptions"].push({
					field: key,
					id: 0,
					direction: "desc",
					text: "Audience Lookalikes",
					value: key,
				});
			}
		} else if (key === "relevance") {
			this.setState({ selected_influencer: data.username });
			if (platform === "youtube") {
				form_value = text;
				payload_value = value;
			} else {
				form_value = value;
				payload_value = value;
			}

			let relvance_value = form["relvance_value"];
			if (typeof relvance_value === "string") {
				relvance_value = relvance_value.split(" ");
				if (!relvance_value.some((el) => el === "@" + payload_value)) {
					relvance_value.push("@" + payload_value);
				}
			} else {
				if (!relvance_value.some((el) => el === "@" + payload_value)) {
					relvance_value.push("@" + payload_value);
				}
			}
			form["relvance_value"] = relvance_value;

			payload["filter"][key] = {
				value: form["relvance_value"].join(" "),
				weight: 0.5,
			};
			if (form["filter"].hasOwnProperty(key) === false) {
				form["filter"][key] = [
					{ value: form_value, text: payload_value, weight: 0.5, type: "@" },
				];
			} else {
				if (!form["filter"][key].some((el) => el.value === form_value)) {
					form["filter"][key].push({
						value: form_value,
						text: payload_value,
						weight: 0.5,
						type: "@",
					});
				}
			}

			if (
				typeof form["sortOptions"] !== "undefined" &&
				!form["sortOptions"].some((el) => el.value === 'audience_relevance')
			) {
				form["sortOptions"].push({
					field: "audience_relevance",
					id: 0,
					direction: "desc",
					text: "Tag Relevance",
					value: "audience_relevance",
				});
			}

			payload["sort"]["field"] = key;
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	removeSearchFilters = (key, index, value) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (key === "audience_relevance") {
			delete payload["filter"][key];
			delete form["filter"][key];
		} else if (key === "relevance") {
			form["filter"][key].splice(index, 1);
			if (typeof payload["filter"][key].value !== "undefined") {
				let updated_relevance = payload["filter"][key].value.replace(
					"@" + value,
					""
				);
				form["relvance_value"] = updated_relevance;
				payload["filter"][key].value = updated_relevance;
			}
		}

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleSearchChange = (e, key) => {
		let value = e.target.value;
		if (this.timeout) clearTimeout(this.timeout);
		if (key === "audience_relevance") {
			let query = {
				q: value,
				type: "lookalike",
				platform: this.props.platform,
				limit: 10,
				flag: "lookalike",
			};
			this.timeout = setTimeout(() => {
				this.props.searchLookalikes(query);
			}, 500);
		} else {
			let query = {
				q: value,
				type: "topic-tags",
				platform: this.props.platform,
				limit: 10,
				flag: "lookalike",
			};
			this.timeout = setTimeout(() => {
				this.props.searchLookalikes(query);
			}, 500);
		}
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

	render() {
		const { lookalikes, topictags, form } = this.props;
		const { selected_brand, selected_influencer } = this.state;

		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${form.filter.audience_relevance ||
							(form.filter.relevance && form.filter.relevance.length)
							? "bg-[#7c3292] !border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
						} ${this.props.className
						}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Lookalikes
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
											tooltipText={tooltip.lookalikes_audience_tooltip}
											placement="top-left"
										/>
									</div>
									<Combobox
										onChange={(data) =>
											this.handleSearchFilters("audience_relevance", data)
										}
									>
										<div className="relative mt-1 z-50 w-full">
											<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
												<Combobox.Button className="w-full">
													<Combobox.Input
														className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
														placeholder="Name or @handle"
														onChange={(e) =>
															this.handleSearchChange(e, "audience_relevance")
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
													{lookalikes === undefined ||
														lookalikes.length === 0 ? (
														<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
															No results found.
														</div>
													) : (
														lookalikes.map((brand, key) => (
															<Combobox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${brand.username === selected_brand
																		? "bg-[#00000008] text-black font-semibold"
																		: "text-gray-900 font-medium"
																	}`}
																value={brand}
															>
																<div className="flex items-center">
																	<div className="w-[45px] h-[45px] rounded-full overflow-hidden shrink-0">
																		{brand.picture ? (
																			<img
																				src={brand.picture}
																				alt={brand.fullname}
																				className="w-[45px] h-[45px] rounded-full object-cover"
																			/>
																		) : (
																			<div className="w-[45px] h-[45px] rounded-full bg-gray-300" />
																		)}
																	</div>
																	<div className="ml-2 flex items-center grow">
																		<div className="grow">
																			<p className="text-[12px]">
																				{brand.username
																					? "@" + truncate(brand.username)
																					: "@" + truncate(brand.custom_name || brand.handle)}
																			</p>
																			<p className="font-medium text-[13px]">
																				{truncate(brand.fullname)}
																			</p>
																		</div>
																		<p className="text-[12px] text-semibold pl-2">
																			<FormatedNumber num={brand.followers} />
																		</p>
																	</div>
																</div>
															</Combobox.Option>
														))
													)}
												</Combobox.Options>
											</Transition>
										</div>
									</Combobox>
									<>
										{form.filter.audience_relevance ? (
											<div className="flex items-center justify-between mt-4">
												<div className="flex items-center ">
													<IoCloseCircle
														size={20}
														className="cursor-pointer purple"
														onClick={() =>
															this.removeSearchFilters(
																"audience_relevance",
																"",
																""
															)
														}
													/>
													<p>{form.filter.audience_relevance.value}</p>
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
												tooltipText={tooltip.lookalikes_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("relevance")}
												className={`${this.state.enabled ? "bg-[#7c3292]" : "bg-white"
													} relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
											>
												<span
													aria-hidden="true"
													className={`${this.state.enabled
															? "translate-x-[15px] bg-white"
															: "translate-x-[1px] bg-[#adb5bd]"
														} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
												/>
											</Switch>
											<span
												onClick={() => this.addInfluencerActions("relevance")}
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
										onChange={(data) =>
											this.handleSearchFilters("relevance", data)
										}
									>
										<div className="relative mt-1 z-50 w-full">
											<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
												<Combobox.Button className="w-full">
													<Combobox.Input
														className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
														placeholder="Name or @handle"
														onChange={(e) =>
															this.handleSearchChange(e, "relevance")
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
													{topictags === undefined || topictags.length === 0 ? (
														<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
															No results found.
														</div>
													) : (
														topictags.map((brand, key) => (
															<Combobox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${brand.username === selected_influencer
																		? "bg-[#00000008] text-black font-semibold"
																		: "text-gray-900 font-medium"
																	}`}
																value={brand}
															>
																<div className="flex items-center">
																	<div className="w-[45px] h-[45px] rounded-full overflow-hidden shrink-0">
																		{brand.picture ? (
																			<img
																				src={brand.picture}
																				alt={brand.fullname}
																				className="w-[45px] h-[45px] rounded-full object-cover"
																			/>
																		) : (
																			<div className="w-[45px] h-[45px] rounded-full bg-gray-300" />
																		)}
																	</div>
																	<div className="ml-2 flex items-center grow">
																		<div className="grow">
																			<p className="text-[12px]">
																				{brand.username
																					? "@" + truncate(brand.username)
																					: "@" + truncate(brand.custom_name || brand.handle)}
																			</p>
																			<p className="font-medium text-[13px]">
																				{truncate(brand.fullname)}
																			</p>
																		</div>
																		<p className="text-[12px] text-semibold pl-2">
																			<FormatedNumber num={brand.followers} />
																		</p>
																	</div>
																</div>
															</Combobox.Option>
														))
													)}
												</Combobox.Options>
											</Transition>
										</div>
									</Combobox>
									<>
										{form.filter.relevance && form.filter.relevance.length
											? form.filter.relevance.map((item, index) => (
												<div
													className="flex items-center justify-between mt-4"
													key={index}
												>
													<div className="flex items-center ">
														<IoCloseCircle
															size={20}
															className="cursor-pointer purple"
															onClick={() =>
																this.removeSearchFilters(
																	"relevance",
																	index,
																	item.text
																)
															}
														/>
														<p>{item.value}</p>
													</div>
												</div>
											))
											: ""}
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
		isLookalikeLoading: influencerSearch.isLookalikeLoading,
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
		form: influencerSearch.form,
		lookalikes: influencerSearch.lookalikes,
		topictags: influencerSearch.topictags,
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
		searchLookalikes: (data) => {
			actions.searchLookalikes(dispatch, data);
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

export default connect(mapStateToProps, undefined, mergeProps)(Lookalikes);

function truncate(input) {
	if (input && input.length > 13) {
		return input.substring(0, 13) + "...";
	}
	return input;
}
