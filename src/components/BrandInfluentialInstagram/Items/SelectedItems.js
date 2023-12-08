import React, { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import { FiX } from "react-icons/fi";
import LinkTo from "@components/global/LinkTo";
import Tooltip from "@components/global/Tooltip";

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

class SelectedItems extends Component {
	handleRemoveInfluencer = (influencer) => {
		const { removeInfluencer } = this.props;
		removeInfluencer(influencer);
	};

	render() {
		const { selected_influencers } = this.props;
		return (
			<div className="py-[8px] bg-white rounded-[8px] divide-y divide-#0000001f">
				{selected_influencers && selected_influencers.length ? (
					selected_influencers.map((influencer, index) => (
						<div
							key={index}
							className="group relative flex items-center justify-start py-[8px] pr-[28px] pl-[16px]"
						>
							<div>
								<LinkTo
									to="#"
									text={
										<img
											src={influencer.picture ? influencer.picture : avatar}
											className="w-[52px] rounded-full h-[52px] overflow-hidden"
											alt={influencer.username}
											onError={({ currentTarget }) => {
												currentTarget.onerror = null;
												currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
											}}
										/>
									}
								/>
							</div>
							<div className="ml-[10px] grow">
								<LinkTo
									to="#"
									text={
										<Tooltip
											trigger={
												<div className="ml-2">
													<h6 className="truncate text-[16px]">
														{" "}
														{influencer.username
															? "@" + influencer.username
															: ""}
													</h6>
												</div>
											}
											tooltipText={
												influencer.username ? influencer.username : ""
											}
											placement="top-left"
										/>
									}
								></LinkTo>
								<span className="Notification-user-brand">
									Followers: <FormatedNumber num={influencer.followers} />
								</span>
							</div>
							<div className="absolute right-[16px] top-[50%] transform -translate-y-[50%] cursor-pointer">
								<FiX
									className="red hidden group-hover:block"
									onClick={() => this.handleRemoveInfluencer(influencer)}
									size={16}
								/>
							</div>
						</div>
					))
				) : (
					<h3 className="text-center mt-12 gray mt-[90px]">Nothing to show</h3>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ campaign }) => {
	return {
		selected_influencers: campaign.selected_influential_influencers,
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
				data: { influencer: influencer, flag: true, type: "influential" },
			});
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(React.memo(SelectedItems));
