import { Dialog, Transition } from "@headlessui/react";
import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { actions } from "@store/redux/InfluencerSearchRedux";
import { FaSpinner } from "react-icons/fa";
import InfluencerMetaDeta from "./InfluencerMetaDeta";
import InfluencerTabs from "./InfluencerTabs";

const Influencer = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const loader = useSelector(
    (state) => state.influencerSearch?.influencerLoader
  );
  const brandlist = useSelector((state) => state.brandList.current_list);

  const fetchInfluencer = (id) => {
    let params = {
      id: id,
      platform: brandlist.list_channel,
      listId: brandlist.id,
    };
    actions.fetchInfluencer(dispatch, params);
  };

  useImperativeHandle(ref, () => ({
    open(id) {
      setIsOpen(true);
      fetchInfluencer(id);
    },
    close() {
      setIsOpen(false);
    },
  }));

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-[100]">
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
              <Dialog.Panel className="mx-auto h-[93vh] overflow-auto w-[80%] rounded-[8px] bg-white">
                <Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3 sticky top-0 bg-white z-10">
                  <h2 className="text-[24px] font-medium text-black">
                    Influencer Insights
                  </h2>
                  <div
                    className="px-[12px] rounded-full mt-[2px] mr-[13px] h-[40px] w-[40px] shadow-[0px_10px_30px_#96969640] flex items-center cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiX size={24} className="text-black stroke-black" />
                  </div>
                </Dialog.Title>
                {loader ? (
                  <div className="flex items-center h-[70vh] overflow-hidden">
                    <FaSpinner
                      size={66}
                      className="animate-[spin_2s_linear_infinite] pink mx-auto"
                    />
                  </div>
                ) : (
                  <div className="p-3 flex gap-x-6 px-8">
                    <InfluencerMetaDeta />
                    <InfluencerTabs />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
});

export default Influencer;
