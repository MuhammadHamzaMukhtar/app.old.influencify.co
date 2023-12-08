import { useRef } from "react";
import FullProfileInfo from "./Sections/FullProfileInfo";
// import Stats from "./Sections/Stats";
// import InteractionData from "./Sections/InteractionData";
// import Blocks from "./Sections/Blocks";
import Posts from "./Sections/Posts";
// import AudienceAge from "./Sections/AudienceAge";
// import AudienceGender from "./Sections/AudienceGender";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import AudienceCountry from "./Sections/AudienceCountry";
import AudienceCity from "./Sections/AudienceCity";
import AudienceInterest from "./Sections/AudienceInterest";
import LookalikeProfile from "./Sections/LookalikeProfile";
import { useSelector } from "react-redux";
import MiniBlocks from "./MiniProfile/Sections/MiniBlocks";
import MiniAudienceGender from "./MiniProfile/Sections/MiniAudienceGender";
import MiniAudienceAge from "./MiniProfile/Sections/MiniAudienceAge";
import MiniGeographical from "./MiniProfile/Sections/MiniGeographical";
import MiniLocationCity from "./MiniProfile/Sections/MiniLocationCity";
import MiniLanguage from "./MiniProfile/Sections/MiniLanguage";
import MiniCreaterInterest from "./MiniProfile/Sections/MiniCreaterInterest";
import MiniCreaterBrand from "./MiniProfile/Sections/MiniCreaterBrand";
import MiniAudienceBrand from "./MiniProfile/Sections/MiniAudienceBrand";
import MiniAudienceInterest from "./MiniProfile/Sections/MiniAudienceInterest";

function InstagramProfile(props) {
	const profileDataRef = useRef(null);
	const postRef = useRef(null);
	const audienceDataRef = useRef(null);
	const affinintyInterestsRef = useRef(null);
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	const { newCampaignWithSelected, platform } = props;
	return (
		<div>
			<div className="relative px-10">
				<div className="profile-wrapper my-4">
					<div className="grid grid-cols-12 gap-5">
						<div className="relative flex flex-col col-span-12">
							<FullProfileInfo
								platform={platform}
								newCampaignWithSelected={newCampaignWithSelected}
							/>
						</div>
					</div>
				</div>
				<div className="border-bottom flex flex-wrap py-3 gap-x-5 mb-12">
					<p
						className="pr-3 darkGray font-medium cursor-pointer"
						onClick={() =>
							profileDataRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "start",
							})
						}
					>
						Profile data
					</p>
					<p
						className="pr-3 darkGray font-medium cursor-pointer"
						onClick={() =>
							audienceDataRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "start",
							})
						}
					>
						Audience data
					</p>
					<p
						className="pr-3 darkGray font-medium cursor-pointer"
						onClick={() =>
							affinintyInterestsRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "start",
							})
						}
					>
						Interests & Brand Affinity
					</p>
					<p
						className="pr-3 darkGray font-medium cursor-pointer"
						onClick={() =>
							postRef.current?.scrollIntoView({
								behavior: "smooth",
								block: "start",
							})
						}
					>
						Posts
					</p>
				</div>
				{/* <InteractionData /> */}
				<div ref={profileDataRef}>
					<MiniBlocks />
				</div>
				<div ref={postRef}>
					<Posts />
				</div>
				<p className="text-[18px] black font-medium mt-12">Audience data</p>
				<div ref={audienceDataRef} className="grid grid-cols-12 gap-5">
					<div className="mt-4 flex flex-col xl:col-span-5 col-span-12">
						<MiniAudienceGender />
					</div>
					<div className="mt-4 flex flex-col xl:col-span-7 col-span-12">
						<MiniAudienceAge />
					</div>
				</div>
				<div className="grid grid-cols-12 gap-5 mb-6">
					<div className="mt-4 flex flex-col xl:col-span-4 lg:col-span-6 col-span-12">
						<MiniGeographical />
					</div>
					<div className="mt-4 flex flex-col xl:col-span-4 lg:col-span-6 col-span-12">
						<MiniLocationCity />
					</div>
					<div className="mt-4 flex flex-col xl:col-span-4 lg:col-span-6 col-span-12">
						<MiniLanguage />
					</div>
				</div>
				<p className="text-[18px] black font-medium mb-2 pt-3">
					Interests & Brand Affininty
				</p>
				<div ref={affinintyInterestsRef} className="grid grid-cols-12 gap-5">
					<div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
						<MiniCreaterInterest />
					</div>
					<div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
						<MiniCreaterBrand />
					</div>
				</div>
				<div className="grid grid-cols-12 gap-5">
					<div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
						<MiniAudienceInterest />
					</div>
					<div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
						<MiniAudienceBrand />
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
				{current_influencer.audienceLookalikes &&
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

export default InstagramProfile;
