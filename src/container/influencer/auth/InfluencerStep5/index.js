import { Component } from "react";
import SelectCategory from "react-select";
import * as registerAction from "@store/actions/RegisterActions";
import { connect } from "react-redux";
import axios from "axios";
import helper from "../../../../constants/helper";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import { HANDLE_CATEGORY_SELECT_SUCCESS } from "@store/constants/action-types";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";

class Step5 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			loader: false,
		};
	}

	componentDidMount() {
		this.props.fetchUserCategories();
	}

	handleChangeSelect = (e) => {
		this.props.handleSelectChange(e);
	};

	navigateToNext = async (e) => {
		e.preventDefault();
		const data = {
			categories: this.props.selectedCategories,
			step: 5,
		};
		this.setState({ errors: {}, loader: true });
		const response =
			//Api.NavigateToNext(data);
			await axios.post(helper.url + "/api/v1/register-validation", data);
		this.setState({ errors: response.data.errors, loader: false });
		if (response.data.success) {
			// window.location.href = "/influencer/register/Step5";
			this.props.removeValidationErrors(response.data);
			this.props.navigate("/influencer/register/Step5");
		}
	};

	render() {
		const categories = this.props.userCategories.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		let newOptions = categories;
		if (
			this.props.selectedCategories != null &&
			this.props.selectedCategories.length === 3
		) {
			newOptions = [];
		}
		const { errors, loader } = this.state;
		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px] black">Step 4</h4>
					<h1 className="text-[40px] black font-semibold">Your Topics</h1>
				</div>
				<div className="containers pb-12 pt-12">
					<div className="flex flex-wrap justify-center mt-6">
						<div className="lg:w-6/12 md:w-8/12 w-full">
							<form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
								{Object.keys(errors).length > 0 && (
									<div className="bg-[#dc3545] rounded-[8px] px-6 py-3">
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
									<SelectCategory
										value={this.props.selectedCategories}
										closeMenuOnSelect={false}
										options={newOptions}
										isSearchable={true}
										isMulti={true}
										className="rounded-[8px]"
										placeholder={"Select Category"}
										onChange={(e) => this.handleChangeSelect(e)}
									/>
								</div>
								<div className="mb-[1rem] flex justify-between pt-3">
									<LinkTo
										className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
										to="/influencer/register/Step3"
										text="Pervious"
									/>
									<Button
										onClick={this.navigateToNext}
										disabled={
											this.props.selectedCategories == null ||
											this.props.selectedCategories.length === 0
										}
										type="submit"
										className="px-12 rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
										text={
											loader ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite]" />
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
		isLoading: state.RegisterReducer.isLoading,
		errorsObj: state.RegisterReducer.errorsObj,
		userCategories: state.RegisterReducer.userCategories,
		selectedCategories: state.RegisterReducer.selectedCategories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_CATEGORY_SELECT_SUCCESS, payload: event }),
		fetchUserCategories: () => dispatch(registerAction.fetchUserCategories()),
		removeValidationErrors: (data) => {
			dispatch(settingPlatformActionCreator.settingRemoveValidationErrors(data))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Step5);
