import { Component, Fragment } from "react";
import Pagination from "@components/Pagination";
import { FaCircle } from "react-icons/fa";
import { HiArrowNarrowRight } from "react-icons/hi";
import { BsSortDownAlt } from "react-icons/bs";
import avatar from "@assets/avatar.png";
import Analytics from "@assets/analytics.png";
import Devices from "@assets/devices.png";
import Dollar from "@assets/dollar.png";
import Like from "@assets/like.png";
import User from "@assets/user.png";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import {
	HANDLE_SEARCH_ACTIVE_CAMPAIGNS_SUCCESS,
	HANDLE_SORT_ACTIVE_CAMPAIGNS_SUCCESS,
} from "@store/constants/action-types";
import * as campaignActions from "@store/actions/CampaignActions";
import DOMPurify from "dompurify";
import SocialListIcons from "../../../../constants/SocialListIcons";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import { BiSearchAlt2 } from "react-icons/bi";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

let eventArr = {
	target: {
		name: "sortQuery",
		value: "",
	},
};
const SortFilter = [
	{
		value: "newestFirst",
		text: "Newest",
	},
	{
		value: "oldestFirst",
		text: "Oldest",
	},
	{
		value: "nameAtoZ",
		text: "A-Z",
	},
	{
		value: "nameZtoA",
		text: "Z-A",
	},
];
class BrandActiveCampaigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			ActivateModalShow: false,
			PaginationUrl: "",
			message: "",
		};
	}

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	handleChangeSearch = (event) => {
		if (event.target) {
			this.props.handleSearchActiveCampaigns(event);
		}
		let query = {
			searchQuery: event.target.value,
			sortQuery: this.props.sortQuery,
		};

		this.props.fetchActiveCampaigns(query);
	};

	handleChangeFilter = (event) => {
		if (event) {
			eventArr.target.value = event.value;
			this.props.handleSortActiveCampaigns(eventArr);
		}
		let query = {
			searchQuery: this.props.searchQuery,
			sortQuery: event.value,
		};

		this.props.fetchActiveCampaigns(query);
	};

	onPageChanged = (pageData) => {
		let query = {
			searchQuery: this.props.searchQuery,
			sortQuery: this.props.sortQuery,
			page: pageData?.currentPage
		};
		this.props.fetchActiveCampaigns(query);
	}

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { sortQuery } = this.props;
		return (
			<>
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-6 col-span-12 mb-4 md:!mb-0">
						<div className="flex">
							<input
								placeholder="Search Campaigns"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								className="border-[1px] min-w-unset w-full xxs:text-[14px] text-[12px] border-[#ffffff] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
								name="searchQuery"
								onChange={(e) => this.handleChangeSearch(e)}
							/>
							<Button
								prefix={<BiSearchAlt2 size={22} />}
								className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-6"
							/>
						</div>
					</div>
					<div className="mt-auto mb-4 md:!mb-auto md:col-span-3 col-span-12 text-center">
						{this.props.activeCampaigns.length ? (
							<p>
								Showing Records {this.props.pagination.from} to{" "}
								{this.props.pagination.to} - {this.props.pagination.total}
							</p>
						) : (
							""
						)}
					</div>
					<div className="my-auto md:col-span-3 col-span-12">
						<div className="flex items-center">
							<p className="flex items-center mr-2 whitespace-nowrap">
								<BsSortDownAlt size={18} className="mr-1" /> Sort by:
							</p>

							<Listbox onChange={(data) => this.handleChangeFilter(data)}>
								<div className="relative w-full">
									<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
										<span className="block">
											{this.defaultValue(SortFilter, sortQuery || "newestFirst")}
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
											{SortFilter.map((sort, key) => (
												<Listbox.Option
													key={key}
													className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${sort.value === sortQuery || ""
														? "bg-[#00000008]"
														: ""
														}`}
													value={sort}
												>
													<span
														className={`block ${sort.value === sortQuery || ""
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
				</div>
				<div className="relative">
					<div className="mt-12">
						{this.props.activeCampaigns.length < 1 ? (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						) : (
							this.props.activeCampaigns.map((active_campaign, index) => (
								<div
									className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 items-center"
									key={index}
								>
									{/* {active_campaign.emailSent === 0 && (
										<div
											className="bg-[#fff3cd] border-[1px] border-[#fff3cd] py-[0.75rem] px-[1.25rem] rounded-[8px] relative text-[#856404] [&_ul]:list-inside [&_ul]:list-disc [&_ul]:pl-[25px] [&_ul]:text-[#282b3c] [&_a]:text-[#1fcfc5] [&_a]:text-[14px] [&_li]:text-[14px]"
											style={{ fontSize: "0.9em" }}
											dangerouslySetInnerHTML={{
												__html: active_campaign.emailErrorMessage,
											}}
										/>
									)} */}
									<div className="p-4 grid grid-cols-12 gap-5">
										<div className="xl:col-span-5 lg:col-span-6 col-span-12">
											<div className="flex md:flex-nowrap flex-wrap items-center h-full gap-5">
												<div className="text-center md:w-auto w-full shrink-0">
													<LinkTo
														to={"/brand/brand-booking/" + active_campaign.id}
														className="w-[95px] h-[95px] rounded-full"
														prefix={
															<img
																src={
																	active_campaign.campaignAttachments[0]
																		? active_campaign.campaignAttachments[0]
																		: avatar
																}
																alt={active_campaign.campaignTitle}
																className="w-[95px] h-[95px] rounded-full object-cover md:mx-0 mx-auto"
															/>
														}
													/>
												</div>

												<div className="md:text-left text-center md:w-auto w-full">
													<LinkTo
														to={"/brand/brand-booking/" + active_campaign.id}
														className="block text-[17px] font-medium black hover:success break-all"
														text={
															active_campaign.campaignTitle
																? active_campaign.campaignTitle
																: "[Noname]"
														}
													/>

													<div className="flex justify-center md:justify-start items-center">
														<span className="mr-2 text-[#9ea1b2] text-[14px] font-normal whitespace-nowrap">
															{active_campaign.campaignType === "quoteCampaign"
																? "Request a Quote"
																: active_campaign.campaignType ===
																	"influencerCampaign"
																	? "Influencer"
																	: active_campaign.campaignType ===
																		"contentCampaign"
																		? "Affiliate"
																		: ""}
														</span>
														{SocialListIcons(active_campaign.platformName, 20)}
													</div>
													<div className="my-2 flex flex-wrap justify-center md:justify-start items-center">
														<span className="inline-flex flex-wrap items-center">
															<img
																src={Dollar}
																className="w-[20px]"
																alt="dollar"
															/>
															<span className="text-[#9ea1b2] font-normal ml-2">
																{active_campaign.campaignPayment
																	? active_campaign.campaignPayment.totalBudget
																	: 0}{" "}
																USD
															</span>
														</span>
														<div className="inline-flex flex-wrap justify-center md:justify-start items-center">
															<span className="mx-2 text-[#9ea1b2] font-normal">
																{active_campaign.campaignDate
																	? active_campaign.campaignDate
																		.formatedPostingFrom
																	: ""}
															</span>
															<HiArrowNarrowRight className="fill-[#9ea1b2]" />
															<span className="ml-2 text-[#9ea1b2] font-normal">
																{active_campaign.campaignDate
																	? active_campaign.campaignDate
																		.formatedPostingTo
																	: ""}
															</span>
														</div>
													</div>

													<div className="flex justify-center md:justify-start mb-0">
														<div>
															<h6 className="font-medium black text-[15px] mb-1">
																Instructions
															</h6>
															<p
																className="!text-[#9ea1b2] !text-[12px] !font-normal text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
																dangerouslySetInnerHTML={this.createMarkup(
																	active_campaign.campaignInstruction
																)}
															></p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="xl:col-span-7 lg:col-span-6 col-span-12 gap-5 flex flex-col">
											<div className="grid grid-cols-12 gap-5 result items-center">
												<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center sm:px-1">
													<div className="flex justify-center items-center">
														<img
															src={Devices}
															alt="posts"
															className="h-[32px]"
														/>
														<p className="pl-2 dark text-[15px] font-medium">
															{active_campaign.totalTasks}
														</p>
													</div>
													<div className="mt-4 border-[1px] border-[#cccccc] rounded-[8px] h-[36px] flex items-center justify-center relative bg-white">
														<span className="font-normal text-[#616161]">
															Total Tasks
														</span>
													</div>
												</div>
												<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center sm:px-1">
													<div className="flex justify-center items-center">
														<img
															src={User}
															className="h-[32px]"
															alt="influencer"
														/>
														<p className="pl-2 dark text-[15px] font-medium">
															{active_campaign.influencers}
														</p>
													</div>
													<div className="mt-4 border-[1px] border-[#cccccc] rounded-[8px] h-[36px] flex items-center justify-center relative bg-white">
														<span className="font-normal text-[#616161]">
															Influencers
														</span>
													</div>
												</div>
												<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center sm:px-1">
													<div className="flex justify-center items-center">
														<img
															src={Analytics}
															alt="reach"
															className="h-[32px]"
														/>
														<p className="pl-2 dark text-[15px] font-medium">
															{active_campaign.reach}
														</p>
													</div>
													<div className="mt-4 border-[1px] border-[#cccccc] rounded-[8px] h-[36px] flex items-center justify-center relative bg-white">
														<span className="font-normal text-[#616161]">
															Total Reach
														</span>
													</div>
												</div>
												<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center sm:px-1">
													<div className="flex justify-center items-center">
														<img src={Like} alt="rate" className="h-[32px]" />
														<p className="pl-2 dark text-[15px] font-medium">
															{active_campaign.engagementRate}%
														</p>
													</div>
													<div className="mt-4 border-[1px] border-[#cccccc] rounded-[8px] h-[36px] flex items-center justify-center relative bg-white">
														<span className="font-normal text-[#616161]">
															Engagement Rate
														</span>
													</div>
												</div>
											</div>
											<div className="w-full">
												<div className="flex items-center">
													<div className="pr-4">
														<span className="text-[#9ea1b2] text-[14px]  font-normal">
															{(active_campaign.campaignPayment?.spentBudget || 0).toFixed(2)}USD
														</span>
													</div>
													<div className="w-full">
														<div className="bg-[#e9ecef] h-[10px] rounded-[8px] overflow-hidden leading-[0px]">
															<div
																className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem] bg-[#28a745]`}
																style={{
																	width: `${(active_campaign.campaignPayment?.spentPercentage || 0)}%`,
																}}
															>
																{(active_campaign.campaignPayment?.spentPercentage || 0).toFixed(2)}%
															</div>
														</div>
													</div>
													<div className="pr-2 pl-4">
														<span className="text-[#9ea1b2] text-[14px] whitespace-nowrap font-normal">
															{active_campaign.campaignPayment &&
																active_campaign.campaignPayment?.totalBudget
																? active_campaign.campaignPayment?.totalBudget.toFixed(2)
																: 0}
															USD
														</span>
													</div>
												</div>
												<div className="mt-2 pl-1 inline-flex items-center w-full">
													<FaCircle size={6} className="text-[#06d106]" />
													<span className="ml-2 text-[#9ea1b2] text-[14px]  font-normal">
														Spent
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						)}
						{this.props.activeCampaigns.length > 0 && (this.props.pagination.total || 0) > 10 &&
							<div className="inline-flex items-center justify-center">
								<Pagination
									totalRecords={(this.props.pagination.total || 0)}
									pageLimit={10}
									pageNeighbours={10}
									onPageChanged={this.onPageChanged}
								/>

								{this.props.isLoading &&
									<Loader
										size="30"
									/>}

							</div>
						}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.CampaignReducer.isLoading,
		activeCampaigns: state.CampaignReducer.activeCampaigns,
		pagination: state.CampaignReducer.pagination,
		sortQuery: state.CampaignReducer.sortQuery,
		searchQuery: state.CampaignReducer.searchQuery,
		notPublishedYet: state.SetUpNewCampaignReducer.notPublishedYet,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleSearchActiveCampaigns: (event) =>
			dispatch({
				type: HANDLE_SEARCH_ACTIVE_CAMPAIGNS_SUCCESS,
				payload: event,
			}),
		handleSortActiveCampaigns: (event) =>
			dispatch({
				type: HANDLE_SORT_ACTIVE_CAMPAIGNS_SUCCESS,
				payload: event,
			}),
		fetchActiveCampaigns: (url, query, type) =>
			dispatch(campaignActions.fetchActiveCampaigns(url, query, type)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandActiveCampaigns);
