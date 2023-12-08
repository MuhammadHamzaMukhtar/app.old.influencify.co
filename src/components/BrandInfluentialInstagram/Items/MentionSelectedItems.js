import React, { Component } from "react";
import Tooltip from "@components/global/Tooltip";
import { FaTimes } from "react-icons/fa";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class MentionSelectedItems extends Component {
	handleRemoveInfluencer = (influencer) => {
		const { removeInfluencer } = this.props;
		removeInfluencer(influencer);
	};

	render() {
		const { selected_influencers } = this.props;
		return (
			<div className="py-[8px]">
				{selected_influencers && selected_influencers.length ? (
					selected_influencers.map((influencer, index) => (
						<div key={index}>
							<div className="relative group flex items-center py-[8px]">
								<div className="shrink-0">
									<img
										src={
											influencer.user_profile.picture
												? influencer.user_profile.picture
												: avatar
										}
										className="w-[52px] h-[52px] rounded-full"
										alt={influencer.user_profile.username}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null;
											currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
										}}
									/>
								</div>
								<div className="ml-[10px] grow my-[4px]">
									<Tooltip
										trigger={
											<h6 className="truncate text-[16px]">
												{" "}
												{influencer.user_profile.username
													? "@" + influencer.user_profile.username
													: ""}
											</h6>
										}
										tooltipText={
											influencer.user_profile.username
												? influencer.user_profile.username
												: ""
										}
										placement="top-left"
									/>
									<span className="text-[#9ea1b2] mt-[5px] leading-[15px] inline-block">
										Followers:{" "}
										<FormatedNumber num={influencer.user_profile.followers} />
									</span>
								</div>
								<div className="absolute top-1/2 right-[16px] transform translate-y-[-50%] group-hover:block">
									<FaTimes
										className="text-[red] cursor-pointer"
										onClick={() => this.handleRemoveInfluencer(influencer)}
									/>
								</div>
							</div>
							<div className="bg-[#0000001f] h-[1px] w-full" />
						</div>
					))
				) : (
					<h3
						className="text-center mt-12"
						style={{ color: "gray", marginTop: "90px" }}
					>
						Nothing to show
					</h3>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ campaign }) => {
	return {
		selected_influencers: campaign.selected_mentions_influencers,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { types } = require("@store/redux/CampaignRedux");
	return {
		...ownProps,
		...stateProps,
		removeInfluencer: (influencer) => {
			dispatch({
				type: types.HANDLE_REMOVE_INFLUENCER,
				data: { influencer: influencer, flag: true, type: "mentions" },
			});
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(React.memo(MentionSelectedItems));
