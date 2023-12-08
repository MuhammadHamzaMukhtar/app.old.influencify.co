export default function MiniGeographical() {
	return (
		<div className="bg-white rounded-[8px] p-4 border success-progrss h-full shadow-none">
			<div className="pb-3">
				<h5 className="font-normal text-[16px] darkGray">Geographical Reach</h5>
			</div>
			<div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">US</p>
					</div>
					<div className="ml-auto col-9 grow mt-4">
						<div className="flex items-center">
							<div className="grow ml-5">
								<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
									<div
										className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
										style={{
											backgroundColor: "#0d6efd",
											width: "30%",
										}}
									></div>
								</div>
							</div>
							<div className="text-[14px] black font-normal ml-6">30%</div>
						</div>
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">US</p>
					</div>
					<div className="ml-auto col-9 grow mt-4">
						<div className="flex items-center">
							<div className="grow ml-5">
								<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
									<div
										className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
										style={{
											backgroundColor: "#0d6efd",
											width: "60%",
										}}
									></div>
								</div>
							</div>
							<div className="text-[14px] black font-normal ml-6">60%</div>
						</div>
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">US</p>
					</div>
					<div className="ml-auto col-9 grow mt-4">
						<div className="flex items-center">
							<div className="grow ml-5">
								<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
									<div
										className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
										style={{
											backgroundColor: "#0d6efd",
											width: "20%",
										}}
									></div>
								</div>
							</div>
							<div className="text-[14px] black font-normal ml-6">20%</div>
						</div>
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">US</p>
					</div>
					<div className="ml-auto col-9 grow mt-4">
						<div className="flex items-center">
							<div className="grow ml-5">
								<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
									<div
										className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
										style={{
											backgroundColor: "#0d6efd",
											width: "1.6%",
										}}
									></div>
								</div>
							</div>
							<div className="text-[14px] black font-normal ml-6">1.6%</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
