import { GoDotFill } from "react-icons/go";
import Activity from "@assets/svgs/activity.svg";
import MiniAudienceChart from "@components/BrandInfluencerDiscover/Profile/MiniProfile/Sections/MiniAudienceChart";
import EngagementRateGraph from "@components/BrandInfluencerDiscover/Profile/MiniProfile/Sections/EngagementRateGraph";

const formatedNumber = (num) => {
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

const InfluencerMeta = ({ profile, data }) => {

	return (
		<div className="bg-white rounded-[8px] p-6 h-full">
			<div className="flex items-end mb-3">
				<img src={Activity} alt="activity" className="w-[35px]" />
				<h4 className="ml-4 text-[30px] leading-[30px] text-[#8d8d8d] font-semibold">
					{((profile?.engagement_rate || 0) * 100).toFixed(2)}%
				</h4>
				{/* {profile?.language && ( */}
				<p className="text-[20px] font-medium text-[#8d8d8d] ml-3">
					Engagement Rate
				</p>
				{/* )} */}
			</div>
			<div className="flex flex-wrap items-end justify-center mt-12">
				<div className="flex w-7/12 justify-center">
					<MiniAudienceChart profile={profile} />
				</div>

				<div>
					<div className="mb-3">
						<p className="text-[16px] text-[#8d8d8d] font-medium w-24">
							{formatedNumber(profile?.avg_likes)}
						</p>
						<div className="flex items-center">
							<GoDotFill className="purple shrink-0" size={22} />
							<p className="text-[16px] text-[#8d8d8d] text-normal">Likes</p>
						</div>
					</div>
					<div className="mb-3">
						<p className="text-[16px] text-[#8d8d8d] font-medium w-24">
							{formatedNumber(profile?.avg_views)}
						</p>
						<div className="flex items-center">
							<GoDotFill className="pink shrink-0" size={22} />
							<p className="text-[16px] text-[#8d8d8d] text-normal">
								Video Views
							</p>
						</div>
					</div>
					<div className="mb-3">
						<p className="text-[16px] text-[#8d8d8d] font-medium w-24">
							{formatedNumber(profile?.avg_comments)}
						</p>
						<div className="flex items-center">
							<GoDotFill className="success shrink-0" size={22} />
							<p className="text-[16px] text-[#8d8d8d] text-normal">Comments</p>
						</div>
					</div>
				</div>
			</div>
			<EngagementRateGraph
				engagement_rate_histogram={data}
				engagement_rate={profile?.engagement_rate}
				profile_picture_url={profile?.picture}
			/>
		</div>
	);
};

export default InfluencerMeta;
