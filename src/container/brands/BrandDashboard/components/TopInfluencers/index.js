import { Component } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import maleAvatar from "@assets/male_avatar.png";
import InstagramLogo from "@assets/instagram_logo.png";
import { connect } from "react-redux";
import "./styles.css";
import Slider from "react-slick";

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

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<FiChevronRight size={22} />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<FiChevronLeft size={22} />
		</div>
	);
}

class TopInfluencers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false,
			influencerId: "",
			profileModal: false,
		};
	}

	handleInfluencerProfileModal = async (user_id, modash_id) => {
		if (user_id) {
			await this.props.viewInfluencerProfile(user_id);
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

	addDefaultSrc(ev) {
		ev.target.src = maleAvatar;
	}

	render() {
		const settings = {
			className: "center",
			dots: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 9024,
					settings: {
						infinite: false,
						slidesToShow: 5,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 1024,
					settings: {
						centerMode: false,
						slidesToShow: 3,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 768,
					settings: {
						centerPadding: "60px",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 380,
					settings: {
						centerPadding: "60px",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
			],
			speed: 500,
		};
		return (
			<div className="infl-slick-carousel top-influencers">
				<Slider {...settings}>
					{this.props.topinfluencersAnalyzed &&
					this.props.topinfluencersAnalyzed.length
						? this.props.topinfluencersAnalyzed.map((topInfluencer, index) => (
								<div className="px-2 py-[0.5rem]" key={index}>
									<div className="rounded-[8px] mb-6 sm:!mb-0 border-0 cursor-pointer bg-white shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] overflow-hidden">
										<div
											className="relative"
											onClick={() =>
												this.handleInfluencerProfileModal(
													topInfluencer.iq_user_id,
													topInfluencer?.modash_id
												)
											}
										>
											<img
												onError={this.addDefaultSrc}
												className="min-h-[200px] max-h-[200px] rounded-t-[8px] w-full"
												src={
													topInfluencer?.profile_picture_url
														? topInfluencer?.profile_picture_url
														: ""
												}
												alt={topInfluencer?.infl_username}
											/>
											<div className="p-0 flex justify-end items-center flex-col rounded-top bg-[#282b3c66] absolute top-0 w-full h-full">
												<p className="text-white font-normal text-[15px]">
													{topInfluencer?.infl_username}
												</p>
												<b className="font-light mb-12 text-white">
													{topInfluencer?.infl_username}
												</b>
											</div>
										</div>

										<div className="mt-4 p-3 relative">
											<div className="absolute top-[-35px] w-[40px] h-[40px] flex items-center justify-center bg-white z-[11] rounded-full cursor-pointer left-2/4 transform -translate-x-[50%]">
												<img
													src={InstagramLogo}
													width="30"
													alt="platform logo"
												/>
											</div>
											<div className="flex justify-between items-center">
												<div className="text-center">
													<h5 className="text-[16px]">
														<FormatedNumber
															num={topInfluencer?.followers_count}
														/>
													</h5>
													<p className="text-[10px] darkGray">FOLLOWERS</p>
												</div>
												<div className="text-center">
													<h5 className="text-[16px]">
														<FormatedNumber num={(topInfluencer?.interactions || 0)} />
													</h5>
													<p className="text-[10px] darkGray">INTERACTIONS</p>
												</div>
												<div className="text-center">
													<h5 className="text-[16px]">
														{topInfluencer?.engagement_rate}
													</h5>
													<p className="text-[10px] darkGray">ENGAGEMENT</p>
												</div>
											</div>
										</div>
									</div>
								</div>
						  ))
						: ""}
				</Slider>
				<>
					<InfluencerProfileModal
						isProfileLoading={this.props.isProfileLoading}
						platform="instagram"
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
		isLoading: state.BrandDashboardReducer.isLoading,
		isProfileLoading: state.influencerSearch.isProfileLoading,
		topinfluencersAnalyzed: state.BrandDashboardReducer.topinfluencersAnalyzed,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		viewInfluencerProfile: (data) => {
			actions.viewInfluencerProfile(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopInfluencers);
