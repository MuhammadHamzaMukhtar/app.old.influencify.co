import { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";

import { connect } from "react-redux";

const renderActiveShape = (props) => {
	const {
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
	} = props;

	return (
		<g>
			<text
				x={cx}
				y={cy}
				dy={0}
				textAnchor="middle"
				fill={fill}
				style={{ fontSize: "18px" }}
			>
				{payload.value.toFixed(2)}%
			</text>
			<text
				x={cx}
				y={cy}
				dy={25}
				textAnchor="middle"
				fill={fill}
				style={{ fontSize: "18px" }}
			>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
		</g>
	);
};

class InstagramAudienceGender extends Component {
	static jsfiddleUrl = "https://jsfiddle.net/alidingling/hqnrgxpj/";
	state = {
		activeIndex: 0,
	};

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index,
		});
	};

	render() {
		return (
			<div>
				<PieChart className="m-auto" width={400} height={250}>
					<Pie
						activeIndex={this.state.activeIndex}
						activeShape={renderActiveShape}
						data={this.props.audienceGenderPercentage}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
						paddingAngle={2}
						onMouseEnter={this.onPieEnter}
					>
						{this.props.audienceGenderPercentage.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.name === "MALE" ? "#7e2e8c" : "#F31854"}
							/>
						))}
					</Pie>
				</PieChart>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		audienceGenderPercentage:
			state.InfluencerProfileReducer.audienceGenderPercentage,
	};
};

export default connect(mapStateToProps, null)(InstagramAudienceGender);
