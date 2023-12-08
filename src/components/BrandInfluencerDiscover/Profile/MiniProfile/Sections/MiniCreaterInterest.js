import React from "react";
import { useSelector } from "react-redux";
import AudienceInterestIcons from "../../../../../constants/AudienceInterestIcons";

export default function MiniCreaterInterest() {
	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);
	const {account} = (influencer || {});
	return (
		<div className="border-[1px] border-[#dee2e6] p-4 h-full rounded-[8px]">
			<h4 className="font-medium darkGray text-[15px] mb-2">
				Creator's Interests
			</h4>
			<div className="flex flex-wrap ">
				{(account?.user_profile?.interests || []).map((interest, index) => (
					<div
						className="sm:w-6/12 w-full cursor-pointer flex items-center mb-4"
						key={index}
					>
						<div className="w-[22px] h-[22px] overflow-hidden flex shrink-0">
							{AudienceInterestIcons(interest.name)}
						</div>
						<p className="text-[13px] ml-2 font-normal black">
							{" "}
							{interest.name}{" "}
						</p>
						{/* <b>{interest.interest_percentage} %</b> */}
					</div>
				))}
			</div>
		</div>
	);
}
