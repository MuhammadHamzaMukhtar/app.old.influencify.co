import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { MdDisabledVisible } from "react-icons/md";
import Button from "@components/global/Button";
import Step1 from "./Step1";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM,
  HANDLE_RESET_CANCEL_SUBSCRIPTION_FORM,
} from "@store/constants/action-types";
import Step2 from "./Step2";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { actions } = require("@store/redux/BillingRedux");

const CancelSubscription = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const canncelLoading = useSelector((state) => state.billing.canncelLoading);
  const cancelSubscription = useSelector(
    (state) => state.SettingSubscriptionReducer.cancelSubscription
  );
  const subscription = useSelector(
    (state) => state.SettingSubscriptionReducer.subscription
  );
  const payment = useSelector((state) => state.billing.payment);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  let isButtonDisabled = false;
  if (cancelSubscription.step === 1) {
    isButtonDisabled = !cancelSubscription.cancelReason;
  } else if (cancelSubscription.step === 2) {
    isButtonDisabled = !cancelSubscription.cancelClicked;
  }

  const handelCancelSubscription = async () => {
    const query = {
      reason: cancelSubscription.cancelReason,
      description: cancelSubscription.cancelDescription,
      subscriptionId: subscription.id,
      type: "billing",
    };
    await actions.cancelSubscription(dispatch, query);
    dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
  };

  const handleNextStep = async () => {
    const form = { ...cancelSubscription };
    if (form.step === 1) {
      if ((payment?.discounts || []).length > 0) {
        await handelCancelSubscription();
        handleClosePopup();
        Swal.fire({
          title: "<h1>Subscription cancelled.</h1>",
          html: "<p>You won't be billed again.</p>",
          icon: "success",
          confirmButtonText: "Go to account",
          confirmButtonColor: "#000",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/billing");
          }
        });
      } else {
        form["step"] = 2;
        dispatch({ type: HANDLE_ADD_CANCEL_SUBSCRIPTION_FORM, payload: form });
      }
    } else if (form.step === 2) {
      await handelCancelSubscription();
      handleClosePopup();
      Swal.fire({
        title: "<h1>Subscription cancelled.</h1>",
        html: "<p>You won't be billed again.</p>",
        icon: "success",
        confirmButtonText: "Go to account",
        confirmButtonColor: "#000",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/billing");
        }
      });
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    dispatch({ type: HANDLE_RESET_CANCEL_SUBSCRIPTION_FORM });
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => {
            return false;
          }}
          className="relative z-[100]"
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
              <Dialog.Panel className="mx-auto overflow-auto w-[700px] rounded-[8px] bg-white">
                <Dialog.Title className="text-white sticky top-0 z-10">
                  <div className="flex justify-between items-center bg-black py-3 px-5">
                    <h2 className="text-[16px] flex gap-x-3 items-center">
                      <MdDisabledVisible size={20} /> Cancel your subscription
                      and close your account
                    </h2>
                    <div
                      className="px-[12px] rounded-full mt-[2px] mr-[13px] h-[40px] w-[40px] shadow-[0px_10px_30px_#96969640] flex items-center cursor-pointer"
                      onClick={handleClosePopup}
                    >
                      <FiX size={24} color="white" />
                    </div>
                  </div>
                  <div className="flex gap-x-4 items-center bg-gray-800 py-3 px-5 text-[12px]">
                    <h2>Process:</h2>
                    <div className="border border-gray-700 bg-gray-700 p-2 rounded-full">
                      <MdDisabledVisible color="gray" />
                    </div>
                    <span className="text-gray-400">
                      Cancel your subscription
                    </span>
                  </div>
                </Dialog.Title>
                {cancelSubscription.step === 1 ? (
                  <Step1 />
                ) : (
                  cancelSubscription.step === 2 && (
                    <Step2 handleClosePopup={handleClosePopup} />
                  )
                )}
                <div className="bg-slate-100 p-[20px] flex justify-between">
                  <Button
                    className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center border border-gray-500 bg-slate-100 hover:opacity-80"
                    onClick={handleClosePopup}
                    prefix={<FiX size={15} />}
                    text="Do not cancel my account"
                  />
                  {cancelSubscription.step === 1 ? (
                    <Button
                      className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center border border-gray-500 bg-gray-700 hover:opacity-80 text-white disabled:opacity-80 disabled:cursor-not-allowed"
                      onClick={handleNextStep}
                      disabled={isButtonDisabled}
                      prefix={!canncelLoading && <FaArrowRight size={15} />}
                      text="Continue the process of canceling"
                      suffix={
                        canncelLoading && (
                          <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                        )
                      }
                    />
                  ) : (
                    cancelSubscription.step === 2 && (
                      <Button
                        className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center border border-gray-500 bg-gray-700 hover:opacity-80 text-white disabled:opacity-80 disabled:cursor-not-allowed"
                        onClick={handleNextStep}
                        disabled={isButtonDisabled || canncelLoading}
                        prefix={!canncelLoading && <FaArrowRight size={15} />}
                        text="I don't want the discount, cancel my subscription"
                        suffix={
                          canncelLoading && (
                            <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                          )
                        }
                      />
                    )
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
});

export default CancelSubscription;
