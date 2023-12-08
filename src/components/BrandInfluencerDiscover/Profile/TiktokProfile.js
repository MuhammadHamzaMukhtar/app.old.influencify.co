import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import ProfileInfo from "./Sections/ProfileInfo";
import Stats from "./Sections/Stats";
import InteractionData from "./Sections/InteractionData";
import Blocks from "./Sections/Blocks";
import Posts from "./Sections/Posts";
import AudienceAge from "./Sections/AudienceAge";
import AudienceGender from "./Sections/AudienceGender";
import AudienceCountry from "./Sections/AudienceCountry";
import AudienceCity from "./Sections/AudienceCity";
import AudienceInterest from "./Sections/AudienceInterest";
import LookalikeProfile from "./Sections/LookalikeProfile";
import { useSelector } from "react-redux";

function TiktokProfile(props) {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	const { newCampaignWithSelected, platform } = props;
	return (
		<div>
			<div className="relative px-10">
				<div className="profile-wrapper my-4">
					<div className="grid grid-cols-1 gap-5">
						<div className="relative flex flex-col lg:col-span-4 col-span-12">
							<ProfileInfo
								platform={platform}
								newCampaignWithSelected={newCampaignWithSelected}
							/>
						</div>
						{/* <div className="relative flex flex-col lg:col-span-4 md:col-span-6 col-span-12">
								<Stats />
							</div>
							<div className="relative flex flex-col lg:col-span-4 md:col-span-6 col-span-12">
								<InteractionData />
							</div> */}
					</div>
				</div>
				{/* <Blocks /> */}
				<Posts />
				<div className="grid grid-cols-12 gap-5">
					<div className="mt-4 flex flex-col lg:col-span-7 col-span-12">
						<AudienceAge />
					</div>
					<div className="mt-4 flex flex-col lg:col-span-5 col-span-12">
						<AudienceGender />
					</div>
				</div>
				<AudienceCountry />
				<div className="grid grid-cols-12 gap-5">
					<div className="mt-4 flex flex-col md:col-span-6 col-span-12">
						{current_influencer &&
						current_influencer.audienceTopCities &&
						current_influencer.audienceTopCities.length ? (
							<AudienceCity />
						) : (
							""
						)}
					</div>
					<div className="mt-4 flex flex-col md:col-span-6 col-span-12">
						{current_influencer &&
						current_influencer.audienceTopInterests &&
						current_influencer.audienceTopInterests.length ? (
							<AudienceInterest />
						) : (
							""
						)}
					</div>
				</div>
				{current_influencer &&
				current_influencer.audienceLookalikes &&
				current_influencer.audienceLookalikes.length ? (
					<div className="grid grid-cols-12 gap-5 mb-12">
						<div className="col-span-12">
							<div className="mb-12">
								<h5 className="mb-6 mt-4 text-[20px] black font-medium">
									Lookalike Profiles
									<Tooltip
										trigger={
											<div className="ml-2">
												<BsQuestionCircle className="darkGray" size={22} />
											</div>
										}
										tooltipText="These are profiles with similar audience"
										placement="top-left"
									/>
								</h5>
								<LookalikeProfile />
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default TiktokProfile;
