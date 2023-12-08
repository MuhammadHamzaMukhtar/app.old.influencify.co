import { Component } from "react";
import avatar from "@assets/avatar.png";
import SocialListIcons from "../../../constants/SocialListIcons";
import "./styles.css";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class Item extends Component {
	render() {
		const { item, index } = this.props;
		const token = localStorage.getItem("access-token");
		let blur = token?"":index > 2 ? "blur-[6px] pointer-events-none" : "";
		return (
			<div
				className={`overflow-hidden rounded-[8px] shadow-[0px_4px_5px_#96969640] mb-6 sm:!mb-0 ${blur}`}
				onClick={()=>this.props.viewInfluencerProfile(item.user_id)}
			>
				<div className="relative cursor-pointer">
					<img
						src={item.picture ? item.picture : avatar}
						className="max-h-[300px]"
						alt={item.fullname ? item.fullname : ""}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src = `${process.env.REACT_APP_URL}/images/male_avatar.png`;
						}}
					/>

					<div className="flex flex-col justify-end absolute top-0 w-full h-full bg-gradient-to-b from-[#000000e6] via-[#0000007d] to-[#000000e6]">
						<p className="text-white text-[13pt] font-medium pl-[15px] pb-[15px] text-left">
							{" "}
							{item.fullname ? item.fullname : ""}
						</p>
					</div>
				</div>

				<div className="flex flex-col">
					<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
						<div className="flex items-center">
							{SocialListIcons("instagram", 16)}
							<p className="ml-2 text-[10px] darkGray">Followers</p>
						</div>
						<b className="text-[10px] black font-semibold">
							<FormatedNumber num={item.followers} />
						</b>
					</div>
					<div className="flex justify-between py-[0.75rem] px-[10px]">
						<p className="text-[10px] darkGray">Avg. Engagement</p>
						<b className="text-[10px] black font-semibold">
							{item.engagements ? <FormatedNumber num={item.engagements} /> : 0}{" "}
							(
							{item.engagement_rate
								? (item.engagement_rate * 100).toFixed(2)
								: 0}
							% )
						</b>
					</div>
				</div>
			</div>
		);
	}
}
export default Item;
