import { Component } from "react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandHistoryTopTab from "@components/SettingBrandHistoryTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { connect } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import moment from "moment";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import Loader from "@components/global/Loader";

class BrandSettingCreditHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platform: "instagram",
			profileModal: false,
			start_date: moment().startOf("month").format("YYYY-MM-DD"),
			end_date: moment().endOf("month").format("YYYY-MM-DD"),
		};
		this.page = 0;
	}

	componentDidMount() {
		this.fetchHistory();
	}

	fetchHistory = (refresh = false) => {
		const { fetchUsageCreditHistory } = this.props;
		if (refresh) {
			this.page = 1;
		} else {
			this.page++;
		}
		let data = {
			start_date: this.state.start_date,
			end_date: this.state.end_date,
		};
		fetchUsageCreditHistory(this.page, data);
	};

	handleInfluencerProfileModal = (id, platform) => {
		if (id) {
			this.setState({
				profileModal: true,
				platform: platform,
			});
			let query = {
				platform: platform,
				user_id: id,
			};
			this.props.viewInfluencerProfile(id);
		}
	};

	handleClose = () => {
		this.setState({ profileModal: false });
	};

	onChangeStartDate = (e) => {
		this.setState({ start_date: e.target.value }, () =>
			this.fetchHistory(true)
		);
	};

	onChangeEndDate = (e) => {
		this.setState({ end_date: e.target.value }, () => this.fetchHistory(true));
	};

	render() {
		const { isFetching, hasMore, data, total, isProfileLoading, usedCredits } =
			this.props;
		const { platform, start_date, end_date } = this.state;
		return (
			<div>
				<SettingHeader />
				<SettingBrandHistoryTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<div className="flex justify-between">
								<h4 className="font-semibold mb-4 text-[20px]">
									History ({total})
								</h4>
								<div
									className="mb-4 text-[20px] cursor-pointer"
									onClick={() => this.fetchHistory(true)}
								>
									<IoMdRefresh />
								</div>
							</div>

							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 mb-12">
								<div className="sm:flex items-center">
									<div className="bg--lightGray w-full p-2 mr-2 rounded-[8px] mb-4 md:!mb-0">
										<label className="text-[10px] darkGray">Start date</label>
										<input
											className="rounded-[8px] h-[40px] inline-flex bg--lightGray w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											type="date"
											value={start_date}
											onChange={this.onChangeStartDate}
										/>
									</div>
									<div className="bg--lightGray w-full p-2 rounded-[8px] mb-4 md:!mb-0">
										<label className="text-[10px] darkGray">End date</label>
										<input
											className="rounded-[8px] h-[40px] inline-flex bg--lightGray w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											type="date"
											value={end_date}
											onChange={this.onChangeEndDate}
										/>
									</div>
								</div>

								<div className="p-3">
									<div className="w-full mb-[1rem] rounded-[8px] overflow-hidden border-[1px] border-[#dee2e6]">
										<table className="w-full">
											<thead>
												<th className="p-[0.75rem] font-semibold">Sr</th>
												<th className="p-[0.75rem] font-semibold">Comments</th>
												<th className="p-[0.75rem] font-semibold text-center">
													Deduction
												</th>
												<th className="p-[0.75rem] font-semibold">Created</th>
											</thead>
											<tbody>
												{data &&
													data.length > 0 &&
													data.map((item, index) => (
														<tr key={index} className="odd:bg-[#0000000d]">
															<td className="p-[0.75rem] font-normal">
																{index + 1}
															</td>

															<td className="p-[0.75rem] font-normal">
																{item.iq_user_id &&
																item.iq_username &&
																item.platform ? (
																	<>
																		{item.description}{" "}
																		<span
																			className="text-[#007bff] cursor-pointer"
																			onClick={() =>
																				this.handleInfluencerProfileModal(
																					item.iq_user_id,
																					item.platform
																				)
																			}
																		>
																			({item.iq_username})
																		</span>
																	</>
																) : (
																	item.description
																)}
															</td>
															<td className="text-center">-{item.credits}</td>
															<td className="p-[0.75rem] font-normal">
																{moment
																	.utc(item.created_at)
																	.local()
																	.format("DD-MMM-YYYY h:mm a")}
															</td>
														</tr>
													))}
											</tbody>
											<tfoot>
												{isFetching && (
													<tr>
														<th
															colSpan={4}
															className="border-t border-[#dee2e6]"
														>
															<div className="flex items-center justify-center m-[0.75rem]">
																{isFetching && (
																	<Loader color="purple" size="16" />
																)}
																{hasMore && isFetching === false && (
																	<button
																		onClick={() => this.fetchHistory(false)}
																		className="px-6 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																	>
																		Load more
																	</button>
																)}
															</div>
														</th>
													</tr>
												)}
												<tr>
													<th
														colSpan={4}
														className="text-center text-[17px] font-semibold p-[0.75rem] border-t border-[#dee2e6]"
													>
														Total credits used &nbsp;&nbsp;{usedCredits}
													</th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<InfluencerProfileModal
					isProfileLoading={isProfileLoading}
					platform={platform}
					open={this.state.profileModal}
					onClose={this.handleClose}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isFetching: state.settings.isFetching,
		data: state.settings.creditHistory,
		hasMore: state.settings.hasMoreCreditHistory,
		total: state.settings.totalCreditHistory,
		usedCredits: state.settings.totalCreditUsed,
		isProfileLoading: state.influencerSearch.isProfileLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/SettingRedux");
	const {
		actions: actionInfluencer,
	} = require("@store/redux/InfluencerSearchRedux");
	return {
		fetchUsageCreditHistory: (page, data) => {
			actions.fetchUsageCreditHistory(dispatch, page, data);
		},
		viewInfluencerProfile: (data) => {
			actionInfluencer.viewInfluencerProfile(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingCreditHistory);
