import { Component } from "react";
import ConversionsExpanded from "../ConversionsExpanded";

class ConversionsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="my-2 mx-0">
				<table className="w-full">
					<thead>
						<tr>
							<td>Influencers</td>
							<td align="center">Spend</td>
							<td align="center">Tracking Source</td>
							<td align="center">Trafic</td>
							<td align="center">Conversions</td>
							<td align="center">Direct conversion</td>
							<td align="center">Assisted conversion value</td>
						</tr>
					</thead>
					<tbody>
						<ConversionsExpanded {...this.props} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default ConversionsTable;
