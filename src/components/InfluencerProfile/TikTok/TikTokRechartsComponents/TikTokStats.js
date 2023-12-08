import React, { Component } from "react";
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";
import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#73eddc", "F31854"];

class TikTokStats extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const data01 = [
			{
				name: "Likes",
				value: this.props.tikTokProfile.average_likes,
			},
			{
				name: "Comments",
				value: this.props.tikTokProfile.average_comments,
			},
		];

		return (
			<div>
				<PieChart width={250} height={230} style={{ margin: "auto" }}>
					<Pie
						data={data01}
						innerRadius={80}
						outerRadius={100}
						fill="#8884d8"
						paddingAngle={2}
						dataKey="value"
					>
						<Label
							value={`${
								this.props.tikTokProfile
									? this.props.tikTokProfile.average_engagement_rate
									: 0
							}%`}
							position="centerBottom"
							className="label-top"
							fontSize="27px"
						/>
						<Label
							value="Engagement Rate"
							position="centerTop"
							className="label mt-4"
						/>
						{data01.map((entry, index) => (
							<Cell key={index} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tikTokProfile: state.InfluencerProfileReducer.tikTokProfile,
	};
};

export default connect(mapStateToProps, null)(TikTokStats);
