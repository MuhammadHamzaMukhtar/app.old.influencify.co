import { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FaInstagram } from "react-icons/fa";
import {
	HANDLE_INFLUENCITY_LOCATION_SUCCESS,
	HANDLE_INFLUENCITY_CATEGORY_SUCCESS,
} from "@store/constants/action-types";

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

class TopInfluencerAnalyzed extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	searchInfluencer = (influencity) => {
		// this.props.handleInfluencityLocation(influencity.country);
		this.props.handleInfluencityCategory(influencity.category.id);
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.props.history.push("/brand/influencers");
		}, 500);
	};

	render() {
		const settings = {
			className: "center",
			dots: false,
			responsive: [
				{
					breakpoint: 2024,
					settings: {
						infinite: true,
						slidesToShow: 5,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 1024,
					settings: {
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
			<div className="InfluencitySlider">
				<Slider {...settings}>
					{this.props.topinfluencersAnalyzed.length
						? this.props.topinfluencersAnalyzed.map((topInfluencer, index) => (
								<div className="Top-Influencers-Analyzed " key={index}>
									<div className="Influencers-grid-card flex flex-col border-[1px] border-[#0000002d] relative recommended-card mb-6 sm:!mb-0 rounded">
										<Link
											to="#"
											onClick={(e) => this.handleRequestShow(e)}
											className="card-link"
										>
											{this.props.topInfluencer.basicInfo.isValidPictureUrl ? (
												<img
													className="rounded-t-[8px]"
													src={
														this.props.topInfluencer.basicInfo
															.profile_picture_url
															? this.props.topInfluencer.basicInfo
																	.profile_picture_url
															: dummyUser
													}
												/>
											) : (
												<div>
													<img src={dummyUser} />
												</div>
											)}
											<div className="p-0 flex justify-end grow items-center flex-col rounded-top ">
												<p className="text-white font-normal text-[15px]">
													{this.props.topInfluencer.displayname}
												</p>
												<b className="font-light mb-12 text-white">
													{this.props.topInfluencer.userName}
												</b>
											</div>
										</Link>

										<div className="mt-4 p-3 relative">
											<div className="insta-icon-over">
												<FaInstagram />
											</div>
											<div className="flex justify-between items-center">
												<div className="text-center">
													<h5 className="  text-[18px]">
														<FormatedNumber
															num={
																this.props.topInfluencer.basicInfo
																	.followers_count
															}
														/>
													</h5>
													<p className="text-[10px]">FOLLOWERS</p>
												</div>
												<div className="text-center">
													<h5 className="  text-[18px]">
														<FormatedNumber
															num={this.props.topInfluencer.interactions}
														/>
													</h5>
													<p className="text-[10px]">INTERACTIONS</p>
												</div>
												<div className="text-center">
													<h5 className="  text-[18px]">
														{this.props.topInfluencer.basicInfo.engagement_rate.toFixed(
															2
														)}
													</h5>
													<p className="text-[10px]">ENGAGEMENT</p>
												</div>
											</div>
											{/*<button type="button" className="w-full mt-4 px-6 justify-center rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80">Add to My influencers</button> */}
										</div>
									</div>
									<div>
										<InfluencerProfileDialog
											influencerId={this.state.influencerId}
											open={this.state.openDialog}
											onClose={() => this.handleClose(false)}
										/>
									</div>
								</div>
						  ))
						: ""}
				</Slider>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BrandDashboardReducer.isLoading,
		topinfluencersAnalyzed: state.BrandDashboardReducer.topinfluencersAnalyzed,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInfluencityLocation: (value) =>
			dispatch({
				type: HANDLE_INFLUENCITY_LOCATION_SUCCESS,
				value: value,
			}),
		handleInfluencityCategory: (category) =>
			dispatch({
				type: HANDLE_INFLUENCITY_CATEGORY_SUCCESS,
				value: category,
			}),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TopInfluencerAnalyzed)
);
