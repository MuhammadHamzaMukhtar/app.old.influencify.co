import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";

function Message(time) {
	if (time.time >= 0 && time.time <= 3) {
		return (
			<h4 className="text-[#000] text-[14px] font-normal tracking-[1px] mt-4">
				Live searching billions of data points, please wait...
			</h4>
		);
	} else if (time.time >= 4 && time.time <= 7) {
		return (
			<h4 className="text-[#000] text-[14px] font-normal tracking-[1px] mt-4">
				Analyzing all the influencer's followers, please wait...
			</h4>
		);
	} else if (time.time >= 8) {
		return (
			<h4 className="text-[#000] text-[14px] font-normal tracking-[1px] mt-4">
				Putting everything together, please wait...
			</h4>
		);
	} else {
		return null;
	}
}

class MiniProfileLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 0,
		};
	}

	componentDidMount() {
		setInterval(() => this.setState({ time: this.state.time + 1 }), 1000);
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}

	render() {
		const { time } = this.state;
		return (
			<div className="w-full h-full z-[11] absolute flex justify-center items-center">
				<div className="text-center">
					<FaSpinner
						size={66}
						className="animate-[spin_2s_linear_infinite] pink mx-auto"
					/>
					<Message time={time} />
				</div>
			</div>
		);
	}
}

export default MiniProfileLoader;
