import { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
	HANDLE_INFLUENCITY_LOCATION_SUCCESS,
	HANDLE_INFLUENCITY_CATEGORY_SUCCESS,
} from "@store/constants/action-types";
import { ImGift } from "react-icons/im";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<GrFormNext size={22} />
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
			<GrFormPrevious size={22} />
		</div>
	);
}

class InfluencitySlider extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	searchInfluencer = (search_id, name) => {
		if (search_id && name) {
			const payload = Object.assign({}, this.props.payload);
			const form = Object.assign({}, this.props.form);
			payload["filter"]["brand_category"] = [search_id];
			form["filter"]["brand_category"] = [{ id: search_id, name: name }];

			payload["paging"]["skip"] = 0;
			form["loadMore"] = false;

			this.props.searchFilters(payload, form);
			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.props.history.push("/discovery/youtube");
			}, 500);
		}
	};

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
			<div className="InfluencitySlider CustomArrows">
				<Slider {...settings}>
					{this.props.influencitySelection.length
						? this.props.influencitySelection.map((influencity, index) => (
								<div key={index}>
									<div className="InfluencitySlider-card CategorySlider flex items-center justify-center">
										<div
											onClick={() =>
												this.searchInfluencer(
													influencity.search_id,
													influencity.name
												)
											}
											className="Influencers-grid-card w-full flex flex-col relative recommended-card ml-2 mr-2 bg-transparent border-0"
										>
											<img
												className="rounded-[8px]"
												src={
													influencity.category_image_path
														? influencity.category_image_path
														: ""
												}
											/>
											<div className="p-0 flex justify-center items-center rounded-[8px] grow">
												<b className="text-white font-light text-[18px] text-center">
													{influencity.name ? influencity.name : ""}
												</b>
											</div>
										</div>
									</div>
									<div className="p-2">
										<p className="text-[15px] font-bold black">Madrid, Spain</p>
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
		influencitySelection: state.BrandDashboardReducer.influencitySelection,
		payload: state.influencerSearch.payload,
		form: state.influencerSearch.form,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
	};
};

export default withRouter(
	connect(mapStateToProps, undefined, mergeProps)(InfluencitySlider)
);
