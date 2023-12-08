import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#73eddc", "F31854"];

const data02 = [
	{
		name: "Likes",
		value: 2400,
	},
	{
		name: "Comments",
		value: 4567,
	},
];

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
				{payload.value}
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

class TikTokAverageInteractionsData extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		activeIndex: 0,
	};

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index,
		});
	};

	render() {
		const data = [
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
				<div className="flex justify-center">
					<PieChart width={250} height={230}>
						<Pie
							activeIndex={this.state.activeIndex}
							activeShape={renderActiveShape}
							data={data}
							innerRadius={80}
							outerRadius={95}
							fill="#8884d8"
							dataKey="value"
							paddingAngle={2}
							onMouseEnter={this.onPieEnter}
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
					</PieChart>
					<div className="pt-4 mt-12">
						<h6 className="text-left text-[16px]">
							{this.props.tikTokProfile.average_likes}
						</h6>
						<div className="flex items-center">
							<span className="graph-Likes-circle mr-1"></span>
							<span>Likes</span>
						</div>
						<h6 className="text-left mt-4 text-[16px]">
							{this.props.tikTokProfile.average_comments}
						</h6>
						<div className="flex items-center">
							<span className="graph-comments-circle mr-1"></span>
							<span>Comments</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tikTokProfile: state.InfluencerProfileReducer.tikTokProfile,
	};
};

export default connect(mapStateToProps, null)(TikTokAverageInteractionsData);
