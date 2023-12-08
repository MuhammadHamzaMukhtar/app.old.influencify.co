import { Component } from "react";
import { connect } from "react-redux";
import ExpandedRows from "./ExpandedRows";

class ExpandedTables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	setOpen = (e, uniqueId) => {
		let contents = this.props.contents;
		for (let index in contents) {
			let content = contents[index];
			if (content.uniqueId === uniqueId) {
				content = { name: content.name, status: !content.status };
			}
		}

		this.setState({
			open: e,
		});
	};
	render() {
		// const classes = useRowStyles();
		return (
			<div className="my-12">
				<table className="w-full">
					<thead>
						<tr>
							<th>Influencers</th>
							<th align="center">Contents</th>
							<th align="center">Spent</th>
							{/* <th align="center">Impressions</th> */}
							<th align="center">Reach</th>
							<th align="center">Engagement</th>
							<th align="center">Likes</th>
							<th align="center">Comments</th>
							<th align="center">Views</th>
							{/* <th align="center">CPM</th>
							<th align="center">CPE</th>
							<th align="center">Revenue</th> */}
						</tr>
					</thead>
					<tbody>
						{this.props.contents.length
							? this.props.contents.map((content, index) => (
									<ExpandedRows
										key={index}
										content={content}
										campaign={this.props.campaign}
									/>
							  ))
							: ""}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaign: state.BrandBookingCampaignReducer.campaign,
		contents: state.BrandBookingCampaignReducer.contents,
	};
};

export default connect(mapStateToProps, null)(ExpandedTables);
