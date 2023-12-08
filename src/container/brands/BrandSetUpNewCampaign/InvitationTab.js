import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import { FiX } from "react-icons/fi";
import google from "@assets/google.png";
import headerlogo from "@assets/header_logo.png";
import { connect } from "react-redux";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import * as setUpCampaignActions from "@store/actions/SetUpCampaignActions";
import {
	HANDLE_SUBJECT_CHANGE_SUCCESS,
	HANDLE_VERIFIED_MESSAGE_CHANGE_SUCCESS,
	HANDLE_NON_VERIFIED_MESSAGE_CHANGE_SUCCESS,
	HANDLE_GMAIL_CONNECTED_MESSAGE_CHANGE_SUCCESS,
} from "@store/constants/action-types";

class InvitationTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disconnectModal: false,
		};
	}

	gmailSync = () => {
		window.location.href = "/oauth/gmail";
	};

	showDisconnetModal = () => {
		this.setState({
			disconnectModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			disconnectModal: false,
		});
	};

	gmailDisconnect = () => {
		this.props.disconnectGmail();
		this.handleClose();
	};

	handleUpdateInvitationMessage = () => {
		let query = {
			campaign_id: this.props.campaignID,
			subject_line: this.props.subject_line,
			verified_message: this.props.verified_message,
			non_verified_message: this.props.non_verified_message,
			gmail_connected_message: this.props.gmail_connected_message,
		};
		this.props.updateInvitationMessage(query);
	};

	render() {
		return (
			<div className="SetUpNewCampaign-page">
				<div className="grid grid-cols-12 gap-5">
					<div className="col-span-12">
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-12 p-0">
							<h5 className="p-4  text-[18px]">Quick Invite Message</h5>
							<div className="bg-[#0000001f] h-[1px] w-full" />
							<div className="p-4">
								{this.props.currentLoggedUser &&
								this.props.currentLoggedUser.isGmailLinked ? (
									<div className="gray-code px-4 py-[0.5rem] rounded">
										<div className="grid grid-cols-12 gap-5">
											<div className="lg:col-span-6 col-span-12">
												<div className="flex items-center">
													<img
														src={google}
														alt="google"
														className="w-[16px] runded-full"
													/>
													<b className="mx-2">Sent from: </b>
													<p>{this.props.email}</p>
												</div>
											</div>
											<div className="lg:col-span-6 col-span-12 text-right">
												<Button
													onClick={() => this.showDisconnetModal()}
													text="Disconnect"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												/>
											</div>
										</div>
									</div>
								) : (
									<div className="gray-code px-4 py-[0.5rem] rounded mt-4">
										<div className="grid grid-cols-12 gap-5">
											<div className="lg:col-span-6 col-span-12 my-auto">
												<div className="flex items-center">
													<img
														src={headerlogo}
														className="w-[20px] runded-full"
														alt="logo"
													/>
													<b className="mx-2">Sent from: </b>
													<p>support@influencify.co</p>
												</div>
											</div>
											<div className="lg:col-span-6 col-span-12 text-right">
												<Button
													onClick={this.gmailSync}
													prefix={
														<img
															src={google}
															className="mr-2 w-[20px] runded-full"
															alt="google"
														/>
													}
													text="Sign in with Google"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-white border-[1px] border-[#7c3292] text-[#7c3292] hover:opacity-80"
												/>
											</div>
										</div>
									</div>
								)}
								{this.props.currentLoggedUser &&
								this.props.currentLoggedUser.isGmailLinked ? (
									<div>
										<div className="grid grid-cols-12 gap-5 mt-6">
											<div className="lg:col-span-6 col-span-12">
												<div className="primary-textFiled">
													<label className="text-[10px] darkGray">
														Subject Line
													</label>
													<input
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.subjectChange(e)}
														value={this.props.subject_line}
													/>
												</div>
											</div>
										</div>
										<div className="grid grid-cols-12 gap-5 mt-6">
											<div className="col-span-12 primary-textFiled">
												<label className="text-[10px] darkGray">Message</label>
												<textarea
													className="rounded-[8px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) =>
														this.props.gmailConnectedMessageChange(e)
													}
													value={this.props.gmail_connected_message}
													rows="6"
												>
													{this.props.gmail_connected_message}
												</textarea>
											</div>
										</div>
									</div>
								) : (
									<div>
										<div className="grid grid-cols-12 gap-5 mt-6">
											<div className="lg:col-span-6 col-span-12">
												<label className="text-[10px] darkGray">
													Subject Line
												</label>
												<input
													disabled
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) => this.props.subjectChange(e)}
													value={this.props.subject_line}
												/>
											</div>
										</div>
										<div className="grid grid-cols-12 gap-5 mt-6">
											<h6 className="col-span-12 mb-6 text-[16px]">
												For Verified Influencers
											</h6>
											<div className="col-span-12 primary-textFiled">
												<label className="text-[10px] darkGray">
													Verified Influencer Message
												</label>
												<textarea
													disabled
													className="rounded-[8px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) => this.props.verifiedMessageChange(e)}
													value={this.props.verified_message}
													rows="6"
												>
													{this.props.verified_message}
												</textarea>
											</div>
										</div>
										<div className="grid grid-cols-12 gap-5 mt-6">
											<h6 className="col-span-12 mb-6 text-[16px]">
												For Non Verified Influencers
											</h6>
											<div className="col-span-12 primary-textFiled">
												<label className="text-[10px] darkGray">
													Non Verified Influencer Message
												</label>
												<textarea
													disabled
													className="rounded-[8px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) =>
														this.props.nonVerifiedMessageChange(e)
													}
													value={this.props.non_verified_message}
													rows="6"
												>
													{this.props.non_verified_message}
												</textarea>
											</div>
										</div>
									</div>
								)}
							</div>
							{this.props.currentLoggedUser &&
							this.props.currentLoggedUser.isGmailLinked ? (
								<div className="grid grid-cols-12 gap-5 mt-6">
									<div className="sm:col-span-6 col-span-12 my-auto">
										{/*<a href='#' className='dark'>Reset To Default</a>*/}
									</div>
									<div className="sm:col-span-6 col-span-12 sm:!text-right text-center">
										<Button
											onClick={() => this.handleUpdateInvitationMessage()}
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											text="Update Message"
										/>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>

				<Transition appear show={this.state.disconnectModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are You Sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="font-medium text-[15px]">
											Do you want to disconnect your Gmail Account
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.gmailDisconnect}
												text="Yes"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		email: state.SettingGmailReducer.email,
		campaignID: state.SetUpNewCampaignReducer.campaignID,
		subject_line: state.SetUpNewCampaignReducer.subject_line,
		verified_message: state.SetUpNewCampaignReducer.verified_message,
		non_verified_message: state.SetUpNewCampaignReducer.non_verified_message,
		gmail_connected_message:
			state.SetUpNewCampaignReducer.gmail_connected_message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		subjectChange: (event) =>
			dispatch({ type: HANDLE_SUBJECT_CHANGE_SUCCESS, payload: event }),
		verifiedMessageChange: (event) =>
			dispatch({
				type: HANDLE_VERIFIED_MESSAGE_CHANGE_SUCCESS,
				payload: event,
			}),
		nonVerifiedMessageChange: (event) =>
			dispatch({
				type: HANDLE_NON_VERIFIED_MESSAGE_CHANGE_SUCCESS,
				payload: event,
			}),
		gmailConnectedMessageChange: (event) =>
			dispatch({
				type: HANDLE_GMAIL_CONNECTED_MESSAGE_CHANGE_SUCCESS,
				payload: event,
			}),
		disconnectGmail: () => dispatch(settingGmailActions.disconnectGmail()),
		updateInvitationMessage: (query) =>
			dispatch(setUpCampaignActions.updateInvitationMessage(query)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationTab);
