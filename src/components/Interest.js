import React from "react";
import AudienceInterestIcons from "../constants/AudienceInterestIcons";

const Interest = ({ data }) => {
	return (
		<div className="p-4 bg-white h-full rounded-[8px] border">
			<div className="pt-4">
				<h5 className="font-normal text-[16px] text-[#8d8d8d] mb-2">
					Creator's Interests
				</h5>
			</div>
			<div className="py-3">
				<div className="flex flex-wrap ">
					{data && data.length ? (
						data.map((item, index) => (
							<div
								className="sm:w-6/12 cursor-pointer flex items-center mb-3"
								key={index}
							>
								<div className="w-22 h-22 overflow-hidden flex shrink-0">
									{AudienceInterestIcons(item.name)}
								</div>
								<p className="text-[13px] ml-2 font-normal text-black">
									{" "}
									{item.name}{" "}
								</p>
								{/* <b>{interest.interest_percentage} %</b> */}
							</div>
						))
					) : (
						<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Interest;
