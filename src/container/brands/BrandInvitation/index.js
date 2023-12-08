import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as registerAction from "@store/actions/RegisterActions";
import Loader from "@components/global/Loader";
import { Helmet } from "react-helmet";

class BrandInvitation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const id = this.props.params.id;
		const data = { id: id };
		this.props.acceptBrandInvitation(data);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.message !== this.props.message) {
			if (localStorage.getItem("isLogin")) {
				this.props.fetchSubAccount({
					main_account: localStorage.getItem("main_account"),
				});
			}
		}
	}

	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		const { status, message } = this.props;
		return (
			<div>
				<Helmet>
					<title>{"Invitation"}</title>
					<meta charSet="utf-8" />
				</Helmet>
				{status ? (
					<div className="containers mt-12 mb-12 flex justify-center">
						<div className="alert alert-success text-center w-50" role="alert">
							{message}{" "}
							{localStorage.getItem("isLogin") ? (
								<Link
									className="text-white text-[14px] font-bold"
									to="/dashboard"
								>
									Go to dashboard
								</Link>
							) : (
								<a
									className="text-white text-[14px] font-bold"
									href="/brand/login"
								>
									Login to continue
								</a>
							)}
						</div>
					</div>
				) : (
					<div className="containers mt-12 mb-12 flex justify-center">
						<div className="alert alert-danger text-center w-50" role="alert">
							{message}{" "}
							{!localStorage.getItem("isLogin") && (
								<a
									className="text-white text-[14px] font-bold"
									href="/brand/login"
								>
									Login to continue
								</a>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.RegisterReducer.isLoading,
		refreshData: state.HeaderReducer.refreshData,
		status: state.HeaderReducer.requestInvitationStatus,
		message: state.HeaderReducer.requestInvitationMessage,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/SubAccountRedux");
	return {
		fetchSubAccount: (data) => {
			actions.fetchSubAccount(dispatch, data);
		},
		acceptBrandInvitation: (data) =>
			dispatch(registerAction.acceptBrandInvitation(data, ownProps)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandInvitation);
