import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { MdChatBubble, MdScreenShare, MdVisibility } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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

export default function Posts() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	const platform = useSelector(
		(state) => state.influencerSearch.requestPlatform
	);

	const onMouseEnter = (e) => {
		const el = document.getElementById(e);
		const popular = document.getElementById("influencer-post-popular");
		const sponsored = document.getElementById("influencer-post-sponsored");
		popular.classList.add("hidden");
		popular.classList.remove("flex");
		sponsored.classList.add("hidden");
		sponsored.classList.remove("flex");
		el.classList.remove("hidden");
		el.classList.add("flex");

		document
			.getElementById("influencer-post-popular-text")
			.classList.remove("font-bold");
		document
			.getElementById("influencer-post-sponsored-text")
			.classList.remove("font-bold");
		document.getElementById(e + "-text").classList.add("font-bold");
	};

	return (
		<div className="mt-4">
			<div className="bg-white rounded-[8px] shadow-none p-0 Bio-network-content mb-0">
				<p>
					<b>Posts</b>
				</p>
				<div className="flex flex-row items-center mt-2 mb-4">
					<p
						id="influencer-post-popular-text"
						className="ml-2 font-bold"
						type="button"
						onMouseEnter={() => onMouseEnter("influencer-post-popular")}
					>
						Popular
					</p>
					<p
						id="influencer-post-sponsored-text"
						className="ml-2"
						type="button"
						onMouseEnter={() => onMouseEnter("influencer-post-sponsored")}
					>
						Sponsored
					</p>
				</div>
				<div>
					<div id="influencer-post-popular" className="grid grid-cols-12 gap-5">
						{current_influencer.instagramFeeds &&
						current_influencer.instagramFeeds.length ? (
							current_influencer.instagramFeeds.map((instaStory, index) => (
								<div
									className="md:col-span-4 sm:col-span-6 col-span-12"
									key={index}
								>
									{instaStory.media_type === "VIDEO" ? (
										<div className="group mb-4 group flex flex-col relative border-[1px] border-[#0000002d]">
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
																<FormatedNumber num={instaStory.like_count} />
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
										<div className="flex flex-col relative border-[1px] border-[#0000002d] group mb-6 mt-6 sm:!mb-0 group">
											<div className="bg-[#5b34afb3] inset-0 absolute z-1 opacity-0 transition-all duration-[0.4s] group-hover:opacity-1"></div>
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
											<div className="grow group-hover:top-0 p-3 absolute text-center w-full h-full top-[-100%] left=0 right-0 z-1 flex justify-between flex-col">
												<div>
													<p className="text-white text-[1rem]">
														{instaStory.caption}
													</p>
												</div>
												<div>
													{platform && platform === "instagram" && (
														<div className="flex flex-col">
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<FaHeart className="text-white text-[1rem]" />
																	<p className="ml-2 text-white text-[1rem]">
																		<FormatedNumber
																			num={instaStory.like_count}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdChatBubble className="text-white text-[1rem]" />
																	<p className="ml-2 text-white text-[1rem]">
																		<FormatedNumber
																			num={instaStory.comments_count}
																		/>
																	</p>
																</div>
															</div>
														</div>
													)}
													{platform && platform === "youtube" && (
														<div className="flex flex-col">
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<FiChevronUp />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.like_count}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<FiChevronDown />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.dislike_count}
																		/>
																	</p>
																</div>
															</div>
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<MdVisibility />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.video_views}
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
													)}
													{platform && platform === "tiktok" && (
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
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<MdVisibility />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.video_views}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdScreenShare />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.share_count}
																		/>
																	</p>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
											<div className="bg-[#00000008] border-t border-[#0000002d] p-0">
												{platform && platform === "instagram" && (
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px] text-center">
															<div className="flex">
																<FaHeart className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber num={instaStory.like_count} />
																</p>
															</div>
															<div className="flex">
																<MdChatBubble className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.comments_count}
																	/>
																</p>
															</div>
														</div>
													</div>
												)}
												{platform && platform === "youtube" && (
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
															<div className="flex">
																<FiChevronUp className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber num={instaStory.like_count} />
																</p>
															</div>
															<div className="flex">
																<FiChevronDown className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.dislike_count}
																	/>
																</p>
															</div>
														</div>
														<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
															<div className="flex">
																<MdVisibility className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.video_views}
																	/>
																</p>
															</div>
															<div className="flex">
																<MdChatBubble className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.comments_count}
																	/>
																</p>
															</div>
														</div>
													</div>
												)}
												{platform && platform === "tiktok" && (
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
															<div className="flex">
																<FaHeart className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber num={instaStory.like_count} />
																</p>
															</div>
															<div className="flex">
																<MdChatBubble className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.comments_count}
																	/>
																</p>
															</div>
														</div>
														<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
															<div className="flex">
																<MdVisibility className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.video_views}
																	/>
																</p>
															</div>
															<div className="flex">
																<MdScreenShare className="text-[#f188ab]" />
																<p className="ml-2">
																	<FormatedNumber
																		num={instaStory.share_count}
																	/>
																</p>
															</div>
														</div>
													</div>
												)}
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
					<div id="influencer-post-sponsored" className="flex-wrap hidden">
						{/** sponsored */}
						{current_influencer.instagram_commercial &&
						current_influencer.instagram_commercial.length ? (
							current_influencer.instagram_commercial.map(
								(instaStory, index) => (
									<div
										className="md:col-span-4 sm:col-span-6 col-span-12"
										key={index}
									>
										{instaStory.media_type === "VIDEO" ? (
											<div className="flex flex-col relative border-[1px] border-[#0000002d] group mb-6 mt-6 sm:!mb-0 group">
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
												<div className="bg-[#00000008] border-t border-[#0000002d] p-0">
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px] text-center">
															<div className="heartIcon">
																<FaHeart />
																<p>
																	<FormatedNumber num={instaStory.like_count} />
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
											<div className="flex flex-col relative border-[1px] border-[#0000002d] group mb-6 mt-6 sm:!mb-0 group">
												<div className="bg-[#5b34afb3] inset-0 absolute z-1 opacity-0 transition-all duration-[0.4s] group-hover:opacity-1"></div>
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
												<div className="grow group-hover:top-0 p-3 absolute text-center w-full h-full top-[-100%] left=0 right-0 z-1 flex justify-between flex-col">
													<div>
														<p className="text-white text-[1rem]">
															{instaStory.caption}
														</p>
													</div>
													<div>
														{platform && platform === "instagram" && (
															<div className="flex flex-col">
																<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																	<div className="flex">
																		<FaHeart className="text-white text-[1rem]" />
																		<p className="ml-2 text-white text-[1rem]">
																			<FormatedNumber
																				num={instaStory.like_count}
																			/>
																		</p>
																	</div>
																	<div className="flex">
																		<MdChatBubble className="text-white text-[1rem]" />
																		<p className="ml-2 text-white text-[1rem]">
																			<FormatedNumber
																				num={instaStory.comments_count}
																			/>
																		</p>
																	</div>
																</div>
															</div>
														)}
														{platform && platform === "youtube" && (
															<div className="flex flex-col">
																<div className="flex justify-between px-[16px] py-[8px] text-center">
																	<div className="flex">
																		<FiChevronUp />
																		<p className="ml-2">
																			<FormatedNumber
																				num={instaStory.like_count}
																			/>
																		</p>
																	</div>
																	<div className="flex">
																		<FiChevronDown />
																		<p className="ml-2">
																			<FormatedNumber
																				num={instaStory.dislike_count}
																			/>
																		</p>
																	</div>
																</div>
																<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																	<div className="flex">
																		<MdVisibility />
																		<p className="ml-2">
																			<FormatedNumber
																				num={instaStory.video_views}
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
														)}
														{platform && platform === "tiktok" && (
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
																<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																	<div className="flex">
																		<MdVisibility />
																		<p className="ml-2">
																			<FormatedNumber
																				num={instaStory.video_views}
																			/>
																		</p>
																	</div>
																	<div className="flex">
																		<MdScreenShare />
																		<p className="ml-2">
																			<FormatedNumber
																				num={instaStory.share_count}
																			/>
																		</p>
																	</div>
																</div>
															</div>
														)}
													</div>
												</div>
												<div className="bg-[#00000008] border-t border-[#0000002d] p-0">
													{platform && platform === "instagram" && (
														<div className="flex flex-col">
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<FaHeart className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.like_count}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdChatBubble className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.comments_count}
																		/>
																	</p>
																</div>
															</div>
														</div>
													)}
													{platform && platform === "youtube" && (
														<div className="flex flex-col">
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<FiChevronUp className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.like_count}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<FiChevronDown className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.dislike_count}
																		/>
																	</p>
																</div>
															</div>
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<MdVisibility className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.video_views}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdChatBubble className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.comments_count}
																		/>
																	</p>
																</div>
															</div>
														</div>
													)}
													{platform && platform === "tiktok" && (
														<div className="flex flex-col">
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<FaHeart className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.like_count}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdChatBubble className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.comments_count}
																		/>
																	</p>
																</div>
															</div>
															<div className="flex justify-between px-[16px] py-[8px] text-center pt-1 pb-1">
																<div className="flex">
																	<MdVisibility className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.video_views}
																		/>
																	</p>
																</div>
																<div className="flex">
																	<MdScreenShare className="text-[#f188ab]" />
																	<p className="ml-2">
																		<FormatedNumber
																			num={instaStory.share_count}
																		/>
																	</p>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
										)}
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
	);
}
