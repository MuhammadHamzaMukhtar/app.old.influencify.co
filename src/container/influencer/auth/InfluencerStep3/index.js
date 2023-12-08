import { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, withRouter } from "react-router-dom";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import axios from "axios";
import helper from "../../../../constants/helper";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import history from "../history";
import Api from "@services/axios";

class InfluencerStep3 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error_message: "",
			errors: {},
			loader: false,
		};
	}

	navigateToNext = async (e) => {
		e.preventDefault();
		const data = {
			fee_type: this.props.fee_type,
			product_value: this.props.product_value,
			story_fee: this.props.story_fee,
			post_fee: this.props.post_fee,
			step: 3,
		};
		this.setState({ errors: {}, loader: true });
		const response =
			//Api.NavigateToNext(data);
			await axios.post(helper.url + "/api/v1/register-validation", data);
		this.setState({ errors: response.data.errors, loader: false });
		if (response.data.success) {
			window.location.href = "/influencer/register/Step4";
		}
	};

	render() {
		const { fee_type, product_value, post_fee, story_fee } = this.props;
		const { errors, loader } = this.state;
		return (
			<div className="sign-up-page mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px]">Step 3</h4>
					<h1 className="text-[40px] black">
						How would you like to be compensated?
					</h1>
				</div>
				<div className="containers pb-12 mt-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 col-span-12">
							<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white px-4 pt-4 rounded-[8px] pb-2">
								{Object.keys(errors).length > 0 && (
									<div className="alert alert-danger" role="alert">
										<ul className="m-0">
											{Object.keys(errors).map((item, key) => (
												<li className="text-white" key={key}>
													{errors[item]}
												</li>
											))}
										</ul>
									</div>
								)}
								<div className="my-5 space-x-4  flex justify-center">
									<label
										htmlFor="gender1"
										className="flex items-center cursor-pointer relative text-black text-[14px]"
									>
										<input
											id="gender1"
											type="radio"
											name="fee_type"
											checked={fee_type == "product-only" ? true : false}
											onChange={(e) => this.props.handleChange(e)}
											value="product-only"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Free Products Only
									</label>
									<label
										htmlFor="gender2"
										className="flex items-center cursor-pointer relative text-black text-[14px]"
									>
										<input
											id="gender2"
											type="radio"
											name="fee_type"
											checked={fee_type == "cash-only" ? true : false}
											onChange={(e) => this.props.handleChange(e)}
											value="cash-only"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Cash Only
									</label>
									<label
										htmlFor="gender3"
										className="flex items-center cursor-pointer relative text-black text-[14px]"
									>
										<input
											id="gender3"
											type="radio"
											name="fee_type"
											checked={fee_type == "product-and-cash" ? true : false}
											onChange={(e) => this.props.handleChange(e)}
											value="product-and-cash"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Free Product and Cash
									</label>
								</div>
								<div className="grid grid-cols-12 gap-5">
									{fee_type === "product-only" ? (
										<div className="col-span-12">
											<label className="mr-6 whitespace-nowrap">
												Product Value
											</label>
											<input
												value={product_value}
												onChange={(e) => this.props.handleChange(e)}
												name="product_value"
												placeholder="Enter min product value here..."
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												type="number"
											/>
										</div>
									) : (
										""
									)}
									{fee_type === "cash-only" ? (
										<>
											<div className="col-span-12">
												<label className="mr-6 whitespace-nowrap">
													Story fee
												</label>
												<input
													value={story_fee}
													onChange={(e) => this.props.handleChange(e)}
													name="story_fee"
													placeholder="Enter your story fee..."
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													type="number"
												/>
											</div>
											<div className="col-span-12">
												<label className="mr-6 whitespace-nowrap">
													Post fee
												</label>
												<input
													value={post_fee}
													onChange={(e) => this.props.handleChange(e)}
													name="post_fee"
													placeholder="Enter your post fee..."
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													type="number"
												/>
											</div>
										</>
									) : (
										""
									)}
									{fee_type === "product-and-cash" ? (
										<>
											<div className="col-span-12">
												<label className="mr-6 whitespace-nowrap">
													Product Value
												</label>
												<input
													value={product_value}
													onChange={(e) => this.props.handleChange(e)}
													name="product_value"
													placeholder="Enter min product value here..."
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													type="number"
												/>
											</div>
											<div className="col-span-12">
												<label className="mr-6 whitespace-nowrap">
													Story fee
												</label>
												<input
													value={story_fee}
													onChange={(e) => this.props.handleChange(e)}
													name="story_fee"
													placeholder="Enter your story fee..."
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													type="number"
												/>
											</div>
											<div className="col-span-12">
												<label className="mr-6 whitespace-nowrap">
													Post fee
												</label>
												<input
													value={post_fee}
													onChange={(e) => this.props.handleChange(e)}
													name="post_fee"
													placeholder="Enter your post fee..."
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													type="number"
												/>
											</div>
										</>
									) : (
										""
									)}
								</div>
								{this.state.error_message ? (
									<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
										<p className="text-white">{this.state.error_message}</p>
									</div>
								) : (
									""
								)}
								<div className="flex justify-between pt-8 mb-[1rem]">
									<Link to="/influencer/register/Step2">
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-gray-400 dark hover:opacity-80"
											type="submit"
											text="Pervious"
										/>
									</Link>
									<Button
										onClick={this.navigateToNext}
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
										type="submit"
										text={
											loader ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
											) : (
												"Next"
											)
										}
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
		fee_type: state.RegisterReducer.fee_type,
		product_value: state.RegisterReducer.product_value,
		story_fee: state.RegisterReducer.story_fee,
		post_fee: state.RegisterReducer.post_fee,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerStep3);
