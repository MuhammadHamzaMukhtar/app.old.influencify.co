import { Component } from "react";
import { connect } from "react-redux";
import MiniPosts from "./Sections/MiniPosts";
//import TiktokMiniProfileInfo from "./Sections/TiktokMiniProfileInfo";
import TiktokBlock from "../Sections/TiktokBlock";
import AudienceGender from "../Sections/AudienceGender";
import AudienceAge from "../Sections/AudienceAge";

class TiktokMiniProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		const { current_influencer, platform } = this.props;
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
						{/* <TiktokMiniProfileInfo platform={platform} /> */}
					</div>

					<TiktokBlock />
					<MiniPosts />
					{/* <div className="grid grid-cols-12 gap-5">
						<div className="lg:col-span-7 col-span-12 mt-4 flex flex-col">
							<AudienceAge />
						</div>
						<div className="lg:col-span-5 col-span-12 mt-4 flex flex-col">
							<AudienceGender />
						</div>
					</div> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		current_influencer: influencerSearch.current_influencer,
	};
};

export default connect(mapStateToProps, null)(TiktokMiniProfile);
