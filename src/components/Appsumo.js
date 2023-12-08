import { Component } from "react";
import Button from "@components/global/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import zxcvbn from "zxcvbn";
import Loader from "@components/global/Loader";

class Appsumo extends Component {
	componentDidMount = () => {
		const query = new URLSearchParams(this.props.location.search);
		const form = Object.assign({}, this.props.form);
		const error_obj = Object.assign({}, this.props.error_obj);
		const { addForm, getAppsumoEmail } = this.props;
		if (query) {
			const email = query.get("a");
			getAppsumoEmail({ token: email });
		}
		addForm(form, error_obj);
	};

	handleAddForm = (value, key) => {
		const { addForm } = this.props;
		const form = Object.assign({}, this.props.form);
		const error_obj = Object.assign({}, this.props.error_obj);
		if (key === "first_name") {
			if (error_obj.hasOwnProperty("first_name")) {
				delete error_obj.first_name;
			}
			form.first_name = value;
		} else if (key === "last_name") {
			if (error_obj.hasOwnProperty("last_name")) {
				delete error_obj.last_name;
			}
			form.last_name = value;
		} else if (key === "password") {
			if (error_obj.hasOwnProperty("password")) {
			}
			form.password = value;
			form.password_strength = zxcvbn(value).score;
		} else if (key === "term_of_use") {
			if (error_obj.hasOwnProperty("term_of_use")) {
				delete error_obj.term_of_use;
			}
			if (value) {
				form.term_of_use = value;
			} else {
				form.term_of_use = "";
			}
		} else if (key === "privacy_policy") {
			if (error_obj.hasOwnProperty("privacy_policy")) {
				delete error_obj.privacy_policy;
			}
			if (value) {
				form.privacy_policy = value;
			} else {
				form.privacy_policy = "";
			}
		}
		addForm(form, error_obj);
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
		const { form, appsumoRegistration, error_obj, invalid_url, is_loading } =
			this.props;
		if (is_loading) {
			return <Loader />;
		}
		let givenPassword = "";
		if (form && form.password) {
			givenPassword = zxcvbn(form.password);
		}
		return (
			<div>
				{invalid_url === true ? (
					<div className="mt-12 text-center">
						<h1>URL Not found</h1>
						<p>URL you have called does not exists.</p>
					</div>
				) : (
					<>
						<div className="mt-12 text-center">
							<h1>Registration</h1>
						</div>
						<div className="containers mt-12 mb-12">
							<div className="grid grid-cols-12 gap-5 mt-6">
								<div className="xl:col-span-6 xl:col-start-4 lg:col-span-8 lg:col-start-3 col-span-12">
									<form>
										<div className="mb-[1rem]">
											<h6 className="mb-2 text-[16px]">Details</h6>
										</div>
										<div className="mb-[1rem]">
											<input
												type="text"
												placeholder="First Name"
												autoComplete="off"
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												onChange={(e) =>
													this.handleAddForm(e.target.value, "first_name")
												}
											/>
											{error_obj && error_obj.first_name ? (
												<span className="red">{error_obj.first_name[0]}</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<input
												type="text"
												placeholder="Last Name"
												autoComplete="off"
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												onChange={(e) =>
													this.handleAddForm(e.target.value, "last_name")
												}
											/>
											{error_obj && error_obj.last_name ? (
												<span className="red">{error_obj.last_name[0]}</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<input
												type="email"
												placeholder="Email"
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												autoComplete="off"
												value={form.email}
												disabled={true}
											/>
											{error_obj && error_obj.email ? (
												<span className="red">{error_obj.email[0]}</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<input
												type="password"
												name="password"
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="Password"
												autoComplete="off"
												onChange={(e) =>
													this.handleAddForm(e.target.value, "password")
												}
											/>
											{error_obj && error_obj.password ? (
												<span className="red">{error_obj.password[0]}</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
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
										</div>
										<div className="mb-0">
											<div className="flex items-center">
												<label
													htmlFor="agree"
													className="cursor-pointer inline-flex items-center text-[15px] font-normal"
												>
													<input
														id="agree"
														type="checkbox"
														onChange={(e) =>
															this.handleAddForm(
																e.target.checked,
																"term_of_use"
															)
														}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify
												</label>
												<Link
													to="/terms-of-service"
													className="text-[15px] success pl-3"
												>
													Terms of Service
												</Link>
											</div>
											{error_obj && error_obj.term_of_use ? (
												<span className="red">{error_obj.term_of_use[0]}</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<div className="flex items-center">
												<label
													htmlFor="privacy"
													className="cursor-pointer inline-flex items-center text-[15px] font-normal"
												>
													<input
														id="privacy"
														type="checkbox"
														onChange={(e) =>
															this.handleAddForm(
																e.target.checked,
																"privacy_policy"
															)
														}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify
												</label>
												<Link
													to="/privacy-policy"
													className="text-[15px] success pl-3"
												>
													Privacy Policy
												</Link>
											</div>
											{error_obj && error_obj.privacy_policy ? (
												<span className="red">
													{error_obj.privacy_policy[0]}
												</span>
											) : (
												""
											)}
										</div>
										<div className="mb-[1rem]">
											<Button
												onClick={() => appsumoRegistration(form)}
												className="px-12 w-full justify-center rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
												type="button"
												text="Finish Registration & Activate Account"
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ Appsumo }) => {
	return {
		form: Appsumo.form,
		error_obj: Appsumo.error_obj,
		invalid_url: Appsumo.invalid_url,
		is_loading: Appsumo.is_loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions, types } = require("@store/redux/AppsumoRedux");
	return {
		getAppsumoEmail: (data) => {
			actions.getAppsumoEmail(dispatch, data);
		},
		addForm: (form, error_obj) => {
			dispatch({
				type: types.HANDLE_APPSUMO_REGISGRATION_FORM,
				form: form,
				error_obj: error_obj,
			});
		},
		appsumoRegistration: (data) => {
			actions.appsumoRegistration(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Appsumo);
