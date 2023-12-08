import { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import Anchor from "@components/global/Anchor";

class ContentAcceptedTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			show: false,
		};
	}

	setModalShow = (event) => {
		this.setState({
			modalShow: event,
		});
	};

	handleClose = () => {
		this.setState({
			show: false,
		});
	};

	render() {
		return (
			<div>
				<div className="grid grid-cols-12 gap-5 pb-12">
					{this.props.acceptedCampaignContents.length ? (
						this.props.acceptedCampaignContents.map((content, index) => (
							<div
								key={index}
								className="md:col-span-4 sm:col-span-6 col-span-12"
							>
								<div className="flex items-center">
									<img
										src={
											content.campaignInfluencerInfo.profile_picture_url
												? content.campaignInfluencerInfo.profile_picture_url
												: avatar
										}
										alt={content.campaignInfluencerInfo.infl_name}
										className="overflow-hidden rounded-full w-[52px] h-[52px]"
									/>
									<div className="ml-4">
										<h4 className="text-[16px] font-medium black">
											{content.campaignInfluencerInfo.infl_name}
										</h4>
										<span className="font-normal text-[12px] darkGray">
											{content.campaign.typeName}
										</span>
									</div>
								</div>
								<div className="mb-6 mt-4 storyCard shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] relative flex-col">
									<div className="w-full h-full relative border-0 rounded-[8px]">
										{content.instagramFeed ? (
											<div>
												{content.instagramFeed.media_type === "VIDEO" ? (
													<video
														controls
														autoPlay
														className="h-[300px] w-full"
														src={content.instagramFeed.media_url}
													></video>
												) : (
													""
												)}

												{content.instagramFeed.media_type === "IMAGE" ||
													content.instagramFeed.media_type === "photo" ||
													content.instagramFeed.media_type ===
													"CAROUSEL_ALBUM" ? (
													<Anchor
														href={content.instagramFeed.permalink}
														target="_blank"
														rel="noopener noreferrer"
														prefix={
															<img
																className="object-cover rounded-t-[8px] h-[300px] w-full"
																src={
																	content.instagramFeed.media_url
																		? content.instagramFeed.media_url
																		: ""
																}
																alt={content.campaignInfluencerInfo.infl_name}
															/>
														}
													/>
												) : (
													""
												)}
												{!content.instagramFeed.media_type ? (
													<Anchor
														href={content.instagramFeed.permalink}
														target="_blank"
														rel="noopener noreferrer"
														prefix={
															<img
																className="object-cover rounded-t-[8px] h-[300px] w-full"
																src={
																	content.instagramFeed.media_url
																		? content.instagramFeed.media_url
																		: ""
																}
																alt={content.campaignInfluencerInfo.infl_name}
															/>
														}
													/>
												) : (
													""
												)}
											</div>
										) : (
											content.contentStoryPath &&
											<img
												className="object-cover rounded-t-[8px] h-[300px] w-full"
												src={
													content.contentStoryPath
														? content.contentStoryPath
														: ""
												}
												alt={content.campaignInfluencerInfo.infl_name}
											/>
										)}
										{/* <p className="cardTopBadge">
											{content.contentType}
										</p> */}
									</div>
									<div className="pt-3 pb-1 px-[1.25rem] [&_iframe]:!w-full">
										{content.tiktok_post_id && (
											<div
												dangerouslySetInnerHTML={{
													__html: content.tiktok_content,
												}}
											></div>
										)}
										{content.youtube_post_id && (
											<div
												dangerouslySetInnerHTML={{
													__html: content.youtube_content,
												}}
											></div>
										)}
									</div>
									<div className="pt-3 pb-1 px-[1.25rem]"></div>
									<div className="bg-white border-0 pt-0 px-[0.75rem] pb-[1.25rem]">
										<div className="text-center bg-white border-0 flex items-center justify-between">
											{content.youtube_post_id && content.youtubeFeed && content.campaign.platformName === 'youtube' &&
												<>
													<div className="grow">
														<h6 className=" text-[16px]">{content.youtubeFeed &&
															content.youtubeFeed.views_count >= 0
															? content.youtubeFeed.views_count
															: '-'}</h6>
														<span className="font-normal">Views</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.youtubeFeed &&
																content.youtubeFeed.likes_count >= 0
																? content.youtubeFeed.likes_count
																: '-'}
														</h6>
														<span className="font-normal">Likes</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.youtubeFeed &&
																content.youtubeFeed.comments_count >= 0
																? content.youtubeFeed.comments_count
																: '-'}
														</h6>
														<span className="font-normal">Comments</span>
													</div>
												</>
											}
											{content.tiktok_post_id && content.tiktokFeed && content.campaign.platformName === 'tiktok' &&
												<>
													<div className="grow">
														<h6 className=" text-[16px]">{content.tiktokFeed &&
															content.tiktokFeed.views_count >= 0
															? content.tiktokFeed.views_count
															: '-'}</h6>
														<span className="font-normal">Views</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.tiktokFeed &&
																content.tiktokFeed.likes_count >= 0
																? content.tiktokFeed.likes_count
																: '-'}
														</h6>
														<span className="font-normal">Likes</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.tiktokFeed &&
																content.tiktokFeed.comments_count >= 0
																? content.tiktokFeed.comments_count
																: '-'}
														</h6>
														<span className="font-normal">Comments</span>
													</div>
												</>
											}
											{content.instagramFeed && content.campaign.platformName === 'instagram' &&
												<>
													<div className="grow">
														<h6 className=" text-[16px]">{content.instagramFeed &&
															content.instagramFeed.video_views >= 0
															? content.instagramFeed.video_views
															: '-'}</h6>
														<span className="font-normal">Views</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.instagramFeed &&
																content.instagramFeed.like_count >= 0
																? content.instagramFeed.like_count
																: '-'}
														</h6>
														<span className="font-normal">Likes</span>
													</div>
													<div className="grow">
														<h6 className=" text-[16px]">
															{content.instagramFeed &&
																content.instagramFeed.comments_count >= 0
																? content.instagramFeed.comments_count
																: '-'}
														</h6>
														<span className="font-normal">Comments</span>
													</div>
												</>
											}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		acceptedCampaignContents:
			state.BrandBookingCampaignReducer.acceptedCampaignContents,
	};
};

export default connect(mapStateToProps, null)(ContentAcceptedTab);
