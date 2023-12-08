import { Component } from "react";
import { FaPlay } from "react-icons/fa";
import avatar from "@assets/gaming_in_the_usa.jpg";
import SocialListIcons from "../../../../../constants/SocialListIcons";
import DOMPurify from "dompurify";
import "./styles.css";
import Anchor from "@components/global/Anchor";

const FormatedNumber = (num) => {
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

class ItemCard extends Component {
	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	render() {
		const { item } = this.props;
		return (
			<div className="lg:col-span-4 sm:col-span-6 col-span-12 mb-4">
				<div className="w-full shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white h-full">
					<div className="border-b-0 flex flex-col h-full relative bg-white border-[1px] border-[#00000020] rounded-[8px]">
						<div className="px-[1rem] pt-3 pb-0">
							<div className="flex items-center max-h-[40px]">
								{!process.env.NODE_ENV ||
								process.env.NODE_ENV === "development" ? (
									<img
										src={item && item.logo_url ? item.logo_url : avatar}
										className="rounded-full object-cover overflow-hidden w-[40px] h-[40px]"
										alt={item.name}
									/>
								) : (
									<img
										src={
											item && item.cdn_logo_url
												? process.env.REACT_APP_AWS_URl + item.cdn_logo_url
												: avatar
										}
										className="rounded-full object-cover overflow-hidden w-[40px] h-[40px]"
										alt={item.name}
									/>
								)}

								<div className="media-body ml-4">
									{item && item.name ? (
										<h6 className="mt-0 mb-1 text-[#424040] text-[16px] font-bold">
											{item.name}
										</h6>
									) : (
										""
									)}
									{SocialListIcons(item.platform, 14)}
								</div>
								{!!item.advertiser_id && item.platform === "tiktok" && (
									<p className="darkGray text-[14px] mb-4">
										Advertiser ID: {item.advertiser_id}
									</p>
								)}
								<div className="hidden w-[14px]"></div>
							</div>
							<div className="mt-2 ">
								<div className="flex h-[19px]">
									{item && item.message ? (
										<p
											className="truncate"
											dangerouslySetInnerHTML={this.createMarkup(item.message)}
										></p>
									) : (
										""
									)}
								</div>
							</div>
						</div>

						<div
							onClick={() => this.props.pause(item.id)}
							className="flex items-center justify-center"
						>
							<video
								className="h-[300px] w-full object-cover"
								id={`play-${item.id}`}
								preload="metadata"
								controls={false}
								autoplay={false}
								name="media"
							>
								{!process.env.NODE_ENV ||
								process.env.NODE_ENV === "development" ? (
									<source src={item.video_url} type="video/mp4" />
								) : (
									<source
										src={process.env.REACT_APP_AWS_URl + item.cdn_media_url}
										type="video/mp4"
									/>
								)}
							</video>
							<div
								onClick={() => this.props.play(item.id)}
								id={`button-${item.id}`}
								className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
							>
								<FaPlay className="text-[30px] text-white" />
							</div>
							{/* </a> */}
						</div>

						<div className="px-[1rem] pb-3 pt-0 flex grow flex-col justify-between h-full">
							<div className="mt-6">
								{item && item.title && (
									<Anchor
										target="_blank"
										rel="noopener noreferrer"
										href={item.store_url}
										text={
											<p className="darkGray text-[14px] mb-4">{item.title}</p>
										}
									/>
								)}
							</div>
							<div className="mt-auto h-[1px] w-full bg-[#0000001f]" />
							<div className="flex w-full mt-4 text-center">
								{item.platform !== "instagram" &&
									item.platform !== "youtube" && (
										<>
											<div className="grow">
												{item && item.like_count && (
													<div>
														<b>{FormatedNumber(item.like_count)}</b>
													</div>
												)}
												<p className="darkGray">Likes</p>
											</div>

											<div className="grow">
												{item && item.comment_count && (
													<div>
														<b>{FormatedNumber(item.comment_count)}</b>
													</div>
												)}
												<p className="darkGray">Comments</p>
											</div>
										</>
									)}
								{item.platform === "youtube" && (
									<div className="grow">
										{item && item.view_count && (
											<div>
												<b>{FormatedNumber(item.view_count)}</b>
											</div>
										)}
										<p className="darkGray">Views</p>
									</div>
								)}

								{item.platform === "instagram" && (
									<div className="grow">
										{item && item.impression && (
											<div>
												<b>{FormatedNumber(item.impression)}</b>
											</div>
										)}
										<p className="darkGray">Impressions</p>
									</div>
								)}

								<div className="grow">
									{item && item.share_count && (
										<div>
											<b>{FormatedNumber(item.share_count)}</b>
										</div>
									)}
									<p className="darkGray">Share</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ItemCard;
