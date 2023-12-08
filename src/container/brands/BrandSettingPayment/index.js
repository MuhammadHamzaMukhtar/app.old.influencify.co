import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandBillingTopTab from "@components/SettingBrandBillingTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import CardsAddComponent from "@components/CardsAddComponent";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
// import Loader from "@components/global/Loader";
import * as settingPaymentActionCreator from "@store/actions/SettingPaymentActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import DefaultCardPayment from "@components/DefaultCardPayment";
import Noty from "noty";
import Api from "@services/axios";
import { FaSpinner } from "react-icons/fa";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

class BrandSettingPayment extends Component {
	componentDidMount = () => {
		this.props.handleFetchCreditCards();
	};

	handleAddNewCard = (event) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to add this credit card?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes",
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
				const query = {
					card_holder_name: this.props.card_holder_name,
					card_number: this.props.card_number,
					card_expiry_month: this.props.card_expiry_month,
					card_expiry_year: this.props.card_expiry_year,
					card_cvv: this.props.card_cvv,
				};
				this.props.handleAddCreditCard(query);
				this.props.handleFetchCreditCards();
			}
		});
	};

	handleRemoveCard = (event) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to delete this credit card?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes",
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
			allowOutsideClick: () => Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				// axios.post(helper.url + '/api/v1/remove-credit-card')
				Api.RemoveCard().then((res) => {
					this.props.handleRemoveCreditCard();
					this.props.handleFetchCreditCards();
				});
			}
		});
	};

	handleUpdateBillingAddress = (event) => {
		const query = {
			billing_name: this.props.billing_name,
			billing_vat_id: this.props.billing_vat_id,
			billing_email: this.props.billing_email,
			billing_address: this.props.billing_address,
			billing_city: this.props.billing_city,
			billing_state: this.props.billing_state,
			billing_country: this.props.billing_country,
			billing_zip_code: this.props.billing_zip_code,
			split_bills_flag: this.props.split_bills_flag,
		};
		this.props.handleBillingAddressUpdate(query);
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

	render() {
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			//this.props.history.replace('/billing');
		}
		// if (this.props.isLoading) {
		// 	return (
		// 		<Loader
		// 			className="h-[87vh] w-full flex justify-center items-center"
		// 			size="67"
		// 		/>
		// 	);
		// }
		if (this.props.refreshData.is_appsumo === true) {
			//this.props.history.replace('/billing');
		}
		const { defaultPaymentMethod } = this.props;
		return (
			<div>
				<SettingHeader />
				<SettingBrandBillingTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
							{this.props.invoice_flag ? (
								<Button
									onClick={() => this.handleUpdateBillingAddress()}
									className="w-full mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
									text={
										this.props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
										) : (
											"Save Changes"
										)
									}

								/>
							) : (
								""
							)}
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							{this.props.refreshData.is_main && (
								<>
									<h4 className="my-4 text-[20px]">Credit Card</h4>
									{defaultPaymentMethod &&
									typeof defaultPaymentMethod === "object" &&
									Object.keys(defaultPaymentMethod).length > 0 ? (
										<DefaultCardPayment
											creditCard={defaultPaymentMethod}
											removeCard={this.handleRemoveCard}
										/>
									) : (
										<Elements stripe={stripePromise}>
											<CardsAddComponent
												handleChange={this.props.handleChange}
												errorsObj={this.props.errorsObj}
												handleAddNewCard={this.handleAddNewCard}
												activePaymentGateway={this.props.activePaymentGateway}
												currentLoggedUser={this.props.currentLoggedUser}
												handleFetchCreditCards={
													this.props.handleFetchCreditCards
												}
											/>
										</Elements>
									)}
									<div className="mb-2 mt-4">
										<label
											htmlFor="login"
											className="cursor-pointer flex items-center text-[15px] font-normal"
										>
											<input
												id="login"
												type="checkbox"
												onChange={(e) => this.props.handleChange(e)}
												name="invoice_flag"
												className="hidden peer"
											/>
											<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
											Invoice required
										</label>
									</div>
									{this.props.invoice_flag ? (
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px] space-y-5">
											<h4 className="mb-6 mt-2 text-[20px] font-semibold">
												Billing address
											</h4>
											<div className="grid grid-cols-12 gap-5">
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														Name
													</label>
													<input
														type="text"
														placeholder="Billing name"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_name"
													/>
													{this.props.errorsObj?.billing_name ? (
														<span className="red">
															{this.props.errorsObj.billing_name[0]}
														</span>
													) : (
														""
													)}
												</div>
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														VAT ID
													</label>
													<input
														type="text"
														placeholder="Billing VAT ID"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_vat_id"
													/>
													{this.props.errorsObj?.billing_vat_id ? (
														<span className="red">
															{this.props.errorsObj.billing_vat_id[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5">
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														Country
													</label>
													<input
														type="text"
														placeholder="Billing country"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_country"
													/>
													{this.props.errorsObj?.billing_country ? (
														<span className="red">
															{this.props.errorsObj.billing_country[0]}
														</span>
													) : (
														""
													)}
												</div>
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														City
													</label>
													<input
														type="text"
														placeholder="Billing city"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_city"
													/>
													{this.props.errorsObj?.billing_city ? (
														<span className="red">
															{this.props.errorsObj.billing_city[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5">
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														State (optional)
													</label>
													<input
														type="text"
														placeholder="Billing state"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_state"
													/>
													{this.props.errorsObj?.billing_state ? (
														<span className="red">
															{this.props.errorsObj.billing_state[0]}
														</span>
													) : (
														""
													)}
												</div>
												<div className="sm:col-span-6 col-span-12">
													<label className="text-[14px] font-medium">
														ZIP code
													</label>
													<input
														type="ZIP code"
														placeholder="Billing zip code"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_zip_code"
													/>
													{this.props.errorsObj?.billing_zip_code ? (
														<span className="red">
															{this.props.errorsObj.billing_zip_code[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5">
												<div className="col-span-12">
													<label className="text-[14px] font-medium">
														Address
													</label>
													<input
														type="text"
														placeholder="Billing street address"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_address"
													/>
													{this.props.errorsObj?.billing_address ? (
														<span className="red">
															{this.props.errorsObj.billing_address[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5 mt-6">
												<div className="sm:col-span-6 col-span-12">
													<h4 className="mb-6 text-[20px] font-semibold">
														Billing email
													</h4>
													<input
														type="email"
														placeholder="Billing email"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														name="billing_email"
													/>
													{this.props.errorsObj?.billing_email ? (
														<span className="red">
															{this.props.errorsObj.billing_email[0]}
														</span>
													) : (
														""
													)}
												</div>
											</div>
											<label
												htmlFor="login"
												className="cursor-pointer flex items-center text-[15px] font-normal"
											>
												<input
													id="login"
													type="checkbox"
													onChange={(e) => this.props.handleChange(e)}
													name="split_bills_flag"
													className="hidden peer"
												/>
												<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
												Split bills by Brands
											</label>
										</div>
									) : (
										""
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
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isLoading: state.SettingPaymentReducer.isLoading,
		errorsObj: state.SettingPaymentReducer.errorsObj,
		card_holder_name: state.SettingPaymentReducer.card_holder_name,
		card_number: state.SettingPaymentReducer.card_number,
		card_expiry_month: state.SettingPaymentReducer.card_expiry_month,
		card_expiry_year: state.SettingPaymentReducer.card_expiry_year,
		card_cvv: state.SettingPaymentReducer.card_cvv,
		card_type: state.SettingPaymentReducer.card_type,
		card_preview: state.SettingPaymentReducer.card_preview,
		invoice_flag: state.SettingPaymentReducer.invoice_flag,
		billing_name: state.SettingPaymentReducer.billing_name,
		billing_vat_id: state.SettingPaymentReducer.billing_vat_id,
		billing_email: state.SettingPaymentReducer.billing_email,
		billing_address: state.SettingPaymentReducer.billing_address,
		billing_city: state.SettingPaymentReducer.billing_city,
		billing_state: state.SettingPaymentReducer.billing_state,
		billing_country: state.SettingPaymentReducer.billing_country,
		billing_zip_code: state.SettingPaymentReducer.billing_zip_code,
		split_bills_flag: state.SettingPaymentReducer.split_bills_flag,
		cards: state.SettingPaymentReducer.cards,
		response_status: state.SettingPaymentReducer.response_status,
		activePaymentGateway: state.SettingPaymentReducer.activePaymentGateway,
		defaultPaymentMethod: state.SettingPaymentReducer.defaultPaymentMethod,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleFetchCreditCards: () =>
			dispatch(settingPaymentActionCreator.handleFetchCreditCards()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleAddCreditCard: (query) =>
			dispatch(settingPaymentActionCreator.handleAddCreditCard(query)),
		handleRemoveCreditCard: (query) =>
			dispatch(settingPaymentActionCreator.handleRemoveCreditCard(query)),
		handleBillingAddressUpdate: (query) =>
			dispatch(settingPaymentActionCreator.handleBillingAddressUpdate(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingPayment);
