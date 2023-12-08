import { useSelector } from "react-redux";

export default function MiniAudienceInterest() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] pt-0">
			<div className="p-4">
				<h4 className=" text-[20px]">AUDIENCE TOP INTERESTS</h4>
			</div>
			<div className="bg-[#0000001f] h-[1px] w-full" />
			<div className="p-3">
				<div className="flex flex-col">
					{current_influencer.audienceTopInterests &&
					current_influencer.audienceTopInterests.length ? (
						current_influencer.audienceTopInterests.map((interest, index) => (
							<div
								className="flex justify-between px-[16px] py-[8px] border-[1px] border-[#00000020]"
								key={index}
							>
								<p>{interest.interest_name}</p>
								<b>{interest.interest_percentage}%</b>
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
