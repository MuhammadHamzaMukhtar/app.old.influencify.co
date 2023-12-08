import { Component, Fragment } from "react";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
import { ImUsers } from "react-icons/im";
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

class Ethnicity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defEthnicity: "30%",
		};
	}

	handleSearchFilters = (e, key) => {
		this.setState({ defEthnicity: "30%" });
		let value = e.target.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (value) {
			payload["filter"][key] = { code: value, weight: 0.3 };
			form["filter"][key] = { code: value, weight: 0.3 };
		} else {
			delete payload["filter"][key];
			delete form["filter"][key];
		}

		if (typeof form["sortOptions"] !== "undefined") {
			form["sortOptions"] = form["sortOptions"].filter((el) => {
				return el.value !== key;
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

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	handleFilterWeight = (data, key) => {
		this.setState({ defEthnicity: data.text });
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

	render() {
		const { form, payload } = this.props;
		const { defEthnicity } = this.state;
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.audience_race
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Ethnicity
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
									<div className="mb-1 font-medium whitespace-nowrap flex items-center">
										<ImUsers className="mr-2" /> Audience
										<Tooltip
											trigger={
												<div className="ml-2">
													<AiFillQuestionCircle color="#9ea1b2" size={18} />
												</div>
											}
											tooltipText={tooltip.ethnicity_audience_tooltip}
											placement="top-left"
										/>
									</div>
									<div className="mt-5 space-y-4">
										<label
											htmlFor="race1"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="race1"
												type="radio"
												checked={
													payload["filter"].hasOwnProperty("audience_race")
														? false
														: true
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "audience_race")
												}
												value=""
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Any
										</label>
										<label
											htmlFor="race2"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="race2"
												type="radio"
												checked={
													payload["filter"].hasOwnProperty("audience_race") &&
													payload["filter"]["audience_race"]["code"] === "Black"
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "audience_race")
												}
												value="Black"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											African Descent
										</label>
										<label
											htmlFor="race3"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="race3"
												type="radio"
												checked={
													payload["filter"].hasOwnProperty("audience_race") &&
													payload["filter"]["audience_race"]["code"] === "Asian"
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "audience_race")
												}
												value="Asian"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Asian
										</label>
										<label
											htmlFor="race4"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="race4"
												type="radio"
												checked={
													payload["filter"].hasOwnProperty("audience_race") &&
													payload["filter"]["audience_race"]["code"] === "White"
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "audience_race")
												}
												value="White"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											White / Caucasian
										</label>
										<label
											htmlFor="race5"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="race5"
												type="radio"
												checked={
													payload["filter"].hasOwnProperty("audience_race") &&
													payload["filter"]["audience_race"]["code"] ===
														"Hispanic"
														? true
														: false
												}
												onChange={(e) =>
													this.handleSearchFilters(e, "audience_race")
												}
												value="Hispanic"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Hispanic / American
										</label>
									</div>
									{form.filter.audience_race ? (
										<div>
											<Listbox
												onChange={(data) =>
													this.handleFilterWeight(data, "audience_race")
												}
											>
												<div className="relative w-full mt-4">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">{defEthnicity}</span>
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
															{Weight.map((eth, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		eth.text === defEthnicity
																			? "bg-[#00000008]"
																			: ""
																	}`}
																	value={eth}
																>
																	<span
																		className={`block ${
																			eth.text === defEthnicity
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																		}`}
																	>
																		{eth.text}
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
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Ethnicity);
