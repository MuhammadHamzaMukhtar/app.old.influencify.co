import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import SelectBankCountry from "react-select";
import SelectCountry from "react-select";
import SelectCurrency from "react-select";
import { connect } from "react-redux";
import { FiX } from "react-icons/fi";
import {
	HANDLE_CHANGE_CONNECT_BANK_SUCCESS,
	HANDLE_SELECT_CHANGE_SUCCESS,
	HANDLE_SELECT_BANK_COUNTRY_SUCCESS,
	HANDLE_SELECT_CURRENCY_SUCCESS,
} from "@store/constants/action-types";
import * as settingPaymentActions from "@store/actions/SettingPaymentActions";
import { FaSpinner } from "react-icons/fa";

class SettingTabPaymentModal extends Component {
	
	handleBankAccountConnect = () => {
		let query = {
			bankCountry: this.props.bankCountry,
			accountCurrency: this.props.accountCurrency,
			accountNumber: this.props.accountNumber,
			swiftCode: this.props.swiftCode,
			accountHolderName: this.props.accountHolderName,
			accountCountry: this.props.accountCountry,
			accountCity: this.props.accountCity,
			accountZipCode: this.props.accountZipCode,
			streetAddress: this.props.streetAddress,
		};

		this.props.handleAddBankAccount(query);
		setTimeout(() => {
			if (this.props.bankAccountAdded) {
				this.props.onHide();
			}
		}, 1000);
	};

	render() {
		const countries = this.props.countries.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const currencies = this.props.currencies.map((data) => ({
			label: data.code,
			value: data.symbol,
		}));
		return (
			<Transition appear show={this.props.show} as={Fragment}>
				<Dialog onClose={this.props.onHide} className="relative z-[9999]">
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
							<Dialog.Panel className="mx-auto sm:min-w-[57rem] min-w-full rounded-[8px] bg-white">
								<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
									<h2 className="text-[24px]">Connect Bank Account</h2>
									<div
										className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
										onClick={this.props.onHide}
									>
										<FiX size={24} className="text-white stroke-white" />
									</div>
								</Dialog.Title>
								<div className="p-3">
									<form>
										<div className="grid grid-cols-12 gap-5">
											<div className="md:col-span-9 sm:col-span-8 col-span-12">
												<label className="text-[14px] font-medium">
													Bank Account Info
												</label>
												<SelectBankCountry
													value={this.props.bankCountry}
													closeMenuOnSelect={true}
													options={countries}
													isSearchable={true}
													isClearable={true}
													placeholder={"Bank Country"}
													onChange={this.props.handleSelectBankCountry}
												/>
												{this.props.errorsObj.bankCountry ? (
													<span className="red">
														{this.props.errorsObj.bankCountry[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="md:col-span-3 sm:col-span-4 col-span-12">
												<label className="text-white">.</label>
												<SelectCurrency
													value={this.props.accountCurrency}
													closeMenuOnSelect={true}
													options={currencies}
													isSearchable={true}
													isClearable={true}
													placeholder={"Currency"}
													onChange={this.props.handleSelectCurrency}
												/>
												{this.props.errorsObj.accountCurrency ? (
													<span className="red">
														{this.props.errorsObj.accountCurrency[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="md:col-span-9 sm:col-span-8 col-span-12">
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.accountNumber || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="accountNumber"
													placeholder="Account Number"
												/>
												{this.props.errorsObj.accountNumber ? (
													<span className="red">
														{this.props.errorsObj.accountNumber[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="md:col-span-3 sm:col-span-4 col-span-12">
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.swiftCode || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="swiftCode"
													placeholder="SWIFT code"
												/>
												{this.props.errorsObj.swiftCode ? (
													<span className="red">
														{this.props.errorsObj.swiftCode[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="col-span-12">
												<label className="text-[14px] font-medium">
													Account Holder's Info
												</label>
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.accountHolderName || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="accountHolderName"
													placeholder="Account Holder Name"
												/>
												{this.props.errorsObj.accountHolderName ? (
													<span className="red">
														{this.props.errorsObj.accountHolderName[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="lg:col-span-4 md:col-span-6 col-span-12">
												<SelectCountry
													value={this.props.accountCountry}
													closeMenuOnSelect={true}
													options={countries}
													isSearchable={true}
													isClearable={true}
													placeholder={"Country"}
													onChange={this.props.handleSelectChange}
												/>
												{this.props.errorsObj.accountCountry ? (
													<span className="red">
														{this.props.errorsObj.accountCountry[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="lg:col-span-4 md:col-span-6 col-span-12">
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.accountCity || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="accountCity"
													placeholder="City"
												/>
												{this.props.errorsObj.accountCity ? (
													<span className="red">
														{this.props.errorsObj.accountCity[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="lg:col-span-4 md:col-span-6 col-span-12">
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.accountZipCode || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="accountZipCode"
													placeholder="Zip Code"
												/>
												{this.props.errorsObj.accountZipCode ? (
													<span className="red">
														{this.props.errorsObj.accountZipCode[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="col-span-12">
												<input
													type="text"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.streetAddress || ""}
													onChange={(e) => this.props.handleChange(e)}
													name="streetAddress"
													placeholder="Street Address"
												/>
												{this.props.errorsObj.streetAddress ? (
													<span className="red">
														{this.props.errorsObj.streetAddress[0]}
													</span>
												) : (
													""
												)}
											</div>
										</div>
									</form>
									<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
											onClick={() => this.handleBankAccountConnect()}
											text={
												this.props.isLoading ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite]" />
												) : (
													"Add"
												)
											}

										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorsObj: state.SettingPaymentReducer.errorsObj,
		isLoading: state.SettingPaymentReducer.isLoading,
		countries: state.SettingPaymentReducer.countries,
		currencies: state.SettingPaymentReducer.currencies,
		bankCountry: state.SettingPaymentReducer.bankCountry,
		accountCurrency: state.SettingPaymentReducer.accountCurrency,
		accountNumber: state.SettingPaymentReducer.accountNumber,
		swiftCode: state.SettingPaymentReducer.swiftCode,
		accountHolderName: state.SettingPaymentReducer.accountHolderName,
		accountCountry: state.SettingPaymentReducer.accountCountry,
		accountCity: state.SettingPaymentReducer.accountCity,
		accountZipCode: state.SettingPaymentReducer.accountZipCode,
		streetAddress: state.SettingPaymentReducer.streetAddress,
		bankAccountAdded: state.SettingPaymentReducer.bankAccountAdded,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_CONNECT_BANK_SUCCESS, payload: event }),
		handleSelectBankCountry: (event) =>
			dispatch({ type: HANDLE_SELECT_BANK_COUNTRY_SUCCESS, payload: event }),
		handleSelectCurrency: (event) =>
			dispatch({ type: HANDLE_SELECT_CURRENCY_SUCCESS, payload: event }),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleAddBankAccount: (query) =>
			dispatch(settingPaymentActions.handleAddBankAccount(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingTabPaymentModal);
