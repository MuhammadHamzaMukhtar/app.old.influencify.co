import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { HiSpeakerphone } from "react-icons/hi";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const followerIntervals = [
	{
		value: "",
		text: "Choose the interval",
	},
	{
		value: "i1month",
		text: "1 month",
	},
	{
		value: "i2months",
		text: "2 months",
	},
	{
		value: "i3months",
		text: "3 months",
	},
	{
		value: "i4months",
		text: "4 months",
	},
	{
		value: "i5months",
		text: "5 months",
	},
	{
		value: "i6months",
		text: "6 months",
	},
];

const followersGrowth = [
	{
		value: "gte-0.1",
		text: ">10%",
	},
	{
		value: "gte-0.2",
		text: ">20%",
	},
	{
		value: "gte-0.3",
		text: ">30%",
	},
	{
		value: "gte-0.4",
		text: ">40%",
	},
	{
		value: "gte-0.5",
		text: ">50%",
	},
	{
		value: "gte-0.6",
		text: ">60%",
	},
	{
		value: "gte-0.7",
		text: ">70%",
	},
	{
		value: "gte-0.8",
		text: ">80%",
	},
	{
		value: "gte-0.9",
		text: ">90%",
	},
	{
		value: "gte-1",
		text: ">100%",
	},
	{
		value: "gte-1.1",
		text: ">110%",
	},
	{
		value: "gte-1.2",
		text: ">120%",
	},
	{
		value: "gte-1.3",
		text: ">130%",
	},
	{
		value: "gte-1.4",
		text: ">140%",
	},
	{
		value: "gte-1.5",
		text: ">150%",
	},
	{
		value: "gte-1.6",
		text: ">160%",
	},
	{
		value: "gte-1.7",
		text: ">170%",
	},
	{
		value: "gte-1.8",
		text: ">180%",
	},
	{
		value: "gte-1.9",
		text: ">190%",
	},
	{
		value: "gte-2",
		text: ">200%",
	},
	{
		value: "gte-2.1",
		text: ">210%",
	},
	{
		value: "gte-2.2",
		text: ">220%",
	},
	{
		value: "gte-2.3",
		text: ">230%",
	},
	{
		value: "gte-2.4",
		text: ">240%",
	},
	{
		value: "gte-2.5",
		text: ">250%",
	},
	{
		value: "gte-2.6",
		text: ">260%",
	},
	{
		value: "gte-2.7",
		text: ">270%",
	},
	{
		value: "gte-2.8",
		text: ">280%",
	},
	{
		value: "gte-2.9",
		text: ">290%",
	},
	{
		value: "gte-3",
		text: ">300%",
	},
	{
		value: "gte-3.1",
		text: ">310%",
	},
	{
		value: "gte-3.2",
		text: ">320%",
	},
	{
		value: "gte-3.3",
		text: ">330%",
	},
	{
		value: "gte-3.4",
		text: ">340%",
	},
	{
		value: "gte-3.5",
		text: ">350%",
	},
	{
		value: "gte-3.6",
		text: ">360%",
	},
	{
		value: "gte-3.7",
		text: ">370%",
	},
	{
		value: "gte-3.8",
		text: ">380%",
	},
	{
		value: "gte-3.9",
		text: ">390%",
	},
	{
		value: "gte-4",
		text: ">400%",
	},
	{
		value: "lte-1",
		text: "<100%",
	},
	{
		value: "lte-1.1",
		text: "<110%",
	},
	{
		value: "lte-1.2",
		text: "<120%",
	},
	{
		value: "lte-1.3",
		text: "<130%",
	},
	{
		value: "lte-1.4",
		text: "<150%",
	},
	{
		value: "lte-1.5",
		text: "<150%",
	},
	{
		value: "lte-1.6",
		text: "<160%",
	},
	{
		value: "lte-1.7",
		text: "<170%",
	},
	{
		value: "lte-1.8",
		text: "<180%",
	},
	{
		value: "lte-1.9",
		text: "<190%",
	},
	{
		value: "lte-2",
		text: "<200%",
	},
	{
		value: "lte-2.1",
		text: "<210%",
	},
	{
		value: "lte-2.2",
		text: "<220%",
	},
	{
		value: "lte-2.3",
		text: "<230%",
	},
	{
		value: "lte-2.4",
		text: "<240%",
	},
	{
		value: "lte-2.5",
		text: "<250%",
	},
	{
		value: "lte-2.6",
		text: "<260%",
	},
	{
		value: "lte-2.7",
		text: "<270%",
	},
	{
		value: "lte-2.8",
		text: "<280%",
	},
	{
		value: "lte-2.9",
		text: "<290%",
	},
	{
		value: "lte-3",
		text: "<300%",
	},
	{
		value: "lte-3.1",
		text: "<310%",
	},
	{
		value: "lte-3.2",
		text: "<320%",
	},
	{
		value: "lte-3.3",
		text: "<330%",
	},
	{
		value: "lte-3.4",
		text: "<340%",
	},
	{
		value: "lte-3.5",
		text: "<350%",
	},
	{
		value: "lte-3.6",
		text: "<360%",
	},
	{
		value: "lte-3.7",
		text: "<370%",
	},
	{
		value: "lte-3.8",
		text: "<380%",
	},
	{
		value: "lte-3.9",
		text: "<390%",
	},
	{
		value: "lte-4",
		text: "<400%",
	},
	{
		value: "lte-4.1",
		text: "<410%",
	},
	{
		value: "lte-4.2",
		text: "<420%",
	},
	{
		value: "lte-4.3",
		text: "<430%",
	},
	{
		value: "lte-4.4",
		text: "<440%",
	},
	{
		value: "lte-4.5",
		text: "<450%",
	},
	{
		value: "lte-4.6",
		text: "<460%",
	},
	{
		value: "lte-4.7",
		text: "<470%",
	},
	{
		value: "lte-4.8",
		text: "<480%",
	},
	{
		value: "lte-4.9",
		text: "<490%",
	},
	{
		value: "lte-5",
		text: "<500%",
	},
];

class Growing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interval: "",
			views_interval: "",
			growth:  "gte-1.5",
			views_growth: "gte-1.5",
		};
	}

	handleSearchFilters = (data, key) => {
		let value = data.value;
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		let text = "";
		if (key === "followers_growth") {
			text = "Followers Growth";
		} else if (key === "total_views_growth") {
			text = "Total Views Growth";
		} else if (key === "total_likes_growth") {
			text = "Total Likes Growth";
		}

		if (value) {
			if (
				typeof form["sortOptions"] != "undefined" &&
				!form["sortOptions"].some((el) => el.value === key)
			) {
				form["sortOptions"].push({
					field: key,
					id: 0,
					direction: "desc",
					text: text,
					value: key,
				});
			}
			payload["sort"]["field"] = key;
			payload["filter"][key] = {
				interval: value,
				operator: "gte",
				value: this.state.growth.split('-')[1],
			};
			form["filter"][key] = {
				interval: value,
				operator: "gte",
				value: this.state.growth.split('-')[1],
			};
		} else {
			delete payload["filter"][key];
			delete form["filter"][key];
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
		if (key === "followers_growth") {
			this.setState({ interval: data.value });
		}
		if (key === "total_views_growth" || key === "total_likes_growth") {
			this.setState({ views_interval: data.value });
		}
	};

	handleFilterWeight = (data, key) => {
		let value = data.value;
		value = value.split("-");
		const payload = Object.assign({}, this.props.payload);
		payload["filter"][key].operator = value[0];
		payload["filter"][key].value = value[1];

		const form = Object.assign({}, this.props.form);
		form["filter"][key].operator = value[0];
		form["filter"][key].value = value[1];

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
		if (key === "followers_growth") {
			this.setState({ growth: data.value });
		}
		if (key === "total_views_growth" || key === "total_likes_growth") {
			this.setState({ views_growth: data.value });
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

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { form, platform } = this.props;
		let InstaFolGrowth =
			form["filter"] &&
			form["filter"]["followers_growth"] &&
			form["filter"]["followers_growth"]["interval"]
				? form["filter"]["followers_growth"]["interval"]
				: "";
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${
						form.filter.followers_growth ||
						form.filter.total_views_growth ||
						form.filter.total_likes_growth
							? "bg-[#7c3292] !border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Growing
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
						
						{platform === "youtube" && (
							<>
								<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
									<div className="flex items-center mb-4">
										<div className="w-full">
											<p className="mb-1 font-medium whitespace-nowrap flex items-center">
												Followers Growth
											</p>
											<Listbox
												onChange={(data) =>
													this.handleSearchFilters(data, "followers_growth")
												}
											>
												<div className="relative w-full z-50">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																followerIntervals,
																this.state.interval
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
															{followerIntervals.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.value === this.state.interval
																			? "bg-[#00000008]"
																			: ""
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.value === this.state.interval
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
											{form.filter.followers_growth ? (
												<Listbox
													onChange={(data) =>
														this.handleFilterWeight(data, "followers_growth")
													}
												>
													<div className="relative w-full z-40">
														<Listbox.Button className="relative w-full mt-3 cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
															<span className="block">
																{this.defaultValue(
																	followersGrowth,
																	this.state.growth
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
																{followersGrowth.map((age, key) => (
																	<Listbox.Option
																		key={key}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			age.value === this.state.growth
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value={age}
																	>
																		<span
																			className={`block ${
																				age.value === this.state.growth
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
											) : (
												""
											)}
										</div>
									</div>

									<div className="flex items-center">
										<div className="w-full">
											<p className="mb-1 font-medium whitespace-nowrap flex items-center">
												Total Views Growth
											</p>
											<Listbox
												onChange={(data) =>
													this.handleSearchFilters(data, "total_views_growth")
												}
											>
												<div className="relative w-full z-30">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																followerIntervals,
																this.state.views_interval
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
															{followerIntervals.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.value === this.state.views_interval
																			? "bg-[#00000008]"
																			: ""
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.value === this.state.views_interval
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
											{form.filter.total_views_growth ? (
												<Listbox
													onChange={(data) =>
														this.handleFilterWeight(data, "total_views_growth")
													}
												>
													<div className="relative w-full z-20">
														<Listbox.Button className="relative w-full mt-3 cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
															<span className="block">
																{this.defaultValue(
																	followersGrowth,
																	this.state.views_growth
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
																{followersGrowth.map((age, key) => (
																	<Listbox.Option
																		key={key}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			age.value === this.state.views_growth
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value={age}
																	>
																		<span
																			className={`block ${
																				age.value === this.state.views_growth
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
											) : (
												""
											)}
										</div>
									</div>
								</div>
							</>
						)}
						{platform === "tiktok" && (
							<>
								<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
									<div className="flex items-center mb-4">
										<div className="w-full">
											<p className="mb-1 font-medium whitespace-nowrap flex items-center">
												Followers Growth
											</p>
											<Listbox
												onChange={(data) =>
													this.handleSearchFilters(data, "followers_growth")
												}
											>
												<div className="relative w-full z-50">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block">
															{this.defaultValue(
																followerIntervals,
																this.state.interval
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
															{followerIntervals.map((age, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		age.value === this.state.interval
																			? "bg-[#00000008]"
																			: ""
																	}`}
																	value={age}
																>
																	<span
																		className={`block ${
																			age.value === this.state.interval
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
											{form.filter.followers_growth ? (
												<Listbox
													onChange={(data) =>
														this.handleFilterWeight(data, "followers_growth")
													}
												>
													<div className="relative w-full z-40">
														<Listbox.Button className="relative mt-3 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
															<span className="block">
																{this.defaultValue(
																	followersGrowth,
																	this.state.growth
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
																{followersGrowth.map((age, key) => (
																	<Listbox.Option
																		key={key}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																			age.value === this.state.growth
																				? "bg-[#00000008]"
																				: ""
																		}`}
																		value={age}
																	>
																		<span
																			className={`block ${
																				age.value === this.state.growth
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
											) : (
												""
											)}
										</div>
									</div>
									<div className="flex items-center">
										<div className="w-full">
											<p className="mb-1 font-medium whitespace-nowrap flex items-center">
												Total Likes Growth
											</p>
											<div>
												<div>
													<Listbox
														onChange={(data) =>
															this.handleSearchFilters(
																data,
																"total_likes_growth"
															)
														}
													>
														<div className="relative w-full z-30">
															<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
																<span className="block">
																	{this.defaultValue(
																		followerIntervals,
																		this.state.views_interval
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
																	{followerIntervals.map((age, key) => (
																		<Listbox.Option
																			key={key}
																			className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																				age.value === this.state.views_interval
																					? "bg-[#00000008]"
																					: ""
																			}`}
																			value={age}
																		>
																			<span
																				className={`block ${
																					age.value ===
																					this.state.views_interval
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
												{form.filter.total_likes_growth ? (
													<Listbox
														onChange={(data) =>
															this.handleFilterWeight(
																data,
																"total_likes_growth"
															)
														}
													>
														<div className="relative w-full z-20">
															<Listbox.Button className="relative mt-3 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
																<span className="block">
																	{this.defaultValue(
																		followersGrowth,
																		this.state.views_growth
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
																	{followersGrowth.map((age, key) => (
																		<Listbox.Option
																			key={key}
																			className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																				age.value === this.state.views_growth
																					? "bg-[#00000008]"
																					: ""
																			}`}
																			value={age}
																		>
																			<span
																				className={`block ${
																					age.value === this.state.views_growth
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
												) : (
													""
												)}
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</Popover.Panel>
				</Transition>
			</Popover>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		payload: influencerSearch.payload,
		form: influencerSearch.form,
		platform: influencerSearch.platform,
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

export default connect(mapStateToProps, undefined, mergeProps)(Growing);
