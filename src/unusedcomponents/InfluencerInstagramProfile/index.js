import React, { Component } from "react";
import { connect } from "react-redux";
import InfluencerProfileTab from "@components/InfluencerProfileTab";
import ContainerLoader from "@components/ContainerLoader";
import Tooltip from "@components/global/Tooltip";
import { Link } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import InstagramProfile from "@components/BrandInfluencerDiscover/Profile/InstagramProfile";
import * as influencerProfileActions from "@store/actions/InfluencerProfileActions";
import { Helmet } from "react-helmet";

class InfluencerInstagramProfile extends Component {
	componentDidMount = () => {
		const { viewInfluencerProfile } = this.props;
		let query = {
			platform: "instagram",
		};
		viewInfluencerProfile(query);
	};

	render() {
		const url = window.location.href;
		const { currentLoggedUser } = this.props;
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Influencer Profile | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				{currentLoggedUser &&
				currentLoggedUser.isConnectedInstagram === true ? (
					<>
						<div className="influencer-profile-header">
							<div className="mb-0">
								<InfluencerProfileTab />
							</div>
						</div>
						<div className="containers">
							<div className="mt-12">
								<div className="relative h-50">
									{this.props.isProfileLoading ? (
										<ContainerLoader />
									) : (
										<>
											<div className="social-media text-right">
												<Tooltip
													trigger={
														<FaSyncAlt
															onClick={() =>
																this.props.refreshInfluencerProfile({
																	platform: "instagram",
																})
															}
															disabled={this.props.refreshProfileLoading}
															className={
																"sync-alt " +
																(this.props.refreshProfileLoading
																	? "animate-[spin_2s_linear_infinite] pink"
																	: "")
															}
														/>
													}
													tooltipText="Refresh Profile"
													placement="top-left"
												/>
											</div>
											<InstagramProfile />
										</>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						You have not connected to Instagram <br />
						<Link to="/influencer/setting-influencer-platforms">
							<button
								type="button"
								className="w-20 mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
							>
								Connect Instagram
							</button>
						</Link>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({
	influencerSearch,
	InfluencerProfileReducer,
	HeaderReducer,
}) => {
	return {
		isProfileLoading: influencerSearch.isProfileLoading,
		refreshProfileLoading: InfluencerProfileReducer.refreshProfileLoading,
		currentLoggedUser: HeaderReducer.currentLoggedUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
		refreshInfluencerProfile: (data) => {
			dispatch(influencerProfileActions.refreshInfluencerProfile(data));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerInstagramProfile);
