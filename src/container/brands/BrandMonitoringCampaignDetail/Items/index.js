import { Component } from "react";
import moment from "moment";
import bgVector from "@assets/bg_grey.png";
import { BsDownload } from "react-icons/bs";
import Tooltip from "@components/global/Tooltip";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
// import { withRouter } from "react-router";
import ProxyImage from "../../../../constants/ProxyImage";
import ProxyMedia from "../../../../constants/ProxyMedia";
import { MdOutlineMap } from "react-icons/md";
import ImageLoading from "@assets/svgs/img_report_loading.svg";
import Button from "@components/global/Button";
import "./styles.css";

class SponsoredPostsItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: true,
			detail: false,
			checkedUser: [],
			enableDownload: false,
		};
	}
	exportUser = (user) => {
		let userobj = {
			FullName: user.user_full_name,
			username: user.username,
			likes: user.like_count,
			comments: user.comment_count,
			profile_pic: user.user_profile_pic,
			caption: user.caption,
			display_url: user.display_url,
			taken_at: moment.unix(user.taken_at).format("YYYY-MM-DD"),
		};
		this.exportFile(userobj);
	};
	exportFile = (user) => {
		let filename = `export-${new Date().getTime()}.json`;
		let contentType = "application/json;charset=utf-8;";
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			var blob = new Blob(
				[decodeURIComponent(encodeURI(JSON.stringify(user, null, 4)))],
				{ type: contentType }
			);
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			var a = document.createElement("a");
			a.download = filename;
			a.href =
				"data:" +
				contentType +
				"," +
				encodeURIComponent(JSON.stringify(user, null, 4));
			a.target = "_blank";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	userSelect = (user) => {
		let payload = Object.assign({}, this.props.payload);
		let selections = Object.assign([], payload.selections);
		let index = selections.findIndex((i) => i.id === user.id);
		if (index > -1) {
			selections.splice(index, 1);
		} else {
			selections.push(user);
		}
		payload.selections = selections;
		this.props.addPayload(payload);
	};

	downloadCsv = () => {
		this.exportFile(this.props.payload.selections);
	};

	downloadMedia = (item) => {
		let src;
		if (item.media_type === 2) {
			if (document.getElementById("download-play-" + item.id)) {
				document.getElementById("download-play-" + item.id).click();
			}
			if (document.getElementById("download-video-" + item.id)) {
				src = document.getElementById("download-video-" + item.id).src;
			}
		} else {
			src = document.getElementById("download-" + item.id).src;
		}
		if (src) {
			const downloadLink = document.createElement("a");
			downloadLink.href = src;
			downloadLink.target = "_blank";
			if (item.media_type !== 2) {
				downloadLink.download = item.id + ".jpg";
			} else {
				downloadLink.download = item.id;
			}
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
	};

	render() {
		const { detailLoading, monitorPosts, counts, payload } = this.props;
		if (detailLoading) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<>
				<div className="flex items-center">
					<div className="w-full">
						<div className="py-1">
							<div className="flex flex-wrap justify-between mb-4">
								<p className="mb-2 font-bold black text-[28px]">
									Posts (
									{counts ? (counts.total_posts ? counts.total_posts : 0) : 0})
								</p>
								{payload &&
									payload.selections &&
									payload.selections.length > 0 && (
										<div className="bg-transparent rounded-full px-4 py-[0.5rem] cursor-pointer flex items-center">
											<Button
												className="bg-transparent h-[40px] py-0 inline-flex items-center border-[1px] border-[#616161] rounded-full px-10 text-[16px] text-[#616161]"
												onClick={this.downloadCsv}
												text="Download"
											/>
										</div>
									)}
							</div>
							<div className="flex justify-between items-center flex-wrap">
								<div className="flex flex-wrap">
									<div className="flex mr-6 items-center">
										<h6 className="black text-[14px]">Accounts:</h6>
										<p className="ml-2 font-normal black text-[14px]">
											{counts
												? counts.total_users
													? counts.total_users
													: 0
												: 0}
										</p>
									</div>
									<div className="flex mr-6 items-center">
										<h6 className="black text-[14px]">Likes:</h6>
										<p className="ml-2 font-normal black text-[14px]">
											{counts
												? counts.total_likes
													? counts.total_likes
													: 0
												: 0}
										</p>
									</div>
									<div className="flex mr-6 items-center">
										<h6 className="black text-[14px]">Comments:</h6>
										<p className="ml-2 font-normal black text-[14px]">
											{counts
												? counts.total_likes
													? counts.total_comments
													: 0
												: 0}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-12 gap-5 mt-12">
					{monitorPosts && monitorPosts.length ? (
						monitorPosts.map((item, index) => (
							<div
								key={index}
								className="lg:col-span-4 sm:col-span-6 col-span-12 mb-12 flex items-stretch"
							>
								<div className="flex items-start flex-row-reverse w-full">
									<label
										htmlFor="login"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="login"
											type="checkbox"
											//checked={this.props.payload.index}
											onChange={(e) => this.userSelect(item)}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
									</label>
									<div className="bg-white monitoring-compaign flex flex-col grow shadow-[0_4px_4px_#0000001a] rounded-[8px] h-full">
										<div className="p-4">
											<div className="flex items-center">
												{item.user_profile_pic ? (
													<ProxyImage
														addCancelToken={this.props.addCancelToken}
														className="mr-6 w-[45px] h-[45px] rounded-full overflow-hidden"
														url={item.user_profile_pic}
													/>
												) : (
													<img
														className="mr-4 w-[45px] h-[45px] rounded-full overflow-hidden"
														src={bgVector}
														alt="bgVector"
													/>
												)}

												<div className="grow">
													<h6 className="mt-0 mb-1 text-[16px] break-words truncate">
														@{truncate(item.username, 15)}
													</h6>
												</div>
												<div>
													<Tooltip
														trigger={
															<div className="purple cursor-pointer">
																<BsDownload
																	onClick={(e) => this.downloadMedia(item)}
																	size={24}
																/>
															</div>
														}
														tooltipText="Download"
														placement="top-left"
													/>
												</div>
											</div>
										</div>
										<div className="px-4 pb-4 pt-0 border-0 h-full relative flex flex-col bg-white">
											<div className="relative">
												<div className="text-[11px] font-bold h-5 inline-flex items-center">
													{item.location && (
														<>
															<MdOutlineMap /> {item.location}
														</>
													)}
												</div>
												{item.display_url ? (
													<ProxyMedia
														addCancelToken={this.props.addCancelToken}
														className="rounded-[8px] h-[280px] object-cover object-center w-full"
														item={item}
													/>
												) : (
													<img
														className="mr-6 rounded-full w-[45px] h-[45px]"
														src={bgVector}
														alt="bgVector"
													/>
												)}
											</div>
											<div className="p-0 pt-4 flex flex-col grow">
												<div className="text-[11px] gray mb-4 font-medium">
													{moment.unix(item.taken_at).format("YYYY-MM-DD")}
												</div>
												{item.caption && (
													<div className="black font-medium tracking-[1px] break-words mb-6">
														{truncate(item.caption, 30)}
													</div>
												)}
												{item.post_type !== "story" && (
													<div className="flex w-full mt-auto pt-2">
														<div className="grow">
															<div className="gray text-[11px] font-medium">
																Likes
															</div>
															{item.like_count && (
																<div className="text-[11px] font-bold">
																	{item.like_count ? item.like_count : 0}
																</div>
															)}
														</div>
														<div className="grow">
															<div className="gray text-[11px] font-medium">
																Comments
															</div>
															{item.comment_count && (
																<div className="text-[11px] font-bold">
																	{item.comment_count ? item.comment_count : 0}
																</div>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							<div className="flex items-center flex-col justify-center">
								<div className="bg-gray">
									<img src={ImageLoading} alt="loading" className="mx-auto" />
									<h4 className="text-[20px] text-[#343749]">
										Collecting data
									</h4>
									<p className="text-[14px] text-[#282b3c] font-normal">
										You may leave this page and come back later
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		detailLoading: MonitoringCampaign.detailLoading,
		monitorPosts: MonitoringCampaign.campaignMonitorDetail,
		counts: MonitoringCampaign.records,
		payload: MonitoringCampaign.payload,
		form: MonitoringCampaign.form,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
		addSelectedUser: (payload) => {
			actions.addSelectedUser(dispatch, payload);
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SponsoredPostsItems);
function truncate(input, number) {
	if (input && input.length > number) {
		return input.substring(0, number) + "...";
	}
	return input;
}
