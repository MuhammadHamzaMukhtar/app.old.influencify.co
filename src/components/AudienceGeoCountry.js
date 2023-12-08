import React from "react";
import BrandDetail from "./BrandDetails";

const AudienceGeoCountry = ({ data, likers }) => {
	const brandDetailRef = React.createRef()
	return (
		<div className="p-4 bg-white rounded-[8px]">
			<div className="pb-3">
				<h5 className="font-normal text-[16px] text-[#8d8d8d]">
					Geographical Reach
				</h5>
			</div>
			<div>
				{data && data.length > 0 ? (
					data.slice(0, 3).map((item, key) => {
						return (
							<div key={key} className="flex items-center mb-3">
								<div className="flex items-center">
									<span
										className={`text-[22px] shrink-0 w-[29px] flag-icon flag-icon-${item.code.toLowerCase()}`}
									></span>
									<p className="text-[14px] text-black text-normal ml-2">
										{item.code}
									</p>
								</div>
								<div className="ml-auto w-9/12 grow mt-3">
									<div className="flex items-center">
										<div className="grow ml-12">
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
										<div className="text-[14px] text-black text-normal ml-6">
											{((item.weight || 0) * 100).toFixed(2)}%
										</div>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
				{data && data.length > 3 ? <button className="pt-3 text-[#7052e6]" onClick={() =>
					brandDetailRef.current.openbrandDetail()
				}>View More</button> : ''}
			</div>
			<BrandDetail ref={brandDetailRef} data={data} label='Country' likers={likers} title='Location by Country' />
		</div>
	);
};
export default AudienceGeoCountry;
