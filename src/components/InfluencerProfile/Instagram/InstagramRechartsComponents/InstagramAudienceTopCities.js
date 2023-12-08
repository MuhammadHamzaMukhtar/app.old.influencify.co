import { Component } from "react";
import { connect } from "react-redux";

class InstagramAudienceTopCities extends Component {
	render() {
		return (
			<div className="flex flex-col">
				{this.props.audienceTopCities.length ? (
					this.props.audienceTopCities.map((city, index) => (
						<div
							className="px-[16px] py-[8px] flex justify-between items-center"
							key={index}
						>
							<div className="grid grid-cols-12 gap-5 w-full">
								<div className="sm:col-span-6 col-span-12">
									<p>{city.city_name}</p>
								</div>
								<div className="text-right sm:col-span-6 col-span-12">
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

export default connect(mapStateToProps, null)(InstagramAudienceTopCities);
