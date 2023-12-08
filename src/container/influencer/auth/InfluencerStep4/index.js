import { Component } from "react";
import Select from "react-select";
import * as generalActions from "@store/actions/GeneralActions";
import { connect } from "react-redux";
import axios from "axios";
import helper from "../../../../constants/helper";
import {
	HANDLE_SELECT_CHANGE_SUCCESS,
	HANDLE_CHANGE_SUCCESS,
	HANDLE_SELECT_COUNTRY_SUCCESS,
	HANDLE_SELECT_STATE_SUCCESS,
	HANDLE_SELECT_CITY_SUCCESS,
	HANDLE_SELECT_TIMEZONE_SUCCESS,
} from "@store/constants/action-types";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";

class InfluencerStep4 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			loader: false,
		};
	}

	componentDidMount() {
		this.props.fetchCountries();
	}

	_handleChange(event) {
		this.props.handleInputChange(event);
	}

	handleCountrySelect = (event) => {
		this.props.handleSelectCountry(event);
		this.props.fetchStates(event.value);
		this.props.fetchTimeZones(event.value);
	};

	handleStateSelect = (event) => {
		this.props.handleSelectState(event);
		this.props.fetchCities(event.value);
	};

	navigateToNext = async (e) => {
		e.preventDefault();
		const data = {
			country: this.props.selectedCountry,
			state: this.props.state,
			city: this.props.city,
			timeZone: this.props.timeZone,
			address: this.props.address,
			step: 4,
		};
		this.setState({ errors: {}, loader: true });
		const response =
			//Api.NavigateToNext(data);
			await axios.post(helper.url + "/api/v1/register-validation", data);
		this.setState({ errors: response.data.errors, loader: false });
		if (response.data.success) {
			// window.location.href = "/influencer/register/Step4";
			this.props.navigate("/influencer/register/Step4");
		}
	};

	render() {
		const countries = this.props.countries.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const states = this.props.states.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const cities = this.props.cities.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const timeZones = this.props.timeZones.map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const { errors, loader } = this.state;
		return (
			<div className="bg-[#f4f4f5] pt-[36px] mb-0 pb-12">
				<div className="text-center">
					<h4 className="pt-12 pb-4 text-[20px] black">Step 3</h4>
					<h1 className="text-[40px] black font-semibold">Your Location</h1>
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
									<Select
										value={this.props.selectedCountry}
										options={countries}
										isSearchable={true}
										className="!rounded-[8px]"
										placeholder={"Select Country"}
										onChange={(e) => this.handleCountrySelect(e)}
									/>
								</div>
								<div className="mb-[1rem]">
									<Select
										value={this.props.state}
										options={states}
										isSearchable={true}
										className="!rounded-[8px]"
										placeholder={"Select State"}
										onChange={(e) => this.handleStateSelect(e)}
									/>
								</div>
								<div className="mb-[1rem]">
									{/* {(cities || []).length > 0 ? ( */}
										<Select
											value={this.props.city}
											options={cities}
											isSearchable={true}
											className="!rounded-[8px]"
											placeholder={"Select City"}
											onChange={this.props.handleSelectCity}
										/>
									{/* ) : (
										<input
											type="text"
											onChange={(e) =>
												this.props.handleSelectCity(e.target.value)
											}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={this.props.city || ""}
											name="city"
											autoComplete="off"
											placeholder="City"
										/>
									)} */}
								</div>
								<div className="mb-[1rem]">
									<Select
										value={this.props.timeZone}
										options={timeZones}
										isSearchable={true}
										className="!rounded-[8px]"
										placeholder={"Select Time Zone"}
										onChange={this.props.handleSelectTimeZone}
									/>
								</div>
								<div className="mb-[1rem]">
									<input
										type="text"
										onChange={(e) => this._handleChange(e)}
										value={this.props.address || ""}
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										name="address"
										autoComplete="off"
										placeholder="Address"
									/>
								</div>
								<div className="mb-[1rem] flex justify-between pt-3">
									<LinkTo
										className="px-12 rounded-[8px] bg-gray-400 text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
										to="/influencer/register/Step2"
										text="Pervious"
									/>
									<Button
										onClick={this.navigateToNext}
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
		selectedCountry: state.RegisterReducer.selectedCountry,
		state: state.RegisterReducer.state,
		city: state.RegisterReducer.city,
		timeZone: state.RegisterReducer.timeZone,
		address: state.RegisterReducer.address,
		countries: state.GeneralReducer.countries,
		states: state.GeneralReducer.states,
		cities: state.GeneralReducer.cities,
		timeZones: state.GeneralReducer.timeZones,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleSelectCountry: (event) =>
			dispatch({ type: HANDLE_SELECT_COUNTRY_SUCCESS, payload: event }),
		handleSelectState: (event) =>
			dispatch({ type: HANDLE_SELECT_STATE_SUCCESS, payload: event }),
		handleSelectCity: (event) =>
			dispatch({ type: HANDLE_SELECT_CITY_SUCCESS, payload: event }),
		handleSelectTimeZone: (event) =>
			dispatch({ type: HANDLE_SELECT_TIMEZONE_SUCCESS, payload: event }),
		fetchCountries: () => dispatch(generalActions.fetchCountries()),
		fetchStates: (countryId) => dispatch(generalActions.fetchStates(countryId)),
		fetchTimeZones: (countryId) =>
			dispatch(generalActions.fetchTimeZones(countryId)),
		fetchCities: (stateId) => dispatch(generalActions.fetchCities(stateId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerStep4);
