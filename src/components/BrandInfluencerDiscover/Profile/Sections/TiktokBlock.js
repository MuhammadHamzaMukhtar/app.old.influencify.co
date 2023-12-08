import { useSelector } from "react-redux";
import icon1 from "@assets/followers.png";
import icon2 from "@assets/engagment.png";
import Credability from "@assets/credability.png";
import icon6 from "@assets/globe.png";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

export default function TiktokBlock() {
	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);

	const {account, match} = (influencer || {});

	return (
		<div className="mt-12 md:!mt-0">
			<div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-5">
				<div className="text-center">
					<div className="hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] shadow-none p-3 profile-stats  border h-full flex flex-col justify-center items-center ">
						<img src={icon1} alt="followers" width="40" />
						<h4 className="mt-2 text-[20px] font-semibold">
							<FormatedNumber
								num={account?.user_profile?.followers}
								decimal={0}
							/>
						</h4>
						<p className="font-normal">Followers</p>
					</div>
				</div>
				<div className="text-center">
					<div className="hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] shadow-none p-3 profile-stats  border h-full flex flex-col justify-center items-center">
						<img src={icon2} alt="Engagements" width="40" />
						<h4 className="mt-2 text-[20px] font-semibold">
							<FormatedNumber
								num={account?.user_profile?.engagements}
							/>
						</h4>
						<p className="font-normal">Engagements</p>
					</div>
				</div>
				<div className="text-center">
					<div className="hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] shadow-none p-3 profile-stats  border h-full flex flex-col justify-center items-center">
						<img src={icon2} alt="Engagement Rate" width="40" />
						<h4 className="mt-2 text-[20px] font-semibold">
						{((account?.user_profile?.engagement_rate || 0)*100).toFixed(2)}
							%
						</h4>
						<p className="font-normal">Engagement Rate</p>
					</div>
				</div>
				<div className="text-center">
					<div className="hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] shadow-none p-3 profile-stats  border h-full flex flex-col justify-center items-center">
						<img src={Credability} alt="Credability" width="40" />
						<h4 className="mt-2 text-[20px] font-semibold">
							{((match?.audience_likers?.data?.audience_credibility || 0)*100).toFixed(2)}
							%
						</h4>
						<p className="font-normal">Credibility</p>
					</div>
				</div>
				<div className="text-center">
					<div className="hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] shadow-none p-3 profile-stats  border h-full flex flex-col justify-center items-center">
						{account?.user_profile?.geo?.country ? (
							<div>
									<span
										className={`text-[22px] flag-icon flag-icon-${(account?.user_profile?.geo?.country?.code || "").toLowerCase()}`}
									></span>
									<h4 className="mt-2 text-[20px] font-semibold">
										{(account?.user_profile?.geo?.country?.name)}
									</h4>
							</div>
						) : (
							<div>
								<img src={icon6} alt="no" width="40" />
								<h4 className="mt-2 text-[20px] font-semibold">N/A</h4>
							</div>
						)}
						<p className="font-normal">Country</p>
					</div>
				</div>
			</div>
		</div>
	);
}
