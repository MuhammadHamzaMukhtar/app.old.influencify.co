import { Component, Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandPermissionTopTab from "@components/SettingBrandPermissionTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Avatar from "@assets/avatar.png";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import BrandAvatarModal from "@components/BrandAvatarModal";
import Button from "@components/global/Button";
import axios from "axios";

const brandOptions = [
	{
		key: "select",
		text: "Select Role",
		value: "",
	},
	{
		key: "User",
		text: "User",
		value: "user",
	},
	{
		key: "Admin",
		text: "Admin",
		value: "admin",
	},
];

class BrandSettingPermission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrayValue: [],
			showPopup: false,
			file: null,
			brand_id: null,
			isLoading: false,
		};
		this.timer = null;
	}

	deleteBrand = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this brand?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes, do it",
			cancelButtonText: "No!",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				this.props.deleteSubAccount(id);
			}
		});
	};

	updateValue = (index, key, value, id) => {
		const arrayValue = this.state.arrayValue;
		arrayValue[id] = value;
		this.setState({ arrayValue });
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.props.updateSubAccountData({
				index,
				key,
				value,
				id,
				main_account: localStorage.getItem("main_account"),
			});
			this.setState({ arrayValue: [] });
		}, 2000);
	};

	addForm = (key, value) => {
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
	};

	sendInvitation = () => {
		const data = Object.assign({}, this.props.form);
		this.props.sendSubAccountInvitation(data);
	};

	removeUser = (index, key, email, id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to remove this email",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				this.props.removeSubAccountUser({ index, key, email, id });
			}
		});
	};

	onDrop = (pictureFiles) => {
		this.setState({ file: pictureFiles[0] });
	};

	handleAvatarChange = async () => {
		if (this.state.file) {
			this.setState({ isLoading: true });
			const data = new FormData();
			data.append("user_id", this.state.brand_id);
			data.append("file", this.state.file);
			const json = await axios.post(
				process.env.REACT_APP_BASE_URL + "/api/v1/upload-sub-account-avatar",
				data
			);
			if (json.data === "success") {
				this.props.fetchSubAccount({
					main_account: localStorage.getItem("main_account"),
				});
				this.setState({
					file: null,
					brand_id: null,
					showPopup: false,
				});
			}
			this.setState({ isLoading: false });
		}
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const {
			subAccounts,
			mainAccount,
			isSending,
			form,
			errors,
			updateProcess,
			refreshData,
		} = this.props;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		let brands = subAccounts &&
			subAccounts.length >= 0 && [
				{
					key: (mainAccount || {}).id,
					text: (mainAccount || {}).name,
					value: (mainAccount || {}).id,
				},
				...subAccounts
					.filter(
						(i) =>
							mainAccount.id === i.parent_id ||
							(i.parent_id &&
								i.users &&
								i.users.length > 0 &&
								i.users.filter(
									(u) => u.email === mainAccount.email && u.role === "admin"
								).length > 0)
					)
					.map((i) => {
						return {
							key: i.id,
							text: i.name,
							value: i.id,
						};
					}),
			];
		return (
			<div>
				<SettingHeader />
				<SettingBrandPermissionTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							{refreshData.is_main && (
								<>
									{refreshData.is_addon && (
										<div className="grid grid-cols-12 gap-5 items-end mb-12">
											<div className="lg:col-span-4 md:col-span-6 col-span-12">
												<p className="text-[14px] dark">Email address</p>
												<input
													type="email"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={form.email ? form.email : ""}
													onChange={(e) =>
														this.addForm("email", e.target.value)
													}
												/>
											</div>
											<div className="lg:col-span-2 md:col-span-4 col-span-12">
												<p className="text-[14px] dark">Role</p>
												<Listbox
													defaultValue={form.role ? form.role : ""}
													onChange={(data) => this.addForm("role", data.value)}
												>
													<div className="relative w-full">
														<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
															<span className="block">
																{this.defaultValue(
																	brandOptions,
																	form.role ? form.role : ""
																)}
															</span>
															<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																<AiFillCaretDown
																	size={12}
																	className="text-black opacity-80"
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
															<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
																{brandOptions.map((role, key) => (
																	<Listbox.Option
																		key={key}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${role.value === form.role
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																			}`}
																		value={role}
																	>
																		<span
																			className={`block ${role.value === form.role
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																				}`}
																		>
																			{role.text}
																		</span>
																	</Listbox.Option>
																))}
															</Listbox.Options>
														</Transition>
													</div>
												</Listbox>
											</div>
											<div className="lg:col-span-2 md:col-span-4 col-span-12">
												<p className="text-[14px] dark">Brand</p>
												<Listbox
													defaultValue={form.brand ? form.brand : ""}
													onChange={(data) => this.addForm("brand", data.value)}
												>
													<div className="relative w-full">
														<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
															<span className="block">
																{form.brand
																	? this.defaultValue(brands, form.brand)
																	: "Choose Brand"}
															</span>
															<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																<AiFillCaretDown
																	size={12}
																	className="text-black opacity-80"
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
															<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
																{brands.map((role, key) => (
																	<Listbox.Option
																		key={key}
																		className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${role.value === form.brand
																			? "bg-[#00000008] purple font-semibold"
																			: "text-gray-900 font-medium"
																			}`}
																		value={role}
																	>
																		<span
																			className={`block ${role.value === form.brand
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																				}`}
																		>
																			{role.text}
																		</span>
																	</Listbox.Option>
																))}
															</Listbox.Options>
														</Transition>
													</div>
												</Listbox>
											</div>
											<div className="lg:col-span-4 col-span-12 text-right">
												<Button
													disabled={
														Object.hasOwn(form, "email") &&
															Object.hasOwn(form, "role") &&
															form.role !== "" &&
															Object.hasOwn(form, "brand")
															? false
															: true
													}
													type="button"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
													onClick={this.sendInvitation}
													text={isSending ? (
														// <div className="px-12 w-full flex justify-end mb-3">
														<FaSpinner className="animate-[spin_2s_linear_infinite] white text-[19px]" />
														// </div>
													) : ("Add")}
												/>
											</div>
											<div className="lg:col-span-4 col-span-12">
												{errors &&
													Object.keys(errors).length > 0 &&
													Object.keys(errors).map((item, key) => (
														<p key={key} className="red">
															{errors[item][0]}
														</p>
													))}
											</div>
										</div>
									)}
									{mainAccount && mainAccount.id && (
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-6 mb-4">
											<div className="grid grid-cols-12 gap-5">
												<div className="lg:col-span-2 col-span-12 text-center flex justify-center">
													<div className="w-24 h-24 overflow-hidden rounded-[8px] mx-auto relative">
														<img
															src={
																mainAccount.profile_pic
																	? process.env.REACT_APP_AWS_URl +
																	"/" +
																	mainAccount.profile_pic
																	: Avatar
															}
															alt="avatar"
															className="object-cover w-24 h-24 rounded-full"
														/>
														<div
															className="shadow-[0px_4px_5px_#96969640] top-0 right-0 mr-1 mt-1 flex justify-center items-center w-8 h-8 text-[14px] absolute cursor-pointer p-1 bg-white rounded-full"
															onClick={() =>
																this.setState({
																	showPopup: true,
																	brand_id: mainAccount.id,
																})
															}
														>
															<RiImageEditLine className="text-[14px]" />
														</div>
													</div>
												</div>
												<div className="lg:col-span-10 col-span-12">
													<div className="grid grid-cols-12 gap-5 items-center">
														<div className="lg:col-span-3 col-span-12">
															<h6 className="font-medium black text-[14px]">
																Brand Name:
															</h6>
														</div>
														<div className="lg:col-span-5 col-span-12">
															<p className="font-normal black">
																{mainAccount.name}
															</p>
														</div>
													</div>
													<div className="w-full my-[1rem] bg-[#0000001a] h-[1px]" />
													<div className="grid grid-cols-12 gap-5 items-center">
														<div className="lg:col-span-3 col-span-12">
															<h6 className="font-medium black text-[14px]">
																Users:
															</h6>
														</div>
														<div className="lg:col-span-5 col-span-12">
															<div className="flex justify-between">
																<div>
																	{mainAccount.users &&
																		mainAccount.users.length > 0
																		? mainAccount.users.map((main, i) => (
																			<div
																				className="flex flex-row mb-2 justify-between"
																				key={i}
																			>
																				<div className="font-normal black">
																					{main.email}{" "}
																					<span className="p-[.1em_.4em] bg-[#007bff] rounded-[.25rem] text-[12px] text-white">
																						{main.role}
																					</span>{" "}
																					(
																					{main.status === 0
																						? "pending"
																						: "accepted"}
																					)
																				</div>
																				<div
																					className="pink ml-2 cursor-pointer"
																					onClick={() =>
																						this.removeUser(
																							undefined,
																							"users",
																							main.email,
																							main.id
																						)
																					}
																				>
																					Remove
																				</div>
																			</div>
																		))
																		: "None"}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
									{subAccounts &&
										subAccounts.length > 0 &&
										subAccounts.map((account, key) => (
											<div
												className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-6 mb-4"
												key={key}
											>
												<div className="grid grid-cols-12 gap-5">
													<div className="lg:col-span-2 col-span-12 text-center pl-0">
														<div className="w-24 h-24 overflow-hidden rounded-[8px] mx-auto relative">
															<img
																src={
																	account.profile_pic
																		? process.env.REACT_APP_AWS_URl +
																		"/" +
																		account.profile_pic
																		: Avatar
																}
																alt="avatar"
																className="object-cover w-24 h-24 rounded-full"
															/>
															{(mainAccount.id === account.parent_id ||
																(account.parent_id &&
																	account.users &&
																	account.users.length > 0 &&
																	account.users.filter(
																		(i) =>
																			i.email === mainAccount.email &&
																			i.role === "admin"
																	).length > 0)) && (
																	<div
																		className="shadow-[0px_4px_5px_#96969640] top-0 right-0 mr-1 mt-1 flex justify-center items-center w-8 h-8 text-[14px] absolute cursor-pointer p-1 bg-white rounded-full"
																		onClick={() =>
																			this.setState({
																				showPopup: true,
																				brand_id: account.id,
																			})
																		}
																	>
																		<RiImageEditLine className="text-[14px]" />
																	</div>
																)}
														</div>
													</div>
													<div className="lg:col-span-10 col-span-12">
														<div className="grid grid-cols-12 gap-5 items-center">
															<div className="lg:col-span-3 col-span-12">
																<h6 className="font-medium black text-[14px]">
																	Brand Name:
																</h6>
															</div>
															<div className="lg:col-span-5 col-span-12">
																<p className="font-normal black">
																	{account.name}
																</p>
															</div>
															{(mainAccount.id === account.parent_id ||
																(account.parent_id &&
																	account.users &&
																	account.users.length > 0 &&
																	account.users.filter(
																		(i) =>
																			i.email === mainAccount.email &&
																			i.role === "admin"
																	).length > 0)) && (
																	<div className="lg:col-span-4 col-span-12">
																		<div className="flex items-center justify-end">
																			<p className="black whitespace-nowrap mr-6 font-medium">
																				Credits Quota
																			</p>
																			{updateProcess?.[account.id] ? (
																				<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
																			) : (
																				<input
																					type="number"
																					className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																					min="0"
																					value={
																						typeof this.state.arrayValue[
																							account.id
																						] !== "undefined"
																							? this.state.arrayValue[account.id]
																							: account
																								.latest_subscription_reports
																								?.credits
																					}
																					onChange={(e) =>
																						this.updateValue(
																							key,
																							"latest_subscription_reports",
																							e.target.value,
																							account.id
																						)
																					}
																				/>
																			)}
																		</div>
																	</div>
																)}
														</div>
														<div className="w-full my-[1rem] bg-[#0000001a] h-[1px]" />
														<div className="grid grid-cols-12 gap-5 items-center">
															<div className="lg:col-span-2 col-span-12">
																<h6 className="font-medium black text-[14px]">
																	Users:
																</h6>
															</div>
															<div className="lg:col-span-6 col-span-12">
																<div className="flex justify-between">
																	<div>
																		{account.users && account.users.length > 0
																			? account.users.map((user, i) => (
																				<div
																					className="flex flex-row mb-2 justify-between"
																					key={i}
																				>
																					<div className="font-normal black">
																						{user.email}{" "}
																						<span className="p-[.1em_.4em] bg-[#007bff] rounded-[.25rem] text-[12px] text-white">
																							{user.role}
																						</span>{" "}
																						(
																						{user.status === 0
																							? "pending"
																							: "accepted"}
																						)
																					</div>

																					{(mainAccount.id ===
																						account.parent_id ||
																						(account.parent_id &&
																							account.users.filter(
																								(i) =>
																									i.email ===
																									mainAccount.email &&
																									i.role === "admin"
																							).length > 0 &&
																							mainAccount.email !==
																							user.email)) && (
																							<div
																								className="pink ml-2 cursor-pointer"
																								onClick={() =>
																									this.removeUser(
																										key,
																										"users",
																										user.email,
																										user.id
																									)
																								}
																							>
																								Remove
																							</div>
																						)}
																				</div>
																			))
																			: "None"}
																	</div>
																</div>
															</div>
															{mainAccount.id === account.parent_id && (
																<div className="lg:col-span-4 col-span-12">
																	<div className="flex items-center justify-end">
																		<Button
																			type="button"
																			className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80"
																			onClick={() =>
																				this.deleteBrand(account.id)
																			}
																			text="Delete Brand"
																		/>
																	</div>
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
								</>
							)}
						</div>
					</div>
				</div>
				<BrandAvatarModal
					show={this.state.showPopup}
					onHide={() => this.setState({ showPopup: false })}
					onDrop={this.onDrop}
					handleChangeAvatar={() => this.handleAvatarChange()}
					isLoading={this.state.isLoading}
					singleImage={true}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		subAccounts: state.subAccount.data,
		mainAccount: state.subAccount.main,
		isSending: state.subAccount.isSending,
		form: state.subAccount.form,
		errors: state.subAccount.invitationError,
		updateProcess: state.subAccount.updateProcess,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/SubAccountRedux");
	return {
		fetchSubAccount: (data) => {
			actions.fetchSubAccount(dispatch, data);
		},
		submitSubAccount: (data) => {
			return actions.submitSubAccount(dispatch, data);
		},
		deleteSubAccount: (id) => {
			return actions.deleteSubAccount(dispatch, id);
		},
		updateSubAccountData: (data) => {
			actions.updateSubAccountData(dispatch, data);
		},
		removeSubAccountUser: (data) => {
			actions.removeSubAccountUser(dispatch, data);
		},
		sendSubAccountInvitation: (data) => {
			actions.sendSubAccountInvitation(dispatch, data);
		},
		addForm: (data) => {
			actions.addForm(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingPermission);
