import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandBillingTopTab from "@components/SettingBrandBillingTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { toast } from "react-toastify";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { refreshReports } from "@store/actions/HeaderActions";
import store from "@store";
import { connect } from "react-redux";
import Api from "@services/axios";
import LinkTo from "@components/global/LinkTo";
import BillingCharge from "@components/BillingICharge";

const credits_range = [
	{ min: 1, max: 499, price: 0.7 },
	{ min: 500, max: 999, price: 0.5 },
	{ min: 1000, max: 4999, price: 0.4 },
	{ min: 5000, max: 9999, price: 0.3 },
	{ min: 10000, max: 14999, price: 0.25 },
	{ min: 15000, max: 19999, price: 0.2 },
	{ min: 20000, max: 49999, price: 0.15 },
];
class BrandSettingCredit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disconnectModal: false,
			credits: "",
			price: 0,
			isLoading: false,
		};
	}

	onChangeCredit = (e) => {
		let price = 0;
		var credits = parseInt(e.target.value) || "";
		credits_range.map((item) => {
			if (credits >= item.min && credits <= item.max) {
				return (price = parseFloat(item.price * credits).toFixed(2));
			}
		});
		this.setState({ credits, price });
	};

	buyCreditsNow = async () => {
		const { credits } = this.state;
		this.setState({ isLoading: true });
		try {
			const response = await Api.BuyCreditsNow(credits);
			this.setState({ isLoading: false });
			if (response.data?.application_charge?.confirmation_url) {
				window.location.href = response.data?.application_charge?.confirmation_url;
				return;
			}
			if (!response.data.success) {
				toast.error(response.data.message);
			} else {
				toast.success(response.data.message);
				this.setState({ credits: "", price: 0 });
				store.dispatch(refreshReports());
			}
		} catch (error) {
			this.setState({ isLoading: false });
		}
	};

	render() {
		const { refreshData } = this.props;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		const { credits, price, isLoading } = this.state;
		return (
			<div>
				<SettingHeader />
				<SettingBrandBillingTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
							<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
								{this.props.refreshData.is_main && (
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
										<div className="grid grid-cols-12 gap-5">
											<div className="my-auto lg:col-span-4 col-span-12">
												<div className="flex justify-center items-center flex-col">
													<div className="text-center font-medium text-[19px] flex items-center">
														Credits needed
														<Tooltip
															trigger={
																<div className="ml-2">
																	<BsQuestionCircle
																		className="black"
																		size={18}
																	/>
																</div>
															}
															tooltipText={
																<>
																	You can purchase maximum{" "}
																	{"49999".replace(
																		/(\d)(?=(\d{3})+(?!\d))/g,
																		"$1,"
																	)}{" "}
																	credits
																</>
															}
															placement="top-left"
														/>
													</div>
													<div className="text-center mt-6">
														<input
															className="rounded-[8px] h-[40px] inline-flex w-full items-center text-center justify-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292 text-[18px]"
															type="number"
															value={credits}
															placeholder="0"
															onChange={this.onChangeCredit}
															name="name"
														/>
													</div>
													<div className="text-center mt-6">
														{credits >= 50000 ? (
															<LinkTo
																to="/contact"
																text="Contact us"
																className="px-6 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															/>
														) : (
															<Button
																onClick={this.buyCreditsNow}
																className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																disabled={price <= 0}
																text={
																	isLoading ? (
																		<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
																	) : price <= 0 ? (
																		"Buy Credit"
																	) : (
																		"Buy for $" +
																		price.replace(
																			/(\d)(?=(\d{3})+(?!\d))/g,
																			"$1,"
																		)
																	)
																}
															/>
														)}
													</div>
												</div>
											</div>
											<div className="mt-12 lg:!mt-0 lg:col-span-8 col-span-12">
												<div className="border-[1px] border-[#dee2e6] rounded-[8px]">
													<table className="w-full">
														<thead>
															<th className="text-center p-[1rem] font-medium">
																# of credits
															</th>
															<th className="text-center p-[1rem] font-medium">
																Price per credit
															</th>
														</thead>
														<tbody>
															{credits_range.map((item, key) => {
																return (
																	<tr key={key} className="odd:bg-[#0000000d]">
																		<td className="text-center text-[12px] border-0 p-[0.75rem]">
																			{item.min}-{item.max}
																		</td>
																		<td className="text-center text-[12px] border-0 p-[0.75rem]">
																			${item.price}
																		</td>
																	</tr>
																);
															})}
															<tr>
																<td className="text-center text-[12px] border-0 p-[0.75rem] align-middle">
																	50000+
																</td>
																<td className="text-center text-[12px] border-0 p-[0.75rem] align-middle">
																	<LinkTo
																		to="/contact"
																		className="px-6 rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80"
																		text="Contact us"
																	/>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}
								<BillingCharge />
							</div>

							
					
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		refreshData: state.HeaderReducer.refreshData,
	};
};

export default connect(mapStateToProps)(BrandSettingCredit);
