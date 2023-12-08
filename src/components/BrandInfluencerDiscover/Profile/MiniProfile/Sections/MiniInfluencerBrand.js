import { useSelector } from "react-redux";

export default function MiniInfluencerBrand() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] border shadow-none p-0 h-full">
			<div className="p-4">
				<h4 className="font-medium black text-[20px]">INFLUENCER TOP BRANDS</h4>
			</div>
			<div className="p-3">
				<div className="flex flex-wrap">
					{current_influencer.influencerTopBrands &&
					current_influencer.influencerTopBrands.length ? (
						current_influencer.influencerTopBrands.map((item, index) => (
							<div
								className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center m-[0.5rem]"
								key={index}
							>
								{item.brand.logo && (
									<div className="w-18 h-18 overflow-hidden flex rounded-full">
										<img
											width={18}
											circular
											src={process.env.REACT_APP_AWS_URl + item.brand.logo}
											className="rounded-full object-cover"
											alt="logo"
										/>
									</div>
								)}
								<p className="text-[12px] ml-2">{item.name}</p>
								{/* <b>{item.interest_percentage}%</b> */}
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
