import { Component } from "react";
import CardsAddComponent from "@components/CardsAddComponent";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import * as settingPaymentActionCreator from "@store/actions/SettingPaymentActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Noty from "noty";
import Api from "@services/axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

class SettingBrandPaymentComponent extends Component {
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
				Api.HandleRemoveCard().then((res) => {
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
		if (this.props.isLoading) {
			return <Loader />;
		}
		if (this.props.refreshData.is_appsumo === true) {
			//this.props.history.replace('/billing');
		}
		const { defaultPaymentMethod } = this.props;
		return (
			<div className="w-full">
				{/* <h4 className="mt-4 text-[20px]">Credit Card</h4>
				<p className="bg-[#fff3cd] border-[1px] border-[#ffecb5] text-[#664d03] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
					You need to add a credit card first.
				</p>
				{defaultPaymentMethod &&
				typeof defaultPaymentMethod === "object" &&
				Object.keys(defaultPaymentMethod).length > 0 ? null : (
					<Elements stripe={stripePromise}>
						<CardsAddComponent
							handleChange={this.props.handleChange}
							errorsObj={this.props.errorsObj}
							handleAddNewCard={this.handleAddNewCard}
							activePaymentGateway={this.props.activePaymentGateway}
							currentLoggedUser={this.props.currentLoggedUser}
							handleFetchCreditCards={this.props.handleFetchCreditCards}
						/>
					</Elements>
				)} */}
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
)(SettingBrandPaymentComponent);
