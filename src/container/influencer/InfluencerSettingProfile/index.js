import { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "@components/global/Button";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import SettingInfluencerSidebar from "@components/SettingInfluencerSidebar";
import InfluencerAvatarModal from "@components/InfluencerAvatarModal";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import Select from "react-select";
import * as basicInfoActionsCreator from "@store/actions/settingBasicInfoActions";
import * as generalActions from "@store/actions/GeneralActions";
import {
	HANDLE_CHANGE_SUCCESS,
	HANDEL_ACTIVE_MODAL_SHOW,
	HANDLE_ON_DROP_INFLUENCER_FILE,
	HANDLE_SELECT_COUNTRY_SUCCESS,
	HANDLE_SELECT_STATE_SUCCESS,
	HANDLE_SELECT_CITY_SUCCESS,
	HANDLE_SELECT_TIMEZONE_SUCCESS,
} from "@store/constants/action-types";
import { FaSpinner } from "react-icons/fa";

class InfluencerSettingProfile extends Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		// this.props.fetchCountries();
		this.props.influencerBasicInfoSettigs();
		if (this.timeout) clearTimeout(this.timeout);
		// this.timeout = setTimeout(() => {
		// 	if (this.props.country !== "undefined" && this.props.country["value"]) {
		// 		this.props.fetchStates(this.props.country["value"]);
		// 		this.props.fetchTimeZones(this.props.country["value"]);
		// 	}
		// 	if (this.props.state !== "undefined" && this.props.state["value"]) {
		// 		this.props.fetchCities(this.props.state["value"]);
		// 	}
		// }, 2000);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.props.handleOnDrop(pictureDataURLs);
	}

	handleAvatarChange = () => {
		const query = { influencerProfilePic: this.props.profile_pic };
		this.props.handleChangeInfluencerAvatar(query);
		this.props.setActivateModalShow(false);
	};

	handleUpdateBasicInfo = (event) => {
		const query = {
			name: this.props.name,
			country: this.props.country,
			state: this.props.state,
			city: this.props.city,
			timeZone: this.props.timeZone,
			website: this.props.website,
			description: this.props.description,
			review_visible: this.props.review_visible,
		};
		this.props.handleInfluencerBasicInfoUpdate(query);
	};

	handleCountrySelect = (event) => {
		this.props.handleSelectCountry(event);
		this.props.fetchStates(event.value);
		this.props.fetchTimeZones(event.value);
	};

	handleStateSelect = (event) => {
		this.props.handleSelectState(event);
		this.props.fetchCities(event.value);
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		// if (this.props.isLoading) {
		// 	return (
		// 		<Loader
		// 			className="h-full w-full flex justify-center items-center"
		// 			size="67"
		// 		/>
		// 	);
		// }
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
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Settings | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingInfluencerSidebar />
							{/* <Button
								className="w-full mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
								onClick={() => this.handleUpdateBasicInfo()}
								text={
									this.props.isLoading ? (
										<FaSpinner className="animate-[spin_2s_linear_infinite]" />
									) : (
										"Save Changes"
									)
								}

							/> */}
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 space-y-5">
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-7 col-span-12">
										<form className="mt-12">
											<label className="text-[14px] font-medium">
												Influencer name
											</label>
											{this.props.name || ""}
										</form>
									</div>
									<div className="sm:col-span-5 col-span-12 text-center">
										<img
											className="object-cover w-[110px] h-[110px] rounded-full mx-auto"
											src={
												this.props.profile_pic !== 0
													? this.props.profile_pic
													: avatar
											}
											alt="Influencer"
										/>
										{/* <Link
											to="#"
											className="block mt-4"
											onClick={() => this.props.setActivateModalShow(true)}
										>
											Edit Influencer Avatar
										</Link> */}
										<InfluencerAvatarModal
											show={this.props.ActivateModalShow}
											onHide={() => this.props.setActivateModalShow(false)}
											onDrop={this.onDrop}
											handleChangeAvatar={this.handleAvatarChange}
										/>
									</div>
								</div>
								{/* <div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-7 col-span-12">
										<form className="">
											<label className="text-[14px] font-medium">Country</label>
											<Select
												value={this.props.country}
												options={countries}
												isSearchable={true}
												placeholder={"Select Country"}
												onChange={(e) => this.handleCountrySelect(e)}
											/>
											{this.props.errorsObj.country ? (
												<span className="red">
													{this.props.errorsObj.country[0]}
												</span>
											) : (
												""
											)}
										</form>
									</div>
									<div className="sm:col-span-5 col-span-12">
										<form className="">
											<label className="text-[14px] font-medium">State</label>
											<Select
												value={this.props.state}
												options={states}
												isSearchable={true}
												placeholder={"Select State"}
												onChange={(e) => this.handleStateSelect(e)}
											/>
											{this.props.errorsObj.state ? (
												<span className="red">
													{this.props.errorsObj.state[0]}
												</span>
											) : (
												""
											)}
										</form>
									</div>
								</div>
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-7 col-span-12">
										<form className="">
											<label className="text-[14px] font-medium">City</label>
											<Select
												value={this.props.city}
												options={cities}
												isSearchable={true}
												placeholder={"Select City"}
												onChange={this.props.handleSelectCity}
											/>
											{this.props.errorsObj.city ? (
												<span className="red">
													{this.props.errorsObj.city[0]}
												</span>
											) : (
												""
											)}
										</form>
									</div>
									<div className="sm:col-span-5 col-span-12">
										<form className="">
											<label className="text-[14px] font-medium">
												Time Zone
											</label>
											<Select
												value={this.props.timeZone}
												options={timeZones}
												isSearchable={true}
												placeholder={"Select TimeZone"}
												onChange={this.props.handleSelectTimeZone}
											/>
											{this.props.errorsObj.timeZone ? (
												<span className="red">
													{this.props.errorsObj.timeZone[0]}
												</span>
											) : (
												""
											)}
										</form>
									</div>
								</div>
								<form className="">
									<label className="text-[14px] font-medium">Website URL</label>
									<input
										type="text"
										placeholder="i.e https://example.com"
										name="website"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										onChange={(e) => this.props.handleChange(e)}
										value={this.props.website || ""}
									/>
									{this.props.errorsObj.website ? (
										<span className="red">
											{this.props.errorsObj.website[0]}
										</span>
									) : (
										""
									)}
								</form>
								<form className="">
									<label className="text-[14px] font-medium">
										Influencer description
									</label>
									<textarea
										rows="6"
										className="rounded-[8px] inline-flex w-full items-center px-3 py-2 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										value={this.props.user_description || ""}
										onChange={(e) => this.props.handleChange(e)}
										name="user_description"
									></textarea>
									{this.props.errorsObj.description ? (
										<span className="red">
											{this.props.errorsObj.description[0]}
										</span>
									) : (
										""
									)}
								</form>
								<label
									htmlFor="review"
									className="cursor-pointer flex items-center text-[15px] font-normal"
								>
									<input
										id="review"
										type="checkbox"
										checked={this.props.review_visible || false}
										onChange={(e) => this.props.handleChange(e)}
										name="review_visible"
										className="hidden peer"
									/>
									<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
									Reviews visible
								</label> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BasicInfoReducer.isLoading,
		errorsObj: state.BasicInfoReducer.errorsObj,
		ActivateModalShow: state.BasicInfoReducer.ActivateModalShow,
		name: state.BasicInfoReducer.name,
		profile_pic: state.BasicInfoReducer.profile_pic,
		country: state.BasicInfoReducer.country,
		state: state.BasicInfoReducer.state,
		city: state.BasicInfoReducer.city,
		timeZone: state.BasicInfoReducer.timeZone,
		website: state.BasicInfoReducer.website,
		user_description: state.BasicInfoReducer.user_description,
		review_visible: state.BasicInfoReducer.review_visible,
		countries: state.GeneralReducer.countries,
		states: state.GeneralReducer.states,
		cities: state.GeneralReducer.cities,
		timeZones: state.GeneralReducer.timeZones,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		influencerBasicInfoSettigs: () =>
			dispatch(basicInfoActionsCreator.influencerBasicInfoSettigs()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		setActivateModalShow: (event) =>
			dispatch({ type: HANDEL_ACTIVE_MODAL_SHOW, payload: event }),
		handleOnDrop: (event) =>
			dispatch({ type: HANDLE_ON_DROP_INFLUENCER_FILE, payload: event }),
		handleChangeInfluencerAvatar: (query) =>
			dispatch(basicInfoActionsCreator.handleChangeInfluencerAvatar(query)),
		handleInfluencerBasicInfoUpdate: (query) =>
			dispatch(basicInfoActionsCreator.handleInfluencerBasicInfoUpdate(query)),
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerSettingProfile);
