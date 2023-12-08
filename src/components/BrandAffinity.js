const BrandAffinity = ({ data }) => {
	return (
		<div className="p-4 bg-white h-full rounded-[8px] border">
			<div className="pt-4">
				<h4 className="font-medium text-[#8d8d8d] text-[15px] mb-2">
					Creator's Brand Affinity
				</h4>
			</div>
			<div className="py-3">
				<div className="flex flex-wrap">
					{data && data.length ? (
						data.map((item, index) => (
							<div
								className="sm:w-6/12 cursor-pointer flex items-center mb-3"
								key={index}
							>
								{item?.brand && item?.brand?.logo && (
									<div className="w-22 h-22 overflow-hidden flex mr-2">
										<img
											src={process.env.REACT_APP_AWS_URl + item.brand?.logo}
											className="object-contain w-[22px] h-[22px]"
											alt="logo"
										/>
									</div>
								)}
								<p className="text-[13px] font-normal text-black">
									{item.name}
								</p>
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

export default BrandAffinity;
