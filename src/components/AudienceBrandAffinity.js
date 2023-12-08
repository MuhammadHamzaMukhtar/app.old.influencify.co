import React from "react";
import BrandAffinityDetails from "./BrandAffinityDetails";

const AudienceBrandAffinity = ({ data, likers }) => {
	const brandDetailRef = React.createRef()
	return (
		<div className="p-4 bg-white rounded-[8px]">
			<div className="pb-3">
				<h5 className="font-normal text-[16px] text-[#8d8d8d]">
					Audience Brand Affinity
				</h5>
			</div>
			<div>
				{data && data.length > 0 ? (
					data.slice(0,5).map((item, index) => (
						<div key={index} className="flex items-center mb-3">
							<div className="flex items-center sm:w-6/12 px-0">
								<p className="text-[14px] text-black font-normal mt-3">
									{item.name}
								</p>
							</div>
							<div className="sm:w-6/12 px-0 grow mt-3">
								<div className="flex items-center">
									<div className="grow">
										<div className="bg-[#e9ecef] h-[9px] rounded-[4px] overflow-hidden leading-[0px]">
											<div
												className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
												style={{
													backgroundColor: "#1fcfc5",
													width: `${((item.weight || 0) * 100).toFixed(2)}%`,
												}}
											></div>
										</div>
									</div>
									<div className="text-[14px] text-black font-normal ml-4">
										{((item.weight || 0) * 100).toFixed(2)}%
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
				{data && data.length > 5 ? <button className="pt-3 text-[#7052e6]" onClick={() => brandDetailRef.current.openbrandDetail()}>View More</button> : ''}
				<BrandAffinityDetails ref={brandDetailRef} data={data} likers={likers} title='Audience Brand Affinity' />
			</div>
		</div>
	);
};
export default AudienceBrandAffinity;
