import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import { useSelector } from "react-redux";

export default function ProfileInfo(props) {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);

	return (
		<div className="p-3 mb-12">
			<div className="grid grid-cols-12 gap-5">
				<div className="md:col-span-2 col-span-12 text-center">
					<img
						src={
							current_influencer.influencerInfo &&
							current_influencer.influencerInfo.profile_picture_url
								? current_influencer.influencerInfo.profile_picture_url
								: avatar
						}
						alt={current_influencer?.influencerInfo?.infl_name}
						className="w-[152px] rounded-full"
					/>
				</div>
				<div className="md:col-span-7 col-span-12 text-center">
					<Link to="#">
						<div className="p-[0.35em_0.65em] text-[0.75em] rounded-[8px] text-center font-bold text-white bg-[#6c757d]">
							{current_influencer.influencerInfo &&
							current_influencer.influencerInfo.influencer_type
								? current_influencer.influencerInfo.influencer_type
								: ""}
						</div>
					</Link>
					<h3 className="mt-6 mb-4 black font-medium">
						{current_influencer.influencerInfo &&
						current_influencer?.influencerInfo?.infl_name
							? current_influencer?.influencerInfo?.infl_name
							: ""}
					</h3>
					<div className="mt-4">
						<Link className="pink" to="#">
							{current_influencer.influencerInfo &&
							current_influencer.influencerInfo.infl_bio
								? truncate(current_influencer.influencerInfo.infl_bio)
								: ""}
						</Link>
					</div>
					<div className="mt-4">
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
				</div>
				<div className="md:col-span-3 col-span-12">
					<div className="mt-6 text-center">
						<button
							type="button"
							className="px-6 rounded-[8px] h-[40px] text-[13px] inline-flex items-center bg--purple text-white hover:opacity-80"
						>
							Download
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function truncate(input) {
	if (input.length > 50) {
		return input.substring(0, 50) + "...";
	}
	return input;
}
