import { Component, Fragment } from "react";
import { Tab } from "@headlessui/react";
import "date-fns";
import { connect } from "react-redux";
import * as financeActions from "@store/actions/FinanceActions";
import { Helmet } from "react-helmet";
import "./styles.css";
import LinkTo from "@components/global/LinkTo";
import FinanceAccordians from "./FinanceAccordians";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import Anchor from "@components/global/Anchor";
import moment from "moment";
import Pagination from "@components/Pagination";

// const Type = [
// 	{
// 		value: "1",
// 		text: "Subscription Fee",
// 	},
// 	{
// 		value: "2",
// 		text: "Influencer Fee",
// 	},
// ];

const Status = [
	{
		value: "1",
		text: "Fulfilled",
	},
	// {
	// 	value: "2",
	// 	text: "Cancel",
	// },
	// {
	// 	value: "3",
	// 	text: "Refund",
	// },
	{
		value: "2",
		text: "Pending",
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandFinance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromDate: "",
			toDate: "",
			tranType: "",
			tranStatus: "",
			open: true,
			type: "",
			status: "",
		};
	}

	componentDidMount() {
		// if (this.props.isPlanSubscribed === false) {
		//     this.props.history.replace('/billing');
		//     return;
		// }
		this.props.fetchBrandTransactions();
	}

	onPageChanged = (pageData) => {
		let query = {
			page: pageData.currentPage,
			toDate: this.state.toDate,
			fromDate: this.state.fromDate,
			tranStatus: this.state.tranStatus,
		}
		this.props.fetchBrandTransactions(query);
	}

	_fromDateChange = (date) => {
		this.setState({
			fromDate: date,
		});

		Object.assign(this.state, {
			fromDate: date,
		});

		let query = {
			fromDate: this.state.fromDate,
			toDate: this.state.toDate
		};

		this.props.fetchBrandTransactions(query);
	};

	_toDateChange = (date) => {
		this.setState({
			toDate: date,
		});

		Object.assign(this.state, {
			toDate: date,
		});

		let query = {
			fromDate: this.state.fromDate,
			toDate: this.state.toDate
		};

		this.props.fetchBrandTransactions(query);
	};

	handleChangeFilter = (type, value) => {
		if (type === "tranType") {
			this.setState({ type: value });
		} else if (type === "tranStatus") {
			this.setState({ status: value });
		}

		Object.assign(this.state, {
			[type]: value,
		});

		let query = {
			fromDate: this.state.fromDate,
			toDate: this.state.toDate,
			// tranType: this.state.tranType,
			tranStatus: this.state.tranStatus,
		};
		this.props.fetchBrandTransactions(query);
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	// onDownloadInvoice = (id) => {
	// 	this.props.downloadInvoice(id);
	// }

	render() {
		const url = window.location.href;
		const { fromDate, toDate } = this.state;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		const { refreshData } = this.props;
		// const date = new Date();
		// const defaultValue = date.toLocaleDateString("en-CA");
		const defaultDate = "dd/mm/yyyy";
		return (
			<div className="mb-12">
				<Helmet>
					<meta charSet="utf-8" />
					<title>Finances | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				{refreshData.is_main && (
					<>
						<div className="py-[20px] border-b-[1px] border-[#ddd] bg-white">
							<div className="containers">
								<h2 className="dark text-[23px] font-italic font-bold">
									FINANCES
								</h2>
							</div>
						</div>
						<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[80px] mb-[42px] flex items-center">
							<div className="containers my-6">
								<div className="grid grid-cols-12 gap-5">
									<div className="lg:col-span-2 md:col-span-3 sm:col-span-6 col-span-12">
										<input
											type="date"
											value={fromDate === "" ? defaultDate : fromDate}
											max={
												toDate ?
													moment(toDate)
														.subtract("1", "day")
														.format("YYYY-MM-DD") :
													moment()
														.subtract("1", "day")
														.format("YYYY-MM-DD")
											}
											onChange={(e) => this._fromDateChange(e.target.value)}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											placeholderText="From"
										/>
									</div>
									<div className="lg:col-span-2 md:col-span-3 sm:col-span-6 col-span-12">
										<input
											type="date"
											value={toDate === "" ? defaultDate : toDate}
											min={
												fromDate &&
												moment(fromDate)
													.add("1", "day")
													.format("YYYY-MM-DD")
											}
											onFocus={(e) => { e.currentTarget.max = moment().format("YYYY-MM-DD"); }}
											onChange={(e) => this._toDateChange(e.target.value)}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											placeholderText="To"
										/>
									</div>
									<div className="lg:col-span-2 md:col-span-3 col-span-12">
										{/* <div className="xs:flex grid gap-5">
											<Listbox
												onChange={(data) =>
													this.handleChangeFilter("tranType", data)
												}
											>
												<div className="relative w-full">
													<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
														<span className="block text-[14px] darkGray">
															{this.state.type !== ""
																? this.defaultValue(Type, this.state.type)
																: "Type"}
														</span>
														<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
															<AiFillCaretDown
																size={12}
																className="text-black opacity-80"
																aria-hidden="true"
															/>
														</span>
													</Listbox.Button>
													<Transition
														as={Fragment}
														leave="transition ease-in duration-100"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
															{Type.map((type, key) => (
																<Listbox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${type.value === this.state.type
																			? "bg-[#00000008]"
																			: ""
																		}`}
																	value={type.value}
																>
																	<span
																		className={`block ${type.value === this.state.type
																				? "purple font-semibold"
																				: "text-gray-900 font-medium"
																			}`}
																	>
																		{type.text}
																	</span>
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</Listbox> */}
										<Listbox
											onChange={(data) =>
												this.handleChangeFilter("tranStatus", data)
											}
										>
											<div className="relative w-full xs:ml-5">
												<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
													<span className="block text-[14px] darkGray">
														{this.state.status !== ""
															? this.defaultValue(Status, this.state.status)
															: "Status"}
													</span>
													<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<AiFillCaretDown
															size={12}
															className="text-black opacity-80"
															aria-hidden="true"
														/>
													</span>
												</Listbox.Button>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
														{Status.map((status, key) => (
															<Listbox.Option
																key={key}
																className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${status.value === this.state.status
																	? "bg-[#00000008]"
																	: ""
																	}`}
																value={status.value}
															>
																<span
																	className={`block ${status.value === this.state.status
																		? "purple font-semibold"
																		: "text-gray-900 font-medium"
																		}`}
																>
																	{status.text}
																</span>
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</Listbox>
										{/* </div> */}
									</div>
									<div className="xl:col-span-6 lg:col-span-5 col-span-12">
										<div className="flex items-center justify-end h-full">
											<LinkTo
												to="/billing"
												text="Payment settings"
												className="underline success hover:underline text-[12pt]"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="containers">
							<Tab.Group defaultIndex={0}>
								<div className="grid grid-cols-12 gap-5">
									<div className="lg:col-span-3 sm:col-span-6 sm:col-start-4 col-span-12">
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
												Transactions ({this.props.brandTransactions?.total})
											</Tab>
											{/* <Tab
												className={({ selected }) =>
													classNames(
														"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
														selected
															? "font-semibold border-l-[#343749] bg-white"
															: "font-normal border-l-transparent"
													)
												}
											>
												Invoices ({this.props.brandTransactions.length})
											</Tab> */}
										</Tab.List>
										<div className="my-4 h-[1px] bg-[#0000001f] w-full" />
										<div className="text-right">
											<h6 className="font-medium text-[16px]">
												Total spending
											</h6>
											<h3 className="font-semibold mt-2 text-[20px]">
												{this.props.totalSpending}{" "}
												{this.props.currentLoggedUser.currency_code}
											</h3>
										</div>
										<div className="my-4 h-[1px] bg-[#0000001f] w-full" />
										<div className="text-right">
											<p>Total amount spent on influencers*</p>
											<h3 className="font-semibold mt-2 text-[20px]">
												{this.props.influencerSpending}{" "}
												{this.props.currentLoggedUser.currency_code}
											</h3>
											<span>*Service fee included</span>
										</div>
										<div className="my-4 h-[1px] bg-[#0000001f] w-full" />
										<div className="text-right">
											<p>Total amount spent on subscription</p>
											<h3 className="font-semibold mt-2 text-[20px]">
												{this.props.subscriptionSpending}{" "}
												{this.props.currentLoggedUser.currency_code}
											</h3>
										</div>
									</div>
									<div className="lg:col-span-9 col-span-12">
										<Tab.Panels className="bg-white p-[1rem] rounded-[8px]">
											<Tab.Panel>
												<div className="hidden md:grid grid-cols-12 gap-5 pb-4 pt-3 px-[1.25rem]">
													<div className="md:col-span-4">
														<b className="font-medium pl-2">Beneficiary</b>
													</div>
													<div className="md:col-span-2 md:!text-left text-center">
														<b className="font-medium">Published date</b>
													</div>
													<div className="md:col-span-2 md:!text-left text-center">
														<b className="font-medium">Type</b>
													</div>
													<div className="md:col-span-2 text-center">
														<b className="font-medium"> Amount</b>
													</div>
													{/* <div className="md:col-span-2 text-center">
														<b className="whitespace-nowrap font-normal">
															{" "}
															Available Balance
														</b>
													</div> */}
												</div>
												<div>
													{this.props.brandTransactions.data?.length ? (
														<FinanceAccordians
															brandTransactions={this.props.brandTransactions}
															currentLoggedUser={
																this.props.currentLoggedUser.currency_code
															}
														/>
													) : (
														<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
															We have nothing to show you here.
														</div>
													)}
												</div>
											</Tab.Panel>
											<Tab.Panel>
												<div className="overflow-x-auto p-[1.25rem_1.25rem_0_1.25rem]">
													<div className="grid grid-cols-12 mb-6">
														<div className="col-span-4">
															<b className="font-medium">Invoice</b>
														</div>
														<div className="col-span-3">
															<b className="font-medium">Issue date</b>
														</div>
														<div className="col-span-3">
															<b className="font-medium">Type</b>
														</div>
														<div className="col-span-2">
															<b className="font-medium"> Amount</b>
														</div>
													</div>
												</div>
												{this.props.brandTransactions.length ? (
													this.props.brandTransactions.map((tran, index) => (
														<div
															key={index}
															className="grid grid-cols-12 mb-4 px-[1.25rem]"
														>
															<div className="col-span-4">
																<a
																	href={process.env.REACT_APP_BASE_URL + `/download-invoice/${tran.id}`}
																	// onClick={() => this.onDownloadInvoice(tran.id)}
																	download="invoice.pdf"
																	text="Download"
																	target="_blank"
																	rel="noopener noreferrer"
																	className="success"
																>
																	Download
																</a>
															</div>
															<div className="col-span-3">
																<p>{tran.tranDate}</p>
															</div>
															<div className="col-span-3">
																<p>{tran.tranType}</p>
															</div>
															<div className="col-span-2">
																<p>${tran.tranAmount}</p>
															</div>
														</div>
													))
												) : (
													<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
														We have nothing to show you here.
													</div>
												)}
											</Tab.Panel>
										</Tab.Panels>
										<div className="inline-flex items-center justify-center mt-8 mb-4">
											{(this.props.brandTransactions?.total || 0) > 12 &&
												<Pagination
													totalRecords={this.props.brandTransactions?.total}
													pageLimit={12}
													pageNeighbours={12}
													onPageChanged={this.onPageChanged}
												/>
											}

											{/* {influencers && influencers.length>0 && !isLoading  && form.loadMore && 
						<Loader
							size="30"
						/>} */}

										</div>
									</div>
								</div>
							</Tab.Group>
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		brandTransactions: state.FinanceReducer.brandTransactions,
		totalSpending: state.FinanceReducer.totalSpending,
		subscriptionSpending: state.FinanceReducer.subscriptionSpending,
		influencerSpending: state.FinanceReducer.influencerSpending,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBrandTransactions: (query) =>
			dispatch(financeActions.fetchBrandTransactions(query)),
		// downloadInvoice: (id) => dispatch(financeActions.downloadInvoice(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandFinance);
