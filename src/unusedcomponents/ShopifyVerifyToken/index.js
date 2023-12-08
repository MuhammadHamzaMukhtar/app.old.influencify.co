import React from "react";
import { connect } from "react-redux";
import * as settingShopifyActions from "@store/actions/SettingShopifyActions";

class ShopifyVerifyToken extends React.Component {
  componentDidMount() {
    this.props.brandVerifyShopifyToken();
  }

  render() {
    return (
      <div className="containers mt-12 mb-12">
        <div className="mt-6">
          <h3>Connecting</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.SettingShopifyReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    brandVerifyShopifyToken: () =>
      dispatch(settingShopifyActions.brandVerifyShopifyToken(ownProps)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopifyVerifyToken);
