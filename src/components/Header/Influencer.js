import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/header_logo.png";
import avatar from "@assets/avatar.png";
import { HiOutlineMenu } from "react-icons/hi";
import { MdCampaign } from "react-icons/md";
import Notification from "../Notification.js";
import history from "../../constants/history";
import { connect } from "react-redux";
import { HANDLE_LOGOUT_SUBMIT } from "@store/reducers/LoginReducer";
import * as headerActions from "@store/actions/HeaderActions";
import { NavLink } from "react-router-dom";
import Tooltip from "@components/global/Tooltip";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";

class InfluencerHeader extends Component {
	constructor(props) {
		super(props);
		this.addbrandRef = React.createRef();
	}

	componentDidMount() {
		this.props.currentLoggedInUser('influencer');
		// this.props.refreshReports();
		// const data = {
		// 	main_account: localStorage.getItem("main_account"),
		// };
		// this.props.fetchInfluencerSubAccount(data);
		document.querySelector("body").addEventListener("click", setScroll);
		function setScroll() {
			let state = document.querySelector(
				"#preserve_scroll button[data-headlessui-state=open]"
			);
			if (state) {
				document.querySelector("html").style.overflow = "hidden";
				// document.querySelector("html").style.paddingRight = "5px";
			} else {
				document.querySelector("html").style.overflow = "";
				// document.querySelector("html").style.paddingRight = "";
			}
		}
	}

	switchAccount = (id) => {
		const data = {
			id: id,
			main_account: localStorage.getItem("main_account"),
		};
		this.props.switchAccount(data);
	};

	influencerSwitchAccount = (id) => {
		const data = {
			id: id,
			main_account: localStorage.getItem("main_account"),
		};
		this.props.switchAccount(data);
	};

	render() {
		const { subAccounts, mainAccount, navigate } = this.props;
		const path = window.location.pathname;

		const splitPath = path.split("/");
		if (!localStorage.getItem("isLogin")) {
			if (splitPath[1] === "influencer") {
				// window.location.href = "/influencer/login";
				// return <Navigate to="/influencer/login" />;
			}
			if (splitPath[1] === "brand" && splitPath[2] !== "invitation") {
				// window.location.href = "/brand/login";
				// return <Navigate to="/brand/login" />;
			}
		}
		return (
			<div className="sticky top-0 left-0 right-0 z-[1020] min-h-[75px] bg-white border-b border-[#f7f7f7] flex items-center">
				<div className="containers px-[1rem]">
					<div className="flex flex-wrap items-center py-6 md:gap-x-10 gap-y-5">
						<div className="flex items-center grow md:space-x-10">
							<div className="flex justify-start shrink-0">
								<Link to="/influencer/dashboard">
									<img className="w-[90px]" src={logo} alt="logo" />
								</Link>
							</div>

							<nav className="hidden space-x-10 xl:flex grow">
								<NavLink
									to="/influencer/dashboard"
									className="black hover:opacity-80 hover:black inline-flex items-center rounded-md bg-white text-[14px] font-normal focus:outline-none"
								>
									Dashboard
								</NavLink>
								<NavLink
									to="/influencer/my-campaigns"
									className="black hover:opacity-80 hover:black inline-flex items-center rounded-md bg-white text-[14px] font-normal focus:outline-none"
								>
									My Campaigns
								</NavLink>
								{/* <NavLink
									to="/influencer/find-campaigns"
									className="black hover:opacity-80 hover:black inline-flex items-center rounded-md bg-white text-[14px] font-normal focus:outline-none"
								>
									Find Campaigns
								</NavLink> */}
							</nav>
						</div>

						<div className="xxs:space-x-5 space-x-4 flex ml-auto items-center shrink-0">
							<Notification history={history} navigate={navigate} />

							<Popover className="bg-white flex items-center relative">
								<Popover.Button className="bg-transparent hover:bg-transparent rounded-full border-2 border--purple inline-flex items-center justify-center  focus-visible:outline-0">
									<div className="w-[32px] h-[32px] rounded-full overflow-hidden">
										<img
											className="rounded-full w-[32px] h-[32px]"
											alt={
												this.props.currentLoggedUser &&
												this.props.currentLoggedUser.name
													? this.props.currentLoggedUser.name
													: ""
											}
											src={
												this.props.currentLoggedUser.profile_pic
													? this.props.currentLoggedUser.profile_pic
													: avatar
											}
										/>
									</div>
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
									<Popover.Panel className="absolute top-full right-0 rounded-[8px] bg-white z-10 mt-4 w-screen transform sm:translate-x-0 translate-x-[80px] lg:max-w-[38rem] md:max-w-[560px] sm:max-w-[450px] max-w-[320px] py-[0.5rem] border">
										<div className="rounded-[8px] bg-white py-3 ">
											<div className="sm:flex flex-wrap px-1">
												<div className="pl-2 sm:!mb-0 mb-2 mr-10">
													<img
														className="border-2 rounded-full border--purple p-1 w-[62px]"
														alt="logo"
														src={
															this.props.currentLoggedUser.profile_pic
																? this.props.currentLoggedUser.profile_pic
																: avatar
														}
													/>
												</div>
												<div className="my-auto sm:!mb-0 mb-2 md:w-1/3">
													<div>
														<Tooltip
															trigger={
																<h4 className="black text-[18px] truncate font-medium">
																	{this.props.currentLoggedUser &&
																	this.props.currentLoggedUser.name
																		? this.props.currentLoggedUser.name
																		: ""}
																</h4>
															}
															tooltipText={
																this.props.currentLoggedUser &&
																this.props.currentLoggedUser.name
																	? this.props.currentLoggedUser.name
																	: ""
															}
															placement="top-left"
														/>
														<NavLink
																to="/influencer/setting-influencer-account"
																className="black hover:success"
															>
																<u className="text-[14px] mb-1 inline-block">
																	Settings
																</u>
															</NavLink>
													</div>
												</div>
											</div>

											<div className="max-h-[200px] overflow-y-auto">
												{this.props.influencerSubAccounts &&
													this.props.influencerSubAccounts.length > 0 &&
													this.props.influencerSubAccounts
														.filter((i) => i !== null)
														.map((item, key) => (
															<div
																className={`flex items-center border-b py-3 px-[1rem] ${
																	this.props.user.id === item?.user_id &&
																	"bg-[#f4f4f5]"
																}`}
															>
																<img
																	className="mr-4 object-cover rounded-full h-[38px] w-[38px]"
																	src={
																		item?.profile_picture_url
																			? item?.profile_picture_url
																			: avatar
																	}
																	alt={item?.infl_name}
																/>
																<div>
																	<h6 className="font-medium text-[13px] mb-1">
																		{item?.infl_name}
																	</h6>
																</div>
																{this.props.user.id !== item?.user_id && (
																	<button
																		className="px-2 py-0 inline-flex items-center justify-center whitespace-nowrap rounded-md border-[1px] text-[12px] border--purple bg--purple font-medium text-white hover:opacity-80 tracking-wider"
																		onClick={() =>
																			this.switchAccount(mainAccount.id)
																		}
																	>
																		Switch
																	</button>
																)}
															</div>
														))}
												{subAccounts && subAccounts.length > 0 && (
													<div className="bg-white py-3">
														<p className="gray text-[12px] ml-4">Brands</p>
													</div>
												)}
												{subAccounts &&
													subAccounts.length > 0 &&
													subAccounts.map((account, key) => (
														<Popover.Button
															key={key}
															as="div"
															className={`bg-transparent p-0 w-full inline-block`}
														>
															<div
																className={`flex items-center border-bottom list-gray py-3 px-[1rem] ${
																	this.props.user.id === account.id &&
																	"bg-[#f4f4f5]"
																}`}
															>
																<img
																	className="mr-4 object-cover rounded-full w-[38px] h-[38px]"
																	src={
																		account.profile_pic
																			? process.env.REACT_APP_AWS_URl +
																			  "/" +
																			  account.profile_pic
																			: avatar
																	}
																	alt={account.name}
																/>
																<div>
																	<h6 className="font-medium text-[13px] mb-1">
																		{account.name}
																	</h6>
																	<p className="text-[11px] black flex items-center">
																		<a
																			href={
																				this.props.user.id === account.id
																					? "/brand/campaigns?tab=active"
																					: "#"
																			}
																			title="Active campaign"
																			style={{
																				color: "#1fcfc5",
																			}}
																			className="flex items-center text-[13px] gap-x-1"
																		>
																			{account.campaigns_count}
																			<MdCampaign color="#1fcfc5" size={20} />
																		</a>
																		<div className="lightdark mx-2">|</div>
																		<a
																			href={
																				this.props.user.id === account.id
																					? "/brand/campaigns?tab=draft"
																					: "#"
																			}
																			title="Draft campaign"
																			style={{
																				color: "#8d8d8d",
																			}}
																			className="flex items-center text-[13px] gap-x-1"
																		>
																			{account.draft_count}
																			<MdCampaign color="#8d8d8d" size={22} />
																		</a>
																		<div className="lightdark mx-2">|</div>
																		<a
																			href={
																				this.props.user.id === account.id
																					? "/brand/campaigns?tab=closed"
																					: "#"
																			}
																			title="Closed campaign"
																			style={{
																				color: "red",
																			}}
																			className="flex items-center text-[13px] gap-x-1"
																		>
																			{account.closed_count}
																			<MdCampaign color="red" size={22} />
																		</a>
																	</p>
																</div>
																{this.props.user.id !== account.id ? (
																	<button
																		to="#"
																		className="px-2 py-[0.5rem] leading-7 border-[1px] text-[14px] rounded-[5px] border--purple bg--purple font-medium text-white hover:opacity-80 whitespace-nowrap tracking-wider"
																		onClick={() =>
																			this.switchAccount(account.id)
																		}
																	>
																		Switch
																	</button>
																) : null}
															</div>
														</Popover.Button>
													))}
											</div>

											<div className="flex items-center justify-end mt-4 px-[1rem]">
												<Popover.Button
													as="div"
													className="bg-transparent p-0 inline-block w-auto"
												>
													<button
														className="px-4 py-[0.5rem] leading-7 border-[1px] text-[14px] rounded-[5px] border--purple bg--purple font-medium text-white hover:opacity-80 whitespace-nowrap"
														onClick={this.props.handleLogoutSubmit}
													>
														Log out
													</button>
												</Popover.Button>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</Popover>

							<Menu
								as="div"
								className="bg-white xl:hidden"
								id="preserve_scroll"
							>
								<Menu.Button className="bg-whte rounded-md p-2 hover:text-gray-900 inline-flex items-center justify-center text-gray-500 focus-visible:outline-0 hover:bg-gray-100">
									<HiOutlineMenu size={30} className="black" />
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="duration-200 ease-out"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="duration-100 ease-in"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Menu.Items className="absolute top-20 z-2xlfull inset-x-0 py-[0.5rem] transition transform origin-top-right xl:hidden">
										<div className="rounded-[8px] shadow-lg bg-white">
											<div className="py-8 px-12 space-y-10">
												<Menu.Item>
													<NavLink
														to="/influencer/dashboard"
														className="black hover:opacity-80 hover:black flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
													>
														Dashboard
													</NavLink>
												</Menu.Item>
												<Menu.Item>
													<NavLink
														to="/influencer/my-campaigns"
														className="black hover:opacity-80 hover:black flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
													>
														My Campaigns
													</NavLink>
												</Menu.Item>
												{/* <Menu.Item>
													<NavLink
														to="/influencer/find-campaigns"
														className="black hover:opacity-80 hover:black flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
													>
														Find Campaigns
													</NavLink>
												</Menu.Item> */}
											</div>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: localStorage.getItem("isLogin") ? JSON.parse(localStorage.user) : "",
		role: localStorage.role,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		influentialFollowers: state.HeaderReducer.influentialFollowers,
		analyzer: state.HeaderReducer.analyzer,
		remainingPayPerProducts: state.HeaderReducer.remainingPayPerProducts,
		planName: state.HeaderReducer.planName,
		remainingDiscoverSearches: state.HeaderReducer.remainingDiscoverSearches,
		remainingCredits: state.HeaderReducer.remainingCredits,
		notifications: state.HeaderReducer.notifications,
		refreshData: state.HeaderReducer.refreshData,
		subAccounts: state.subAccount.data,
		mainAccount: state.subAccount.main,
		influencerSubAccounts: state.subAccount.influencerSubAccounts,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/SubAccountRedux");
	return {
		handleLogoutSubmit: () => dispatch({ type: HANDLE_LOGOUT_SUBMIT }),
		fetchNotifications: () => dispatch(headerActions.fetchNotifications()),
		currentLoggedInUser: (query) => dispatch(headerActions.currentLoggedInUser(query)),
		refreshReports: () => dispatch(headerActions.refreshReports()),
		switchAccount: (data) => {
			actions.switchBrandAccount(dispatch, data);
		},
		fetchInfluencerSubAccount: (data) => {
			actions.fetchInfluencerSubAccount(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerHeader);
