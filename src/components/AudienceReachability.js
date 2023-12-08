import { IoMdInformationCircle } from "react-icons/io";
import Followers from "@assets/svgs/followers_alt.svg";
import AudienceGraph from "./AudienceGraph";

const formatedNumber = (num, decimal = 2) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(decimal).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(decimal).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(decimal).replace(/\.0$/, "") + "K";
	}
	return num;
};

const AudienceReachability = ({ profile, data }) => {
	return (
		<div className="bg-white rounded-[8px] p-6 h-full">
			<div className="flex items-end">
				<img src={Followers} alt="followers" className="w-[40px]" />
				<h4 className="ml-6 text-[30px] leading-[30px] text-[#8d8d8d] font-semibold">
					{formatedNumber(profile?.followers, 1)}
				</h4>
				<p className="text-[14px] text-normal text-[#8d8d8d] ml-3">Followers</p>
				<IoMdInformationCircle
					size={20}
					className="text-[#8d8d8d] ml-2 shrink-0"
				/>
			</div>
			<p className="text-[14px] font-normal text-[#8d8d8d] mt-5 mb-16">
				Audience Reachability
			</p>
			{data?.length > 0 &&
				<AudienceGraph data={data} />
			}
			{/* <div className="flex flex-wrap">
				{data && data.length > 0 ? (
					data.map((item, key) => {
						let percentage = (item.weight * 100).toFixed(0);
						let left_right = (item.code || "").split("-");

						return (
							<div
								key={key}
								className="w-3/12 vertical-prgress success-progrss flex flex-col justify-end items-center mt-12 px-[5px]"
							>
								<div className="relative">
									<p
										className="text-[#8d8d8d] text-[14px] font-normal mb-2 left-1/2 transform -translate-x-[50%] absolute"
										style={{ bottom: `${percentage}%` }}
									>
										{percentage}%
									</p>
									<div className="h-[20px] rounded-[12px] w-[15px] min-h-[100px] flex items-end bg-transparent overflow-hidden ">
										<div
											className="w-full rounded-[12px] bg-[#1fcfc5] flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap progress-bar-success"
											style={{ height: `${percentage}%` }}
										></div>
									</div>
								</div>
								<div className="mt-4 text-center">
									<h5 className="text-[16px] text-[#8d8d8d] font-medium">
										{formatedNumber(left_right?.[0])} {left_right?.[1]? "-":"+"} {formatedNumber(left_right?.[1])}
									</h5>
									<p className="text-[#8d8d8d] text-[12px] font-normal">
										Following
									</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-center w-full p-[5rem_1rem] text-[#bbb] leading-[40px] text-[18px]">
						We have nothing to show you here.
					</div>
				)}
			</div> */}
		</div>
	);
};

export default AudienceReachability;
