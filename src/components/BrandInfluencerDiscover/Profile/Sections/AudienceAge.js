import React from "react";
import { useSelector } from "react-redux";
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts";

export default function AudienceAge() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<div className="bg-white rounded-[8px] border">
			<div className="p-4">
				<h4 className="font-medium black text-[20px]">AUDIENCE AGES</h4>
			</div>
			<div className="p-3">
				<BarChart
					width={400}
					height={250}
					className="audienceAgeGraph m-auto"
					data={current_influencer.audienceAgeGenderValue}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="Men" fill="#7e2e8c" />
					<Bar dataKey="Women" fill="#F31854" />
				</BarChart>
			</div>
		</div>
	);
}
