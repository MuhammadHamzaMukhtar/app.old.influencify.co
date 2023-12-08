import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandIntegrationTopTab from "@components/SettingBrandIntegrationTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Influencify from "../../constants/Influencify";
import { FaSpinner } from "react-icons/fa";

class BrandSettingAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			properties: [],
			property_id: null,
			account_id: null,
			message: "",
			loading: false,
		};
	}

	async componentDidMount() {
		await this.props.fetchGoogleAnalyticsStatus();
		await this.props.fetchGoogleAnalyticsSummary();
		const { gaStatus } = this.props;
		if (gaStatus.account_id) {
			this.onAccountSelect(gaStatus.account_id);
		}
		if (gaStatus.property_id) {
			this.onPropertySelect(gaStatus.property_id);
		}
	}

	handleUpdateGmailSetting = () => {
		const query = {
			name: this.props.name,
		};
		this.props.handleGmailUpdate(query);
	};

	gmailSync = () => {
		window.location.href = "/oauth/analytics";
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
	gmailDisconnect = async () => {
		this.setState({
			disconnectModal: false,
		});
		await Influencify.disconnectGoogleAnalytics();
		this.props.fetchGoogleAnalyticsStatus();
	};

	onAccountSelect = (e) => {
		let properties = [];
		const { data } = this.props;
		if (e) {
			properties = data.filter((i) => i.account === e)[0].propertySummaries;
		}

		this.setState({ properties: properties, account_id: e, property_id: null });
	};

	onPropertySelect = (e) => {
		this.setState({ property_id: e });
	};

	saveProperty = async () => {
		const { property_id, account_id } = this.state;
		if (!property_id) {
			this.setState({ message: "Please select property." });
			return;
		}
		const data = { property_id, account_id };

		this.setState({ message: "", loading: true });
		await Influencify.saveGoogleAnalyticsSummary(data);
		this.setState({ loading: false });
		toast.success("Settings saved successfully");
	};

	render() {
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		if (this.props.isLoading) {
			return <Loader />;
		}
		const { gaStatus, data } = this.props;
		const { properties, message, loading } = this.state;
		return (
			<div>
				<SettingHeader />
				<SettingBrandIntegrationTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 md:col-start-1 sm:col-span-6 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
								{gaStatus && gaStatus.id ? (
									<>
										<Button
											onClick={() => this.showDisconnetModal()}
											text="Disconnect"
											className="mb-6 lg:!mt-0 ml-1 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80 float-right"
										/>
										<div className="flex flex-wrap mb-6 sm:!mb-0 justify-center items-end">
											<div
												className="lg:w-5/12 md:w-6/12 sm:w-8/12 w-full
"
											>
												<label className="text-[14px] font-medium">
													Account
												</label>
												<div className="mb-0">
													<select
														className="form-control"
														onChange={(e) =>
															this.onAccountSelect(e.target.value)
														}
													>
														<option value={""}>Select account</option>
														{data &&
															data.length > 0 &&
															data.map((item, key) => (
																<option
																	selected={
																		gaStatus.account_id === item.account
																	}
																	value={item.account}
																	key={key}
																>
																	{item.displayName}
																</option>
															))}
													</select>
												</div>

												<label className="mt-6 text-[14px] font-medium">
													Property
												</label>
												<div className="mb-0">
													<select
														className="form-control"
														onChange={(e) =>
															this.onPropertySelect(e.target.value)
														}
													>
														<option>Select property</option>
														{properties &&
															properties.length > 0 &&
															properties.map((item, key) => (
																<optgroup label={item.displayName} key={key}>
																	<option
																		selected={
																			gaStatus.property_id === item.property
																		}
																		value={item.property}
																	>
																		{item.property}
																	</option>
																</optgroup>
															))}
													</select>
													{message && message.length > 0 && (
														<p className="red">{message}</p>
													)}
												</div>
												{loading ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite] pink mt-6" />
												) : (
													<Button
														onClick={this.saveProperty}
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] mt-6"
														text="Save"
													/>
												)}
											</div>
										</div>
									</>
								) : (
									<div className="grid grid-cols-12 gap-5">
										<div className="col-span-12 items-center justify-center flex">
											<div
												className="flex border cursor-pointer rounded-[8px] p-3"
												onClick={this.gmailSync}
											>
												<div className="pr-3 pt-2 sm:flex hidden ">
													<FcGoogle size={18} />
												</div>
												<div className="flex justify-between grow items-center">
													<div className="flex flex-col letter-spacing-2px grow">
														<p className="text-[8px] gray">GOOGLE</p>
														<h6 className="text-[13px]">Gmail / G-Suite</h6>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
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
											Do you want to disconnect your Google Analytics Account
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

const mapStateToProps = ({ googleAnalytics }) => {
	return {
		gaStatus: googleAnalytics.gaStatus,
		data: googleAnalytics.data,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/GoogleAnalyticsRedux");
	return {
		...ownProps,
		...stateProps,
		fetchGoogleAnalyticsStatus: () => {
			return actions.fetchGoogleAnalyticsStatus(dispatch);
		},
		fetchGoogleAnalyticsSummary: () => {
			return actions.fetchGoogleAnalyticsSummary(dispatch);
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(BrandSettingAnalytics);
