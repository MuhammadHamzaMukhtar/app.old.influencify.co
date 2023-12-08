import { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import {
	FaPaperclip,
	FaPaperPlane,
	FaSyncAlt,
	FaDownload,
} from "react-icons/fa";
import AlwaysScrollToBottom from "@components/AlwaysScrollToBottom";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import Tooltip from "@components/global/Tooltip";
import axios from "axios";
import Loader from "@components/global/Loader";

class InfluencerBookingMessageTab extends Component {
	isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};

	messageSend = (e) => {
		if (!this.isEmptyOrSpaces(this.props.chatMessage)) {
			let query = {
				message: this.props.chatMessage,
				campaignId: this.props.campaignID,
			};
			if (e.key === "Enter") {
				this.props.influencerSendMessage(query);
			}
	
			this.props.influencerSendMessage(query);
		}
	};

	_handleKeyDown = (e) => {
		if (e.keyCode === 13 && !this.isEmptyOrSpaces(this.props.chatMessage)) {
			let query = {
				message: this.props.chatMessage,
				campaignId: this.props.campaignID,
			};
			this.props.influencerSendMessage(query);
		}
	};

	fileUploadHandler = (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignID);
		formData.append("attachment", file);
		this.props.handleUploadFile(formData);
	};

	refreshChat = () => {
		this.props.influencerBookingCampaignMessages(this.props.campaignID);
	};

	fileDownload = (path, attachmentName) => {
		var download = require("js-file-download");
		axios({
			url: path,
			method: "GET",
			responseType: "blob",
		}).then((response) => {
			download(response.data, attachmentName);
		});
	};

	render() {
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[46vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div className="campaigns-page">
				<div className="w-[90%] mx-auto mb-12">
					<div id="frame" className="h-[76vh] w-full bg-[#e6eaea]">
						<div className="w-full h-full overflow-hidden relative bg-white rounded-[0_5px_5px_0]">
							<div className="h-[60px] leading-[60px] bg-[#f5f5f5] w-full">
								<div className="flex justify-end items-center h-full">
									<Tooltip
										trigger={<FaSyncAlt onClick={() => this.refreshChat()} />}
										tooltipText="Refresh"
										placement="top-left"
									/>
								</div>
							</div>
							<div className="overflow-y-auto overflow-x-hidden h-auto max-h-[calc(100%-125px)] grid">
								{this.props.influencerBookingMessages?.length > 0 ? (
									this.props.influencerBookingMessages.map((chat, index) => (
										<ul
											className="clearfix pl-0 list-unstyled mb-2"
											key={index}
										>
											{chat.flag === 2 ? (
												<li className="sent clear-both m-[10px_15px_0_15px] w-[calc(100%-25px)] text-[0.9em] flex">
													<img
														src={
															chat.brand && chat.brand.avatar
																? chat.brand.avatar
																: avatar
														}
														alt={chat.attachmentName}
														className="m-[6px_8px_0_0] float-right w-[25px] h-[25px] rounded-full "
													/>
													{chat.isAttachement === 1 ? (
														<div className="bg-[#435f7a] success max-w-[300px] inline-block p-[10px_15px] rounded-[20px]">
															<a
																href={chat.attachmentPath}
																target="_blank"
																rel="noreferrer noopener"
																className="flex items-center"
															>
																{chat.attachmentName} - {chat.attachmentSize}
																<FaDownload
																	onClick={() =>
																		this.fileDownload(
																			chat.attachmentPath,
																			chat.attachmentName
																		)
																	}
																	className="ml-4"
																/>
															</a>
														</div>
													) : (
														<p className="bg-[#f5f5f5] float-right max-w-[300px] inline-block rounded-[20px] leading-[130%] p-[10px_15px]">
															{chat.message}
														</p>
													)}
												</li>
											) : chat.flag === 1 ? (
												<li className="replies clear-both m-[10px_15px_0_15px] w-[calc(100%-25px)] text-[0.9em] flex justify-end">
													{chat.isAttachement === 1 ? (
														<a
															href={chat.attachmentPath}
															target="_blank"
															rel="noreferrer noopener"
															className="bg-[#f5f5f5] float-right max-w-[300px] inline-block rounded-[20px] leading-[130%] p-[10px_15px]"
														>
															<FaDownload
																onClick={() =>
																	this.fileDownload(
																		chat.attachmentPath,
																		chat.attachmentName
																	)
																}
																className="mr-4"
															/>
															{chat.attachmentName} - {chat.attachmentSize}
														</a>
													) : (
														<p className="bg-[#f5f5f5] float-right max-w-[300px] inline-block rounded-[20px] leading-[130%] p-[10px_15px]">
															{chat.message}
														</p>
													)}
													<img
														src={
															chat.infleuncer.infleuncer.basicInfo &&
																chat.infleuncer.infleuncer.basicInfo.profile_picture_url
																? chat.infleuncer.infleuncer.basicInfo.profile_picture_url
																: avatar
														}
														alt={chat.attachmentName}
														className="m-[6px_0_0_8px] float-right w-[25px] h-[25px] rounded-full "
													/>
												</li>
											) : (
												""
											)}
											<AlwaysScrollToBottom />
										</ul>
									))
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
							<div className="absolute bottom-0 w-full z-[99] p-[10px] bg-[#ccc]">
								<div className="relative flex">
									<input
										type="text"
										onKeyDown={(e) => this._handleKeyDown(e)}
										name="chatMessage"
										value={this.props.chatMessage}
										onChange={(e) => this.props.handleChange(e)}
										className="float-left border-0 outline-0 w-[calc(100%-90px)] p-[11px_32px_10px_8px] text-[11pt] text-[#32465a] bg-[#ccc]"
										placeholder="Write your message..."
									/>
									<span className="h-[40px] w-[40px] flex items-center justify-center ">
										<label htmlFor="file-input">
											<FaPaperclip className="mt-[5px] text-[1.1em] text-[#000] cursor-pointer opacity-50" />
										</label>
										<input
											id="file-input"
											type="file"
											className="hidden"
											onChange={(e) => this.fileUploadHandler(e)}
										/>
									</span>
									<button
										disabled={!this.props.chatMessage}
										onClick={(e) => this.messageSend(e)}
										className="bg-[#7c3292] w-[50px] border-0 float-right text-[#f5f5f5] rounded-[5px] p-[12px_0] flex items-center justify-center"
									>
										{this.props.isLoadingMessage ? (
											<Loader
												className="flex justify-center items-center"
												size="18"
												color="text-white"
											/>
										) : (
											<FaPaperPlane />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		isLoadingMessage: state.InfluencersBookingIDReducer.isLoadingMessage,
		chatMessage: state.InfluencersBookingIDReducer.chatMessage,
		influencerBookingMessages:
			state.InfluencersBookingIDReducer.influencerBookingMessages,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		influencerSendMessage: (query) =>
			dispatch(influencersBookingIDActions.influencerSendMessage(query)),
		influencerBookingCampaignMessages: (id) =>
			dispatch(
				influencersBookingIDActions.influencerBookingCampaignMessages(id)
			),
		handleUploadFile: (query) =>
			dispatch(influencersBookingIDActions.handleUploadFile(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingMessageTab);
