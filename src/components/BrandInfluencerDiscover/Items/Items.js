import { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
// import InfluencerListModal from "../../InfluencerListModal";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import avatar from "@assets/avatar.png";
import SocialListIcons from "../../../constants/SocialListIcons";
import "./styles.css";
import Emitter from "../../../constants/Emitter";

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


const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

class InstagramItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileModal: false,
			showmodal: false,
			influencerUserId: "",
			errorCount: 0,
		};
	}

	handleInfluencerProfileModal = async (id) => {
		const { platform } = this.props;
		if (id) {
			this.setState({
				profileModal: true,
			});
			let query = {
				platform: platform,
				user_id: id,
			};
			const json = await this.props.viewInfluencerProfile(id);

			if (json?.data?.error) {
				this.setState({
					profileModal: false,
				});
			}
		}
	};

	handleClose = () => {
		this.setState({
			profileModal: false,
		});
	};

	_handleInfluencerSelection = (e, influencer) => {
		const { addInfluencer, newCampaignWithSelected } = this.props;
		addInfluencer(e.target.checked, influencer, newCampaignWithSelected);
	};
	showInfluencerList = (item) => {
		if (this.props.refreshData.is_admin) {
			this.setState({ showmodal: true });
			this.setState({ influencerUserId: item });
			let query = {
				platform: this.props.platform,
			};
			this.props.fetchBrandLists(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};
	closeInfluenceModalList = () => {
		this.setState({ showmodal: false });
	};
	searchBrand = (data) => {
		this.props.fetech.searchBrand(data);
	};

	handleImageError = (event) => {
		const { currentTarget } = event;
		this.setState({ errorCount: (prevErrorCount) => prevErrorCount + 1 });

		if (this.state.errorCount < 3) {
			const fallbackImage = this.props.influencer.user_profile?.picture || `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
			currentTarget.src = fallbackImage;
		} else {
			currentTarget.src = avatar
		}
	};


	render() {
		const {
			isProfileLoading,
			influencer,
			currentLoggedUser,
			platform,
			selected_influencers,
			newCampaignWithSelected,
		} = this.props;

		const suggestedFee = influencer?.user_profile?.followers * 0.005 + influencer?.user_profile?.engagements * 0.05;

		return (
			<>
				<div
					className={
						"relative outline outline-1 rounded-[8px] overflow-hidden mb-6 sm:!mb-0 group " +
						(selected_influencers.find(
							(selectedInfluencer) =>
								selectedInfluencer.user_profile.user_id ===
								influencer.user_profile.user_id
						)
							? "shadow-[0_0_10px_0_#f32c66] outline-[#f32c66] selected-user "
							: "shadow-[0px_4px_5px_#96969640] outline-transparent")
					}
				>
					<div className="absolute z-[11] bg-[#fd2965] cursor-pointer  w-full rounded-t-[8px] hidden group-hover:block">
						<div className="flex items-center justify-between w-full p-[1rem]">
							<label
								htmlFor={`influencer-` + influencer.user_profile.user_id}
								className="cursor-pointer flex items-center text-[15px] font-normal"
							>
								<input
									id={`influencer-` + influencer.user_profile.user_id}
									type="checkbox"
									disabled={selected_influencers.some(
										(selectedInfluencer) =>
											selectedInfluencer.user_profile.user_id ===
											influencer.user_profile.user_id &&
											selectedInfluencer.isActive
									)}
									checked={
										selected_influencers && selected_influencers.length > 0
											? selected_influencers.some((selectedInfluencer) =>
												selectedInfluencer.user_profile.user_id !==
													influencer.user_profile.user_id
													? false
													: true
											)
											: false
									}
									onChange={(e) =>
										this._handleInfluencerSelection(e, influencer)
									}
									className="hidden peer"
								/>
								<span className="mr-3 peer-checked:bg-[#fff] bg-transparent h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-[#fd2965] inline-block border-2 border-[#fff] rounded-sm"></span>
							</label>
							{selected_influencers.find(
								(selectedInfluencer) =>
									selectedInfluencer.user_profile.user_id ===
									influencer.user_profile.user_id
							) ? (
								<h6 className="text-white text-[16px]">Selected</h6>
							) : (
								<h6 className="text-white text-[16px]">Select</h6>
							)}
						</div>
					</div>
					<dev
						className="relative block cursor-pointer"
						onClick={() =>
							this.handleInfluencerProfileModal(
								influencer.user_profile.user_id
									? influencer.user_profile.user_id
									: ""
							)
						}
					>
						<img
							src={
								influencer.user_profile
									? influencer.user_profile.picture
									: avatar
							}
							alt={
								influencer.user_profile.fullname
									? influencer.user_profile.fullname
									: ""
							}
							className="min-h-[299px] max-h-[300px] w-full"
							onError={this.handleImageError}
						/>

						<div className="p-0 absolute w-full h-full inset-0 bg-gradient-to-t from-[#494949e6] via-[#7373737d]/20 to-transperant flex items-end rounded-t-[8px]">
							<div className="px-3 pb-[20px]">
								<b className="block text-white">
									<Tooltip
										trigger={
											<p className="card-name">
												{" "}
												{influencer.user_profile.fullname
													? influencer.user_profile.fullname
													: ""}
											</p>
										}
										tooltipText={
											influencer.user_profile.fullname
												? influencer.user_profile.fullname
												: ""
										}
										placement="top-left"
									/>
								</b>
							</div>
						</div>
					</dev>

					<div className="flex flex-col bg-white">
						<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
							<div className="flex items-center">
								<p className="success">{SocialListIcons(platform, 16)}</p>
								<p className="ml-2 text-[10pt] text-[#000000de] font-medium">
									Followers
								</p>
							</div>
							<b className="text-[10pt]">
								<FormatedNumber num={influencer.user_profile.followers} />
							</b>
						</div>
						<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
							<p className="text-[10pt] text-[#000000de] font-medium">
								Avg. Engagement
							</p>
							<b className="text-[10pt]">
								{influencer.user_profile.engagements ? (
									<FormatedNumber num={influencer.user_profile.engagements} />
								) : (
									0
								)}{" "}
								(
								{influencer.user_profile.engagement_rate
									? (influencer.user_profile.engagement_rate * 100).toFixed(2)
									: 0}
								% )
							</b>
						</div>
						{(
							<div className="flex justify-between py-[0.75rem] px-[10px]">
								<p className="text-[10pt] text-[#000000de] font-medium">
									Views
								</p>
								<b className="text-[10pt]">
									{influencer.user_profile &&
										influencer.user_profile.avg_views ? (
										<FormatedNumber num={influencer.user_profile.avg_views} />
									) : (
										0
									)}
								</b>
							</div>
						)}
					</div>
				</div>
				<InfluencerProfileModal
					newCampaignWithSelected={newCampaignWithSelected}
					isProfileLoading={isProfileLoading}
					platform={platform}
					open={this.state.profileModal}
					onClose={() => this.handleClose()}
				/>
				{/* <InfluencerListModal 
					show={this.state.showmodal}
					platform={platform} 
					closeModal = {this.closeInfluenceModalList} 
					userId = {this.state.influencerUserId}
					brandLists={this.props.brandLists} 
					searchBrand={this.props.searchBrand}
					createBrand = {this.props.addNewBrand}
					addInfluencer = {this.props.addInfluencerToList}
             	/> */}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isProfileLoading: state.influencerSearch.isProfileLoading,
		influencers: state.influencerSearch.influencers,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		selected_influencers: state.campaign.selected_influencers,
		brandLists: state.brandList.brandlists,
		campaign_status: state.campaign.form.campaign_status,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	const { types } = require("@store/redux/CampaignRedux");
	const { actions: brandlistactions } = require("@store/redux/BrandListRedux");
	return {
		...ownProps,
		...stateProps,
		viewInfluencerProfile: (data) => {
			return actions.viewInfluencerProfile(dispatch, data);
		},
		addInfluencer: (status, influencer, flag) => {
			dispatch({
				type: types.HANDLE_ADD_INFLUENCER,
				data: { status: status, influencer: influencer, flag: flag },
			});
		},

		fetchBrandLists: (data) => {
			brandlistactions.fetchBrandLists(dispatch, data);
		},

		searchBrand: (data) => {
			brandlistactions.searchBrand(dispatch, data);
		},
		addNewBrand: (data) => {
			brandlistactions.addNewBrand(dispatch, data);
		},

		addInfluencerToList: (data) => {
			brandlistactions.addInfluencerToList(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(InstagramItems);
