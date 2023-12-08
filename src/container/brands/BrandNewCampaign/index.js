import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as newCampaignActionCreator from "@store/actions/NewCampaignActions";
// import {withRouter} from "react-router";

class BrandNewCampaign extends Component {
	componentDidMount() {
		this.props.fetchCampaginTypes();
	}

	setUpNewCampaign = (e) => {
		let query = {
			campaign_type: e,
			isNewCampaign: true,
		};
		this.props.newCampaignSetUp(query);
	};

	render() {
		if (this.props.isFreeTrial && this.props.isOnFreeTrial) {
			this.props.history.replace("/brand/campaigns");
		}
		return (
			<div className="h-[calc(100vh-80px)] w-full">
				<div className="grid grid-cols-12 gap-0">
					{this.props.campaign_types.length
						? this.props.campaign_types.map((type, index) => (
								<div
									className="md:col-span-6 col-span-12  border-[#efefef]"
									// className="leftSide  pl-md-0"
									key={index}
								>
									{type.type_name === "influencerCampaign" ? (
										<div className="max-w-[500px] border-r-[2px] text-center mt-6 mb-12 md:!mr-0 mx-auto px-[1rem]">
											<img
												src={type.type_image}
												alt="campaign"
												className="max-w-[360px] w-full mx-auto"
											/>
											<div className="mt-6 pt-1">
												<h4 className=" text-[20px]">{type.type_title}</h4>
												<p className="mt-4 mb-6">{type.type_description}</p>
												<Link
													to="#"
													onClick={() => this.setUpNewCampaign(type.type_name)}
													className="px-12 rounded-full h-[40px] text-[14px] inline-flex justify-center items-center bg--success text-white hover:opacity-80 w-full max-w-[400px] mx-auto"
												>
													Start An {type.type_title}
												</Link>
											</div>
										</div>
									) : (
										""
									)}
									{type.type_name === "contentCampaign" &&
									this.props.contentCampaigns ? (
										<div className="max-w-[500px] border-l-[2px] border-[#efefef] md:!ml-0 m-auto h-full px-[1rem]">
											<div className="text-center py-4">
												<img
													src={type.type_image}
													alt="campaign"
													className="max-w-[360px] w-full mx-auto"
												/>
												<div className="mt-6 pt-1">
													<h4 className=" text-[20px]">{type.type_title}</h4>
													<p className="mt-4 mb-6">{type.type_description}</p>
													<Link
														to="#"
														onClick={() =>
															this.setUpNewCampaign(type.type_name)
														}
														className="px-12 rounded-full h-[40px] text-[14px] inline-flex justify-center items-center bg--success text-white hover:opacity-80 w-full max-w-[400px] mx-auto"
													>
														Start An {type.type_title}
													</Link>
												</div>
											</div>
										</div>
									) : (
										""
									)}
								</div>
						  ))
						: ""}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isFreeTrial: state.HeaderReducer.isFreeTrial,
		isOnFreeTrial: state.HeaderReducer.isOnFreeTrial,
		campaign_id: state.NewCampaignReducer.campaign_id,
		campaign_types: state.NewCampaignReducer.campaign_types,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		contentCampaigns: state.HeaderReducer.contentCampaigns,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCampaginTypes: () =>
			dispatch(newCampaignActionCreator.fetchCampaginTypes()),
		newCampaignSetUp: (query) =>
			dispatch(newCampaignActionCreator.newCampaignSetUp(query, ownProps)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandNewCampaign);
