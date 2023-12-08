import { Component } from "react";
import Filters from "./Filters";
import Content from "./Content";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class BrandAdsLibrary extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
	}
	componentDidMount() {
		const { fetchAdsLibrary, payload } = this.props;
		fetchAdsLibrary(this.page, payload);
	}

	fetchAdsLibrary = (filter = false) => {
		const { fetchAdsLibrary, payload } = this.props;
		if (filter) {
			this.page = 1;
		} else {
			this.page++;
		}
		fetchAdsLibrary(this.page, payload);
	};

	render() {
		return (
			<>
				<Helmet>
					<meta charSet="utf-8" />
					<title>
						Sponsored posts | {process.env.REACT_APP_NAME}{" "}
						{process.env.NODE_ENV}
					</title>
				</Helmet>
				<div>
					<div className="bg-white">
						<Filters fetchAdsLibrary={this.fetchAdsLibrary} />
					</div>
					<div className="pb-12 relative">
						<div className="h-[1px] bg-[#ddd] w-full mb-0"></div>
						<div className="containers mt-12">
							<Content fetchAdsLibrary={this.fetchAdsLibrary} />
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = ({ AdLibrary }) => {
	return {
		isLoading: AdLibrary.is_loading,
		items: AdLibrary.items,
		payload: AdLibrary.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		fetchAdsLibrary: (page, data) => {
			actions.fetchAdsLibrary(dispatch, page, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandAdsLibrary);
