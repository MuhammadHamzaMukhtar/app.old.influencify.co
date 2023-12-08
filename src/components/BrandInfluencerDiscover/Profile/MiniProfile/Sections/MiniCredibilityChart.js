import React, { Component } from "react";
import { PieChart, Pie, Cell, Sector } from 'recharts';

const FormatedNumber = ({
  num,
}) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-5} textAnchor="middle" fill="#8d8d8d" style={{ fontSize: '14px' }}><FormatedNumber num={payload.value} /></text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#8d8d8d" style={{ fontSize: '14px' }}>{payload.name}</text>
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

class MiniCredibilityChart extends Component {
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
    const { niceFollowers, doubtFollowers } = this.props;

    const data = [
      { name: "Nice Followers", value: (niceFollowers || 0) },
      { name: "Doubtful Followers", value: (doubtFollowers || 0) },
    ];

    return (
      <PieChart width={200} height={200}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={3}
          onMouseEnter={this.onPieEnter}
          className="pointer-events-none"
        >
          <Cell key="cell-2" fill="#1fcfc5" className="pointer-events-auto" />
          <Cell key="cell-3" fill="#fd2965" className="pointer-events-auto" />
        </Pie>
      </PieChart>
    );
  }
}

export default MiniCredibilityChart;