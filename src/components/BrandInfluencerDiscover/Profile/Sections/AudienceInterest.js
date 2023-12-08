import React from "react";
import { useSelector } from "react-redux";
import AudienceInterestIcons from "../../../../constants/AudienceInterestIcons";

export default function AudienceInterest() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] border shadow-none pt-0 h-full">
			<div className="p-4">
				<h4 className="font-medium black text-[20px]">
					AUDIENCE TOP INTERESTS
				</h4>
			</div>
			<div className="p-3">
				<div className="flex flex-wrap">
					{current_influencer.audienceTopInterests &&
					current_influencer.audienceTopInterests.length ? (
						current_influencer.audienceTopInterests.map((interest, index) => (
							<div
								className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center m-[0.5rem]"
								key={index}
							>
								<div className="w-18 h-18 overflow-hidden flex">
									{AudienceInterestIcons(interest.interest_name)}
								</div>
								<p className="text-[12px] ml-2"> {interest.interest_name} </p>
								{/* <b>{interest.interest_percentage} %</b> */}
							</div>
						))
					) : (
						<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
