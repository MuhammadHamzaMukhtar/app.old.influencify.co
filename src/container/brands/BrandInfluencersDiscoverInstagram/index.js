import { Component } from "react";
import { connect } from "react-redux";
import IqInfluencerDiscoveryTab from "@components/BrandInfluencerDiscover/NavTabs";
import InstagramFilters from "./InstagramFilters";
import InstagramItems from "./InstagramItems";
import { Helmet } from "react-helmet";

class BrandInfluencersDiscoverInstagram extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	componentDidMount = () => {
		if (this.timeout) clearTimeout(this.timeout);
		let payload = Object.assign({}, this.props.payload);
		const actions = Object.assign([], this.props.actions);
		const form = Object.assign({}, this.props.form);
		if (actions.length > 0) {
			payload = {
				...payload,
				filter: {
					...payload.filter,
					actions: actions,
				},
			};
		}
		let query = {
			platform: "instagram",
			payload: payload,
			override_filter: form.override_filter,
		};

		this.timeout = setTimeout(() => {
			this.props.searchInfluencers(query);
			this.props.searchInfluencersCount(query);
		}, 500);
	};

	render() {
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Discover | Instagram | {process.env.REACT_APP_NAME}</title>
				</Helmet>

				<div className="mb-12">
					<div className="pt-6 bg-white">
						<IqInfluencerDiscoveryTab />
						<div className="bg-[#ddd] h-[1px] w-full mt-6" />
						<InstagramFilters customContainer="containers px-0" />
					</div>
					<div className="containers">
						<div className="mt-12">
							<InstagramItems newCampaignWithSelected={true} />
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		platform: influencerSearch.platform,
		form: influencerSearch.form,
		payload: influencerSearch.payload,
		actions: influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(BrandInfluencersDiscoverInstagram);
