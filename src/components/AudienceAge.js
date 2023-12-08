import { GoDotFill } from "react-icons/go";
import { IoMdInformationCircle } from "react-icons/io";
import AudienceAgeGraph from "./AudienceAgeGraph";
export default function AudienceAge({ data }) {
	return (
		<div className="p-4 border-[1px] border-[#dee2e6] bg-white h-full audience-gender rounded-[8px]">
			<div className="flex justify-between">
				<h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center uppercase">
					Audience ages{" "}
					<IoMdInformationCircle size={20} className="ml-2 text-[#c4c4c4]" />
				</h5>
				<div className="font-normal text-[16px] text-[#8d8d8d] flex gap-x-5 pr-10">
					<div className="flex items-center">
						<GoDotFill className="pink shrink-0" size={22} />
						<p className="text-[16px] text-[#8d8d8d] text-normal">Women</p>
					</div>
					<div className="flex items-center">
						<GoDotFill className="purple shrink-0" size={22} />
						<p className="text-[16px] text-[#8d8d8d] text-normal">Men</p>
					</div>
				</div>
			</div>
			<AudienceAgeGraph data={data} />
			{/* <div className="grid sm:grid-cols-6 grid-cols-3 justify-center">
				{(data || []).map((item, key) => {
					let maleValue = ((item.male || 0) * 100).toFixed(2);
					let femaleValue = ((item.female || 0) * 100).toFixed(2);
					return (
						<div
							key={key}
							className="flex flex-col justify-end items-center mt-12"
						>
							<div className="flex">
								<div className="relative">
									<p
										className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
										style={{ bottom: `${maleValue + 16}%` }}
									>
										{maleValue}%
									</p>
									<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent ">
										<div
											className="bg-[#1fcfc5] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
											style={{
												height: `${maleValue + 16}%`,
											}}
										></div>
									</div>
								</div>
								<div className="relative ml-6">
									<p
										className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
										style={{ bottom: `${femaleValue + 16}%` }}
									>
										{femaleValue}%
									</p>
									<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent">
										<div
											className="bg-[#7c3292] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
											style={{
												height: `${femaleValue + 16}%`,
											}}
										></div>
									</div>
								</div>
							</div>
							<div className="mt-6 text-center">
								<h5 className="text-[15px] darkGray font-medium whitespace-nowrap">
									{item.code}
								</h5>
							</div>
						</div>
					);
				})}
			</div> */}
		</div>
	);
}
