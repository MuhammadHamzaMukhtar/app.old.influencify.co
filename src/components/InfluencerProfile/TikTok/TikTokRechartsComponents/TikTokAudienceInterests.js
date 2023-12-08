import { Component } from "react";

import { connect } from "react-redux";

class TikTokAudienceInterests extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="flex flex-col">
				{this.props.audienceTopInterests.length ? (
					this.props.audienceTopInterests.map((interest, index) => (
						<div className="flex justify-between px-[16px] py-[8px] items-center">
							<p>{interest.interest_name}</p>
							<b>{interest.interest_value}%</b>
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

export default connect(mapStateToProps, null)(TikTokAudienceInterests);
