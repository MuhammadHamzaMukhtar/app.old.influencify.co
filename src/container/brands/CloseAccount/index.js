import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { FaSpinner, FaSync } from "react-icons/fa";
import zxcvbn from "zxcvbn";
// import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingAccountActionCreator from "@store/actions/SettingAccountActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Button from "@components/global/Button";
import Noty from "noty";

class SettingBrandAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			reason: "",
			type: "password",
		};
	}

	componentDidMount() {
		// if (this.props.isPlanSubscribed === false) {
		//     this.props.history.replace('/billing');
		//     return;
		// }
		//this.props.brandAccountSettings();
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
		var reset = {
			target: {
				value: "",
				name: "password",
			},
		};
		const query = {
			password: this.props.password,
			password_strength: zxcvbn(this.props.password),
		};
		this.props.handlePasswordUpdate(query);
		this.props.handleChange(reset);
	};

	handleChangeReason = (event) => {
		this.setState({
			reason: event.target.value,
		});
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

	closeBrandAccount = () => {
		let query = {
			reason: this.state.reason,
		};
		this.props.userCloseAccount(query);
		this.setState({
			showModal: false,
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

	handleVisible = (shown, type) => {
		this.setState({
			shown: shown,
			type: type,
		});
	};

	render() {
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		// if (this.props.isLoading) {
		// 	return <Loader />;
		// }
		const givenPassword = zxcvbn(this.props.password);
		const { refreshData } = this.props;
		return (
			<>
				<div className="">
					<h4 className="font-semibold mb-4 text-[20px]">Close Account</h4>
					
					{this.props.refreshData.identifier !== "sub_account" && (
						<>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-6 space-y-5">

                            <p className="text-[12px] font-medium inline-block red">
											Danger:
										</p>
										<span className="darkGray text-[12px] ml-1">
											This is an irreversible process, ALL your personal data
											will be gone forever!
										</span>
								<div className="grid grid-cols-12 gap-3">
									<div className="md:col-span-6 col-span-12">
										<Button
											onClick={() => this.handleShowModal()}
											text="Close Account"
											suffix={
												this.props.isSyn ? (
													<FaSync className="animate-[spin_2s_linear_infinite] pink ml-4" />
												) : (
													""
												)
											}
											className="px-12 rounded-[8px] h-[40px] text-[14px] w-full inline-flex justify-center items-center bg-[#dc3545] text-white hover:opacity-80"
										/>
										
									</div>
								</div>
							</div>
						</>
					)}
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
									<Dialog.Title className="dark text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h3 className="text-[25px] font-medium">Are you sure?</h3>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={() => this.handleClose()}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-4">
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
									</div>
									<div className="text-right multi-buttons border-t border-[#dee2e6] px-3 py-3">
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
											onClick={this.handleClose}
											text="Cancel"
										/>
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
											onClick={() => this.closeBrandAccount()}
											text="Close Account"
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isLoading: state.SettingAccountReducer.isLoading,
		isSyn: state.SettingAccountReducer.isSyn,
		errorsObj: state.SettingAccountReducer.errorsObj,
		email: state.SettingAccountReducer.email,
		username: state.SettingAccountReducer.username,
		password: state.SettingAccountReducer.password,
		password_strength: state.SettingAccountReducer.password_strength,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		brandAccountSettings: () =>
			dispatch(settingAccountActionCreator.brandAccountSettings()),
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
)(SettingBrandAccount);
