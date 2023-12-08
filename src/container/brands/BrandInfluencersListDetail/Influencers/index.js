import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Items from "@components/BrandInfluencerDiscover/Items/Items";
import SelectedItems from "@components/BrandInfluencerDiscover/Items/SelectedItems";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";
import ErrorHandlerModal from "@components/ErrorHandlerModal";
import Exportlist from "@components/Exportlist";
import Loader from "@components/global/Loader";
import { FiChevronUp } from "react-icons/fi";
import Emitter from "../../../../constants/Emitter";
import { Transition, Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import Button from "@components/global/Button";
import Pagination from "@components/Pagination";


const Influencers = (props) => {
	const [toggleButton, setToggleButton] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const navigate = useNavigate();
	const campaignWithSelected = (type) => {
		let query = {
			platform: props.platform,
			selected_influencers: props.selected_influencers,
			campaign_type: type,
		};
		if (props.refreshData.is_admin) {
			props.createCampaignSelected(query, navigate);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	const onHide = () => {
		props.hideCreditsModal();
		props.handleCloseErrorModal();
	};

	const removeAll = () => {
		const { removeAllInfluencers } = props;
		setSelectAll(false)
		removeAllInfluencers();
	};

	const selectAllInfluencers = (e) => {
		setSelectAll(!selectAll)
		let list = props.influencersInList.map(i => ({ user_profile: i }));
		props.addSelectedInfluencers(
			e.target.checked ? list : []
		);
	};

	const onPageChanged = (pageData) => {
		props.loadMore(pageData.currentPage)
	}

	const removeFromList = () => {
		props.removeFromList()
		removeAll()
	}

	const {
		influencersInList,
		newCampaignWithSelected,
		influencerTotal,
		selected_influencers,
		influncerLoader,
		refreshData,
		listIsLoading
	} = props;

	if (listIsLoading) {
		return (
			<Loader
				className="h-[87vh] w-screen flex justify-center items-center"
				size="67"
			/>
		);
	}

	return (
		<>
			<div className="grid grid-cols-12 gap-5">
				<div className="lg:col-span-9 md:col-span-8 col-span-12">
					<div className="flex justify-between items-center flex-row mb-6">
						<div className="flex items-center">
							<label
								htmlFor="selectall"
								className="cursor-pointer flex items-center text-[15px] font-normal"
							>
								<input
									id="selectall"
									type="checkbox"
									onChange={selectAllInfluencers}
									checked={selectAll}
									className="hidden peer"
								/>
								<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
							</label>
							<span>Select all</span>
						</div>
						{selected_influencers && selected_influencers.length > 0 && (
							<div className="flex flex-row">
								<Exportlist
									influencerAnalyzer={"list"}
									AnalyzedUsers={selected_influencers}
									platform={props.currentList.list_channel}
									totalInfluencers={
										selected_influencers && selected_influencers.length
									}
								/>
							</div>
						)}
					</div>
					<div className="pb-12 relative">
						<div>
							{influencersInList && influencersInList.length ? (
								<>
									<div className="grid grid-cols-12 gap-5 mb-12">
										{influencersInList.map((influencerList, index) => {
											let user_profile = { user_profile: influencerList };
											return (
												<div
													className="mb-4 lg:col-span-4 sm:col-span-6 col-span-12"
													key={index}
												>
													<Items
														brandList={true}
														influencer={user_profile}
														newCampaignWithSelected={newCampaignWithSelected}
														platform={props.currentList.list_channel}
													/>
												</div>
											)
										})}
									</div>
								</>
							) : (
								<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							)}

							<div className="inline-flex items-center justify-center">
								{(influencerTotal || 0) > 21 &&
									<Pagination
										totalRecords={influencerTotal || 0}
										pageLimit={21}
										pageNeighbours={12}
										onPageChanged={onPageChanged}
									/>
								}

								{influencersInList.length > 0 && influncerLoader &&
									<Loader
										size="30"
									/>}

							</div>
						</div>
					</div>
				</div>
				{selected_influencers && selected_influencers.length ? (
					<div className="lg:col-span-3 md:col-span-4 col-span-12">
						{newCampaignWithSelected && (
							<div className="text-center mb-4 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mt-[43px]">
								<Disclosure>
									{({ open }) => (
										<>
											<Disclosure.Button className="w-full">
												<div className="flex items-center justify-between w-full">
													<p className="font-medium">Bulk Actions</p>
													<FiChevronDown
														size={20}
														className={`${open ? "rotate-180 " : ""
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
															onClick={() => setToggleButton(!toggleButton)}
															text="New Campaign With Selected"
															suffix={
																toggleButton ? (
																	<FiChevronUp />
																) : (
																	<FiChevronDown />
																)
															}
														/>
														{toggleButton && (
															<div>
																{props.campaign_types &&
																	props.campaign_types.map((item, index) => (
																		<Button
																			key={index}
																			onClick={() =>
																				campaignWithSelected(item.type_name)
																			}
																			className="px-12 rounded-[8px] h-[40px] text-[14px] justify-center inline-flex items-center bg--purple text-white hover:opacity-80 w-full mt-2"
																			text={item.type_button_text}
																		/>
																	))}
															</div>
														)}
														{refreshData.is_admin && (
															<>
																<div className="bg-[#0000001f] h-[1px] my-2 w-full" />
																<Button
																	onClick={removeFromList}
																	className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80 w-full"
																	text="Remove from List"
																/>
															</>
														)}
													</div>
												</Disclosure.Panel>
											</Transition>
										</>
									)}
								</Disclosure>
							</div>
						)}
						<div className="min-h-[85px]">
							<SelectedItems
								newCampaignWithSelected={newCampaignWithSelected}
								setSelectAll={() => setSelectAll()}
							/>
						</div>
						<p
							className="text-right p-[10px] cursor-pointer underline text-[#9ea1b2]"
							onClick={() => removeAll()}
						>
							Remove All
						</p>
					</div>
				) : (
					""
				)}
			</div>
			{/* <ErrorHandlerModal
				show={props.is_show_modal && props.error_obj}
				error_obj={props.error_obj}
				onHide={() => onHide()}
			/> */}
		</>
	);
};

const mapStateToProps = ({
	brandList,
	campaign,
	errorHandler,
	HeaderReducer,
}) => {
	return {
		isLoading: brandList.isLoading,
		influencersInList: brandList.influencerList,
		influencerTotal: brandList.influencerTotal,
		influncerLoader: brandList.influncerLoader,
		selected_influencers: campaign.selected_influencers,
		is_show_modal: errorHandler.is_show_modal,
		error_obj: errorHandler.error_obj,
		currentList: brandList.current_list,
		refreshData: HeaderReducer.refreshData,
		listIsLoading: brandList.isLoading,
		campaign_types: campaign.campaign_types,
	};
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const {
		actions: campaignactions,
		types: campaigntypes,
	} = require("@store/redux/CampaignRedux");
	return {
		...ownProps,
		...stateProps,
		removeAllInfluencers: () => {
			dispatch({
				type: campaigntypes.HANDLE_REMOVE_ALL_INFLUENCERS,
				data: { type: "discover" },
			});
		},
		handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
		createCampaignSelected: (data, navigate) => {
			campaignactions.createCampaignSelected(
				dispatch,
				ownProps,
				data,
				navigate
			);
		},
		addSelectedInfluencers: (data) => {
			campaignactions.addSelectedInfluencers(dispatch, data, "list");
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Influencers);
