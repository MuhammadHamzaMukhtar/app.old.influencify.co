import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const { actions } = require("@store/redux/CampaignRedux");

export default function ProfileInfo(props) {
	const dispatch = useDispatch();
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	const { newCampaignWithSelected } = props;

	const createCampaignInvite = (id) => {
		dispatch(
			actions.createCampaignInvite({ id: id, platform: props.platform })
		);
	};

	return (
		<>
			<div className="p-4 rounded-[8px] h-full">
				<div className="grid grid-cols-12 gap-5 text-center">
					<div className="md:col-span-3 col-span-3 text-center">
						{/* {current_influencer.isVerified ? 
						<div className="p-[0.35em_0.65em]  ml-2 text-[0.75em] rounded-[8px] text-center font-bold text-white bg-[#198754]">
                        <Badge variant="success"  className='p-1 ml-2'>Verified</Badge>
                    :
							<div className="p-[0.35em_0.65em]  ml-2 text-[0.75em] rounded-[8px] text-center font-bold text-white bg-[#6c757d]">
                        Not Verified</div>
                    } */}
					</div>
					<div className="sm:col-span-6 col-span-12">
						<img
							className="w-[152px] h-[152px] rounded-full mx-auto"
							src={
								current_influencer.influencerInfo &&
								current_influencer.influencerInfo.profile_picture_url
									? current_influencer.influencerInfo.profile_picture_url
									: avatar
							}
							alt={current_influencer?.influencerInfo?.infl_name}
						/>
					</div>
					{/* <div className="sm:col-span-3 col-span-12">
						<Link to="#">
							<div className="p-[0.35em_0.65em] text-[0.75em] rounded-[8px] text-center font-bold text-white bg-[#6c757d]">
								{current_influencer.influencerInfo &&
								current_influencer?.influencerInfo?.influencer_type
									? current_influencer?.influencerInfo?.influencer_type
									: ""}
							</div>
						</Link>
					</div> */}
				</div>
				<h3 className="text-center mt-6 mb-4 black font-medium">
					{current_influencer.influencerInfo &&
					current_influencer?.influencerInfo.infl_name
						? current_influencer?.influencerInfo?.infl_name
						: ""}
				</h3>
				<div className="text-center mt-4">
					<Link className="pink" to="#">
						{current_influencer.influencerInfo &&
						current_influencer?.influencerInfo.infl_bio
							? truncate(current_influencer?.influencerInfo?.infl_bio)
							: ""}
					</Link>
				</div>
				<div className="text-center mt-4">
					{current_influencer.infl_categories &&
					current_influencer.infl_categories.length ? (
						current_influencer.infl_categories.map((category, index) => (
							<span key={index} className="category-ribbon">
								<Link className="text-white" to="#">
									{category.name}
								</Link>
							</span>
						))
					) : (
						<div>
							{current_influencer.isIqdata &&
							current_influencer.influencerInfo.infl_interests &&
							current_influencer.influencerInfo.infl_interests.length
								? current_influencer.influencerInfo.infl_interests
										.slice(0, 3)
										.map((interest, index) => (
											<span key={index} className="category-ribbon">
												<Link className="text-white" to="#">
													{interest.name}
												</Link>
											</span>
										))
								: ""}
						</div>
					)}
				</div>
				<div className="mt-6 text-center">
					<div className="multi-buttons text-center inline-flex">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={
								current_influencer.influencerInfo &&
								current_influencer.influencerInfo.url
									? current_influencer.influencerInfo.url
									: ""
							}
						>
							<button
								type="button"
								className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray text-current hover:opacity-80 mr-4"
							>
								Follow
							</button>
						</a>
						{newCampaignWithSelected ? (
							<button
								type="button"
								onClick={() =>
									createCampaignInvite(current_influencer.influencerUniqueId)
								}
								className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
							>
								Invite
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function truncate(input) {
	if (input.length > 50) {
		return input.substring(0, 50) + "...";
	}
	return input;
}
