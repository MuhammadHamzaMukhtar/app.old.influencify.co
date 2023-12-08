import React from "react";
import { connect } from "react-redux";
//import MiniProfileInfo from "./Sections/MiniProfileInfo";
import MiniPosts from "./Sections/MiniPosts";
import MiniAudienceAge from "./Sections/MiniAudienceAge";
import MiniAudienceGender from "./Sections/MiniAudienceGender";
import MiniCreaterInterest from "./Sections/MiniCreaterInterest";
import MiniCreaterBrand from "./Sections/MiniCreaterBrand";

class InstagramMiniProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
		this.profileData = React.createRef();
		this.audienceData = React.createRef();
		this.interestData = React.createRef();
		this.postsData = React.createRef();
	}
	handleScrollToElement = (event) => {
		if (event === "profile") this.profileData.current?.scrollIntoView();
		else if (event === "audience") this.audienceData.current?.scrollIntoView();
		else if (event === "interest") this.interestData.current?.scrollIntoView();
		else if (event === "post") this.postsData.current?.scrollIntoView();
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		const { platform, influencer } = this.props;
		const {account, match} = (influencer || {});
		if (this.state.hasError) {
			return (
				<div className="containers">
					<div className="text-center pt-12 mb-12">
						<h2 className="text-[24px]  mt-6 mb-4 black">
							Something went wrong.
						</h2>
						<p>Whoops, something went wrong. please try again</p>
					</div>
				</div>
			);
		}
		return (
			<div className="relative px-10 user-profile-page" id="user-profile-page">
				<div className="pt-6">
					<div className="mt-12 mb-6">
						{/* <MiniProfileInfo platform={platform} /> */}
					</div>

					{/* <div ref={this.postsData}>
						{current_influencer &&
						current_influencer.instagramFeeds &&
						current_influencer.instagramFeeds.length ? (
							<MiniPosts />
						) : (
							""
						)}
					</div> */}
					{match?.audience_likers?.data?.audience_genders &&
					<div className="grid grid-cols-12 gap-5 mb-6" ref={this.audienceData}>
						
						<div className="xl:col-span-5 col-span-12 mt-4 xl:!mt-0 flex flex-col">
							<MiniAudienceGender />
						</div>
						
						<div className="xl:col-span-7 col-span-12 mt-4 xl:!mt-0 flex flex-col">
							<MiniAudienceAge />
						</div>
					</div>
					}
					<p
						className="text-[18px] black font-medium mb-2"
						ref={this.interestData}
					>
						Interests & Brand Affininty
					</p>
					<div className="grid grid-cols-12 gap-5 mb-6">
						<div className="lg:col-span-6 col-span-12 mt-4 lg:!mt-0 flex flex-col">
							{(account?.user_profile?.interests || []).length>0 && (
								<MiniCreaterInterest />
							)}
						</div>
						<div className="lg:col-span-6 col-span-12 mt-4 lg:!mt-0 flex flex-col">
							{(account?.user_profile?.brand_affinity || []).length>0 && (
								<MiniCreaterBrand />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		influencer: influencerSearch.influencer,
	};
};

export default connect(mapStateToProps, null)(InstagramMiniProfile);
