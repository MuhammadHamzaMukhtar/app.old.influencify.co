import { Component } from "react";
import Button from "@components/global/Button";
import Tooltip from "@components/global/Tooltip";
import { Nav, Tab } from "react-bootstrap";
import BasicTab from "./BasicTab";
import BriefTab from "./BriefTab";
import InvitationTab from "./InvitationTab";
import TimingTab from "./TimingTab";
import InfluencersTab from "./InfluencersTab";
import PaymentTab from "./PaymentTab";
import OverviewTab from "./OverviewTab";
import { connect } from "react-redux";
import * as setUpCampaignActions from "@store/actions/SetUpCampaignActions";
import * as brandInfluencerSearchActions from "@store/actions/BrandInfluencerSearchActions";
import * as typeActions from "@store/actions/TypeActions";
import * as basicActionCreator from "@store/actions/BasicActions";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
// import {Helmet} from "react-helmet";
import {
	HANDLE_SUBMIT_OVERVIEW_CHANGE,
	HANDLE_MODIFY_CHANGE,
	HANDLE_CAMPAIGN_CACHE_CLEAR,
	HANDLE_SUGGESTED_FEE_FLAG,
	HANDLE_CLEAR_SELECTED_INFLUENCERS,
} from "@store/constants/action-types";
const { actions } = require("@store/redux/InfluencerSearchRedux");

class SetUpNewCampaign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ranges: [],
			shouldBlockNavigation: true,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (this.state.shouldBlockNavigation) {
			this.props.ClearCampaignCache(id);
		}
		this.props.fetchCampaign(id);
		this.props.fetchTypes();
		this.props.fetchPlatforms();
		this.props.fetchCountries();
		this.props.fetchCampaignCategories();
	}

	componentWillUnmount() {
		this.props.clearFilters();
		this.props.handleClearSelectedInfluencers();
	}

	showModal = (location) =>
		this.setState({
			modalVisible: true,
			lastLocation: location,
		});

	handleChange = (event) => {
		if (event === 2) {
			this.props.fetchPlatforms();
			this.props.fetchCountries();
			this.props.fetchCampaignCategories();
		}
		if (event === 3) {
			this.props.fetchCampaignGoals();
		} else if (event === 4) {
			this.props.fetchGmailSetting();
		} else if (event === 6) {
			const { fetchDictionaries, searchInfluencers } = this.props;
			fetchDictionaries();
			const payload = Object.assign({}, this.props.payload);
			let newQuery = {
				platform: "instagram",
				payload: payload,
			};
			searchInfluencers(newQuery);
		} else if (event === 7) {
			this.props.fetchRanges();
			this.props.fetchProducts();
		}
		const campaign_id = this.props.match.params.id;
		if (this.props.activeTab === 1) {
			let flag = false;
			if (this.props.history.location.state === "isNewCampaign") {
				flag = true;
			}
			let query = {
				tab: event,
				campaign_id: campaign_id,
				typeId: this.props.typeId,
				typeName: this.props.typeName,
				pathName: this.props.pathName,
				flag: flag,
			};
			this.props.submitType(query);
		} else if (this.props.activeTab === 2) {
			let query = {
				tab: event,
				campaign_id: campaign_id,
				selectedPlatform: this.props.selectedPlatform,
				campaignTitle: this.props.campaignTitle,
				selectedCountries: this.props.selectedCountries,
				contentType: this.props.contentType,
				campaignPostType: this.props.campaignPostType,
				multiContentValue: this.props.multiContentValue,
				campaignPreview: this.props.campaignPreview,
				campaignVisibility: this.props.campaignVisibility,
				selectedCategories: this.props.selectedCategories,
			};
			this.props.submitBasic(query);
		} else if (this.props.activeTab === 3) {
			let query = {
				tab: event,
				campaign_id: campaign_id,
				campaignInstruction: this.props.campaignInstruction,
				postWording: this.props.postWording,
				postWordingType: this.props.postWordingType,
				linkToShare: this.props.linkToShare,
				campaignAttachments: this.props.campaignAttachments,
				campaignCover: this.props.campaignCover,
				imageOption: this.props.imageOption,
				selectedGoal: this.props.selectedGoal,
			};
			this.props.submitBrief(query);
		} else if (this.props.activeTab === 4) {
			let query = {
				tab: event,
				campaign_id: campaign_id,
				applicationFrom: this.props.applicationFrom,
				applicationTo: this.props.applicationTo,
				postingFrom: this.props.postingFrom,
				postingTo: this.props.postingTo,
				completeInDays: this.props.completeInDays,
			};
			this.props.submitTiming(query);
		} else if (this.props.activeTab === 5) {
			let query = {
				tab: event,
				campaign_id: campaign_id,
				selectedInfluencers: this.props.selectedInfluencers,
			};
			this.props.submitInfluencers(query);
			this.props.fetchCampaign(campaign_id);
		} else if (this.props.activeTab === 6) {
			let query = {
				tab: event,
				campaign_id: campaign_id,
				campaignBudget: this.props.campaignBudget,
				serviceFee: this.props.serviceFee,
				spendable: this.props.spendable,
				handlingFee: this.props.handlingFee,
				payPerClickAmount: this.props.payPerClickAmount,
				payPerClickLimitPost: this.props.payPerClickLimitPost,
				payPerClickWaitingTime: this.props.payPerClickWaitingTime,
				selectedInfluencers: this.props.selectedInfluencers,
				productPerInfluencerValue: this.props.productPerInfluencerValue,
				paymentType: this.props.paymentType,
				contentCampaignPriceType: this.props.contentCampaignPriceType,
				pricePerImage: this.props.pricePerImage,
				pricePerVideo: this.props.pricePerVideo,
				pricePerStory: this.props.pricePerStory,
				payPerProduct: this.props.payPerProduct,
				campaignRanges: this.props.campaignRanges,
				contentProduct: this.props.contentProduct,
			};
			this.props.submitPayment(query);
			this.props.handleSuggestedFeeFlag(false);
		} else if (this.props.activeTab === 7) {
			this.props.submitOverviewChange(event);
		}
	};

	addCountryField = () => {
		this.setState({ countries: [...this.state.countries, ""] });
	};

	removeCountryField = (index) => {
		this.state.countries.splice(index, 1);
		this.setState({ countries: this.state.countries });
	};

	handleCountryChange = (e, index) => {
		this.state.countries[index] = e.target.value;

		this.setState({
			countries: this.state.countries,
		});
	};

	handleFollowerRangeChange = (e) => {
		let serviceFee = 0;
		let price = e.target.value;
		for (let i = 6; i <= price; i = i + 11) {
			serviceFee++;
		}

		let spendable = price - serviceFee;
		this.setState({
			service: serviceFee,
			price: price,
			spendable: spendable,
		});
	};

	handleClick = () => {
		const campaign_id = this.props.match.params.id;
		if (this.props.activeTab === 1) {
			let flag = false;
			if (this.props.history.location.state === "isNewCampaign") {
				flag = true;
			}
			let query = {
				tab: 2,
				campaign_id: campaign_id,
				typeId: this.props.typeId,
				typeName: this.props.typeName,
				pathName: this.props.pathName,
				flag: flag,
			};
			this.props.submitType(query);
			this.props.fetchPlatforms();
			this.props.fetchCountries();
			this.props.fetchCampaignCategories();
		} else if (this.props.activeTab === 2) {
			let query = {
				tab: 3,
				campaign_id: campaign_id,
				selectedPlatform: this.props.selectedPlatform,
				campaignTitle: this.props.campaignTitle,
				selectedCountries: this.props.selectedCountries,
				contentType: this.props.contentType,
				campaignPostType: this.props.campaignPostType,
				multiContentValue: this.props.multiContentValue,
				campaignPreview: this.props.campaignPreview,
				campaignVisibility: this.props.campaignVisibility,
				selectedCategories: this.props.selectedCategories,
			};
			this.props.submitBasic(query);
			this.props.fetchCampaign(campaign_id);
		} else if (this.props.activeTab === 3) {
			let query = {
				tab: 4,
				campaign_id: campaign_id,
				campaignInstruction: this.props.campaignInstruction,
				postWording: this.props.postWording,
				postWordingType: this.props.postWordingType,
				linkToShare: this.props.linkToShare,
				campaignAttachments: this.props.campaignAttachments,
				campaignCover: this.props.campaignCover,
				imageOption: this.props.imageOption,
				selectedGoal: this.props.selectedGoal,
			};
			this.props.submitBrief(query);
			this.props.fetchGmailSetting();
		} else if (this.props.activeTab === 4) {
			let query = {
				tab: 5,
			};
			this.props.submitInvitation(query);
		} else if (this.props.activeTab === 5) {
			let query = {
				tab: 6,
				campaign_id: campaign_id,
				applicationFrom: this.props.applicationFrom,
				applicationTo: this.props.applicationTo,
				postingFrom: this.props.postingFrom,
				postingTo: this.props.postingTo,
				completeInDays: this.props.completeInDays,
			};
			this.props.submitTiming(query);

			const { fetchDictionaries, searchInfluencers } = this.props;
			fetchDictionaries();
			const payload = Object.assign({}, this.props.payload);
			let newQuery = {
				platform: "instagram",
				payload: payload,
			};
			searchInfluencers(newQuery);
		} else if (this.props.activeTab === 6) {
			this.props.fetchRanges();
			this.props.fetchProducts();
			let query = {
				tab: 7,
				campaign_id: campaign_id,
				selectedInfluencers: this.props.selectedInfluencers,
				platform: "instagram",
			};
			this.props.submitInfluencers(query);
			this.props.fetchCampaign(campaign_id);
		} else if (this.props.activeTab === 7) {
			let query = {
				tab: 8,
				campaign_id: campaign_id,
				campaignBudget: this.props.campaignBudget,
				serviceFee: this.props.serviceFee,
				spendable: this.props.spendable,
				handlingFee: this.props.handlingFee,
				payPerClickAmount: this.props.payPerClickAmount,
				payPerClickLimitPost: this.props.payPerClickLimitPost,
				payPerClickWaitingTime: this.props.payPerClickWaitingTime,
				selectedInfluencers: this.props.selectedInfluencers,
				productPerInfluencerValue: this.props.productPerInfluencerValue,
				paymentType: this.props.paymentType,
				contentCampaignPriceType: this.props.contentCampaignPriceType,
				pricePerImage: this.props.pricePerImage,
				pricePerVideo: this.props.pricePerVideo,
				pricePerStory: this.props.pricePerStory,
				payPerProduct: this.props.payPerProduct,
				campaignRanges: this.props.campaignRanges,
				contentProduct: this.props.contentProduct,
			};
			this.props.submitPayment(query);
			this.props.handleSuggestedFeeFlag(false);
		}
	};

	handlePublishClick = () => {
		const campaign_id = this.props.match.params.id;
		let query = {
			tab: 1,
			campaign_id: campaign_id,
			selectedInfluencers: this.props.selectedInfluencers,
		};
		this.props.submitOverview(query);
	};

	handleSaveClick = () => {
		const campaign_id = this.props.match.params.id;
		let query = {
			tab: 1,
			campaign_id: campaign_id,
			selectedInfluencers: this.props.selectedInfluencers,
		};
		this.props.saveOverview(query);
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		if (!localStorage.getItem("isLogin")) {
			return <Navigate to="/login" />;
		}
		if (this.props.campaignSubmitRedirect) {
			return <Navigate to="/brand/campaigns" />;
		}
		return (
			<div>
				{/* <Helmet>
                      <meta charSet="utf-8" />
                      <title>Campaign Creation| Influencify </title>
                      <link rel="canonical" href={url} />
                    </Helmet> */}
				<div className="campaigns-tab-header ">
					<div className="hidden sm:inline-block w-full">
						<div className="brand-campaigns-tab-header">
							<Tab.Container
								id="left-tabs-example"
								onSelect={this.handleChange}
								defaultActiveKey={this.props.activeTab}
								activeKey={this.props.activeTab}
							>
								<div className="campaigns-tab-header-inner">
									<div className="containers relative">
										<div className="flex justify-between items-center ">
											<Nav
												variant="pills"
												className="flex-row justify-between mb-0 SetUpNewCampaign__MainPills relative"
											>
												<div className="tab__line" />
												{/* <Nav.Item>
                                                  <Nav.Link eventKey="1">Type</Nav.Link>
                                                </Nav.Item> */}
												<Nav.Item>
													<Nav.Link eventKey="2">Basic</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="3">Brief</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="4">Invitation</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="5">Timing</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="6">Influencers</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="7">Payment</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="8">Overview</Nav.Link>
												</Nav.Item>
											</Nav>
											<div className="tab__right__header flex items-center">
												{this.props.isLoading ? (
													<p className="flex items-center pr-4">
														<FaSpinner className="animate-[spin_2s_linear_infinite] pink mr-2" />{" "}
														Saving
													</p>
												) : (
													""
												)}
												{this.props.activeTab !== 8 ? (
													<Button
														className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
														onClick={this.handleClick}
														text="Next"
													/>
												) : this.props.campaignStatus === "draft" ? (
													<div className="flex">
														<Button
															className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															onClick={this.handleSaveClick}
															text="Save"
														/>
														<Tooltip
															trigger={
																<Button
																	className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-4"
																	onClick={this.handlePublishClick}
																	text="Publish"
																/>
															}
															tooltipText="By publishing a campaign, an email invitation will
															go separately to each influencer in the campaign.
															After 48 hours, If the influencer still didn't
															participate in the campaign, we will send them a
															reminder email, encouraging them to take part"
															placement="top-left"
														/>
													</div>
												) : (
													<Button
														className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
														onClick={(e) => this.handleSaveClick(e)}
														text="Save"
													/>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="containers">
									<Tab.Content className="bg-transparent px-0">
										{/* <Tab.Pane eventKey="1">
                                               <TypeTab ref={this.type}/>
                                            </Tab.Pane> */}
										<Tab.Pane eventKey="2">
											<BasicTab ref={this.basic} />
										</Tab.Pane>
										<Tab.Pane eventKey="3">
											<BriefTab ref={this.brief} />
										</Tab.Pane>
										<Tab.Pane eventKey="4">
											<InvitationTab ref={this.invitation} />
										</Tab.Pane>
										<Tab.Pane eventKey="5">
											<TimingTab ref={this.timing} />
										</Tab.Pane>
										<Tab.Pane eventKey="6">
											<InfluencersTab
												ref={this.influencers}
												{...this.state}
												handleInfluencerSelection={
													this.handleInfluencerSelection
												}
											/>
										</Tab.Pane>
										<Tab.Pane eventKey="7">
											<PaymentTab
												ref={this.payment}
												handleFollowerRangeChange={
													this.handleFollowerRangeChange
												}
												ranges={this.state.ranges}
												price={this.state.price}
												service={this.state.service}
												spendable={this.state.spendable}
											/>
										</Tab.Pane>
										<Tab.Pane eventKey="8">
											<OverviewTab
												ref={this.overview}
												handleInfluencerSelection={
													this.handleInfluencerSelection
												}
											/>
										</Tab.Pane>
									</Tab.Content>
								</div>
							</Tab.Container>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		influencers: state.influencers,
		errorsObj: state.SetUpNewCampaignReducer.errorsObj,
		activeTab: state.SetUpNewCampaignReducer.activeTab,
		typeId: state.SetUpNewCampaignReducer.typeId,
		typeName: state.SetUpNewCampaignReducer.typeName,
		campaignTitle: state.SetUpNewCampaignReducer.campaignTitle,
		contentType: state.SetUpNewCampaignReducer.contentType,
		campaignPostType: state.SetUpNewCampaignReducer.campaignPostType,
		multiContentValue: state.SetUpNewCampaignReducer.multiContentValue,
		campaignPreview: state.SetUpNewCampaignReducer.campaignPreview,
		campaignVisibility: state.SetUpNewCampaignReducer.campaignVisibility,
		selectedCountries: state.SetUpNewCampaignReducer.selectedCountries,
		campaignInstruction: state.SetUpNewCampaignReducer.campaignInstruction,
		postWording: state.SetUpNewCampaignReducer.postWording,
		postWordingType: state.SetUpNewCampaignReducer.postWordingType,
		linkToShare: state.SetUpNewCampaignReducer.linkToShare,
		completeInDays: state.SetUpNewCampaignReducer.completeInDays,
		applicationFrom: state.SetUpNewCampaignReducer.applicationFrom,
		applicationTo: state.SetUpNewCampaignReducer.applicationTo,
		postingFrom: state.SetUpNewCampaignReducer.postingFrom,
		postingTo: state.SetUpNewCampaignReducer.postingTo,
		selectedInfluencers: state.SetUpNewCampaignReducer.selectedInfluencers,
		campaignBudget: state.SetUpNewCampaignReducer.campaignBudget,
		serviceFee: state.SetUpNewCampaignReducer.serviceFee,
		spendable: state.SetUpNewCampaignReducer.spendable,
		handlingFee: state.SetUpNewCampaignReducer.handlingFee,
		payPerClickAmount: state.SetUpNewCampaignReducer.payPerClickAmount,
		payPerClickLimitPost: state.SetUpNewCampaignReducer.payPerClickLimitPost,
		payPerClickWaitingTime:
			state.SetUpNewCampaignReducer.payPerClickWaitingTime,
		pricePerInfluencerValue:
			state.SetUpNewCampaignReducer.pricePerInfluencerValue,
		productPerInfluencerValue:
			state.SetUpNewCampaignReducer.productPerInfluencerValue,
		campaignAttachments: state.SetUpNewCampaignReducer.campaignAttachments,
		campaignCover: state.SetUpNewCampaignReducer.campaignCover,
		imageOption: state.SetUpNewCampaignReducer.imageOption,
		campaignSubmitRedirect:
			state.SetUpNewCampaignReducer.campaignSubmitRedirect,
		campaignStatus: state.SetUpNewCampaignReducer.campaignStatus,
		countries: state.BasicReducer.countries,
		platforms: state.BasicReducer.platforms,
		preview: state.BasicReducer.preview,
		visibiity: state.BasicReducer.visibiity,
		feedPosts: state.BasicReducer.feedPosts,
		storyPosts: state.BasicReducer.storyPosts,
		instructions: state.BriefReducer.instructions,
		website_url: state.BriefReducer.website_url,
		post_wording: state.BriefReducer.post_wording,
		post_wording_type: state.BriefReducer.post_wording_type,
		isLoading: state.SetUpNewCampaignReducer.isLoading,
		selectedPlatform: state.InfluencersHeaderReducer.selectedPlatform,
		postingPeriod: state.TimingReducer.postingPeriod,
		selectedCategories: state.SetUpNewCampaignReducer.selectedCategories,
		selectedGoal: state.SetUpNewCampaignReducer.selectedGoal,
		paymentType: state.SetUpNewCampaignReducer.paymentType,
		contentCampaignPriceType:
			state.SetUpNewCampaignReducer.contentCampaignPriceType,
		pricePerImage: state.SetUpNewCampaignReducer.pricePerImage,
		pricePerVideo: state.SetUpNewCampaignReducer.pricePerVideo,
		pricePerStory: state.SetUpNewCampaignReducer.pricePerStory,
		payPerProduct: state.SetUpNewCampaignReducer.payPerProduct,
		campaignRanges: state.SetUpNewCampaignReducer.campaignRanges,
		contentProduct: state.SetUpNewCampaignReducer.contentProduct,

		influencerLocation: state.InfluencersFiltersReducer.influencerLocation,
		influencerLang: state.InfluencersFiltersReducer.influencerLang,
		influencerEngagement: state.InfluencersFiltersReducer.influencerEngagement,
		influencerFollowers: state.InfluencersFiltersReducer.influencerFollowers,
		influencerInterest: state.InfluencersFiltersReducer.influencerInterest,
		audienceAge: state.InfluencersFiltersReducer.audienceAge,
		audienceGender: state.InfluencersFiltersReducer.audienceGender,
		audienceInterest: state.InfluencersFiltersReducer.audienceInterest,
		audienceLang: state.InfluencersFiltersReducer.audienceLang,
		audienceLocation: state.InfluencersFiltersReducer.audienceLocation,
		sortQuery: state.InfluencersContentReducer.sortQuery,
		searchType: state.InfluencersHeaderReducer.searchType,
		pathName: state.SetUpNewCampaignReducer.pathName,
		payload: state.influencerSearch.payload,
		platform: state.influencerSearch.platform,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCampaign: (id) => dispatch(setUpCampaignActions.fetchCampaign(id)),
		submitType: (query) =>
			dispatch(setUpCampaignActions.submitType(query, ownProps)),
		submitBasic: (query) => dispatch(setUpCampaignActions.submitBasic(query)),
		submitBrief: (query) => dispatch(setUpCampaignActions.submitBrief(query)),
		submitInvitation: (query) =>
			dispatch(setUpCampaignActions.submitInvitation(query)),
		submitTiming: (query) => dispatch(setUpCampaignActions.submitTiming(query)),
		submitInfluencers: (query) =>
			dispatch(setUpCampaignActions.submitInfluencers(query)),
		submitPayment: (query) =>
			dispatch(setUpCampaignActions.submitPayment(query)),
		submitOverview: (query) =>
			dispatch(setUpCampaignActions.submitOverview(query)),
		saveOverview: (query) => dispatch(setUpCampaignActions.saveOverview(query)),
		submitOverviewChange: (event) =>
			dispatch({ type: HANDLE_SUBMIT_OVERVIEW_CHANGE, payload: event }),
		handleModifyClick: (event) =>
			dispatch({ type: HANDLE_MODIFY_CHANGE, payload: event }),
		ClearCampaignCache: (event) =>
			dispatch({ type: HANDLE_CAMPAIGN_CACHE_CLEAR, payload: event }),
		fetchInfluencers: (url, query) =>
			dispatch(brandInfluencerSearchActions.fetchInfluencers(url, query)),
		fetchTypes: () => dispatch(typeActions.fetchTypes()),
		fetchPlatforms: () => dispatch(basicActionCreator.fetchPlatforms()),
		fetchUserCategories: () =>
			dispatch(brandInfluencerSearchActions.fetchUserCategories()),
		fetchCountries: () =>
			dispatch(brandInfluencerSearchActions.fetchCountries()),
		fetchRanges: () => dispatch(setUpCampaignActions.fetchRanges()),
		fetchProducts: () => dispatch(setUpCampaignActions.fetchProducts()),
		fetchCampaignCategories: () =>
			dispatch(basicActionCreator.fetchCampaignCategories()),
		fetchCampaignGoals: () => dispatch(basicActionCreator.fetchCampaignGoals()),
		fetchLanguages: () =>
			dispatch(brandInfluencerSearchActions.fetchLanguages()),
		fetchGmailSetting: () => dispatch(settingGmailActions.fetchGmailSetting()),
		handleSuggestedFeeFlag: (event) =>
			dispatch({ type: HANDLE_SUGGESTED_FEE_FLAG, payload: event }),
		fetchDictionaries: () => {
			actions.fetchDictionaries(dispatch);
		},
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
		clearFilters: () => {
			actions.clearFilters(dispatch);
		},
		handleClearSelectedInfluencers: () =>
			dispatch({ type: HANDLE_CLEAR_SELECTED_INFLUENCERS }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUpNewCampaign);
