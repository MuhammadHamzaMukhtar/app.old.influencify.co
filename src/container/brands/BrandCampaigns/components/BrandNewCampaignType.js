import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Emitter from "../../../../constants/Emitter";

const imgSet = {
	maxWidth: "225px",
};

const pSet = {
	maxWidth: "90%",
	color: "#1d1d1d",
	margin: "auto",
};

class NewCampaignType extends Component {
	componentDidMount() {
		const { fetchCampaginTypes } = this.props;
		fetchCampaginTypes();
	}
	setUpNewCampaign = (e) => {
		let query = {
			campaign_type: e,
		};
		if (this.props.refreshData.is_admin) {
			this.props.newCampaignSetUp(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	render() {
		const { campaign_types } = this.props;
		return (
			<div className="NewCampaign-page bg-[#e5e5e5]">
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						{campaign_types && campaign_types.length
							? campaign_types.map((item, index) => (
									<div
										key={index}
										className="lg:col-span-4 md:col-span-6 col-span-12"
									>
										<div className="flex flex-col relative bg-white rounded-[8px] pb-3 pt-12 my-6 NewCampaignCard">
											<div style={imgSet} className="m-auto">
												<img
													className="rounded-t-[8px]"
													src={item.type_image}
													alt={item.type_title}
												/>
											</div>
											<div className="text-center p-[1rem] grow">
												<h4 className="mt-2 font-medium text-[20px] mb-[0.5rem]">
													{item.type_title}
												</h4>
												<p className="my-6" style={pSet}>
													{item.type_description}
												</p>
												<Link
													to="#"
													onClick={() => this.setUpNewCampaign(item.type_name)}
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center"
												>
													{item.type_button_text}
												</Link>
											</div>
										</div>
									</div>
							  ))
							: ""}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ campaign, HeaderReducer }) => {
	return {
		campaign_types: campaign.campaign_types,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/CampaignRedux");
	return {
		fetchCampaginTypes: () => {
			actions.fetchCampaginTypes(dispatch);
		},
		newCampaignSetUp: (data) => {
			actions.newCampaignSetUp(ownProps, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaignType);
