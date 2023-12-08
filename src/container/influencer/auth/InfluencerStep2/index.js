import { Component, Fragment } from "react";
import * as registerAction from "@store/actions/RegisterActions";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { connect } from "react-redux";
import axios from "axios";
import helper from "../../../../constants/helper";
import {
	DATE_CHANGE_HANDLER,
	HANDLE_CHANGE_SUCCESS,
} from "@store/constants/action-types";
import { FaSpinner } from "react-icons/fa";
import LinkTo from "@components/global/LinkTo";
import Anchor from "@components/global/Anchor";
import Button from "@components/global/Button";
import "./styles.css";

let eventArr = {
	target: {
		name: "gender",
		value: "",
	},
};

class InfluencerStep2Screen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateOfBirth: "",
			errors: {},
			loader: false,
			gender: "",
		};
	}
	_onDateChange = (date) => {
		var dates = moment(date).format("YYYY/MM/DD");
		this.props.onDateChangeHandler(dates);
	};
	_handleChange(event, type) {
		if (type === "gender") {
			eventArr.target.value = event;
			this.setState({ gender: event });
			this.props.handleInputChange(eventArr);
		} else if (type === "phoneNumber") {
			event.target.value = event.target.value
				.replace(/[^0-9+-]/g, "")
				.replace(/(\..*)\./g, "$1");
			this.props.handleInputChange(event);
		} else {
			this.props.handleInputChange(event);
		}
	}
	navigateToNext = async (e) => {
		e.preventDefault();
		const data = {
			username: this.props.userName,
			dateOfBirth: this.props.dateOfBirth,
			gender: this.props.gender,
			phoneNumber: this.props.phoneNumber,
			step: 2,
		};
		this.setState({ errors: {}, loader: true });
		const response =
			// Api.NavigateToNext(data);
			await axios.post(helper.url + "/api/v1/register-validation", data);
		this.setState({ errors: response.data.errors, loader: false });
		if (response.data.success) {
			// window.location.href = "/influencer/register/Step3";
			this.props.navigate("/influencer/register/Step3");
		}
	};

	render() {
		const { errors, loader } = this.state;
		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px] black">Step 2</h4>
					<h1 className="text-[40px] black font-semibold">About You</h1>
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
										value={this.props.userName}
										type="text"
										placeholder="User Name"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										autoComplete="off"
										name="userName"
										onChange={(e) => this._handleChange(e)}
									/>
									{this.props.errorsObj.userName ? (
										<span className="red">
											{this.props.errorsObj.userName[0]}
										</span>
									) : (
										""
									)}
								</div>
								<div className="mb-[1rem] relative">
									<input
										type="text"
										value={moment(this.props.dateOfBirth).format("DD/MM/YYYY")}
										onChange={(e) => this._onDateChange(e.target.value)}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
									/>
									<input
										type="date"
										max={moment().subtract(16, "years").format("YYYY-MM-DD")}
										onChange={(e) => this._onDateChange(e.target.value)}
										className="absolute inset-0 opacity-0 z-10 date-input"
									/>
								</div>
								<div className="mb-[1rem]">
									<Listbox>
										<div className="relative w-full">
											<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
												<span
													className={`block text-[14px]  ${
														this.props.gender ? "text-black" : "darkGray"
													}`}
												>
													{this.props.gender ? this.props.gender : "Gender"}
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
													<Listbox.Option
														onClick={() => this._handleChange("Male", "gender")}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
															this.state.gender === "Male"
																? "bg-[#00000008]"
																: ""
														}`}
														value="Male"
													>
														<span
															className={`block ${
																this.state.gender === "Male"
																	? "purple font-semibold"
																	: "text-gray-900 font-medium"
															}`}
														>
															Male
														</span>
													</Listbox.Option>
													<Listbox.Option
														onClick={() =>
															this._handleChange("Female", "gender")
														}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
															this.state.gender === "Female"
																? "bg-[#00000008]"
																: ""
														}`}
														value="Female"
													>
														<span
															className={`block ${
																this.state.gender === "Female"
																	? "purple font-semibold"
																	: "text-gray-900 font-medium"
															}`}
														>
															Female
														</span>
													</Listbox.Option>
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>
								</div>
								<div className="mb-[1rem]">
									<input
										value={this.props.phoneNumber}
										type="text"
										autoComplete="off"
										onChange={(e) => this._handleChange(e, "phoneNumber")}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										placeholder="Phone"
										name="phoneNumber"
									/>
								</div>
								<div className="mb-[1rem] flex justify-between pt-3">
									<LinkTo
										to="/influencer/register"
										text="Pervious"
										className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
									/>
									<Button
										onClick={this.navigateToNext}
										type="submit"
										text={
											loader ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite]" />
											) : (
												"Next"
											)
										}
										className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
									/>
								</div>
								<div className="mb-[1rem]">
									<p className="text-[16px] flex w-full justify-center">
										Need Help?{" "}
										<Anchor
											to="#"
											className="ml-2 text-[16px] success"
											text="Chat with Support"
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
		userName: state.RegisterReducer.userName,
		dateOfBirth: state.RegisterReducer.dateOfBirth,
		gender: state.RegisterReducer.gender,
		phoneNumber: state.RegisterReducer.phoneNumber,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		onDateChangeHandler: (value) =>
			dispatch({ type: DATE_CHANGE_HANDLER, value: value }),
		handleInfluencerRegisterSubmit: (query) =>
			dispatch(registerAction.handleInfluencerRegisterSubmit(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerStep2Screen);
