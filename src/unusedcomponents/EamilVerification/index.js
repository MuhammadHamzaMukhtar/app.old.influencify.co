import React from "react";
import { connect } from "react-redux";
import * as loginAction from "@store/actions/BrandLoginActions";

class EamilVerification extends React.Component {
	componentDidMount() {
		const { verifyToken } = this.props.params;
		this.props.brandLoginAfterVerification(verifyToken);
	}

	render() {
		return (
			<div className="containers mt-12 mb-12">
				<div className="grid grid-cols-12 gap-5 mt-6">
					<div className="lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 col-span-12">
						{/* <div className="bg-[#d4edda] border-[1px] border-[#c3e6cb] text-[#155724] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
							<p className="text-white">
								<b className="text-white">Email Confirmed,</b> <br /> Thank you
								for validating your email. Your account is now fully Activated.{" "}
								<br />
							</p>
						</div> */}
						<div className="text-center">
							<h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Checking request...</h1>
						</div>
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

const mapDispatchToProps = (dispatch) => {
	return {
		brandLoginAfterVerification: (id) =>
			dispatch(loginAction.brandLoginAfterVerification(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EamilVerification);
