import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import SettingInfluencerSidebar from "@components/SettingInfluencerSidebar";
import SettingTabPaymentModal from "./SettingTabPaymentModal";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import * as settingPaymentActions from "@store/actions/SettingPaymentActions";
import { BsCreditCardFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

class SettingInfluencerPayment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			setModalShow: false,
		};
	}

	componentDidMount() {
		this.props.userAttachedAccounts();
	}

	setModalShow = (event) => {
		if (event === true) {
			this.props.fetchCountries();
			this.props.fetchCurrencies();
		}
		this.setState({
			modalShow: event,
		});
	};

	paymentSwitchMethod = (type) => {
		let query = {};
		if (type === "Slow") {
			query = {
				money_arrives: 30,
				charge: 0,
				payment_method: type,
			};
		}
		if (type === "Fast") {
			query = {
				money_arrives: 3,
				charge: 5,
				payment_method: type,
			};
		}

		this.props.switchPaymentMethod(query);
	};

	render() {
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		// if (this.props.isLoading) {
		// 	return (
		// 		<Loader
		// 			className="h-full w-full flex justify-center items-center"
		// 			size="67"
		// 		/>
		// 	);
		// }
		return (
			<div>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingInfluencerSidebar />
							<Button
								text="Save Changes"
								className="w-full mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
							/>
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<h5 className="mt-4 text-[18px]">
								<span>Payment method:</span>{" "}
								{this.props.userAccount.payment_method} payment
							</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-2 sm:!p-12 mb-4">
								<div className="grid grid-cols-12 gap-5">
									<div className="md:col-span-10 col-span-12">
										<div className="grid grid-cols-12 gap-5">
											<div className="sm:col-span-6 col-span-5">
												<p>Payment</p>
											</div>
											<div className="col-span-3">
												<p>Money arrives</p>
											</div>
											<div className="col-span-2">
												<p>Charge</p>
											</div>
											<div className="sm:col-span-1 col-span-2">
												<p></p>
											</div>
										</div>
										<div className="my-4 h-[1px] bg-[#0000001f] w-full" />
										<div className="grid grid-cols-12 gap-5">
											<div className="sm:col-span-6 col-span-5">
												{this.props.userAccount.flag === 0 ? (
													<p>
														<BsCreditCardFill className="inline-block" />{" "}
														<Link
															onClick={() => this.setModalShow(true)}
															to="#"
															className="pink"
														>
															Connect Bank Account
														</Link>
													</p>
												) : (
													<p>
														<BsCreditCardFill className="inline-block" />{" "}
														<Link to="#" className="pink">
															{this.props.userAccount.account_number}
														</Link>
													</p>
												)}
												<SettingTabPaymentModal
													show={this.state.modalShow}
													onHide={() => this.setModalShow(false)}
												/>
											</div>
											<div className="col-span-3">
												<p>in {this.props.userAccount.money_arrives} days</p>
											</div>
											<div className="col-span-2">
												<p>{this.props.userAccount.charge}%</p>
											</div>
											<div className="sm:col-span-1 col-span-2">
												{this.props.userAccount.flag ? (
													<Link
														onClick={() => this.props.removeBankAccount()}
														className="pink"
														to="#"
													>
														Remove
													</Link>
												) : (
													""
												)}
											</div>
										</div>
										<div className="my-4 h-[1px] bg-[#0000001f] w-full" />
										<div className="text-center sm:mt-12 sm:!text-right">
											{this.props.userAccount.payment_method === "Fast" ? (
												<Button
													onClick={() => this.paymentSwitchMethod("Slow")}
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													text={
														this.props.isLoading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite]" />
														) : (
															"Switch to Slow Payment"
														)
													}
												/>
											) : (
												<Button
													onClick={() => this.paymentSwitchMethod("Fast")}
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													text={
														this.props.isLoading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite]" />
														) : (
															"Switch to Fast Payment"
														)
													}

												/>
											)}
										</div>
										<div className="sm:mt-12">
											<p>
												The system charges you a 3% transaction fee on your
												payment.
											</p>
											<p>
												The paid amount may differ from the agreed amount due to
												changing foreign exchange rates.
											</p>
										</div>
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
		isLoading: state.SettingPaymentReducer.isLoading,
		userAccount: state.SettingPaymentReducer.userAccount,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCountries: () => dispatch(settingPaymentActions.fetchCountries()),
		fetchCurrencies: () => dispatch(settingPaymentActions.fetchCurrencies()),
		userAttachedAccounts: () =>
			dispatch(settingPaymentActions.userAttachedAccounts()),
		removeBankAccount: () =>
			dispatch(settingPaymentActions.removeBankAccount()),
		switchPaymentMethod: (query) =>
			dispatch(settingPaymentActions.switchPaymentMethod(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingInfluencerPayment);
