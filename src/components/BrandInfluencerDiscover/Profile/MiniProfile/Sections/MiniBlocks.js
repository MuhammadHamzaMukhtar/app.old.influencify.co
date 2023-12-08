import { useSelector } from "react-redux";
import { BsCheck2 } from "react-icons/bs";
import { IoMdInformationCircle } from "react-icons/io";
import Followers from "@assets/svgs/followers_alt.svg";
import Credibility from "@assets/svgs/profile_credibility.svg";
import Activity from "@assets/svgs/activity.svg";
import MiniAudienceChart from "./MiniAudienceChart";
import { GoDotFill } from "react-icons/go";

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

export default function MiniBlocks() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);

	return (
		<div className="mt-4">
			<h4 className="text-[18px] black font-medium mt-12">Profile data</h4>
			<div className="grid grid-cols-12 gap-5">
				<div className="xl:col-span-4 lg:col-span-6 col-span-12 mb-6">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full p-4">
						<div className="flex items-end">
							<img src={Followers} alt="followers" width="40" />
							<h4 className="ml-6 text-[30px] darkGray font-semibold">
								<FormatedNumber
									num={
										current_influencer.influencerInfo &&
										current_influencer.influencerInfo.followers_count
											? current_influencer.influencerInfo.followers_count
											: 0
									}
								/>
							</h4>
							<p className="text-[14px] font-normal darkGray ml-4 mb-1">
								Followers
							</p>
							<IoMdInformationCircle
								size={20}
								className="gray mb-1 ml-2 shrink-0"
							/>
						</div>
						<p className="text-[14px] font-normal darkGray mt-12">
							Audience Reachability
						</p>
						<div className="flex flex-wrap">
							<div className="col-3 vertical-prgress success-progrss flex flex-col justify-end items-center mt-12">
								<div className="relative">
									<p
										className="darkGray text-[14px] font-normal mb-2 top-percentage absolute"
										style={{ bottom: "60%" }}
									>
										60%
									</p>
									<div className="progress ">
										<div
											className="progress-bar progress-bar-success"
											style={{ height: "60%" }}
										></div>
									</div>
								</div>
								<div className="mt-6 text-center">
									<h5 className="text-[16px] darkGray font-medium">&#60;500</h5>
									<p className="darkGray text-[12px] font-normal">Following</p>
								</div>
							</div>
							<div className="col-3 vertical-prgress success-progrss flex flex-col justify-end items-center mt-12">
								<div className="relative">
									<p
										className="darkGray text-[14px] font-normal mb-2 top-percentage absolute"
										style={{ bottom: "50%" }}
									>
										50%
									</p>
									<div className="progress ">
										<div
											className="progress-bar progress-bar-success"
											style={{ height: "50%" }}
										></div>
									</div>
								</div>
								<div className="mt-6 text-center">
									<h5 className="text-[16px] darkGray font-medium">500 - 1k</h5>
									<p className="darkGray text-[12px] font-normal">Following</p>
								</div>
							</div>
							<div className="col-3 vertical-prgress success-progrss flex flex-col justify-end items-center mt-12">
								<div className="relative">
									<p
										className="darkGray text-[14px] font-normal mb-2 top-percentage absolute"
										style={{ bottom: "10%" }}
									>
										10%
									</p>
									<div className="progress ">
										<div
											className="progress-bar progress-bar-success"
											style={{ height: "10%" }}
										></div>
									</div>
								</div>
								<div className="mt-6 text-center">
									<h5 className="text-[16px] darkGray font-medium">1 - 1.5k</h5>
									<p className="darkGray text-[12px] font-normal">Following</p>
								</div>
							</div>
							<div className="col-3 vertical-prgress success-progrss flex flex-col justify-end items-center mt-12">
								<div className="relative">
									<p
										className="darkGray text-[14px] font-normal mb-2 top-percentage absolute"
										style={{ bottom: "26.09%" }}
									>
										26.09%
									</p>
									<div className="progress ">
										<div
											className="progress-bar progress-bar-success"
											style={{ height: "26.09%" }}
										></div>
									</div>
								</div>
								<div className="mt-6 text-center">
									<h5 className="text-[16px] darkGray font-medium">&#62;500</h5>
									<p className="darkGray text-[12px] font-normal">Following</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="xl:col-span-4 lg:col-span-6 col-span-12 mb-6">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full p-4">
						<div className="flex items-end mb-4">
							<img src={Activity} alt="activity" width="35" />
							<h4 className="ml-6 text-[30px] darkGray font-semibold mb-n1">
								{current_influencer.influencerInfo &&
								current_influencer.influencerInfo.engagement_rate
									? current_influencer.influencerInfo.engagement_rate + "%"
									: "N/A"}
							</h4>
							<p className="text-[14px] font-normal darkGray ml-4 ">ER </p>
						</div>
						<div className="flex flex-wrap items-end justify-center mt-12">
							<div className="flex col-sm-7 justify-center">
								<MiniAudienceChart />
							</div>
							<div>
								<div className="mb-4">
									<p className="text-[16px] darkGray font-medium w-24">3k</p>
									<div className="flex items-center">
										<GoDotFill className="purple shrink-0" size={22} />
										<p className="text-[16px] darkGray font-normal">Likes</p>
									</div>
								</div>
								<div className="mb-4">
									<p className="text-[16px] darkGray font-medium w-24">35</p>
									<div className="flex items-center">
										<GoDotFill className="success shrink-0" size={22} />
										<p className="text-[16px] darkGray font-normal">Comments</p>
									</div>
								</div>
								<div className="mb-4">
									<p className="text-[16px] darkGray font-medium w-24">4.2k</p>
									<div className="flex items-center">
										<GoDotFill className="pink shrink-0" size={22} />
										<p className="text-[16px] darkGray font-normal">
											Video Views
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="xl:col-span-4 lg:col-span-6 col-span-12 mb-6">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] h-full p-4">
						<div className="flex items-end">
							<img src={Credibility} alt="credibility" width="35" />
							<h4 className="ml-6 text-[30px] darkGray font-semibold">
								{current_influencer.influencerInfo &&
								current_influencer.influencerInfo.credibility
									? current_influencer.influencerInfo.credibility + "%"
									: "N/A"}
							</h4>
							<p className="text-[14px] font-normal darkGray ml-4 mb-1">
								Credibility{" "}
							</p>
						</div>
						<p className="text-[14px] font-light darkGray mt-12 mb-6">
							This parameter determines how reliable are the users following
							this account. The higher the parameter, the more real and engaged
							the account's audience. Following activities are considered as
							"not credible".
						</p>
						<div>
							<div className="flex items-start mb-4">
								<BsCheck2 className="success shrink-0" size={28} />
								<p className="text-[14px] font-light darkGray ml-2">
									An account has no profile photo or photos or bio, but likes
									50-100 posts per day.
								</p>
							</div>
							<div className="flex items-start mb-4">
								<BsCheck2 className="success shrink-0" size={28} />
								<p className="text-[14px] font-light darkGray ml-2">
									An account follows no-one, but likes all posts from 50
									individuals.
								</p>
							</div>
							<div className="flex items-start mb-4">
								<BsCheck2 className="success shrink-0" size={28} />
								<p className="text-[14px] font-light darkGray ml-2">
									An account has posted 100 comments in a day on multiple days.
									But has no bio or posts.
								</p>
							</div>
							<div className="flex items-start mb-4">
								<BsCheck2 className="success shrink-0" size={28} />
								<p className="text-[14px] font-light darkGray ml-2">
									A profile has been active for months, but has no photos and
									has likes 500+ posts per day.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
