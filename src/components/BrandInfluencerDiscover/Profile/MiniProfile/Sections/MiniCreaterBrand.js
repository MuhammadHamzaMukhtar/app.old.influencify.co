import ProxyImage from "@components/ProxyImage";
import { useSelector } from "react-redux";

export default function MiniCreaterBrand() {
	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);
	const {account} = (influencer || {});
	return (
		<div className="border-[1px] border-[#dee2e6] p-4 h-full rounded-[8px]">
			<h4 className="font-medium darkGray text-[15px] mb-2">
				Creator's Brand Affinity
			</h4>
			<div className="flex flex-wrap">
				{(account?.user_profile?.brand_affinity || []).map((affinity, index) => (
						<div
							className="sm:w-6/12 w-full cursor-pointer flex items-center mb-4"
							key={index}
						>
							{affinity.brand && affinity.brand?.logo && (
								<div className="w-[22px] h-[22px] overflow-hidden flex mr-2">
									<ProxyImage
										url={process.env.REACT_APP_AWS_URl + affinity.brand?.logo}
										className="object-contain w-[22px] h-[22px]"
										alt="logo"
										addCancelToken={() => { }}
									/>
								</div>
							)}
							<p className="text-[13px] font-normal black">{affinity.name}</p>
						</div>
					))}
			</div>
		</div>
	);
}
