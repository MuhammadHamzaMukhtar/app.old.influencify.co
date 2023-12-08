import React, { Fragment } from "react";
// import "../../assets/css/userprofile.css";
// import "../../assets/css/Dashboard.css";

import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import avatar from "@assets/avatar.png";
import icon1 from "@assets/followers.png";
import icon2 from "@assets/engagment.png";
import icon3 from "@assets/earned_media.png";
import icon4 from "@assets/credability.png";
import icon5 from "@assets/average_interaction.png";
import icon6 from "@assets/globe.png";
import InstagramStats from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramStats";
import InstagramAverageInteractionsData from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAverageInteractionsData";
import InstagramAudienceAges from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAudienceAges";
import InstagramAudienceGender from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAudienceGender";
import InstagramAudienceTopCountries from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAudienceTopCountries";
import InstagramAudienceTopCities from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAudienceTopCities";
import InstagramAudienceInterests from "@components/InfluencerProfile/Instagram/InstagramRechartsComponents/InstagramAudienceInterests";
import InstagramPostsGrid from "@components/InfluencerProfile/Instagram/InstagramPostsGrid";
import LookalikeProfiles from "@components/InfluencerProfile/Instagram/LookalikeProfiles";
import { connect } from "react-redux";
import { FaSyncAlt } from "react-icons/fa";
import Loader from "@components/global/Loader";
import * as viewInfluencerProfileActions from "@store/actions/ViewInfluencerProfileActions";
import * as setUpCampaignActions from "@store/actions/SetUpCampaignActions";
import LinkTo from "@components/global/LinkTo";
// import { withRouter } from "react-router";

const FormatedNumber = ({ num }) => {
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

class BrandViewInfluencerProfileScreen extends React.Component {
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

	newCampaignWithInvite = () => {
		let query = {
			influencerId: this.props.influencerUniqueId,
		};
		this.props.createCampaignWithInvite(query);
		this.props.onClose();
		// if(this.timeout) clearTimeout(this.timeout);
		// this.timeout = setTimeout(() => {
		//   this.props.history.push('/brand/campaigns/'+this.props.campaignId);
		// }, 1000);
	};

	handleRefreshProfile = () => {
		let query = {
			influencerId: this.props.influencerId,
		};
		this.props.brandRefreshInfluencerProfile(query);
	};

	addDefaultSrc(ev) {
		ev.target.src = avatar;
	}

	render() {
		if (this.props.isLoader) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<div className="user-profile-page" id="user-profile-page">
					<div className="relative">
						{this.props.searchType === false ? (
							<div className="social-media text-right">
								<Tooltip
									trigger={
										<FaSyncAlt
											className="mr-4 mt-2 cursor-pointer"
											onClick={() => this.handleRefreshProfile()}
										/>
									}
									tooltipText="Refresh Profile"
									placement="top-left"
								/>
							</div>
						) : (
							""
						)}
						<div>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-wrapper mt-2">
								<div className="">
									<div className="grid grid-cols-12 gap-5">
										<div className="lg:col-span-4 col-span-12 relative my-auto">
											<div className="grid grid-cols-12 gap-5 text-center">
												<div className="sm:col-span-5 col-span-12">
													{this.props.isVerified ? (
														<div className="p-[0.35em_0.65em] rounded-[8px] text-white bg-[#198754] ml-2">
															Verified
														</div>
													) : (
														<div className="p-[0.35em_0.65em] rounded-[8px] text-white bg-[#6c757d] ml-2">
															Not Verified
														</div>
													)}
												</div>
												<div className="sm:col-span-6 col-span-12">
													<img
														className="rounded-full w-[152px]"
														src={
															this.props.userProfile !== 0
																? this.props.userProfile
																: avatar
														}
														alt={this.props.inflType}
													/>
												</div>
												<div className="sm:col-span-3 col-span-12">
													<LinkTo
														to="#"
														text={
															<div className="p-[0.35em_0.65em] rounded-[8px] text-white bg-[#6c757d] ml-2">
																{this.props.inflType}
															</div>
														}
													/>
												</div>
											</div>
											<h3 className="text-center mt-6 mb-4">
												{this.props.inflName}
											</h3>

											<div className="text-center mt-4">
												<LinkTo
													className="pink"
													to="#"
													text={this.props.inflBio}
												/>
											</div>
											<div className="text-center mt-4">
												{this.props.inflCategories.length ? (
													this.props.inflCategories.map((category, index) => (
														<span key={index} className="category-ribbon">
															<LinkTo
																className="text-white"
																to="#"
																text={category.name}
															/>
														</span>
													))
												) : (
													<div>
														{this.props.isModashUser &&
														this.props.infl_interests &&
														this.props.infl_interests.length
															? this.props.infl_interests
																	.slice(0, 3)
																	.map((interest, index) => (
																		<span
																			key={index}
																			className="category-ribbon"
																		>
																			<LinkTo
																				className="text-white"
																				to="#"
																				text={interest.name}
																			/>
																		</span>
																	))
															: ""}
													</div>
												)}
											</div>
											<div className="mt-6 text-center">
												<div className="multi-buttons  text-center inline-flex">
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={
															"https://www.instagram.com/" +
															this.props.inflUserName
														}
													>
														<button
															type="button"
															className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-4"
														>
															Follow
														</button>
													</a>
													{this.props.campaignFlag === false ? (
														<button
															type="button"
															onClick={() => this.newCampaignWithInvite()}
															className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-4"
														>
															Invite
														</button>
													) : (
														""
													)}
												</div>
											</div>

											<div className="bg-[#0000001f] h-[1px] w-full" />
										</div>
										<div className="lg:col-span-4 md:col-span-6 col-span-12 my-auto">
											<div className="mt-12 xl:!mt-0 pt-12 pt-xl-0">
												<h4 className=" text-[20px]">INSTAGRAM STATS</h4>
												<div className="text-center mt-6">
													<InstagramStats />
												</div>
												<div className="bg-[#0000001f] h-[1px] w-full hidden sm:!block" />
											</div>
										</div>
										<div className="lg:col-span-4 md:col-span-6 col-span-12 my-auto">
											<div className="mt-12 xl:!mt-0 pt-12 pt-xl-0">
												<h4 className=" text-[20px]">
													AVERAGE INTERACTIONS DATA
												</h4>
												<div className="text-center mt-6">
													<InstagramAverageInteractionsData />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-12 md:!mt-6">
								<div className="grid grid-cols-12 gap-5">
									<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
											<img src={icon1} alt="follower" width="40" />
											<h4 className="mt-2 text-[20px]">
												<FormatedNumber num={this.props.inflFollowersCount} />
											</h4>
											<p>Followers</p>
										</div>
									</div>
									<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
											<img src={icon2} alt="engagement" width="40" />
											<h4 className="mt-2 text-[20px]">
												{this.props.engagementRate}%
											</h4>
											<p>Engagement</p>
										</div>
									</div>
									<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
										<Tooltip
											trigger={
												<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
													<img src={icon3} alt="earned" width="40" />
													<h4 className="mt-2 text-[20px]">
														{this.props.earnedMedia}{" "}
														{this.props.currentLoggedUser.currency_code}
													</h4>
													<p>Earned Media</p>
												</div>
											}
											tooltipText="It's a way of measuring the value of content gained
											through influencer marketing activities. it's calculated
											using metrics such as followers count, engagement rate &
											fake followers analysis"
											placement="top-left"
										/>
									</div>
									{this.props.credibility && this.props.credibility > 0 && (
										<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
											<Tooltip
												trigger={
													<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
														<img src={icon4} alt="credibility" width="40" />
														<h4 className="mt-2 text-[20px]">
															{this.props.credibility
																? this.props.credibility + "%"
																: "N/A"}
														</h4>
														<p>Credibility </p>
													</div>
												}
												tooltipText="Does this influencer has real followers? 75% credibility
												is the average, anything below that is a sign of
												doubtful followers base"
												placement="top-left"
											/>
										</div>
									)}
									<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
											<img src={icon5} alt="interactions" width="40" />
											<h4 className="mt-2 text-[20px]">
												{this.props.avgInteractions}
											</h4>
											<p>Avg. Interactions</p>
										</div>
									</div>
									<div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 profile-stats">
											{this.props.country ? (
												<div>
													{this.props.countryCode ? (
														<img
															src={`https://www.countryflags.io/${this.props.countryCode}/flat/64.png`}
															alt="flag"
															width="40"
														/>
													) : (
														""
													)}
													<h4 className="mt-2 text-[20px]">
														{this.props.country}
													</h4>
												</div>
											) : (
												<div>
													{this.props.isModashUser &&
													this.props.modashCountry ? (
														<div>
															{this.props.modashCountry &&
															this.props.modashCountry[1] ? (
																<img
																	src={`https://www.countryflags.io/${this.props.modashCountry[1]}/flat/64.png`}
																	alt="flag"
																	width="40"
																/>
															) : (
																""
															)}
															<h4 className="mt-2 text-[20px]">
																{this.props.modashCountry[0]}
															</h4>
														</div>
													) : (
														<div>
															<img src={icon6} alt="no" width="40" />
															<h4 className="mt-2 text-[20px]">N/A</h4>
														</div>
													)}
												</div>
											)}
											<p>Country</p>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-12 md:!mt-6">
								<InstagramPostsGrid />
							</div>
							<div className="grid grid-cols-12 gap-5">
								<div className="lg:col-span-7 col-span-12 mt-12 md:!mt-6">
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
										<div className="p-4">
											<h4 className=" text-[20px]">AUDIENCE AGES</h4>
										</div>

										<div className="bg-[#0000001f] h-[1px] w-full" />
										<div className="p-3">
											<InstagramAudienceAges />
										</div>
									</div>
								</div>
								<div className="lg:col-span-5 col-span-12 mt-12 md:!mt-6">
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
										<div className="p-4">
											<h4 className=" text-[20px]">AUDIENCE GENDER</h4>
										</div>

										<div className="bg-[#0000001f] h-[1px] w-full" />
										<div className="p-3">
											<InstagramAudienceGender />
										</div>
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
										<div className="p-3">
											<InstagramAudienceTopCountries />
										</div>
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
											<InstagramAudienceTopCities />
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
											<InstagramAudienceInterests />
										</div>
									</div>
								</div>
							</div>
							{this.props.audienceLookalikes &&
							this.props.audienceLookalikes.length ? (
								<div className="containers mb-12">
									<h5 className="mb-6  text-[18px] mt-4">
										Lookalike Profiles
										<Tooltip
											trigger={
												<div className="ml-2">
													<BsQuestionCircle className="dark" size={20} />
												</div>
											}
											tooltipText="These are profiles with similar audience"
											placement="top-left"
										/>
									</h5>
									<LookalikeProfiles />
								</div>
							) : (
								""
							)}
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.InfluencerProfileReducer.isLoading,
		isLoader: state.InfluencerProfileReducer.isLoader,
		inflName: state.InfluencerProfileReducer.inflName,
		influencerEmail: state.InfluencerProfileReducer.influencerEmail,
		influencerUniqueId: state.InfluencerProfileReducer.influencerUniqueId,
		country: state.InfluencerProfileReducer.country,
		countryCode: state.InfluencerProfileReducer.countryCode,
		modashCountry: state.InfluencerProfileReducer.modashCountry,
		isVerified: state.InfluencerProfileReducer.isVerified,
		inflBio: state.InfluencerProfileReducer.inflBio,
		inflUserName: state.InfluencerProfileReducer.inflUserName,
		inflType: state.InfluencerProfileReducer.inflType,
		inflFollowersCount: state.InfluencerProfileReducer.inflFollowersCount,
		credibility: state.InfluencerProfileReducer.credibility,
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
		isModash: state.InfluencerProfileReducer.isModash,
		audienceAgeGenderValue:
			state.InfluencerProfileReducer.audienceAgeGenderValue,
		audienceGenderPercentage:
			state.InfluencerProfileReducer.audienceGenderPercentage,
		audienceTopCountries: state.InfluencerProfileReducer.audienceTopCountries,
		audienceLookalikes: state.InfluencerProfileReducer.audienceLookalikes,
		infl_interests: state.InfluencerProfileReducer.infl_interests,
		isModashUser: state.InfluencerProfileReducer.isModashUser,
		campaignId: state.SetUpNewCampaignReducer.campaignId,
		campaignFlag: state.SetUpNewCampaignReducer.campaignFlag,
		searchType: state.InfluencersHeaderReducer.searchType,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		brandRefreshInfluencerProfile: (query) =>
			dispatch(
				viewInfluencerProfileActions.brandRefreshInfluencerProfile(query)
			),
		createCampaignWithInvite: (query) =>
			dispatch(setUpCampaignActions.createCampaignWithInvite(query, ownProps)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandViewInfluencerProfileScreen);
