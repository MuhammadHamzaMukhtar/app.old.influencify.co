import React from "react";
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router";
import Button from "@components/global/Button";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import * as loginAction from "@store/actions/InfluencerLoginActions";
import ClientCaptcha from "react-client-captcha";
import { FaSpinner } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import LinkTo from "@components/global/LinkTo";
import store from "@store/index";

class InfluencerLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginCounter: 0,
			isCaptchaEnabled: false,
			captchaError: false,
			generatedCaptchaCode: "",
			captchaCode: "",
			type: "password",
			shown: false,
			restartCaptcha: false,
		};
	}

	handleVisible = (shown, type) => {
		this.setState({
			shown: shown,
			type: type,
		});
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		store.dispatch({
			type: "BRAND_LOGIN_HANDLE_VALIDATION_ERRORS_CLEAR",
		});
		window.fbAsyncInit = function () {
			window.FB.init({
				appId: window.fbAppId,
				autoLogAppEvents: true,
				xfbml: true,
				version: "v6.0",
			});
		};
	}

	_handleChange(event) {
		this.props.handleInputChange(
			[event.target.name],
			event.target.type === "checkbox"
				? event.target.checked
				: event.target.value
		);
	}

	handleSubmitLogin = () => {
		this.setState(
			{
				loginCounter: this.state.loginCounter + 1,
				restartCaptcha: false,
			},
			() => this.setState({ restartCaptcha: true })
		);
		if (this.state.loginCounter > 1) {
			this.setState({
				isCaptchaEnabled: true,
			});
		}
		if (this.state.isCaptchaEnabled) {
			if (this.props.captchaCode !== this.state.generatedCaptchaCode) {
				this.setState({
					captchaError: true,
				});
				return;
			} else {
				this.setState({
					captchaError: false,
				});
			}
		}
		this.props.handleLoginSubmit(
			this.props.email,
			this.props.password,
			this.props.remember_me
		);
	};

	retry = () => {
		this.setState({ restartCaptcha: false }, () => {
			this.setState({ restartCaptcha: true });
		});
	};

	render() {

		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h1 className="pt-12 sm:text-[40px] text-[30px] black font-semibold">
						Login
					</h1>
				</div>
				<div className="containers mt-12 pb-12">
					<div className="flex flex-wrap justify-center mt-6">
						<div className="lg:w-6/12 md:w-8/12 w-full">
							{this.props.isError ? (
								<div className="bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4">
									<p className="text-white">Invalid email or password.</p>
								</div>
							) : (
								""
							)}
							{this.props.verifyEmailError ? (
								<div className="bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4">
									<p className="text-white">Please Verify Your Email.</p>
								</div>
							) : (
								""
							)}
							{this.props.deactivatedError ? (
								<div className="bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4">
									<p className="text-white">
										Your Account has been deactivated ,Please contact to admin.{" "}
									</p>
								</div>
							) : (
								""
							)}
							<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
								<div className="mb-[1rem]">
									<input
										type="email"
										name="email"
										value={this.props.email}
										onChange={(e) => this._handleChange(e)}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										placeholder="Enter email"
										autoComplete="on"
									/>
									{this.props.errorsObj.email ? (
										<span className="red block mt-0">
											{this.props.errorsObj.email[0]}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem] relative">
									<input
										type={this.state.type}
										name="password"
										value={this.props.password}
										onChange={(e) => this._handleChange(e)}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center pl-3 pr-12 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										placeholder="Password"
										autoComplete="on"
									/>
									{this.state.shown ? (
										<AiOutlineEyeInvisible
											size={22}
											onClick={() => this.handleVisible(false, "password")}
											className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
										/>
									) : (
										<AiOutlineEye
											size={22}
											onClick={() => this.handleVisible(true, "text")}
											className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
										/>
									)}
									{this.props.errorsObj.password ? (
										<span className="red block mt-0">
											{this.props.errorsObj.password[0]}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-0">
									<label
										htmlFor="login"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="login"
											type="checkbox"
											name="remember_me"
											value="remember_me"
											checked={this.props.remember_me}
											onChange={(event) => this._handleChange(event)}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Remember me
									</label>
								</div>
								<div className="mb-[1rem]">
									{this.state.loginCounter > 2 && this.state.restartCaptcha ? (
										<div>
											<div className="flex flex-row items-center">
												<ClientCaptcha
													retry={false}
													captchaCode={(code) =>
														this.setState({
															generatedCaptchaCode: code,
														})
													}
												/>
												<div className="pl-4 cursor-pointer">
													<GiAnticlockwiseRotation
														onClick={this.retry}
														className="text-[22px]"
													/>
												</div>
											</div>
											<input
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												type="text"
												name="captchaCode"
												value={this.props.captchaCode}
												onChange={(e) => this._handleChange(e)}
												placeholder="Enter Security Code"
												autoComplete="off"
											/>
											{this.state.captchaError ? (
												<span className="red block mt-0">
													Security Code is not matched , Please Try Again
												</span>
											) : (
												""
											)}
										</div>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem]">
									<Button
										className="px-12 rounded-[8px] h-[40px] text-[14px] w-full inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
										variant="primary"
										type="button"
										onClick={() => this.handleSubmitLogin()}
										text={
											this.props.isLoading ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite] text-white" />
											) : (
												"Login"
											)
										}
									/>
								</div>
								<div className="text-center mb-0 mt-6">
									<LinkTo
										className="block text-[16px] mb-4 success"
										to="/influencer/forgot-password"
										text="Forgot your password?"
									/>

									<p className="text-[16px] flex w-full black justify-center">
										Not registered?
										<LinkTo
											className="ml-4 text-[16px] success"
											to="/influencer/register"
											text="Sign up"
										/>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorsObj: state.LoginReducer.errorsObj,
		isLoading: state.LoginReducer.isLoading,
		isError: state.LoginReducer.isError,
		verifyEmailError: state.LoginReducer.verifyEmailError,
		deactivatedError: state.LoginReducer.deactivatedError,
		remember_me: state.LoginReducer.remember_me,
		captchaCode: state.LoginReducer.captchaCode,
		email: state.LoginReducer.email,
		password: state.LoginReducer.password,
		facebookLoginButton: state.LoginReducer.facebookLoginButton,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (name, value) =>
			dispatch(loginAction.handleChange(name, value)),
		handleLoginSubmit: (email, password, remember_me) =>
			dispatch(loginAction.handleLoginSubmit(email, password, remember_me)),
		facebookLoginLink: () => dispatch(loginAction.facebookLoginLink()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerLogin);
