import { Component } from "react";
import Story from "./Story";
import Tooltip from "@components/global/Tooltip";
import { IoCloseCircle } from "react-icons/io5";
import { connect } from "react-redux";
import Tags from "./Tags";
import Mention from "./Mention";
import Button from "@components/global/Button";

const captalize = (str) => {
	return (str.charAt(0).toUpperCase() + str.slice(1))
		.replace(/_/g, " ")
		.replace(/from/g, ">")
		.replace(/ to/g, " <");
};
class SponsoredPostsFilters extends Component {
	handleMonitorPostSearch = () => {
		const { fetchCampaignDetail, payload } = this.props;
		payload["id"] = this.props.campaignId;
		fetchCampaignDetail(payload);
	};

	addPayload = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addPayload(payload);
	};

	clearFilters = () => {
		const { fetchCampaignDetail } = this.props;
		this.props.addPayload({});
		fetchCampaignDetail({ id: this.props.campaignId });
	};

	render() {
		const { payload } = this.props;
		return (
			<div className="bg-white py-1">
				<div className="my-6">
					<div className="containers">
						<div className="flex flex-wrap items-start">
							<div className="flex flex-col">
								<div className="flex flex-wrap items-center divide-x divide-[#ddd] rounded-[8px] mr-6">
									{/*<Location />
									  <Likes />
                                        <Comments /> */}
									<Tags className="rounded-l-[8px] border-l-[1px] border-[#ddd]" />
									<Story />
									<Mention className="rounded-r-[8px] border-r-[1px] border-[#ddd]" />
									{/* <Type /> */}
								</div>
							</div>
							<div className="ml-2">
								<Tooltip
									trigger={
										<Button
											onClick={this.handleMonitorPostSearch}
											type="button"
											className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
											text="Apply"
										/>
									}
									tooltipText="Click to Apply"
									placement="top-left"
								/>
							</div>
							{payload && Object.keys(payload).length > 0 && (
								<div className="ml-2">
									<Tooltip
										trigger={
											<Button
												onClick={this.clearFilters}
												type="button"
												text="Clear"
												className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#f7f7f7] dark hover:opacity-80"
											/>
										}
										tooltipText="Click to Apply"
										placement="top-left"
									/>
								</div>
							)}
						</div>
						<div className="flex flex-wrap items-start mb-4">
							{payload &&
								Object.keys(payload).length > 0 &&
								Object.keys(payload)
									.filter(
										(i) => payload[i] !== "" && i !== "id" && i !== "selections"
									)
									.map((item, key) => (
										<div
											key={key}
											className="flex items-center bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer mr-2 mt-6"
										>
											<IoCloseCircle
												size={20}
												className="cursor-pointer purple"
												onClick={() => this.addPayload(item, "")}
											/>
											<p className="ml-2">
												{captalize(item)}: {payload[item]}
											</p>
										</div>
									))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		payload: MonitoringCampaign.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		addPayload: (data) => {
			actions.addPayload(dispatch, data);
		},
		fetchCampaignDetail: (data) => {
			actions.fetchCampaignDetail(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SponsoredPostsFilters);
