import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import Button from "@components/global/Button";
import { HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM } from "@store/constants/action-types";
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { PiSmileySadBold } from "react-icons/pi";
import { RiShoppingBasketFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const { actions } = require("@store/redux/BillingRedux");

const Step2 = ({ handleClosePopup }) => {
  const dispatch = useDispatch();
  const cancelSubscription = useSelector(
    (state) => state.SettingSubscriptionReducer.cancelSubscription
  );
  const subscription = useSelector(
    (state) => state.SettingSubscriptionReducer.subscription
  );

  const handleAddForm = (key, value) => {
    const form = { ...cancelSubscription };
    form[key] = value;
    dispatch({ type: HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM, payload: form });
  };

  const handleConfirmDiscount = () => {
    handleClosePopup();
    Swal.fire({
      title: "Are you sure?",
      html: "<h2>-20% DISCOUNT FOR 3 MONTHS</h2><p>On your current subscription</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#ced4dc",
      confirmButtonText: "Yes, apply discount!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let query = {
          subscriptionId: subscription.stripe_id,
        };
        const json = await actions.updateSubscription(dispatch, query);
        if (json.status === 200) {
          Swal.fire({
            title: "<h1>Discounted!</h1>",
            html: "<p>Your discount has been applied for your next billings for 3 months.</p>",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#000",
          });
          dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
          actions.fetchNextPayment(dispatch);
        } else {
          Swal.fire({
            title: "<h1>OOPS! Something went wrong</h1>",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="pb-16 px-5 pt-10 space-y-5">
      <div className="flex gap-x-5 justify-center items-center">
        <BsEmojiSmile size={30} />
        <h1 className="text-3xl font-medium">We have a discount for you!</h1>
      </div>
      <p className="flex justify-center text-gray-400">
        Your account is still not canceled, we would like to offer you a
        discount to stay with us.
      </p>
      <div className="space-y-3 pt-8">
        <h2 className="text-lg font-medium flex gap-x-3 items-center">
          <RiShoppingBasketFill size={20} /> Discount offered:
        </h2>
        <div className="border rounded-lg p-5 flex justify-start gap-x-5 items-center">
          <div className="border bg-black rounded-full h-16 w-20 flex items-center justify-center">
            <FaCartArrowDown size={20} color="white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-medium uppercase">
              -20% for 3 months
            </h2>
            <p className="text-gray-400 uppercase">
              on your current subscription
            </p>
            <Button
              className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center bg-black text-white hover:opacity-80"
              onClick={handleConfirmDiscount}
              prefix={<BsEmojiSmile size={15} />}
              text="Yes! use this discount and do not cancel"
            />
            <Button
              className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center border border-gray-500 bg-gray-700 hover:opacity-80 text-white disabled:opacity-80 disabled:border-2 disabled:border-black"
              onClick={() => handleAddForm("cancelClicked", true)}
              disabled={cancelSubscription.cancelClicked}
              prefix={<PiSmileySadBold size={15} />}
              text="No, I want to cancel my subscription"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
