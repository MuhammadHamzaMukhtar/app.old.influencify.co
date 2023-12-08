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
				if (json.status == 200) {
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
		if (localStorage.getItem("role") != "brand") {
			window.location.href = "/";
		}
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandPermissionTopTab />
				<div className="containers mb-12">
					<div className="flex flex-wrap justify-center">
						<div className="md:w-3/12 sm:7/12 w-full px-[1rem]">
							<SettingBrandSidebar />
						</div>
						<div className="md:w-9/12 w-full mt-12 md:!mt-0 px-[1rem]">
							{refreshData.is_main && (
								<>
									{invitation && invitation.length > 0 ? (
										invitation.map((item, key) => (
											<div
												className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-[1rem] mb-4"
												key={key}
											>
												<div className="flex flex-wrap">
													<div calssName="lg:w-2/12 w-full pr-[1rem] text-center">
														<img
															src={Avatar}
															alt="avatar"
															className="rounded-[8px] w-[100px] h-[100px]"
														/>
													</div>
													<div className="lg:w-10/12 w-full px-[1rem]">
														<div className="flex flex-wrap items-center">
															<div className="lg:w-3/12 w-full px-[1rem]">
																<h6 className="black text-[14px]">
																	Brand Name:
																</h6>
															</div>
															<div className="lg:w-5/12 w-full px-[1rem]">
																<p className="font-normal black">
																	{item.account.name}
																</p>
															</div>
														</div>
														<hr />
														<div className="flex flex-wrap items-center">
															<div className="w-full px-[1rem]">
																<p>
																	{`You have been invited to join `}
																	<b>{item.account.name}</b>
																	{" account"}
																</p>
																<p className="mt-2">
																	Status:{" "}
																	<b>
																		{item.status == 0 ? "Pending" : "Joined"}
																	</b>
																</p>
																{item.status == 0 && (
																	<div className="flex mt-2 items-center justify-start">
																		<Button
																			type="button"
																			className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mr-2"
																			text="Accept"
																			onClick={() => this.accept(item.id)}
																		/>
																		<Button
																			type="button"
																			text="Reject"
																			className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#bb2d3b] text-white hover:opacity-80"
																			onClick={() => this.reject(item.id)}
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
										<div className="bg-[#fff3cd] border-[1px] border-[#ffecb5] text-[#664d03] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem] text-center">
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
