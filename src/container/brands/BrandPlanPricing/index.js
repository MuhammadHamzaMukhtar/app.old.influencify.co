import React, { Component } from "react";
import PricingFaqs from "@components/PricingFaqs";
import PricingPlans from "@components/PricingPlans";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";

class BrandPlanPricing extends Component {
	componentDidMount() {
		this.props.fetchSubscriptionPlans();
	}

	render() {
		if (localStorage.getItem("isLogin")) {
			if (localStorage.getItem("role") === "brand") {
				window.location.href = "/billing";
			}
			if (localStorage.getItem("role") === "influencer") {
				window.location.href = "/";
			}
		}
		if (this.props.isLoading) {
			return <Loader />;
		}

		return (
			<div className="Pricing-page">
				<div className="plan-box mt-12">
					<PricingPlans />
				</div>
				<div className="faq-box mt-12 mb-12">
					<PricingFaqs />
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
export default connect(mapStateToProps, mapDispatchToProps)(BrandPlanPricing);
