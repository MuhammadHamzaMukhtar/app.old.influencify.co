import { Component } from "react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandAccountTopTab from "./SettingBrandAccountTopTab";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingReportsActions from "@store/actions/SettingReportsActions";
// import "react-toastify/dist/ReactToastify.css";

class BrandSettingReports extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchSubscriptionReports();
	}

	render() {
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[87vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		const { refreshData } = this.props;
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandAccountTopTab />
				<div className="containers mb-12">
					{refreshData.is_main && (
						<>
							<div>
								<h4 className="mb-4 text-[20px] font-semibold">Current Plan</h4>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 overflow-hidden mb-12">
									<div className="w-full overflow-x-auto block">
										<table className="w-full mb-[1rem] ">
											<thead>
												<tr>
													<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
														Credits
													</th>
													<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
														Campaigns
													</th>
													<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
														Pay Per Products
													</th>
													{this.props.refreshData &&
													this.props.refreshData.offer &&
													this.props.refreshData.offer.audienceOverlay ===
														true ? (
														<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
															Audience overlap
														</th>
													) : (
														""
													)}
													<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
														Status
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
														{this.props.currentSubscription.credits === -1
															? "Unlimited"
															: this.props.currentSubscription.credits}
													</td>
													<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
														{this.props.currentSubscription.directCampaigns ===
															-1 ||
														this.props.currentSubscription.is_appsumo === 1
															? "Unlimited"
															: this.props.currentSubscription.directCampaigns}
													</td>
													<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
														{this.props.currentSubscription.payPerProducts ===
															-1 ||
														this.props.currentSubscription.is_appsumo === 1
															? "Unlimited"
															: this.props.currentSubscription.payPerProducts}
													</td>
													{this.props.refreshData &&
													this.props.refreshData.offer &&
													this.props.refreshData.offer.audienceOverlay ===
														true ? (
														<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
															Active
														</td>
													) : (
														""
													)}
													<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
														{this.props.currentSubscription.reportStatus}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div>
								<h4 className="mb-4 text-[20px] font-semibold">History</h4>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 overflow-hidden mb-12">
									<div className="w-full overflow-x-auto block">
										{this.props.previousSubscriptions &&
										this.props.previousSubscriptions.length ? (
											<table className="w-full mb-[1rem] ">
												<thead>
													<tr>
														<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
															Credits
														</th>
														<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
															Campaigns
														</th>
														<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
															Pay Per Products
														</th>
														{this.props.refreshData &&
														this.props.refreshData.offer &&
														this.props.refreshData.offer.audienceOverlay ===
															true ? (
															<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
																Audience overlap
															</th>
														) : (
															""
														)}
														<th className="text-center text-[14px] p-[0.75rem] font-medium text-[#495057] bg-[#e9ecef] border-b-[2px] border-[#dee2e6]">
															Status
														</th>
													</tr>
												</thead>
												<tbody>
													{this.props.previousSubscriptions &&
													this.props.previousSubscriptions.length
														? this.props.previousSubscriptions.map(
																(subscription, index) => (
																	<tr>
																		<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
																			{subscription.credits === -1
																				? "Unlimited"
																				: subscription.credits}
																		</td>
																		<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
																			{subscription.directCampaigns === -1 ||
																			subscription.is_appsumo === 1
																				? "Unlimited"
																				: subscription.directCampaigns}
																		</td>
																		<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
																			{subscription.payPerProducts === -1 ||
																			subscription.is_appsumo === 1
																				? "Unlimited"
																				: subscription.payPerProducts}
																		</td>
																		{this.props.refreshData &&
																		this.props.refreshData.offer &&
																		this.props.refreshData.offer
																			.audienceOverlay === true ? (
																			<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
																				Active
																			</td>
																		) : (
																			""
																		)}
																		<td className="text-center p-[0.75rem] border-t-[1px] border-[#dee2e6] text-[14px]">
																			{subscription.reportStatus}
																		</td>
																	</tr>
																)
														  )
														: ""}
												</tbody>
											</table>
										) : (
											<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
												We have nothing to show you here.
											</div>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		isLoading: state.SettingReportsReducer.isLoading,
		currentSubscription: state.SettingReportsReducer.currentSubscription,
		previousSubscriptions: state.SettingReportsReducer.previousSubscriptions,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSubscriptionReports: () =>
			dispatch(settingReportsActions.fetchSubscriptionReports()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingReports);
