import { Component } from "react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandBillingTopTab from "@components/SettingBrandBillingTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import SettingSubscriptionPackages from "@components/BrandSettings/SettingSubscriptionPackages";
import AppsumoFeatures from "@components/Features";
import { connect } from "react-redux";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import * as settingPaymentActionCreator from "@store/actions/SettingPaymentActions";
import {} from "@store/constants/action-types";
import Swal from "sweetalert2";
import Loader from "@components/global/Loader";
import Button from "@components/global/Button";

class SettingBrandSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartFreeTrial: false,
      planId: "",
    };
  }

  componentDidMount() {
    //this.props.handleFetchCreditCards();
    this.props.fetchBrandSubscriptionPlans();
    this.props.fetchNextPayment();
  }

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

  startFreeTrial = () => {
    this.setState({
      isStartFreeTrial: true,
    });
  };

  handleBack = () => {
    this.setState({
      isStartFreeTrial: false,
    });
  };

  handleChangePlan = (e) => {
    this.setState({
      planId: e.target.value,
    });
  };

  addOnPlanSubscribe = (id) => {
    const data = { id: id };
    this.props.addOnPlan(data);
  };

  addOnPlanUnsubscribe = (id) => {
    const data = { id: id };
    this.props.addOnPlanUnSubscribe(data);
  };

  render() {
    if (localStorage.getItem("role") !== "brand") {
      window.location.href = "/";
    }
    if (this.props.isLoading) {
      return (
        <Loader
          className="h-[87vh] w-full flex justify-center items-center"
          size="67"
        />
      );
    }
    // const { isStartFreeTrial } = this.state;

    return (
      <>
        <SettingHeader />
        <SettingBrandBillingTopTab />
        <div className="containers mb-12">
          <div className="grid grid-cols-12 gap-5">
            <div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
              <SettingBrandSidebar name={this.props.refreshData.identifier} />
            </div>

            <div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
              {this.props.refreshData.is_main && (
                <>
                  <div>
                    {this.props.refreshData &&
                      this.props.refreshData.is_appsumo && (
                        <div className="bg-white rounded p-3 mb-12 lg:w-5/12 mx-auto">
                          <div className="md:flex items-center justify-center">
                            <div className="flex">
                              <h6 className="mt-1 text-[16px]">
                                Current Plan:
                                <span className="success text-[16px] ml-2 font-medium">
                                  {this.props.refreshData &&
                                  this.props.refreshData.is_appsumo === false
                                    ? this.props.planName
                                    : this.props.planName +
                                      " (" +
                                      this.props.refreshData
                                        .formated_identifier +
                                      ")"}
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}

                    <div className="grid grid-cols-12 gap-5 mb-12">
                      {this.props.refreshData &&
                        this.props.refreshData.is_appsumo && (
                          <div className="sm:col-span-6 col-span-12">
                            <AppsumoFeatures
                              refreshData={this.props.refreshData}
                            />
                          </div>
                        )}
                      {this.props.addOnPlans &&
                        this.props.addOnPlans.map((plan, index) => (
                          <div
                            key={index}
                            className="lg:col-span-4 sm:col-span-6 col-span-12"
                          >
                            <div
                              className="flex items-stretch h-full"
                              index={index}
                            >
                              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 w-30">
                                <div className="flex items-center justify-between p-[1rem]">
                                  <p>{plan.name}</p>
                                  <h4 className=" font-medium text-[18px]">
                                    ${plan.price} /{" "}
                                    <small>{plan.interval}</small>
                                  </h4>
                                </div>
                                <div className="h-[1px] w-full bg-[#0000001f]" />
                                <div className="p-3">
                                  {plan.addOns.length > 0 ? (
                                    <Button
                                      onClick={() =>
                                        this.addOnPlanUnsubscribe(plan.id)
                                      }
                                      className="w-full px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                                      style={{
                                        backgroundColor: "#F55353",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      text="Cancel Add-On Subscription"
                                    />
                                  ) : (
                                    <div>
                                      <Button
                                        onClick={() =>
                                          this.addOnPlanSubscribe(plan.id)
                                        }
                                        className="w-full mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                                        text="Subscribe Add-On"
                                      />
                                    </div>
                                  )}
                                </div>
                                {plan.planFeature ? (
                                  <div className="flex flex-col">
                                    <div className="h-[1px] w-full bg-[#0000001f] mb-2" />
                                    <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                                      <p>Credits</p>
                                      <b>{plan.planFeature.credits}</b>
                                    </div>
                                    <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                                      <p>Sub Accounts</p>
                                      <b>{plan.planFeature.sub_account}</b>
                                    </div>
                                    <div className="flex justify-between p-[0.75rem_1.25rem] relative">
                                      <p>Team members</p>
                                      <b>{plan.planFeature.team_member}</b>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                      {this.props.refreshData &&
                        !this.props.refreshData.is_appsumo && (
                          <div className="col-span-12">
                            <SettingSubscriptionPackages />
                          </div>
                        )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    planName: state.HeaderReducer.planName,
    isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
    isPaid: state.HeaderReducer.isPaid,
    currentLoggedUser: state.HeaderReducer.currentLoggedUser,
    monthlyPlans: state.SettingSubscriptionReducer.monthlyPlans,
    yearlyPlans: state.SettingSubscriptionReducer.yearlyPlans,
    addOnPlans: state.SettingSubscriptionReducer.addOnPlans,

    isFree: state.SettingSubscriptionReducer.isFree,
    isPromotional: state.SettingSubscriptionReducer.isPromotional,
    isLoading: state.SettingSubscriptionReducer.isLoading,
    refreshData: state.HeaderReducer.refreshData,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@store/redux/BillingRedux");
  return {
    fetchBrandSubscriptionPlans: () =>
      dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans()),
    addOnPlan: (data) => dispatch(settingSubscriptionActions.addOnPlan(data)),
    addOnPlanUnSubscribe: (data) =>
      dispatch(settingSubscriptionActions.addOnPlanUnSubscribe(data)),
    cancelSubscription: () =>
      dispatch(settingSubscriptionActions.cancelSubscription()),
    handleFetchCreditCards: () =>
      dispatch(settingPaymentActionCreator.handleFetchCreditCards()),
    fetchNextPayment: () => actions.fetchNextPayment(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingBrandSubscription);
