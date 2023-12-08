import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";
import { connect } from "react-redux";

const COLORS = ["#7e2e8c", "#ff595e", "#73eddc", "#1fa6f1"];

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

class InteractionData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
		};
	}

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index,
		});
	};

	render() {
		const { current_influencer } = this.props;
		return (
			<>
				<div className="mt-4 xl:!mt-0 p-4 rounded-[8px] h-full border">
					<h4 className=" text-[20px] text-center black font-medium">
						AVERAGE INTERACTIONS DATA
					</h4>
					<div className="text-center mt-6">
						<div className="flex justify-center">
						
							
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		current_influencer: influencerSearch.current_influencer,
	};
};

export default connect(mapStateToProps, undefined)(InteractionData);
