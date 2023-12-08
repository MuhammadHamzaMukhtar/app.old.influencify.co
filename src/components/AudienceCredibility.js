import { BsCheck2 } from "react-icons/bs";
import Credibility from "@assets/svgs/profile_credibility.svg";
import MiniCredibilityChart from "./BrandInfluencerDiscover/Profile/MiniProfile/Sections/MiniCredibilityChart";
import { GoDotFill } from "react-icons/go";

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

const AudienceCredibility = ({ data, profile, audience_likers }) => {
	const credibility = audience_likers?.audience_credibility
	const niceFollowers = profile?.followers * credibility
	const doubtFollowers = profile?.followers - niceFollowers
	return (
		<div className="bg-white rounded-[8px] p-6 h-full">
			<div className="flex items-end">
				<img src={Credibility} alt="credibility" className="w-[35px]" />
				<h4 className="ml-4 text-[30px] leading-[30px] text-[#8d8d8d] font-semibold">
					{((data?.audience_credibility || 0) * 100).toFixed(2)}%
				</h4>
				<p className="text-[14px] font-regular text-[#8d8d8d] ml-3 mb-1">
					Credibility{" "}
				</p>
			</div>
			<div className="flex items-center justify-center mt-12">
				<div className="flex w-7/12 justify-center">
					<MiniCredibilityChart niceFollowers={niceFollowers} doubtFollowers={doubtFollowers} />
				</div>
				<div className="w-5/12">
					<div className="mb-3">
						<p className="text-[16px] text-[#8d8d8d] font-medium w-24">
							{formatedNumber(niceFollowers)}
						</p>
						<div className="flex items-center">
							<GoDotFill className="success shrink-0" size={22} />
							<p className="text-[16px] text-[#8d8d8d] text-normal">Nice Followers</p>
						</div>
					</div>
					<div className="mb-3">
						<p className="text-[16px] text-[#8d8d8d] font-medium w-24">
							{formatedNumber(doubtFollowers)}
						</p>
						<div className="flex items-center">
							<GoDotFill className="pink shrink-0" size={22} />
							<p className="text-[16px] text-[#8d8d8d] text-normal">Doubtful Followers</p>
						</div>
					</div>
				</div>
			</div>
			<p className="text-[14px] font-light text-[#8d8d8d] mt-5 mb-3">
				{/* This parameter determines how reliable are the users following this
				account. The higher the parameter, the more real and engaged the
				account's audience. Following activities are considered as "not
				credible". */}
				We determine follower quality by taking into account factors such as:
			</p>
			<div>
				{/* <div className="flex items-start mb-3">
					<BsCheck2 className="success shrink-0" size={28} />
					<p className="text-[14px] font-light text-[#8d8d8d] ml-2">
						An account has no profile photo or photos or bio, but likes 50-100
						posts per day.
					</p>
				</div> */}
				<div className="flex items-start">
					{/* <BsCheck2 className="success shrink-0" size={28} /> */}
					<p className="text-[14px] font-light text-[#8d8d8d] ml-2">
						{/* An account follows no-one, but likes all posts from 50 individuals. */}
						- An account's avatar and bio description
					</p>
				</div>
				<div className="flex items-start">
					{/* <BsCheck2 className="success shrink-0" size={28} /> */}
					<p className="text-[14px] font-light text-[#8d8d8d] ml-2">
						{/* An account has posted 100 comments in a day on multiple days. But
						has no bio or posts. */}
						- Number of posts
					</p>
				</div>
				<div className="flex items-start mb-3">
					{/* <BsCheck2 className="success shrink-0" size={28} /> */}
					<p className="text-[14px] font-light text-[#8d8d8d] ml-2">
						{/* A profile has been active for months, but has no photos and has
						likes 500+ posts per day. */}
						- The number of accounts followed vs. followers.
					</p>
				</div>
				<p className="text-[14px] font-light text-[#8d8d8d]">
					Influencers with a genuine audience will atain scores of 7 and above.
				</p>
			</div>
		</div>
	);
};

export default AudienceCredibility;
