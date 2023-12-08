import { Component, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandIntegrationTopTab from "@components/SettingBrandIntegrationTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import { HANDLE_GMAIL_SETTING_CHANGE } from "@store/constants/action-types";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Influencify from "../../../constants/Influencify";
import { FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";

class BrandSettingGmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disconnectModal: false,
			loading: false,
		};
	}

	componentDidMount() {
		this.props.fetchGmailSetting();
	}

	handleUpdateGmailSetting = () => {
		const query = {
			name: this.props.name,
			email: this.props.email,
		};
		this.props.handleGmailUpdate(query);
	};

	gmailSync = async () => {
		const url = await Influencify.authGmailUrl();
		window.location.href = url.data;
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

	updateGmailMailboxSettings = async () => {
		this.setState({ loading: true });
		const data = {
			daily_limit: this.props.daily_limit,
			hourly_limit: this.props.hourly_limit,
			delay_sending: this.props.delay_sending,
		};
		const json = await Influencify.updateGmailMailboxSettings(data);
		if (json !== undefined) {
			if (json.status === 200) {
				if (json.data.status) {
					toast.success(json.data.message);
				} else {
					toast.error(json.data.message);
				}
			}
		}
		this.setState({ loading: false });
	};

	render() {
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[87vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		const { refreshData } = this.props;
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandIntegrationTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<h4 class="font-semibold mb-4 text-[20px]">Integrations</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-10 mb-12">
								{this.props.currentLoggedUser &&
								this.props.currentLoggedUser.isGmailLinked === true ? (
									<>
										<div className=" sm:!mb-0 flex flex-col justify-center gap-4 items-center">
											<p className="text-2xl font-medium leading-7 text-gray-700">Gmail Connected</p>
											<p className="text-ms font-medium leading-7 text-gray-700">{this.props.email}</p>
											{refreshData.is_admin && (
											<div>
												<Button
													text="Disconnect"
													onClick={() => this.showDisconnetModal()}
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80"
												/>
											</div>
											)}
											{/* <div className="lg:col-span-7 col-span-12">
												<label className="text-[14px] font-medium">Name</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.name || ""}
													type="test"
													placeholder="Brand name"
													onChange={(e) => this.props.handleChange(e)}
													name="name"
												/>
													{this.props.errorsObj?.name ? (
														<span className="red">
															{this.props.errorsObj.name[0]}
														</span>
													) : (
														""
													)}
													<br />
												<label className="text-[14px] font-medium">Email</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.email || ""}
													readOnly={true}
													type="test"
													placeholder="Enter email"
													onChange={(e) => this.props.handleChange(e)}
													name="email"
												/>
													{this.props.errorsObj?.email ? (
														<span className="red">
															{this.props.errorsObj.email[0]}
														</span>
													) : (
														""
													)}
												<p className="text-[#6c757d] mb-6 text-[12px]">
													To customize the sender name enter the correct
													connected email address.
												</p>
											</div> */}
										</div>
										{/* <div className="flex justify-end">
											<Button
												onClick={() => this.handleUpdateGmailSetting()}
												className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#7c3292] text-white hover:opacity-80"
												text="Save"
											/>
										</div> */}
									</>
								) : (
									<div className="items-center justify-center flex">
										{refreshData.is_admin ? (
											<div
												className="flex border-[1px] border-[#dee2e6] cursor-pointer rounded-[8px] p-3"
												onClick={this.gmailSync}
											>
												<div className="pr-3 pt-2 sm:flex hidden ">
													<FcGoogle size={18} />
												</div>
												<div className="flex justify-between grow items-center">
													<div className="flex flex-col tracking-[2px] grow">
														<p className="text-[8px] gray">GOOGLE</p>
														<h6 className="text-[13px]">Gmail / G-Suite</h6>
													</div>
												</div>
											</div>
										) : (
											<p className="red">Please ask admin to connect Gmail</p>
										)}
									</div>
								)}
							</div>
							{this.props.currentLoggedUser &&
								this.props.currentLoggedUser.isGmailLinked === true && (
									<>
									<div className="rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white overflow-hidden mb-4">
										<div className="p-[0.75rem_1.25rem] bg-white border-b-[1px] border-[#00000020] font-medium flex items-center justify-between">
											Information
											
										</div>
										<div className="p-[1.25rem]">
											<div className="grid grid-cols-12 gap-5">
												<div className="xl:col-span-4 md:col-span-6 col-span-12 mb-6 xl:!mb-0">
													<label className="text-[13px] font-medium">
														Daily (24 Hour) Sending Limit:{this.props.daily_limit}
													</label>
													
													{this.props.daily_limit >
														this.props.daily_max_limit && (
														<p className="red text-[12px]">
															{this.props.daily_max_limit} maximum limit for
															daily sending emails.
														</p>
													)}
													<p className="text-[#6c757d] text-[12px]">
														Limit on the # of emails to send per day through
														influencify.
														<Anchor
															href="https://support.google.com/mail/answer/22839"
															target={"_blank"}
															className="text-[12px]"
															text="Read more about Gmail's here"
														/>
													</p>
												</div>
												<div className="xl:col-span-4 md:col-span-6 col-span-12 mb-6 xl:!mb-0">
													<label className="text-[13px] font-medium">
														Maximum # of Emails to Send Per Hour: {this.props.hourly_limit}
													</label>
													
													{this.props.hourly_limit >
														this.props.hourly_max_limit && (
														<p className="red text-[12px]">
															Maximum {this.props.hourly_max_limit} Emails to
															Send Per Hour.
														</p>
													)}
													<p className="text-[#6c757d] text-[12px]">
														{
															"Limit on the # of emails to send per hour through influencify."
														}
													</p>
												</div>
											

												
											</div>
											
										</div>
									</div>
									<div className="rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white overflow-hidden">
									<div className="p-[0.75rem_1.25rem] bg-white border-b-[1px] border-[#00000020] font-medium flex items-center justify-between">
										Settings
										
									</div>
									<div className="p-[1.25rem]">
										<div className="grid grid-cols-12 gap-5">
										
										
											<div className="xl:col-span-4 md:col-span-6 col-span-12 mb-6 xl:!mb-0">
												<label className="text-[13px] font-medium">
													Minimum Delay Between Emails (in seconds)
												</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.delay_sending}
													type="number"
													onChange={(e) => this.props.handleChange(e)}
													name="delay_sending"
													min={60}
													max={84600}
												/>
												{this.props.delay_sending < 60 && (
													<p className="red text-[12px]">
														Delay not less than 60 seconds
													</p>
												)}
												{this.props.delay_sending > 84600 && (
													<p className="red text-[12px]">
														Delay not greater than 84600 seconds
													</p>
												)}

												
											</div>

											
										</div>

										<div className="flex items-center justify-end mt-8">
											<button
												 disabled={this.state.loading}
												onClick={this.updateGmailMailboxSettings}
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex  items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											>
											{this.state.loading ? 
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:
												"Update"
											}
											</button>
										</div>
										
									</div>
								</div>
								</>
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
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.SettingGmailReducer.isLoading,
		email: state.SettingGmailReducer.email,
		errorsObj: state.SettingGmailReducer.errorsObj,
		name: state.SettingGmailReducer.name,
		daily_limit: state.SettingGmailReducer.daily_limit,
		daily_max_limit: state.SettingGmailReducer.daily_max_limit,
		hourly_limit: state.SettingGmailReducer.hourly_limit,
		hourly_max_limit: state.SettingGmailReducer.hourly_max_limit,
		delay_sending: state.SettingGmailReducer.delay_sending,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchGmailSetting: () => dispatch(settingGmailActions.fetchGmailSetting()),
		handleGmailUpdate: (query) =>
			dispatch(settingGmailActions.handleGmailUpdate(query)),
		disconnectGmail: () => dispatch(settingGmailActions.disconnectGmail()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_GMAIL_SETTING_CHANGE, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandSettingGmail);
