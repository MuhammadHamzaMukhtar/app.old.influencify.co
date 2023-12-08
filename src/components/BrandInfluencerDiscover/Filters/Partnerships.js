import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { ImUsers } from "react-icons/im";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import tooltip from "../../../constants/tooltip";
import { Popover, Combobox, Transition } from "@headlessui/react";

class Partnerships extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled:
				this.props.actions.filter((i) => i.filter === "ads_brands").length > 0,
			has_ads:
				this.props.actions.filter((i) => i.filter === "has_ads").length > 0,
			query_brand: "",
		};
	}

	handleSearchFilters = (data, key) => {
		let text = data.text;
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);

		if (payload["filter"].hasOwnProperty(key) === false) {
			payload["filter"][key] = [value];
		} else {
			if (!payload["filter"][key].some((el) => el === value)) {
				payload["filter"][key].push(value);
			}
		}

		if (form["filter"].hasOwnProperty(key) === false) {
			form["filter"][key] = [{ id: value, name: text }];
		} else {
			if (!form["filter"][key].some((el) => el.id === value)) {
				form["filter"][key].push({ id: value, name: text });
			}
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	removeSearchFilters = (key, index) => {
		const payload = Object.assign({}, this.props.payload);
		payload["filter"][key].splice(index, 1);

		const form = Object.assign({}, this.props.form);
		form["filter"][key].splice(index, 1);

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleChange = (e, key) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (e.target.checked) {
			delete payload["filter"][key];
			delete form["filter"][key];

			payload["filter"]["has_ads"] = true;
			form["filter"]["has_ads"] = true;
		} else {
			delete payload["filter"]["has_ads"];
			delete form["filter"]["has_ads"];
		}
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
		let checked = false;
		if(key == 'has_ads'){
			this.setState({ has_ads: !this.state.has_ads });
			checked = this.state.has_ads;
		} else {
			this.setState({ enabled: !this.state.enabled });
			checked = this.state.enabled;
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

	render() {
		let { brands, form } = this.props;
		const { query_brand } = this.state;
		if (brands === undefined) {
			brands = [];
		}

		let filteredBrand =
			query_brand === ""
				? brands
				: brands.filter((person) =>
						person.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_brand.toLowerCase().replace(/\s+/g, ""))
				  );
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						(form.filter.ads_brands && form.filter.ads_brands.length) ||
						form.filter.has_ads
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Affiliates
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
											<ImUsers className="mr-2" /> Audience
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.affiliates_audience_tooltip}
												placement="bottom-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("ads_brands")}
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
												onClick={() => this.addInfluencerActions("ads_brands")}
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
										value={this.state.selected_brand}
										onChange={(data) =>
											this.handleSearchFilters(data, "ads_brands")
										}
									>
										<div className="relative mt-1 z-50 w-full">
											<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
												<Combobox.Button className="w-full">
													<Combobox.Input
														className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
														displayValue={this.state.selected_brand}
														placeholder="Add Affiliate"
														onChange={(event) =>
															this.setState({
																query_brand: event.target.value,
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
												afterLeave={() => this.setState({ query_brand: "" })}
											>
												<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
													{filteredBrand.length === 0 && query_brand !== "" ? (
														<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
															No results found.
														</div>
													) : (
														filteredBrand.slice(0, 100).map((brand, key) => (
															<Combobox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	brand.text === this.state.selected_brand
																		? "bg-[#00000008] text-black font-semibold"
																		: "text-gray-900 font-medium"
																}`}
																value={brand}
															>
																<div className="flex items-center">
																	<span className={`block truncate `}>
																		{brand.text}
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
										{form.filter.ads_brands && form.filter.ads_brands.length > 0
											? form.filter.ads_brands.map((item, index) => (
													<div
														className="flex items-center justify-between mt-4"
														key={index}
													>
														<div className="flex items-center ">
															<IoCloseCircle
																size={20}
																className="cursor-pointer purple"
																onClick={() =>
																	this.removeSearchFilters("ads_brands", index)
																}
															/>
															<p>{item.name}</p>
														</div>
													</div>
											  ))
											: ""}
									</>
								</div>
							</div>
							<div className="flex items-center justify-between mt-1">
								<div className="flex items-center ">
									<label
										htmlFor="adsbrand"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="adsbrand"
											type="checkbox"
											onChange={(e) => this.handleChange(e, "has_ads")}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
									</label>
									<p>Any</p>
									<Tooltip
										trigger={
											<div className="ml-2 cursor-pointer">
												<AiFillQuestionCircle color="#9ea1b2" size={18} />
											</div>
										}
										tooltipText={tooltip.affiliates_any_tooltip}
										placement="top-left"
									/>
								</div>
								<div className="flex items-center">
									<Switch
										checked={this.state.has_ads}
										onChange={() => this.addInfluencerActions("has_ads")}
										className={`${
											this.state.has_ads ? "bg-[#7c3292]" : "bg-white"
										} relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
									>
										<span
											aria-hidden="true"
											className={`${
												this.state.has_ads
													? "translate-x-[15px] bg-white"
													: "translate-x-[1px] bg-[#adb5bd]"
											} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
										/>
									</Switch>
									<span
										onClick={() => this.addInfluencerActions("has_ads")}
										className="ml-2"
									>
										{this.state.has_ads ? "-" : "+"}
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
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		form: influencerSearch.form,
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
		brands: influencerSearch.brands,
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

export default connect(mapStateToProps, undefined, mergeProps)(Partnerships);
