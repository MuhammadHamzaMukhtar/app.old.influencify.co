import { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
import { Link } from "react-router-dom";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import avatar from "@assets/avatar.png";
import InfluencerListModal from "../../InfluencerListModal";
import "./styles.css";
import SocialListIcons from "../../../constants/SocialListIcons";

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

class Items extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileModal: false,
			showmodal: false,
			influencerUserName: "",
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

	_handleInfluencerSelection = (e, influencer) => {
		const { addInfluencer } = this.props;
		addInfluencer(e.target.checked, influencer);
	};

	showInfluencerList = (userName) => {
		this.setState({ showmodal: true });
		this.setState({ influencerUserName: userName });
		let query = {
			platform: this.props.platform,
		};
		this.props.fetchBrandLists(query);
	};

	closeInfluenceModalList = () => {
		this.setState({ showmodal: false });
	};
	searchBrand = (data) => {
		this.props.fetech.searchBrand(data);
	};

	render() {
		const {
			isProfileLoading,
			influencer,
			currentLoggedUser,
			platform,
			selected_influencers,
		} = this.props;
		return (
			<>
				<div
					className={
						"relative outline outline-1 rounded-[8px] overflow-hidden mb-6 sm:!mb-0 group " +
						(selected_influencers.find(
							(selectedInfluencer) =>
								selectedInfluencer.user_id === influencer.user_id
						)
							? "shadow-[0_0_10px_0_#f32c66] outline-[#f32c66] selected-user "
							: "shadow-[0px_4px_5px_#96969640] outline-transparent")
					}
				>
					<div className="absolute z-[11] bg-[#fd2965] cursor-pointer  w-full rounded-t-[8px] hidden group-hover:block">
						<div className="flex items-center justify-between w-full p-[1rem]">
							<label
								htmlFor={`influencsel-` + influencer.user_id}
								className="cursor-pointer flex items-center text-[15px] font-normal"
							>
								<input
									id={`influencsel-` + influencer.user_id}
									type="checkbox"
									disabled={selected_influencers.some(
										(selectedInfluencer) =>
											selectedInfluencer.user_id === influencer.user_id &&
											selectedInfluencer.isActive
									)}
									checked={
										selected_influencers && selected_influencers.length > 0
											? selected_influencers.some((selectedInfluencer) =>
													selectedInfluencer.user_id !== influencer.user_id
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
									selectedInfluencer.user_id === influencer.user_id
							) ? (
								<h6 className="text-white text-[16px]">Selected</h6>
							) : (
								<h6 className="text-white text-[16px]">Select</h6>
							)}
						</div>
					</div>
					<Link
						to="#"
						className="relative block"
						onClick={() =>
							this.handleInfluencerProfileModal(influencer.user_id)
						}
					>
						<img
							className="min-h-[299px] max-h-[300px] w-full"
							src={influencer.picture ? influencer.picture : avatar}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
							}}
							alt={influencer.fullname ? influencer.fullname : ""}
						/>

						<div className="p-0 absolute top-0 w-full h-full bg-gradient-to-b from-[#000000e6] via-[#0000007d] to-[#000000e6] flex items-end rounded-t-[8px]">
							<div className="px-3 pb-[20px]">
								<b className="block text-white">
									<Tooltip
										trigger={
											<p className="card-name">
												{influencer.fullname ? influencer.fullname : ""}
											</p>
										}
										tooltipText={influencer.fullname ? influencer.fullname : ""}
										placement="top-left"
									/>
								</b>
							</div>
						</div>
					</Link>

					<div className="flex flex-col bg-white">
						<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
							<div className="flex items-center">
								<p className="success">{SocialListIcons(platform, 16)}</p>

								<p className="ml-2 text-[10pt] text-[#000000de] font-medium">
									Followers
								</p>
							</div>
							<b className="text-[10pt]">
								<FormatedNumber num={influencer.followers} />
							</b>
						</div>

						<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
							<p className="text-[10pt] text-[#000000de] font-medium">
								Avg. Engagement
							</p>
							<b className="text-[10pt]">
								{influencer.engagements} ({influencer.engagementRate.toFixed(2)}
								% )
							</b>
						</div>
						<div className="flex justify-between py-[0.75rem] px-[10px]">
							<p className="text-[10pt] text-[#000000de] font-medium">
								Estimated Media Value
							</p>
							<b className="text-[10pt]">
								{influencer.suggestedFee
									? influencer.suggestedFee +
									  " " +
									  currentLoggedUser.currency_code
									: "N/A"}
							</b>
						</div>
					</div>
				</div>
				<>
					<InfluencerProfileModal
						isProfileLoading={isProfileLoading}
						platform={platform}
						open={this.state.profileModal}
						onClose={() => this.handleClose()}
					/>
				</>
				<InfluencerListModal
					show={this.state.showmodal}
					platform={this.props.platform}
					closeModal={this.closeInfluenceModalList}
					userId={this.state.influencerUserName}
					brandLists={this.props.brandLists}
					searchBrand={this.props.searchBrand}
					createBrand={this.props.addNewBrand}
					addInfluencer={this.props.addInfluencerToList}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isProfileLoading: state.influencerSearch.isProfileLoading,
		//platform              : state.influencerSearch.platform,
		influencers: state.influencerSearch.influencers,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		selected_influencers: state.campaign.selected_influential_influencers,
		brandLists: state.brandList.brandlists,
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
			actions.viewInfluencerProfile(dispatch, data);
		},

		addInfluencer: (status, influencer) => {
			dispatch({
				type: types.HANDLE_ADD_INFLUENCER,
				data: {
					status: status,
					influencer: influencer,
					flag: true,
					type: "influential",
				},
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

export default connect(mapStateToProps, undefined, mergeProps)(Items);
