import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfluencerProfileModal from "../InfluencerProfileModal";
import SocialListIcons from "../../../../constants/SocialListIcons";

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

class LookalikeProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileModal: false,
		};
	}

	handleInfluencerProfileModal = async (id) => {
		const { platform } = this.props;
		if (id) {
			
			let query = {
				platform: platform,
				user_id: id,
			};
			await this.props.viewInfluencerProfile(id);
			this.setState({
				profileModal: true,
			});
		}
	};

	handleClose = () => {
		this.setState({
			profileModal: false,
		});
	};

	render() {
		const { current_influencer, isProfileLoading, platform } = this.props;
		return (
			<div>
				<div className="grid grid-cols-12 gap-5">
					{current_influencer.audienceLookalikes &&
					current_influencer.audienceLookalikes.length ? (
						current_influencer.audienceLookalikes
							.slice(0, 4)
							.map((influencer, index) => (
								<div
									className="md:col-span-3 sm:col-span-6 col-span-12"
									key={index}
								>
									<div className="rounded-[8px] mb-6 sm:!mb-0 border-0 cursor-pointer bg-white shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] overflow-hidden">
										<Link
											to="#"
											onClick={() =>
												this.handleInfluencerProfileModal(
													influencer.user_id ? influencer.user_id : ""
												)
											}
											className="relative"
										>
											<img
												className="min-h-[300px] max-h-[300px] rounded-t-[8px] w-full"
												src={influencer?.picture}
												alt={influencer.fullname}
											/>

											<div className="p-0 flex justify-end items-center flex-col rounded-top bg-[#282b3c66] absolute top-0 w-full h-full ">
												<p className="text-white font-normal text-[15px]">
													{influencer.fullname}
												</p>
												<b className="font-light mb-12 text-white">
													@{influencer.username}
												</b>
											</div>
										</Link>

										<div className="mt-4 p-3 relative">
											<div className="absolute top-[-35px] w-[40px] h-[40px] flex items-center justify-center bg-white z-[11] rounded-full cursor-pointer left-2/4 transform -translate-x-[50%]">
												{SocialListIcons(platform, 30)}
											</div>
											<div className="flex justify-between items-center">
												<div className="text-center">
													<h5 className="text-[18px]">
														<FormatedNumber num={influencer.followers} />
													</h5>
													<p className="text-[10px]">FOLLOWERS</p>
												</div>
												<div className="text-center">
													<h5 className="text-[18px]">
														{influencer.engagementRate.toFixed(2)}%
													</h5>
													<p className="text-[10px]">ENGAGEMENT</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
				<>
					<InfluencerProfileModal
						isProfileLoading={isProfileLoading}
						platform={platform}
						open={this.state.profileModal}
						onClose={() => this.handleClose()}
					/>
				</>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isProfileLoading: state.influencerSearch.isProfileLoading,
		platform: state.influencerSearch.platform,
		current_influencer: state.influencerSearch.current_influencer,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(LookalikeProfile);
