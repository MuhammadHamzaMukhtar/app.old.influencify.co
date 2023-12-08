import { Component, Fragment } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import { FiX } from "react-icons/fi";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import "date-fns";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Helmet } from "react-helmet";
import * as financeActions from "@store/actions/FinanceActions";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencerSettingFinancesAndProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromDate: "",
			toDate: "",
			fromDateFormated: "",
			toDateFormated: "",
			withdrawalModal: false,
			withdrawalRequest: "",
		};
	}

	componentDidMount() {
		this.props.fetchInfluencerFinances();
	}

	_fromDateChange = (date) => {
		var formatedDate = moment(date).format("YYYY/MM/DD");
		this.setState({
			fromDate: date,
			fromDateFormated: formatedDate,
		});
		let query = {
			fromDate: formatedDate,
			toDate: this.state.toDateFormated,
		};
		this.props.fetchInfluencerFinances(query);
	};

	_toDateChange = (date) => {
		var formatedDate = moment(date).format("YYYY/MM/DD");
		this.setState({
			toDate: date,
			toDateFormated: formatedDate,
		});
		let query = {
			fromDate: this.state.fromDateFormated,
			toDate: formatedDate,
		};
		this.props.fetchInfluencerFinances(query);
	};

	WithdrawalModalShow = () => {
		this.setState({
			withdrawalModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			withdrawalModal: false,
		});
	};

	handleWithdrawalChange = (event) => {
		this.setState({
			withdrawalRequest: event.target.value,
		});
	};

	handleSendWithdrawalRequest = () => {
		let query = {
			orders: this.props.allPayments,
			withdrawalRequest: this.state.withdrawalRequest,
		};
		this.props.sendWithdrawalRequest(query);
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		const earnings = this.props.influencerEarnings
			? this.props.influencerEarnings.replace(/,/g, "")
			: 0;
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Finances | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers">
					<Tab.Group defaultIndex={0}>
						<div className="grid grid-cols-12 gap-5">
							<div className="md:col-span-3 col-span-12">
								<Tab.List className="flex flex-col mb-0 shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] rounded-[8px] overflow-hidden">
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Available Payments
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.allPayments && this.props.allPayments.length}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Processing Payments
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.processingPayments &&
												this.props.processingPayments.length}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Pending Payments
										<div className="font-normal text-[11px] h-6 w-6 flex items-center justify-center bg-[#6c757d] text-white rounded-full leading-[0px]">
											{this.props.pendingPayments &&
												this.props.pendingPayments.length}
										</div>
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Products
									</Tab>
								</Tab.List>
								<div className="text-right">
									<span>Available Balance</span>
									<h3 className="mt-2 text-[28px] font-semibold">
										{this.props.influencerEarnings}{" "}
										{this.props.currentLoggedUser.currency_code}
									</h3>
									{this.props.influencerEarnings &&
									earnings &&
									earnings > 100 ? (
										<Button
											onClick={() => this.WithdrawalModalShow()}
											className="mt-4 px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
											text="Withdrawal Request"
										/>
									) : (
										""
									)}
								</div>
								<div className="my-4 bg-[#0000001f] h-[1px] w-full" />
							</div>
							<div className="lg:col-span-9 col-span-12">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
									<div className="grid grid-cols-12 gap-5">
										<div className="md:col-span-3 sm:col-span-4 col-span-12 mb-4">
											<DatePicker
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												selected={this.state.fromDate || ""}
												onChange={this._fromDateChange}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												isClearable
												placeholderText="From"
												dropdownMode="select"
											/>
										</div>
										<div className="md:col-span-3 sm:col-span-4 col-span-12 mb-4">
											<DatePicker
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												selected={this.state.toDate || ""}
												onChange={this._toDateChange}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												minDate={this.state.fromDate}
												isClearable
												placeholderText="To"
												dropdownMode="select"
											/>
										</div>
										<div className="md:col-span-6 sm:col-span-4 col-span-12 mb-4">
											<div className="text-right mt-6">
												<Link
													to="/influencer/setting-influencer-payment"
													text="Payment settings"
													className="success underline hover:underline"
												/>
											</div>
										</div>
									</div>
									<Tab.Panels className="bg-transparent">
										<Tab.Panel>
											<div className="py-[8px]">
												<div className="px-[16px] flex justify-start w-full  items-center py-[8px] ">
													<div className="grow my-[4px] min-w-[100px] font-semibold">
														Description
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-center">
														Date
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
														Amount
													</div>
												</div>
											</div>
											<div className="bg-[#0000001f] h-[1px] w-full" />
											<div className="mb-4 responsive-list">
												{this.props.allPayments &&
												this.props.allPayments.length ? (
													this.props.allPayments.map((payment, index) => (
														<div
															key={index}
															className="px-[16px] flex justify-start w-full  items-center py-[8px] border-bottom"
														>
															<div className="grow max-w-[260px]">
																<Link
																	className="flex items-center"
																	to={
																		"/influencer/influencer-booking/" +
																		payment.campaignId
																	}
																>
																	<img
																		src={payment.brandAvatar}
																		alt={payment.brandName}
																		className="w-[52px] rounded-full"
																	/>
																	<h4 className="ml-4 text-[20px]">
																		{payment.brandName}
																	</h4>
																</Link>
															</div>
															<div className="ml-5 grow my-[4px] min-w-[100px] font-semibold text-center">
																<p>{payment.orderDate}</p>
															</div>
															<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
																<p>
																	{payment.amount}{" "}
																	{this.props.currentLoggedUser.currency_code}
																</p>
															</div>
														</div>
													))
												) : (
													<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
														We have nothing to show you here.
													</div>
												)}
											</div>
										</Tab.Panel>
										<Tab.Panel>
											<div className="py-[8px]">
												<div className="px-[16px] flex justify-start w-full  items-center py-[8px] ">
													<div className="grow my-[4px] min-w-[100px] font-semibold">
														Description
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-center">
														Date
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
														Amount
													</div>
												</div>
											</div>
											<div className="bg-[#0000001f] h-[1px] w-full" />
											<div className="mb-4 responsive-list">
												{this.props.processingPayments &&
												this.props.processingPayments.length ? (
													this.props.processingPayments.map(
														(payment, index) => (
															<div
																key={index}
																className="px-[16px] flex justify-start w-full  items-center py-[8px] border-bottom"
															>
																<div className="grow max-w-[260px]">
																	<Link
																		className="flex items-center"
																		to={
																			"/influencer/influencer-booking/" +
																			payment.campaignId
																		}
																	>
																		<img
																			src={payment.brandAvatar}
																			alt={payment.brandName}
																			className="w-[52px] rounded-full"
																		/>
																		<h4 className="ml-4 text-[20px]">
																			{payment.brandName}
																		</h4>
																	</Link>
																</div>
																<div className="ml-5 grow my-[4px] min-w-[100px] font-semibold text-center">
																	<p>{payment.orderDate}</p>
																</div>
																<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
																	<p>
																		{payment.amount}{" "}
																		{this.props.currentLoggedUser.currency_code}
																	</p>
																</div>
															</div>
														)
													)
												) : (
													<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
														We have nothing to show you here.
													</div>
												)}
											</div>
										</Tab.Panel>
										<Tab.Panel>
											<div className="py-[8px]">
												<div className="px-[16px] flex justify-start w-full  items-center py-[8px] ">
													<div className="grow my-[4px] min-w-[100px] font-semibold">
														Description
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-center">
														Date
													</div>
													<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
														Amount
													</div>
												</div>
											</div>
											<div className="bg-[#0000001f] h-[1px] w-full" />
											<div className="mb-4 responsive-list">
												{this.props.pendingPayments &&
												this.props.pendingPayments.length ? (
													this.props.pendingPayments.map((payment, index) => (
														<div
															key={index}
															className="px-[16px] flex justify-start w-full  items-center py-[8px] border-bottom"
														>
															<div className="grow max-w-[260px]">
																<Link
																	className="flex items-center"
																	to={
																		"/influencer/influencer-booking/" +
																		payment.campaignId
																	}
																>
																	<img
																		src={payment.brandAvatar}
																		alt={payment.brandName}
																		className="w-[52px] runded-full"
																	/>
																	<h4 className="ml-4 text-[20px]">
																		{payment.brandName}
																	</h4>
																</Link>
															</div>
															<div className="ml-5 grow my-[4px] min-w-[100px] font-semibold text-center">
																<p>{payment.orderDate}</p>
															</div>
															<div className="grow my-[4px] min-w-[100px] font-semibold text-right">
																<p>
																	{payment.amount}{" "}
																	{this.props.currentLoggedUser.currency_code}
																</p>
															</div>
														</div>
													))
												) : (
													<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
														We have nothing to show you here.
													</div>
												)}
											</div>
										</Tab.Panel>
										<Tab.Panel>
											<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
												We have nothing to show you here.
											</div>
										</Tab.Panel>
									</Tab.Panels>
								</div>
							</div>
						</div>
					</Tab.Group>
				</div>

				<Transition
					appear
					show={
						this.props.withdrawalModal === undefined
							? false
							: this.props.withdrawalModal
					}
					as={Fragment}
				>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-[1rem]">
											<label className="text-[14px] font-medium">
												Write Down Withdrawal Details (Bank Details)
											</label>
											<textarea
												rows="8"
												name="withdrawalRequest"
												className="rounded-[8px] inline-flex w-full items-center px-3 py-2 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												value={this.state.withdrawalRequest}
												onChange={(event) => this.handleWithdrawalChange(event)}
											></textarea>
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={(e) =>
													this.handleSendWithdrawalRequest(
														this.props.allPayments
													)
												}
												text="Send Request"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.FinanceReducer.isLoading,
		pendingPayments: state.FinanceReducer.pendingPayments,
		processingPayments: state.FinanceReducer.processingPayments,
		allPayments: state.FinanceReducer.allPayments,
		influencerEarnings: state.FinanceReducer.influencerEarnings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInfluencerFinances: (query) =>
			dispatch(financeActions.fetchInfluencerFinances(query)),
		sendWithdrawalRequest: (query) =>
			dispatch(financeActions.sendWithdrawalRequest(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerSettingFinancesAndProducts);
