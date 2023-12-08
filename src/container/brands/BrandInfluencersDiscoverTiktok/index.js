import React, { Component } from "react";
import { connect } from "react-redux";
import IqInfluencerDiscoveryTab from "@components/BrandInfluencerDiscover/NavTabs";
import TiktokFilters from "./TiktokFilters";
import TiktokItems from "./TiktokItems";
import { Helmet } from "react-helmet";

class BrandInfluencersDiscoverTiktok extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	componentDidMount = () => {
		if (this.timeout) clearTimeout(this.timeout);
		let payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		const actions = Object.assign([], this.props.actions);
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
			platform: "tiktok",
			payload: payload,
			override_filter: form.override_filter,
		};

		this.timeout = setTimeout(() => {
			// this.props.setDefaultFilters();
			this.props.searchInfluencers(query);
			this.props.searchInfluencersCount(query);
		}, 500);
	};

	render() {
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Discover | Tiktok | {process.env.REACT_APP_NAME}</title>
				</Helmet>
				<div className="mb-12">
					<div className="pt-6 bg-white">
						<div className="mb-0">
							<IqInfluencerDiscoveryTab />
							<div className="bg-[#ddd] h-[1px] w-full mt-6" />
							<TiktokFilters customContainer="containers px-0" />
						</div>
					</div>
					<div className="containers">
						<div className="mt-12">
							<TiktokItems newCampaignWithSelected={true} />
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
	const { actions, types } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		setDefaultFilters: () => {
			dispatch({ type: types.HANDLE_SET_DEFAULT_SEARCH_FILTERS });
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(BrandInfluencersDiscoverTiktok);
