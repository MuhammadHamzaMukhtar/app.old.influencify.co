import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ReportPercircleChart extends React.Component {
  render() {
    return (
      <div className="inline-block">
        <div className="flex flex-col items-center relative">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: `purple`,
              strokeLinecap: "butt",
              textSize: "11px",
              pathTransitionDuration: 1.5,
              textColor: "gray",
              trailColor: "#d6d6d6",
            })}
            className="w-36"
            strokeWidth={5}
            value={this.props.completionPercentage || 0}
          />
          <div className="absolute top-11 text-center text-gray-500">
            {this.props.completionPercentage || 0}%
            <br />
            completed
          </div>
        </div>
      </div>
    );
  }
}

export default ReportPercircleChart;
