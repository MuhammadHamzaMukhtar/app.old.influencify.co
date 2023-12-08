import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#73eddc", "F31854"];

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

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
				<FormatedNumber num={payload.value} />
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

class InstagramAverageInteractionsData extends Component {
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
				<div className="flex justify-center">
					<PieChart width={250} height={230}>
						<Pie
							activeIndex={this.state.activeIndex}
							activeShape={renderActiveShape}
							data={this.props.instagramStats}
							innerRadius={80}
							outerRadius={95}
							fill="#8884d8"
							dataKey="value"
							paddingAngle={2}
							onMouseEnter={this.onPieEnter}
						>
							{this.props.instagramStats.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
					</PieChart>
					<div className="pt-4 mt-12">
						{this.props.instagramStats &&
						this.props.instagramStats[0] &&
						this.props.instagramStats[0].value > 0 ? (
							<div>
								<h6 className="text-left text-[16px]">
									{this.props.instagramStats[0] ? (
										<FormatedNumber num={this.props.instagramStats[0].value} />
									) : (
										""
									)}
								</h6>
								<div className="flex items-center">
									<span className="graph-Likes-circle mr-1"></span>
									<span>Likes</span>
								</div>
							</div>
						) : (
							""
						)}
						{this.props.instagramStats &&
						this.props.instagramStats[1] &&
						this.props.instagramStats[1].value > 0 ? (
							<div>
								<h6 className="text-left mt-4 text-[16px]">
									{this.props.instagramStats[1] ? (
										<FormatedNumber num={this.props.instagramStats[1].value} />
									) : (
										""
									)}
								</h6>
								<div className="flex items-center">
									<span className="graph-comments-circle mr-1"></span>
									<span>Comments</span>
								</div>
							</div>
						) : (
							""
						)}
						{this.props.instagramStats &&
						this.props.instagramStats[2] &&
						this.props.instagramStats[2].value > 0 ? (
							<div>
								<h6 className="text-left mt-4 text-[16px]">
									{this.props.instagramStats[2] ? (
										<FormatedNumber num={this.props.instagramStats[2].value} />
									) : (
										""
									)}
								</h6>
								<div className="flex items-center">
									<span className="graph-video-views-circle mr-1"></span>
									<span>Video Views</span>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		instagramStats: state.InfluencerProfileReducer.instagramStats,
	};
};

export default connect(mapStateToProps, null)(InstagramAverageInteractionsData);
