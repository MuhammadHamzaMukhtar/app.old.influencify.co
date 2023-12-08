import { Component } from "react";
import { connect } from "react-redux";

class InstagramAudienceInterests extends Component {
	render() {
		return (
			<div className="flex flex-col">
				{this.props.audienceTopInterests.length ? (
					this.props.audienceTopInterests.map((interest, index) => (
						<div
							key={index}
							className="px-[16px] py-[8px] flex justify-between items-center"
						>
							<p>{interest.interest_name}</p>
							<b>{interest.interest_percentage}%</b>
						</div>
					))
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		audienceTopInterests: state.InfluencerProfileReducer.audienceTopInterests,
	};
};

export default connect(mapStateToProps, null)(InstagramAudienceInterests);
