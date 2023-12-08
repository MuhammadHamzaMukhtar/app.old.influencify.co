import { Component, Fragment } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandIntegrationTopTab from "@components/SettingBrandIntegrationTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import Influencify from "../../../constants/Influencify";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import Emitter from "../../../constants/Emitter";

const smtpOptions = [
	// {
	// 	key: "",
	// 	value: "",
	// 	text: "Select the type of sender to prefill fields",
	// },
	{
		key: "hotmail",
		text: "Fill fields for Hotmail",
		value: "hotmail",
		host: "smtp.office365.com",
		port: 587,
	},
	{
		key: "office365",
		text: "Fill fields for Office 365",
		value: "office365",
		host: "smtp.office365.com",
		port: 587,
	},
	{
		key: "exchange",
		text: "Fill fields for Exchange",
		value: "exchange",
		host: "smtp.office365.com",
		port: 587,
	},
	{
		key: "outlook",
		text: "Fill fields for Outlook",
		value: "outlook",
		host: "smtp-mail.outlook.com",
		port: 587,
	},
	{
		key: "yahoo",
		text: "Fill fields for Yahoo",
		value: "yahoo",
		host: "smtp.mail.yahoo.com",
		port: 587,
	},
	{
		key: "google",
		text: "Fill fields for Google",
		value: "google",
		host: "smtp.gmail.com",
		port: 465,
	},
	{
		key: "yandex",
		text: "Fill fields for Yandex",
		value: "yandex",
		host: "smtp.yandex.com",
		port: 465,
	},
	{
		key: "other",
		value: "other",
		text: "Other",
	},
];

class BrandSettingSmtp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			loading: false,
			hosts: this.props.form.sender_type,
		};
	}

	componentDidMount = () => {
		const { fetchSmtp } = this.props;
		fetchSmtp();
	};

	handleChange = (key, value) => {
		const { addForm } = this.props;
		const form = Object.assign({}, this.props.form);
		if (key === "sender_type") {
			let host = value.value;
			this.setState({ hosts: value.value });
			if (host) {
				if (host === "outlook") {
					form.smtp_host = "smtp-mail.outlook.com";
					form.smtp_port = 587; 
					form.enable_ssl = 0;
					form.smtp_info_message = ''
				} else if (host === "office365") {
					form.smtp_host = "smtp.office365.com";
					form.smtp_port = 587;
					form.enable_ssl = 0;
					form.smtp_info_message = ''

				} else if (host === "exchange") {
					form.smtp_host = "smtp.office365.com";
					form.smtp_port = 587;
					form.enable_ssl = 0;
					form.smtp_info_message = ''

				} else if (host === "hotmail") {
					form.smtp_host = "smtp-mail.outlook.com";
					form.smtp_port = 587;
					form.enable_ssl = 0;
					form.smtp_info_message = ''

				} else if (host === "yahoo") {
					form.smtp_host = "smtp.mail.yahoo.com";
					form.smtp_port = 465;
					form.enable_ssl = 1;
					form.smtp_info_message =
						"Did you generate an app password on Yahoo? <a target='_blank' rel='noopener noreferrer' href='https://knowledgebase.influencify.co/docs/how-to-generate-an-app-password-for-yahoo/'>See the FAQ</a>";
				} else if (host === "google") {
					form.smtp_host = "smtp.gmail.com";
					form.smtp_port = 465;
					form.enable_ssl = 1;
					form.smtp_info_message =
						"To connect to Gmail via SMTP, first follow the <a target='_blank' rel='noopener noreferrer' href='https://knowledgebase.influencify.co/docs/enable-gmail-smtp/'>instructions here</a>";
				} else if (host === "yandex") {
					form.smtp_host = "smtp.yandex.com";
					form.smtp_port = 465;
					form.enable_ssl = 1;
					form.smtp_info_message = ''

				} else if (host === "other") {
					form.sender_name = "";
					form.smtp_host = "";
					form.smtp_port = "";
					form.smtp_username = "";
					form.smtp_password = "";
					form.sender_email = "";
					form.smtp_info_message = ''

				}
				form[key] = host;
			} else {
				form.sender_name = "";
				form.smtp_host = "";
				form.smtp_port = "";
				form.smtp_username = "";
				form.smtp_password = "";
				form.sender_email = "";
				form.smtp_info_message = ''

			}
		} else {
			form[key] = value;
		}
		addForm(form);
	};

	updateSmtpMailboxSettings = async () => {
		this.setState({ loading: true });
		const form = this.props.form;

		const data = {
			daily_limit: form.daily_limit,
			hourly_limit: form.hourly_limit,
			delay_sending: form.delay_sending,
		};
		const json = await Influencify.updateSmtpMailboxSettings(data);
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

	disconnectSmtp = async () => {
		Swal.fire({
			title: "Are You Sure?",
			text: "Do you want to disconnect your SMTP Account",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "Cancel",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then(async (result) => {
			if (result.value) {
				this.props.disconnectSmtpMail();
				// window.location.reload();
			}
		});
	};

	defaultValue = (object, value) => {
		let txt;
		const default_value = {
			key: "",
			value: '',
			text: 'Select the type of sender to prefill fields'
		}
		if (value === undefined) {
			// txt = smtpOptions[0];
			txt = default_value;
		} else {
			txt = Object.assign(
				{},
				object.find((o) => o.value === value)
			);
		}
		return txt.text;
	};

	testSaveSmtpForm = (form) => {
		if (this.props.refreshData.is_admin) {
			this.props.testSaveSmtp(form);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	}

	render() {
		if (this.props.fetch_loading) {
			return (
				<Loader
					className="h-[87vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		const {
			form,
			error_obj,
			is_loading,
			error_message,
			success_message,
			testSmtp,
			test_loading,
			refreshData,
		} = this.props;
		return (
			<div>
				<SettingHeader />
				<SettingBrandIntegrationTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
							{/* <Button
								className="w-full mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
								text="Save Changes"
							/> */}
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<h4 className="font-semibold mb-4 text-[20px]">Sender Settings</h4>
							<div className="p-3 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px]">
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-6 col-span-12">
										<div className="p-3 border-[1px] border-[#dee2e6] rounded-[8px] mt-6">
											<form>
												<label className="mb-0 font-light ">
													<p className="text-[13px] font-normal">
														Sender Email
													</p>
												</label>
												<input
													type="text"
													value={form.sender_email || ""}
													onChange={(e) =>
														this.handleChange("sender_email", e.target.value)
													}
													maxLength={32}
													className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
												/>
												{error_obj && error_obj.sender_email ? (
													<span className="text-red-500">
														{error_obj.sender_email[0]}
													</span>
												) : (
													""
												)}
											</form>
										</div>
										<div className="flex items-center justify-between my-6">
											<h4 className="font-medium text-[20px]">SMTP Settings</h4>
											{refreshData.is_admin && (
												<Button
													disabled={
														Object.keys(form).length === 0 ? true : false
													}
													type="button"
													onClick={() => testSmtp(form)}
													prefix={
														test_loading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2 text-[10px] text-gray-500 w-4 h-4" />
														) : (
															""
														)
													}
													text="Test"
													className="bg-[#e7e7e7] flex items-center text-[11px] p-[5px_10px] text-[#797979] rounded-[8px] border-2 border-[#cdcdcd] focus-visible:outline-0"
												/>
											)}
										</div>
										<div className="border-[1px] border-[#dee2e6] rounded-[8px]">
											<div className="p-3">
												<form>
													<label className="mb-0 font-light ">
														<p className="text-[13px] font-normal">User Name</p>
													</label>
													<input
														type="email"
														value={form.smtp_username || ""}
														onChange={(e) =>
															this.handleChange("smtp_username", e.target.value)
														}
														maxLength={32}
														className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
													/>
													{error_obj && error_obj.smtp_username ? (
														<span className="text-red-500">
															{error_obj.smtp_username[0]}
														</span>
													) : (
														""
													)}
												</form>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="p-3">
												<form>
													<label className="mb-0 font-light ">
														<p className="text-[13px] font-normal">Password</p>
													</label>
													<input
														type="password"
														value={form.smtp_password || ""}
														onChange={(e) =>
															this.handleChange("smtp_password", e.target.value)
														}
														className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
													/>
													{error_obj && error_obj.smtp_password ? (
														<span className="text-red-500">
															{error_obj.smtp_password[0]}
														</span>
													) : (
														""
													)}
												</form>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="flex flex-wrap items-center ">
												<div className="sm:w-8/12 col-xs-12 border-right py-4 px-[1rem]">
													<form>
														<label className="mb-0 font-light ">
															<p className="text-[13px] font-normal">Host</p>
														</label>
														<input
															type="text"
															value={form.smtp_host || ""}
															onChange={(e) =>
																this.handleChange("smtp_host", e.target.value)
															}
															className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
														/>
														{error_obj && error_obj.smtp_host ? (
															<span className="text-red-500">
																{error_obj.smtp_host[0]}
															</span>
														) : (
															""
														)}
													</form>
												</div>
												<div className="col-sm-4 col-xs-12 py-4 px-[1rem]">
													<form>
														<label className="mb-0 font-light ">
															<p className="text-[13px] font-normal">
																Port (i.e 465)
															</p>
														</label>
														<input
															type="text"
															value={form.smtp_port || ""}
															onChange={(e) =>
																this.handleChange("smtp_port", e.target.value)
															}
															className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
														/>
														{error_obj && error_obj.smtp_port ? (
															<span className="text-red-500">
																{error_obj.smtp_port[0]}
															</span>
														) : (
															""
														)}
													</form>
												</div>
											</div>
										</div>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<div className="p-3 border-[1px] border-[#dee2e6] rounded-[8px] mt-6">
											<form>
												<label className="mb-0 font-light ">
													<p>Sender name</p>
												</label>
												<input
													type="text"
													value={form.sender_name || ""}
													onChange={(e) =>
														this.handleChange("sender_name", e.target.value)
													}
													maxLength={20}
													className="bg-white w-full px-3 border-0 focus-visible:outline-0 focus:border-0"
												/>
												{error_obj && error_obj.sender_name ? (
													<span className="text-red-500">
														{error_obj.sender_name[0]}
													</span>
												) : (
													""
												)}
											</form>
										</div>
										<div className="mt-6">
											<Listbox
												disabled={!refreshData.is_admin}
												onChange={(data) =>
													this.handleChange("sender_type", data)
												}
											>
												<div className="relative min-w-[14em]">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block text-black/80">
															{this.defaultValue(smtpOptions, this.state.hosts)}
														</span>
														<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
															<AiFillCaretDown
																size={12}
																className="text-black/80 opacity-80"
																aria-hidden="true"
															/>
														</span>
													</Listbox.Button>
													<Transition
														as={Fragment}
														leave="transition ease-in duration-100"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Listbox.Options className="absolute max-h-60 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
															{smtpOptions.map((sort, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		sort.value === this.state.hosts
																			? "bg-[#00000008] text-black font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={sort}
																>
																	<span
																		className={`block ${
																			sort.value === this.state.hosts
																				? "text-black font-semibold"
																				: "text-gray-900 font-medium"
																		}`}
																	>
																		{sort.text}
																	</span>
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</Listbox>
											{error_obj && error_obj.sender_type ? (
												<span className="text-red-500">{error_obj.sender_type[0]}</span>
											) : (
												""
											)}
											<div
												className="text-red-700 [&>p]:mt-0"
												dangerouslySetInnerHTML={{
													__html: form.smtp_info_message,
												}}
											></div>
										</div>
									</div>
									<div className="col-span-12 my-6">
										<div className="grid grid-cols-12 gap-5">
											<div className="sm:col-span-6 col-span-12">
												{form.smtp_port === 465 ? (
													<label
														htmlFor="ssl"
														className="cursor-pointer flex items-center text-[15px] font-normal"
													>
														<input
															id="ssl"
															type="checkbox"
															name="review_visible"
															checked={form.enable_ssl === 1 ? true : false}
															onChange={(e) =>
																this.handleChange(
																	"enable_ssl",
																	e.target.checked ? 1 : 0
																)
															}
															className="hidden peer"
														/>
														<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
														Enable SSL
													</label>
												) : (
													<label
														htmlFor="ssl"
														className="cursor-pointer flex items-center text-[15px] font-normal"
													>
														<input
															id="ssl"
															type="checkbox"
															name="review_visible"
															checked={form.enable_ssl === 1 ? true : false}
															onChange={(e) =>
																this.handleChange(
																	"enable_ssl",
																	e.target.checked ? 1 : 0
																)
															}
															className="hidden peer"
														/>
														<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
														Enable SSL
													</label>
												)}
											</div>
											<div className="sm:col-span-6 col-span-12 flex justify-end items-center">
												{error_message ? (
													<span className="mr-4 red text-[12px]">
														{error_message}
													</span>
												) : (
													""
												)}
												{success_message ? (
													<span className="mr-4 success text-[12px]">
														{success_message}
													</span>
												) : (
													""
												)}
												{!form.created_at && (
													<Button
														type="button"
														onClick={() => this.testSaveSmtpForm(form)}
														text="Test & Save"
														prefix={
															is_loading ? (
																<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2 text-[10px] text-white w-5 h-5" />
															) : (
																""
															)
														}
														className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													/>
												)}
												{form.created_at && (
													<Button
														type="button"
														onClick={this.disconnectSmtp}
														text="Disconnect"
														prefix={
															is_loading ? (
																<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2 text-[10px] text-white w-5 h-5" />
															) : (
																""
															)
														}
														className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#c82333] text-white hover:opacity-80 ml-6"
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							{form.created_at && (
								<div className="rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white overflow-hidden mt-6">
									<div className="p-[0.75rem_1.25rem] bg-white border-b-[1px] border-[#00000020] font-medium flex items-center justify-between">
										Settings
										<div
											onClick={this.updateSmtpMailboxSettings}
											className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 float-right cursor-pointer"
										>
											{
												this.state.loading ? <FaSpinner className="animate-[spin_2s_linear_infinite]" /> : "Save"
											}
										</div>
									</div>
									<div className="p-[1.25rem]">
										<div className="grid grid-cols-12 gap-5">
											<div className="col-span-4">
												<label className="text-[13px]">
													Daily (24 Hour) Sending Limit
												</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] read-only:bg-[#e9ecef] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={form.daily_limit}
													type="number"
													onChange={(e) =>
														this.handleChange("daily_limit", e.target.value)
													}
													name="daily_limit"
													readOnly
												/>
												{form.daily_limit > form.daily_max_limit && (
													<p className="red">
														{form.daily_max_limit} maximum limit for daily
														sending emails.
													</p>
												)}
												<p className="text-[#6c757d]">
													Limit on the # of emails to send per day through
													influencify We recommend you to set it to either 100
													or 400, depending on the type of SMTP account. Note in
													reality this limit may be much lower.
												</p>
											</div>
											<div className="col-span-4">
												<label className="text-[13px]">
													Maximum # of Emails to Send Per Hour
												</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] read-only:bg-[#e9ecef] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={form.hourly_limit}
													type="number"
													onChange={(e) =>
														this.handleChange("hourly_limit", e.target.value)
													}
													name="hourly_limit"
													readOnly
												/>
												{form.hourly_limit > form.hourly_max_limit && (
													<p className="red">
														Maximum {form.hourly_max_limit} Emails to Send Per
														Hour.
													</p>
												)}
												<p className="text-[#6c757d]">
													{
														"Limit on the # of emails to send per hour through influencify We recommend it to be no higher then 100, as a high limit may cause your emails to be spam blocked.This number cannot be greater than 500."
													}
												</p>
											</div>
											<div className="col-span-4">
												<label className="text-[13px]">
													Minimum Delay Between Emails (in seconds)
												</label>
												<input
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] read-only:bg-[#e9ecef] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={form.delay_sending}
													type="number"
													onChange={(e) =>
														this.handleChange("delay_sending", e.target.value)
													}
													name="delay_sending"
													min={60}
													max={84600}
												/>
												{form.delay_sending < 60 && (
													<p className="red">Delay not less than 60 seconds</p>
												)}
												{form.delay_sending > 84600 && (
													<p className="red">
														Delay not greater than 84600 seconds
													</p>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ smtp, HeaderReducer }) => {
	return {
		fetch_loading: smtp.fetch_loading,
		form: smtp.form,
		is_loading: smtp.is_loading,
		error_obj: smtp.error_obj,
		error_message: smtp.error_message,
		success_message: smtp.success_message,
		test_loading: smtp.test_loading,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { types, actions } = require("@store/redux/SmtpRedux");
	return {
		fetchSmtp: (data) => {
			actions.fetchSmtp(dispatch, data);
		},
		addForm: (data) => {
			dispatch({ type: types.HANDLE_SMTP_FORM_CHANGE, data: data });
		},
		testSaveSmtp: (data) => {
			actions.testSaveSmtp(dispatch, data);
		},
		testSmtp: (data) => {
			actions.testSmtp(dispatch, data);
		},
		disconnectSmtpMail: () => {
			actions.disconnectSmtpMail(dispatch);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandSettingSmtp);
