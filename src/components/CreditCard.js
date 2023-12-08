import { useState } from "react";
import Button from "@components/global/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loader from "@components/global/Loader";
import Api from "@services/axios";

export default function CreditCard(props) {
	const stripe = useStripe();
	const elements = useElements();
	const [stripeError, setStripeError] = useState("");
	const [validateError, setvalidateError] = useState({});
	const [registerSuccess, setRegisterSuccess] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
			billing_details: {
				name: props.displayName,
				email: props.email,
			},
		});

		if (error) {
			setStripeError(error.message);
		} else {
			setLoading(true);
			setStripeError("");
			let query = {
				planId: props.planId,
				paymentMethod: paymentMethod,
				displayName: props.displayName,
				email: props.email,
				password: props.password,
				passwordStrength: props.passwordStrength,
				termOfUse: props.termOfUse,
				privacyPolicy: props.privacyPolicy,
			};
			// axios
			//     .post(helper.url + "/api/v1/brand-register", query)
			Api.CreditCardComponent(query)
				.then((res) => {
					if (res.data.errors) {
						setvalidateError(res.data.errors);
						setLoading(false);
					} else if (res.data === "success") {
						setRegisterSuccess(true);
						setLoading(false);
					} else {
						setStripeError(res.data);
						setLoading(false);
					}
				})
				.catch((error) => {});
		}
	};

	if (isLoading) {
		return (
			<Loader
				className="h-full w-full flex justify-center items-center"
				size="67"
			/>
		);
	}

	return (
		<div>
			{registerSuccess ? (
				<div className="containers mt-12 mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="xl:col-span-12 lg:col-span-8 col-span-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 md:!p-12 border-[1px] border-[#ced4da]">
								<div className="mb-6">
									<h4 className="font-bold text-[20px]">
										{props.displayName}, thank you for registering.
									</h4>
									<p>
										We sent an email to {props.email} containing a link that you
										should click to confirm your registration.
									</p>
								</div>
								<div>
									<h4 className="font-bold text-[20px]">
										Didn't get the email?
									</h4>
									<ul className="decimal">
										<li>Please see your spam folder.</li>
										<li>Check that the email provided is correct.</li>
										<li>Wait 15 minutes and check your email again.</li>
										<li>contact support@influencify.co</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					{validateError.displayName || validateError.email ? (
						<div className="alert alert-danger" role="alert">
							<ul className="m-0">
								{validateError.displayName ? (
									<li className="text-white">{validateError.displayName[0]}</li>
								) : (
									""
								)}
								{validateError.email ? (
									<li className="text-white">{validateError.email[0]}</li>
								) : (
									""
								)}
							</ul>
						</div>
					) : (
						""
					)}
					<div>
						<CardElement />
						{stripeError ? <span className="p-3 red">{stripeError}</span> : ""}
						<div className="flex justify-end mt-4">
							<Button
								onClick={() => props.handleBack()}
								className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] items-center bg--purple text-white hover:opacity-80 hidden"
								text="Back"
							/>
							<Button
								type="submit"
								disabled={!stripe}
								onClick={handleSubmit}
								className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
								text="Finish"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
