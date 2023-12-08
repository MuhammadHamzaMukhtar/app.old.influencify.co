import { Component } from "react";
import avatar from "@assets/avatar.png";
import shopify from "@assets/shopify.png";
import signals from "@assets/signals.png";

class ConversionsExpanded extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { analytics } = this.props;
		return (analytics || []).map((item, key) => (
			<tr key={key}>
				<td>
					<img
						src={
							item.influencer?.profile_pic
								? item.influencer?.profile_pic
								: avatar
						}
						alt="avatar"
						className="rounded-full mr-2 w-[32px]"
					/>
					{item.influencer?.name}
				</td>
				<td align="center">
					${item.total_spendable}{" "}
					{item.shopify_discount_code && "+ " + item.shopify_discount_code}
				</td>
				<td align="center">
					{item.shopify_order_number && (
						<img src={shopify} alt="shopify" width="22px" />
					)}
					{item.conversions > 0 && (
						<img src={signals} alt="signals" width="22px" />
					)}
				</td>
				<td align="center">0</td>
				<td align="center">0</td>
				<td align="center">${item.total_revenue || 0}</td>
				<td align="center">$0</td>
			</tr>
		));
	}
}

export default ConversionsExpanded;
