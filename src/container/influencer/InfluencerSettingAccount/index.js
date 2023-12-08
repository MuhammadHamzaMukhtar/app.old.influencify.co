import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import avatar from "@assets/avatar.png";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import SettingInfluencerSidebar from "@components/SettingInfluencerSidebar";
import { FiX } from "react-icons/fi";
import zxcvbn from "zxcvbn";
import { connect } from "react-redux";
import * as settingAccountActionCreator from "@store/actions/SettingAccountActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Noty from "noty";

class InfluencerSettingAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			reason: "",
		};
	}

	componentDidMount() {
		this.props.influencerAccountSettings();
	}

	handleUpdateEmail = (event) => {
		const query = { email: this.props.email };
		this.props.handleEmailUpdate(query);
	};

	handleUpdateUserName = (event) => {
		const query = { username: this.props.username };
		this.props.handleUsernameUpdate(query);
	};

	handleUpdateUserPassword = (event) => {
		const query = { password: this.props.password };
		this.props.handlePasswordUpdate(query);
	};

	handleChangeReason = (event) => {
		this.setState({
			reason: event.target.value,
		});
	};

	createPasswordLabel = (result) => {
		switch (result.score) {
			case 0:
				return "Weak";
			case 1:
				return "Weak";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "Weak";
		}
	};

	createPasswordLength = (result) => {
		switch (result.score) {
			case 0:
				return 0;
			case 1:
				return 25;
			case 2:
				return 50;
			case 3:
				return 75;
			case 4:
				return 100;
			default:
				return 0;
		}
	};

	createPasswordVariant = (result) => {
		switch (result.score) {
			case 0:
				return "#dc3545";
			case 1:
				return "#dc3545";
			case 2:
				return "#ffc107";
			case 3:
				return "#17a2b8";
			case 4:
				return "#28a745";
			default:
				return "#dc3545";
		}
	};

	showSuccessMessage = (msg) => {
		new Noty({
			type: "success",
			theme: "sunset",
			text: msg,
			layout: "topRight",
			timeout: 2000,
		}).show();
	};

	handleShowModal = () => {
		this.setState({
			showModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			showModal: false,
		});
	};

	closeInfluencerAccount = () => {
		let query = {
			reason: this.state.reason,
		};
		this.props.userCloseAccount(query);
		this.setState({
			showModal: false,
		});
	};

	render() {
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		return (
			<div>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingInfluencerSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<h4 className="mb-4 text-[20px] mt-12 lg:!mt-0">
								Account
							</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 lg:p-12 mb-12">
								<div className="grid grid-cols-12 gap-5">
									<div className="lg:col-span-10 lg:col-start-2 col-span-12 space-y-5">
									
										<div className="grid grid-cols-12 gap-5 items-end">

										<div className="md:col-span-2 col-span-12">
										<img
												className="object-cover w-[110px] h-[110px] rounded-full"
												src={
													this.props.profile_pic !== 0
														? this.props.profile_pic
														: avatar
												}
												alt="Influencer"
											/>
										</div>
											
											<div className="md:col-span-8 col-span-12">
											
												<form>
													<label className="text-[14px] font-medium">
														Email
													</label>
													<input
														type="email"
														readOnly
														disabled
														placeholder="Brand name"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														value={this.props.email || ""}
														onChange={(e) => this.props.handleChange(e)}
														name="email"
													/>

													<label className="text-[14px] font-medium">
														Username
													</label>
													<input
														type="Username"
														readOnly
														disabled
														placeholder="Username"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														value={this.props.username || ""}
														onChange={(e) => this.props.handleChange(e)}
														name="username"
													/>
												</form>
											</div>
										</div>
									
										
									</div>
								</div>
							</div>

							
						</div>
					</div>

					<Transition appear show={this.state.showModal} as={Fragment}>
						<Dialog
							onClose={() => this.handleClose()}
							className="relative z-[9999]"
						>
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
											<h2 className="text-[24px]">Are you sure?</h2>
											<div
												className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
												onClick={() => this.handleClose()}
											>
												<FiX size={24} className="text-white stroke-white" />
											</div>
										</Dialog.Title>
										<div className="p-3">
											<div>
												<label className="text-[14px] font-medium">
													Reason (optional)
												</label>
												<textarea
													rows="8"
													name="reason"
													className="rounded-[8px] inline-flex w-full items-center px-3 py-2 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.state.reason}
													onChange={(event) => this.handleChangeReason(event)}
												></textarea>
											</div>
											<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
												<Button
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
													onClick={this.handleClose}
													text="Cancel"
												/>
												<Button
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
													onClick={() => this.closeInfluencerAccount()}
													text="Close Account"
												/>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</Dialog>
					</Transition>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.SettingAccountReducer.isLoading,
		isSyn: state.SettingAccountReducer.isSyn,
		errorsObj: state.SettingAccountReducer.errorsObj,
		email: state.SettingAccountReducer.email,
		profile_pic:state.HeaderReducer.currentLoggedUser.profile_pic,
		username: state.SettingAccountReducer.username,
		password: state.SettingAccountReducer.password,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		influencerAccountSettings: () =>
			dispatch(settingAccountActionCreator.influencerAccountSettings()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleEmailUpdate: (query) =>
			dispatch(settingAccountActionCreator.handleEmailUpdate(query)),
		handleUsernameUpdate: (query) =>
			dispatch(settingAccountActionCreator.handleUsernameUpdate(query)),
		handlePasswordUpdate: (query) =>
			dispatch(settingAccountActionCreator.handlePasswordUpdate(query)),
		userCloseAccount: (query, ownProps) =>
			dispatch(settingAccountActionCreator.userCloseAccount(query, ownProps)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerSettingAccount);
