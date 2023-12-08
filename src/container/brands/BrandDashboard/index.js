import { Component } from "react";
import { Navigate } from "react-router-dom";
// import "../../../assets/css/Dashboard.css";
import GetStarted from "@assets/get_started.png";
import PopularSearch from "@assets/popular_search.png";
import TopCountry from "@assets/top_country.png";
import TopInfluencer from "@assets/top_influencer.png";
import PopularSearches from "./components/popularsearches";
import ConnectType from "./components/connecttype";
import InfluencerMarketing from "./components/influencermarketing";
import Topinfluencers from "./components/TopInfluencers";
import Topsearches from "./components/Topsearches";
import { connect } from "react-redux";
// import { Redirect } from "react-router";
import Loader from "@components/global/Loader";
import * as brandDashboardActions from "@store/actions/BrandDashboardActions";
import { Helmet } from "react-helmet";
import Overview from "./components/Overview";
import PostMentions from "./components/PostMentions";
import StoriesMentions from "./components/StoriesMentions";
import AudienceGender from "./components/AudienceGender";
import AudienceAge from "./components/AudienceAge";
import WorldMapChart from "./components/WorldMapChart";
import Influencify from "../../../constants/Influencify";
import LinkTo from "@components/global/LinkTo";
import LineMapChart from "./components/GoogleAnalyticsChart";
import GeoChart from "./components/GoogleAnalyticsChart/GeoChart";
import BarChart from "./components/GoogleAnalyticsChart/BarChart";
import SessionTable from "./components/GoogleAnalyticsChart/SessionsTable";
import ViewTable from "./components/GoogleAnalyticsChart/ViewsTable";
import tootltip from "../../../constants/tooltip";
import StackedBarChart from "./components/GoogleAnalyticsChart/CohortGraph";
import CohortGraph from "./components/GoogleAnalyticsChart/CohortGraph";
import ActivityOverTime from "@components/Analytics/ActivityOverTime";
import { IoIosArrowDown } from "react-icons/io";
import AnalyticDataRange from "./components/AnalyticDateRange/Index";
import moment from "moment";

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

class BrandDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			demographicsInformation: {},
			dateRangeToggle : false,
			start_date:moment().subtract("days", 28).format("YYYY-MM-DD"),
			end_date:moment().subtract("days", 1).format("YYYY-MM-DD"),
		};
	}

	componentDidMount() {
		const { handlePlatform, clearFilters, fetchBrandDashboardInformation } =
			this.props;
		const {start_date, end_date} = this.state;

		handlePlatform("instagram");
		clearFilters();
		this.props.fetchTopInfluencersAnalyzed();
		this.props.fetchGoogleAnalyticsUser({start_date, end_date});
		this.props.fetchGoogleAnalyticsActivity({start_date, end_date});
		fetchBrandDashboardInformation();
		//this.demographicsInformation();
	}

	demographicsInformation = async () => {
		const json = await Influencify.demographicsInformation();
		if (json !== undefined) {
			if (json.status === 200) {
				this.setState({ demographicsInformation: json && json.data });
			}
		}
	};

	onDateChange = (item) => {
		this.setState({
			start_date:moment(item.startDate).format("YYYY-MM-DD"),
			end_date:moment(item.endDate).format("YYYY-MM-DD")
		}, () => {
			const {start_date, end_date} = this.state;
			this.props.fetchGoogleAnalyticsUser({start_date, end_date});
			this.props.fetchGoogleAnalyticsActivity({start_date, end_date});
		});
	}

	render() {
		const { brandDashboardInformation, reports, activity } = this.props;
		const {start_date, end_date} = this.state;
		const url = window.location.href;
		// if (!localStorage.getItem("isLogin")) {
		// 	return <Navigate to="/brand/login" />;
		// }
		// if (localStorage.getItem("role") !== "brand") {
		// 	window.location.href = "/";
		// }
		// if (this.props.isPlanSubscribed === false) {
		// 	this.props.history.replace("/billing");
		// }
		
		return (
			<div>
				{this.props.isLoading &&
				<Loader
					className="h-[87vh] w-full flex justify-center items-center"
					size="67"
				/>
				}
				<Helmet>
					<meta charSet="utf-8" />
					<title>Dashboard | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="containers pt-3 sm:!pt-12 mb-4 sm:!pb-12">
					<div className="pt-0 md:!pt-12">
						<div className="mb-2">
							<h3 className="flex items-center text-[22px] black font-bold">
								<img src={GetStarted} alt="started" className="mr-2 h-[24px]" />
								GET STARTED
							</h3>
						</div>
						<div className="flex flex-wrap">
							<div className="xl:w-2/12 lg:w-4/12 md:w-6/12 w-full flex items-stretch md:pr-6">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-6 p-6 w-full text-center">
									<h4 className="text-[20px] font-medium">Influencers </h4>
									<p className="text-[11px] darkGray font-medium">DISCOVERED</p>
									<h4 className="mt-4 text-[20px] font-medium">
										{formatedNumber(this.props.influencer_discovered)}
									</h4>
								</div>
							</div>
							<div className="xl:w-2/12 lg:w-4/12 md:w-6/12 w-full flex items-stretch md:pr-6">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-6 p-6 w-full text-center">
									<h4 className="text-[20px] font-medium">Influential</h4>
									<p className="text-[11px] darkGray font-medium">On Youtube</p>

									<LinkTo
										to="/influencial/youtube"
										className={`bg-white text-[#7c3292]
											 px-6 rounded-full h-[30px] text-[12px] inline-flex items-center  border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4`}
										text={"Discover"}
									/>
								</div>
							</div>
							<div className="xl:w-2/12 lg:w-4/12 md:w-6/12 w-full flex items-stretch md:pr-6">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-6 p-6 w-full text-center">
									<h4 className="text-[20px] font-medium">Influential</h4>
									<p className="text-[11px] darkGray font-medium">On Tiktok</p>
									<LinkTo
										to="/influencial/tiktok"
										className={`btn  bg-white text-[#7c3292]
											 px-6 rounded-full h-[30px] text-[12px] inline-flex items-center  border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4`}
										text={"Discover"}
									/>
								</div>
							</div>
							<div className="lg:w-4/12 w-full xl:pr-0 md:pr-6">
								<ConnectType
									brandDashboardInformation={brandDashboardInformation}
								/>
							</div>
						</div>
					</div>
					{/* {brandDashboardInformation &&
						brandDashboardInformation.instagram_connected && (
							<>
								<div>
									<Overview
										brandDashboardInformation={brandDashboardInformation}
									/>
								</div>

								<div>
									<PostMentions />
								</div>
								<div className="mt-12">
									<StoriesMentions />
								</div>
								{this.state.demographicsInformation &&
									Object.keys(this.state.demographicsInformation).length >
									0 && (
										<div className="my-12">
											<div className="grid grid-cols-12 gap-5">
												<div className="xl:col-span-8 col-span-12">
													<div className="grid grid-cols-12 gap-5 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 m-0 h-full">
														<div className="xl:col-span-5 col-span-12">
															<AudienceGender
																data={this.state.demographicsInformation}
															/>
														</div>
														<div className="xl:col-span-7 col-span-12">
															<AudienceAge
																data={this.state.demographicsInformation}
															/>
														</div>
													</div>
												</div>
												<div className="xl:col-span-4 col-span-12">
													<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3">
														<div className="flex items-center justify-between">
															<div>
																<h4 className="black text-[17px] font-medium">
																	Top countries
																</h4>
																<p className="darkGray text-[11px]">
																	The selected period does not apply to this
																	chart.
																</p>
															</div>
														</div>
														<div className="mt-12">
															<WorldMapChart
																data={this.state.demographicsInformation}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
							</>
						)} */}
					{reports?.reports?.length > 0 &&
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-10 pb-20">

							<div className="mb-2 flex justify-between">
								<h3 className="flex items-center text-[22px] black font-bold">
									Reports snapshot
								</h3>
								<div className="relative">
									<button className="flex items-center text-white rounded bg-gray-500 hover:bg-gray-400 px-2 py-1" onClick={()=> {this.setState({dateRangeToggle:!this.state.dateRangeToggle})}}>
										{start_date} - {end_date} <IoIosArrowDown size={17} color="white" />
									</button>
									{
										this.state.dateRangeToggle && <div className='absolute top-10 right-0 z-10 border shadow-lg'><AnalyticDataRange startDate={start_date} endDate={end_date} onDateChange={this.onDateChange} /></div>
									}
								</div>
							</div>

							<div className="mt-12">


								<div className="grid grid-cols-12 gap-5">
									{reports?.reports?.[0]?.rows &&
									<div className="border xl:col-span-6 col-span-12 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
										<LineMapChart data={reports?.reports?.[0]} />
									</div>
									}
									{reports?.reports?.[1]?.rows &&

									<div className="border xl:col-span-6 col-span-12 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
										<p className="black text-[17px] font-medium p-3">Users by Country</p>
										<div className="grid grid-cols-12 gap-5">
											<GeoChart
												data={reports?.reports?.[1]}
											/>
										</div>
									</div>
									}
								</div>

							</div>

							<div className="mt-20">

								<div className="grid grid-cols-12 gap-5">

								{reports?.reports?.[4]?.rows &&
									<div className="xl:col-span-3 col-span-12 ">
										<p className="text-slate-400 mb-2">WHICH PAGES AND SCREENS GET THE MOST VIEWS?</p>
										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium p-3">Views by Page title and screen class</p>
											<ViewTable data={reports?.reports?.[4]} title1={'PAGE TITLE AND SCREEN CLASS'} title2='VIEWS' tootltip1={tootltip.page_title} tootltip2={tootltip.views} />
										</div>

									</div>
								}

								{reports?.reports?.[2]?.rows &&

									<div className="xl:col-span-3 col-span-12 ">
										<p className="text-slate-400 mb-2">WHAT ARE YOUR TOP EVENTS?</p>
										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium p-3">Event count by Event name</p>
											<ViewTable
												data={activity?.data?.reports?.[2]} title1={'EVENT NAME'} title2='EVENT COUNT' tootltip1={tootltip.event} tootltip2={tootltip.event_count}
											/>
										</div>
									</div>
								}
								{activity?.data?.reports?.[1]?.rows &&

									<div className="xl:col-span-6 col-span-12 ">
										<p className="text-slate-400 mb-2">HOW WELL DO YOU RETAIN YOUR USERS?</p>
										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium px-3 pt-3">User activity by cohort</p>
											<p className="mb-2 darkGray text-[14px] px-3">
												Based on device data only
											</p>
											<CohortGraph data={activity} />
										</div>
									</div>
								}


								</div>
							</div>

							<div className="mt-20">
								<div className="grid grid-cols-12 gap-5">

									{reports?.reports?.[2]?.rows &&
									<div className="xl:col-span-3 col-span-12 ">
										<p className="text-slate-400 mb-2">WHERE DO YOUR NEW USERS COME FROM?</p>
										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium p-3">New Users by Channel groups</p>
											<BarChart data={reports?.reports?.[2]} />
										</div>

									</div>
									}

									{reports?.reports?.[3]?.rows &&

									<div className="xl:col-span-3 col-span-12 ">
										<p className="text-slate-400 mb-2">WHAT ARE YOUR TOP CAMPAIGNS?</p>
										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium p-3">Sessions by Channel groups</p>
											<SessionTable
												data={reports?.reports?.[3]}
											/>
										</div>

									</div>
									}

									{activity?.data?.reports?.[0]?.rows &&

									<div className="xl:col-span-6 col-span-12 ">
										<p className="text-slate-400 mb-2 ">HOW ARE ACTIVE USERS TRENDING?</p>

										<div className="border shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full">
											<p className="black text-[17px] font-medium p-3">User activity over time</p>
											<ActivityOverTime />
										</div>

									</div>
									}


								</div>
							</div>
						</div>
					}

					<div className="mt-12">
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-6">
							<div className="px-[1rem] pt-3 pb-12">
								<h6 className="mb-2 text-[16px] font-medium black">
									Learn more about influencer marketing{" "}
								</h6>
								<p className="mb-6 darkGray text-[14px]">
									Boost your mindset with an expert advice, and earn extra
									credits after finishing the course
								</p>
								<InfluencerMarketing />
							</div>
						</div>
					</div>
					<div className="mt-12">
						<h3 className="flex items-baseline black mb-6 text-[22px] font-bold">
							<img
								src={PopularSearch}
								alt="Popular Searches"
								className="mr-2 h-[26px]"
							/>
							Popular Searches
						</h3>
						<PopularSearches navigate={this.props.navigate} />
					</div>
					<div className="mt-12 md:pt-12">
						<h3 className="flex items-center mb-6 black text-[22px] font-bold">
							<img
								src={TopCountry}
								alt="Top Countries"
								className="mr-2 h-[24px]"
							/>
							Top Countries
						</h3>
						<Topsearches navigate={this.props.navigate} />
					</div>
					<div className="mt-12 top-influencers">
						<h3 className="flex items-center mb-6 black text-[22px] font-bold">
							<img
								src={TopInfluencer}
								alt="Top Influencers Analyzed"
								className="mr-2 h-[24px]"
							/>
							Top Influencers Analyzed
						</h3>
						{this.props.topinfluencersAnalyzed &&
							this.props.topinfluencersAnalyzed.length ? (
							<Topinfluencers />
						) : (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						)}
					</div>
					
				</div>
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isLoading: state.BrandDashboardReducer.isLoading,
		influencer_discovered: state.BrandDashboardReducer.influencer_discovered,
		reports: state.BrandDashboardReducer.reports,
		activity: state.BrandDashboardReducer.activity,
		topinfluencersAnalyzed: state.BrandDashboardReducer.topinfluencersAnalyzed,
		brandDashboardInformation: state.influencerSearch.brandDashboardInformation,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		clearFilters: () => {
			actions.clearFilters(dispatch);
		},
		fetchTopInfluencersAnalyzed: () =>
			dispatch(brandDashboardActions.fetchTopInfluencersAnalyzed()),
		fetchGoogleAnalyticsUser: (params) =>
			dispatch(brandDashboardActions.fetchGoogleAnalyticsUser(params)),
		fetchGoogleAnalyticsActivity: (params) =>
			dispatch(brandDashboardActions.fetchGoogleAnalyticsActivity(params)),
		fetchBrandDashboardInformation: () =>
			actions.fetchBrandDashboardInformation(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandDashboard);
