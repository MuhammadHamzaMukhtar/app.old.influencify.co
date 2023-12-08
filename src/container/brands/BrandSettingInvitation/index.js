import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandPermissionTopTab from "@components/SettingBrandPermissionTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Avatar from "@assets/avatar.png";
import Swal from "sweetalert2";
import { connect } from "react-redux";

class BrandSettingInvitation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrayValue: [],
		};
		this.timer = null;
	}

	componentDidMount() {
		const data = { main_account: localStorage.getItem("main_account") };
		this.props.fetchInvitation(data);
	}

	accept = (id) => {
		const data = { id: id, main_account: localStorage.getItem("main_account") };
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to accept this invitation?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Accept",
			cancelButtonText: "Cancel",
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
		}).then(async (result) => {
			if (result.value) {
				const json = await this.props.acceptInvitation(data);
				if (json.status === 200) {
					const data = { main_account: localStorage.getItem("main_account") };
					this.props.fetchSubAccount(data);
				}
			}
		});
	};

	reject = (id) => {
		const data = { id: id, main_account: localStorage.getItem("main_account") };
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to reject this invitation?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Reject",
			cancelButtonText: "Cancel",
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
				this.props.rejectInvitation(data);
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

	render() {
		const { invitation, refreshData } = this.props;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		return (
			<div className="setting-tab-navigation">
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
									{invitation && invitation.length > 0 ? (
										invitation.map((item, key) => (
											<div
												className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-12"
												key={key}
											>
												<div className="grid grid-cols-12">
													<div calssName="lg:col-span-2 col-span-12 text-center">
														<img
															src={Avatar}
															alt="avatar"
															className="rounded-[8px] max-w-[100px] max-h-[100px] object-contain"
														/>
													</div>
													<div className="lg:col-span-10 col-span-12 space-y-4 lg:ml-10 ml-0">
														<div className="grid grid-cols-12 gap-5 items-center">
															<div className="col-span-12">
																<h6 className="black text-[14px]">
																	Brand Name : {item.account.name}
																</h6>
															</div>
														</div>
														<hr />
														<div className="grid grid-cols-12 gap-5 items-center">
															<div className="col-span-12">
																<p>
																	{`You have been invited to join `}
																	<b>{item.account.name}</b>
																	{" account"}
																</p>
																<p className="mt-2">
																	Status:{" "}
																	<b>
																		{item.status === 0 ? "Pending" : "Joined"}
																	</b>
																</p>
																{item.status === 0 && (
																	<div className="flex mt-4 items-center justify-start">
																		<Button
																			type="button"
																			className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-2"
																			onClick={() => this.accept(item.id)}
																			text="Accept"
																		/>
																		<Button
																			type="button"
																			className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80"
																			onClick={() => this.reject(item.id)}
																			text="Reject"
																		/>
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="bg-[#fff3cd] text-[#856404] p-[0.75rem_1.25rem] mb-[1rem] rounded-[8px] text-[14px] text-center">
											You have no invitation request.
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
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
		invitation: state.subAccount.invitation,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/SubAccountRedux");
	return {
		fetchInvitation: (data) => {
			actions.fetchInvitation(dispatch, data);
		},
		acceptInvitation: (data) => {
			return actions.acceptInvitation(dispatch, data);
		},
		rejectInvitation: (data) => {
			actions.rejectInvitation(dispatch, data);
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
		fetchSubAccount: (data) => {
			actions.fetchSubAccount(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingInvitation);
