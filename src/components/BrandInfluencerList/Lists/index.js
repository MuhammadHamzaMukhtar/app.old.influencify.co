import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "@components/Pagination";

import avatar from "@assets/avatar.png";
import Analytics from "@assets/analytics.png";
import Like from "@assets/like.png";
import User from "@assets/user.png";
import { HiDotsHorizontal } from "react-icons/hi";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LinkTo from "@components/global/LinkTo";
import Loader from "@components/global/Loader";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";
var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

const abbreviateNumber = (number) => {
	// what tier? (determines SI symbol)
	var tier = (Math.log10(Math.abs(number)) / 3) | 0;

	// if zero, we don't need a suffix
	if (tier === 0) return number;

	// get suffix and determine scale
	var suffix = SI_SYMBOL[tier];
	var scale = Math.pow(10, tier * 3);

	// scale the number
	var scaled = number / scale;

	// format number and add suffix
	return scaled.toFixed(1) + suffix;
};

const Lists = (props) => {
	const { brandlists, list_loading, refreshData, sortQuery } = props;
	const navigate = useNavigate();
	const deleteList = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this list?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			dangerMode: true,
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				props.deleteList(id);
			}
		});
	};
	const navigateToView = (id) => {
		// let path=`/list/${id}`;
		navigate(`/list/${id}`, { state: { id } });
		// this.props.history.push(`/list/${id}`);
	};
	const ChangePageURL = (page, platform, sortQuery) => {
		let query = {
			page: page + 1,
			sortQuery: sortQuery,
			platform: platform
		}
		props.fetchInstagramLists(query);
	};

	const onPageChanged = (pageData) => {
		let query = {
			page: pageData.currentPage,
			sortQuery: sortQuery,
			platform: brandlists?.[0]?.list_channel
		}
		props.fetchInstagramLists(query);
	}

	const titlePage = () => {
		if (brandlists?.[0]?.list_channel === 'instagram') {
			return (
				<div className='my-6'>
					<h1 className='font-bold text-2xl'>Instagram list ({props.brandTotal})</h1>
				</div>
			)
		}
		if (brandlists?.[0]?.list_channel === 'youtube') {
			return (
				<div className='my-6'>
					<h1 className='font-bold text-2xl'>Youtube list ({props.brandTotal})</h1>
				</div>
			)
		}
		if (brandlists?.[0]?.list_channel === 'tiktok') {
			return (
				<div className='my-6'>
					<h1 className='font-bold text-2xl'>Tiktok list ({props.brandTotal})</h1>
				</div>
			)
		}
	}

	return (
		<div>
			<div className="relative">
				{list_loading ? (
					<Loader
						className="h-[50vh] w-full flex justify-center items-center"
						size="67"
					/>
				) : (
					<div className="list-container mt-12">
						{titlePage()}

						{(brandlists || []).length > 0 ? (brandlists || []).map((list, index) => (
							<div
								className="grid grid-cols-12 gap-5 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4 campaign-cards"
								key={index}
							>
								<div className="xl:col-span-3 lg:col-span-4 col-span-12 lg:!mb-0">
									<div className="flex gap-4 items-center h-full">
										<div className="text-center w-36">
											<LinkTo
												to={"/list/" + list.id}
												state={{ id: list.id }}
												prefix={
													<img
														src={list.list_avatar ? list.list_avatar : avatar}
														alt={list.list_name}
														className="w-[95px] h-[95px] rounded-full lg:mx-0 mx-auto"
														onError={({ currentTarget }) => {
															currentTarget.onerror = null;
															currentTarget.src = avatar;
														}}
													/>
												}
											/>
										</div>

										<div className="lg:text-left text-center break-all w-full">
											<LinkTo
												to={"/list/" + list.id}
												state={{ id: list.id }}
												className="font-medium black text-[17px] black hover:success"
												text={list.list_name ? list.list_name : "[Noname]"}
											/>
										</div>
									</div>
								</div>
								<div className="xl:col-span-8 lg:col-span-7 col-span-12 md:!mb-0">
									<div className="grid grid-cols-12 md:gap-3 gap-5 items-center">
										<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center">
											<div className="flex justify-center">
												<img
													src={User}
													alt="influencer"
													className="h-[40px]"
												/>
												<p className="pl-1 dark text-[16px] font-medium">
													{list.listInfluencersCount}
												</p>
											</div>
											<div className="mt-4 border-[1px] border-[#ccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px]">
												<span className="font-normal text-[12px] text-[#616161]">
													Influencers
												</span>
											</div>
										</div>
										<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center">
											<div className="flex justify-center">
												<img
													src={Analytics}
													alt="reach"
													className="h-[40px]"
												/>
												<p className="pl-1 dark text-[16px] font-medium">
													{abbreviateNumber(list.total_followers ?? 0)}
												</p>
											</div>
											<div className="mt-4 border-[1px] border-[#ccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px]">
												<span className="font-normal text-[12px] text-[#616161]">
													Total Reach
												</span>
											</div>
										</div>
										<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center">
											<div className="flex justify-center">
												<img src={Like} alt="rate" className="h-[40px]" />
												<p className="pl-1 dark text-[16px] font-medium">
													{(list.engagement_rate * 100).toFixed(2)}%
												</p>
											</div>
											<div className="mt-4 border-[1px] border-[#ccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px]">
												<span className="font-normal text-[12px] text-[#616161]">
													Engagement Rate
												</span>
											</div>
										</div>
										<div className="md:col-span-3 sm:col-span-6 col-span-12 text-center">
											<div className="flex justify-center">
												<img src={Like} alt="rate" className="h-[40px]" />
												<p className="pl-1 dark text-[16px] font-medium">
													{abbreviateNumber(list.engagements ?? 0)}
												</p>
											</div>
											<div className="mt-4 border-[1px] border-[#ccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px]">
												<span className="font-normal text-[12px] text-[#616161]">
													Avg. Engagement
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="lg:col-span-1 col-span-12 md:!mb-0 flex justify-end items-center">
									<Menu as="div" className="relative inline-block text-left">
										<div>
											<Menu.Button
												as="div"
												className="cursor-pointer inline-flex w-full bg-transparent justify-center rounded-md px-4 py-2 focus:outline-none"
											>
												<HiDotsHorizontal size={20} className="darkGray" />
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="px-1 py-1 ">
													<Menu.Item
														className="flex w-full items-center rounded-[8px] text-[14px] hover:bg-gray-100 px-[12px] py-[12px] "
														onClick={() => navigateToView(list.id)}
													>
														<button className="text-[14px] p-3">
															Detail
														</button>
													</Menu.Item>
													{refreshData.is_admin && (
														<Menu.Item
															className="flex w-full items-center rounded-[8px] text-[14px] hover:bg-gray-100 px-[12px] py-[12px]"
															onClick={() => deleteList(list.id)}
														>
															<button className="text-[14px] p-3">
																Delete
															</button>
														</Menu.Item>
													)}
												</div>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						)) :
							<div className="text-center w-full py-[5rem] px-[1rem] flex items-center justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								No Record Found
							</div>
						}

						<div className="inline-flex items-center justify-center mt-8">
							{(props.brandTotal || 0) > 10 &&
								<Pagination
									totalRecords={(props.brandTotal || 0)}
									pageLimit={10}
									pageNeighbours={10}
									onPageChanged={onPageChanged}
								/>
							}

							{brandlists.length > 0 && props.loader_loading &&
								<Loader
									size="30"
								/>}

						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ brandList, HeaderReducer }) => {
	return {
		list_loading: brandList.list_loading,
		brandlists: brandList.brandlists,
		refreshData: HeaderReducer.refreshData,
		brandTotal: brandList.brandTotal,
		currentPage: brandList.currentPage,
		loader_loading: brandList.isLoading,
		sortQuery: brandList.sortQuery,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions, reducer } = require("@store/redux/BrandListRedux");
	return {
		deleteList: (id) => {
			actions.deleteBrandList(dispatch, id);
		},
		fetchInstagramLists: (data) =>
			actions.fetchBrandLists(dispatch, data),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
