import { Component } from "react";
import Button from "@components/global/Button";
import { HiPencil } from "react-icons/hi";
import { connect } from "react-redux";
// import { withRouter } from "react-router";
import moment from "moment";
import { FiRefreshCw } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import LinkTo from "@components/global/LinkTo";
class TopContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editTitleFlag: false,
			data: true,
			campaignName: "",
		};
	}
	componentDidMount() {
		const { fetchCampaignDetail } = this.props;
		if (fetchCampaignDetail.campaign_name)
			this.setState({
				campaignName: fetchCampaignDetail.campaign_name,
			});
	}
	showEditInput = () => {
		this.setState({
			editTitleFlag: true,
		});
	};
	hideEditInput = () => {
		this.setState({
			editTitleFlag: false,
		});
	};
	setName = (e) => {
		this.setState({
			campaignName: e.target.value,
		});
	};
	editCampaignName = () => {
		let query = {
			id: this.props.campaignId,
			name: this.state.campaignName,
		};
		this.setState({ editTitleFlag: false });
		this.props.editCampaignName(query);
	};
	finishCampaign = () => {
		let query = {
			id: this.props.campaignId,
		};
		this.props.finishCampaign(query);
	};

	render() {
		const { fetchCampaignDetail } = this.props;
		return (
			<div>
				{fetchCampaignDetail && (
					<div className="containers">
						<div className="flex flex-wrap items-end w-full justify-center">
							<div className="grow">
								<div className="flex items-center grow mb-6 pb-1 h-[40px]">
									<LinkTo
										to="/brand/monitoring/campaign"
										prefix={<FiChevronLeft />}
										className="text-[22px] mr-2  bg-[#7c3292] w-[30px] h-[30px] flex items-center justify-center rounded-full text-white"
									/>

									{this.state.editTitleFlag ? (
										<div className="flex justify-between items-center">
											<div className="mb-0">
												<input
													onChange={(e) => this.setName(e)}
													value={this.state.campaignName}
													type="text"
													className="w-72 rounded-[8px] h-[40px] inline-flex items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													name="monitor campaign name"
													placeholder="Enter Campaign Name"
												/>
											</div>
											<div className="text-right ml-4">
												<Button
													className="px-3 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#f7f7f7] dark hover:opacity-80 mr-2"
													onClick={() => this.hideEditInput()}
													text="Cancel"
												/>
												<Button
													onClick={this.editCampaignName}
													className="px-3 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													text="Save"
												/>
											</div>
										</div>
									) : (
										<div className="flex cursor-pointer black">
											<p className="text-[16px] font-semibold mr-4">
												{fetchCampaignDetail.campaign_name}
											</p>
											{!this.state.editTitleFlag ? (
												<HiPencil
													size={20}
													onClick={() => this.showEditInput()}
												/>
											) : (
												""
											)}
										</div>
									)}
								</div>
								<div className="flex mb-1">
									<p className="font-medium black text-[12px]">Start Date:</p>
									<div className="flex flex-wrap ml-2">
										<p className="mr-2 font-normal text-[12px]">
											{moment(fetchCampaignDetail.start_date).format(
												"dddd, MMMM Do YYYY"
											)}
										</p>
									</div>
								</div>
								{fetchCampaignDetail && fetchCampaignDetail.hash_tags && (
									<div className="flex mb-1">
										<p className="font-medium black text-[12px]">Hahtags:</p>
										<div className="flex flex-wrap ml-2">
											{fetchCampaignDetail &&
												fetchCampaignDetail.hash_tags &&
												fetchCampaignDetail.hash_tags.map((data) => (
													<p className="mr-2 font-normal text-[12px]">
														#{data}
														{""}
													</p>
												))}
										</div>
									</div>
								)}
								{fetchCampaignDetail && fetchCampaignDetail.tags && (
									<div className="flex mb-1">
										<p className="font-medium black text-[12px]">Tags</p>
										<div className="flex ml-2">
											{fetchCampaignDetail &&
												fetchCampaignDetail.tags &&
												fetchCampaignDetail.tags.map((data) => (
													<p className="mr-2 font-normal text-[12px]">
														@{data}
														{""}
													</p>
												))}
										</div>
									</div>
								)}
								{fetchCampaignDetail && fetchCampaignDetail.user_stories && (
									<div className="flex mb-1">
										<p className="font-medium black text-[12px]">Stories</p>
										<div className="flex ml-2">
											{fetchCampaignDetail &&
												fetchCampaignDetail.user_stories &&
												fetchCampaignDetail.user_stories.map((data) => (
													<p className="mr-2 font-normal text-[12px]">
														@{data}
													</p>
												))}
										</div>
									</div>
								)}
							</div>

							<div>
								{fetchCampaignDetail &&
								fetchCampaignDetail.status &&
								fetchCampaignDetail.status.name === "active" ? (
									<div className="flex flex-row items-center">
										<div
											className="text-[17px] cursor-pointer mr-6"
											onClick={() => this.props.refresh()}
										>
											<FiRefreshCw className="text-[18px]" />
										</div>
										<Button
											onClick={this.finishCampaign}
											text="Finish Campaign"
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
										/>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		isLoading: MonitoringCampaign.isLoading,
		fetchCampaignDetail: MonitoringCampaign.fetchSingleCampaign,
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		fetchcampaign: (data) => {
			actions.findMonitorCampaign(dispatch, data);
		},
		editCampaignName: (data) => {
			actions.editCampaignName(dispatch, data);
		},
		finishCampaign: (data) => {
			actions.finishCampaign(ownProps, data);
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
