import { useState } from "react";
import Button from "@components/global/Button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Loader from "@components/global/Loader";
import Api from "@services/axios";

export default function StartFreeTrialCreditCard(props) {
	const stripe = useStripe();
	const elements = useElements();
	const [stripeError, setStripeError] = useState("");
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
			};
			Api.StartFreeTrial(query)
				// axios.post(helper.url + '/api/v1/start-free-trial' , query)
				.then((res) => {
					if (res.data.errors) {
						setLoading(false);
					} else if (res.data === "success") {
						props.handleBack();
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
		return <Loader />;
	}

	return (
		<div className="p-3 sm:!p-4 mb-4">
			<h4 className="mb-12 text-[20px]">Credit Card</h4>
			<CardElement />
			{stripeError ? <span className="p-[1rem] red">{stripeError}</span> : ""}
			<div className="mt-12">
				<h4 className="mb-1 text-[20px]">Plan (optional)</h4>
				<p className="mb-2">
					Please select the plan below if you want to continue your subscription
					after trial period end
				</p>
			</div>
			<div className="flex justify-between mt-4">
				<Button
					onClick={() => props.handleBack()}
					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#f7f7f7] dark hover:opacity-80 mt-12"
					text="Back"
				/>
				<Button
					type="submit"
					disabled={!stripe}
					onClick={handleSubmit}
					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-12"
					text="Strat Free Trial"
				/>
			</div>
		</div>
	);
}
