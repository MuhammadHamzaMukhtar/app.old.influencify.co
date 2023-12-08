import React, { useEffect, useState } from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import * as registerAction from "@store/actions/RegisterActions";
import { FaSpinner } from "react-icons/fa";
import {
  HANDLE_CHANGE_SUCCESS,
  HANDLE_CHANGE_COUPON_SUCCESS,
  HANDLE_REGISTER_SUCCESS,
} from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import zxcvbn from "zxcvbn";
import Api from "@services/axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const BrandRegisterPlan = (props) => {
  const [loading, setLoading] = useState(false);
  const [isNextClick, setIsNextClick] = useState(false);
  const [shown, setShown] = useState(false);
  const [type, setType] = useState("password");
  const [errors, setErrors] = useState({});
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = params?.id;
    if (id) {
      props.fetchPlanSummary(id);
    }

    //props.clearForm();
  }, [params]);

  const _handleChange = (event) => {
    props.handleInputChange(event);
  };

  const handleNextClick = async () => {
    setLoading(true);
    setErrors({});
    const data = {
      name: props.displayName,
      first_name: props.first_name,
      last_name: props.last_name,
      email: props.email,
      password: props.password,
      termOfUse: props.termOfUse,
      privacyPolicy: props.privacyPolicy,
      domain: props?.domain,
      access_token: props?.access_token,
      hmac: props?.hmac,
      code: props?.code,
      timestamp: props?.timestamp,
      planType: params?.type,
    };
    if (params?.id) {
      data["plan_id"] = params?.id;
    }
    const response = await Api.HandleNextClick(data);
    if (response?.status === 200) {
      dispatch({ type: HANDLE_REGISTER_SUCCESS });
      if (response.data?.url) {
        window.location.href = response.data?.url;
      } else {
        setIsNextClick(true);
      }
    } else {
      if (response.data?.errors) {
        setErrors(response.data?.errors);
      }
      setLoading(false);
    }
  };

  const createPasswordLabel = (result) => {
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

  const createPasswordLength = (result) => {
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

  const createPasswordVariant = (result) => {
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

  const handleVisible = (shown, type) => {
    setShown(shown);
    setType(type);
  };

  if (props.isLoading) {
    return <Loader />;
  }
  const givenPassword = zxcvbn(props.password);

  return (
    <div className="sign-up-page">
      <div className=" text-center">
        <h1 className="pt-12 sm:text-[40px] text-[30px] black font-semibold">
          Registration
        </h1>
      </div>
      {!isNextClick ? (
        <div className="containers mt-12 mb-12">
          <div className="flex flex-wrap justify-center">
            <div className="lg:w-6/12 md:w-8/12 w-full">
              <form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4">
                <div className="mb-[1rem]">
                  <div className="md:flex flex-row justify-between">
                    <div className="w-full md:!mb-0 mb-4">
                      <input
                        type="text"
                        name="first_name"
                        value={props.first_name || ""}
                        onChange={(e) => _handleChange(e)}
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                        placeholder="First name"
                        autoComplete="off"
                      />
                      {props.errorsObj?.first_name && (
                        <span className="red block mt-0">
                          {props.errorsObj.first_name[0]}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:pl-2">
                      <input
                        type="text"
                        name="last_name"
                        value={props.last_name || ""}
                        onChange={(e) => _handleChange(e)}
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                        placeholder="Last name (Optional)"
                        autoComplete="off"
                      />
                      {props.errorsObj?.last_name && (
                        <span className="red block mt-0">
                          {props.errorsObj.last_name[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-[1rem]">
                  <input
                    type="text"
                    name="displayName"
                    className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    value={props.displayName || ""}
                    onChange={(e) => _handleChange(e)}
                    placeholder="Brand Name"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-[1rem]">
                  <input
                    type="email"
                    name="email"
                    className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    value={props.email || ""}
                    onChange={(e) => _handleChange(e)}
                    placeholder="Email"
                    autoComplete="off"
                  />
                </div>

                <div className="relative mb-[1rem]">
                  <input
                    type={type}
                    name="password"
                    className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    value={props.password || ""}
                    onChange={(e) => _handleChange(e)}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  {shown ? (
                    <AiOutlineEyeInvisible
                      size={22}
                      onClick={() => handleVisible(false, "password")}
                      className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
                    />
                  ) : (
                    <AiOutlineEye
                      size={22}
                      onClick={() => handleVisible(true, "text")}
                      className="absolute z-1 right-[10px] cursor-pointer h-full top-0 darkGray"
                    />
                  )}
                </div>
                <div className="mb-[1rem]">
                  <div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
                    <div
                      className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
                      style={{
                        backgroundColor: createPasswordVariant(givenPassword),
                        width: `${createPasswordLength(givenPassword)}%`,
                      }}
                    >
                      {createPasswordLabel(givenPassword)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-3">
                  <div className="flex items-center flex-wrap">
                    <label
                      htmlFor="termofuse"
                      className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
                    >
                      <input
                        id="termofuse"
                        type="checkbox"
                        name="termOfUse"
                        checked={props.termOfUse}
                        onChange={(event) => _handleChange(event)}
                        className="hidden peer"
                      />
                      <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
                      I agree to Influencify
                    </label>
                    <a
                      className="text-[15px] success"
                      target="_blank"
                      rel="noreferrer"
                      href="https://influencify.co/terms-of-service/"
                    >
                      Terms of Service
                    </a>
                  </div>
                  {props.errorsObj?.termOfUse ? (
                    <span className="red block mt-0">
                      {props.errorsObj.termOfUse[0]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center flex-wrap">
                    <label
                      htmlFor="privacyPolicy"
                      className="cursor-pointer flex items-center text-[15px] font-normal mr-2"
                    >
                      <input
                        id="privacyPolicy"
                        type="checkbox"
                        name="privacyPolicy"
                        checked={props.privacyPolicy}
                        onChange={(event) => _handleChange(event)}
                        className="hidden peer"
                      />
                      <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
                      I agree to Influencify
                    </label>
                    <a
                      className="text-[15px] success"
                      target="_blank"
                      rel="noreferrer"
                      href="https://influencify.co/privacy-policy/"
                    >
                      Privacy Policy
                    </a>
                  </div>
                  {props.errorsObj?.privacyPolicy ? (
                    <span className="red block mt-0">
                      {props.errorsObj.privacyPolicy[0]}
                    </span>
                  ) : (
                    ""
                  )}
                  {props.errorsObj?.recaptcha ? (
                    <span className="red block mt-0">
                      {props.errorsObj.recaptcha[0]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-[1rem]">
                  <Button
                    disabled={
                      !props.first_name ||
                      !props.email ||
                      !props.password ||
                      !props.termOfUse ||
                      !props.privacyPolicy
                    }
                    className="w-full rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-70 mt-4 disable:hover:opacity-80"
                    type="button"
                    text={
                      loading ? (
                        <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                      ) : (
                        "Register"
                      )
                    }
                    onClick={handleNextClick}
                  />
                </div>

                {Object.keys(errors).length > 0 && (
                  <div className="alert alert-danger">
                    {Object.keys(errors).map((item, key) => (
                      <p key={key} className="text-red-500">
                        {errors[item][0]}
                      </p>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="containers mt-12 mb-12">
          <div className="flex flex-wrap justify-center">
            <div className="lg:w-6/12 md:w-8/12 w-full">
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
                <div className="mb-6">
                  <h4 className="font-bold text-[20px]">
                    {props.first_name}, thank you for registering.
                  </h4>
                  <p>
                    We sent an email to {props.email} containing a link that you
                    should click to confirm your registration.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[20px]">
                    Didn't get the email?
                  </h4>

                  <ol className="list-decimal pl-4">
                    <li>Please see your spam folder.</li>
                    <li>Check that the email provided is correct.</li>
                    <li>Wait 15 minutes and check your email again.</li>
                    <li>contact support@influencify.co</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.RegisterReducer.isLoading,
    errorsObj: state.RegisterReducer.errorsObj,
    sentVerifyEmail: state.RegisterReducer.sentVerifyEmail,
    displayName: state.RegisterReducer.displayName,
    first_name: state.RegisterReducer.first_name,
    last_name: state.RegisterReducer.last_name,
    email: state.RegisterReducer.email,
    password: state.RegisterReducer.password,
    termOfUse: state.RegisterReducer.termOfUse,
    privacyPolicy: state.RegisterReducer.privacyPolicy,
    planName: state.RegisterReducer.planName,
    planPrice: state.RegisterReducer.planPrice,
    planinterval: state.RegisterReducer.planinterval,
    plantotal: state.RegisterReducer.plantotal,
    subTotal: state.RegisterReducer.subTotal,
    discount: state.RegisterReducer.discount,
    total: state.RegisterReducer.total,
    couponCode: state.RegisterReducer.couponCode,
    planType: state.RegisterReducer.planType,

    domain: state.RegisterReducer?.domain,
    access_token: state.RegisterReducer?.access_token,
    scope: state.RegisterReducer?.scope,
    hmac: state.RegisterReducer?.hmac,
    shop: state.RegisterReducer?.shop,
    code: state.RegisterReducer?.code,
    timestamp: state.RegisterReducer?.timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (event) =>
      dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
    clearForm: () =>
      dispatch({
        type: "HANDLE_INFLUENCER_REGISTRATION_FINSH_SUCCESS",
        payload: "success",
      }),
    handleChangeCoupon: (event) =>
      dispatch({ type: HANDLE_CHANGE_COUPON_SUCCESS, payload: event }),
    handleBrandRegisterSubmit: (query) =>
      dispatch(registerAction.handleBrandRegisterSubmit(query)),
    fetchPlanSummary: (id) => dispatch(registerAction.fetchPlanSummary(id)),
    applyCoupon: (query) => dispatch(registerAction.applyCoupon(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandRegisterPlan);
