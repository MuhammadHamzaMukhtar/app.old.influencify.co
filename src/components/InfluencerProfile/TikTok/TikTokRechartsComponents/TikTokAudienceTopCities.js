import { Component } from "react";

import { connect } from "react-redux";

class TikTokAudienceTopCities extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="flex flex-col">
				{this.props.audienceTopCities.length ? (
					this.props.audienceTopCities.map((city, index) => (
						<div
							className="flex justify-between px-[16px] py-[8px] items-center"
							key={index}
						>
							<div className="grid grid-cols-12 gap-5 w-full">
								<div className="sm:col-span-6 col-span-12">
									<p>{city.city_name}</p>
								</div>
								<div className="sm:col-span-3 col-span-12 text-center">
									<b>{city.city_value}</b>
								</div>
								<div className="sm:col-span-3 col-span-12 text-right">
									<b>{city.city_percentage}%</b>
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		audienceTopCities: state.InfluencerProfileReducer.audienceTopCities,
	};
};

export default connect(mapStateToProps, null)(TikTokAudienceTopCities);
