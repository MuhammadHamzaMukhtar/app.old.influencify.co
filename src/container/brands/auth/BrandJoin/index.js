import React from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import * as registerAction from "@store/actions/RegisterActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import zxcvbn from "zxcvbn";
import helper from "../../../../constants/helper";
import LinkTo from "@components/global/LinkTo";
import { Helmet } from "react-helmet";

class BrandJoin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNextClick: false,
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

	componentDidMount() {
		const id = this.props.params.id;
		this.props.fetchInvitedUser(id);
		// this.props.history.replace('/contact');
		// return;
	}

	_handleChange(event) {
		this.props.handleInputChange(event);
	}

	handleRegisterSubmit = () => {
		let query = {
			displayName: this.props.displayName,
			email: this.props.email,
			password: this.props.password,
			passwordStrength: zxcvbn(this.props.password).score,
			termOfUse: this.props.termOfUse,
			privacyPolicy: this.props.privacyPolicy,
			invitation_id: this.props.invitation_id,
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

	render() {
		const url = window.location.href;
		const title = helper.sign_up_title;
		const description = helper.sign_up_description;
		if (this.props.isLoading) {
			return <Loader />;
		}
		const givenPassword = zxcvbn(this.props.password);
		return (
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
							<div className="xl:w-6/12 lg:w-8/12 w-full">
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-3 md:!p-12 border">
									<div className="mb-6">
										<h4 className="font-bold text-[20px]">
											{this.props.displayName}, thank you for registering.
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
										<ul className="decimal">
											<li>Please see your spam folder.</li>
											<li>Check that the email provided is correct.</li>
											<li>Wait 15 minutes and check your email again.</li>
											<li>contact support@influencify.co</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
						<div className="text-center">
							<h1 className="pt-12 text-[40px] black">
								Join {this.props.brand_name}
							</h1>
						</div>
						<div className="containers mt-12 mb-12">
							<div className="flex flex-wrap justify-center mt-6">
								<div className="lg:w-6/12 md:w-8/12 w-full">
									<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4 rounded-[8px]">
										<div className="mb-[1rem]">
											<input
												type="text"
												name="displayName"
												value={this.props.displayName || ""}
												onChange={(e) => this._handleChange(e)}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="Your Name"
												autoComplete="off"
											/>
											{this.props.errorsObj?.displayName ? (
												<span className="red">
													{this.props.errorsObj.displayName[0]}
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
												// onChange={(e) =>
												//     this._handleChange(e)
												// }
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="Email"
												autoComplete="off"
												readOnly
												disabled
											/>
											{this.props.errorsObj?.email ? (
												<span className="red">
													{this.props.errorsObj.email[0]}
												</span>
											) : (
												""
											)}
										</div>

										<div className="mb-[1rem]">
											<input
												type={this.state.type}
												name="password"
												value={this.props.password || ""}
												onChange={(e) => this._handleChange(e)}
												placeholder="Password"
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												autoComplete="off"
											/>
											{this.props.errorsObj?.password ? (
												<span className="red">
													{this.props.errorsObj.password[0]}
												</span>
											) : (
												""
											)}
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
										<div className="flex items-center mb-0">
											<label
												htmlFor="agree"
												className="cursor-pointer flex items-center text-[15px] font-normal"
											>
												<input
													id="agree"
													type="checkbox"
													name="termOfUse"
													checked={this.props.termOfUse}
													onChange={(event) => this._handleChange(event)}
													className="hidden peer"
												/>
												<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify Terms of Service
											</label>
											<Link
												to="/terms-of-service"
												className="text-[15px]"
												text="Terms of Service"
											/>
											{this.props.errorsObj?.termOfUse ? (
												<span className="red">
													{this.props.errorsObj.termOfUse[0]}
												</span>
											) : (
												""
											)}
										</div>
										<div className="flex items-center mb-[1rem]">
											<label
												htmlFor="agree2"
												className="cursor-pointer flex items-center text-[15px] font-normal"
											>
												<input
													id="agree2"
													type="checkbox"
													name="privacyPolicy"
													checked={this.props.privacyPolicy}
													onChange={(event) => this._handleChange(event)}
													className="hidden peer"
												/>
												<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify Privacy Policy
											</label>
											<Link
												to="/privacy-policy"
												className="text-[15px]"
												text="Privacy Policy"
											/>
											{this.props.errorsObj?.privacyPolicy ? (
												<span className="red">
													{this.props.errorsObj.privacyPolicy[0]}
												</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<Button
												disabled={
													!this.props.displayName ||
													!this.props.email ||
													!this.props.password ||
													!this.props.termOfUse ||
													!this.props.privacyPolicy
												}
												className="w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
												type="button"
												onClick={() => this.handleRegisterSubmit()}
												text="Join now"
											/>
										</div>
										<p className="text-[16px] flex w-full justify-center">
											Already have an account?
											<LinkTo
												className="ml-2 text-[16px]"
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.RegisterReducer.isLoading,
		errorsObj: state.RegisterReducer.errorsObj,
		sentVerifyEmail: state.RegisterReducer.sentVerifyEmail,
		displayName: state.RegisterReducer.displayName,
		email: state.RegisterReducer.email,
		brand_name: state.RegisterReducer.brand_name,
		password: state.RegisterReducer.password,
		termOfUse: state.RegisterReducer.termOfUse,
		privacyPolicy: state.RegisterReducer.privacyPolicy,
		invitation_id: state.RegisterReducer.invitation_id,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleRegisterBrand: (query) =>
			dispatch(registerAction.handleJoinBrand(query, ownProps)),
		fetchInvitedUser: (id) =>
			dispatch(registerAction.fetchInvitedUser(id, ownProps)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandJoin);
