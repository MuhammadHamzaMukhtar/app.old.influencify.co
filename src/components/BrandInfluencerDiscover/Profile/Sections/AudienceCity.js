import React from "react";
import { useSelector } from "react-redux";

export default function AudienceCity() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] border shadow-none pt-0 h-full">
			<div className="p-4">
				<h4 className="font-medium black text-[20px]">AUDIENCE TOP CITIES</h4>
			</div>
			<div className="p-3">
				<div className="flex flex-wrap">
					{current_influencer.audienceTopCities &&
					current_influencer.audienceTopCities.length ? (
						current_influencer.audienceTopCities.map((city, index) => (
							<div
								className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center m-[0.5rem]"
								key={index}
							>
								<p className="text-[12px] ml-2">
									{city.city_name} <b>{city.city_percentage}%</b>
								</p>
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
