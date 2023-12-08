import { Component } from "react";
import InfluencerPercircleChart from "./InfluencerPercircleChart";
import PostsPercircleChart from "./PostsPercircleChart";
import ReachPercircleChart from "./ReachPercircleChart";
import ExpandedTables from "./ExpandedTables";
import EngagementPercircleChart from "./EngagementPercircleChart";
import { connect } from "react-redux";
// import Influencify from "../../../../../constants/Influencify";
// import ConversionsTable from "./ConversionsTable";
import Loader from "@components/global/Loader";
// import { GoDotFill } from "react-icons/go";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

class BrandBookingCampaignOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// analytics: {},
			contentType: "Performance",
			checked: false,
		};
		this.companyChange = this.companyChange.bind(this);
	}

	// async componentDidUpdate(prevProps) {
	// 	if (this.props.campaign !== prevProps.campaign) {
	// 		if (this.props.campaign && this.props.campaign.id) {
	// 			const json = await Influencify.campaignAnalytics({
	// 				campaign_id: this.props.campaign.id,
	// 			});
	// 			if (json.status === 200) {
	// 				this.setState({ analytics: json.data?.[0] });
	// 			}
	// 		}
	// 	}
	// }

	exportOverviewPdf = () => {
		//alert(this.props.campaign.id)
	};

	handleContentType = (newAlignment) => {
		this.setState({
			contentType: newAlignment,
		});
	};

	companyChange(checked) {
		this.setState({ checked });
		if (checked === true) {
			this.setState({
				contentType: "Conversions",
			});
		} else {
			this.setState({
				contentType: "Performance",
			});
		}
	}

	render() {
		const { contentType } = this.state;
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[50vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div className="w-full">
				<div className="mb-2 grid grid-cols-2 gap-5">
					<div className="flex items-center">
						<h3 className="text-[20px] font-medium">
							{this.props.campaign.campaignPayment &&
								this.props.campaign.campaignPayment?.spentBudget
								? this.props.campaign.campaignPayment?.spentBudget.toFixed(2)
								: 0}
						</h3>
						<h6 className="pl-1 text-[16px]">
							{this.props.campaign.currency_code}
						</h6>
						<span className="pl-1 font-normal">Spent</span>
					</div>
					<div className="flex items-center justify-end">
						<span className="pl-1 font-normal">Planned budget in</span>
						<h6 className="pl-1 text-[16px]">
							{this.props.campaign.currency_code}
						</h6>
						<h3 className="pl-1 text-[20px] font-medium">
							{this.props.campaign.campaignPayment &&
								this.props.campaign.campaignPayment?.totalBudget
								? this.props.campaign.campaignPayment?.totalBudget.toFixed(2)
								: 0}
						</h3>
					</div>
				</div>
				<div className="bg-[#e9ecef] h-[2.7rem] rounded-[8px] overflow-hidden leading-[0px]">
					<div
						className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[1.45rem] bg-[#28a745]`}
						style={{
							width: `${(this.props.campaign.campaignPayment?.spentPercentage || 0)}%`,
						}}
					>
						{(this.props.campaign.campaignPayment?.spentPercentage || 0).toFixed(2)}%
					</div>
				</div>

				<div className="mt-12">
					<div className="mb-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
						<div className="flex flex-col">
							<h4 className="mb-2 text-center text-[16px] font-medium h-9">
								Influencers
							</h4>
							<div className="h-full p-3 rounded-[8px] bg-white">
								<div className="text-center mb-4">
									<h4 className="text-[20px]">
										{this.props.influencersGraph?.influencers}
									</h4>
								</div>
								<div className="px-12">
									<InfluencerPercircleChart
										influencerPercentage={
											this.props.influencersGraph?.influencerPercentage
										}
									/>
								</div>
								<div className="text-center mt-4">
									<span className="darkGray font-medium">
										{this.props.influencersGraph?.influencerWaiting} more waiting
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<h4 className="mb-2 text-center text-[16px] font-medium h-9">
								Open rate
							</h4>
							<div className="h-full p-3 rounded-[8px] bg-white">
								<div className="text-center mb-4">
									<h4 className=" text-[20px]">{this.props.read_count}</h4>
								</div>
								<div className="px-12">
									<InfluencerPercircleChart
										influencerPercentage={this.props.invitation_open_rate}
									/>
								</div>
								<div className="text-center mt-4">
									<span className="darkGray font-medium">
										{this.props.read_count} opened over {this.props.sent_count}{" "}
										invited
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<h4 className="mb-2 text-center text-[16px] font-medium h-9">
								Tasks
							</h4>
							<div className="h-full p-3 rounded-[8px] bg-white">
								<div className="text-center mb-4">
									<h4 className=" text-[20px]">
										{this.props.postsGraph?.posts}
									</h4>
								</div>
								<div className="px-12">
									<PostsPercircleChart
										postPercentage={this.props.postsGraph?.postPercentage}
									/>
								</div>
								<div className="text-center mt-4">
									<span className="darkGray font-medium">
										{this.props.postsGraph?.postToCome} more to come
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<h4 className="mb-2 text-center text-[16px] font-medium h-9">
								Total reach
							</h4>
							<div className="h-full p-3 rounded-[8px] bg-white">
								<div className="text-center mb-4">
									<h4 className=" text-[20px]">
										{this.props.reachGraph?.totalReach}
									</h4>
								</div>
								<div className="px-12">
									<ReachPercircleChart
										reachPercentage={this.props.reachGraph?.reachPercentage}
									/>
								</div>
								<div className="text-center mt-4">
									<span className="darkGray font-medium">
										{this.props.reachGraph?.estimatedReach} estimated
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<h4 className="mb-2 text-center text-[16px] font-medium h-9">
								Engagement
							</h4>
							<div className="h-full p-3 rounded-[8px] bg-white">
								<div className="text-center mb-4">
									<h4 className=" text-[20px]">
										{this.props.engagementGraph?.totalEngagement}
									</h4>
								</div>
								<div className="px-12">
									<EngagementPercircleChart
										engagementPercentage={this.props.engagementGraph?.engagementPercentage}
									/>
								</div>
								<div className="text-center mt-4">
									<span className="darkGray font-medium">{this.props.engagementGraph?.estimatedEngagement} estimated</span>
								</div>
							</div>
						</div>
					</div>

					{(this.props.contents || []).length > 0 &&
						<div className="mt-12 pt-12">
							<div className="mb-12">
								<div className="flex items-center">
									<button
										onClick={() => this.handleContentType("Performance")}
										className={`font-semibold text-[14px] text-[#00000061] focus-visible:outline-0 outline-0 border-y border-x border-[#0000001f] border-x-[#0000001f] p-2 bg-transparent white rounded-l-[8px] hover:bg-[#0000000d] ${this.state.contentType === "Performance"
											? "bg-[#0000001f]"
											: ""
											}`}
									>
										Social Performance
									</button>
									{/* <button
									onClick={() => this.handleContentType("Conversions")}
									className={`font-semibold text-[14px] text-[#00000061] focus-visible:outline-0 outline-0 border-y border-x border-[#0000001f] border-x-[#0000001f] p-2 bg-transparent white rounded-r-[8px] hover:bg-[#0000000d] ${
										this.state.contentType === "Conversions"
											? "bg-[#0000001f]"
											: ""
									}`}
								>
									Conversions
								</button> */}
								</div>
							</div>

							{contentType === "Performance" && (
								<>
									{(this.props.contents || []).length > 0 ? (
										<div className="expanded-data-tables">
											<ExpandedTables />
										</div>
									) : (
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
											We have nothing to show you here.
										</div>
									)}
								</>
							)}
							{/* {contentType === "Conversions" &&
							(analytics && analytics.length > 0 ? (
								<div className="expanded-data-tables">
									<ConversionsTable analytics={analytics} />
								</div>
							) : (
								<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							))} */}
						</div>
					}

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		campaign: state.BrandBookingCampaignReducer.campaign,
		influencersGraph: state.BrandBookingCampaignReducer.influencersGraph,
		postsGraph: state.BrandBookingCampaignReducer.postsGraph,
		reachGraph: state.BrandBookingCampaignReducer.reachGraph,
		spendedBudget: state.BrandBookingCampaignReducer.spendedBudget,
		spendedPercentage: state.BrandBookingCampaignReducer.spendedPercentage,
		engagementGraph: state.BrandBookingCampaignReducer.engagementGraph,
		invitation_open_rate: state.BrandBookingCampaignReducer.invitation_open_rate,
		contents: state.BrandBookingCampaignReducer.contents,
		sent_count: state.BrandBookingCampaignReducer.sent_count,
		read_count: state.BrandBookingCampaignReducer.read_count,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandBookingCampaignOverview);
