import { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import * as influencerHomeActions from "@store/actions/InfluencerHomeActions";
import Loader from "@components/global/Loader";
import LinkTo from "@components/global/LinkTo";
import { RiFlagFill } from "react-icons/ri";
import { Helmet } from "react-helmet";
import moment from "moment";

class InfluencerHome extends Component {
	componentDidMount() {
		this.props.fetchInfluencerDashboardCampaigns();
	}

	render() {
		const url = window.location.href;
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[82vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Dashboard | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="containers pt-3 sm:!pt-12 mb-4 sm:!pb-12">
					<div className="pt-0 md:!pt-12">
						<div className="grid xl:grid-cols-12 gap-5">
							<div className="xl:col-span-1 hidden xl:block text-center">
								<div className="avatar-timeline">
									<img
										alt={this.props.currentLoggedUser.name}
										src={
											this.props.currentLoggedUser.profile_pic
												? this.props.currentLoggedUser.profile_pic
												: avatar
										}
										className="w-[72px] rounded-full relative z-[1]"
									/>
								</div>
							</div>
							<div className="xl:col-span-11 ">
								<div className="relative before:absolute before:h-full before:content-[''] before:w-[2px] before:bg-[#ddd] before:top-[10px] before:left-[-80px] before:z-[0] ">
									<h2 className="text-[25px] font-semibold">
										{this.props.currentLoggedUser.name}
									</h2>
									{this.props.influencerDashboardCampaigns.length ? (
										this.props.influencerDashboardCampaigns.map(
											(campaign, index) => (
												<div
													className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] my-6 p-2 sm:!p-4"
													key={index}
												>
													<div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-5 gap-8">
														<div className="xl:col-span-4 lg:order-1 order-2 lg:col-span-5">
															<div className="flex items-center w-full lg:justify-start justify-center">
																<div className="mr-3">
																	<RiFlagFill size={24} className="success" />
																</div>
																<div>
																	<h4 className=" text-[18px]">
																		Booking requested
																	</h4>
																	<p className="darkGray text-[13px]">
																		{moment(campaign?.campaignDate?.postingFrom).format("DD/MM/YYYY") } -{" "}
																		{moment(campaign?.campaignDate?.postingTo).format("DD/MM/YYYY")}
																	</p>
																</div>
															</div>
														</div>
														<div className="xl:col-span-4 lg:order-2 order-1 lg:col-span-3 my-auto">
															<div className="lg:flex flex-start items-center lg:text-left text-center">
																<img
																	src={
																		campaign?.campaignUserAvatar
																			? campaign.campaignUserAvatar
																			: avatar
																	}
																	alt="avatar"
																	className="w-[40px] h-[40px] rounded-full lg:mr-3 lg:ml-0 mx-auto"
																/>
																<div>
																	<h4 className=" text-[17px]">
																		{campaign.campaignTitle}
																	</h4>
																	<p className="darkGray text-[13px]">
																		{campaign.campaignUserName}
																	</p>
																</div>
															</div>
														</div>
														<div className="lg:col-span-4 order-3 lg:text-right text-center">
															<LinkTo
																to={`/influencer/influencer-booking/${campaign.id}`}
																className="mt-4 sm:!mt-0 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																text="See details"
															/>
														</div>
													</div>
												</div>
											)
										)
									) : (
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
											We have nothing to show you here.
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencerHomeReducer.isLoading,
		influencerDashboardCampaigns:
			state.InfluencerHomeReducer.influencerDashboardCampaigns,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInfluencerDashboardCampaigns: () =>
			dispatch(influencerHomeActions.fetchInfluencerDashboardCampaigns()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerHome);
