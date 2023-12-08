import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import BrandInfluencerDeepScan from "@container/brands/BrandInfluencerDeepScan";

const InfluencerFullProfileModal = forwardRef(({ onClose }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    open(data) {
      setData(data);
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  const close = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1021]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#00000033] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen xl:max-w-[90%] lg:max-w-[90%]">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 mr-[25px]  z-10">
                        <button
                          type="button"
                          className="!outline-0 !border-0 flex mt-4 bg-[#00000080] w-[55px] h-[55px] rounded-full items-center justify-center"
                          onClick={close}
                        >
                          <FiX className="fill-white text-white text-[30px]" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-gray-100 py-6 shadow-xl">
                      <BrandInfluencerDeepScan
                        platform={data?.platform}
                        id={data?.influencer_iq_id}
                        influencerId={data?.influencer_id}
                        dispatch={dispatch}
                        onClose={close}
                        onShow={true}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
});

// const mapStateToProps = ({ HeaderReducer, influencerSearch }) => {
// 	return {
// 		refreshData: HeaderReducer.refreshData,
// 		current_influencer: influencerSearch.current_influencer,
// 		influencer_id: influencerSearch.influencer_id,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(InfluencerProfileModal);
export default InfluencerFullProfileModal;
