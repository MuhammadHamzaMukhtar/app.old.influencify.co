import { Component } from "react";
import Monitoringsearches from "../MonitoringSearches";
import Button from "@components/global/Button";
import Monitoringcard from "../MonitoringCard";
import { connect } from "react-redux";

class MonitoringActiveCampaigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: "",
			sortQuery: "newestFirst",
		};
		this.page = 1;
		this.clearTimer = null;
	}
	componentDidMount() {
		const payload = Object.assign({}, this.props.payload);
		this.props.fetchMonitorCompaigns(this.page, payload);
	}

	refresh = () => {
		const payload = Object.assign({}, this.props.payload);
		this.props.fetchMonitorCompaigns(this.page, payload);
	};

	loadMore = () => {
		this.page++;
		const payload = Object.assign({}, this.props.payload);
		this.props.fetchMonitorCompaigns(this.page, payload);
	};
	handleSearch = (key, value) => {
		this.page = 1;
		const payload = Object.assign({}, this.props.payload);
		if (key === "searchQuery") {
			payload.searchQuery = value;
		} else if (key === "sortQuery") {
			payload.sortQuery = value;
			this.setState({
				sortQuery: value,
			});
		}
		clearTimeout(this.clearTimer);
		this.clearTimer = setTimeout(() => {
			this.props.fetchMonitorCompaigns(this.page, payload);
		}, 500);
	};

	render() {
		const { isLoading, fetchCompaigns, to, from, total } = this.props;
		return (
			<div>
				<Monitoringsearches
					refresh={this.refresh}
					sortQuery={this.state.sortQuery}
					to={to}
					from={from}
					total={total}
					handleSearch={this.handleSearch}
				/>
				<Monitoringcard
					isLoading={isLoading}
					to={to}
					from={from}
					total={total}
					fetchCompaigns={fetchCompaigns}
					refreshData={this.props.refreshData}
				/>
				{to < total && (
					<div className="flex items-center justify-center mb-12">
						<Button
							onClick={this.loadMore}
							className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
							text="Load more"
						/>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign, HeaderReducer }) => {
	return {
		payload: MonitoringCampaign.payload,
		isLoading: MonitoringCampaign.isLoading,
		fetchCompaigns: MonitoringCampaign.fetchCompaigns,
		total: MonitoringCampaign.total,
		from: MonitoringCampaign.from,
		to: MonitoringCampaign.to,
		message: MonitoringCampaign.message,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		fetchMonitorCompaigns: (page, data) => {
			actions.fetchMonitorCompaigns(dispatch, page, data);
		},

		SearchCampaign: (data) => {
			actions.SearchCampaign(dispatch, data);
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MonitoringActiveCampaigns);
