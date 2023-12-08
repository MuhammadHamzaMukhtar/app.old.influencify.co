import { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import * as brandProfileActions from "@store/actions/BrandProfileActions";
import BrandProfileDialog from "@components/BrandProfileDialog";

class WaitingRequestedInfluencerCampaigns extends Component {
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
		if (this.state.limit < (this.props.requestedInfluencerCampaigns || []).length) {
			this.setState({
				limit: this.state.limit + 6,
			});
		}
	};

	render() {
		return (
			<div>
				<div className="grid grid-cols-12 gap-5">
					{(this.props.requestedInfluencerCampaigns || []).length > 0 ? (
						this.props.requestedInfluencerCampaigns
							.slice(0, this.state.limit)
							.map((waitingRequestedCampaign, index) => (
								<div
									className="md:col-span-4 sm:col-span-6 col-span-12"
									key={index}
								>
									<span className="text-right block">
										{waitingRequestedCampaign.campaignDate.formatedPostingFrom}{" "}
										- {waitingRequestedCampaign.campaignDate.formatedPostingTo}
									</span>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0">
										<Link
											to={`/influencer/influencer-booking/${waitingRequestedCampaign.id}`}
											className="block"
										>
											<div className="block">
												<div
													className="flex items-center mb-4 py-4 pl-[1rem]"
													onClick={() =>
														this.handleClickOpen(
															waitingRequestedCampaign.campaignUserEmail
														)
													}
												>
													<div>
														<img
															src={
																waitingRequestedCampaign.campaignUserAvatar
																	? waitingRequestedCampaign.campaignUserAvatar
																	: avatar
															}
															alt={waitingRequestedCampaign.campaignUserName}
															className="w-[52px] rounded-full"
														/>
													</div>
													<div className="pl-3">
														<h4 className="font-semibold text-[20px]">
															{waitingRequestedCampaign.campaignUserName}
														</h4>
													</div>
												</div>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="flex flex-col px-4">
												<div className="py-12 flex justify-between">
													<p>Campaign</p>
													<b className="text-right break-all">
														{waitingRequestedCampaign.campaignTitle}
													</b>
												</div>
											</div>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<p className="py-12 px-4 flex items-center">
												{waitingRequestedCampaign?.platform?.name == "instagram" &&

													<FaInstagram className="success mr-3" />

												}
												{waitingRequestedCampaign?.platform?.name == "youtube" &&
													<FaYoutube className="success mr-3" />

												}
												{waitingRequestedCampaign?.platform?.name == "tiktok" &&
													<FaTiktok className="success mr-3" />

												}
												{waitingRequestedCampaign?.platform?.name}
											</p>
											<div className="h-[1px] w-full bg-[#0000001f]" />
											<div className="flex flex-col px-4">
												<div className="py-12 flex justify-between">
													<p>Fixed Fee</p>
													<h6 className=" text-[16px]">
														{waitingRequestedCampaign.fixedFee}{" "}
														{this.props.currentLoggedUser.currency_code}{" "}
														{waitingRequestedCampaign.products &&
															waitingRequestedCampaign.products.length
															? "+ Voucher"
															: ""}
													</h6>
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
				{this.state.limit < (this.props.requestedInfluencerCampaigns || []).length ? (
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
		requestedInfluencerCampaigns:
			state.InfluencerBookingReducer.requestedInfluencerCampaigns,
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
)(WaitingRequestedInfluencerCampaigns);