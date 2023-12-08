import React from "react";
import { connect } from "react-redux";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import * as headerActions from "@store/actions/HeaderActions";

class YoutubeVerifyToken extends React.Component {
	async componentDidMount() {
		const code = this.props.match.params.code;
		if (code) {
			this.props.handleFetchPlatforms();
			this.props.currentLoggedInUser();
			this.props.history.push("/influencer/setting-influencer-platforms");
			//   window.location.pathname = "/influencer/setting-influencer-platforms";
		}
		//this.props.brandVerifyGmailToken(digit+"/"+code, params.session);
	}

	render() {
		return (
			<div>
				<div className="containers mt-12 mb-12">
					<div className="mt-6">
						<h3>Connecting</h3>
					</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(YoutubeVerifyToken);
