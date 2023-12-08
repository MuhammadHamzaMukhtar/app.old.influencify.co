import React from "react";
import { Tab } from "@headlessui/react";
import { connect } from "react-redux";
import { BsInstagram } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
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

class InstagramPostsGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageFlag: false,
		};
		this.addDefaultSrc = this.addDefaultSrc.bind(this);
	}

	addDefaultSrc(ev) {
		ev.target.src = "";
		ev.target.style = "padding: 8px;";
	}

	render() {
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
							<BsInstagram className="block m-auto " />
							Instagram
						</Tab>
					</Tab.List>
					<div className="containers">
						<Tab.Panels className="bg-transparent">
							<Tab.Panel>
								<div className="p-4 pt-0">
									<p>
										<b>Top posts</b>
									</p>
									<div className="grid grid-cols-12 gap-5">
										{this.props.instagramFeeds.length ? (
											this.props.instagramFeeds.map((instaStory, index) => (
												<div
													key={index}
													className="md:col-span-4 sm:col-span-6 col-span-12"
												>
													{instaStory.media_type === "VIDEO" ? (
														<div className="PostedGrid mb-6 mt-6 sm:!mb-0 flex flex-col relative border-[1px] border-[#0000002d] PostedGridContainer">
															<a
																href={instaStory.permalink}
																target="_blank"
																rel="noopener noreferrer"
																className="card-link"
															>
																{instaStory.media_type === "VIDEO" ? (
																	<iframe
																		title={instaStory.caption}
																		width="100%"
																		height="275"
																		src={instaStory.media_url}
																		frameBorder="0"
																		allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
																		allowFullScreen
																	></iframe>
																) : (
																	<img
																		alt={instaStory.caption}
																		src={
																			instaStory.media_url !== 0
																				? instaStory.media_url
																				: ""
																		}
																	/>
																)}
															</a>
															<div className="p-0 bg-[#00000008] border-t border-[#0000002d]">
																<div className="flex flex-col">
																	<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																		<div className="heartIcon">
																			<FaHeart />
																			<p>
																				<FormatedNumber
																					num={instaStory.like_count}
																				/>
																			</p>
																		</div>
																		<div className="chatIcon">
																			<MdChatBubble />
																			<p>
																				<FormatedNumber
																					num={instaStory.comments_count}
																				/>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													) : (
														<div className="PostedGrid mb-6 mt-6 sm:!mb-0 flex flex-col relative border-[1px] border-[#0000002d] PostedGridContainer">
															<div className="content-overlay"></div>
															<a
																href={instaStory.permalink}
																target="_blank"
																rel="noopener noreferrer"
																className="card-link"
															>
																{instaStory.media_type === "VIDEO" ? (
																	<iframe
																		title={instaStory.caption}
																		width="100%"
																		height="275"
																		src={instaStory.media_url}
																		frameBorder="0"
																		allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
																		allowFullScreen
																	></iframe>
																) : (
																	<img
																		alt={instaStory.caption}
																		src={
																			instaStory.media_url !== 0
																				? instaStory.media_url
																				: DummyUser
																		}
																	/>
																)}
															</a>
															<div className="p-3 grow PostedGridOverlay">
																<div className="PostedGridContent">
																	<p>{instaStory.caption}</p>
																</div>
																<div className="PostedGridContent">
																	<div className="flex flex-col">
																		<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																			<div className="flex">
																				<FaHeart />
																				<p className="ml-2">
																					<FormatedNumber
																						num={instaStory.like_count}
																					/>
																				</p>
																			</div>
																			<div className="flex">
																				<MdChatBubble />
																				<p className="ml-2">
																					<FormatedNumber
																						num={instaStory.comments_count}
																					/>
																				</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="p-0 bg-[#00000008] border-t border-[#0000002d]">
																<div className="flex flex-col">
																	<div className="flex justify-between px-[16px] py-[8px] text-center">
																		<div className="heartIcon">
																			<FaHeart />
																			<p>
																				<FormatedNumber
																					num={instaStory.like_count}
																				/>
																			</p>
																		</div>
																		<div className="chatIcon">
																			<MdChatBubble />
																			<p>
																				<FormatedNumber
																					num={instaStory.comments_count}
																				/>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													)}
												</div>
											))
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
		inflUserName: state.ViewInfluencerProfileReducer.inflUserName,
		inflBio: state.ViewInfluencerProfileReducer.inflBio,
		inflWebsite: state.ViewInfluencerProfileReducer.inflWebsite,
		inflLocation: state.ViewInfluencerProfileReducer.inflLocation,
		postStartPrice: state.ViewInfluencerProfileReducer.postStartPrice,
		instagramFeeds: state.ViewInfluencerProfileReducer.instagramFeeds,
	};
};

export default connect(mapStateToProps, null)(InstagramPostsGrid);
