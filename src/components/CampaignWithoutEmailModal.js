import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Emitter from "../constants/Emitter";

const CampaignWithoutEmailModal = forwardRef(({ onClose }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("influencerCampaign");
  const [isActive, setIsActive] = useState(true);
  const selected_influencers = useSelector((state) => state.campaign.selected_influencers);
  const platform = useSelector((state) => state.influencerSearch.platform);
  const refreshData = useSelector((state) => state.HeaderReducer.refreshData);

  useImperativeHandle(ref, () => ({
    open(type) {
      setIsOpen(true);
      setType(type);
    },
    close() {
      setIsOpen(false);
    }

  }));

  const {
    actions: campaignactions,
  } = require("@store/redux/CampaignRedux");

  const close = () => {
    setIsOpen(false);
    onClose();
  }

  const campaignWithSelected = () => {
    let query = {
      platform: platform,
      selected_influencers: selected_influencers,
      campaign_type: type,
    };
    if (refreshData.is_admin) {
      dispatch(campaignactions.createCampaignSelected(
        dispatch,
        '',
        query,
        navigate
      ))
    } else {
      Emitter.emit("PERMISSION_POPUP");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={close} className="relative z-[9999]">
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
            <Dialog.Panel className={`mx-auto overflow-hidden w-[56rem] h-[60%] rounded-[8px] bg-white`}>
              <div className="text-black text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                <h3 className="text-[21px] uppercase font-medium">adding creators to campaign</h3>
                <div
                  className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                  onClick={close}
                >
                  <FiX size={24} className="text-white stroke-white" />
                </div>
              </div>
              <div className="p-3 flex justify-between flex-col h-[88%]">
                <div className="my-4 space-y-3">
                  <h1 className="font-medium text-lg">Do you want to add the following creators to the campaign?</h1>
                  <p className="text-gray-600 pb-3">Click checkbox to add a group of creators.</p>
                  <div className="border-[1px] border-[#7c3292] flex flex-col relative rounded-[8px] p-2">
                    <div className="flex justify-between cursor-pointer items-center md:divide-y-0 divide-y divide-[#0000001f]"
                      onClick={() => setIsActive(!isActive)}
                    >
                      <div className="flex items-center ">
                        <label
                          htmlFor="yes"
                          className="cursor-pointer flex items-center text-[15px] font-normal"
                        >
                          <input
                            id="yes"
                            type="checkbox"
                            name="is_mandatory"
                            // checked={task.is_mandatory}
                            // onChange={(e) => onChangeHandler(index, 'is_mandatory', e.target.checked)}
                            // disabled={
                            //   form.campaign_status === "active" ? true : false
                            // }
                            className="hidden peer"
                          />
                          <span className="mr-3 peer-checked:bg-[#7c3292] rounded-sm bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
                          <p className="text-gray-600">Add creators without emails</p>
                        </label>
                      </div>
                      {isActive ?
                        <BsChevronDown
                          className="mt-2 sm:!mt-0"
                          size={20}
                        /> :
                        <BsChevronUp
                          className="mt-2 sm:!mt-0"
                          size={20}
                        />
                      }
                    </div>
                    {isActive &&
                      <div className="relative top-0 overflow-hidden">
                        <div className="transition-[height] overflow-auto ease-in-out duration-[0.35s]">
                          <div className="py-[20px] px-[20px] space-y-3">
                            <div className="flex flex-wrap gap-4">
                              {(selected_influencers || []).slice(0, 10).map((influencer) => (
                                <div key={influencer.user_profile.user_id} className="bg-[#cdc8c85c] rounded-md px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
                                  <p className="text-[12px]">
                                    {influencer.user_profile.fullname || influencer.user_profile.username}
                                  </p>
                                </div>
                              ))}
                              {selected_influencers.length > 10 &&
                                <div className="bg-[#cdc8c85c] rounded-md px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
                                  <p className="text-[12px]">
                                    +{selected_influencers.slice(10).length}
                                  </p>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="text-right flex justify-between multi-buttons border-0 border-t py-3 border-[#e5e7eb]">
                  <Button
                    className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
                    onClick={close}
                    text="Cancel"
                  />
                  <Button
                    className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
                    onClick={() => campaignWithSelected()}
                    text="Sequence"
                  />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
})

export default CampaignWithoutEmailModal;
