import { Component, Fragment } from "react";
import avatar from "@assets/avatar.png";
import SocialListIcons from "../../../../constants/SocialListIcons";
import { FaTrash } from "react-icons/fa";
import Loader from "@components/global/Loader";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as campaignActions from "@store/actions/CampaignActions";
import {
	HANDLE_SEARCH_DRAFT_CAMPAIGNS_SUCCESS,
	HANDLE_SORT_DRAFT_CAMPAIGNS_SUCCESS,
} from "@store/constants/action-types";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import { BiSearchAlt2 } from "react-icons/bi";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSortDownAlt } from "react-icons/bs";
import Pagination from "@components/Pagination";


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

class BrandDraftCampaigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			PaginationUrl: "",
		};
	}

	handleChangeSearch = (event) => {
		if (event.target) {
			this.props.handleSearchDraftCampaigns(event);
		}
		let query = {
			searchQuery: event.target.value,
			sortQuery: this.props.sortQuery,
		};
		this.props.fetchDraftCampaigns(query);
	};

	handleChangeFilter = (event) => {
		if (event) {
			eventArr.target.value = event.value;
			this.props.handleSortDraftCampaigns(eventArr);
		}
		let query = {
			searchQuery: this.props.searchQuery,
			sortQuery: event.value,
		};

		this.props.fetchDraftCampaigns(query);
	};


	onPageChanged = (pageData) => {
		let query = {
			searchQuery: this.props.searchQuery,
			sortQuery: this.props.sortQuery,
			page: pageData?.currentPage
		};
		this.props.fetchDraftCampaigns(query);
	}

	_handleCampaignDelete = (id, index) => {
		let query = {
			sortQuery: this.props.sortQuery,
		};
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this campaign?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			dangerMode: true,
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				this.props.handleCampaignDelete(
					id,
					this.state.PaginationUrl,
					index,
					query
				);
			}
		});
	};

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
				<div className="campaigns-filter">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-6 col-span-12 mb-4 md:!mb-0">
							<div className="flex">
								<input
									placeholder="Search Campaigns"
									aria-label="Recipient's username"
									className="border-[1px] min-w-unset sm:text-[14px] text-[12px] w-full border-[#ffffff] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
									aria-describedby="basic-addon2"
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
							{this.props.draftCampaigns.length ? (
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
				</div>
				<div className="relative">
					<div className="mt-12">
						{this.props.draftCampaigns.length < 1 ? (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						) : (
							this.props.draftCampaigns.map((campaign, index) => (
								<div
									className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-6"
									key={campaign.id}
								>
									<div className="grid grid-cols-12 gap-5">
										<div className="flex flex-col justify-center sm:justify-start md:col-span-4 sm:col-span-6 col-span-12">
											<div className="flex flex-wrap gap-x-4 gap-y-5 items-center sm:justify-start justify-center">
												<img
													src={
														campaign.campaignAttachments[0]
															? campaign.campaignAttachments[0]
															: avatar
													}
													alt={campaign.campaignTitle}
													className="h-[52px] w-[52px] rounded-full object-center sm:mx-0 mx-auto shrink-0"
												/>
												<div className="sm:w-auto w-full sm:text-left text-center">
													<LinkTo
														to={"/brand/campaign/" + campaign.id}
														state={{ id: campaign.id }}
														className="block  text-[17px] font-medium black hover:success"
														text={
															campaign.campaignTitle
																? campaign.campaignTitle
																: "[Noname]"
														}
													/>
													<div className="flex flex-wrap sm:justify-start justify-center items-center">
														<span className="mr-2 secondaryColor text-[14px] font-normal">
															{campaign.campaignType === "quoteCampaign"
																? "Request a Quote"
																: campaign.campaignType === "influencerCampaign"
																	? "Influencer"
																	: campaign.campaignType === "contentCampaign"
																		? "Affiliate"
																		: ""}
														</span>
														{SocialListIcons(campaign.platformName, 20)}
													</div>
												</div>
											</div>
										</div>
										<div className="sm:hidden h-[1px] bg-[#0000001f] block w-full col-span-12" />
										<div className="flex flex-col justify-center md:col-span-4 sm:col-span-6 col-span-12 text-center">
											<div>
												<h4 className="block font-medium black text-[17px]">
													{campaign.step_completed}%
												</h4>
												<span className="text-[#9ea1b2]">Setup Completed</span>
											</div>
										</div>
										<div className="sm:hidden h-[1px] bg-[#0000001f] block w-full col-span-12" />
										<div className="flex justify-center items-center md:justify-end md:text-right text-center md:!mt-0 mt-6 md:col-span-4 sm:col-span-12 col-span-12">
											<FaTrash
												className="text-[#343749] opacity-80 cursor-pointer mr-12 shrink-0"
												size={20}
												onClick={() =>
													this._handleCampaignDelete(campaign.id, index)
												}
											/>
											<LinkTo
												to={"/brand/campaign/" + campaign.id}
												state={{ id: campaign.id }}
												text="Complete"
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											/>
										</div>
									</div>
								</div>
							))
						)}
						{this.props.draftCampaigns.length > 0 && (this.props.pagination.total || 0) > 10 &&
							<div className="inline-flex items-center justify-center mt-8">
								<Pagination
									totalRecords={(this.props.pagination.total || 0)}
									pageLimit={10}
									pageNeighbours={10}
									onPageChanged={this.onPageChanged}
								/>

								{this.props.isLoading &&
									<Loader
										size="30"
									/>
								}

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
		isLoading: state.CampaignReducer.isLoading,
		draftCampaigns: state.CampaignReducer.draftCampaigns,
		pagination: state.CampaignReducer.pagination,
		sortQuery: state.CampaignReducer.sortQuery,
		searchQuery: state.CampaignReducer.searchQuery,
		notPublishedYet: state.SetUpNewCampaignReducer.notPublishedYet,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleSearchDraftCampaigns: (event) =>
			dispatch({
				type: HANDLE_SEARCH_DRAFT_CAMPAIGNS_SUCCESS,
				payload: event,
			}),
		handleSortDraftCampaigns: (event) =>
			dispatch({
				type: HANDLE_SORT_DRAFT_CAMPAIGNS_SUCCESS,
				payload: event,
			}),
		handleCampaignDelete: (id, Url, index, query) =>
			dispatch(campaignActions.deleteCampaign(id, Url, index, query)),
		fetchDraftCampaigns: (url, query, type) =>
			dispatch(campaignActions.fetchDraftCampaigns(url, query, type)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandDraftCampaigns);
