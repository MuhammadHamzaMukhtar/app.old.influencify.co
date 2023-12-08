import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaInstagram } from "react-icons/fa";
import InfluencerProfileDialog from "../../InfluencerProfileDialog";
import * as viewInfluencerProfileActions from "@store/actions/ViewInfluencerProfileActions";

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

class LookalikeProfiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lookAlikeModal: false,
			influencerId: "",
		};
	}

	handleLookAlikeShow = (id) => {
		this.setState({
			lookAlikeModal: true,
			influencerId: id,
		});
		this.props.viewInfluencerProfileUsername(id);
	};

	handleClose = () => {
		this.setState({
			lookAlikeModal: false,
		});
	};

	render() {
		return (
			<>
				<div className="grid grid-cols-12 gap-5">
					{this.props.audienceLookalikes.length ? (
						this.props.audienceLookalikes
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
												this.handleLookAlikeShow(influencer.username)
											}
											className="relative"
										>
											<img
												className="min-h-[300px] max-h-[300px] rounded-t-[8px] w-full"
												src={
													influencer.picture ? influencer.picture : ""
												}
												alt={influencer.fullname}
											/>

											<div className="p-0 flex justify-end items-center flex-col rounded-top bg-[#282b3c66] absolute top-0 w-full h-full ">
												<p className="text-white font-normal text-[15px]">
													{influencer.fullname}
												</p>
												<b className="font-light mb-12 text-white">
													{influencer.username}
												</b>
											</div>
										</Link>

										<div className="mt-4 p-3 relative">
											<div className="absolute top-[-35px] w-[40px] h-[40px] flex items-center justify-center bg-white z-[11] rounded-full cursor-pointer left-2/4 transform -translate-x-[50%]">
												<FaInstagram />
											</div>
											<div className="flex justify-between items-center">
												<div className="text-center">
													<h5 className="text-[18px]">
														<FormatedNumber num={influencer.followers} />
													</h5>
													<p className="text-[10px]">FOLLOWERS</p>
												</div>
												<div className="text-center">
													<h5 className="  text-[18px]">
														{influencer.engagementRate.toFixed(2)}%
													</h5>
													<p className="text-[10px]">ENGAGEMENT</p>
												</div>
											</div>
											{/*<button type="button" className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-white border-[1px] border-[#7c3292] text-[#7c3292] hover:opacity-80 justify-center">Add to My influencers</button> */}
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
				<div>
					<InfluencerProfileDialog
						influencerId={this.state.influencerId}
						open={this.state.lookAlikeModal}
						onClose={() => this.handleClose(false)}
					/>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		audienceLookalikes: state.InfluencerProfileReducer.audienceLookalikes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		viewInfluencerProfileUsername: (id) =>
			dispatch(viewInfluencerProfileActions.viewInfluencerProfileUsername(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LookalikeProfiles);
