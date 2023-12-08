import { Component } from "react";
import Monitoringsearches from "../MonitoringSearches";
import Monitoringcard from "../MonitoringCard";
import Button from "@components/global/Button";
import { connect } from "react-redux";

class MonitoringClosedCampaigns extends Component {
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
		this.props.finishedCampaigns(this.page, payload);
	}

	refresh = () => {
		const payload = Object.assign({}, this.props.payload);
		this.props.finishedCampaigns(this.page, payload);
	};

	loadMore = () => {
		this.page++;
		const payload = Object.assign({}, this.props.payload);
		this.props.finishedCampaigns(this.page, payload);
	};

	handleSearch = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		if (key === "searchQuery") {
			payload.searchQuery = value;
		} else if (key === "sortQuery") {
			payload.sortQuery = value;
			this.setState({
				sortQuery: value,
			});
		}
		this.page = 1;
		clearTimeout(this.clearTimer);
		this.clearTimer = setTimeout(() => {
			this.props.finishedCampaigns(this.page, payload);
		}, 500);
	};

	render() {
		const { isLoading, fetchCompaigns, to, ffrom, total } = this.props;
		return (
			<div>
				<Monitoringsearches
					refresh={this.refresh}
					type={"close"}
					total={total}
					to={to}
					sortQuery={this.state.sortQuery}
					from={ffrom}
					handleSearch={this.handleSearch}
					refreshData={this.props.refreshData}
				/>
				<Monitoringcard isLoading={isLoading} fetchCompaigns={fetchCompaigns} />
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
		fetchCompaigns: MonitoringCampaign.finishedCampaigns,
		total: MonitoringCampaign.finishTotal,
		ffrom: MonitoringCampaign.finishFrom,
		to: MonitoringCampaign.finishTo,
		message: MonitoringCampaign.message,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		finishedCampaigns: (page, data) => {
			actions.fetchfinishedCampaigns(dispatch, page, data);
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MonitoringClosedCampaigns);
