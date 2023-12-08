import { Component } from "react";
import InfluencersBookingCard from "./InfluencersBookingCard";
import * as findInfluencerCampaignsActions from "@store/actions/FindInfluencerCampaignsActions";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import { Helmet } from "react-helmet";

class InfluencerFindCampaigns extends Component {
	componentDidMount() {
		this.props.fetchInfluencerFindCampaigns();
	}

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[82vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div className="containers mt-12 mb-12">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Find Campaigns | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<InfluencersBookingCard />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.FindInfluencerCampaignsReducer.isLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInfluencerFindCampaigns: () =>
			dispatch(findInfluencerCampaignsActions.fetchInfluencerFindCampaigns()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerFindCampaigns);
