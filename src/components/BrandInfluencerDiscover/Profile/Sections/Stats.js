import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";

const COLORS = ["#7e2e8c", "#ff595e", "#73eddc", "#1fa6f1"];

export default function Stats() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<>
			<div className="mt-4 xl:!mt-0 p-4 rounded-[8px] h-full border">
				<h4 className="text-[20px] text-center black font-medium">STATS</h4>
				<div className="text-center mt-6">
					{current_influencer.instagramStats &&
					current_influencer.instagramStats.length ? (
						<PieChart width={250} height={230} style={{ margin: "auto" }}>
							<Pie
								data={current_influencer.instagramStats}
								innerRadius={80}
								outerRadius={100}
								fill="#8884d8"
								paddingAngle={2}
								dataKey="value"
							>
								<Label
									value={`${
										current_influencer.engagementRate
											? current_influencer.engagementRate
											: 0
									}%`}
									position="centerBottom"
									className="label-top"
									fontSize="27px"
								/>
								<Label
									value="Engagement Rate"
									position="centerTop"
									dy={10}
									className="label mt-4"
								/>
								{current_influencer.instagramStats.map((entry, index) => (
									<Cell key={index} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					) : (
						<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px] text-[18px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
			</div>
		</>
	);
}
