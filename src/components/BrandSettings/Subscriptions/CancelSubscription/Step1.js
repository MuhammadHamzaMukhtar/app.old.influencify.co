import { HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM } from "@store/constants/action-types";
import React from "react";
import { PiSmileySadBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Step1 = () => {
  const dispatch = useDispatch();
  const cancelSubscription = useSelector(
    (state) => state.SettingSubscriptionReducer.cancelSubscription
  );

  const handleAddForm = (key, value) => {
    const form = { ...cancelSubscription };
    form[key] = value;
    dispatch({ type: HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM, payload: form });
  };

  const reasons = [
    "Too expensive",
    "Switching to another product",
    "Shutting down the company",
    "Technical issues",
    "Not sure how to use the data & tools",
    "Missing features I need",
    "Other",
  ];

  return (
    <div className="pb-3 px-5 pt-10 space-y-5">
      <div className="flex gap-x-5 justify-center items-center">
        <PiSmileySadBold size={30} />
        <h1 className="text-3xl font-medium">We are sad you go!</h1>
      </div>
      <p className="flex justify-center text-gray-400">
        Before you cancel, please let us know the reason you're leaving. Every
        bit of feedback helps!
      </p>
      <div className="space-y-3">
        <h2 className="text-lg font-medium">1. Cancel reason:</h2>
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li className="flex gap-x-4" key={index}>
              <input
                type="radio"
                name="cancelReason"
                className="accent-black"
                checked={cancelSubscription.cancelReason === reason}
                onClick={(e) => handleAddForm(e.target.name, reason)}
              />
              {reason}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-medium">
          2. Explain us why you want to cancel:
        </h2>
        <textarea
          className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-black"
          name="cancelDescription"
          onChange={(e) => handleAddForm(e.target.name, e.target.value)}
          value={cancelSubscription.cancelDescription}
          rows="5"
        ></textarea>
      </div>
    </div>
  );
};

export default Step1;
