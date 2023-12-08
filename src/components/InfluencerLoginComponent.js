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

class InfluencerLoginComponent extends React.Component {
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
		if (localStorage.getItem("isLogin")) {
			return <Navigate to="/dashboard" />;
		}
		return (
			<div className="mb-0">
				<div className="grid grid-cols-12 gap-5">
					<div className="col-span-12">
						{this.props.isError ? (
							<div
								className="bg-[#f8d7da] border-[1px] border-[#f5c6cb] text-[#721c24] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]"
								variant="danger"
							>
								<p className="text-white">Invalid email or password.</p>
							</div>
						) : (
							""
						)}
						{this.props.verifyEmailError ? (
							<div
								className="bg-[#f8d7da] border-[1px] border-[#f5c6cb] text-[#721c24] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]"
								variant="danger"
							>
								<p className="text-white">Please Verify Your Email. </p>
							</div>
						) : (
							""
						)}
						{this.props.deactivatedError ? (
							<div
								className="bg-[#f8d7da] border-[1px] border-[#f5c6cb] text-[#721c24] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]"
								variant="danger"
							>
								<p className="text-white">
									Your Account has been deactivated ,Please contact to admin.{" "}
								</p>
							</div>
						) : (
							""
						)}
						<form>
							<div className="mb-[1rem]">
								<input
									type="email"
									name="email"
									value={this.props.email}
									onChange={(e) => this._handleChange(e)}
									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
									placeholder="Enter email"
									autoComplete="on"
								/>
								{this.props.errorsObj?.email ? (
									<span className="red">{this.props.errorsObj.email[0]}</span>
								) : (
									""
								)}
							</div>

							<div className="relative mb-[1rem]">
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
										className="absolute z-1 right-[10px] cursor-pointer"
									/>
								) : (
									<AiOutlineEye
										size={22}
										onClick={() => this.handleVisible(true, "text")}
										className="absolute z-1 right-[10px] cursor-pointer"
									/>
								)}
								{this.props.errorsObj?.password ? (
									<span className="red">
										{this.props.errorsObj.password[0]}
									</span>
								) : (
									""
								)}
							</div>
							<div>
								<label
									htmlFor="remember"
									className="cursor-pointer flex items-center text-[15px] font-normal"
								>
									<input
										id="remember"
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
											className="mt-4 rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											type="text"
											name="captchaCode"
											value={this.props.captchaCode}
											onChange={(e) => this._handleChange(e)}
											placeholder="Enter Security Code"
											autoComplete="off"
										/>
										{this.state.captchaError ? (
											<span className="red">
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
									className="w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
									type="button"
									onClick={() => this.handleSubmitLogin()}
									text={
										this.props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
										) : (
											"Login"
										)
									}
								/>
							</div>
						</form>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerLoginComponent);
