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

class MiniAudienceGender extends Component {
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
			<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] border shadow-none pt-0 mb-0 h-full">
				<div className="p-4">
					<h4 className="font-medium black text-[20px]">AUDIENCE GENDER</h4>
				</div>
				{current_influencer.audienceGenderPercentage &&
				current_influencer.audienceGenderPercentage.length ? (
					<PieChart className="m-auto" width={400} height={250}>
						<Pie
							activeIndex={this.state.activeIndex}
							activeShape={renderActiveShape}
							data={current_influencer.audienceGenderPercentage}
							innerRadius={60}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
							paddingAngle={2}
							onMouseEnter={this.onPieEnter}
						>
							{current_influencer.audienceGenderPercentage.map(
								(entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.name == "MALE" ? "#7e2e8c" : "#F31854"}
									/>
								)
							)}
						</Pie>
					</PieChart>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		current_influencer: influencerSearch.current_influencer,
	};
};

export default connect(mapStateToProps, undefined)(MiniAudienceGender);
