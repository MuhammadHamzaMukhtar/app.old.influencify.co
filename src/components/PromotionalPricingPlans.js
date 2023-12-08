import { Component } from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { FaTimes, FaCheck } from "react-icons/fa";
import Tooltip from "@components/global/Tooltip";
// import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
// import { withRouter } from "react-router";

class PromotionalPricingPlans extends Component {
	constructor(props) {
		super(props);
		this.state = {
			billingType: "month",
			checked: false,
		};
		this.companyChange = this.companyChange.bind(this);
	}

	handleBillingType = (event, newAlignment) => {
		this.setState({
			billingType: newAlignment,
		});
	};

	companyChange(checked) {
		this.setState({ checked });
		if (checked === true) {
			this.setState({
				billingType: "year",
			});
		} else {
			this.setState({
				billingType: "month",
			});
		}
	}

	render() {
		// const { billingType } = this.state;
		return (
			<div className="containers">
				<div className="">
					<div className="mb-12 md:flex items-center justify-between">
						<div className="mb-12 md:!mb-0">
							<h1 className="text-[30px]">Select Your Plan</h1>
						</div>
					</div>
					<div className="pricing-plan flex">
						<div className="individual-plan border hidden d-lg-none xl:block">
							<div
								className="border-bottom text-center p-4 item"
								style={{ minHeight: "220px" }}
							>
								<h5 className="card-title text-[18px]">PLANS</h5>
								<span>Prices in USD</span>
							</div>
							<div className="card-body flex flex-col">
								<ul className="list-unstyled text-left">
									<Tooltip
										trigger={<li>Service fee + payment processing</li>}
										tooltipText="Service fee + payment processing"
										placement="top-left"
									/>
									<li>Public campaigns</li>
									<li>Direct invite campaigns</li>
									<li>Brand Shop (Shopify: store products sync)</li>
									<li>Analyze or invite verified influencers</li>
									<li>Analyze or invite non verified influencers</li>
									<li>Access to "Discover" influencers search page</li>
									<li>Pay Per product</li>
									<li>Discover Youtube influencers</li>
									<li>Discover Tiktok influencers</li>
									<li>Influential Followers</li>
									<li>Content Creation Campaign</li>
									<li>Analyzer</li>
								</ul>
							</div>
						</div>

						<div className="w-full md:hidden mt-6"></div>
						{this.props.promotionalPlans && this.props.promotionalPlans.length
							? this.props.promotionalPlans.map((plan, index) => (
									<div
										className={
											"individual-plan border " +
											(plan.isRecommended ? " popular" : "") +
											""
										}
										key={index}
									>
										{plan.isRecommended ? (
											<div className="card-packageName">
												<p className="text-white">Most Popular</p>
											</div>
										) : (
											""
										)}
										<div
											className="border-bottom text-center p-4 item"
											style={{ minHeight: "220.2px" }}
										>
											<h5 className="card-title text-[18px]">{plan.name}</h5>
											<h6 className="text-[14px]">
												${plan.price} /
												<span className="text-[14px] font-medium">
													{" "}
													{plan.interval}
												</span>
											</h6>
											<Button
												onClick={() => this.props.getStartedPlan(plan.id)}
												text="TRY NOW"
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-6"
											/>
										</div>
										<div className="card-body flex flex-col">
											<ul className="list-unstyled text-left text-xl-center">
												<li>
													<span className="xl:hidden">
														Service fee + payment processing
													</span>
													<span>
														{plan.planFeature && plan.planFeature.serviceFee
															? plan.planFeature.serviceFee
															: ""}
														%
													</span>
												</li>
												<li>
													<span className="xl:hidden">Public campaigns</span>
													<span>
														{plan.planFeature &&
														plan.planFeature.publicCampaigns
															? plan.planFeature.publicCampaigns
															: ""}
													</span>
												</li>
												<li>
													<span className="xl:hidden">
														Direct invite campaigns
													</span>
													<span>
														{plan.planFeature &&
														plan.planFeature.directCampaigns
															? plan.planFeature.directCampaigns
															: ""}
													</span>
												</li>
												<li>
													<span className="xl:hidden">
														Brand Shop (Shopify: store products sync)
													</span>
													{plan.planFeature && plan.planFeature.shopify ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">
														Analyze or invite verified influencers{" "}
													</span>
													<span>
														{plan.planFeature &&
														plan.planFeature.verifiedReportCredits
															? plan.planFeature.verifiedReportCredits
															: ""}
													</span>
												</li>
												<li>
													<span className="xl:hidden">
														Analyze or invite non verified influencers{" "}
													</span>
													<span>
														{plan.planFeature &&
														plan.planFeature.nonVerifiedReportCredits
															? plan.planFeature.nonVerifiedReportCredits
															: ""}
													</span>
												</li>
												<li>
													<span className="xl:hidden">
														Access to "Discover" influencers search page
													</span>
													{plan.planFeature &&
													plan.planFeature.discoverSearches ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">Pay Per product </span>
													<span>
														{plan.planFeature && plan.planFeature.payPerProduct
															? plan.planFeature.payPerProduct
															: ""}
													</span>
												</li>
												
												<li>
													<span className="xl:hidden">
														Discover Youtube influencers{" "}
													</span>
													{plan.planFeature &&
													plan.planFeature.discoverYoutubeInfluencers ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">
														Discover Tiktok influencers{" "}
													</span>
													{plan.planFeature &&
													plan.planFeature.discoverTiktokInfluencers ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">
														Influential Followers{" "}
													</span>
													{plan.planFeature &&
													plan.planFeature.influentialFollowers ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">
														Content Creation Campaign
													</span>
													{plan.planFeature &&
													plan.planFeature.contentCampaigns ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
												<li>
													<span className="xl:hidden">Analyzer </span>
													{plan.planFeature && plan.planFeature.analyzer ? (
														<FaCheck />
													) : (
														<FaTimes />
													)}
												</li>
											</ul>
											<span
												onClick={() => this.props.getStartedPlan(plan.id)}
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center mt-4"
											>
												Get started
											</span>
										</div>
										{plan.isRecommended ? (
											<div className="card-packageName card-packageName-foot">
												<p className="text-white">Most Popular</p>
											</div>
										) : (
											""
										)}
									</div>
							  ))
							: ""}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.SettingSubscriptionReducer.isLoading,
		promotionalPlans: state.SettingSubscriptionReducer.promotionalPlans,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		// getStartedPlan : (id)  => dispatch(settingSubscriptionActions.getStartedPlan(id , ownProps)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PromotionalPricingPlans);
