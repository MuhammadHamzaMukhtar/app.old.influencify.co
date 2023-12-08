import React from "react";
import { connect } from "react-redux";
import oops from "@assets/oops.png";
import Anchor from "@components/global/Anchor";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		let query = JSON.stringify({
			message: error.message,
			stack: error.stack,
			info: info,
		});
		this.props.sendErrorBoundaryException(query);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<div className="containers">
						<div className="text-center pt-12 mb-12">
							<img
								src={oops}
								className="w-[400px] mx-auto"
								alt="Something went wrong"
							/>
							<h2 className="text-[24px] mt-6 mb-4 black">
								Something went wrong.
							</h2>
							<p>Whoops, something went wrong. please try again</p>
							<Anchor
								href="/"
								text="Go Home"
								className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-4"
							/>
						</div>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

const mapDispatchToProps = () => {
	const { actions } = require("@store/redux/ErrorHandlerRedux");
	return {
		sendErrorBoundaryException: (data) => {
			actions.sendErrorBoundaryException(data);
		},
	};
};

export default connect(null, mapDispatchToProps)(ErrorBoundary);
