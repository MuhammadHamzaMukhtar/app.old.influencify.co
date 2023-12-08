import React from "react";
import { connect } from "react-redux";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import { Link } from "react-router-dom";

class GmailVerifyToken extends React.Component {
  componentDidMount() {
    const { navigate } = this.props;
    this.props.params &&
      this.props.brandVerifyGmailToken(this.props.params, navigate);
  }
  render() {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          {this.props.error && this.props.error == 'access_denied' ? 
          <>
              <p className="text-3xl text-red-500 mb-8">Request Cancelled by user</p>
              <Link to={'/integration'} className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#7c3292] text-white hover:opacity-80">Go Back</Link>
          </>
             : 
          <p className="text-3xl text-gray-500 mt-2">Redirecting...</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.SettingSubscriptionReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    brandVerifyGmailToken: (code, navigate) =>
      dispatch(settingGmailActions.brandVerifyGmailToken(code, navigate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GmailVerifyToken);
