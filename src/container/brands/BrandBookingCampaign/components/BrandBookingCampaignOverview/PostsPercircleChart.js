import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class PostsPercircleChart extends React.Component {
	render() {
		return (
			<CircularProgressbar
				styles={buildStyles({
					pathColor: `rgba(40, 43, 60,1)`,
					strokeLinecap: "butt",
					textSize: "11px",
					pathTransitionDuration: 1.5,
					textColor: "#2c3150",
					trailColor: "#d6d6d6",
				})}
				value={(this.props.postPercentage || 0)}
				text={`${(this.props.postPercentage || 0)}%`}
			/>
		);
	}
}

export default PostsPercircleChart;
