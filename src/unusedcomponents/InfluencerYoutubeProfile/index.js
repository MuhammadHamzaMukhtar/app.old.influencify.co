import { Component } from "react";
import { connect } from "react-redux";
import InfluencerProfileTab from "@components/InfluencerProfileTab";

class InfluencerYoutubeProfile extends Component {
	render() {
		return (
			<>
				<div className="influencer-profile-header">
					<div className="mb-0">
						<InfluencerProfileTab />
					</div>
				</div>
				<div className="containers">
					<div className="mt-12">
						<h2>Coming Soon</h2>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerYoutubeProfile);
