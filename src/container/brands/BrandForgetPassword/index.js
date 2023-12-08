import React from "react";
import { connect } from "react-redux";
import * as forgetPasswordAction from "@store/actions/ForgetPasswordActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import { FaSpinner } from "react-icons/fa";
import store from "@store/index";

class BrandForgetPassword extends React.Component {
  componentDidMount() {
    store.dispatch({
      type: "HANDLE_RESET_PASSWORD_SUBMIT_SUCEESS",
    });
  }

  _handleChange(event) {
    this.props.handleInputChange(event);
  }

  handleSubmitForgetPassword = () => {
    let query = {
      email: this.props.email,
      role: this.props.role.role,
    };
    this.props.handleForgetPasswrodSubmit(query);
  };

  render() {
    // if (this.props.isLoading) {
    // 	return (
    // 		<Loader
    // 			className="h-full w-full flex justify-center items-center"
    // 			size="67"
    // 		/>
    // 	);
    // }
    return (
      <div className="bg-[#f4f4f5] pt-[107px] mb-0 pb-12">
        <div className="text-center">
          <h1 className="sm:text-[40px] black text-[30px] font-semibold">
            Forgot Password
          </h1>
        </div>

        <div className="containers mb-32">
          <div className="flex flex-wrap mt-6 justify-center">
            <div className="lg:w-6/12 md:w-8/12 w-full">
              {this.props.response_message ? (
                <div className="bg-[#157347] rounded-[8px] px-6 py-3 mb-3">
                  <p className="text-white">{this.props.response_message}</p>
                </div>
              ) : (
                ""
              )}
              <form className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white rounded-[8px] p-4">
                <div className="mb-[1rem]">
                  <input
                    type="email"
                    name="email"
                    className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    value={this.props.email}
                    onChange={(e) => this._handleChange(e)}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {this.props.errorsObj?.email ? (
                    <span error className="red block mt-4">
                      {this.props.errorsObj.email[0]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  className="w-full rounded-[8px] bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center"
                  type="button"
                  text={
                    this.props.isLoading ? (
                      <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                    ) : (
                      "Password Reset"
                    )
                  }
                  onClick={() => this.handleSubmitForgetPassword()}
                />
                <p className="text-[16px] flex w-full justify-center darkGray mt-4">
                  Go back to the
                  <LinkTo
                    className="ml-2 text-[16px] success"
                    to={`/${this.props.role.role}/login`}
                    text="Login"
                  />
                </p>
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
    isLoading: state.ForgetPasswordReducer.isLoading,
    errorsObj: state.ForgetPasswordReducer.errorsObj,
    email: state.ForgetPasswordReducer.email,
    response_message: state.ForgetPasswordReducer.response_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (event) =>
      dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
    handleForgetPasswrodSubmit: (query) =>
      dispatch(forgetPasswordAction.handleForgetPasswrodSubmit(query)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandForgetPassword);
