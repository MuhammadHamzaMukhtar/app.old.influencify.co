import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";

import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#F31854"];

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? "start" : "end";

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
				{payload.value}%
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

class TikTokAudienceGender extends Component {
	constructor(props) {
		super(props);
	}

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
				<PieChart width={400} height={215}>
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
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
				</PieChart>
				<div className="flex justify-center mb-4">
					<div className="flex mr-4">
						<span className="graph-Likes mr-1"></span>
						<p>Men (%)</p>
					</div>
					<div className="flex">
						<span className="graph-comments mr-1"></span>
						<p>Women (%)</p>
					</div>
				</div>
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

export default connect(mapStateToProps, null)(TikTokAudienceGender);
