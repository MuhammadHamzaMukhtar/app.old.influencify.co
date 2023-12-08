import React from "react";
import BrandDetails from "./BrandDetails";

const AudienceLanguage = ({ data, likers }) => {
	const brandDetailRef = React.createRef()
	return (
		<div className="p-4 bg-white rounded-[8px]">
			<div className="pb-3">
				<h5 className="font-normal text-[16px] text-[#8d8d8d]">Languages</h5>
			</div>
			<div>
				{data && data.length > 0 ? (
					data.slice(0, 3).map((item, key) => (
						<div key={key} className="flex items-center mb-3">
							<div className="flex items-center">
								<p className="text-[14px] text-black text-normal ml-2">
									{item.name ? item.name : item.code}
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
					))
				) : (
					<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
				{data && data.length > 3 ? <button className="pt-3 text-[#7052e6]" onClick={() => brandDetailRef.current.openbrandDetail()}>View More</button> : ''}
				<BrandDetails ref={brandDetailRef} data={data} likers={likers} title='Languges of Audience' label='Name' />
			</div>
		</div>
	);
};
export default AudienceLanguage;
