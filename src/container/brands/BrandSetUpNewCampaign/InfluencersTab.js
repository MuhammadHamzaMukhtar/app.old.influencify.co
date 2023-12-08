import React from "react";
import { Tab, Nav } from "react-bootstrap";
import InstagramFilters from "@container/brands/BrandInfluencersDiscoverInstagram/InstagramFilters";
import YoutubeFilters from "@container/brands/BrandInfluencersDiscoverYoutube/YoutubeFilters";
import TiktokFilters from "@container/brands/BrandInfluencersDiscoverTiktok/TiktokFilters";
import InstagramItems from "@container/brands/BrandInfluencersDiscoverInstagram/InstagramItems";
import YoutubeItems from "@container/brands/BrandInfluencersDiscoverYoutube/YoutubeItems";
import TiktokItems from "@container/brands/BrandInfluencersDiscoverTiktok/TiktokItems";
import { connect } from "react-redux";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { MdMusicNote } from "react-icons/md";

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class InfluencersTab extends React.Component {
	handleSelect = (key) => {
		const { clearFilters, handlePlatform, searchInfluencers } = this.props;
		clearFilters();
		handlePlatform(key);
		const payload = Object.assign({}, this.props.payload);
		let query = {
			platform: key,
			payload: payload,
		};
		searchInfluencers(query);
	};

	render() {
		const { typeName, total } = this.props;
		return (
			<>
				<div className="Influencers-page">
					<div className="containers">
						<Tab.Container
							defaultActiveKey="instagram"
							onSelect={this.handleSelect}
						>
							<div className="containers influencer-tabs bg-white pt-3 pb-1 border-bottom">
								<Nav variant="pills" className="m-0 nav-platform-tabs">
									<Nav.Item>
										<Nav.Link eventKey="instagram">
											<BsInstagram className="mr-2" />
											Instagram
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="youtube">
											<BsYoutube className="mr-2" />
											Youtube
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="tiktok">
											<MdMusicNote className="mr-2" />
											Tiktok{" "}
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
							<div>
								<Tab.Content className="px-0">
									<Tab.Pane eventKey="instagram">
										<InstagramFilters customContainer="containers filter-content-container pb-4" />
										<div className="containers">
											<div className="mt-12">
												{typeName === "PUBLIC" ? (
													<div className="search-total-num mt-2">
														{" "}
														{total
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
														influencers found
													</div>
												) : (
													<InstagramItems newCampaignWithSelected={false} />
												)}
											</div>
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="youtube">
										<YoutubeFilters customContainer="containers filter-content-container pb-4" />
										<div className="containers">
											<div className="mt-12">
												<YoutubeItems />
											</div>
										</div>
									</Tab.Pane>
									<Tab.Pane eventKey="tiktok">
										<TiktokFilters customContainer="containers filter-content-container pb-4" />
										<div className="containers">
											<div className="mt-12">
												<TiktokItems />
											</div>
										</div>
									</Tab.Pane>
								</Tab.Content>
							</div>
						</Tab.Container>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		payload: state.influencerSearch.payload,
		total: state.influencerSearch.total,
		typeName: state.SetUpNewCampaignReducer.typeName,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		fetchDictionaries: () => {
			actions.fetchDictionaries(dispatch);
		},
		clearFilters: () => {
			actions.clearFilters(dispatch);
		},
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(InfluencersTab);
