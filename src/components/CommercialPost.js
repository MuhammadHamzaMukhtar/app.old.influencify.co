import { BsHeartFill } from "react-icons/bs";
import { MdChatBubble, MdVisibility, MdScreenShare } from "react-icons/md";
import { IoMdThumbsUp, IoMdThumbsDown, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import moment from "moment";
import { IoVideocam } from "react-icons/io5";

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

const CommercialPost = ({ data, platform, pagination, setPagination }) => {
	return (
		<div className="grid grid-cols-12 gap-5">
			{/** sponsored */}
			{data && data.length ? (
				data.slice(pagination.min, pagination.max).map((item, index) => (
					<div className="md:col-span-4 sm:col-span-6 col-span-12" key={index}>
						{item.type === "video" ? (
							<div className="flex flex-col relative border-[1px] border-[#0000002d] group mb-6 mt-6 sm:!mb-0 overflow-hidden rounded-[8px]">
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="min-h-[400px] max-h-[400px] h-full"
								>
									<div className="absolute top-5 right-5"><IoVideocam size={30} color="white" /></div>
									{/* <iframe
												title={item.text}
												width="100%"
												height="400px"
												src={item.thumbnail}
												frameBorder="0"
												allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
											></iframe> */}
									<img
										className="h-[400px] object-center object-cover w-full shrink-0 "
										alt={item.text}
										src={item.thumbnail}
									/>
								</a>
								{/* <div className="border-t border-[#0000002d] p-0">
									<div className="flex flex-col">
										<div className="flex justify-between px-[16px] py-[8px] text-center">
											<div className="flex items-center">
												<BsHeartFill className="fill-[#f31854] text-[18px]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.likes)}
												</p>
											</div>
											<div className="flex items-center">
												<MdChatBubble className="fill-[#7e2e8c]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.comments)}
												</p>
											</div>
										</div>
									</div>
								</div> */}
								<div className="border-t border-[#0000002d] p-0">
									<div className="flex flex-col">
										<div className="px-[16px] py-[8px]">
											<div className="flex justify-start text-[12px] text-gray-500 my-2">{moment(item.created).format("MMMM DD, YYYY HH:mm")}</div>
											<div className="mt-2 mb-4 h-[18vh]">
												<p className="text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical' }}>
													{item.text}
												</p>
											</div>
											<div className="flex gap-48 mt-2 mb-4">
												<div>
													<span className="text-gray-500">Likes</span>
													<p className="font-semibold">
														{formatedNumber(item?.stat?.likes)}
													</p>
												</div>
												<div>
													<span className="text-gray-500">Comments</span>
													<p className="font-semibold">
														{formatedNumber(item?.stat?.comments)}
													</p>
												</div>
											</div>
											{/* <div className="flex items-center">
												<BsHeartFill className="fill-[#f31854]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.likes)}
												</p>
											</div>
											<div className="flex items-center">
												<MdChatBubble className="fill-[#7e2e8c]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.comments)}
												</p>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="flex flex-col relative border-[1px] border-[#0000002d] group mb-6 mt-6 sm:!mb-0 overflow-hidden rounded-[8px]">
								{/* <div className="bg-[#5b34afb3] inset-0 absolute z-1 opacity-0 transition-all duration-[0.4s] group-hover:opacity-[1]" /> */}
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="min-h-[400px] max-h-[400px] h-full"
								>
									{item.type === "video" ? (
										<iframe
											title={item.text}
											width="100%"
											height="400px"
											src={item.thumbnail}
											frameBorder="0"
											allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
									) : (
										<img
											className="h-[400px] object-center object-cover w-full shrink-0 "
											alt={item.text}
											src={item.thumbnail}
										/>
									)}
								</a>
								
								<div className="border-t border-[#0000002d] p-0">
									<div className="flex flex-col">
										<div className="px-[16px] py-[8px]">
											<div className="flex justify-start text-[12px] text-gray-500 my-2">{moment(item.created).format("MMMM DD, YYYY HH:mm")}</div>
											<div className="mt-2 mb-4 h-[18vh]">
												<p className="text-ellipsis overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical' }}>
													{item.text}
												</p>
											</div>
											
											{platform && platform === "youtube" &&
												<div className="flex gap-20 mt-2 mb-4">
													<div>
														<span className="text-gray-500">Likes</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.likes)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Dislikes</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.dislikes)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Views</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.views)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Comments</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.comments)}
														</p>
													</div>
												</div>
											}
											{platform && platform === "tiktok" &&
												<div className="flex gap-20 mt-2 mb-4">
													<div>
														<span className="text-gray-500">Likes</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.likes)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Comments</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.comments)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Views</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.views)}
														</p>
													</div>
													<div>
														<span className="text-gray-500">Shares</span>
														<p className="font-semibold">
															{formatedNumber(item?.stat?.shares)}
														</p>
													</div>
												</div>
											}
											{/* <div className="flex items-center">
												<BsHeartFill className="fill-[#f31854]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.likes)}
												</p>
											</div>
											<div className="flex items-center">
												<MdChatBubble className="fill-[#7e2e8c]" />
												<p className="ml-2">
													{formatedNumber(item?.stat?.comments)}
												</p>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				))
			) : (
				<div className="col-span-12 text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
					We have nothing to show you here.
				</div>
			)}
			{data && data.length > 0 &&
				<div className="col-span-12">
					<div className="flex justify-center items-center text-slate-400 font-medium text-lg">
						{pagination.min > 1 &&
							<IoIosArrowBack cursor={'pointer'} size={20} onClick={() => setPagination({ min: pagination.min - 3, max: pagination.min })} />
						}
						<span className="px-3">{pagination.min + 1} - {pagination.max} of {data.length} posts found</span>
						{pagination.max < data.length &&
							<IoIosArrowForward size={20} cursor={'pointer'} onClick={() => setPagination({ min: pagination.max, max: (pagination.max + 3 > data.length ? data.length : pagination.max + 3) })} />
						}
					</div>
				</div>
			}
		</div>
	);
};

export default CommercialPost;
