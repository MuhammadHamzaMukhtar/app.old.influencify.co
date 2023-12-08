import React from "react";
import { Tab } from "@headlessui/react";
import { connect } from "react-redux";
import { IoVideocam } from "react-icons/io5";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class TikTokVideosGrid extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const test =
			"https://www.tiktok.com/@anilpaylagurjar/video/6768051929378475266?refer=embed";
		const helo = test.match(/(\d+)/)[0];
		return (
			<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 Bio-network-content">
				<Tab.Group
					defaultIndex={this.state.activeTab}
					onChange={(index) => {
						this.handleChange(index);
					}}
				>
					<Tab.List className="flex mb-0">
						<Tab
							className={({ selected }) =>
								classNames(
									"!h-[46px] flex items-center !mr-2 mb-2 md:!mb-0 !rounded-[8px] text-[14px] min-w-[180px] text-[#000] hover:text-[#000] justify-center mb-4 md:!mb-0",
									selected ? "bg-[#7c3292] text-white" : "bg-[#f1f3f4]"
								)
							}
						>
							<IoVideocam className="block m-auto " />
							TikTok
						</Tab>
					</Tab.List>
					<div className="containers">
						<Tab.Panels className="bg-transparent">
							<Tab.Panel>
								<div className="p-4 pt-0">
									<p>
										TikTok posts where I promoted the business you see below.
									</p>
									<div className="grid grid-cols-12 gap-5">
										{this.props.tikTokProfile.tiktok_videos ? (
											this.props.tikTokProfile.tiktok_videos.map(
												(tiktokVideo, index) => (
													<div
														key={index}
														className="md:col-span-3 sm:col-span-6 col-span-12"
													>
														<div className="PostedGrid flex flex-col rounded-[8px] bg-white mb-6 mt-6 sm:!mb-0 border-0">
															<a
																href={tiktokVideo}
																target="_blank"
																rel="noopener noreferrer"
																className="card-link"
															>
																<iframe
																	width="100%"
																	height="550"
																	src={
																		"https://www.tiktok.com/embed/" +
																		tiktokVideo.match(/(\d+)/)[0]
																	}
																	frameBorder="0"
																	allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
																	allowFullScreen
																></iframe>
															</a>
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
							</Tab.Panel>
						</Tab.Panels>
					</div>
				</Tab.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tikTokProfile: state.InfluencerProfileReducer.tikTokProfile,
		inflUserName: state.ViewInfluencerProfileReducer.inflUserName,
		inflBio: state.ViewInfluencerProfileReducer.inflBio,
		inflWebsite: state.ViewInfluencerProfileReducer.inflWebsite,
		inflLocation: state.ViewInfluencerProfileReducer.inflLocation,
		postStartPrice: state.ViewInfluencerProfileReducer.postStartPrice,
		instagramFeedsVideos:
			state.ViewInfluencerProfileReducer.instagramFeedsVideos,
	};
};

export default connect(mapStateToProps, null)(TikTokVideosGrid);
