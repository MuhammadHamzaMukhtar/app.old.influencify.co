import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import * as registerAction from "@store/actions/RegisterActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import zxcvbn from "zxcvbn";
import helper from "../../../../constants/helper";
import { Helmet } from "react-helmet";
import {
	GoogleReCaptchaProvider,
	GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import store from "@store/index";
import { FaSpinner } from "react-icons/fa";

class BrandRegister extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNextClick: false,
			type: "password",
			shown: false,
			token: "",
		};
	}

	handleVisible = (shown, type) => {
		this.setState({
			shown: shown,
			type: type,
		});
	};

	componentDidMount() {
		
		// window.scrollTo(0, 0);
		// store.dispatch({
		// 	type: "HANDLE_BULK_SUCCESS",
		// 	payload: {
		// 		sentVerifyEmail: false,
		// 	},
		// });
		// store.dispatch({
		// 	type: "HANDLE_REMOVE_VALIDATION_ERRORS",
		// });
	}

	_handleChange(event) {
		this.props.handleInputChange(event);
	}

	handleRegisterSubmit = () => {
		let query = {
			first_name: this.props.first_name,
			last_name: this.props.last_name,
			name: this.props.name,
			email: this.props.email,
			password: this.props.password,
			passwordStrength: zxcvbn(this.props.password).score,
			termOfUse: this.props.termOfUse,
			privacyPolicy: this.props.privacyPolicy,
			domain: this.props.domain,
			access_token: this.props.access_token,
			scope: this.props.scope,
			hmac: this.props.hmac,
			code: this.props.code,
			timestamp: this.props.timestamp,
			token: this.state.token,
		};
		this.props.handleRegisterBrand(query);
	};

	handleBack = () => {
		this.setState({
			isNextClick: false,
		});
	};

	createPasswordLabel = (result) => {
		switch (result.score) {
			case 0:
				return "Weak";
			case 1:
				return "Weak";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "Weak";
		}
	};

	createPasswordLength = (result) => {
		switch (result.score) {
			case 0:
				return 0;
			case 1:
				return 25;
			case 2:
				return 50;
			case 3:
				return 75;
			case 4:
				return 100;
			default:
				return 0;
		}
	};

	createPasswordVariant = (result) => {
		switch (result.score) {
			case 0:
				return "#dc3545";
			case 1:
				return "#dc3545";
			case 2:
				return "#ffc107";
			case 3:
				return "#17a2b8";
			case 4:
				return "#28a745";
			default:
				return "#dc3545";
		}
	};

	handleVerify = (token) => {
		this.setState({ token });
	};

	render() {
		
		const url = window.location.href;
		const title = helper.sign_up_title;
		const description = helper.sign_up_description;
		const givenPassword = zxcvbn(this.props.password);
		return (
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.REACT_APP_MIX_RECAPTCHA_API_KEY}
			>
				<div>
					<Helmet>
						<title>{title}</title>
						<meta charSet="utf-8" />
						<meta name="description" content={description} />
						<link rel="canonical" href={url} />
					</Helmet>
					{this.props.sentVerifyEmail ? (
						<div className="containers mt-12 mb-12">
							<div className="flex flex-wrap justify-center">
								<div className="lg:w-6/12 md:w-8/12 w-full">
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
										<div className="mb-6">
											<h4 className="font-bold text-[20px]">
												{this.props.first_name}, thank you for registering.
											</h4>
											<p>
												We sent an email to {this.props.email} containing a link
												that you should click to confirm your registration.
											</p>
										</div>
										<div>
											<h4 className="font-bold text-[20px]">
												Didn't get the email?
											</h4>
											<ol className="list-decimal">
												<li>Please see your spam folder.</li>
												<li>Check that the email provided is correct.</li>
												<li>Wait 15 minutes and check your email again.</li>
												<li>contact support@influencify.co</li>
											</ol>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
							<div className="text-center">
								<h1 className="pt-12 sm:text-[40px] text-[30px] black font-semibold">
									Registration
								</h1>
							</div>
							<div className="containers my-12">
								<div className="flex flex-wrap justify-center mt-6">
									<div className="lg:w-6/12 md:w-8/12 w-full">
										{this.props.errorsObj?.smtpError ? (
											<div className="bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4">
												<p className="text-white">{this.props.errorsObj.smtpError[0]}</p>
											</div>
										) : (
											""
										)}
										<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
											<div className="mb-[1rem]">
												<div className="md:flex flex-row justify-between">
													<div className="w-full md:!mb-0 mb-4">
														<input
															type="text"
															name="first_name"
															value={this.props.first_name || ""}
															onChange={(e) => this._handleChange(e)}
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															placeholder="First name"
															autoComplete="off"
														/>
														{this.props.errorsObj?.first_name && (
															<span className="red block mt-0">
																{this.props.errorsObj.first_name[0]}
															</span>
														)}
													</div>
													<div className="w-full md:pl-2">
														<input
															type="text"
															name="last_name"
															value={this.props.last_name || ""}
															onChange={(e) => this._handleChange(e)}
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															placeholder="Last name (Optional)"
															autoComplete="off"
														/>
														{this.props.errorsObj?.last_name && (
															<span className="red block mt-0">
																{this.props.errorsObj.last_name[0]}
															</span>
														)}
													</div>
												</div>
											</div>
											<div className="mb-[1rem]">
												<input
													type="text"
													name="name"
													value={this.props.name || ""}
													onChange={(e) => this._handleChange(e)}
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													placeholder="Brand Name"
													autoComplete="off"
												/>
												{this.props.errorsObj?.name ? (
													<span className="red block mt-0">
														{this.props.errorsObj.name[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												<input
													type="email"
													name="email"
													value={this.props.email || ""}
													onChange={(e) => this._handleChange(e)}
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													placeholder="Email"
													autoComplete="off"
													disabled={this.props.lock}
												/>
												{this.props.errorsObj?.email ? (
													<span className="red block mt-0">
														{this.props.errorsObj.email[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												<div className="relative">
													<input
														type={this.state.type}
														name="password"
														value={this.props.password || ""}
														onChange={(e) => this._handleChange(e)}
														placeholder="Password"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														autoComplete="off"
													/>

													{this.state.shown ? (
														<AiOutlineEyeInvisible
															size={22}
															onClick={() =>
																this.handleVisible(false, "password")
															}
															className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
														/>
													) : (
														<AiOutlineEye
															size={22}
															onClick={() => this.handleVisible(true, "text")}
															className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
														/>
													)}
												</div>

												{this.props.errorsObj?.password ? (
													<span className="red block mt-0">
														{this.props.errorsObj.password[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
													<div
														className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
														style={{
															backgroundColor:
																this.createPasswordVariant(givenPassword),
															width: `${this.createPasswordLength(
																givenPassword
															)}%`,
														}}
													>
														{this.createPasswordLabel(givenPassword)}
													</div>
												</div>
											</div>
											<div className="flex flex-col mb-3">
												<div className="flex items-center flex-wrap">
													<label
														htmlFor="termofuse"
														className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
													>
														<input
															id="termofuse"
															type="checkbox"
															name="termOfUse"
															checked={this.props.termOfUse}
															onChange={(event) => this._handleChange(event)}
															className="hidden peer"
														/>
														<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
														I agree to Influencify
													</label>
													<LinkTo
														className="text-[15px] success"
														to="/terms-of-service"
														text="Terms of Service"
													/>
												</div>
												{this.props.errorsObj?.termOfUse ? (
													<span className="red block mt-0">
														{this.props.errorsObj.termOfUse[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="flex flex-col">
												<div className="flex items-center flex-wrap">
													<label
														htmlFor="privacyPolicy"
														className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
													>
														<input
															id="privacyPolicy"
															type="checkbox"
															name="privacyPolicy"
															checked={this.props.privacyPolicy}
															onChange={(event) => this._handleChange(event)}
															className="hidden peer"
														/>
														<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
														I agree to Influencify
													</label>
													<LinkTo
														className="text-[15px] success"
														to="/privacy-policy"
														text="Privacy Policy"
													/>
												</div>
												{this.props.errorsObj?.privacyPolicy ? (
													<span className="red block mt-0">
														{this.props.errorsObj.privacyPolicy[0]}
													</span>
												) : (
													""
												)}
												{this.props.errorsObj?.recaptcha ? (
													<span className="red block mt-0">
														{this.props.errorsObj.recaptcha[0]}
													</span>
												) : (
													""
												)}
											</div>

											<GoogleReCaptcha onVerify={this.handleVerify} />

											<div className="mb-[1rem]">
												<Button
													disabled={
														!this.props.first_name ||
														!this.props.email ||
														!this.props.password ||
														!this.props.termOfUse ||
														!this.props.privacyPolicy 
													}
													className="w-full rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
													type="button"
													text={
														this.props.isLoading ? (
															<FaSpinner className="animate-[spin_2s_linear_infinite]" />
														) : (
															"Register"
														)
													}
													onClick={() => this.handleRegisterSubmit()}
												/>
											</div>
											<p className="text-[15px] flex flex-wrap w-full justify-center text-center">
												Already have an account?{" "}
												<LinkTo
													className="text-[15px] success ml-2"
													to="/brand/login"
													text="Login"
												/>
											</p>
										</form>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</GoogleReCaptchaProvider>
		);
	}
}

const mapStateToProps = ({ RegisterReducer }) => {
	return {
		isLoading: RegisterReducer.isLoading,
		errorsObj: RegisterReducer.errorsObj,
		sentVerifyEmail: RegisterReducer.sentVerifyEmail,
		first_name: RegisterReducer.first_name,
		last_name: RegisterReducer.last_name,
		lock: RegisterReducer.lock,
		name: RegisterReducer.name,
		email: RegisterReducer.email,
		password: RegisterReducer.password,
		termOfUse: RegisterReducer.termOfUse,
		privacyPolicy: RegisterReducer.privacyPolicy,
		domain: RegisterReducer.domain,
		access_token: RegisterReducer.access_token,
		scope: RegisterReducer.scope,
		hmac: RegisterReducer.hmac,
		code: RegisterReducer.code,
		timestamp: RegisterReducer.timestamp,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleRegisterBrand: (query) =>
			dispatch(registerAction.handleRegisterBrand(query, ownProps)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandRegister);
