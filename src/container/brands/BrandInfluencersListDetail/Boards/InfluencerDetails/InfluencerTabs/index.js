import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import { actions } from "@store/redux/InfluencerSearchRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import InfluencerAnalyticsTab from "./AnalyticsTab";
import InfluencerShippingTab from "./ShippingTab";
import InfluencerNotesTab from "./NotesTab";
import InfluencerLogsTab from "./LogsTab";

const InfluencerTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const data = useSelector((state) => state.influencerSearch?.influencer);
  const dispatch = useDispatch();

  const handleChangeTab = (event) => {
    setActiveTab(event);
    switch (event) {
      case 1:
        actions.fetchInfluencerShipping(dispatch, data.id);
        break;
      case 2:
        actions.fetchInfluencerNotes(dispatch, data.iq_user_id);
        break;
      case 3:
        actions.fetchInfluencerEmailLogs(dispatch, data.id);
        break;
      default:
        break;
    }
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="w-[73%] h-[700px]">
      <Tab.Group
        defaultIndex={activeTab}
        selectedIndex={activeTab}
        onChange={(index) => {
          handleChangeTab(index);
        }}
      >
        <div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] rounded-xl min-h-[50px] mb-[42px] flex justify-between">
          <div>
            <div className="containers min-w-full">
              <Tab.List className="flex gap-x-7 mb-0">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-6 rounded-full h-[35px] text-[15px] inline-flex items-center border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4 z-0",
                      selected
                        ? "bg--purple text-white"
                        : "bg-white text-[#7c3292]"
                    )
                  }
                >
                  Analytics
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-6 rounded-full h-[35px] text-[15px] inline-flex items-center border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4 z-0",
                      selected
                        ? "bg--purple text-white"
                        : "bg-white text-[#7c3292]"
                    )
                  }
                >
                  Shipping
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-6 rounded-full h-[35px] text-[15px] inline-flex items-center border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4 z-0",
                      selected
                        ? "bg--purple text-white"
                        : "bg-white text-[#7c3292]"
                    )
                  }
                >
                  Notes
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-6 rounded-full h-[35px] text-[15px] inline-flex items-center border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4 z-0",
                      selected
                        ? "bg--purple text-white"
                        : "bg-white text-[#7c3292]"
                    )
                  }
                >
                  Logs
                </Tab>
              </Tab.List>
            </div>
          </div>
        </div>
        <div className="containers min-w-full mb-12">
          <Tab.Panels className="bg-transparent">
            <Tab.Panel>
              <InfluencerAnalyticsTab />
            </Tab.Panel>
            <Tab.Panel>
              <InfluencerShippingTab />
            </Tab.Panel>
            <Tab.Panel>
              <InfluencerNotesTab />
            </Tab.Panel>
            <Tab.Panel>
              <InfluencerLogsTab />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default InfluencerTabs;
