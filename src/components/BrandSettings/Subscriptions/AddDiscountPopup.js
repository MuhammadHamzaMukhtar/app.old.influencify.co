import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RiShoppingBasketFill } from "react-icons/ri";
import { BsFillBagDashFill } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { toast } from "react-toastify";
const { actions } = require("@store/redux/BillingRedux");

const AddDiscountPopup = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [code, setCode] = useState("");

  const isDiscountLoading = useSelector(
    (state) => state.billing.discountLoading
  );
  const subscription = useSelector(
    (state) => state.SettingSubscriptionReducer.subscription
  );

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  const handleClosePopup = () => {
    setIsOpen(false);
    setIsError(false);
    setCode("");
  };

  const handleAddDiscount = async () => {
    let query = {
      subscriptionId: subscription.stripe_id,
      coupon: code,
    };
    const json = await actions.updateSubscription(dispatch, query);
    if (json.status === 200) {
      handleClosePopup();
      toast.success("Discount applied successfully!");
      dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
      actions.fetchNextPayment(dispatch);
    } else {
      setIsError(true);
    }
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
              <Dialog.Panel className="mx-auto overflow-auto w-[440px] rounded-[8px] bg-white">
                <Dialog.Title className="text-white sticky top-0 z-10 flex justify-between items-center bg-black py-3 px-5">
                  <h2 className="text-[16px] flex gap-x-3 items-center">
                    <RiShoppingBasketFill size={20} /> Add a discount to your
                    subscription
                  </h2>
                  <div
                    className="px-[12px] rounded-full mt-[2px] mr-[13px] h-[40px] w-[40px] shadow-[0px_10px_30px_#96969640] flex items-center cursor-pointer"
                    onClick={handleClosePopup}
                  >
                    <FiX size={24} color="white" />
                  </div>
                </Dialog.Title>
                <div className="py-10 px-5 space-y-2">
                  <p className="text-gray-400 text-md">Discount code</p>
                  <div className="flex">
                    <div className="h-[40px] w-12 border border-[#ced4da] border-r-0 rounded-lg rounded-r-none flex items-center justify-center">
                      <BsFillBagDashFill size={20} color="grey" />
                    </div>
                    <input
                      placeholder="X20OFF"
                      className="rounded-[8px] rounded-l-none border-l-0 h-[40px] inline-flex w-full items-center px-3 border border-[#ced4da] focus-visible:outline-0 focus:border-[#ced4da]"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  {isError && (
                    <p className="p-3 border border-red-500 bg-red-200 rounded-lg">
                      Your discount code is invalid. Please review the coupon
                      code. Maybe it is expired.
                    </p>
                  )}
                </div>
                <div className="bg-slate-100 p-[20px] flex justify-center">
                  <Button
                    className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex gap-x-2 items-center bg-black text-white hover:opacity-80 disabled:opacity-70"
                    onClick={handleAddDiscount}
                    disabled={code.length < 2 || isDiscountLoading}
                    prefix={
                      !isDiscountLoading && (
                        <BiPlusMedical size={15} color="white" />
                      )
                    }
                    text="Add this discount code"
                    suffix={
                      isDiscountLoading && (
                        <FaSpinner className="animate-[spin_2s_linear_infinite] white" />
                      )
                    }
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
});

export default AddDiscountPopup;
