import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { FaInstagram } from "react-icons/fa";
import BrandProfileDialog from "@components/BrandProfileDialog";
import * as brandProfileActions from "@store/actions/BrandProfileActions";
import { HANDLE_CLOSE_BRAND_PROFILE } from "@store/constants/action-types";

class InfluencersBookingCard extends Component {
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
		if (this.state.limit < this.props.findInfluencerCampaigns.length) {
			this.setState({
				limit: this.state.limit + 6,
			});
		}
	};

	render() {
		return (
			<>
				<div className="grid grid-cols-12 gap-5">
					{this.props.findInfluencerCampaigns &&
					this.props.findInfluencerCampaigns.length ? (
						this.props.findInfluencerCampaigns
							.slice(0, this.state.limit)
							.map((findCampaign, index) => (
								<div
									className="md:col-span-4 sm:col-span-6 col-span-12"
									key={index}
								>
									<span className="text-right block">
										{findCampaign.campaignDate.formatedPostingFrom} -{" "}
										{findCampaign.campaignDate.formatedPostingTo}
									</span>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0">
										<Link to="#" className="block">
											<div
												className="flex items-center mb-4 py-4 pl-[1rem]"
												onClick={() =>
													this.handleClickOpen(findCampaign.campaignUserEmail)
												}
											>
												<div>
													<img
														src={
															findCampaign.campaignUserAvatar
																? findCampaign.campaignUserAvatar
																: avatar
														}
														alt={findCampaign.campaignUserName}
														className="w-[52px] rounded-full"
													/>
												</div>
												<div className="pl-3">
													<h4 className="font-semibold text-[20px]">
														{findCampaign.campaignUserName}
													</h4>
												</div>
											</div>
										</Link>
										<div className="h-[1px] w-full bg-[#0000001f]" />
										<Link
											to={`/influencer/influencer-booking/${findCampaign.id}`}
											className="block"
										>
											<div className="flex flex-col">
												<div className="py-12 flex justify-between">
													<p>Title</p>
													<b className="text-right">
														{findCampaign.campaignTitle}
													</b>
												</div>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<p className="py-12 pl-3">
												<FaInstagram className="success pr-3" />
												{findCampaign.campaignCountry}
											</p>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="flex flex-col">
												<div className="py-12 flex justify-between">
													<p>Fixed Fee</p>
													<h5 className=" text-[18px]">
														{findCampaign.fixedFee}{" "}
														{this.props.currentLoggedUser.currency_code}{" "}
														{findCampaign.products &&
														findCampaign.products.length
															? "+ Voucher"
															: ""}
													</h5>
												</div>
											</div>
										</Link>
									</div>
								</div>
							))
					) : (
						<div className="text-center col-span-12 w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
				{this.state.limit < this.props.findInfluencerCampaigns.length ? (
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
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		findInfluencerCampaigns:
			state.FindInfluencerCampaignsReducer.findInfluencerCampaigns,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		viewBrandProfile: (query) =>
			dispatch(brandProfileActions.viewBrandProfile(query)),
		closeBrandProfile: (event) =>
			dispatch({ type: HANDLE_CLOSE_BRAND_PROFILE, payload: event }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencersBookingCard);
