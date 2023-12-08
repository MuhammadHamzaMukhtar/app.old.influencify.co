import { useState } from "react";
import Button from "@components/global/Button";
import visa from "@assets/visa.png";
import mastercard from "@assets/mastercard.png";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaSpinner } from "react-icons/fa";
import Api from "@services/axios";
import { HANDLE_CHANGE_SUCCESS, HANDLE_VALIDATION_ERRORS } from "@store/constants/action-types";
import { connect } from "react-redux";

function CardsAddComponent(props) {
	// const stripe = useStripe();
	// const elements = useElements();
	const [stripeError, setStripeError] = useState("");
	const [loader, setLoader] = useState(false);

	const handleSubmit = async (event) => {
		// event.preventDefault();
		// if (!stripe || !elements) {
		// 	return;
		// }
		// setLoader(true);
		// const cardElement = elements.getElement(CardElement);
		// const { error, paymentMethod } = await stripe.createPaymentMethod({
		// 	type: "card",
		// 	card: cardElement,
		// 	billing_details: {
		// 		name: props.currentLoggedUser.name,
		// 	},
		// });

		// if (error) {
		// 	setStripeError(error.message);
		// 	setLoader(false);
		// } else {
		const card = {
			number: props.card_number,
			exp_month: props.card_expiry_month,
			exp_year: props.card_expiry_year,
			cvc: props.card_cvv
		}
		let query = {
			card_details: {
				type: "card",
				card: card,
			}
		};
		setLoader(true)
		// axios.post(helper.url + '/api/v1/add-new-card' , query)
		Api.CardsAdd(query)
			.then((res) => {
				if (res.data === "success") {
					props.handleFetchCreditCards();
				} else {
					setStripeError(res.data);
					props.handleValidationErrors(res.data.errors)
					setLoader(false);
				}
			})
			.catch((error) => {
				setLoader(false);
			});
		// }
	};

	return (
		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-4">
			{props.activePaymentGateway === "stripe" ? (
				<div>
					{/* <CardElement /> */}
					<div className="flex justify-center">
						<div className="md:w-10/12 w-full space-y-5">
							<div className="grid grid-cols-12 gap-5">
								<div className="sm:col-span-3 col-span-12 mt-6">
									<img className="logo w-[52px]" src={visa} alt="visa" />
									<img
										className="ml-4 w-[52px]"
										src={mastercard}
										alt="mastercard"
									/>
								</div>
								<div className="sm:col-span-6 col-span-12">
									<form>
										<label className="text-[14px] font-medium">Card Number</label>
										<input
											type="number"
											placeholder="Card Number"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => props.handleChange(e)}
											name="card_number"
										/>
										{props.errorsObj?.number ? (
											<span className="red">
												{props.errorsObj.number}
											</span>
										) : (
											""
										)}
									</form>
								</div>
								<div className="sm:col-span-3 col-span-12">
									<form className="">
										<label className="text-[14px] font-medium">Card CVV</label>
										<input
											type="number"
											placeholder="CVV"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => props.handleChange(e)}
											name="card_cvv"
										/>
										{props.errorsObj?.cvc ? (
											<span className="red">{props.errorsObj.cvc}</span>
										) : (
											""
										)}
									</form>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-5">
								<div className="sm:col-span-3 col-span-12"></div>
								<div className="sm:col-span-6 col-span-12">
									<form>
										<label className="text-[14px] font-medium">
											Card Expiry Month
										</label>
										<input
											type="number"
											placeholder="MM"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => props.handleChange(e)}
											name="card_expiry_month"
										/>
										{props.errorsObj?.exp_month ? (
											<span className="red">
												{props.errorsObj.exp_month}
											</span>
										) : (
											""
										)}
									</form>
								</div>
								<div className="sm:col-span-3 col-span-12">
									<form>
										<label className="text-[14px] font-medium">
											Card Expiry Year
										</label>
										<input
											type="number"
											placeholder="YY"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => props.handleChange(e)}
											name="card_expiry_year"
										/>
										{props.errorsObj?.exp_year ? (
											<span className="red">
												{props.errorsObj.exp_year}
											</span>
										) : (
											""
										)}
									</form>
								</div>
							</div>
							{/* {stripeError ? (<span className="red p-3 flex justify-center">{stripeError}</span>) : ""} */}
							<div className="text-center sm:!text-right">
								<Button
									type="submit"
									disabled={loader}
									onClick={handleSubmit}
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									text={
										loader ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
										) : (
											"Add Card"
										)
									}
								/>
							</div>
						</div>
					</div>
					{/* <div className="text-center sm:!text-right">
						<Button
							type="submit"
							disabled={loader}
							onClick={handleSubmit}
							text={
								loader ? (
									<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
								) : (
									"Add Card"
								)
							}
							className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
						/>
					</div> */}
				</div>
			) : (
				""
			)}
			{props.activePaymentGateway === "payeezy" ? (
				<div className="flex justify-center">
					<div className="md:w-10/12 w-full space-y-5">
						<div className="grid grid-cols-12 gap-5">
							<div className="sm:col-span-3 col-span-12 mt-6">
								<img className="logo w-[52px]" src={visa} alt="visa" />
								<img
									className="ml-4 w-[52px]"
									src={mastercard}
									alt="mastercard"
								/>
							</div>
							<div className="sm:col-span-6 col-span-12">
								<form>
									<label className="text-[14px] font-medium">Card Number</label>
									<input
										type="number"
										placeholder="Card Number"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => props.handleChange(e)}
										name="card_number"
									/>
									{props.errorsObj?.card_number ? (
										<span className="red">
											{props.errorsObj.card_number[0]}
										</span>
									) : (
										""
									)}
								</form>
							</div>
							<div className="sm:col-span-3 col-span-12">
								<form className="">
									<label className="text-[14px] font-medium">Card CVV</label>
									<input
										type="number"
										placeholder="CVV"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => props.handleChange(e)}
										name="card_cvv"
									/>
									{props.errorsObj?.card_cvv ? (
										<span className="red">{props.errorsObj.card_cvv[0]}</span>
									) : (
										""
									)}
								</form>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-5">
							<div className="sm:col-span-3 col-span-12"></div>
							<div className="sm:col-span-6 col-span-12">
								<form>
									<label className="text-[14px] font-medium">
										Card Expiry Month
									</label>
									<input
										type="number"
										placeholder="MM"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => props.handleChange(e)}
										name="card_expiry_month"
									/>
									{props.errorsObj?.card_expiry_month ? (
										<span className="red">
											{props.errorsObj.card_expiry_month[0]}
										</span>
									) : (
										""
									)}
								</form>
							</div>
							<div className="sm:col-span-3 col-span-12">
								<form>
									<label className="text-[14px] font-medium">
										Card Expiry Year
									</label>
									<input
										type="number"
										placeholder="YY"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => props.handleChange(e)}
										name="card_expiry_year"
									/>
									{props.errorsObj?.card_expiry_year ? (
										<span className="red">
											{props.errorsObj.card_expiry_year[0]}
										</span>
									) : (
										""
									)}
								</form>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-5">
							<div className="sm:col-span-3 col-span-12"></div>
							<div className="sm:col-span-9 col-span-12">
								<label className="text-[14px] font-medium">
									Card Holder Name
								</label>
								<input
									type="text"
									placeholder="Card Holder Name"
									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
									onChange={(e) => props.handleChange(e)}
									name="card_holder_name"
								/>
								{props.errorsObj?.card_holder_name ? (
									<span className="red">
										{props.errorsObj.card_holder_name[0]}
									</span>
								) : (
									""
								)}
							</div>
						</div>
						<div className="text-center sm:!text-right">
							<Button
								onClick={() => props.handleAddNewCard()}
								className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
								text="Add Card"
							/>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		isLoading: state.SettingPaymentReducer.isLoading,
		errorsObj: state.SettingPaymentReducer.errorsObj,
		card_holder_name: state.SettingPaymentReducer.card_holder_name,
		card_number: state.SettingPaymentReducer.card_number,
		card_expiry_month: state.SettingPaymentReducer.card_expiry_month,
		card_expiry_year: state.SettingPaymentReducer.card_expiry_year,
		card_cvv: state.SettingPaymentReducer.card_cvv,
		card_type: state.SettingPaymentReducer.card_type,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleValidationErrors: (data) =>
			dispatch({ type: HANDLE_VALIDATION_ERRORS, payload: data })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardsAddComponent);
