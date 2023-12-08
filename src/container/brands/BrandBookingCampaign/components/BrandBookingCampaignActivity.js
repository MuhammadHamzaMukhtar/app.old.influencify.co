import { Component } from "react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import moment from "moment";

class BrandBookingCampaignActivity extends Component {
	render() {
		if (this.props.isLoading) {
			return (
				<div className="mb-12 relative h-50">
					<Loader
						className="h-[50vh] w-full flex justify-center items-center"
						size="67"
					/>
				</div>
			);
		}
		return (
			<div className=" w-full">
				<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] sm:!p-12 p-2">
					<ul className="relative before:content[''] pl-[40px] before:bg-[#eee] before:top-[5px] before:inline-blcok before:absolute before:left-[29px] before:w-[1.5px] before:h-full">
						{this.props.bookingCampaignActivies &&
						this.props.bookingCampaignActivies.length ? (
							this.props.bookingCampaignActivies.map((activity, index) => (
								<li
									key={index}
									className="flex items-center justify-between my-[20px] pl-[20px] before:content[''] before:bg-[#fff] before:inline-blcok before:absolute before:rounded-full before:border-[3px] before:border-[#7c3292] before:left-[25px] before:w-[10px] before:h-[10px] before:-mt-[18px]"
								>
									<div className="grow">
										<p className="font-semibold black fs-[14px]">
											{activity.causer.name}
										</p>
										<p className="font-normal fs-[14px]">
											{activity.description}
										</p>
									</div>
									<div className="flex items-center grow justify-end">
										<p className="-dark mr-12">{moment.utc(activity.createdAt).local().format("MMMM DD, YYYY hh:mm a")}</p>
										<img
											src={
												activity.causer && activity.causer.profile_pic
													? activity.causer.profile_pic
													: avatar
											}
											alt={activity.causer.name}
											className="mr-2 sm:!mr-0 w-[28px] h-[28px] rounded-full overflow-hidden"
										/>
									</div>
								</li>
							))
						) : (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BrandBookingCampaignReducer.isLoading,
		bookingCampaignActivies:
			state.BrandBookingCampaignReducer.bookingCampaignActivies,
	};
};

export default connect(mapStateToProps, null)(BrandBookingCampaignActivity);
