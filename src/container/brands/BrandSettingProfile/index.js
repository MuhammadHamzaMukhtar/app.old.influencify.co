import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandTopTab from "@components/SettingBrandTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import BrandAvatarModal from "@components/BrandAvatarModal";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import Select from "react-select";
import * as basicInfoActionsCreator from "@store/actions/settingBasicInfoActions";
import * as generalActions from "@store/actions/GeneralActions";
import SettingBrandAccount from "./SettingBrandAccount";
import * as settingAccountActionCreator from "@store/actions/SettingAccountActions";
import Noty from "noty";
import "./styles.css";
import { FaSpinner } from "react-icons/fa";
import zxcvbn from "zxcvbn";

import {
  HANDLE_CHANGE_SUCCESS,
  HANDEL_ACTIVE_MODAL_SHOW,
  HANDLE_ON_DROP_FILE,
  HANDLE_SELECT_COUNTRY_SUCCESS,
  HANDLE_SELECT_STATE_SUCCESS,
  HANDLE_SELECT_CITY_SUCCESS,
  HANDLE_SELECT_TIMEZONE_SUCCESS,
  HANDLE_SELECT_CURRENCY_SUCCESS,
} from "@store/constants/action-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "#7d2d94" : null,
      fontWeight: isSelected ? "700" : null,
      backgroundColor: isSelected ? "#00000008" : null,
    };
  },
};

class BrandSettingProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: this.props.avatar ? this.props.avatar : avatar,
      newUrl: "",
      flag: true,
      currency: "",
      currencies: this.props.currencies,
      type: "password",
    };
    this.timeout = 0;
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    // if (this.props.isPlanSubscribed === false) {
    //     this.props.history.replace('/billing');
    //     return;
    // }
    // this.props.fetchCountries();
    // this.props.fetchCurrencies();
    this.props.brandBasicInfoSettigs();
    // this.props.brandAccountSettings();
    // if (this.timeout) clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => {
    //   if (this.props.country !== "undefined" && this.props.country["value"]) {
    //     this.props.fetchStates(this.props.country["value"]);
    //     this.props.fetchTimeZones(this.props.country["value"]);
    //   }
    //   if (this.props.state !== "undefined" && this.props.state["value"]) {
    //     this.props.fetchCities(this.props.state["value"]);
    //   }
    // }, 2000);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({ avatar: pictureDataURLs, newUrl: pictureDataURLs });
  }

  handleAvatarChange = () => {
    const query = { brand_avatar: this.state.newUrl };
    this.props.handleChangeAvatar(query);
    this.props.setActivateModalShow(false);
    this.setState({ flag: false });
  };

  handleUpdateBasicInfo = (event) => {
    var reset = {
      target: {
        value: "",
        name: "password",
      },
    };
    const query = {
      name: this.props.name,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      password: this.props.password,
      password_strength: zxcvbn(this.props.password),
      //   country: this.props.country,
      //   state: this.props.state,
      //   city: this.props.city,
      //   timeZone: this.props.timeZone,
      //   currency: this.props.currency,
      //   website: this.props.website,
      //   description: this.props.user_description,
    };
    this.props.handleBrandBasicInfoUpdate(query);
    this.props.handleChange(reset);
  };

  handleCountrySelect = async (event) => {
    this.props.handleSelectCountry(event);
    this.props.fetchStates(event.value);
    this.props.fetchTimeZones(event.value);
    this.setState({ flag: false });
    const result = Object.assign(
      {},
      this.props.countries.find((o) => o.name === event.label)
    );
    let code = {
      code: result.country_code,
    };
    this.props.fetchCurrency(code);
  };

  handleStateSelect = (event) => {
    this.props.handleSelectState(event);
    this.setState({ flag: false });
    this.props.fetchCities(event.value);
  };

  showSuccessMessage = (msg) => {
    new Noty({
      type: "success",
      theme: "sunset",
      text: msg,
      layout: "topRight",
      timeout: 2000,
    }).show();
  };

  handleVisible = (shown, type) => {
    this.setState({
      shown: shown,
      type: type,
    });
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
        if (result.password.length > 0) {
          return 10;
        }
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

  render() {
    if (localStorage.getItem("role") !== "brand") {
      window.location.href = "/";
    }
    if (this.props.isPlanSubscribed === false) {
      this.props.history.replace("/billing");
    }
    // if (this.props.isLoading) {
    // 	return (
    // 		<Loader
    // 			className="h-[87vh] w-full flex justify-center items-center"
    // 			size="67"
    // 		/>
    // 	);
    // }
    const givenPassword = zxcvbn(this.props.password);
    const countries =
      this.props.countries && this.props.countries.length
        ? this.props.countries.map((data) => ({
            label: data.name,
            value: data.id,
          }))
        : [];
    const states =
      this.props.states && this.props.states.length
        ? this.props.states.map((data) => ({
            label: data.name,
            value: data.id,
          }))
        : [];
    const cities =
      this.props.cities && this.props.cities.length
        ? this.props.cities.map((data) => ({
            label: data.name,
            value: data.id,
          }))
        : [];
    const timeZones =
      this.props.timeZones && this.props.timeZones.length
        ? this.props.timeZones.map((data) => ({
            label: data.name,
            value: data.id,
          }))
        : [];
    const currencies =
      this.state.currencies && this.state.currencies.length
        ? this.state.currencies.map((data) => ({
            label: data.code,
            value: data.id,
          }))
        : [];
    const { refreshData } = this.props;

    return (
      <div>
        <SettingHeader />
        <SettingBrandTopTab />
        <div className="containers mb-12">
          <div className="grid grid-cols-12 gap-5">
            <div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
              <SettingBrandSidebar />
            </div>
            <div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
              <h4 class="font-semibold mb-4 text-[20px]">Account</h4>
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 space-y-5">
                <div className="grid grid-cols-12 gap-5">
                  <div className="sm:col-span-7 col-span-12">
                    <div className="mt-2">
                      <label className="text-[14px] font-medium">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        disabled={!refreshData.is_admin}
                        value={this.props.first_name || ""}
                        onChange={(e) => {
                          this.props.handleChange(e);
                          this.setState({ flag: false });
                        }}
                        placeholder="First name"
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      />
                      {this.props.errorsObj &&
                      this.props.errorsObj?.first_name ? (
                        <span className="red">
                          {this.props.errorsObj.first_name[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="mt-5">
                      <label className="text-[14px] font-medium">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        disabled={!refreshData.is_admin}
                        value={this.props.last_name || ""}
                        onChange={(e) => {
                          this.props.handleChange(e);
                          this.setState({ flag: false });
                        }}
                        placeholder="Last name"
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      />
                      {this.props.errorsObj &&
                      this.props.errorsObj?.last_name ? (
                        <span className="red">
                          {this.props.errorsObj.last_name[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <form className="mt-5">
                      <label className="text-[14px] font-medium">
                        Brand name
                      </label>
                      <input
                        type="text"
                        name="name"
                        disabled={!refreshData.is_admin}
                        value={this.props.name || ""}
                        onChange={(e) => {
                          this.props.handleChange(e);
                          this.setState({ flag: false });
                        }}
                        placeholder="Brand name"
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      />
                      {this.props.errorsObj && this.props.errorsObj?.name ? (
                        <span className="red">
                          {this.props.errorsObj.name[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                  <div className="sm:col-span-5 col-span-12 text-center">
                    <img
                      className="object-cover w-[110px] h-[110px] rounded-full mx-auto"
                      src={this.props.avatar ? this.props.avatar : avatar}
                      alt="avatar"
                    />
                    {refreshData.is_admin && (
                      <div className="">
                        <Link
                          to="#"
                          className="inline-block success"
                          onClick={() => this.props.setActivateModalShow(true)}
                        >
                          Edit Brand Avatar
                        </Link>
                      </div>
                    )}
                    <BrandAvatarModal
                      show={this.props.ActivateModalShow}
                      onHide={() => this.props.setActivateModalShow(false)}
                      cancelhandleChange={this.cancelhandleChange}
                      onDrop={this.onDrop}
                      defaultImage={
                        this.props.avatar ? this.props.avatar : avatar
                      }
                      handleChangeAvatar={() => this.handleAvatarChange()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                  <div className="sm:col-span-7 col-span-12">
                    <form className="">
                      <label className="text-[14px] font-medium">Email</label>
                      <input
                        type="text"
                        name="email"
                        disabled={!refreshData.is_admin}
                        value={this.props.email || ""}
                        onChange={(e) => {
                          this.props.handleChange(e);
                          this.setState({ flag: false });
                        }}
                        placeholder="Email"
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      />
                      {this.props.errorsObj && this.props.errorsObj?.email ? (
                        <span className="red">
                          {this.props.errorsObj.email[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                  <div className="sm:col-span-5 col-span-12">
                    <form>
                      <label className="text-[14px] font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={this.state.type}
                          placeholder="Password"
                          name="password"
                          autoComplete="off"
                          onChange={(e) => this.props.handleChange(e)}
                          className="pr-12 rounded-[8px] h-[40px] inline-flex w-full items-center pl-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                        />
                        {this.state.shown ? (
                          <AiOutlineEyeInvisible
                            size={22}
                            onClick={() =>
                              this.handleVisible(false, "password")
                            }
                            className="absolute z-1 top-[10px] right-[10px] cursor-pointer darkGray"
                          />
                        ) : (
                          <AiOutlineEye
                            size={22}
                            onClick={() => this.handleVisible(true, "text")}
                            className="absolute z-1 top-[10px] right-[10px] cursor-pointer darkGray"
                          />
                        )}
                      </div>
                      {this.props.errorsObj?.password ? (
                        <span className="red">
                          {this.props.errorsObj.password[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                    <div className="sm:col-span-4 col-span-12 mt-2 pt-2"></div>

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
                </div>
                {/* <div className="grid grid-cols-12 gap-5">
                  <div className="sm:col-span-7 col-span-12">
                    <form className="">
                      <label className="text-[14px] font-medium">Country</label>
                      <Select
                        value={this.props.country}
                        options={countries}
                        isDisabled={!refreshData.is_admin}
                        isSearchable={true}
                        styles={colourStyles}
                        placeholder={"Select Country"}
                        onChange={(e) => this.handleCountrySelect(e)}
                      />
                      {this.props.errorsObj && this.props.errorsObj?.country ? (
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
                        isDisabled={!refreshData.is_admin}
                        options={states}
                        isSearchable={true}
                        placeholder={"Select State"}
                        styles={colourStyles}
                        onChange={(e) => this.handleStateSelect(e)}
                      />
                      {this.props.errorsObj && this.props.errorsObj?.state ? (
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
                      {(cities && cities.length > 0) ||
                      typeof this.props.city == "object" ? (
                        <Select
                          value={this.props.city}
                          options={cities}
                          isDisabled={!refreshData.is_admin}
                          isSearchable={true}
                          styles={colourStyles}
                          placeholder={"Select City"}
                          onChange={this.props.handleSelectCity}
                        />
                      ) : (
                        <input
                          type="text"
                          onChange={(e) =>
                            this.props.handleSelectCity(e.target.value)
                          }
                          disabled={!refreshData.is_admin}
                          value={this.props.city || ""}
                          name="city"
                          autoComplete="off"
                          placeholder="City"
                          className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                        />
                      )}
                      {this.props.errorsObj && this.props.errorsObj?.city ? (
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
                        isDisabled={!refreshData.is_admin}
                        options={timeZones}
                        isSearchable={true}
                        styles={colourStyles}
                        placeholder={"Select TimeZone"}
                        onChange={(event) => {
                          this.props.handleSelectTimeZone(event);
                          this.setState({ flag: false });
                        }}
                      />
                      {this.props.errorsObj &&
                      this.props.errorsObj?.timeZone ? (
                        <span className="red">
                          {this.props.errorsObj.timeZone[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <form className="">
                    <label className="text-[14px] font-medium">Currency</label>
                    <Select
                      value={this.props.currency}
                      options={currencies}
                      styles={colourStyles}
                      isDisabled={
                        !refreshData.is_admin || this.props.is_currency_set
                      }
                      isSearchable={true}
                      placeholder={"Select Currency"}
                      onChange={() => {
                        this.props.handleSelectCurrency();
                        this.setState({ flag: false });
                      }}
                    />
                    {this.props.errorsObj && this.props.errorsObj?.currency ? (
                      <span className="red">
                        {this.props.errorsObj.currency[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <form className="">
                    <label className="text-[14px] font-medium">
                      Website URL
                    </label>
                    <input
                      type="text"
                      placeholder="i.e https://example.com"
                      name="website"
                      disabled={!refreshData.is_admin}
                      onChange={(e) => {
                        this.props.handleChange(e);
                        this.setState({ flag: false });
                      }}
                      value={this.props.website || ""}
                      className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    />
                    {this.props.errorsObj && this.props.errorsObj?.website ? (
                      <span className="red">
                        {this.props.errorsObj.website[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <form className="">
                    <label className="text-[14px] font-medium">
                      Brand description
                    </label>
                    <textarea
                      maxLength={500}
                      disabled={!refreshData.is_admin}
                      rows="6"
                      className="rounded-[8px] px-3 py-2 w-full items-center border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      value={this.props.user_description || ""}
                      onChange={(e) => {
                        this.props.handleChange(e);
                        this.setState({ flag: false });
                      }}
                      name="user_description"
                    ></textarea>
                    <p className="end-0 text-gray-400">
                      500/{(this.props.user_description || "").length}
                    </p>
                    {this.props.errorsObj &&
                    this.props.errorsObj?.description ? (
                      <span className="red">
                        {this.props.errorsObj.description[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </form>
                </div> */}

                {refreshData.is_admin && (
                  <Button
                    className="w-s mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white disabled:opacity-80 hover:opacity-80"
                    onClick={() => this.handleUpdateBasicInfo()}
                    disabled={this.state.flag}
                    text={
                      this.props.isLoading ? (
                        <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                      ) : (
                        "Save Changes"
                      )
                    }
                  />
                )}
              </div>
              {/* <SettingBrandAccount /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
    isLoading: state.BasicInfoReducer.isLoading,
    errorsObj: state.BasicInfoReducer.errorsObj,
    ActivateModalShow: state.BasicInfoReducer.ActivateModalShow,
    name: state.BasicInfoReducer.name,
    first_name: state.BasicInfoReducer.first_name,
    email: state.BasicInfoReducer.email,
    last_name: state.BasicInfoReducer.last_name,
    profile_pic: state.BasicInfoReducer.profile_pic,
    avatar: state.BasicInfoReducer.avatar,
    country: state.BasicInfoReducer.country,
    state: state.BasicInfoReducer.state,
    password: state.SettingAccountReducer.password,
    city: state.BasicInfoReducer.city,
    timeZone: state.BasicInfoReducer.timeZone,
    currency: state.BasicInfoReducer.currency,
    is_currency_set: state.BasicInfoReducer.is_currency_set,
    website: state.BasicInfoReducer.website,
    user_description: state.BasicInfoReducer.user_description,
    review_visible: state.BasicInfoReducer.review_visible,
    countries: state.GeneralReducer.countries,
    states: state.GeneralReducer.states,
    cities: state.GeneralReducer.cities,
    timeZones: state.GeneralReducer.timeZones,
    currencies: state.GeneralReducer.currencies,
    refreshData: state.HeaderReducer.refreshData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) =>
      dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
    setActivateModalShow: (event) =>
      dispatch({ type: HANDEL_ACTIVE_MODAL_SHOW, payload: event }),
    handleOnDrop: (event) =>
      dispatch({ type: HANDLE_ON_DROP_FILE, payload: event }),
    handleSelectCountry: (event) =>
      dispatch({ type: HANDLE_SELECT_COUNTRY_SUCCESS, payload: event }),
    handleSelectState: (event) =>
      dispatch({ type: HANDLE_SELECT_STATE_SUCCESS, payload: event }),
    handleSelectCity: (event) =>
      dispatch({ type: HANDLE_SELECT_CITY_SUCCESS, payload: event }),
    handleSelectCurrency: (event) =>
      dispatch({ type: HANDLE_SELECT_CURRENCY_SUCCESS, payload: event }),
    handleSelectTimeZone: (event) =>
      dispatch({ type: HANDLE_SELECT_TIMEZONE_SUCCESS, payload: event }),
    fetchCountries: () => dispatch(generalActions.fetchCountries()),
    fetchCurrencies: () => dispatch(generalActions.fetchCurrencies()),
    fetchCurrency: (coutryCode) =>
      dispatch(generalActions.fetchCurrency(coutryCode)),
    fetchStates: (countryId) => dispatch(generalActions.fetchStates(countryId)),
    fetchTimeZones: (countryId) =>
      dispatch(generalActions.fetchTimeZones(countryId)),
    fetchCities: (stateId) => dispatch(generalActions.fetchCities(stateId)),
    brandBasicInfoSettigs: () =>
      dispatch(basicInfoActionsCreator.brandBasicInfoSettigs()),
    handleChangeAvatar: (query) =>
      dispatch(basicInfoActionsCreator.handleChangeAvatar(query)),
    handleBrandBasicInfoUpdate: (query) =>
      dispatch(basicInfoActionsCreator.handleBrandBasicInfoUpdate(query)),
    brandAccountSettings: () =>
      dispatch(settingAccountActionCreator.brandAccountSettings()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandSettingProfile);
