import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import * as registerAction from "@store/actions/RegisterActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import axios from "axios";
import helper from "../../../constants/helper";
import Loader from "@components/global/Loader";
import zxcvbn from "zxcvbn";
import { FaSpinner } from "react-icons/fa";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";

class InfluencerRegister extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValidFlag: false,
			emailValidFlag: false,
			passwordValidFlag: false,
			nameError: "",
			emailError: "",
			passwordError: "",
			errors: {},
			type: "password",
			shown: false,
			loader: false,
			redirect: false,
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleVisible = (shown, type) => {
		this.setState({
			shown: shown,
			type: type,
		});
	};

	_handleChange(event) {
		// let field = event.target.name;
		// if (field === 'displayName') {
		//   if (validator.isEmpty(this.props.displayName)) {
		//     this.setState({nameError: 'Display name field is required'});
		//     this.setState({nameValidFlag: false});
		//   }
		//   else{
		//     this.setState({nameError: ''});
		//     this.setState({nameValidFlag: true});
		//   }
		// }
		// if (field == 'email') {
		//   if (validator.isEmail(this.props.email)) {
		//     this.setState({emailError: ''});
		//     this.setState({emailValidFlag: true});
		//   }
		//   else{
		//     this.setState({emailError: 'Email not valid'});
		//     this.setState({emailValidFlag: false});
		//   }
		// }
		// if (field == 'password') {
		//   if (validator.isByteLength(this.props.password , 8)) {
		//     this.setState({passwordError: ''});
		//     this.setState({passwordValidFlag: true});
		//   }
		//   else{
		//     this.setState({passwordError: 'Password not valid'});
		//     this.setState({passwordValidFlag: false});
		//   }
		// }
		this.props.handleInputChange(event);
	}

	handleSubmitLogin = () => {
		let query = {
			name: this.props.displayName,
			email: this.props.email,
			password: this.props.password,
			passwordStrength: zxcvbn(this.props.password).score,
			termOfUse: this.props.termOfUse,
			privacyPolicy: this.props.privacyPolicy,
		};
		this.props.handleInfluencerRegisterSubmit(query);
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

	navigateToNext = async (e) => {
		e.preventDefault();
		const data = {
			displayName: this.props.displayName,
			email: this.props.email,
			password: this.props.password,
			termOfUse: this.props.termOfUse,
			privacyPolicy: this.props.privacyPolicy,
			step: 1,
		};

		this.setState({ errors: {}, loader: true });
		const response =
			//Api.NavigateToNext(data);
			await axios.post(helper.url + "/api/v1/register-validation", data);
		this.setState({ errors: response.data.errors, loader: false });
		if (response.data.success) {
			this.props.navigate("/influencer/register/Step2");
		}
	};

	render() {
		const path = window.location.pathname;
		if (path === "/influencer/register") {
			if (localStorage.getItem("isLogin")) {
				window.location.href = "/";
			}
		}

		if (this.props.isLoading) {
			return <Loader />;
		}
		const { errors, loader } = this.state;
		const givenPassword = zxcvbn(this.props.password);
		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px] black">Step 1</h4>
					<h1 className="text-[40px] black font-semibold">Registration</h1>
				</div>
				<div className="containers pb-12 pt-12">
					<div className="flex flex-wrap justify-center mt-6">
						<div className="lg:w-6/12 md:w-8/12 w-full">
							<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
								{Object.keys(errors).length > 0 && (
									<div className="bg-[#dc3545] rounded-[8px] px-6 py-3 mb-3">
										<ul className="m-0">
											{Object.keys(errors).map((item, key) => (
												<li className="text-white" key={key}>
													{errors[item]}
												</li>
											))}
										</ul>
									</div>
								)}
								<div className="mb-[1rem]">
									<input
										type="text"
										name="displayName"
										isValid={this.state.nameValidFlag}
										value={this.props.displayName}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => this._handleChange(e)}
										placeholder="Display Name"
										autoComplete="off"
									/>
									{this.state.nameError ? (
										<span className="red block mt-0">
											{this.state.nameError}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem]">
									<input
										type="email"
										isValid={this.state.emailValidFlag}
										name="email"
										value={this.props.email}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => this._handleChange(e)}
										placeholder="Email"
										autoComplete="off"
									/>
									{this.state.emailError ? (
										<span className="red block mt-0">
											{this.state.emailError}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem]">
									<div className="relative">
										<input
											type={this.state.type}
											isValid={this.state.passwordValidFlag}
											name="password"
											value={this.props.password}
											onChange={(e) => this._handleChange(e)}
											placeholder="Password"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											autoComplete="off"
										/>
										{this.state.shown ? (
											<AiOutlineEyeInvisible
												size={22}
												onClick={() => this.handleVisible(false, "password")}
												className="absolute z-1 h-full top-0 right-[10px] cursor-pointer darkGray"
											/>
										) : (
											<AiOutlineEye
												size={22}
												onClick={() => this.handleVisible(true, "text")}
												className="absolute z-1 h-full top-0 right-[10px] cursor-pointer darkGray"
											/>
										)}
									</div>

									{this.state.passwordError ? (
										<span className="red block mt-0">
											{this.state.passwordError}
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
												width: `${this.createPasswordLength(givenPassword)}%`,
											}}
										>
											{this.createPasswordLabel(givenPassword)}
										</div>
									</div>
								</div>
								<div className="flex flex-wrap items-center mb-3">
									<label
										htmlFor="termOfUse"
										className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
									>
										<input
											id="termOfUse"
											type="checkbox"
											checked={this.props.termOfUse}
											name="termOfUse"
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
								<div className="flex flex-wrap items-center mb-0">
									<label
										htmlFor="termOfUse1"
										className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
									>
										<input
											id="termOfUse1"
											type="checkbox"
											checked={this.props.privacyPolicy}
											name="privacyPolicy"
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
								<div className="mb-[1rem] flex justify-end pt-3">
									<Button
										onClick={this.navigateToNext}
										disabled={
											!this.props.displayName ||
											!this.props.email ||
											!this.props.password ||
											!this.props.termOfUse ||
											!this.props.privacyPolicy
										}
										className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
										type="submit"
										text={
											loader ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite]" />
											) : (
												"Next"
											)
										}
									/>
								</div>
								<div className="mb-[1rem]">
									<p className="text-[16px] flex flex-wrap text-center w-full justify-center">
										Already have an account?
										<LinkTo
											className="ml-2 text-[16px] success"
											to="/influencer/login"
											text="Login"
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
		isLoading: state.RegisterReducer.isLoading,
		errorsObj: state.RegisterReducer.errorsObj,
		displayName: state.RegisterReducer.displayName,
		email: state.RegisterReducer.email,
		password: state.RegisterReducer.password,
		termOfUse: state.RegisterReducer.termOfUse,
		privacyPolicy: state.RegisterReducer.privacyPolicy,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleInfluencerRegisterSubmit: (query) =>
			dispatch(registerAction.handleInfluencerRegisterSubmit(query)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerRegister);
