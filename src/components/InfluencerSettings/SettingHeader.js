import { Component } from "react";
// import "../../assets/css//Setting.css";

class SettingHeader extends Component {
	render() {
		return (
			<div>
				<div className="border-b-[1px] border-[#ddd] bg-white py-[20px]">
					<div className="containers">
						<h2 className="text-[23px] font-bold black font-italic">
							MY PROFILE
						</h2>
					</div>
				</div>
			</div>
		);
	}
}
export default SettingHeader;
