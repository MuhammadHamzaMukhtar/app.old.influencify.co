import { Component } from "react";
import { connect } from "react-redux";
import AnalyzerFilter from "@components/BrandInfluencerAnalyzer/Filters/AnalyzerFilter";
import AnalyzerItems from "@components/BrandInfluencerAnalyzer/Items/AnalyzerItems";
import { Helmet } from "react-helmet";

class BrandInfluencersAnalyzerTiktok extends Component {
	constructor(props) {
		super(props);
		this.page = 0;
	}

	componentDidMount() {
		const { handlePlatform } = this.props;
		handlePlatform("tiktok");
		this.loadMore();
		this.props.fetchCampaginTypes();
	}

	loadMore = (page=1) => {
		const { analyzedUsers } = this.props;
		let query = {
			platform: "tiktok",
			sort_query: "date",
		};
		this.page = page;
		analyzedUsers(this.page, query);
	};

	resetPage = () => {
		this.page = 1;
	};

	render() {
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Analyzer | Tiktok | {process.env.REACT_APP_NAME}</title>
				</Helmet>
				<div className="mb-12">
					<AnalyzerFilter />
					<AnalyzerItems resetPage={this.resetPage} loadMore={this.loadMore} />
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerAnalyzerRedux");
	const { actions: campaignactions } = require("@store/redux/CampaignRedux");
	return {
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		analyzedUsers: (page, data) => {
			actions.analyzedUsers(dispatch, page, data);
		},
		fetchCampaginTypes: () => {
			campaignactions.fetchCampaginTypes(dispatch);
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(BrandInfluencersAnalyzerTiktok);
