import Button from "@components/global/Button";
const captalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function DefaultCardPayment({ creditCard, removeCard }) {
	return (
		<div className="mx-0 mt-4">
			<table className="min-w-[700px] w-full">
				<thead>
					<tr>
						<th className="bg-[#2c3150] text-[14px]">Card Type</th>
						<th className="bg-[#2c3150] text-[14px]">Card Holder Name</th>
						<th className="bg-[#2c3150] text-[14px]">Card Number</th>
						<th className="bg-[#2c3150] text-[14px]">Card Expiry</th>
						<th className="bg-[#2c3150] text-[14px]" align="right">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<img
								src={`images/cards/${captalize(creditCard.card.brand)}.png`}
								className="w-[80px]"
								alt={creditCard.billing_details.name}
							/>
						</td>
						<td>{creditCard.billing_details.name}</td>
						<td>{creditCard.card.last4}</td>
						<td>
							{creditCard.card.exp_month}/{creditCard.card.exp_year}
						</td>

						<td align="right">
							<Button
								onClick={removeCard}
								className="w-60 btn-purple"
								text="Remove"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
