import { Component } from "react";
import { connect } from "react-redux";
import avatar from "@assets/avatar.png";

class BrandProfileHeader extends Component {
	render() {
		return (
			<div className="grid grid-cols-12 gap-5 my-8">
				<div className="lg:col-span-2 md:col-span-3 sm:col-span-4 col-span-12">
					<img
						src={
							this.props.basicInfo.avatar ? this.props.basicInfo.avatar : avatar
						}
						alt={this.props.basicInfo.name}
						className="w-[180px] rounded-full"
					/>
				</div>
				<div className="lg:col-span-10 md:col-span-9 sm:col-span-8 col-span-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-6 col-span-12">
							<div className="mt-4 sm:!mt-0">
								<h3>{this.props.basicInfo.name}</h3>
								<span>
									{this.props.basicInfo.city}, {this.props.basicInfo.country}
								</span>
							</div>
						</div>
					</div>
					<div className="my-[1rem] bg-[#0000001f] w-full h-[10px]" />
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-8 col-span-12">
							<div className="justify-between flex text-center items-center">
								<div>
									<h5 className=" text-[18px]">
										{this.props.basicInfo.NoOfCampaigns}
									</h5>
									<span>No. of campaigns</span>
								</div>
								<div>
									<h5 className=" text-[18px]">
										{this.props.basicInfo.NoOfHired}
									</h5>
									<span>No. of talents hired</span>
								</div>
								<div>
									<span className="tags">-</span>
								</div>
							</div>
						</div>
						<div className="md:col-span-4 col-span-12 mt-4 sm:!mt-0">
							<p>{this.props.basicInfo.description}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		basicInfo: state.BrandProfileReducer.basicInfo,
		NoOfCampaigns: state.BrandProfileReducer.NoOfCampaigns,
	};
};

export default connect(mapStateToProps, null)(BrandProfileHeader);
