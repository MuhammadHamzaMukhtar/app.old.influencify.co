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
				if (result.password.length > 0) {
					return 10;
				}
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
					<h4 class="font-semibold mb-4 text-[20px]">Change Password</h4>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-6 space-y-5">

						{refreshData.is_main && (
							<>
								<div className="grid grid-cols-12 gap-5 items-end">
									<div className="sm:col-span-8 col-span-12">
										<form>
											<label className="text-[14px] font-medium">
												Password
											</label>
											<div className="relative">
												<input
													type={this.state.type}
													placeholder="Password"
													name="password"
													autoComplete="off"
													onChange={(e) => this.props.handleChange(e)}
													className="pr-12 rounded-[8px] h-[40px] inline-flex w-full items-center pl-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												/>
												{this.state.shown ? (
													<AiOutlineEyeInvisible
														size={22}
														onClick={() =>
															this.handleVisible(false, "password")
														}
														className="absolute z-1 top-[10px] right-[10px] cursor-pointer darkGray"
													/>
												) : (
													<AiOutlineEye
														size={22}
														onClick={() => this.handleVisible(true, "text")}
														className="absolute z-1 top-[10px] right-[10px] cursor-pointer darkGray"
													/>
												)}
											</div>
											{this.props.errorsObj?.password ? (
												<span className="red">
													{this.props.errorsObj.password[0]}
												</span>
											) : (
												""
											)}
										</form>
									</div>
									<div className="sm:col-span-4 col-span-12 mt-2 pt-2">

									</div>
								</div>

								<div className="grid grid-cols-12 gap-5">
									<div className="md:col-span-8 col-span-12">
										<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
											<div
												className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
												style={{
													backgroundColor:
														this.createPasswordVariant(givenPassword),
													width: `${this.createPasswordLength(givenPassword)}%`,
												}}
											>
												{this.createPasswordLabel(givenPassword)}
											</div>
										</div>
									</div>
								</div>
								<Button
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
									type="button"
									onClick={() => this.handleUpdateUserPassword()}
									text={
										this.props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] white" />
										) : (
											"Update"
										)
									}

								/>
							</>
						)}
					</div>
				</div>

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
