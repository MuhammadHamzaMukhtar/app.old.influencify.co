import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import Button from "@components/global/Button";
import React, { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { FaBasketShopping, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CancelSubscription from "./CancelSubscription";
import moment from "moment";
import AddDiscountPopup from "./AddDiscountPopup";
import { useDispatch } from "react-redux";
const { actions } = require("@store/redux/BillingRedux");

const Subscription = ({ setShowPlans }) => {
  const dispatch = useDispatch();
  const cancelSubRef = useRef(null);
  const addDiscountRef = useRef(null);

  const onGracePeriod = useSelector(
    (state) => state.SettingSubscriptionReducer.onGracePeriod
  );
  const subscription = useSelector(
    (state) => state.SettingSubscriptionReducer.subscription
  );
  const monthlyPlans = useSelector(
    (state) => state.SettingSubscriptionReducer.monthlyPlans
  );
  const selectedPlan = monthlyPlans.find(
    (plan) => plan.stripe_id === subscription?.stripe_plan
  );
  const payment = useSelector((state) => state.billing.payment);
  const canncelLoading = useSelector((state) => state.billing.canncelLoading);

  const resumeSubscription = async () => {
    await actions.resumeSubscription(dispatch);
    dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
    actions.fetchNextPayment(dispatch);
  };

  return (
    <>
      <div className="bg-white w-full p-8 rounded-lg text-gray-700 space-y-6">
        <div className="border rounded-lg">
          <div className="flex justify-between p-7">
            <div className="flex gap-x-4 items-center">
              <h1 className="text-2xl">
                {subscription?.stripe_status === "trialing" ||
                subscription?.stripe_status === "active"
                  ? "Active"
                  : "Inactive"}{" "}
                Subscriptions
              </h1>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400 font-medium">(1)</span>
            </div>
            <Button
              className="px-5 rounded-[8px] h-[44px] text-[14px] text-gray-700 inline-flex gap-x-5 items-center border border-gray-500 bg-slate-100 hover:opacity-80"
              onClick={() => setShowPlans(true)}
              prefix={<FaArrowRight size={20} />}
              text={
                subscription?.stripe_status === "trialing" ||
                subscription?.stripe_status === "active"
                  ? "Upgrade / downgrade account"
                  : "Upgrade account"
              }
            />
          </div>
          <div className="grid grid-cols-12 bg-slate-200 font-medium text-gray-500 border py-4 px-7">
            <div className="col-span-3">Package</div>
            {(subscription?.stripe_status === "trialing" ||
              subscription?.stripe_status === "active") && (
              <div className="col-span-4">Renew date</div>
            )}
            <div className="col-span-3">Price</div>
            <div className="col-span-2">Credits</div>
          </div>
          <div className="grid grid-cols-12 py-5 px-6 items-center border-l-4 border-l-black">
            <div className="col-span-3">
              {selectedPlan?.name}{" "}
              <span className="text-xs">
                {subscription?.stripe_status === "trialing" && "(Trial)"}
              </span>
            </div>
            {(subscription?.stripe_status === "trialing" ||
              subscription?.stripe_status === "active") && (
              <div className="col-span-4">
                {payment.period_end ? (
                  <div>
                    Renews on{" "}
                    {moment
                      .unix(payment.period_end)
                      .format("YYYY/MM/DD hh:mm:ss")}
                    <p className="text-sm flex gap-x-2 items-center">
                      <AiFillCheckCircle /> is active
                    </p>
                  </div>
                ) : (
                  <span>-</span>
                )}
              </div>
            )}
            <div className="col-span-3">
              <p>
                ${selectedPlan?.price} (USD) / {selectedPlan?.interval}
              </p>
              {(payment?.discounts || []).length > 0 ? (
                <p className="bg-black text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded inline-flex items-center justify-center">
                  -20%
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-span-2">
              <p className="bg-gray-600 text-white text-xs font-semibold mr-2 px-5 py-2 rounded inline-flex items-center justify-center">
                {selectedPlan?.planFeature.credits}
              </p>
            </div>
          </div>
        </div>
        {(subscription?.stripe_status === "trialing" ||
          subscription?.stripe_status === "active") && (
          <>
            {onGracePeriod && subscription?.stripe_status === "active" ? (
              <div className="flex gap-x-4 items-center">
                <FaRegTrashCan size={17} />
                <span
                  onClick={resumeSubscription}
                  aria-disabled={canncelLoading}
                  className="cursor-pointer underline font-medium"
                >
                  Resume subscription
                </span>
                {canncelLoading && (
                  <FaSpinner className="animate-[spin_2s_linear_infinite] black" />
                )}
              </div>
            ) : (
              <div className="flex gap-x-4 items-center">
                <FaRegTrashCan size={17} />
                <span
                  onClick={() => cancelSubRef.current.open()}
                  className="cursor-pointer underline font-medium"
                >
                  Cancel subscription
                </span>
              </div>
            )}
            {Object.keys(payment || {}).length > 0 &&
              (payment?.discounts || []).length <= 0 && (
                <div className="flex gap-x-4 items-center">
                  <FaBasketShopping size={18} />
                  <span
                    onClick={() => addDiscountRef.current.open()}
                    className="cursor-pointer underline font-medium"
                  >
                    Update / add a discount code to my subscription
                  </span>
                </div>
              )}
            <div className="space-y-5 font-medium">
              <p className="text-2xl">Can I cancel at any time?</p>
              <p className="text-gray-500">
                Yes you can cancel at any time on this page at the top of the
                page. Once a subscription is created you will be able to cancel
                it at any time.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Cancel Subscription Popup */}
      <CancelSubscription ref={cancelSubRef} />

      {/* Cancel Subscription Popup */}
      <AddDiscountPopup ref={addDiscountRef} />
    </>
  );
};

export default Subscription;
