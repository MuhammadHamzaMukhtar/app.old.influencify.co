import { Component } from "react";
import { Helmet } from "react-helmet";
import PricingFaqs from "@components/PricingFaqs";
import PricingPlans from "@components/PricingPlans";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import helper from "../../../constants/helper";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";

class Pricing extends Component {
	componentDidMount() {
		this.props.fetchSubscriptionPlans();
	}
	render() {
		const url = window.location.href;
		const title = helper.pricing_title;
		const description = helper.pricing_description;
		if (localStorage.getItem("isLogin")) {
			if (localStorage.getItem("role") === "brand") {
				window.location.href = "/billing";
			}
			if (localStorage.getItem("role") === "influencer") {
				window.location.href = "/";
			}
		}
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[67vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta name="description" content={description} />
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="Pricing-page">
					<div className="mt-12">
						<PricingPlans />
					</div>
					<div className="containers my-12">
						<PricingFaqs />
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
		fetchSubscriptionPlans: () =>
			dispatch(settingSubscriptionActions.fetchSubscriptionPlans()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
