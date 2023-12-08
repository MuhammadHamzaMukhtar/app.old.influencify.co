import { Fragment, forwardRef, useImperativeHandle } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Step1 from "./CreationSteps/Step1";
import PopupHeader from "./PopupHeader";
import PopupFooter from "./PopupFooter";
import { types } from "@store/redux/BrandReportsRedux";
import Step2 from "./CreationSteps/Step2";
import Step3 from "./CreationSteps/Step3";
import Step3a from "./CreationSteps/Step3a";
import Step3b from "./CreationSteps/Step3b";
import ImportInfluencers from "./CreationSteps/ImportInfluencers";
import Step4 from "./CreationSteps/Step4";
import Step5 from "./CreationSteps/Step5";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Button from "@components/global/Button";

const CreateReportPopup = forwardRef((props, ref) => {
  const form = useSelector((state) => state.BrandReports.creationForm);
  const isOpen = useSelector((state) => state.BrandReports.isOpenCreationPopup);

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    open() {
      dispatch({ type: types.HANDLE_OPEN_CREATION_POPUP });
    },
    close() {
      handleClosePopup();
    },
  }));

  const handleClosePopup = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "px-7 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-5",
        cancelButton:
          "px-5 rounded-[8px] h-[36px] text-[14px] inline-flex items-center border border-gray-500 bg-slate-100 hover:opacity-80",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Your changes will be reverted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: types.HANDLE_CANCEL_STEPS });
        }
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => {
          return false;
        }}
        className="relative z-[999]"
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
              <Dialog.Title
                className={`flex ${
                  form.step !== 1 &&
                  !form.isImportLoading &&
                  !form.importInfluencers
                    ? "justify-between"
                    : "justify-end"
                } p-3 bg-white z-10 rounded-[8px]`}
              >
                {form.step !== 1 &&
                  !form.isImportLoading &&
                  !form.importInfluencers && (
                    <Button
                      className="text-[22px] black bg-[#7c3292] w-[30px] h-[30px] flex items-center justify-center rounded-full text-white ml-5"
                      onClick={() =>
                        dispatch({ type: types.HANDLE_BACK_TO_PREVIOUS_STEP })
                      }
                      prefix={
                        <FiChevronLeft size={20} className="text-white" />
                      }
                    />
                  )}
                <div
                  className="px-[12px] mt-[2px] cursor-pointer"
                  onClick={handleClosePopup}
                >
                  <FiX size={20} className="text-gray-500" />
                </div>
              </Dialog.Title>
              <div className="px-10 pb-10 space-y-4 overflow-y-auto max-h-[92vh]">
                {!form.importInfluencers && <PopupHeader />}
                {form.step === 1 && <Step1 />}
                {form.step === 2 && <Step2 />}
                {form.step === 3 &&
                  (form.listImported ? (
                    <Step3a />
                  ) : form.fileImporting && !form.importInfluencers ? (
                    <Step3b />
                  ) : form.importInfluencers ? (
                    <ImportInfluencers />
                  ) : (
                    <Step3 />
                  ))}
                {form.step === 4 && <Step4 />}
                {form.step === 5 && <Step5 />}
                <PopupFooter />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
});

export default CreateReportPopup;
