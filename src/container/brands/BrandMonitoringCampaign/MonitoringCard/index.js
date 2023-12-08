import { Component } from "react";
import "./styles.css";
import avatar from "@assets/bg_grey.png";
import Analytics from "@assets/total_views.png";
import Devices from "@assets/total_posts.png";
import Like from "@assets/total_likes.png";
import User from "@assets/users.png";
import Loader from "@components/global/Loader";
import moment from "moment";
import Emitter from "../../../../constants/Emitter";
import LinkTo from "@components/global/LinkTo";

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
class Monitoringcard extends Component {
	permissionDenied = () => {
		if (!this.props.refreshData.is_admin) {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	render() {
		const { fetchCompaigns, isLoading, refreshData } = this.props;
		return (
			<div className="relative h-50 ">
				<div className="list-container my-12">
					{isLoading ? (
						<Loader
							className="h-[50vh] w-full flex justify-center items-center"
							size="67"
						/>
					) : (
						<>
							{fetchCompaigns && fetchCompaigns.length ? (
								fetchCompaigns.map((campaign, key) => (
									<div
										className="grid md:grid-cols-12 grid-cols-1 flex-wrap gap-5 items-center shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4"
										key={key}
									>
										<div className="xl:col-span-5 md:col-span-6 w-full mb-4 md:!mb-0">
											<div className="flex flex-wrap items-center gap-y-5 gap-x-4 h-full">
												<div className="text-center md:w-auto w-full">
													<LinkTo
														to={
															refreshData && refreshData.is_admin
																? `/brand/monitoring/campaign/detail/${campaign.id}`
																: "#"
														}
														onClick={this.permissionDenied}
														text={
															<img
																src={avatar}
																alt={campaign.campaign_name}
																className="w-[95px] h-[95px] rounded-full md:mx-0 mx-auto"
															/>
														}
													/>
												</div>
												<div className="md:text-left text-center md:w-auto w-full">
													<LinkTo
														to={
															refreshData && refreshData.is_admin
																? `/brand/monitoring/campaign/detail/${campaign.id}`
																: "#"
														}
														onClick={this.permissionDenied}
														text={
															<h5 className="mt-0 font-medium black hover:success mb-4 text-[17px]">
																{campaign.campaign_name}
															</h5>
														}
													/>

													<div className="flex flex-wrap md:justify-start justify-center mb-1">
														<p className="font-medium black text-[12px]">
															Start Date:
														</p>
														<div className="flex flex-wrap ml-1 text-[12px] ">
															<p className="mr-2 hover:underline cursor-pointer font-normal text-[12px] text-[#616161]">
																{moment(campaign.start_date).format(
																	"MMMM Do YYYY"
																)}
															</p>
														</div>
													</div>
													{campaign && campaign.tags && campaign.tags && (
														<div className="flex flex-wrap md:justify-start justify-center mb-1">
															<p className="font-medium black text-[12px]">
																Tags
															</p>
															<div className="inline-flex flex-wrap ml-1 text-[12px]">
																{campaign &&
																	campaign.tags &&
																	campaign.tags.map((data) => (
																		<p className="mr-2 font-normal text-[12px] text-[#616161]">
																			@{data}
																			{""}
																		</p>
																	))}
															</div>
														</div>
													)}
													{campaign &&
														campaign.user_stories &&
														campaign.user_stories && (
															<div className="flex flex-wrap md:justify-start justify-center mb-1">
																<p className="font-medium black text-[12px]">
																	Stories
																</p>
																<div className="inline-flex flex-wrap ml-1 text-[12px]">
																	{campaign &&
																		campaign.user_stories &&
																		campaign.user_stories.map((data) => (
																			<p className="mr-2 font-normal text-[12px] text-[#616161]">
																				@{data}
																				{""}
																			</p>
																		))}
																</div>
															</div>
														)}
												</div>
											</div>
										</div>

										<div className="xl:col-span-7 md:col-span-6 w-full mb-6 md:!mb-0">
											<div className="grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 md:gap-2 gap-5 items-center mb-4 mx-0">
												<div className="text-center px-1">
													<div className="flex justify-center">
														<img
															src={Devices}
															alt="influencer"
															className="h-40px"
														/>
														<p className="pl-1 dark text-[16px] font-medium">
															{campaign.content_counts
																? abbreviateNumber(
																		campaign.content_counts.total_posts
																  )
																: 0}
														</p>
													</div>

													<div className="border-[1px] border-[#cccccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px] mt-4">
														<span className="font-normal text-[12px] text-[#616161]">
															Total Posts
														</span>
													</div>
												</div>
												<div className="text-center px-1">
													<div className="flex justify-center">
														<img src={User} alt="user" className="h-40px" />
														<p className="pl-1 dark text-[16px] font-medium">
															{campaign.content_counts
																? abbreviateNumber(
																		campaign.content_counts.total_users
																  )
																: 0}
														</p>
													</div>
													<div className="border-[1px] border-[#cccccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px] mt-4">
														<span className="font-normal text-[12px] text-[#616161]">
															Users
														</span>
													</div>
												</div>
												<div className="text-center px-1">
													<div className="flex justify-center">
														<img
															src={Analytics}
															alt="Analytics"
															className="h-40px"
														/>
														<p className="pl-1 dark text-[16px] font-medium">
															{campaign.content_counts
																? abbreviateNumber(
																		campaign.content_counts.total_comments
																  )
																: 0}
														</p>
													</div>
													<div className="border-[1px] border-[#cccccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px] mt-4">
														<span className="font-normal text-[12px] text-[#616161]">
															Total Comments
														</span>
													</div>
												</div>
												<div className="text-center px-1">
													<div className="flex justify-center">
														<img src={Like} alt="likes" className="h-40px" />
														<p className="pl-1 dark text-[16px] font-medium">
															{campaign.content_counts
																? abbreviateNumber(
																		campaign.content_counts.total_likes
																  )
																: 0}
														</p>
													</div>
													<div className="border-[1px] border-[#cccccc] h-[36px] flex items-center justify-center relative bg-white rounded-[8px] mt-4">
														<span className="font-normal text-[12px] text-[#616161]">
															Total Likes
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							)}
						</>
					)}
				</div>
			</div>
		);
	}
}

export default Monitoringcard;
