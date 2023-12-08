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

class Gender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled:
				this.props.actions.filter((i) => i.filter === "gender").length > 0,
			defGender: "50%",
		};
	}

	handleSearchFilters = (e, key) => {
		this.setState({ defGender: "50%" });
		let value = e.target.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (value) {
			if (key === "audience_gender") {
				payload["filter"][key] = { code: value, weight: 0.5 };
				form["filter"][key] = { code: value, weight: 0.5 };

				if (typeof form["sortOptions"] !==  "undefined") {
					form["sortOptions"] = form["sortOptions"].filter((el) => {
						return el.value !==  key;
					});
					if (!form["sortOptions"].some((el) => el.value === key)) {
						form["sortOptions"].push({
							field: key,
							id: 0,
							direction: "desc",
							text: value,
							value: key,
						});
					}
				}
			} else {
				payload["filter"][key] = { code: value };
				form["filter"][key] = { code: value };
			}
		} else {
			delete payload["filter"][key];
			delete form["filter"][key];
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleFilterWeight = (data, key) => {
		this.setState({ defGender: data.text });
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

	render() {
		const { form, payload } = this.props;
		const { defGender } = this.state;

		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.audience_gender || form.filter.gender
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Gender
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
							<div className="flex flex-wrap sm:!flex-nowrap gx-5">
								<div className="w-full mb-4 sm:!mb-0">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center">
										<ImUsers className="mr-2" /> Audience
										<Tooltip
											trigger={
												<div className="ml-2">
													<AiFillQuestionCircle color="#9ea1b2" size={18} />
												</div>
											}
											tooltipText={tooltip.gender_audience_tooltip}
											placement="top-left"
										/>
									</div>
									<div className="flex items-center">
										<div className="mt-5 space-y-4">
											<label
												htmlFor="gender1"
												className="flex items-center cursor-pointer relative text-black text-[14px]"
											>
												<input
													id="gender1"
													type="radio"
													checked={
														payload["filter"].hasOwnProperty("audience_gender")
															? false
															: true
													}
													onChange={(e) =>
														this.handleSearchFilters(e, "audience_gender")
													}
													value=""
													className="absolute opacity-0 z-[0] peer"
												/>
												<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
												Any
											</label>
											<label
												htmlFor="gender2"
												className="flex items-center cursor-pointer relative text-black text-[14px]"
											>
												<input
													id="gender2"
													type="radio"
													checked={
														payload["filter"].hasOwnProperty(
															"audience_gender"
														) &&
														payload["filter"]["audience_gender"].code === "MALE"
															? true
															: false
													}
													onChange={(e) =>
														this.handleSearchFilters(e, "audience_gender")
													}
													value="MALE"
													className="absolute opacity-0 z-[0] peer"
												/>
												<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
												Male
											</label>
											<label
												htmlFor="gender3"
												className="flex items-center cursor-pointer relative text-black text-[14px]"
											>
												<input
													id="gender3"
													type="radio"
													checked={
														payload["filter"].hasOwnProperty(
															"audience_gender"
														) &&
														payload["filter"]["audience_gender"].code ===
															"FEMALE"
															? true
															: false
													}
													onChange={(e) =>
														this.handleSearchFilters(e, "audience_gender")
													}
													value="FEMALE"
													className="absolute opacity-0 z-[0] peer"
												/>
												<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
												Female
											</label>
										</div>
									</div>
									{form.filter.audience_gender ? (
										<div>
											<Listbox
												onChange={(data) =>
													this.handleFilterWeight(data, "audience_gender")
												}
											>
												<div className="relative w-full mt-4">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">{defGender}</span>
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
															{Weight.map((gender, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		gender.text === defGender
																			? "bg-[#00000008]"
																			: ""
																	}`}
																	value={gender}
																>
																	<span
																		className={`block ${
																			gender.text === defGender
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																		}`}
																	>
																		{gender.text}
																	</span>
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</Listbox>
										</div>
									) : (
										""
									)}
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
												tooltipText={tooltip.gender_influencer_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("gender")}
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
												onClick={() => this.addInfluencerActions("gender")}
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
											htmlFor="gender4"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender4"
												type="radio"
												checked={
													typeof form.filter?.gender?.code === "undefined"
														? true
														: false
												}
												onChange={(e) => this.handleSearchFilters(e, "gender")}
												value=""
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Any
										</label>
										<label
											htmlFor="gender5"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender5"
												type="radio"
												checked={
													form.filter?.gender?.code === "MALE" ? true : false
												}
												onChange={(e) => this.handleSearchFilters(e, "gender")}
												value="MALE"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Male
										</label>
										<label
											htmlFor="gender6"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender6"
												type="radio"
												checked={
													form.filter?.gender?.code === "FEMALE" ? true : false
												}
												onChange={(e) => this.handleSearchFilters(e, "gender")}
												value="FEMALE"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Female
										</label>
										<label
											htmlFor="gender7"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender7"
												type="radio"
												checked={
													form.filter?.gender?.code === "KNOWN" ? true : false
												}
												onChange={(e) => this.handleSearchFilters(e, "gender")}
												value="KNOWN"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Male or Female
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText="Gender known"
												placement="top-left"
											/>
										</label>
										<label
											htmlFor="gender8"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender8"
												type="radio"
												checked={
													form.filter?.gender?.code === "UNKNOWN" ? true : false
												}
												onChange={(e) => this.handleSearchFilters(e, "gender")}
												value="UNKNOWN"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Gender Neutral
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText="Gender unknown"
												placement="top-left"
											/>
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

export default connect(mapStateToProps, undefined, mergeProps)(Gender);
