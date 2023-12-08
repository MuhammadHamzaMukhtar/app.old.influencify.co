import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [
	{
		name: "24",
		uv: 4000,
		pv: 2400,
	},
	{
		name: "23",
		uv: 3000,
		pv: 1398,
	},
	{
		name: "22",
		uv: 2000,
		pv: 9800,
	},
	{
		name: "21",
		uv: 2780,
		pv: 3908,
	},
	{
		name: "20",
		uv: 1890,
		pv: 4800,
	},
	{
		name: "19",
		uv: 2390,
		pv: 3800,
	},
	{
		name: "18",
		uv: 3490,
		pv: 4300,
	},
];

export default function UserLineChart() {
	return (
		<>
			<LineChart
				width={700}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<XAxis dataKey="name" />
				<YAxis />
				<Line type="monotone" dataKey="pv" stroke="#007bff" dot={false} />
				<Line
					type="monotone"
					dataKey="uv"
					strokeDasharray="5 5"
					stroke="#a8d2ff"
					dot={false}
				/>
			</LineChart>
			<div className="flex items-center mt-12 mb-6 pb-1">
				<div className="w-6 h-3px line" />
				<div className="mx-2 black font-normal text-[16px]">Last 7 days</div>
				<div className="w-3 h-5px line mr-2" />
				<div className="w-3 h-5px line" />
				<div className="mx-2 black font-normal text-[16px]">
					Preceding period
				</div>
			</div>
		</>
	);
}
