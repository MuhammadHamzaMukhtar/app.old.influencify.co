import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
// import "../../../../assets/css/userprofile.css";
import avatar from "@assets/avatar.png";
import icon1 from "@assets/icon1.png";
import icon2 from "@assets/icon2.png";
import icon3 from "@assets/icon3.png";
import icon4 from "@assets/icon4.png";
import TikTokStats from "./TikTokRechartsComponents/TikTokStats";
import TikTokAverageInteractionsData from "./TikTokRechartsComponents/TikTokAverageInteractionsData";
import TikTokAudienceAges from "./TikTokRechartsComponents/TikTokAudienceAges";
import TikTokAudienceGender from "./TikTokRechartsComponents/TikTokAudienceGender";
import TikTokAudienceTopCountries from "./TikTokRechartsComponents/TikTokAudienceTopCountries";
import TikTokAudienceTopCities from "./TikTokRechartsComponents/TikTokAudienceTopCities";
import TikTokAudienceInterests from "./TikTokRechartsComponents/TikTokAudienceInterests";
import TikTokVideosGrid from "./TikTokVideosGrid";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import * as influencerProfileActions from "@store/actions/InfluencerProfileActions";
class TikTokProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	handleClose = () => {
		this.setState({
			show: false,
		});
	};

	handleShow = () => {
		this.setState({
			show: true,
		});
	};

	render() {
		const avgInteractions =
			this.props.tikTokProfile.average_likes +
			this.props.tikTokProfile.average_comments;
		const earnedMedia = avgInteractions * 0.19;

		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<div className="user-profile-page" id="user-profile-page">
				<div className="containers relative mt-12">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-wrapper mt-2">
						<div className="">
							<div className="grid grid-cols-12 gap-5">
								<div className="relative my-auto lg:col-span-4 col-span-12">
									<div className="grid grid-cols-12 gap-5 text-center">
										<div className="sm:col-span-3 col-span-12">
											<div className="p-[0.35em_0.65em] bg-[#198754] rounded-[8px]">
												Verified
											</div>
										</div>
										<div className="sm:col-span-6 col-span-12">
											<img
												src={
													this.props.tikTokProfile
														? this.props.tikTokProfile.profile_picture_url
														: avatar
												}
												alt={this.props.tikTokProfile.full_name}
												className="w-[152px] rounded-full"
											/>
										</div>
										<div className="sm:col-span-3 col-span-12">
											<Link to="#">
												<div className="p-[0.35em_0.65em] bg-[#6c757d] rounded-[8px]">
													{this.props.inflType}
												</div>
											</Link>
										</div>
									</div>
									<h3 className="text-center mt-6 mb-4">
										{this.props.tikTokProfile.full_name}
									</h3>

									<div className="text-center mt-4">
										<Link className="pink" to="#">
											{this.props.tikTokProfile.description}
										</Link>
									</div>
									<div className="text-center mt-4">
										{this.props.inflCategories.length
											? this.props.inflCategories.map((category, index) => (
													<span className="category-ribbon">
														<Link className="text-white" to="#">
															{category.label}
														</Link>
													</span>
											  ))
											: ""}
									</div>
									<div className="mt-6 text-center">
										<div className="multi-buttons text-center inline-flex">
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={
													"https://www.tiktok.com/@" +
													this.props.tikTokProfile.tiktok_id
												}
											>
												<button
													style={{ fontSize: "18px" }}
													type="button"
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-4"
												>
													Follow
												</button>
											</a>

											<button
												type="button"
												onClick={this.handleShow}
												className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-4"
											>
												Contact
											</button>
										</div>
									</div>
									<div className="bg-[#0000001f] h-[1px] w-full" />
								</div>
								<div className="lg:col-span-4 md:col-span-6 col-span-12 my-auto">
									<div className="mt-12 xl:!mt-0 pt-12 pt-xl-0">
										<h4 className=" text-[20px]">TIKTOK STATS</h4>
										<div className="text-center mt-6">
											<TikTokStats />
										</div>
										<div className="bg-[#0000001f] h-[1px] w-full hidden sm:!block" />
									</div>
								</div>
								<div className="lg:col-span-4 md:col-span-6 col-span-12 my-auto">
									<div className="mt-12 xl:!mt-0 pt-12 pt-xl-0">
										<h4 className=" text-[20px]">AVERAGE INTERACTIONS DATA</h4>
										<div className="text-center mt-6">
											<TikTokAverageInteractionsData />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-12 md:!mt-6">
						<div className="grid grid-cols-12 gap-5">
							<div className="md:col-span-3 sm:col-span-6 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
									<img src={icon1} alt="followers" width="40" />
									<h4 className="mt-2 text-[20px]">
										{this.props.tikTokProfile.followers}
									</h4>
									<p>Followers</p>
								</div>
							</div>
							<div className="md:col-span-3 sm:col-span-6 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
									<img src={icon2} alt="engagement" width="40" />
									<h4 className="mt-2 text-[20px]">
										{this.props.tikTokProfile.average_engagement_rate}%
									</h4>
									<p>Engagement</p>
								</div>
							</div>
							<div className="md:col-span-3 sm:col-span-6 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
									<img src={icon3} alt="media" width="40" />
									<h4 className="mt-2 text-[20px]">${earnedMedia}</h4>
									<p>Earned Media</p>
								</div>
							</div>
							<div className="md:col-span-3 sm:col-span-6 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
									<img src={icon4} alt="interactions" width="40" />
									<h4 className="mt-2 text-[20px]">{avgInteractions}</h4>
									<p>Avg. Interactions</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-12 md:!mt-6">
						<TikTokVideosGrid />
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-7 col-span-12 mt-12 md:!mt-6">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
								<div className="p-4">
									<h4 className=" text-[20px]">AUDIENCE AGES</h4>
								</div>
								<div className="bg-[#0000001f] h-[1px] w-full" />
								{this.props.audienceAgeGenderValue.length ? (
									<div className="p-3">
										<TikTokAudienceAges />
									</div>
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
						<div className="md:col-span-5 col-span-12 mt-12 md:!mt-6">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
								<div className="p-4">
									<h4 className=" text-[20px]">AUDIENCE GENDER</h4>
								</div>
								<div className="bg-[#0000001f] h-[1px] w-full" />
								{this.props.audienceGenderPercentage.length ? (
									<div className="p-3">
										<TikTokAudienceGender />
									</div>
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-12 mt-12 md:!mt-6">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
								<div className="p-4">
									<h4 className=" text-[20px]">AUDIENCE TOP COUNTIRES</h4>
								</div>
								<div className="bg-[#0000001f] h-[1px] w-full" />
								{this.props.audienceTopCountries.length ? (
									<div className="p-3">
										<TikTokAudienceTopCountries />
									</div>
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-6 col-span-12 mt-12 md:!mt-6">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
								<div className="p-4">
									<h4 className=" text-[20px]">AUDIENCE TOP CITIES</h4>
								</div>
								<div className="bg-[#0000001f] h-[1px] w-full" />
								<div className="p-3">
									<TikTokAudienceTopCities />
								</div>
							</div>
						</div>
						<div className="md:col-span-6 col-span-12 mt-12 md:!mt-6">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
								<div className="p-4">
									<h4 className=" text-[20px]">AUDIENCE TOP INTERESTS</h4>
								</div>
								<div className="bg-[#0000001f] h-[1px] w-full" />
								<div className="p-3">
									<TikTokAudienceInterests />
								</div>
							</div>
						</div>
					</div>
				</div>

				<Transition appear show={this.state.show} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h4 className=" text-[20px]">Email Address</h4>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<a href={"mailto:" + this.props.influencerEmail}>
											{this.props.influencerEmail}
										</a>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencerProfileReducer.isLoading,
		tikTokProfile: state.InfluencerProfileReducer.tikTokProfile,
		inflName: state.InfluencerProfileReducer.inflName,
		influencerEmail: state.InfluencerProfileReducer.influencerEmail,
		inflBio: state.InfluencerProfileReducer.inflBio,
		inflUserName: state.InfluencerProfileReducer.inflUserName,
		inflType: state.InfluencerProfileReducer.inflType,
		inflFollowersCount: state.InfluencerProfileReducer.inflFollowersCount,
		inflCategories: state.InfluencerProfileReducer.inflCategories,
		instaLink: state.InfluencerProfileReducer.instaLink,
		fbLink: state.InfluencerProfileReducer.fbLink,
		linknedLink: state.InfluencerProfileReducer.linknedLink,
		twitterLink: state.InfluencerProfileReducer.twitterLink,
		pinterestLink: state.InfluencerProfileReducer.pinterestLink,
		webLink: state.InfluencerProfileReducer.webLink,
		userProfile: state.InfluencerProfileReducer.userProfile,
		instagramFeeds: state.InfluencerProfileReducer.instagramFeeds,
		engagementRate: state.InfluencerProfileReducer.engagementRate,
		avgInteractions: state.InfluencerProfileReducer.avgInteractions,
		earnedMedia: state.InfluencerProfileReducer.earnedMedia,
		audienceAgeGenderValue:
			state.InfluencerProfileReducer.audienceAgeGenderValue,
		audienceGenderPercentage:
			state.InfluencerProfileReducer.audienceGenderPercentage,
		audienceTopCountries: state.InfluencerProfileReducer.audienceTopCountries,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		refreshInfluencerProfile: () =>
			dispatch(influencerProfileActions.refreshInfluencerProfile()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TikTokProfile);
