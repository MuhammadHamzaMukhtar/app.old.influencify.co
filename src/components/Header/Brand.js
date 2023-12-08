import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiPlus, FiTool } from "react-icons/fi";
import logo from "@assets/header_logo.png";
import avatar from "@assets/avatar.png";
import Help from "@assets/life_saver.png";
import Campaigns from "@assets/campaign.png";
import Influencer from "@assets/influencer.png";
import Follower from "@assets/follower.png";
import Explorer from "@assets/explorer.png";
import Assets from "@assets/assets.png";
import InflDiscover from "@assets/infl_discover.png";
import InflAnalyzer from "@assets/infl_analyzer.png";
import Instagram from "@assets/alt_instagram.png";
import Sponsored from "@assets/sponsor.png";
import Youtube from "@assets/youtube.png";
import Tiktok from "@assets/tiktok.png";
import Email from "@assets/email.png";
import Lists from "@assets/list.png";
import Product from "@assets/product.png";
import Invoice from "@assets/invoice.png";
import { HiOutlineMenu } from "react-icons/hi";
import { MdCampaign, MdLock } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";

import Notification from "../Notification";
import history from "../../constants/history";
import { connect } from "react-redux";
import { HANDLE_LOGOUT_SUBMIT } from "@store/reducers/LoginReducer";
import * as headerActions from "@store/actions/HeaderActions";
import { NavLink } from "react-router-dom";
import Addbrand from "./AddBrand";
import Tooltip from "@components/global/Tooltip";
import moment from "moment";

import { Popover, Transition, Menu } from "@headlessui/react";
import Influencify from "@constants/Influencify";
import Loader from "@components/global/Loader";

class BrandHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.addbrandRef = React.createRef();
  }

  componentDidMount() {
    this.props.currentLoggedInUser("brand");
    this.props.refreshReports();
    const data = {
      main_account: localStorage.getItem("main_account"),
    };

    this.props.fetchInfluencerSubAccount(data);
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

  endTrialNow = async () => {
    this.setState({ loading: true });
    const json = await Influencify.subscriptionEndTrial();
    setTimeout(() => {
      this.refreshReports();
    }, 4000);
  };

  cancelSubscriptionNow = async () => {
    this.setState({ loading: true });
    const json = await Influencify.cancelSubscriptionNow({});
    setTimeout(() => {
      this.refreshReports();
    }, 4000);
  };

  refreshReports = async () => {
    const json = await this.props.refreshReports();
    this.setState({ loading: false });
  };

  render() {
    const { refreshData, subAccounts, mainAccount, navigate } = this.props;

    return (
      <div className="sticky top-0 left-0 right-0 z-[100] min-h-[75px] bg-white border-b border-[#ddd] flex items-center shadow-[0_1px_0_0_#2c2c2c12]">
        <div className="w-full">
          {refreshData?.on_trial &&
            refreshData?.subscription?.trial_ends_at && (
              <div
                className="flex justify-center items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">
                    Your trial ends in{" "}
                    {moment(refreshData?.subscription?.trial_ends_at)
                      .add("day", 1)
                      .diff(moment(), "days")}{" "}
                    day's, and will renew automatically
                  </span>
                  .
                  {this.state.loading ? (
                    <Loader className="ml-2 inline-flex items-center" />
                  ) : (
                    <>
                      <button
                        onClick={() => this.endTrialNow()}
                        type="button"
                        className="ml-2 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-300 dark:text-gray-800 dark:hover:bg-blue-400 dark:focus:ring-blue-800"
                      >
                        start subscription immediately
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

          <div className="containers px-[1rem]">
            <div className="flex flex-wrap items-center py-6 md:gap-x-10 gap-y-5">
              <div className="flex items-center grow md:space-x-10">
                <div className="flex justify-start shrink-0">
                  <Link to="/dashboard">
                    <img className="w-[90px]" src={logo} alt="logo" />
                  </Link>
                </div>

                <nav className="hidden space-x-10 xl:flex grow">
                  {/* <NavLink
                    to="/brand/campaigns"
                    className="black hover:opacity-80 hover:black inline-flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
                  >
                    <img
                      src={Campaigns}
                      alt="Campaign"
                      className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                    />
                    Campaigns
                  </NavLink> */}

                  <div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[38px] cursor-pointer">
                    <button
                      type="button"
                      className="black inline-flex items-center rounded-md  bg-white text-[14px] font-medium  focus:outline-none"
                      aria-expanded="false"
                    >
                      <img
                        src={Influencer}
                        alt="Influencer"
                        className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                      />
                      <span className="font-normal">Influencers</span>
                    </button>

                    <div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[675px] transform px-2 sm:!px-0 lg:!ml-0 -translate-x-1 ">
                      <div className="overflow-hidden rounded-[8px] shadow-lg bg-white">
                        <div className="flex">
                          <div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
                            <NavLink
                              to="/discovery/youtube"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={InflDiscover}
                                  alt="Discover"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Discover
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Access the full power of our 35M inflencers
                                  database search
                                </p>
                              </div>
                            </NavLink>
                            <NavLink
                              to="/past-report/youtube"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={InflAnalyzer}
                                  alt="Analyzer"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Analyzer
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Analyze influencers for fake followers and
                                  more
                                </p>
                              </div>
                            </NavLink>
                          </div>
                          <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                            <div className="w-full">
                              <NavLink
                                to="/list/youtube"
                                className={({ isActive }) => [
                                  "-m-3 flex items-start rounded-[8px] p-3  ",
                                  isActive
                                    ? " hover:bg-blue-50"
                                    : " hover:bg-gray-50",
                                ]}
                              >
                                <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                  <img
                                    src={Lists}
                                    alt="Lists"
                                    className="overflow-hidden w-[19px] h-[19px]"
                                  />
                                </div>
                                <div>
                                  <p className="text-[14px] font-medium text-gray-900">
                                    Lists
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Save Influencers into lists and estimate
                                    audience overlap
                                  </p>
                                </div>
                              </NavLink>
                              <NavLink
                                to="/export"
                                className={({ isActive }) => [
                                  "-mx-3 -mb-3 mt-4 flex items-start rounded-[8px] p-3  ",
                                  isActive
                                    ? " hover:bg-blue-50"
                                    : " hover:bg-gray-50",
                                ]}
                              >
                                <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                  <AiOutlineDownload className="overflow-hidden w-[19px] h-[19px]" />
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <p className="text-[14px] font-medium text-gray-900">
                                      Exports
                                    </p>
                                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                      New
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Access your social media influencers exports
                                    data
                                  </p>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[38px] cursor-pointer">
                    <button
                      type="button"
                      className="black inline-flex items-center rounded-md  bg-white text-[14px] font-medium  focus:outline-none"
                      aria-expanded="false"
                    >
                      <img
                        src={Follower}
                        alt="Influential Follower"
                        className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                      />
                      <span className="font-normal">Influential Fans</span>
                    </button>

                    <div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[475px] transform px-2 sm:!px-0 lg:!ml-0 -translate-x-1 ">
                      <div className="overflow-hidden rounded-[8px] shadow-lg bg-white">
                        <div className="flex">
                          <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                            <NavLink
                              to="/influencial/youtube"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={Youtube}
                                  alt="Youtube"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Youtube Fans
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Discover your Youtube influential followers,
                                  likers and mentions
                                </p>
                              </div>
                            </NavLink>
                            <NavLink
                              to="/influencial/tiktok"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={Tiktok}
                                  alt="Tiktok"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Tiktok Fans
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Discover your Tiktok influential followers,
                                  likers and mentions
                                </p>
                              </div>
                            </NavLink>
                            <NavLink
                              to="/influencial/email-match"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={Email}
                                  alt="Email"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Email Match
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Discover Influencers among your own email list
                                </p>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[38px] cursor-pointer">
										<button
											type="button"
											className="black inline-flex items-center rounded-md  bg-white text-[14px] font-medium  focus:outline-none"
											aria-expanded="false"
										>
											<img
												src={Explorer}
												alt="Content Explorer"
												className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
											/>
											<span className="font-normal">Content Explorer</span>
										</button>

										<div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[300px] transform px-2 sm:!px-0 lg:!ml-0 -translate-x-1 ">
											<div className="overflow-hidden rounded-[8px] shadow-lg bg-white">
												<div className="flex">
													<div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
														
														<NavLink
															to="/brand/sponsored-posts"
															className={({ isActive }) => [
																"-m-3 flex items-start rounded-[8px] p-3  ",
																isActive
																	? " hover:bg-blue-50"
																	: " hover:bg-gray-50",
															]}
														>
															<div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
																<img
																	src={Sponsored}
																	alt="Sponsored"
																	className="overflow-hidden w-[24px]"
																/>
															</div>
															<div>
																<p className="text-[14px] font-medium text-gray-900">
																	Sponsored Posts
																</p>
																<p className="mt-1 text-sm text-gray-500">
																	Get access to our list of top ads created
																	across Tiktok, Instagram & Youtube
																</p>
															</div>
														</NavLink>
													</div>
												</div>
											</div>
										</div>
									</div> */}

                  <NavLink
                    to="/reports"
                    className="black hover:opacity-80 hover:black inline-flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
                  >
                    <img
                      src={Explorer}
                      alt="Explorer"
                      className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                    />
                    Reports & Tracking
                  </NavLink>

                  <div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[38px] cursor-pointer">
                    <button
                      type="button"
                      className="black inline-flex items-center rounded-md  bg-white text-[14px] font-medium  focus:outline-none"
                      aria-expanded="false"
                    >
                      <img
                        src={Assets}
                        alt="Assets"
                        className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                      />
                      <span className="font-normal">Assets</span>
                    </button>

                    <div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[300px] transform px-2 sm:!px-0 lg:!ml-0 -translate-x-1 ">
                      <div className="overflow-hidden rounded-[8px] shadow-lg bg-white">
                        <div className="flex">
                          <div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
                            <NavLink
                              to="/products"
                              className={({ isActive }) => [
                                "-m-3 flex items-start rounded-[8px] p-3  ",
                                isActive
                                  ? " hover:bg-blue-50"
                                  : " hover:bg-gray-50",
                              ]}
                            >
                              <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                <img
                                  src={Product}
                                  alt="Product"
                                  className="overflow-hidden w-[19px] h-[19px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px] font-medium text-gray-900">
                                  Products
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Check your current assets for campaigns
                                </p>
                              </div>
                            </NavLink>
                            {refreshData.is_main && (
                              <NavLink
                                to="/invoices"
                                className={({ isActive }) => [
                                  "-m-3 flex items-start rounded-[8px] p-3  ",
                                  isActive
                                    ? " hover:bg-blue-50"
                                    : " hover:bg-gray-50",
                                ]}
                              >
                                <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                  <img
                                    src={Invoice}
                                    alt="Invoice"
                                    className="overflow-hidden w-[19px] h-[19px]"
                                  />
                                </div>
                                <div>
                                  <p className="text-[14px] font-medium text-gray-900">
                                    Transaction
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Keep track on your transaction
                                  </p>
                                </div>
                              </NavLink>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>

              <div className="xxs:space-x-5 space-x-3 flex ml-auto items-center shrink-0">
                <Link
                  to="/billing/credit"
                  className="ml-0 gap-x-1 flex items-center justify-center bg--success px-4 py-[5px] rounded-full"
                >
                  <span className="text-white text-[13px] font-normal xl:inline-block hidden">
                    Credits remaining:
                  </span>
                  <span className="text-white text-[13px] font-medium">
                    {this.props.remainingCredits}
                  </span>
                </Link>

                <Popover className="bg-white flex items-center relative">
                  <Popover.Button className="bg-whte rounded-md inline-flex items-center justify-center">
                    <img
                      src={Help}
                      className="cursor-pointer shrink-0 w-[20px] h-[20px]"
                      alt="help"
                    />
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
                    <Popover.Panel className="absolute top-full right-0 z-10 mt-4 w-screen transform sm:translate-x-0 xs:translate-x-[100px] translate-x-[150px] sm:!px-0 max-w-[300px]">
                      <div className="rounded-[8px] shadow-lg bg-white divide-y-2 divide-gray-50 py-3">
                        <p className="font-medium text-[20px] black pb-2 pt-2 px-4 flex justify-between">
                          Help & Support
                        </p>
                        <Popover.Button
                          as="div"
                          className="hover:bg-gray-50 py-[10px] border-0"
                        >
                          <a
                            target="_blank"
                            href="https://roadmap.influencify.co/"
                            rel="noopener noreferrer"
                            className="success hover:success px-4 flex justify-between hover:success"
                          >
                            Request a feature
                            <FiChevronRight size={20} className="gray" />
                          </a>
                        </Popover.Button>
                        <Popover.Button
                          as="div"
                          className="hover:bg-gray-50 hover:success py-[0.5rem]"
                        >
                          <a
                            target="_blank"
                            href="https://roadmap.influencify.co/roadmap"
                            rel="noopener noreferrer"
                            className="success hover:success px-4 flex justify-between hover:success"
                          >
                            Product roadmap
                            <FiChevronRight
                              size={20}
                              className="gray hover:success"
                            />
                          </a>
                        </Popover.Button>
                        <Popover.Button
                          as="div"
                          className="hover:bg-gray-50 py-[10px] border-b border-[#0000001f]"
                        >
                          <a
                            target="_blank"
                            href="https://knowledgebase.influencify.co/docs"
                            rel="noopener noreferrer"
                            className="success hover:success px-4 flex justify-between hover:success"
                          >
                            Knowledge base
                            <FiChevronRight
                              size={20}
                              className="gray hover:success"
                            />
                          </a>
                        </Popover.Button>
                        <Popover.Button
                          as="div"
                          className="hover:bg-gray-50 py-[10px]"
                        >
                          <a
                            target="_blank"
                            href="https://calendly.com/hazim-klafla/discovery"
                            rel="noopener noreferrer"
                            className="success hover:success px-4 flex justify-between hover:success"
                          >
                            Talk to the founder
                            <FiChevronRight
                              size={20}
                              className="gray hover:success"
                            />
                          </a>
                        </Popover.Button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Notification history={history} navigate={navigate} />

                <Popover className="bg-white flex items-center relative">
                  <Popover.Button className="bg-whte rounded-full border-2 border--purple inline-flex items-center focus-visible:outline-0 justify-center">
                    <img
                      className="logo rounded-full w-[32px]"
                      alt="logo"
                      src={
                        this.props.currentLoggedUser &&
                        this.props.currentLoggedUser.avatar
                          ? this.props.currentLoggedUser.avatar
                          : avatar
                      }
                    />
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
                      {({ close }) => (
                        <div className="rounded-[8px] bg-white py-3 ">
                          <div className="sm:flex flex-wrap px-1 gap-3">
                            <div className="pl-2">
                              <img
                                className="border-2 rounded-full border--purple p-1 w-[62px]"
                                alt="logo"
                                src={
                                  this.props.currentLoggedUser.avatar
                                    ? this.props.currentLoggedUser.avatar
                                    : avatar
                                }
                              />
                            </div>
                            <div className="my-auto md:w-1/3">
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
                                <span className="text-[12px] lightDark">
                                  {this.props.currentLoggedUser &&
                                  this.props.currentLoggedUser.city
                                    ? this.props.currentLoggedUser.city[
                                        "label"
                                      ] + ","
                                    : ""}
                                  {this.props.currentLoggedUser &&
                                  this.props.currentLoggedUser.country
                                    ? this.props.currentLoggedUser.country[
                                        "label"
                                      ]
                                    : ""}
                                </span>
                              </div>
                            </div>
                            <div className="ml-auto md:w-2/5">
                              <p>Plan Name: {this.props.planName}</p>
                            </div>
                          </div>

                          <div className="sm:flex gap-x-5 mt-4 mb-2 px-[1rem]">
                            <div className="my-auto  md:w-1/3">
                              <p className="black text-[12px]">Main Account</p>
                            </div>
                            <div className="md:w-4/6">
                              <div className="flex gap-x-5 flex-wrap items-center sm:justify-around justify-end">
                                <button
                                  onClick={close}
                                  className="bg-transparent p-0 w-auto inline-block border-0"
                                >
                                  <NavLink
                                    to="/account"
                                    className="black hover:success"
                                  >
                                    <u className="text-[14px] mb-1 inline-block">
                                      Account
                                    </u>
                                  </NavLink>
                                </button>
                                {refreshData.is_main &&
                                  refreshData.planName !== "Free" && (
                                    <button
                                      onClick={close}
                                      className="bg-transparent p-0 w-auto inline-block"
                                    >
                                      <NavLink
                                        to="/billing/credit"
                                        className="black hover:success"
                                      >
                                        <u className="text-[14px] mb-1 inline-block">
                                          Purchase credits
                                        </u>
                                      </NavLink>
                                    </button>
                                  )}
                                {refreshData &&
                                refreshData.is_main &&
                                !refreshData.is_appsumo ? (
                                  <button
                                    onClick={close}
                                    className="bg-transparent p-0 w-auto inline-block"
                                  >
                                    <NavLink
                                      className="mt-4 black hover:success"
                                      to="/billing"
                                    >
                                      <u className="text-[14px] mb-1 inline-block">
                                        Upgrade
                                      </u>
                                    </NavLink>
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="max-h-[200px] overflow-y-auto">
                            {mainAccount && mainAccount.id && (
                              <div
                                className={`flex items-center border-b py-3 px-[1rem] ${
                                  this.props.user.id === mainAccount.id &&
                                  "bg-[#f4f4f5]"
                                }`}
                              >
                                <img
                                  className="mr-4 object-cover rounded-full w-[38px] h-[38px]"
                                  src={
                                    mainAccount.profile_pic
                                      ? process.env.REACT_APP_AWS_URl +
                                        "/" +
                                        mainAccount.profile_pic
                                      : avatar
                                  }
                                  alt={mainAccount.name}
                                />
                                <div>
                                  <h6 className="font-medium text-[13px] mb-1">
                                    {mainAccount.name}
                                  </h6>
                                  <p className="text-[11px] black flex items-center">
                                    <a
                                      href={
                                        this.props.user.id === mainAccount.id
                                          ? "/brand/campaigns?tab=active"
                                          : "/dashboard"
                                      }
                                      title="Active campaign"
                                      style={{
                                        color: "#1fcfc5",
                                      }}
                                      className="flex items-center text-[13px] gap-x-1"
                                    >
                                      {mainAccount.campaigns_count}
                                      <MdCampaign color="#1fcfc5" size={20} />
                                    </a>
                                    <div className="lightdark mx-2">|</div>
                                    <a
                                      href={
                                        this.props.user.id === mainAccount.id
                                          ? "/brand/campaigns?tab=draft"
                                          : "/dashboard"
                                      }
                                      title="Draft campaign"
                                      style={{
                                        color: "#8d8d8d",
                                      }}
                                      className="flex items-center text-[13px] gap-x-1"
                                    >
                                      {mainAccount.draft_count}
                                      <MdCampaign color="#8d8d8d" size={20} />
                                    </a>
                                    <div className="lightdark mx-2">|</div>
                                    <a
                                      href={
                                        this.props.user.id === mainAccount.id
                                          ? "/brand/campaigns?tab=closed"
                                          : "/dashboard"
                                      }
                                      title="Closed campaign"
                                      style={{
                                        color: "red",
                                      }}
                                      className="flex items-center text-[13px] gap-x-1"
                                    >
                                      {mainAccount.closed_count}
                                      <MdCampaign color="red" size={20} />
                                    </a>
                                  </p>
                                </div>
                                {this.props.user.id !== mainAccount.id ? (
                                  <button
                                    className="px-[1rem] inline-flex items-center justify-center whitespace-nowrap rounded-[8px] border-0 text-[12px] bg--purple font-medium text-white hover:opacity-80 h-[35px] tracking-wider ml-auto"
                                    onClick={() =>
                                      this.switchAccount(mainAccount.id)
                                    }
                                  >
                                    Switch
                                  </button>
                                ) : null}
                              </div>
                            )}
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
                                      "bg-active"
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
                                              : "/dashboard"
                                          }
                                          title="Active campaign"
                                          style={{
                                            color: "#1fcfc5",
                                          }}
                                          className="flex items-center text-[13px] gap-x-1"
                                        >
                                          {account.campaigns_count}
                                          <MdCampaign
                                            color="#1fcfc5"
                                            size={20}
                                          />
                                        </a>
                                        <div className="lightdark mx-2">|</div>
                                        <a
                                          href={
                                            this.props.user.id === account.id
                                              ? "/brand/campaigns?tab=draft"
                                              : "/dashboard"
                                          }
                                          title="Draft campaign"
                                          style={{
                                            color: "#8d8d8d",
                                          }}
                                          className="flex items-center text-[13px] gap-x-1"
                                        >
                                          {account.draft_count}
                                          <MdCampaign
                                            color="#8d8d8d"
                                            size={22}
                                          />
                                        </a>
                                        <div className="lightdark mx-2">|</div>
                                        <a
                                          href={
                                            this.props.user.id === account.id
                                              ? "/brand/campaigns?tab=closed"
                                              : "/dashboard"
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
                                        className="px-[1rem] leading-7 border-0 text-[14px] rounded-[8px] bg--purple font-medium text-white hover:opacity-80 whitespace-nowrap tracking-wider h-[35px] inlie-flex item-center justify-center ml-auto"
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

                          <div className="flex items-center justify-between mt-4 px-[1rem]">
                            {refreshData.is_main &&
                            refreshData.offer?.sub_account > 0 ? (
                              <button
                                className="px-4 py-[0.5rem] leading-7 border-0 text-[14px] rounded-[8px] bg--purple font-medium text-white hover:opacity-80 whitespace-nowrap h-[40px]"
                                onClick={() =>
                                  this.addbrandRef.current.openAddbrand()
                                }
                              >
                                Add Brand
                              </button>
                            ) : (
                              <Popover.Button
                                as="div"
                                className="bg-transparent p-0 w-auto inline-block"
                              >
                                {this.props.role === "brand" && (
                                  <Tooltip
                                    trigger={
                                      <NavLink
                                        className="px-4 py-[0.5rem] leading-6 bg-[#f4f4f5] border-[1px] dark border-[#f4f4f5] shadow inline-flex items-center justify-center whitespace-nowrap text-[12px] font-medium hover:opacity-80"
                                        to="/billing"
                                      >
                                        <FiPlus size={16} className="mr-1" />
                                        Add sub-account
                                        <MdLock className="ml-1" size={16} />
                                      </NavLink>
                                    }
                                    tooltipText="Please upgrade your subscription to add
																	sub-accounts"
                                    placement="top-left"
                                  />
                                )}
                              </Popover.Button>
                            )}
                            <Popover.Button
                              as="div"
                              className="bg-transparent p-0 inline-block w-auto"
                            >
                              <button
                                className="px-4 py-[0.5rem] leading-7 border-0 text-[14px] rounded-[8px] bg--purple font-medium text-white hover:opacity-80 whitespace-nowrap h-[40px]"
                                onClick={this.props.handleLogoutSubmit}
                              >
                                Log out
                              </button>
                            </Popover.Button>
                          </div>
                        </div>
                      )}
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
                      <div className="px-1 py-1 ">
                        <div className="rounded-[8px] shadow-lg bg-white">
                          <div className="py-8 px-12 space-y-10">
                            <Menu.Item>
                              <NavLink
                                to="/brand/campaigns"
                                className="black hover:opacity-80 hover:black inline-flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
                              >
                                <img
                                  src={Campaigns}
                                  alt="Campaign"
                                  className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                                />
                                Campaigns
                              </NavLink>
                            </Menu.Item>
                            <Popover className="relative">
                              <Popover.Button className="relative cursor-pointer">
                                <div className="inline-flex items-center">
                                  <img
                                    src={Influencer}
                                    alt="Influencer"
                                    className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                                  />
                                  <span className="font-normal">
                                    Influencers
                                  </span>
                                </div>
                              </Popover.Button>
                              <Popover.Panel className="absolute z-10 mt-4 max-h-[300px] overflow-y-auto md:w-screen md:max-w-[675px] md:inset-x-auto inset-x-0 transform px-2 sm:!px-1 lg:!ml-0 -translate-x-1">
                                <div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                                  <div className="grid md:grid-cols-2 grid-cols-1 ">
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/discovery/youtube"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={InflDiscover}
                                              alt="Discover"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Discover
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Access the full power of our 35M
                                              inflencers database search
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/list/youtube"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Lists}
                                              alt="Lists"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Lists
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Save Influencers into lists and
                                              estimate audience overlap
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/past-report/youtube"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={InflAnalyzer}
                                              alt="Analyzer"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Analyzer
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Analyze influencers for fake
                                              followers and more
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Popover>
                            <Popover className="relative">
                              <Popover.Button className="relative cursor-pointer">
                                <div className="inline-flex items-center">
                                  <img
                                    src={Follower}
                                    alt="Influential Follower"
                                    className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                                  />
                                  <span className="font-normal">
                                    Influential Fans
                                  </span>
                                </div>
                              </Popover.Button>
                              <Popover.Panel className="absolute z-10  mt-4 max-h-[300px] overflow-y-auto  md:w-screen md:max-w-[675px] md:inset-x-auto inset-x-0 transform px-2 sm:!px-1 lg:!ml-0 -translate-x-1">
                                <div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                                  <div className="grid md:grid-cols-2 grid-cols-1 ">
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/influencial/tiktok"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Tiktok}
                                              alt="Tiktok"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Tiktok Fans
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Discover your Tiktok influential
                                              followers, likers and mentions
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/influencial/youtube"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Youtube}
                                              alt="Youtube"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Youtube Fans
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Discover your Youtube influential
                                              followers, likers and mentions
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8">
                                      <Menu.Item>
                                        <NavLink
                                          to="/influencial/email-match"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Email}
                                              alt="Email"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Email Match
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Discover Influencers among your
                                              own email list
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Popover>
                            {/* <Popover className="relative">
															<Popover.Button className="relative cursor-pointer">
																<div className="inline-flex items-center">
																	<img
																		src={Explorer}
																		alt="Content Explorer"
																		className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
																	/>
																	<span className="font-normal">
																		Content Explorer
																	</span>
																</div>
															</Popover.Button>
															<Popover.Panel className="absolute z-10  mt-4 max-h-[300px] overflow-y-auto md:w-screen md:max-w-[300px] md:inset-x-auto inset-x-0 transform px-2 sm:!px-1 lg:!ml-0 -translate-x-1">
																<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
																	<div className="flex">
																		<div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
																			<Menu.Item>
																				<NavLink
																					to="/brand/monitoring/campaign"
																					className={({ isActive }) => [
																						"-m-3 flex items-start rounded-[8px] p-3  ",
																						isActive
																							? " hover:bg-blue-50"
																							: " hover:bg-gray-50",
																					]}
																				>
																					<div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
																						<img
																							src={Tracking}
																							alt="Tracking"
																							className="overflow-hidden w-[24px]"
																						/>
																					</div>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Instagram Story Tracking
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Track, store and download any
																							Influencer story
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/brand/sponsored-posts"
																					className={({ isActive }) => [
																						"-m-3 flex items-start rounded-[8px] p-3  ",
																						isActive
																							? " hover:bg-blue-50"
																							: " hover:bg-gray-50",
																					]}
																				>
																					<div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
																						<img
																							src={Sponsored}
																							alt="Sponsored"
																							className="overflow-hidden w-[24px]"
																						/>
																					</div>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Sponsored Posts
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Get access to our list of top ads
																							created across Tiktok, Instagram &
																							Youtube
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																		</div>
																	</div>
																</div>
															</Popover.Panel>
														</Popover> */}
                            <Menu.Item>
                              <NavLink
                                to="/reports"
                                className="black hover:opacity-80 hover:black inline-flex items-center rounded-md  bg-white text-[14px] font-normal  focus:outline-none"
                              >
                                <img
                                  src={Explorer}
                                  alt="Explorer"
                                  className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                                />
                                Reports & Tracking
                              </NavLink>
                            </Menu.Item>
                            <Popover className="relative">
                              <Popover.Button className="relative cursor-pointer">
                                <div className="inline-flex items-center">
                                  <img
                                    src={Assets}
                                    alt="Assets"
                                    className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
                                  />
                                  <span className="font-normal">Assets</span>
                                </div>
                              </Popover.Button>
                              <Popover.Panel className="absolute z-10  mt-4 max-h-[300px] overflow-y-auto md:w-screen md:max-w-[300px] md:inset-x-auto inset-x-0 transform px-2 sm:!px-1 lg:!ml-0 -translate-x-1">
                                <div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                                  <div className="flex">
                                    <div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
                                      <Menu.Item>
                                        <NavLink
                                          to="/products"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Product}
                                              alt="Product"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Products
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Check your current assets for
                                              campaigns
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                      <Menu.Item>
                                        <NavLink
                                          to="/invoices"
                                          className={({ isActive }) => [
                                            "-m-3 flex items-start rounded-[8px] p-3  ",
                                            isActive
                                              ? " hover:bg-blue-50"
                                              : " hover:bg-gray-50",
                                          ]}
                                        >
                                          <div className="h-[40px] w-[40px] rounded flex items-center justify-center border-[1px] border-[#dee2e6] shrink-0 mr-4">
                                            <img
                                              src={Invoice}
                                              alt="Invoice"
                                              className="overflow-hidden w-[19px] h-[19px]"
                                            />
                                          </div>
                                          <div>
                                            <p className="text-[14px] font-medium text-gray-900">
                                              Invoices
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                              Keep track on your invoices &
                                              payments
                                            </p>
                                          </div>
                                        </NavLink>
                                      </Menu.Item>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Popover>

                            <Menu.Item>
                              <Link
                                to="/billing/credit"
                                className="ml-0 gap-x-1 flex items-center justify-center bg--success px-4 py-[5px] rounded-full"
                              >
                                <span className="text-white text-[13px] font-normal">
                                  Credits remaining:
                                </span>
                                <span className="text-white text-[13px] font-medium">
                                  {this.props.remainingCredits}
                                </span>
                              </Link>
                            </Menu.Item>
                          </div>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Addbrand ref={this.addbrandRef} />
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
    currentLoggedInUser: (query) =>
      dispatch(headerActions.currentLoggedInUser(query)),
    refreshReports: () => dispatch(headerActions.refreshReports()),
    switchAccount: (data) => {
      actions.switchBrandAccount(dispatch, data);
    },
    fetchInfluencerSubAccount: (data) => {
      actions.fetchInfluencerSubAccount(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandHeader);
