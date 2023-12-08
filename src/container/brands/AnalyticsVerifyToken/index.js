import React from "react";
import { connect } from "react-redux";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import * as headerActions from "@store/actions/HeaderActions";
import Influencify from "../../../constants/Influencify";

class AnalyticsVerifyToken extends React.Component {

    async componentDidMount() {
        const code = this.props.params;
        if (code) {
            const data = { code: code };
            const response = await Influencify.connectGoogleAnalytics(data);
			this.props.navigate("/integration/analytics");
        }
    }

	render() {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div>
					<h3 className="text-gray-700 text-3xl font-semibold">Connecting...</h3>
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
		brandVerifyGmailToken: (code, session) =>
			dispatch(
				settingGmailActions.brandVerifyGmailToken(code, session, ownProps)
			),
		handleFetchPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleFetchPlatforms()),
		currentLoggedInUser: () => dispatch(headerActions.currentLoggedInUser()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnalyticsVerifyToken);
