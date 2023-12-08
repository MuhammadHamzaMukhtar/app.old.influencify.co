import { Component, Fragment } from "react";
import { Dialog, Transition, Listbox, Disclosure } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import Items from "@components/BrandInfluentialInstagram/Items/MentionItems";
import { BsSortDownAlt } from "react-icons/bs";
import SelectedItems from "@components/BrandInfluentialInstagram/Items/MentionSelectedItems";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import Exportlist from "@components/Exportlist";
import ErrorHandlerModal from "../ErrorHandlerModal";
import Emitter from "../../constants/Emitter";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import InfluencerListModal from "../InfluencerListModal";
import Button from "@components/global/Button";
import { FiX } from "react-icons/fi";

const sortOptions = [
	{
		key: "followers",
		text: "Followers",
		value: "followers",
	},
	{
		key: "engagements",
		text: "Engagements",
		value: "engagements",
	},
	{
		key: "engagementRate",
		text: "Engagement Rate",
		value: "engagementRate",
	},
];

class InfluencialMentions extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
		this.state = {
			sortQuery: "followers",
			showmodal: false,
			toggleButton: false,
			campaign_type: false,
		};
		this.page = 0;
		this.limit = 12;
	}

	componentDidMount() {
		setTimeout(() => {
			const payload = {
				filter: {
					username: 
						{
							// type: "mention",
							// action: "should",
							value: this.props.userName,
						},
					
					with_contact: [{ type: "email", action: "should" }],
					gender: { code: "KNOWN" },
				},
				paging: { skip: this.limit * this.page, limit: this.limit },
				sort: { field: "followers", id: 0, direction: "desc" },
			};

			const data = {
				platform: "instagram",
				payload: payload,
			};

			this.props.fetchInfluentialMention(data);
		}, 1000);
	}

	fetchInfluentialMention = () => {
		this.page++;
		const payload = {
			filter: {
				username: 
					{
						// type: "mention",
						// action: "should",
						value: this.props.userName,
					},

					with_contact: [{ type: "email", action: "should" }],
				gender: { code: "KNOWN" },
			},
			paging: { skip: this.limit * this.page, limit: this.limit },
			sort: { field: "followers", id: 0, direction: "desc" },
		};

		const data = {
			platform: "instagram",
			payload: payload,
		};

		this.props.fetchInfluentialMention(data);
	};

	selectAllInfluencers = (e) => {
		this.props.addSelectedInfluencers(e.target.checked ? this.props.data : []);
	};

	newCampaignWithNotable = (type) => {
		let query = {
			platform: "instagram",
			selected_influencers: this.props.data,
			campaign_type: type,
		};
		this.props.createCampaignSelected(query);
	};

	handleChangeFilter = (sort) => {
		this.setState({ sortQuery: sort });
		this.page = 0;
		const payload = {
			filter: {
				username: 
					{
						// type: "mention",
						// action: "should",
						value: this.props.userName,
					},
				
				with_contact: [{ type: "email", action: "should" }],
				gender: { code: "KNOWN" },
			},
			paging: { skip: this.limit * this.page, limit: this.limit },
			sort: { field: sort, id: 0, direction: "desc" },
		};
		const data = {
			platform: "instagram",
			payload: payload,
		};

		this.props.fetchInfluentialMention(data);
	};

	closeInfluenceModalList = () => {
		this.setState({ showmodal: false });
	};

	showInfluencerList = () => {
		if (this.props.refreshData.is_admin) {
			this.setState({ showmodal: true });
			let query = {
				platform: this.props.platform,
			};
			this.props.fetchBrandLists(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { selected_influencers, data, total, isFetching } = this.props;

		return (
			<>
				<div className="flex flex-wrap">
					<div className="lg:w-9/12 md:w-8/12 w-full order-2 md:!order-1 pr-3">
						{data && data.length > 0 && (
							<div className="mb-12 flex flex-wrap items-center">
								<div className="lg:w-5/12 md:w-7/12 sm:w-6/12 w-full">
									<div className="flex items-center">
										<p className="whitespace-nowrap mr-2 flex items-center">
											<BsSortDownAlt size={18} className="" /> Sort by:
										</p>
										<Listbox onChange={(data) => this.handleChangeFilter(data)}>
											<div className="relative w-[14em] z-50">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block">
														{this.defaultValue(
															sortOptions,
															this.state.sortQuery || ""
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
														{sortOptions.map((sort, key) => (
															<Listbox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																	sort.value === this.state.sortQuery || ""
																		? "bg-[#00000008]"
																		: ""
																}`}
																value={sort.value}
															>
																<span
																	className={`block ${
																		sort.value === this.state.sortQuery || ""
																			? "purple font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																>
																	{sort.text}
																</span>
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</Listbox>
									</div>
								</div>
								<div className="lg:w-4/12 md:w-5/12 sm:w-6/12 w-full mt-4 sm:!mt-auto mb-4 sm:!mb-auto">
									<p>
										Show{" "}
										{total
											? total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
											: ""}{" "}
										results
									</p>
								</div>
								{selected_influencers && selected_influencers.length > 0 && (
									<div className="sm:w-3/12 w-full pr-0 ml-auto lg:!mt-0 mt-4">
										<Exportlist
											influencerAnalyzer="followers"
											AnalyzedUsers={selected_influencers}
											totalInfluencers={selected_influencers.length}
											platform={this.props.platform}
										/>
									</div>
								)}
							</div>
						)}
						{data && data.length > 0 && (
							<div className="mb-6">
								<label
									htmlFor="selectall"
									className="cursor-pointer flex items-center text-[15px] font-normal"
								>
									<input
										id="selectall"
										type="checkbox"
										onChange={this.selectAllInfluencers}
										className="hidden peer"
									/>
									<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
								</label>
								<span className="pl-2">Select all</span>
							</div>
						)}
						<div className="grid grid-cols-12 gap-5 mb-12 relative">
							{data && data.length > 0 ? (
								data.map((influencer, index) => (
									<div
										className="mb-4 lg:col-span-4 sm:col-span-6 col-span-12"
										key={index}
									>
										<Items influencer={influencer} />
									</div>
								))
							) : (
								<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							)}
						</div>
						<div className="flex justify-center col-span-12 text-center">
							{data && data.length < total && isFetching === false && (
								<Button
									className="mb-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									onClick={() => this.fetchInfluentialMention()}
									text="Load More"
								/>
							)}
							{isFetching && (
								<FaSpinner className="animate-[spin_2s_linear_infinite] purple text-[30px]" />
							)}
						</div>
					</div>
					{selected_influencers.length > 0 ? (
						<div className="lg:w-3/12 md:w-4/12 w-full order-1 md:!order-2 pl-3">
							{selected_influencers.length > 0 && (
								<div className="text-center mb-4 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mt-[125px]">
									<Disclosure>
										{({ open }) => (
											<>
												<Disclosure.Button className="w-full">
													<div className="flex items-center justify-between w-full">
														<p className="font-medium">Bulk Actions</p>
														<FiChevronDown
															size={20}
															className={`${
																open ? "rotate-180 " : ""
															} transition transform`}
														/>
													</div>
												</Disclosure.Button>

												<Transition
													enter="transition duration-[500ms] ease-out"
													enterFrom="transform scale-95 opacity-0"
													enterTo="transform scale-100 opacity-100"
													leave="transition duration-[75ms] ease-out"
													leaveFrom="transform scale-100 opacity-100"
													leaveTo="transform scale-95 opacity-0"
												>
													<Disclosure.Panel>
														<div className="w-full mt-6">
															<Button
																className="px-4 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center border-[1px] items-center bg-white border-[#7c3292] hover:opacity-80 w-full black"
																onClick={() =>
																	this.setState({
																		toggleButton: !this.state.toggleButton,
																	})
																}
																text="New Campaign With Selected"
																suffix={
																	this.state.toggleButton ? (
																		<FiChevronUp />
																	) : (
																		<FiChevronDown />
																	)
																}
															/>
															{this.state.toggleButton && (
																<div>
																	{this.props.campaign_types &&
																		this.props.campaign_types.map(
																			(item, index) => (
																				<Button
																					key={index}
																					onClick={() =>
																						this.newCampaignWithNotable(
																							item.type_name
																						)
																					}
																					className="px-12 rounded-[8px] h-[40px] text-[14px] justify-center inline-flex items-center bg--purple text-white hover:opacity-80 w-full mt-2"
																					text={item.type_button_text}
																				/>
																			)
																		)}
																</div>
															)}
															<div className="bg-[#0000001f] h-[1px] my-2 w-full" />
															<Button
																onClick={this.showInfluencerList}
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80 w-full"
																text="Add to list"
															/>
														</div>
													</Disclosure.Panel>
												</Transition>
											</>
										)}
									</Disclosure>
								</div>
							)}
							<div className="min-h-[85px]">
								<SelectedItems />
							</div>
							{selected_influencers.length > 0 ? (
								<p
									className="text-right p-[10px] cursor-pointer underline text-[#9ea1b2]"
									onClick={this.removeAll}
								>
									Remove All
								</p>
							) : (
								""
							)}
						</div>
					) : (
						""
					)}
				</div>
				<Transition
					appear
					show={this.state.campaign_type && this.props.isProceedModalShow}
					as={Fragment}
				>
					<Dialog
						onClose={() => this.handleClose()}
						className="relative z-[9999]"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h3>Are you sure?</h3>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={() => this.handleClose()}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										{this.props.inCorrectInfluencers &&
										this.props.inCorrectInfluencers.length ? (
											<div>
												<h6>
													We have found issues to find these influencers details
													or influencer had set their profile is private.
												</h6>
												<ul className="mt-4">
													{this.props.inCorrectInfluencers.map(
														(influencer, index) => (
															<li key={index}>{influencer}</li>
														)
													)}
												</ul>
											</div>
										) : (
											""
										)}
									</div>
									<div className="px-3 pb-3">
										<div className="text-right">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={() => this.handleClose()}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={() => this.newCampaignWithNotable()}
												text="Proceed"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				{/* <ErrorHandlerModal
					show={this.props.is_show_modal && this.props.error_obj}
					error_obj={this.props.error_obj}
					onHide={() => this.onHide()}
				/> */}
				<InfluencerListModal
					show={this.state.showmodal}
					platform={this.props.platform}
					closeModal={this.closeInfluenceModalList}
					selectedInfluencers={selected_influencers}
					brandLists={this.props.brandLists}
					searchBrand={this.props.searchBrand}
					createBrand={this.props.addNewBrand}
					addInfluencer={this.props.addInfluencerToList}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.influencialMention.data,
		isFetching: state.influencialMention.isFetching,
		total: state.influencialMention.total,
		page: state.influencialMention.page,
		selected_influencers: state.campaign.selected_mentions_influencers,
		campaignId: state.BrandAmbassadorsReducer.campaignId,
		is_show_modal: state.errorHandler.is_show_modal,
		error_obj: state.errorHandler.error_obj,
		userName: state.BrandAmbassadorsReducer.userName,
		refreshData: state.HeaderReducer.refreshData,
		brandLists: state.brandList.brandlists,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions: campaignactions } = require("@store/redux/CampaignRedux");
	const { actions } = require("@store/redux/InfluencialMentionRedux");
	const { actions: brandlistactions } = require("@store/redux/BrandListRedux");
	return {
		fetchInfluentialMention: (data) =>
			actions.fetchInfluencialMention(dispatch, data),
		addSelectedInfluencers: (data) => {
			campaignactions.addSelectedInfluencers(dispatch, data, "mentions");
		},
		createCampaignSelected: (data) => {
			campaignactions.createCampaignSelected(dispatch, ownProps, data);
		},
		fetchBrandLists: (data) => {
			brandlistactions.fetchBrandLists(dispatch, data);
		},
		searchBrand: (data) => {
			brandlistactions.searchBrand(dispatch, data);
		},
		addNewBrand: (data) => {
			brandlistactions.addNewBrand(dispatch, data);
		},
		addInfluencerToList: (data) => {
			brandlistactions.addInfluencersToList(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencialMentions);
