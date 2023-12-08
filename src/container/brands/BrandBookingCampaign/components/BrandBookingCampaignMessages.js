import { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import { FaSearch, FaPaperPlane, FaPaperclip } from "react-icons/fa";
import AlwaysScrollToBottom from "@components/AlwaysScrollToBottom";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import { FaSyncAlt, FaDownload } from "react-icons/fa";
import Emitter from "../../../../constants/Emitter";
import axios from "axios";
import Loader from "@components/global/Loader";

class BrandBookingCampaignMessages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infleuncerId: "",
			infleuncerName: "",
			infleuncerImg: "",
			serach_query: "",
		};
	}
	handleChatUserMessages = (id, name) => {
		let query = {
			campaignId: this.props.campaignId,
			userId: id,
		};
		if (this.props.refreshData.is_admin) {
			this.setState({
				infleuncerId: id,
				infleuncerName: name,
			});
			this.props.fetchChatUserMessages(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	refreshChat = () => {
		let query = {
			campaignId: this.props.campaignId,
			userId: this.state.infleuncerId
				? this.state.infleuncerId
				: this.props.bookingCampaignChatUsers?.[0]?.infleuncer?.id,
		};
		this.props.fetchChatUserMessages(query, "default");
	};
	isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};
	searchUser = (e) => {
		this.setState({ serach_query: e.target.value });
	};
	messageSend = () => {
		if (!this.isEmptyOrSpaces(this.props.chatMessage)) {
			let query = {
				message: this.props.chatMessage,
				campaignId: this.props.campaignId,
				userId: this.state.infleuncerId
					? this.state.infleuncerId
					: this.props.bookingCampaignChatUsers?.[0]?.infleuncer?.id,
			};
			if (this.props.refreshData.is_admin) {
				this.props.brandSendMessage(query);
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};
	_handleKeyDown = (e) => {
		if (e.keyCode === 13 && !this.isEmptyOrSpaces(this.props.chatMessage)) {
			let query = {
				message: this.props.chatMessage,
				campaignId: this.props.campaignId,
				userId: this.state.infleuncerId
					? this.state.infleuncerId
					: this.props.bookingCampaignChatUsers?.[0]?.infleuncer?.id,
				default: "false",
			};
			if (this.props.refreshData.is_admin) {
				this.props.brandSendMessage(query);
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};
	fileUploadHandler = (event, id) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignId);
		formData.append(
			"userId",
			this.state.infleuncerId
				? this.state.infleuncerId
				: this.props.bookingCampaignChatUsers?.[0]?.infleuncer?.id,
		);
		formData.append("attachment", file);
		if (this.props.refreshData.is_admin) {
			this.props.handleUploadFile(formData);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	keyPressed(event) {
		if (event.key === "Enter") {
		}
	}
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
		let filteredUser =
			this.state.serach_query === ""
				? this.props.bookingCampaignChatUsers
				: this.props.bookingCampaignChatUsers?.filter((search) =>
					search.infleuncer.displayname
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(
							this.state.serach_query.toLowerCase().replace(/\s+/g, "")
						)
				);

		return (
			<div className="shadow-[0px_4px_5px_#96969640] rounded-[8px]">
				<div className="w-full">
					<div className="w-full h-[76vh] bg-[#e6eaea] grid grid-cols-12">
						<div className="md:col-span-3 col-span-12 bg-[#7c3292e6] h-full relative rounded-l-[8px]">
							<div className="px-[1rem] pt-[1rem]">
								<div className="flex items-center relative ">
									<label className="absolute top-[14px] left-[10px]">
										<FaSearch className="darkGray" />
									</label>
									<input
										type="text"
										disabled={
											this.props.bookingCampaignChatUsers?.length < 1 && true
										}
										onKeyUp={(e) => this.searchUser(e)}
										className="w-full h-[40px] rounded-[8px] bg-white p-[10px_0_10px_46px] focus-visible:outline-0 disabled:bg-gray-100"
										placeholder="Search contacts..."
									/>
								</div>
							</div>
							<div className="h-[calc(100%-66px)] overflow-y-auto overflow-x-hidden p-[1rem]">
								<ul className="pl-0">
									{filteredUser && filteredUser.length ? (
										filteredUser.map((chat, index) => (
											<li
												className={`cursor-pointer relative text-[0.9em] py-[0.5rem] ${chat.infleuncer.id === this.state.infleuncerId
														? "active"
														: ""
													}`}
												onClick={() =>
													this.handleChatUserMessages(
														chat.infleuncer.id,
														chat.infleuncer.displayname
													)
												}
												key={index}
											>
												<div className="flex items-center relative">
													<span className="bg-[#e74c3c] absolute left-[-2px] top-[-2px] w-[10px] h-[10px] rounded-full border-2 border-[#2c3e50] "></span>
													<img
														src={
															chat.infleuncer.basicInfo &&
																chat.infleuncer.basicInfo.profile_picture_url
																? chat.infleuncer.basicInfo.profile_picture_url
																: avatar
														}
														className="w-[40px] rounded-full mr-[10px]"
														alt={chat.infleuncer.displayname}
													/>
													<div className="max-w-full overflow-hidden">
														<p className="text-white text-[14px] font-semibold">
															{chat.infleuncer.displayname}
														</p>
														{chat.isAttachement === 1 ? (
															<p className="text-white text-[14px] font-medium">
																{chat.attachmentName} - {chat.attachmentSize}{" "}
															</p>
														) : (
															<p className="text-white text-[12px] truncate">
																{chat.message}
															</p>
														)}
													</div>
												</div>
											</li>
										))
									) : (
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-white font-medium leading-[40px] text-[16px]">
											We have nothing to show you here.
										</div>
									)}
								</ul>
							</div>
						</div>
						<div className="md:col-span-9 col-span-12 bg-white rounded-r-[8px]  mb-12 md:!mb-0 overflow-hidden relative">
							<div className="w-full h-[60px] leading-[60px] bg-white border-b border-[#dee2e6] flex items-center justify-between">
								<p className="pl-3 text-[20px] font-semibold">
									{this.props.chatUserMessages &&
									(this.props.chatUserMessages || []).length>0
										? this.props.chatUserMessages?.[0]?.infleuncer?.infleuncer?.displayname
										: this.state?.infleuncerName}
									{/* {filteredUser?.[0]?.infleuncer?.displayname ?? ""} */}
								</p>
								<div className="mr-6 cursor-pointer">
									<FaSyncAlt onClick={() => this.refreshChat()} />
								</div>
							</div>
							<div className="min-h-[calc(100%-100px)] max-h-[calc(100%-100px)] h-[auto] overflow-y-auto overflow-x-hidden ">
								<div className="my-12 relative">
									{this.props.isLoadingMessages ? (
										<Loader
											className="h-[50vh] w-full flex justify-center items-center"
											size="67"
										/>
									) : (
										<div>
											{this.props.chatUserMessages &&
												(this.props.chatUserMessages || []).length > 0 ? (
												this.props.chatUserMessages.map((chat, index) => (
													<ul key={index} className="pl-0">
														{chat.flag === 1 ? (
															<li className="p-[10px_15px_0_15px] flex">
																<img
																	src={
																		chat?.infleuncer?.infleuncer?.basicInfo &&
																			chat.infleuncer.infleuncer.basicInfo
																				.profile_picture_url
																			? chat.infleuncer.infleuncer.basicInfo
																				.profile_picture_url
																			: avatar
																	}
																	className="m-[6px_8px_0_0] w-[22px] h-[22px] rounded-full shrink-0"
																	alt={chat.attachmentName}
																/>
																{chat.isAttachement === 1 ? (
																	<a
																		href={chat.attachmentPath}
																		target="_blank"
																		rel="noreferrer noopener"
																		className="bg-[#435f7a] success max-w-[300px] inline-block p-[10px_15px] rounded-[20px]"
																	>
																		{chat.attachmentName} -{" "}
																		{chat.attachmentSize}
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
																) : (
																	<p className="bg-[#435f7a] text-[#f5f5f5] max-w-[300px] inline-block p-[10px_15px] rounded-[20px] ">
																		{chat.message}
																	</p>
																)}
															</li>
														) : (
															""
														)}
														{chat.flag === 2 ? (
															<li className="p-[10px_15px_0_15px] flex justify-end">
																{chat.isAttachement === 1 ? (
																	<a
																		href={chat.attachmentPath}
																		target="_blank"
																		rel="noreferrer noopener"
																		className="bg-[#f5f5f5] success max-w-[300px] inline-block p-[10px_15px] rounded-[20px]"
																	>
																		<FaDownload
																			onClick={() =>
																				this.fileDownload(
																					chat.attachmentPath,
																					chat.attachmentName
																				)
																			}
																			className="ml-4"
																		/>
																		{chat.attachmentName} -{" "}
																		{chat.attachmentSize}{" "}
																	</a>
																) : (
																	<p className="bg-[#f5f5f5] darkGray max-w-[300px] inline-block p-[10px_15px] rounded-[20px]">
																		{chat.message}
																	</p>
																)}
																<img
																	src={
																		chat.brand && chat.brand.avatar
																			? chat.brand.avatar
																			: avatar
																	}
																	className="m-[8px_0_0_8px] w-[22px] h-[22px] rounded-full shrink-0"
																	alt={chat.attachmentName}
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
									)}
								</div>
							</div>
							<div className="absolute border-t border-[#dee2e6] w-full bottom-0 z-[99] bg-[#ccc] p-[10px]">
								<div className="relative flex">
									<input
										type="text"
										name="chatMessage"
										value={this.props.chatMessage}
										disabled={
											this.props.bookingCampaignChatUsers?.length < 1 && true
										}
										className="pl-3 h-[40px] bg-white rounded-[8px] w-[calc(100%-90px)] focus-visible:outline-0 focus:border-[#7c3292] p-[11px_32px_10px_8px] text-[11pt] text-[#32465a] disabled:bg-gray-100"
										onKeyDown={(e) => this._handleKeyDown(e)}
										onChange={(e) => this.props.handleChange(e)}
										placeholder="Write your message..."
									/>
									<div className="flex justify-center items-center w-[40px] h-[40px]">
										<label htmlFor="file-input" className="m-0">
											<FaPaperclip
												size={16}
												className="darkGray cursor-pointer z-[4]"
											/>
										</label>
										<input
											id="file-input"
											disabled={
												this.props.filteredUser?.length < 1 && true
											}
											type="file"
											className="hidden"
											onChange={(e) => this.fileUploadHandler(e)}
										/>
									</div>
									<button
										disabled={
											filteredUser?.length < 1 && true
										}
										onClick={() => this.messageSend()}
										onKeyPress={this.keyPressed}
										className="w-[50px] h-[40px] rounded-[8px] bg--purple text-[#f5f5f5] inline-flex justify-center items-center hover:opacity-80 disabled:opacity-80"
									>
										{this.props.isLoading ? (
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

								{this.props.errorsObj?.attachment ? (
									<span className="mt-1 red block">
										{this.props.errorsObj.attachment[0]}
									</span>
								) : (
									""
								)}
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
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		isLoadingMessages: state.BrandBookingCampaignReducer.isLoadingMessages,
		errorsObj: state.BrandBookingCampaignReducer.errorsObj,
		chatMessage: state.BrandBookingCampaignReducer.chatMessage,
		bookingCampaignChatUsers:
			state.BrandBookingCampaignReducer.bookingCampaignChatUsers,
		bookingCampaignMessages:
			state.BrandBookingCampaignReducer.bookingCampaignMessages,
		chatUserMessages: state.BrandBookingCampaignReducer.chatUserMessages,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		fetchChatUserMessages: (query, param) =>
			dispatch(brandBookingCampaignActions.fetchChatUserMessages(query, param)),
		brandSendMessage: (query) =>
			dispatch(brandBookingCampaignActions.brandSendMessage(query)),
		handleUploadFile: (query) =>
			dispatch(brandBookingCampaignActions.handleUploadFile(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandBookingCampaignMessages);
