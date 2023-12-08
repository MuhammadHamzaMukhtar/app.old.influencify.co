import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
	FaRegClone,
	FaUserFriends,
	FaRegClock,
	FaSpinner,
} from "react-icons/fa";
import { connect } from "react-redux";
import { FiChevronLeft } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import Influencers from "./Influencers";
import AudienceOverlap from "./AudienceOverlap";
import Loader from "@components/global/Loader";
import moment from "moment";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import { toast } from "react-toastify";
import Boards from "./Boards";

const formatedNumber = (num) => {
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

const UniqueAudiencePercentage = ({ totalFollowers, totalUniqueFollowers }) => {
	let uniqueAudience = ((totalUniqueFollowers / totalFollowers) * 100).toFixed(
		2
	);
	if (!isNaN(uniqueAudience)) {
		return uniqueAudience;
	} else {
		return 0;
	}
};

const OverlappingAudiencePercentage = ({
	totalFollowers,
	totalUniqueFollowers,
}) => {
	let overlappingAudience = (
		((totalFollowers - totalUniqueFollowers) / totalFollowers) *
		100
	).toFixed(2);
	if (!isNaN(overlappingAudience)) {
		return overlappingAudience;
	} else {
		return 0;
	}
};

const OverlappingAudienceFollwers = ({
	totalFollowers,
	totalUniqueFollowers,
}) => {
	let overlappingAudience = totalFollowers - totalUniqueFollowers;
	if (!isNaN(overlappingAudience)) {
		return overlappingAudience.toLocaleString();
	} else {
		return 0;
	}
};

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
let page = 0;
const ListView = (props) => {
	const {
		currentList,
		influencersInList,
		overlapping_loading,
		payload,
		refreshData,
		IsMainLoading,
		listBoards
	} = props;
	const [editTitleFlag, setEditTitleFlag] = useState(false);
	const [activeTab, setActiveTab] = useState(0);



	const loadMore = (page = 1) => {
		const { payload } = props;
		let query = {
			listId: props.id,
			platform: payload.platform,
		};
		props.getInfluencerList(page, query);
	};

	useEffect(() => {
		fetchAllDettail();

		return () => {
			props.addSelectedInfluencers([]);
		};
	}, [props.id]);

	const fetchAllDettail = async () => {
		page = 0;
		const { payload } = props;
		let id = props.id;

		let query = {
			listId: id,
			platform: payload.platform,
		};

		

		await props.fetchListBoards(props.id);
		await props.viewList(query);
		loadMore();
	}

	let total_followers = 0;
	if (influencersInList && influencersInList.length) {
		let accounts = influencersInList || [];
		for (let index = 0; index < accounts.length; index++) {
			const element = accounts[index];
			total_followers += element.followers;
		}
	}
	if (IsMainLoading) {
		return (
			<Loader
				className="h-[87vh] w-screen flex justify-center items-center"
				size="67"
			/>
		);
	}

	const showEditInput = () => {
		setEditTitleFlag(true);
	};

	const hideEditInput = () => {
		setEditTitleFlag(false);
	};

	const handleListNameEdit = (value) => {
		const { addForm } = props;
		const list = Object.assign({}, props.currentList);
		list.list_name = value;
		addForm(list);
	};

	const handleaddNewList = () => {
		const { currentList, saveList } = props;
		saveList(currentList);
		setEditTitleFlag(false);
	};
	const handleChange = (event) => {
		if (event === 0) {
			setActiveTab(0);
		}
		if (event === 1) {
			setActiveTab(1);
			props.addSelectedInfluencers([]);
			props.fetchCampaginTypes();
		}
		if (event === 2) {
			const { fetchAudienceOverlaps, currentList } = props;
			setActiveTab(2);

			fetchAudienceOverlaps(currentList.id);
		}
	};

	const handleAudienceOverlap = async () => {
		const { currentList, audienceOverlap, influencersInList, payload, viewList, id, platform } = props;
		let query = {
			accounts:
				influencersInList && influencersInList.length ? influencersInList : [],
			id: currentList.id,
			platform: payload.platform,
		};
		await audienceOverlap(query);

		let listQuery = {
			listId: id,
			platform: platform,
		};

		viewList(listQuery);
	};

	const removeFromList = async () => {
		const ids = props.selected_influencers.map((i) => i.user_profile.user_id);
		const data = { ids: ids, id: props.currentList.id };
		const json = await props.removeFromList(data);
		if (json.success) {
			page = 0;
			loadMore();
		}
	};

	return (
		<>
			{props.influencerError &&
				toast.error('Some Influencers are not visible because of their emails')
			}
			<div className="bg-white">
				<div className="containers py-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-8 col-span-12">
							<div className="p-1 mb-6 flex justify-between">
								<div className="h-[40px] flex items-center">
									{editTitleFlag ? (
										<div className="flex items-center">
											<LinkTo
												to={"/list/" + payload.platform}
												className="text-[22px] mr-2 black bg-[#7c3292] w-[30px] h-[30px] flex items-center justify-center rounded-full text-white"
												prefix={
													<FiChevronLeft size={20} className="text-white" />
												}
											/>
											<div className="mb-0">
												<input
													type="text"
													name="listName"
													className="rounded-[8px] h-[40px] inline-flex items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] w-72"
													value={currentList.list_name}
													onChange={(e) => handleListNameEdit(e.target.value)}
													placeholder="Enter List Name"
												/>
												{props.errorsObj?.list_name ? (
													<span className="red">
														{this.props.errorsObj.list_name[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="text-right ml-4">
												<Button
													className="px-3 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg-[#f4f4f5] text-[#000000de] hover:opacity-80"
													onClick={() => hideEditInput()}
													text="Cancel"
												/>
												<Button
													className="ml-4 px-3 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													onClick={() => handleaddNewList()}
													text="Save"
												/>
											</div>
										</div>
									) : (
										<div className="flex items-center">
											<LinkTo
												to={"/list/" + payload.platform}
												className="text-[22px] mr-2 black bg-[#7c3292] w-[30px] h-[30px] flex items-center justify-center rounded-full text-white"
												prefix={<FiChevronLeft className="text-white" />}
											/>
											<p className="text-[16px] font-semibold mr-4">
												{currentList.list_name}
											</p>
											{!refreshData.is_admin && editTitleFlag ? (
												<HiPencil
													size={20}
													className="cursor-pointer"
													onClick={() => showEditInput()}
												/>
											) : (
												""
											)}
										</div>
									)}
								</div>
							</div>
							<p className="p-1 flex">
								<FaUserFriends size={18} className="mr-2" />{" "}
								<p className="pl-2">Influencers: </p>
								{currentList.listInfluencersCount}
							</p>
							<p className="p-1 flex">
								<span className="font-semibold flex">
									<FaRegClock className="mr-4" /> Total Audience:{" "}
									{formatedNumber(total_followers)} followers
								</span>
							</p>
							{!currentList.is_audience_overlap ? (
								currentList.list_channel === "tiktok" ? (
									<>
										<p className="p-1 flex">
											<FaRegClone className="mr-4" /> Audience overlap not
											available in Tiktok
										</p>
									</>
								) : (
									<>
										<p className="p-1 flex">
											<FaRegClone className="mr-4" /> Unique Audience: To view
											audience overlapping report, please estimate results.
										</p>
										<p className="p-1 flex">
											<FaRegClone className="mr-4" /> Overlapping Audience: To view
											audience overlapping report, please estimate results.
										</p>
									</>
								)
							) : (
								<>
									<p className="p-1 flex">
										<FaRegClone className="mr-4" /> Unique Audience:
										<UniqueAudiencePercentage
											totalFollowers={currentList.total_followers}
											totalUniqueFollowers={currentList.total_unique_followers}
										/>
										% |{" "}
										{currentList.total_unique_followers
											? currentList.total_unique_followers.toLocaleString()
											: 0}{" "}
										followers
									</p>
									<p className="p-1 flex">
										<FaRegClone className="mr-4" /> Overlapping Audience:
										<OverlappingAudiencePercentage
											totalFollowers={currentList.total_followers}
											totalUniqueFollowers={currentList.total_unique_followers}
										/>
										% |{" "}
										<OverlappingAudienceFollwers
											totalFollowers={currentList.total_followers}
											totalUniqueFollowers={currentList.total_unique_followers}
										/>{" "}
										followers
									</p>
								</>
							)}
						</div>
						<div className="md:col-span-4 col-span-12">
							{refreshData.is_admin && (
								<div className="flex">
									{refreshData &&
										refreshData.offer &&
										!currentList.is_audience_overlap ? (
										<div className="pl-2">
											{currentList.list_channel !== "tiktok" ? (
												<Button
													onClick={() => handleAudienceOverlap()}
													disabled={overlapping_loading}
													className="px-3 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													text={
														<>
															{overlapping_loading ? (
																<FaSpinner
																	size={22}
																	className="animate-[spin_2s_linear_infinite]"
																/>
															) : (
																""
															)}
															Estimate Audience Overlap
														</>
													}
												/>
											) : (
												""
											)}
										</div>
									) : (
										<div className="flex">
											<Button
												onClick={() => handleAudienceOverlap()}
												disabled={overlapping_loading}
												className="px-3 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
												text={
													<>
														{overlapping_loading ? (
															<FaSpinner
																size={22}
																className="animate-[spin_2s_linear_infinite]"
															/>
														) : (
															""
														)}
														Update Overlapping Audience
													</>
												}
											/>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Tab.Group
				defaultIndex={activeTab}
				onChange={(index) => {
					handleChange(index);
				}}
			>
				<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[25px]">
					<div className="containers">
						<Tab.List className="flex flex-row mb-0 mt-4 sm:!mt-0">
							<Tab
								className={({ selected }) =>
									classNames(
										"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
										selected
											? "font-semibold before:w-full"
											: "font-normal before:w-0"
									)
								}
							>
								Boards
							</Tab>
							<Tab
								className={({ selected }) =>
									classNames(
										"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
										selected
											? "font-semibold before:w-full"
											: "font-normal before:w-0"
									)
								}
							>
								Influencers
							</Tab>
							{currentList && currentList.is_audience_overlap ? (
								<Tab
									className={({ selected }) =>
										classNames(
											"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
											selected
												? "font-semibold before:w-full"
												: "font-normal before:w-0"
										)
									}
								>
									Audience Overlap
								</Tab>
							) : (
								""
							)}
						</Tab.List>
					</div>
				</div>
				<div className="overflow-x-auto overflow-y-hidden pb-[25px]">
					<div className="containers">
						<Tab.Panels className="bg-transparent m-0 w-full max-w-full p-0">
							<Tab.Panel className={"focus-visible:outline-none"}>
								<Boards
									platform={currentList.list_channel}
									boards={listBoards}
								/>
							</Tab.Panel>
							<Tab.Panel>
								<Influencers
									platform={currentList.list_channel}
									newCampaignWithSelected={true}
									loadMore={loadMore}
									removeFromList={removeFromList}
								/>
							</Tab.Panel>
							<Tab.Panel>
								<div className="bg-[#d1ecf1] py-[0.75rem] px-[1.25rem] mb-[1rem] rounded-[8px] relative text-[#0c5460]">
									Overlapping Audience Report Date:{" "}
									{moment
										.utc(currentList.updated_at)
										.local()
										.format("MMMM Do YYYY, h:mm:ss a")}
								</div>
								<AudienceOverlap platform={currentList.list_channel} />
							</Tab.Panel>
						</Tab.Panels>
					</div>
				</div>
			</Tab.Group>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		errorsObj: state.brandList.errorsObj,
		currentList: state.brandList.current_list,
		listBoards: state.brandList.listBoards,
		influencersInList: state.brandList.influencerList,
		influencerError: state.brandList.influencerError,
		overlapping_loading: state.brandList.overlapping_loading,
		overlapping_data: state.brandList.overlapping_data,
		payload: state.brandList.payload,
		refreshData: state.HeaderReducer.refreshData,
		InfluencerListExport: state.influencerSearch.ExportInfluencerList,
		exportIsLoading: state.influencerSearch.exportIsLoading,
		IsMainLoading: state.brandList.IsMainLoading,
		selected_influencers: state.campaign.selected_influencers,
	};
};

const mapDispatchToProps = (dispatch) => {
	const {
		actions: brandlistactions,
		types,
	} = require("@store/redux/BrandListRedux");
	const {
		actions: influencerActions,
	} = require("@store/redux/InfluencerSearchRedux");

	const { actions: campaignactions } = require("@store/redux/CampaignRedux");

	return {
		addForm: (data) => {
			dispatch({ type: types.HANDLE_ADD_FORM, data: data });
		},
		updateList: (data) => {
			brandlistactions.updateList(dispatch, data);
		},
		saveList: (data) => {
			brandlistactions.saveList(dispatch, data);
		},
		viewList: (data) => {
			return brandlistactions.viewList(dispatch, data);
		},
		getInfluencerList: (page, data) => {
			brandlistactions.getInfluencerList(dispatch, page, data);
		},
		audienceOverlap: (data) => {
			return brandlistactions.audienceOverlap(dispatch, data);
		},
		fetchAudienceOverlaps: (data) => {
			brandlistactions.fetchAudienceOverlaps(dispatch, data);
		},
		removeFromList: (data) => {
			return brandlistactions.removeFromList(dispatch, data);
		},
		ExportInfluencerList: (data) => {
			influencerActions.ExportInfluencerList(dispatch, data);
		},
		addSelectedInfluencers: (data) => {
			campaignactions.addSelectedInfluencers(dispatch, data, "list");
		},
		fetchCampaginTypes: () => {
			campaignactions.fetchCampaginTypes(dispatch);
		},
		fetchListBoards: (data) => {
			return brandlistactions.fetchListBoards(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
