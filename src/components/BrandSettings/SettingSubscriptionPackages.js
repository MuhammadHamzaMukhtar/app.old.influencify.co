import React, { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import { FiX, FiCheck } from "react-icons/fi";
import { connect } from "react-redux";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import * as registerAction from "@store/actions/RegisterActions";

import Loader from "@components/global/Loader";
import BillingCycle from "../BillingCycle";
import CancelSubscription from "../CancelSubscription";
import {
  HANDLE_BILLING_TYPE,
  HANDLE_DOWN_GRADE_MODAL_HIDE,
} from "@store/constants/action-types";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import Subscription from "./Subscriptions";

const capitalize = (str) => {
  return (str || "").charAt(0).toUpperCase() + (str || "").slice(1);
};

class SettingSubscriptionPackages extends Component {
  constructor(props) {
    super(props);
    this.companyChange = this.companyChange.bind(this);
    this.state = {
      upgradeModal: false,
      downGradeModalSuccess: false,
      planId: "",
      planPrice: "",
      planInterval: "",
      plan: {},
      couponCode: "",
      couponLoader: false,
      showCreditCard: false,
      downGradeModal: true,
      showPlans: false,
    };
  }

  companyChange(type) {
    this.props.billingTypeHandle(type);
  }

  showUpgradeModal = async (plan) => {
    this.setState({ plan: plan, upgradeModal: true });
  };

  showdownGradeModal = (planId, planPrice, planInterval) => {
    this.setState({
      downGradeModal: true,
      planId: planId,
      planPrice: planPrice,
      planInterval: planInterval,
    });
  };

  handleClose = () => {
    this.setState({
      upgradeModal: false,
      downGradeModal: false,
    });
  };

  handleDownGradePlan = (planId) => {
    const { defaultPaymentMethod } = this.props;
    if (
      defaultPaymentMethod &&
      typeof defaultPaymentMethod === "object" &&
      Object.keys(defaultPaymentMethod).length > 0
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to downgrade the Subscription?",
        icon: "question",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#7c3292",
        cancelButtonColor: "#f4f4f5",
        customClass: {
          actions: "flex-row-reverse",
          closeButton: "hover:text-[#7c3292]",
          confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
          cancelButton:
            "hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          this.props.downgradePlan(planId);
        }
      });
    } else {
      this.setState({ showCreditCard: true });
    }
  };

  handleUpGradePlan = () => {
    this.props.upgradePlan(this.state.plan.id);
    this.setState({
      upgradeModal: false,
    });
  };

  handleCancelSubscription = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the Subscription?",
      icon: "question",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No!",
      confirmButtonColor: "#7c3292",
      cancelButtonColor: "#f4f4f5",
      customClass: {
        actions: "flex-row-reverse",
        closeButton: "hover:text-[#7c3292]",
        confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
        cancelButton:
          "hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        this.props.cancelSubscription();
      }
    });
  };

  couponApply = async () => {
    this.setState({ couponLoader: true });
    this.setState({ couponCode: "", couponLoader: false });
  };

  handleSubscriptionPlan = async () => {
    await this.props.subscribe({ id: this.state.plan?.id });

    this.props.fetchBrandSubscriptionPlans();
    this.props.refreshReports();
  };

  render() {
    if (this.props.isLoading) {
      return (
        <Loader
          className="h-full w-full flex justify-center items-center"
          size="67"
        />
      );
    }
    const { plan, showPlans } = this.state;
    const { loader, subscription, currentLoggedUser } = this.props;

    return (
      <div>
        {currentLoggedUser.is_shopify || showPlans ? (
          <>
            {(this.props.yearlyPlans || []).length > 0 && (
              <div className="m-0 flex flex-wrap justify-center">
                <label className="my-6 flex items-center">
                  <p
                    className={
                      "font-medium " +
                      (this.props.billingType === false ? "success" : "") +
                      " mr-6"
                    }
                  >
                    Monthly Billing
                  </p>
                  <Switch
                    icons="false"
                    onChange={this.companyChange}
                    checked={this.props.billingType}
                    onColor="#9BF0E4"
                    offColor="#888"
                    offHandleColor="#fff"
                    onHandleColor="#fff"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                  <p
                    className={
                      "font-medium " +
                      (this.props.billingType === true ? "success" : "") +
                      " ml-6"
                    }
                  >
                    Annual Billing (save 20%)
                  </p>
                </label>
              </div>
            )}
            <div className="grid grid-cols-12 gap-5">
              {this.props.billingType === false &&
                this.props.monthlyPlans &&
                this.props.monthlyPlans.length > 0 &&
                this.props.monthlyPlans.map((plan, index) => (
                  <div
                    className="lg:col-span-4 sm:col-span-6 col-span-12 mb-12"
                    key={index}
                  >
                    <div className="flex items-stretch h-full">
                      <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 w-full">
                        <div className="flex justify-between items-center p-[1rem]">
                          <p>{plan.name}</p>
                          <h4 className="font-medium  text-[20px]">
                            ${plan.price}{" "}
                            {plan.interval !== "one_time" && (
                              <span>
                                /{" "}
                                <small>
                                  {plan.interval === "month" ? "mo" : "yr"}
                                </small>
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                        <div className="p-3">
                          {subscription?.stripe_plan === plan.stripe_id &&
                          (subscription?.stripe_status === "active" ||
                            subscription?.stripe_status === "past_due" ||
                            subscription?.stripe_status === "trialing") ? (
                            <React.Fragment>
                              <Button
                                disabled
                                className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg-[#e9eaec] text-[#9e9e9e] hover:opacity-80"
                                text="Selected Plan"
                              />
                            </React.Fragment>
                          ) : (
                            <div>
                              <Button
                                onClick={() => this.showUpgradeModal(plan)}
                                disabled={loader?.[plan.id]}
                                className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                                text={
                                  loader?.[plan.id] ? (
                                    <FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
                                  ) : (
                                    "Subscribe"
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                        {plan.planFeature && (
                          <div className="flex flex-col">
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Influential Followers</p>
                              {plan.planFeature.influentialFollowers ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Analyzer</p>
                              {plan.planFeature.analyzer ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Credits</p>
                              <p className="font-semibold">
                                {plan.planFeature.credits}
                              </p>
                            </div>

                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Tiktok Network</p>
                              {plan.planFeature.discoverTiktokInfluencers ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Audience Overlap</p>
                              {plan.planFeature &&
                              plan.planFeature.audienceOverlay ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>
                                Campaigns (Influencer, Affiliate, Request A
                                Quote)
                              </p>
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns === 0 ? (
                                <FiX className="shrink-0 red" size={16} />
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns ===
                                "Unlimited" ? (
                                <p className="font-semibold">Unlimited</p>
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns > 0 ? (
                                <p className="font-semibold">
                                  {plan.planFeature.directCampaigns}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Pay Per Products</p>
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products === 0 ? (
                                <FiX className="shrink-0 red" size={16} />
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products ===
                                "Unlimited" ? (
                                <p className="font-semibold">Unlimited</p>
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products > 0 ? (
                                <p className="font-semibold">
                                  {plan.planFeature.pay_per_products}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Lists</p>
                              {plan.planFeature && plan.planFeature.lists ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Service fee</p>
                              <p className="font-semibold">
                                {plan.planFeature && plan.planFeature.serviceFee
                                  ? plan.planFeature.serviceFee + "%"
                                  : "0%"}
                              </p>
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Gmail</p>
                              {plan.planFeature && plan.planFeature.gmail ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Sub account</p>
                              <p className="font-semibold">
                                {plan.planFeature &&
                                plan.planFeature.sub_account > 0 ? (
                                  plan.planFeature.sub_account
                                ) : (
                                  <FiX className="shrink-0 red" size={16} />
                                )}
                              </p>
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Team members</p>
                              <p className="font-semibold">
                                {plan.planFeature &&
                                plan.planFeature.team_member > 0 ? (
                                  plan.planFeature.team_member
                                ) : (
                                  <FiX className="shrink-0 red" size={16} />
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-12 gap-5">
              {this.props.billingType === true &&
                this.props.yearlyPlans &&
                this.props.yearlyPlans.length > 0 &&
                this.props.yearlyPlans.map((plan, index) => (
                  <div
                    className="lg:col-span-4 sm:col-span-6 col-span-12 mb-12"
                    key={index}
                  >
                    <div className="flex items-stretch h-full">
                      <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 w-full">
                        <div className="flex justify-between items-center p-[1rem]">
                          <p>{plan.name}</p>
                          <h4 className="font-medium  text-[20px]">
                            ${plan.price}{" "}
                            {plan.interval !== "one_time" && (
                              <span>
                                /{" "}
                                <small>
                                  {plan.interval === "month" ? "mo" : "yr"}
                                </small>
                              </span>
                            )}
                          </h4>
                        </div>
                        <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                        <div className="p-3">
                          {subscription?.stripe_plan == plan.stripe_id &&
                          (subscription?.stripe_status == "active" ||
                            subscription?.stripe_status == "past_due" ||
                            subscription?.stripe_status == "trialing") ? (
                            <React.Fragment>
                              <Button
                                disabled
                                className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg-[#e9eaec] text-[#9e9e9e] hover:opacity-80"
                                text="Selected Plan"
                              />
                            </React.Fragment>
                          ) : (
                            <div>
                              <Button
                                onClick={() => this.showUpgradeModal(plan)}
                                disabled={loader?.[plan.id]}
                                className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                                text={
                                  loader?.[plan.id] ? (
                                    <FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
                                  ) : (
                                    "Subscribe"
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                        {plan.planFeature && (
                          <div className="flex flex-col">
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Influential Followers</p>
                              {plan.planFeature.influentialFollowers ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Analyzer</p>
                              {plan.planFeature.analyzer ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Credits</p>
                              <p className="font-semibold">
                                {plan.planFeature.credits}
                              </p>
                            </div>

                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Tiktok Network</p>
                              {plan.planFeature.discoverTiktokInfluencers ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Audience Overlap</p>
                              {plan.planFeature &&
                              plan.planFeature.audienceOverlay ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>
                                Campaigns (Influencer, Affiliate, Request A
                                Quote)
                              </p>
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns === 0 ? (
                                <FiX className="shrink-0 red" size={16} />
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns ===
                                "Unlimited" ? (
                                <p className="font-semibold">Unlimited</p>
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.directCampaigns > 0 ? (
                                <p className="font-semibold">
                                  {plan.planFeature.directCampaigns}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Pay Per Products</p>
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products === 0 ? (
                                <FiX className="shrink-0 red" size={16} />
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products ===
                                "Unlimited" ? (
                                <p className="font-semibold">Unlimited</p>
                              ) : (
                                ""
                              )}
                              {plan.planFeature &&
                              plan.planFeature.pay_per_products > 0 ? (
                                <p className="font-semibold">
                                  {plan.planFeature.pay_per_products}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Lists</p>
                              {plan.planFeature && plan.planFeature.lists ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Service fee</p>
                              <p className="font-semibold">
                                {plan.planFeature && plan.planFeature.serviceFee
                                  ? plan.planFeature.serviceFee + "%"
                                  : "0%"}
                              </p>
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Gmail</p>
                              {plan.planFeature && plan.planFeature.gmail ? (
                                <FiCheck className="text-[green]" size={16} />
                              ) : (
                                <FiX className="shrink-0 red" size={16} />
                              )}
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Sub account</p>
                              <p className="font-semibold">
                                {plan.planFeature &&
                                plan.planFeature.sub_account > 0 ? (
                                  plan.planFeature.sub_account
                                ) : (
                                  <FiX className="shrink-0 red" size={16} />
                                )}
                              </p>
                            </div>
                            <div className="h-[1px] w-full bg-[#0000001f] my-1" />
                            <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                              <p>Team members</p>
                              <p className="font-semibold">
                                {plan.planFeature &&
                                plan.planFeature.team_member > 0 ? (
                                  plan.planFeature.team_member
                                ) : (
                                  <FiX className="shrink-0 red" size={16} />
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <Subscription
            setShowPlans={(value) => this.setState({ showPlans: value })}
          />
        )}
        {showPlans && !currentLoggedUser.is_shopify && (
          <>
            <div className="mb-12">
              <BillingCycle />
            </div>
            <div className="mb-12">
              <CancelSubscription />
            </div>
          </>
        )}
        {/* <div className="mb-12">
						<PricingFaqs />
					</div> */}

        <Transition appear show={this.state.upgradeModal} as={Fragment}>
          <Dialog onClose={this.handleClose} className="relative z-[9999]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
                  <Dialog.Title className="text-black text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                    <h2 className="text-[24px]">Subscribe to {plan.name}</h2>
                    <div
                      className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                      onClick={this.handleClose}
                    >
                      <FiX size={24} className="text-white stroke-white" />
                    </div>
                  </Dialog.Title>
                  <div className="p-3">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-[15px] font-medium p-[0.75rem] border-t-[1px] border-[#dee2e6] border-b-[2px]">
                            Plan
                          </th>
                          <th className="text-[15px] font-medium p-[0.75rem] border-t-[1px] border-[#dee2e6] border-b-[2px]">
                            Price
                          </th>
                          <th className="text-[15px] font-medium p-[0.75rem] border-t-[1px] border-[#dee2e6] border-b-[2px]">
                            Billing
                          </th>
                          <th className="text-[15px] font-medium p-[0.75rem] border-t-[1px] border-[#dee2e6] border-b-[2px]">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-normal text-[14px] p-[0.75rem]">
                            {plan.name}
                          </td>
                          <td className="font-normal text-[14px] p-[0.75rem]">
                            ${plan.price}
                          </td>
                          <td className="font-normal text-[14px] p-[0.75rem]">
                            {plan.interval === "one_time"
                              ? "One Time"
                              : `Billed ${capitalize(plan.interval)}ly`}
                          </td>
                          <td className="font-normal text-[14px] p-[0.75rem]">
                            ${plan.price}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* {this.props.refreshData.is_trial && (
												<div className="border-b border-[#dee2e6]">
													<div className="grid grid-cols-12 gap-5 mt-12">
														<div className="xl:col-span-4 xl:col-start-5 md:col-span-8 col-span-12">
															<input
																readOnly={
																	this.props.plan &&
																	this.props.plan?.discount > 0
																}
																className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																onChange={(e) =>
																	this.setState({
																		couponCode: e.target.value,
																	})
																}
																name="couponCode"
																value={this.state.couponCode || ""}
																type="text"
																placeholder="Coupon"
															/>
														</div>
														<div className="lg:col-span-4 md:col-start-8 col-span-12 my-auto mt-4 py-0 md:!mt-0">
															<Button
																className="w-full"
																disabled={
																	!this.state.couponCode ||
																	(this.props.plan &&
																		this.props.plan?.discount > 0) ||
																	this.state.couponLoader
																}
																onClick={() => this.couponApply()}
																text={
																	this.state.couponLoader ? (
																		<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
																	) : (
																		"Apply Coupon"
																	)
																}
															/>
														</div>
													</div>
												</div>
											)} */}
                    <div className="">
                      <div className="flex items-center justify-end py-4 border-b border-[#dee2e6]">
                        <p className="text-[15px] font-normal">Subtotal :</p>
                        <b className="px-12">${plan?.price}</b>
                      </div>
                      {/* {this.props.plan && this.props.plan?.discount > 0 && (
													<div className="flex items-center justify-end py-4 border-b border-[#dee2e6]">
														<p className="text-[15px] font-normal">
															Discount :
														</p>
														<b className="px-12">
															${this.props.plan?.discount}
														</b>
													</div>
												)} */}
                      <div className="flex items-center justify-end py-4">
                        <p className="text-[15px] font-normal">Total :</p>
                        <b className="px-12">${plan?.price}</b>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2 border-t border-[#dee2e6]">
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
                        onClick={this.handleClose}
                        text="Cancel"
                      />
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
                        onClick={this.handleSubscriptionPlan}
                        text={
                          loader?.[plan.id] ? (
                            <FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
                          ) : (
                            "Subscribe"
                          )
                        }
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={this.props.isDownGraded} as={Fragment}>
          <Dialog
            onClose={this.props.handleCloseDownGradeModal}
            className="relative z-[9999]"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
                  <Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                    <h2 className="text-[24px]">Success</h2>
                    <div
                      className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                      onClick={this.props.handleCloseDownGradeModal}
                    >
                      <FiX size={24} className="text-white stroke-white" />
                    </div>
                  </Dialog.Title>
                  <div className="p-3">
                    <p className="text-center">
                      {" "}
                      Your subscription was successfully downgraded. it is
                      effective immediately!
                    </p>
                    <div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
                        onClick={this.props.handleCloseDownGradeModal}
                        text="Ok"
                      />
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
                        onClick={this.handleUpGradePlan}
                        text="Yes"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.SettingSubscriptionReducer.isLoading,
    monthlyPlans: state.SettingSubscriptionReducer.monthlyPlans,
    yearlyPlans: state.SettingSubscriptionReducer.yearlyPlans,
    interval: state.SettingSubscriptionReducer.interval,
    billingType: state.SettingSubscriptionReducer.billingType,
    isDownGraded: state.SettingSubscriptionReducer.isDownGraded,
    refreshData: state.HeaderReducer.refreshData,
    currentLoggedUser: state.HeaderReducer.currentLoggedUser,
    planName: state.HeaderReducer.planName,
    isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
    plan: state.RegisterReducer.plan,
    defaultPaymentMethod: state.SettingPaymentReducer.defaultPaymentMethod,
    subscription: state.SettingSubscriptionReducer.subscription,
    subscribed: state.SettingSubscriptionReducer.subscribed,
    loader: state.billing.loader,
    paymentMethods: state.billing.paymentMethods,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@store/redux/BillingRedux");
  const { refreshReports } = require("@store/actions/HeaderActions");
  return {
    upgradePlan: (id) => dispatch(settingSubscriptionActions.upgradePlan(id)),
    downgradePlan: (id) =>
      dispatch(settingSubscriptionActions.downgradePlan(id)),
    billingTypeHandle: (event) =>
      dispatch({ type: HANDLE_BILLING_TYPE, payload: event }),
    handleCloseDownGradeModal: (event) =>
      dispatch({ type: HANDLE_DOWN_GRADE_MODAL_HIDE }),
    cancelSubscription: () =>
      dispatch(settingSubscriptionActions.cancelSubscription()),
    applyCoupon: (query) => dispatch(registerAction.applyCoupon(query)),
    fetchPlanSummary: (id) => dispatch(registerAction.fetchPlanSummary(id)),
    subscribe: (data) => actions.subscribe(dispatch, data),
    fetchBrandSubscriptionPlans: () =>
      dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans()),
    refreshReports: () => dispatch(refreshReports()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingSubscriptionPackages);
