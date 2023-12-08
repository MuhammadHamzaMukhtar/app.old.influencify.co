import React, { Component } from "react";
import PricingFaqs from "@components/PricingFaqs";
import PromotionalPricingPlans from "@components/PromotionalPricingPlans";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";

class BrandPromotionalPricing extends Component {
	componentDidMount() {
		this.props.fetchPromotionalPlans();
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
					<PromotionalPricingPlans />
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
		fetchPromotionalPlans: () =>
			dispatch(settingSubscriptionActions.fetchPromotionalPlans()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandPromotionalPricing);
