import { Component } from "react";
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";
import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#73eddc", "F31854"];

class InstagramStats extends Component {
	render() {
		return (
			<div>
				<PieChart width={250} height={230} style={{ margin: "auto" }}>
					<Pie
						data={this.props.instagramStats}
						innerRadius={80}
						outerRadius={100}
						fill="#8884d8"
						paddingAngle={2}
						dataKey="value"
					>
						<Label
							value={`${
								this.props.engagementRate ? this.props.engagementRate : 0
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
						{this.props.instagramStats.map((entry, index) => (
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
		engagementRate: state.InfluencerProfileReducer.engagementRate,
		instagramStats: state.InfluencerProfileReducer.instagramStats,
	};
};

export default connect(mapStateToProps, null)(InstagramStats);
