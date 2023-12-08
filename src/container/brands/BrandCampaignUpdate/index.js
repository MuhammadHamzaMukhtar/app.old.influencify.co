import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
// import {Helmet} from "react-helmet";
// import Type from "./Type";
import Basic from "./Basic";
import Brief from "./Brief";
import Invitation from "./Invitation";
// import Timing from "./Timing";
// import Influencers from "./Influencers";
import Payment from "./Payment";
import Overview from "./Overview";
import { FaSpinner } from "react-icons/fa";
import Tooltip from "@components/global/Tooltip";
import Button from "@components/global/Button";
import "./styles.css";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HANDLE_CAMPAIGN_CACHE_CLEAR } from "@store/constants/action-types";
import Tasks from "./Tasks";
import { toast } from "react-toastify";

const BrandCampaignUpdate = (props) => {
	const {
		activeTab,
		fetchCampaign,
		saveCampaign,
		fetchCountries,
		fetchPlatforms,
		fetchCampaignCategories,
		fetchCampaignGoals,
		handlePlatform,
		fetchDictionaries,
		searchInfluencers,
		fetchUserProducts,
		fetchGmailSetting,
		fetchSmtp,
		fetchInvitationEmailTemplates,
		clearInfluencers,
		clearCampaign,
		save_campaign_loading,
		form,
	} = props;

	const checkUniqueTitle = (campaignTasks) => {
		const titles = campaignTasks.map((task) => task.title);
		const uniqueTitles = new Set(titles);
		return titles.length === uniqueTitles.size;
	};

	const id = props.id;

	useEffect(() => {
		fetchCampaign(id);
		fetchCountries();
		fetchPlatforms();
		fetchCampaignCategories();
		fetchUserProducts();
		fetchCampaignGoals();
		return () => {
			clearInfluencers();
			clearCampaign();
		};
	}, []);

	const handleChangeTab = (key) => {
		const form = Object.assign({}, props.form);
		if (key === 1) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
		} else if (key === 2) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
			fetchCountries();
			fetchPlatforms();
			fetchCampaignCategories();
		} else if (key === 3) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
			fetchCampaignGoals();
		} else if (key === 4) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
		} else if (key === 5) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
			handlePlatform(form.platform_name);
			fetchDictionaries();
			const payload = Object.assign({}, props.payload);
			let newQuery = {
				platform: form.platform_name,
				payload: payload,
			};
			searchInfluencers(newQuery);
		} else if (key === 6) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
			fetchUserProducts();
		} else if (key === 7) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
		} else if (key === 8) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			if (!checkUniqueTitle(form.campaign_tasks)) {
				toast.error('The title must be unique');
			} else {
				saveCampaign(form);
				fetchSmtp();
				fetchGmailSetting();
				fetchInvitationEmailTemplates();
			}
		} else if (key === 9) {
			form.current_tab = activeTab;
			form.prior_tab = key;
			saveCampaign(form);
		}
	};

	const handleSaveClick = () => {
		const { refreshData } = props;
		const form = Object.assign({}, props.form);
		form.current_tab = 9;
		form.prior_tab = 9;
		form.button_type = "save";
		form.is_appsumo = refreshData.is_appsumo;
		props.saveCampaign(form);
	};

	const handlePublishClick = () => {
		const { refreshData } = props;
		const form = Object.assign({}, props.form);
		form.current_tab = 9;
		form.prior_tab = 9;
		form.button_type = "publish";
		form.is_appsumo = refreshData.is_appsumo;
		props.saveCampaign(form);
	};
	const handleClickButton = () => {
		const form = Object.assign({}, props.form);
		if (activeTab === 1) {
			form.current_tab = activeTab;
			form.prior_tab = 2;
			saveCampaign(form);
			fetchCountries();
			fetchPlatforms();
			fetchCampaignCategories();
		} else if (activeTab === 2) {
			form.current_tab = activeTab;
			form.prior_tab = 3;
			saveCampaign(form);
			fetchCampaignGoals();
		} else if (activeTab === 3) {
			form.current_tab = activeTab;
			form.prior_tab = 6;
			saveCampaign(form);
		} else if (activeTab === 4) {
			handlePlatform(form.platform_name);
			form.current_tab = activeTab;
			form.prior_tab = 5;
			saveCampaign(form);
			fetchDictionaries();
			const payload = Object.assign({}, this.props.payload);
			let newQuery = {
				platform: form.platform_name,
				payload: payload,
			};
			searchInfluencers(newQuery);
		} else if (activeTab === 5) {
			form.current_tab = activeTab;
			form.prior_tab = 6;
			saveCampaign(form);
			fetchUserProducts();
		} else if (activeTab === 6) {
			form.current_tab = activeTab;
			form.prior_tab = 7;
			saveCampaign(form);
			
		} else if (activeTab === 7) {
			form.current_tab = activeTab;
			form.prior_tab = 8;
			if (!checkUniqueTitle(form.campaign_tasks)) {
				toast.error('The title must be unique');
			} else {
				saveCampaign(form);
				fetchSmtp();
				fetchGmailSetting();
				fetchInvitationEmailTemplates();
			}
		} else if (activeTab === 8) {
			form.current_tab = activeTab;
			form.prior_tab = 9;
			saveCampaign(form);
		} 
	};

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Campaign Creation | Influencify </title>
				<link rel="canonical" href="" />
			</Helmet>
			<div className="w-full">
				<div className="brand-campaigns-tab-header">
					<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px] flex items-center">
						<div className="containers">
							<div className="flex flex-wrap justify-between">
								<div className=" relative sm:block hidden">
									<div className="absolute left-[40px] w-[calc(100%-106px)] top-[16.5px] h-[4px] bg-[#e9eaec]" />
									<div className="flex mb-0 brand-campaigns-tab-header">
										{/* <button
											onClick={() => handleChangeTab(1)}
											className={`${
												activeTab === 1
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} hidden default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Type
										</button> */}
										<button
											onClick={() => handleChangeTab(2)}
											className={`${
												activeTab === 2
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Basic
										</button>
										<button
											onClick={() => handleChangeTab(3)}
											className={`${
												activeTab === 3
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Brief
										</button>
										{/* <button
											onClick={() => handleChangeTab(4)}
											className={`${
												activeTab === 4
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} hidden default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Timing
										</button>
										<button
											onClick={() => handleChangeTab(5)}
											className={`${
												activeTab === 5
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} hidden default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Influencers
										</button> */}
										<button
											onClick={() => handleChangeTab(6)}
											className={`${
												activeTab === 6
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Payment
										</button>
										<button
											onClick={() => handleChangeTab(7)}
											className={`${
												activeTab === 7
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Tasks
										</button>
										<button
											onClick={() => handleChangeTab(8)}
											className={`${
												activeTab === 8
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Invitation
										</button>
										<button
											onClick={() => handleChangeTab(9)}
											className={`${
												activeTab === 9
													? "active font-semibold before:w-full cursor-default pointer-events-none after:transform after:scale-[1.2] after:!bg-[#7c3292] after:bg-no-repeat after:bg-center"
													: "font-normal before:w-0 cursor-pointer after:transform after:scale-[1.2]"
											} default-tab !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] pt-[30px] pb-[10px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 after:absolute after:content-[''] after:left-0 after:right-0 after:top-[7px] after:w-[20px] after:h-[20px] after:mx-auto after:rounded-[20px] after:bg-no-repeat after:bg-center after:bg-[#1fcfc5]`}
										>
											Overview
										</button>
									</div>
								</div>
								<h3 className="text-[11pt] text-black my-auto sm:hidden">
									Campaign Creation
								</h3>
								<div className="flex items-center justify-end grow">
									<div className="flex items-center justify-end relative top-0 grow">
										{save_campaign_loading ? (
											<p className="flex items-center pr-4">
												<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2" />
												Saving
											</p>
										) : (
											""
										)}
										{activeTab !== 9 ? (
											<Button
												className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-60"
												onClick={handleClickButton}
												text="Next"
											/>
										) : form.campaign_status === "draft" ? (
											<div className="flex">
												<Button
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													onClick={handleSaveClick}
													text="Save"
												/>
												<Tooltip
													trigger={
														<Button
															className="ml-4 px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#1fcfc5] text-white hover:opacity-80"
															onClick={handlePublishClick}
															text="Publish"
														/>
													}
													tooltipText="By publishing a campaign, an email invitation will go
													separately to each influencer in the campaign. After
													48 hours, If the influencer still didn't participate
													in the campaign, we will send them a reminder email,
													encouraging them to take part"
													placement="bottom-right"
												/>
											</div>
										) : (
											<Button
												className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
												onClick={(e) => handleSaveClick(e)}
												text="Save"
											/>
										)}
									</div>
									<Popover className="bg-transparent flex items-center ml-3 sm:hidden">
										<Popover.Button className="bg-transparent rounded-md inline-flex items-center justify-center">
											<HiOutlineChevronDown size={20} />
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
											<Popover.Panel className="absolute top-16 mx-[15px] z-50 inset-x-0 py-[0.5rem] transition transform origin-top-right">
												<div className="rounded-[8px] shadow-lg bg-white divide-y-2 divide-gray-50 py-3">
													<div className="flex flex-wrap px-[15px]">
														<button
															onClick={() => handleChangeTab(2)}
															className={`${
																activeTab === 2
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Basic
														</button>
														<button
															onClick={() => handleChangeTab(3)}
															className={`${
																activeTab === 3
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Brief
														</button>
														<button
															onClick={() => handleChangeTab(6)}
															className={`${
																activeTab === 6
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Payment
														</button>
														<button
															onClick={() => handleChangeTab(7)}
															className={`${
																activeTab === 7
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Tasks
														</button>
														<button
															onClick={() => handleChangeTab(8)}
															className={`${
																activeTab === 8
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Invitation
														</button>
														<button
															onClick={() => handleChangeTab(9)}
															className={`${
																activeTab === 9
																	? "active font-semibold before:w-full cursor-default pointer-events-none"
																	: "font-normal before:w-0 cursor-pointer"
															} !text-[#343749] mr-[20px] font-normal text-center relative leading-[40px] before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[15px] px-[1rem] before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0`}
														>
															Overview
														</button>
													</div>
												</div>
											</Popover.Panel>
										</Transition>
									</Popover>
								</div>
							</div>
						</div>
					</div>
					<div className="containers">
						<div className="bg-transparent mb-12">
							{/* <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
								<Type />
							</div> */}
							<div className={`${activeTab === 2 ? "block" : "hidden"}`}>
								<Basic />
							</div>
							{activeTab === 3 ? (
								<div className={`${activeTab === 3 ? "block" : "hidden"}`}>
									<Brief />
								</div>
							) : null}
							{/* <div className={`${activeTab === 4 ? "block" : "hidden"}`}>
								<Timing />
							</div>
							<div className={`${activeTab === 5 ? "block" : "hidden"}`}>
								<Influencers />
							</div> */}
							{activeTab === 6 ? (
								<div className={`${activeTab === 6 ? "block" : "hidden"}`}>
									<Payment />
								</div>
							) : null}
							<div className={`${activeTab === 7 ? "block" : "hidden"}`}>
								<Tasks />
							</div>
							<div className={`${activeTab === 8 ? "block" : "hidden"}`}>
								<Invitation />
							</div>
							<div className={`${activeTab === 9 ? "block" : "hidden"}`}>
								<Overview />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ campaign, influencerSearch, HeaderReducer }) => {
	return {
		campaign_loading: campaign.campaign_loading,
		save_campaign_loading: campaign.save_campaign_loading,
		activeTab: campaign.activeTab,
		nextTab: campaign.nextTab,
		form: campaign.form,
		errors: campaign.creation_errors,
		payload: influencerSearch.payload,
		platform: influencerSearch.platform,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions, types } = require("@store/redux/CampaignRedux");
	const { actions: globalactions } = require("@store/redux/GlobalRedux");
	const {
		actions: searchactions,
	} = require("@store/redux/InfluencerSearchRedux");
	const { actions: smtpactions } = require("@store/redux/SmtpRedux");
	return {
		fetchCampaign: (id) => {
			actions.fetchCampaign(dispatch, ownProps, id);
		},
		saveCampaign: (data) => {
			actions.saveCampaign(dispatch, ownProps, data);
		},
		fetchCountries: () => {
			globalactions.fetchCountries(dispatch);
		},
		fetchPlatforms: () => {
			globalactions.fetchPlatforms(dispatch);
		},
		fetchCampaignCategories: () => {
			globalactions.fetchCampaignCategories(dispatch);
		},
		fetchCampaignGoals: () => {
			globalactions.fetchCampaignGoals(dispatch);
		},
		fetchDictionaries: () => {
			searchactions.fetchDictionaries(dispatch);
		},
		handlePlatform: (data) => {
			searchactions.handlePlatform(dispatch, data);
		},
		searchInfluencers: (data) => {
			searchactions.searchInfluencers(dispatch, data);
		},
		fetchUserProducts: (data) => {
			globalactions.fetchUserProducts(dispatch, data);
		},
		fetchGmailSetting: () => {
			actions.fetchGmailSetting(dispatch);
		},
		fetchSmtp: () => {
			smtpactions.fetchSmtp(dispatch);
		},
		fetchInvitationEmailTemplates: () => {
			globalactions.fetchInvitationEmailTemplates(dispatch);
		},
		clearInfluencers: () => {
			dispatch({ type: types.HANDLE_CLEAR_SELECTED_INFLUENCERS });
		},
		clearCampaign: () => {
			dispatch({ type: HANDLE_CAMPAIGN_CACHE_CLEAR });
		},
		formErrors: (errors) => {
			actions.formErrors(dispatch, errors);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandCampaignUpdate);
