import { useRef } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaPlay } from "react-icons/fa";
import TiktokVideoModal from "./TiktokVideoModal";
import { MdChatBubble, MdScreenShare, MdVisibility } from "react-icons/md";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProxyImage from "@components/ProxyImage";
import Loader from "@components/global/Loader";

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

function SampleNextArrow(props) {
	const { className, onClick } = props;
	return (
		<div className={className} onClick={onClick}>
			<FiChevronRight color="#7d2d94" />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, onClick } = props;
	return (
		<div className={className} onClick={onClick}>
			<FiChevronLeft color="#7d2d94" />
		</div>
	);
}

export default function MiniPosts() {
	const contents = useSelector(
		(state) => state.influencerSearch.influencerContentData
	);

	const loader = useSelector(
		(state) => state.influencerSearch.influencerContentLoader
	);

	
	const platform = useSelector(
		(state) => state.influencerSearch.requestPlatform
	);
	const tiktokVideo = useRef();
	const openVideo = (param) => {
		tiktokVideo.current.openPopups(param);
	};
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		responsive: [
			{
				breakpoint: 9000,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	if(loader){
		return <Loader  className="h-full w-full flex justify-center items-center mt-20"
		size="40" 
		/>
	}

	if((contents?.videos_list?.videos || []).length==0 && (contents?.user_feed?.items || []).length==0){
		return null;
	}
	return (
		<div className="mt-4">
			<h5 className="text-[16px] black pb-3">Posts</h5>
			<div
				className="grid lg:grid-cols-2 grid-cols-1 gap-5 relative"
				{...settings}
			>
				
				{(contents?.videos_list?.videos || []).slice(0,6).map((video, index) => (
						<div
							key={index}
							className="shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden"
						>
							<div className="flex flex-col relative rounded-[8px]">
								<a
									href={`https://www.youtube.com/watch?v=${video?.video_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="card-link relative"
								>
	
									<ProxyImage
										url={
											video?.thumbnail}
										alt={video.title}
										className="h-[400px] object-cover object-center w-full rounded-t-[8px]"
										addCancelToken={() => {}}
									/>
									<div
										//onClick={() => openVideo(video?.media_url)}
										className="absolute inset-0 z-full flex justify-center items-center"
									>
										<div className="h-[60px] w-[60px] rounded-full bg-white flex justify-center items-center cursor-pointer shadow-lg">
											<FaPlay size={20} className="purple" />
										</div>
									</div>
								</a>
							</div>
							
							{platform && platform === "youtube" && (
								<div className="flex flex-col">
									{/* <div className="text-center flex justify-between px-[16px] py-[8px] items-center">
										<div className="flex">
											<RiThumbUpFill className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.like_count} />
											</p>
										</div>
										<div className="flex">
											<RiThumbDownFill className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.dislike_count} />
											</p>
										</div>
									</div> */}
									<div className="text-center flex justify-between px-[16px] py-[8px] items-center  border-t border-[#00000020]">
										<div className="flex">
											<MdVisibility className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.views} />
											</p>
										</div>
										{/* <div className="flex">
											<MdChatBubble className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.comments_count} />
											</p>
										</div> */}
									</div>
								</div>
							)}
							{platform && platform === "tiktok" && (
								<div className="flex flex-col">
									<div className="text-center flex justify-between px-[16px] py-[8px] items-center">
										<div className="flex">
											<FaHeart className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.like_count} />
											</p>
										</div>
										<div className="flex">
											<MdChatBubble className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.comments_count} />
											</p>
										</div>
									</div>
									<div className="text-center flex justify-between px-[16px] py-[8px] items-center border-t border-[#00000020]">
										<div className="flex">
											<MdVisibility className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.video_views} />
											</p>
										</div>
										<div className="flex">
											<MdScreenShare className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video.share_count} />
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					))}


					{(contents?.user_feed?.items || []).slice(0,6).map((video, index) => (
						<div
							key={index}
							className="shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden"
						>
							<div className="flex flex-col relative rounded-[8px]">
								<a
									href={`https://www.tiktok.com/@${video?.author?.uniqueId}/video/${video?.video?.id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="card-link relative"
								>
	
									<ProxyImage
										url={
											video?.video?.cover}
										alt={video.title}
										className="h-[400px] object-cover object-center w-full rounded-t-[8px]"
										addCancelToken={() => {}}
									/>
									<div
										//onClick={() => openVideo(video?.media_url)}
										className="absolute inset-0 z-full flex justify-center items-center"
									>
										<div className="h-[60px] w-[60px] rounded-full bg-white flex justify-center items-center cursor-pointer shadow-lg">
											<FaPlay size={20} className="purple" />
										</div>
									</div>
								</a>
							</div>
							
							{platform && platform === "tiktok" && (
								<div className="flex flex-col">
									<div className="text-center flex justify-between px-[16px] py-[8px] items-center">
										<div className="flex">
											<FaHeart className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video?.stats.diggCount} />
											</p>
										</div>
										<div className="flex">
											<MdChatBubble className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video?.stats.commentCount} />
											</p>
										</div>
									</div>
									<div className="text-center flex justify-between px-[16px] py-[8px] items-center border-t border-[#00000020]">
										<div className="flex">
											<MdVisibility className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video?.stats.playCount} />
											</p>
										</div>
										<div className="flex">
											<MdScreenShare className="text-[#f188ab]" size={22} />
											<p className="ml-2">
												<FormatedNumber num={video?.stats.shareCount} />
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					))}


			</div>
			{/* <TiktokVideoModal ref={tiktokVideo} /> */}
		</div>
	);
}
