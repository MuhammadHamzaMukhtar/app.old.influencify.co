import React from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import * as forgetPasswordAction from "@store/actions/ForgetPasswordActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import { FaSpinner } from "react-icons/fa";

class BrandResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "password",
			shown: false,
		};
	}

	handleVisible = (shown, type) => {
		this.setState({
			shown: shown,
			type: type,
		});
	};

	_handleChange(event) {
		this.props.handleInputChange(event);
	}

	componentDidMount() {
		const token = this.props.params.token;
		const email = this.props.params.email;
		this.props.handleResetPasswordView(token, email);
	}

	handleSubmitResetPassword = () => {
		const token = this.props.params.token;
		let query = {
			email: this.props.email,
			password: this.props.password,
			password_confirmation: this.props.password_confirmation,
			token: token,
		};
		this.props.handleBrandResetPasswrodSubmit(query);
	};

	render() {
		// if (this.props.isLoading) {
		// 	return <Loader />;
		// }
		return (
			<div>
				<div className=" text-center">
					<h1 className="pt-12 sm:text-[40px] black text-[30px] font-semibold">
						Reset Password
					</h1>
				</div>
				<div className="containers mt-12 mb-12">
					<div className="mt-6 grid grid-cols-12 gap-5">
						<div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 col-span-12">
							{this.props.response_message ===
							"Your password has been reset!" ? (
								<div className="bg-[#d4edda] border-[1px] border-[#c3e6cb] text-[#155724] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
									<p className="text-white">{this.props.response_message}</p>
								</div>
							) : (
								""
							)}
							{this.props.response_message ===
							"This password reset token is invalid." ? (
								<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
									<p className="text-white">{this.props.response_message}</p>
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
										readOnly={true}
										onChange={(e) => this._handleChange(e)}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										placeholder="Email"
										autoComplete="off"
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
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										value={this.props.password}
										onChange={(e) => this._handleChange(e)}
										placeholder="Password"
										autoComplete="off"
									/>
									{this.state.shown ? (
										<AiOutlineEyeInvisible
											size={22}
											onClick={() => this.handleVisible(false, "password")}
											className="absolute z-1 right-[10px] top-2 cursor-pointer"
										/>
									) : (
										<AiOutlineEye
											size={22}
											onClick={() => this.handleVisible(true, "text")}
												className="absolute z-1 right-[10px] top-2 cursor-pointer"
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
								<div className="relative mb-[1rem]">
									<input
										type={this.state.type}
										name="password_confirmation"
										value={this.props.password_confirmation}
										onChange={(e) => this._handleChange(e)}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										placeholder="Confirm Password"
										autoComplete="off"
									/>
									{this.state.shown ? (
										<AiOutlineEyeInvisible
											size={22}
											onClick={() => this.handleVisible(false, "password")}
											className="absolute z-1 right-[10px] cursor-pointer top-2"
										/>
									) : (
										<AiOutlineEye
											size={22}
											onClick={() => this.handleVisible(true, "text")}
												className="absolute z-1 right-[10px] cursor-pointer top-2"
										/>
									)}

									{this.props.errorsObj?.password_confirmation ? (
										<span className="red">
											{this.props.errorsObj.password_confirmation[0]}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem]">
									<Button
										className="w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
										type="button"
										text={
											this.props.isLoading ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite]" />
											) : (
												"Submit"
											)
										}
										onClick={() => this.handleSubmitResetPassword()}
									/>
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
		isLoading: state.ForgetPasswordReducer.isLoading,
		errorsObj: state.ForgetPasswordReducer.errorsObj,
		email: state.ForgetPasswordReducer.email,
		password: state.ForgetPasswordReducer.password,
		password_confirmation: state.ForgetPasswordReducer.password_confirmation,
		response_message: state.ForgetPasswordReducer.response_message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleResetPasswordView: (query, email) =>
			dispatch(forgetPasswordAction.handleResetPasswordView(query, email)),
		handleBrandResetPasswrodSubmit: (query) =>
			dispatch(forgetPasswordAction.handleBrandResetPasswrodSubmit(query)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandResetPassword);
