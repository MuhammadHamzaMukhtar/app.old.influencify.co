import React, { Component } from "react";
import { connect } from "react-redux";
// import {withRouter} from "react-router";

class Topsearches extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	searchInfluencer = (search_id, name) => {
		if (search_id && name) {
			const payload = Object.assign({}, this.props.payload);
			const form = Object.assign({}, this.props.form);
			payload["filter"]["geo"] = [{ id: search_id }];
			form["filter"]["geo"] = [{ id: search_id, name: name }];

			payload["paging"]["skip"] = 0;
			form["loadMore"] = false;

			this.props.searchFilters(payload, form);

			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.props.navigate("/discovery/youtube");
			}, 500);
		}
	};

	render() {
		return (
			<div className="Topsearches">
				<div className="grid grid-cols-12 gap-5 mb-6">
					{(this.props.topSearches || []).length
						? (this.props.topSearches || []).slice(0, 2).map((search, index) => (
								<div key={index} className="md:col-span-6 col-span-12">
									<div
										onClick={() =>
											this.searchInfluencer(
												search.search_id,
												search.country.name
											)
										}
										className="rounded-[8px] cursor-pointer relative overflow-hidden"
									>
										<img
											className="rounded-[8px] min-h-[300px] max-h-[300px] w-full"
											alt={search.country ? search.country.name : ""}
											src={
												search.country.imagepPath
													? search.country.imagepPath
													: ""
											}
										/>
										<div className="flex justify-center items-center flex-col bg-[#282b3c66] absolute top-0 h-full w-full">
											<p className="text-white font-normal text-[18px]">
												{search.country ? search.country.name : ""}
											</p>
										</div>
									</div>
								</div>
						  ))
						: ""}
				</div>
				<div className="grid grid-cols-12 gap-5 mb-6">
					{(this.props.topSearches || []).length
						? (this.props.topSearches || []).slice(2, 5).map((search, index) => (
								<div key={index} className="md:col-span-4 col-span-12">
									<div
										onClick={() =>
											this.searchInfluencer(
												search.search_id,
												search.country.name
											)
										}
										className="rounded-[8px] cursor-pointer relative overflow-hidden"
									>
										<img
											className="rounded-[8px] min-h-[300px] max-h-[300px] w-full"
											alt={search.country ? search.country.name : ""}
											src={
												search.country.imagepPath
													? search.country.imagepPath
													: ""
											}
										/>
										<div className="flex justify-center items-center flex-col bg-[#282b3c66] absolute top-0 h-full w-full">
											<p className="text-white font-normal text-[18px]">
												{search.country ? search.country.name : ""}
											</p>
										</div>
									</div>
								</div>
						  ))
						: ""}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BrandDashboardReducer.isLoading,
		topSearches: state.BrandDashboardReducer.topSearches,
		payload: state.influencerSearch.payload,
		form: state.influencerSearch.form,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Topsearches);
