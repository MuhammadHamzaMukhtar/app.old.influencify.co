import { Component } from "react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandHistoryTopTab from "@components/SettingBrandHistoryTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { connect } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import moment from "moment";
import Loader from "@components/global/Loader";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";

class BrandSettingAccountHistory extends Component {
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
		const { fetchAccountHistory } = this.props;
		if (refresh) {
			this.page = 1;
		} else {
			this.page++;
		}
		let data = {
			start_date: this.state.start_date,
			end_date: this.state.end_date,
		};
		fetchAccountHistory(this.page, data);
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
		const { isFetching, hasMore, data, total } = this.props;
		const { start_date, end_date } = this.state;
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

							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 mb-12 overflow-hidden">
								<div className="md:flex items-center justify-between p-3">
									<div className="bg--lightGray w-full p-2 mr-2 rounded-[8px] mb-4 md:!mb-0">
										<label className="text-[10px] darkGray">Start date</label>
										<input
											type="date"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center bg--lightGray px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={start_date}
											onChange={this.onChangeStartDate}
										/>
									</div>
									<div className="bg--lightGray w-full p-2 rounded-[8px]">
										<label className="text-[10px] darkGray">End date</label>
										<input
											type="date"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center bg--lightGray px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={end_date}
											onChange={this.onChangeEndDate}
										/>
									</div>
								</div>
								<div className="p-3 overflow-x-auto">
									<div className="w-full min-w-[500px] mb-[1rem] rounded-[8px] border-[1px] border-[#dee2e6] text-left">
										<table className="w-full">
											<thead className="border-b-2 border-[#dee2e6]">
												<th className="bg-[#e9ecef] p-[0.75rem] font-semibold">
													Sr
												</th>
												<th className="bg-[#e9ecef] p-[0.75rem] font-semibold">
													Comments
												</th>
												<th className="bg-[#e9ecef] p-[0.75rem] font-semibold">
													Created
												</th>
											</thead>
											<tbody>
												{data &&
													data.length > 0 &&
													data.map((item, index) => (
														<tr key={index}>
															<td className="p-[0.75rem] border-t border-[#dee2e6]">
																{index + 1}
															</td>
															<td className="p-[0.75rem] border-t border-[#dee2e6]">
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
															<td className="p-[0.75rem] border-t border-[#dee2e6] whitespace-nowrap">
																{moment
																	.utc(item.created_at)
																	.local()
																	.format("DD-MMM-YYYY h:mm a")}
															</td>
														</tr>
													))}
											</tbody>
											<tfoot>
												<tr>
													<th colSpan={3}>
														{isFetching ||
															(hasMore && (
																<div className="flex items-center justify-center border-t border-[#dee2e6]">
																	{isFetching && (
																		<Loader
																			color="purple"
																			className="my-2"
																			size="16"
																		/>
																	)}
																	{hasMore && isFetching === false && (
																		<Button
																			onClick={() => this.fetchHistory(false)}
																			className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 my-2"
																		text={
																			this.props.isFetching ? (
																				<FaSpinner className="animate-[spin_2s_linear_infinite]" />
																			) : (
																				"Load More"
																			)
																		}

																		/>
																	)}
																</div>
															))}
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isFetching: state.settings.isAccoutFetching,
		data: state.settings.accountHistory,
		hasMore: state.settings.hasMoreAccountHistory,
		total: state.settings.totalAccountHistory,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/SettingRedux");
	return {
		fetchAccountHistory: (page, data) => {
			actions.fetchAccountHistory(dispatch, page, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingAccountHistory);
