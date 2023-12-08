import { memo } from "react";
import { Line } from "react-chartjs-2";

const LineMap = ({ options, data }) => {
	return (
		<Line options={options} data={data} />
	);
};

export default memo(LineMap);