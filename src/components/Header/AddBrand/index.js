import { Component, Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";
import "./styles.css";
import { connect } from "react-redux";

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

class Addbrand extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			showTab: false,
			loading: false,
		};
	}

	componentDidMount() {
		const data = { main_account: localStorage.getItem("main_account") };
		this.props.fetchSubAccount(data);
	}

	openAddbrand = () => {
		this.setState({ open: true, showTab: false });
	};

	closeAddbrand = () => {
		this.setState({ open: false, showTab: false });
	};

	addForm = (key, value) => {
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
	};

	createAccount = async () => {
		const form = Object.assign({}, this.props.form);
		form["main_account"] = localStorage.getItem("main_account");
		const json = await this.props.submitSubAccount(form);
		if (json.status === 200) {
			this.addForm("brand", json.data.id);
			this.setState({ showTab: true });
		}
	};

	inviteMembers = async () => {
		this.setState({ showTab: true });
		const data = Object.assign({}, this.props.form);
		const json = await this.props.sendSubAccountInvitation(data);
		if (json.status === 200) {
			this.setState({ open: false, showTab: false });
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
		const form = Object.assign({}, this.props.form);
		const { errors, isSubmitting, isSending, invitationError } = this.props;
		const { showTab } = this.state;
		let role = form.role ? form.role : "";
		return (
			<>
				<Transition appear show={this.state.open} as={Fragment}>
					<Dialog onClose={this.closeAddbrand} className="relative z-[9999]">
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
										<h2 className="text-[24px] font-medium text-black">
											Add sub-account (Brand)
										</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.closeAddbrand}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										{!showTab ? (
											<div className="grid grid-cols-12 gap-5 items-center">
												<div className="sm:col-span-6 col-span-12">
													<div className="pt-3">
														<label className="text-[12px] black font-normal mb-0">
															Name
														</label>
														<input
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															value={form.name}
															type="text"
															onChange={(e) =>
																this.addForm("name", e.target.value)
															}
														/>
														{errors &&
															Object.keys(errors).length > 0 &&
															Object.keys(errors).map((item, key) => (
																<p key={key} className="red">
																	{errors[item][0]}
																</p>
															))}
													</div>
												</div>
												<div className="sm:col-span-6 col-span-12">
													<div className="pt-3">
														<label className="text-[12px] black font-normal mb-0 flex items-center">
															Credits Quota
															<Tooltip
																trigger={
																	<div className="ml-2">
																		<BsQuestionCircle
																			className="dark"
																			size={16}
																		/>
																	</div>
																}
																tooltipText="How many credits to allocate from your main
																account to this sub-account"
																placement="top-left"
															/>
														</label>
														<input
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															value={form.credits}
															type="number"
															onChange={(e) =>
																this.addForm("credits", e.target.value)
															}
														/>
													</div>
												</div>
												<div className="flex items-center justify-end mt-12 col-span-12">
													<Button
														className="mt-0 bg-gray-200 mr-2 sm:!mt-4 w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center text-gray hover:opacity-80"
														onClick={() => this.setState({ open: false })}
														text="Cancel"
													/>
													<Button
													className="mt-0 sm:!mt-4 ml-2 w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
													onClick={this.createAccount}
													text={isSubmitting?<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-[19px]" />:"Create"}
													/>
													
												</div>
											</div>
										) : (
											<div className="grid grid-cols-12 gap-5">
												<div className="sm:col-span-6 col-span-12">
													<div className="pt-3">
														<label className="text-[12px] black font-normal mb-0">
															Email
														</label>
														<input
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															type="text"
															value={form.email ? form.email : ""}
															onChange={(e) =>
																this.addForm("email", e.target.value)
															}
														/>
													</div>
												</div>
												<div className="sm:col-span-6 col-span-12">
													<div className="pt-3">
														<label className="text-[12px] black font-normal mb-0">
															Role
														</label>
														<Listbox
															onChange={(data) => this.addForm("role", data)}
														>
															<div className="relative w-full z-50">
																<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
																	<span className="block">
																		{this.defaultValue(brandOptions, role)}
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
																		{brandOptions.map((sort, key) => (
																			<Listbox.Option
																				key={key}
																				className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																					sort.value === role
																						? "bg-[#00000008]"
																						: ""
																				}`}
																				value={sort.value}
																			>
																				<span
																					className={`block ${
																						sort.value === role
																							? "purple font-semibold"
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
													</div>
												</div>
												<div className="col-span-12">
													{invitationError &&
														Object.keys(invitationError).length > 0 &&
														Object.keys(invitationError).map((item, key) => (
															<p key={key} className="red">
																{invitationError[item][0]}
															</p>
														))}
												</div>
												<div className="flex items-center justify-end mt-12 col-span-12">
													<Button
														className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray text-black hover:opacity-80 mr-4"
														onClick={() => this.setState({ open: false })}
														text="Cancel"
													/>
													{isSending ? (
														<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-[19px]" />
													) : (
														<Button
															className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															onClick={this.inviteMembers}
															text="Invite"
														/>
													)}
												</div>
											</div>
										)}
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
		isSubmitting: state.subAccount.isSubmitting,
		isSending: state.subAccount.isSending,
		form: state.subAccount.form,
		errors: state.subAccount.error,
		invitationError: state.subAccount.invitationError,
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
		sendSubAccountInvitation: (data) => {
			return actions.sendSubAccountInvitation(dispatch, data);
		},
		addForm: (data) => {
			actions.addForm(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
	forwardRef: true,
})(Addbrand);
