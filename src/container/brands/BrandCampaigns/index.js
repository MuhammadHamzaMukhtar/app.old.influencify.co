import { Component } from "react";
import { Dialog, Tab } from "@headlessui/react";
import faceWithRollingEyes from "@assets/face_with_rolling_eyes.gif";
import BrandActiveCampaigns from "./components/BrandActiveCampaigns";
import BrandClosedCampaigns from "./components/BrandClosedCampaigns";
import BrandDraftCampaigns from "./components/BrandDraftCampaigns";
import { connect } from "react-redux";
import * as campaignActions from "@store/actions/CampaignActions";
import "./styles.css";
import { FiX } from "react-icons/fi";
import { Helmet } from "react-helmet";
import {
	HANDLE_CANCEL_REDIRECT,
	HANDLE_ACITVE_CAMPAIGN_TAB_SUCCESS,
} from "@store/constants/action-types";
import Emitter from "../../../constants/Emitter";
import LinkTo from "@components/global/LinkTo";

function MyVerticallyCenteredModal(props) {
	return (
		<Dialog
			open={props.show}
			onClose={props.onHide}
			className="relative z-[9999]"
		>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
					<Dialog.Title className="text-white text-center grow flex justify-end border-b border-[#dee2e6] p-3">
						<div
							className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
							onClick={props.onHide}
						>
							<FiX size={24} className="text-white stroke-white" />
						</div>
					</Dialog.Title>
					<div className="p-4">
						<div className="flex justify-center">
							<img
								variant="top"
								width="180px"
								alt="You've reached the limit for Free featuers"
								src={faceWithRollingEyes}
							/>
						</div>
						<p className="text-center">
							<b>You've reached the limit for "Free featuers"</b>
						</p>
						<p className="text-center">Upgrade your account to access</p>
						<div className="flex justify-center mt-12">
							<div onClick={props.onHide}>
								<LinkTo
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									to="/billing"
									text="Upgrade"
								/>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

class BrandCampaigns extends Component {
	constructor(props) {
		super(props);
		const param = this.props.name;
		this.state = {
			activeTab:
				param === "?tab=active"
					? 0
					: param === "?tab=draft"
					? 1
					: param === "?tab=closed"
					? 2
					: 0,
			showModal: false,
		};
	}
	componentDidMount() {
		this.onDocumentClick();
		//document.addEventListener("mouseup", this.onDocumentClick);
		// if (this.props.activeCampaignTab === 0) {
		// 	this.props.fetchActiveCampaigns("", { sortQuery: "newestFirst" });
		// }
		// if (this.props.activeCampaignTab === 1) {
		// 	this.props.fetchDraftCampaigns("", { sortQuery: "newestFirst" });
		// }
		// if (this.props.activeCampaignTab === 2) {
		// 	this.props.fetchClosedCampaigns("", { sortQuery: "newestFirst" });
		// }
		this.props.handleCancelRedirect();
	}
	onDocumentClick = () => {
		// const id = this.props.match.params.id;
		const param = this.props.name;

		// const param = this.props.history.location.search;
		if (param === "?tab=active") {
			//   this.setState({
			//     activeTab: 0,
			//   });
			this.props.handleCampaignActiveTab(0);
			this.props.fetchActiveCampaigns("", { sortQuery: "newestFirst" });
		} else if (param === "?tab=draft") {
			//   this.setState({
			//     activeTab: 1,
			//   });
			this.props.handleCampaignActiveTab(1);
			this.props.fetchDraftCampaigns("", { sortQuery: "newestFirst" });
		} else if (param === "?tab=closed") {
			//   this.setState({
			//     activeTab: 2,
			//   });
			this.props.handleCampaignActiveTab(2);
			this.props.fetchClosedCampaigns("", { sortQuery: "newestFirst" });
		}
	};
	newCampaign = () => {
		if (this.props.refreshData.is_admin) {
			if (this.props.isFreeTrial && this.props.isOnFreeTrial) {
				this.setState({
					showModal: true,
				});
			} else {
				this.props.navigate("/brand/campaign/new");
			}
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	onHide = () => {
		this.setState({
			showModal: false,
		});
	};
	handleChange = (event) => {
		if (event === 0) {
			this.setState({
				activeTab: event,
			});
			this.props.handleCampaignActiveTab(event);
			this.props.fetchActiveCampaigns("", { sortQuery: "newestFirst" });
		}
		if (event === 1) {
			this.setState({
				activeTab: event,
			});
			this.props.handleCampaignActiveTab(event);
			this.props.fetchDraftCampaigns("", { sortQuery: "newestFirst" });
		}
		if (event === 2) {
			this.setState({
				activeTab: event,
			});
			this.props.handleCampaignActiveTab(event);
			this.props.fetchClosedCampaigns("", { sortQuery: "newestFirst" });
		}
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Campaigns | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="mb-12">
					<Tab.Group
						defaultIndex={this.state.activeTab}
						onChange={(index) => {
							this.handleChange(index);
						}}
					>
						<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
							<div className="containers">
								<div className="flex flex-wrap items-center">
									<div className="md:w-8/12 sm:w-9/12 w-full">
										<Tab.List className="flex flex-wrap mb-0">
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Active
											</Tab>
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Draft
											</Tab>
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Closed
											</Tab>
										</Tab.List>
									</div>
									{/* <div className="md:w-4/12 sm:w-5/12 w-full md:text-right text-center ml-auto">
										<div className="mb-2 mt-4 md:mt-0 md:mb-0 text-nowrap">
											<button
												onClick={this.newCampaign}
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											>
												New Campaign
											</button>
										</div>
									</div> */}
								</div>
							</div>
						</div>
						<div className="containers">
							<Tab.Panels className="bg-transparent">
								<Tab.Panel>
									<BrandActiveCampaigns />
								</Tab.Panel>
								<Tab.Panel>
									<BrandDraftCampaigns />
								</Tab.Panel>
								<Tab.Panel>
									<BrandClosedCampaigns />
								</Tab.Panel>
							</Tab.Panels>
						</div>
					</Tab.Group>
				</div>
				<MyVerticallyCenteredModal
					show={this.state.showModal}
					onHide={() => this.onHide()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		refreshData: state.HeaderReducer.refreshData,
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isFreeTrial: state.HeaderReducer.isFreeTrial,
		isOnFreeTrial: state.HeaderReducer.isOnFreeTrial,
		isLoading: state.CampaignReducer.isLoading,
		activeCampaignsTotal: state.CampaignReducer.activeCampaignsTotal,
		draftCampaignsTotal: state.CampaignReducer.draftCampaignsTotal,
		closedCampaignsTotal: state.CampaignReducer.closedCampaignsTotal,
		cancelRedirect: state.SetUpNewCampaignReducer.cancelRedirect,
		activeCampaignTab: state.CampaignReducer.activeCampaignTab,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchActiveCampaigns: (page, query) =>
			dispatch(campaignActions.fetchActiveCampaigns(page, query)),
		fetchDraftCampaigns: (page, query) =>
			dispatch(campaignActions.fetchDraftCampaigns(page, query)),
		fetchClosedCampaigns: (page, query) =>
			dispatch(campaignActions.fetchClosedCampaigns(page, query)),
		handleCancelRedirect: (event) =>
			dispatch({ type: HANDLE_CANCEL_REDIRECT, payload: event }),
		handleCampaignActiveTab: (event) =>
			dispatch({ type: HANDLE_ACITVE_CAMPAIGN_TAB_SUCCESS, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandCampaigns);
