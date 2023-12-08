import React from "react";
import { IoMdInformationCircle } from "react-icons/io";
import BrandDetails from "./BrandDetails";

const AudienceGeoCity = ({ data, likers }) => {
	const brandDetailRef = React.createRef()
	return (
		<div className="p-4 bg-white rounded-[8px]">
			<div className="pb-3">
				<h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center">
					Location by City{" "}
					<IoMdInformationCircle size={22} className="ml-2 text-[#c4c4c4]" />
				</h5>
			</div>
			{data && data.length > 0 ? (
				data.slice(0, 3).map((item, key) => (
					<div key={key} className="flex items-center mb-3">
						<div className="flex items-center">
							<span
								className={`text-[22px] flag-icon flag-icon-${(item?.country?.code).toLowerCase()}`}
							></span>
							<p className="text-[14px] text-black font-normal ml-2">
								{item.name}
							</p>
						</div>
						<div className="ml-auto text-[14px] text-black font-normal mt-3">
							{((item.weight || 0) * 100).toFixed(2)}%
						</div>
					</div>
				))
			) : (
				<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
					We have nothing to show you here.
				</div>
			)}
			{data && data.length > 3 ? <button className="pt-3 text-[#7052e6]" onClick={() => brandDetailRef.current.openbrandDetail()}>View More</button> : ''}
			<BrandDetails ref={brandDetailRef} likers={likers} label='City' data={data} title='Location by City' />
		</div>
	);
};

export default AudienceGeoCity;
