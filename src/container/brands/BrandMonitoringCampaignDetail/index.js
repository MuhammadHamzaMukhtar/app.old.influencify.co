import { Component } from "react";
import "./styles.css";
import MonitoringPostsFilters from "./Filters";
import TopContent from "./Filters/TopContent";
import MonitoringPostsItems from "./Items";
import { connect } from "react-redux";
import Button from "@components/global/Button";
class BrandMonitoringCampaignDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: true,
			cancelToken: [],
		};
	}
	componentDidMount() {
		let query = {
			id: this.props.campaignId,
		};
		this.props.fetchcampaign(query);
		this.props.changePageUrl(0, query);
	}

	refresh = () => {
		let query = {
			id: this.props.campaignId,
		};
		this.props.changePageUrl(0, query);
	};

	nextPageUrl = (page) => {
		this.cancelToken();
		const { changePageUrl, payload } = this.props;
		payload["id"] = this.props.campaignId;
		page++;
		changePageUrl(page, payload);
	};

	prevPageUrl = (page) => {
		this.cancelToken();
		const { changePageUrl, payload } = this.props;
		payload["id"] = this.props.campaignId;
		page--;
		changePageUrl(page, payload);
	};

	addCancelToken = (token) => {
		let { cancelToken } = this.state;
		cancelToken.push(token);
		this.setState({ cancelToken: cancelToken });
	};

	cancelToken = () => {
		let { cancelToken } = this.state;
		cancelToken.map((item) => {
			return item.cancel();
		});
	};

	render() {
		const { pagination, campaignId, campaignFound, isLoading, refreshData } =
			this.props;
		if (refreshData && refreshData.is_admin === false) {
			return null;
		}
		if (isLoading === false && campaignFound === false) {
			return (
				<div className="containers">
					<div className="flex flex-wrap items-end w-full px-[1rem] justify-center">
						<div className="grow">
							<div className="flex grow mb-6 pb-1">
								<p className="text-center">No campaign found.</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				<div className="bg-white">
					<div className="py-12">
						<TopContent campaignId={campaignId} refresh={this.refresh} />
					</div>
					<div className="w-full h-[1px] bg-[#ddd]"></div>
					<MonitoringPostsFilters campaignId={campaignId} />
				</div>
				<div className="pb-12 relative">
					<div className="containers mt-12">
						<MonitoringPostsItems
							addCancelToken={this.addCancelToken}
							campaignId={campaignId}
						/>
						<div className="flex items-center p-3">
							{pagination.content && pagination.content.prev_page_url ? (
								<Button
									onClick={() =>
										this.prevPageUrl(pagination.content.current_page)
									}
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									text="Previous"
								/>
							) : (
								""
							)}
							{pagination.content && pagination.content.next_page_url ? (
								<Button
									onClick={() =>
										this.nextPageUrl(pagination.content.current_page)
									}
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 ml-auto"
									text="Next"
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign, HeaderReducer }) => {
	return {
		pagination: MonitoringCampaign.data,
		payload: MonitoringCampaign.payload,
		campaignFound: MonitoringCampaign.campaignFound,
		isLoading: MonitoringCampaign.isLoading,
		fetchCampaignDetail: MonitoringCampaign.fetchSingleCampaign,
		refreshData: HeaderReducer.refreshData,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		fetchcampaign: (data) => {
			actions.findMonitorCampaign(dispatch, data);
		},
		fetchCampaignDetail: (data) => {
			actions.fetchCampaignDetail(dispatch, data);
		},
		changePageUrl: (page, query) => {
			actions.changePageUrl(dispatch, page, query);
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandMonitoringCampaignDetail);
