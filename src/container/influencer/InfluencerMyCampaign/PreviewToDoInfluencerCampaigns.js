import { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { FaInstagram } from "react-icons/fa";
import * as brandProfileActions from "@store/actions/BrandProfileActions";
import BrandProfileDialog from "@components/BrandProfileDialog";

class PreviewToDoInfluencerCampaigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			limit: 9,
		};
	}
	handleClickOpen = (email) => {
		this.setState({
			openDialog: true,
		});
		let query = {
			email: email,
		};
		this.props.viewBrandProfile(query);
	};

	handleClose = (event) => {
		this.setState({
			openDialog: event,
		});
	};

	onLoadMore = () => {
		if (this.state.limit < this.props.previewInfluencerCampaignsCount.length) {
			this.setState({
				limit: this.state.limit + 6,
			});
		}
	};

	render() {
		return (
			<div>
				<div className="grid grid-cols-12 gap-5">
					{this.props.previewInfluencerCampaignsCount.length > 0 ? (
						this.props.previewInfluencerCampaignsCount.map(
							(previewCampaign, index) => (
								<div className="md:col-span-4 sm:col-span-6 col-span-12">
									<span className="text-right block">
										{previewCampaign.campaignDate.formatedPostingFrom} -{" "}
										{previewCampaign.campaignDate.formatedPostingTo}
									</span>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0">
										<Link to="/influencers-profile" className="block">
											<div
												className="flex items-center mb-4 py-4 pl-[1rem]"
												// onClick={() => this.handleClickOpen(inProgressCampaign.campaignUserEmail)}
											>
												<div>
													<img
														src={
															previewCampaign.campaignUserAvatar
																? previewCampaign.campaignUserAvatar
																: avatar
														}
														alt={previewCampaign.campaignUserName}
														className="w-[52px] rounded-full"
													/>
												</div>
												<div className="pl-3">
													<h4 className="font-semibold text-[20px]">
														{previewCampaign.campaignUserName}
													</h4>
												</div>
											</div>
										</Link>
										<div className="h-[1px] w-full bg-[#0000001f]" />
										<Link
											to={`/influencer/influencer-booking/${previewCampaign.id}`}
											className="block"
										>
											<div className="flex flex-col px-4">
												<div className="py-12 flex justify-between">
													<p>Title</p>
													<b className="text-right">
														{previewCampaign.campaignTitle}
													</b>
												</div>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<p className="py-12  px-4 flex items-center">
												<FaInstagram className="success mr-3" />
												{previewCampaign.campaignCountry}
											</p>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="flex flex-col px-4">
												<div className="py-12 flex justify-between">
													<p>Fixed Fee</p>
													<h6 className=" text-[16px]">
														{previewCampaign.fixedFee}{" "}
														{this.props.currentLoggedUser.currency_code}{" "}
														{previewCampaign.products &&
														previewCampaign.products.length
															? "+ Voucher"
															: ""}
													</h6>
												</div>
											</div>
										</Link>
									</div>
								</div>
							)
						)
					) : (
						<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
				{this.state.limit <
				this.props.previewInfluencerCampaignsCount.length ? (
					<div className="text-center pt-3">
						<Button
							className="mb-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
							onClick={() => this.onLoadMore()}
							text="Load More"
						/>
					</div>
				) : (
					""
				)}
				<div>
					<BrandProfileDialog
						open={this.state.openDialog}
						onClose={() => this.handleClose(false)}
					/>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		previewInfluencerCampaignsCount:
			state.InfluencerBookingReducer.previewInfluencerCampaignsCount,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		viewBrandProfile: (query) =>
			dispatch(brandProfileActions.viewBrandProfile(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PreviewToDoInfluencerCampaigns);
