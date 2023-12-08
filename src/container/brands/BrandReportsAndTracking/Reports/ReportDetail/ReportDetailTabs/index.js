import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OverviewTab from "./OverviewTab";
import CreatorsTab from "./CreatorsTab";
import { actions } from "@store/redux/BrandReportsRedux";
import { useDispatch } from "react-redux";
import ContentTab from "./ContentTab";
import { useParams } from "react-router-dom";

const ReportDetailTabs = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveIndex] = useState(0);
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const searchQuery = useSelector((state) => state.BrandReports.searchQuery);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleChangeTab = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        actions.fetchReportDetail(dispatch, params.id);
        break;
      case 1:
        actions.fetchCreatorsDetails(dispatch, report.id);
        break;
      case 2:
        actions.fetchContents(dispatch, report.id, searchQuery);
        break;
      default:
        break;
    }
  };

  return (
    <div className="containers pb-4 space-y-6">
      <Tab.Group
        defaultIndex={activeTab}
        selectedIndex={activeTab}
        onChange={(index) => {
          handleChangeTab(index);
        }}
      >
        <Tab.List className="flex flex-wrap gap-x-5 mb-0 border-b-[3px] border-[#ccc]">
          <Tab
            className={({ selected }) =>
              classNames(
                "mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
                selected
                  ? "font-semibold before:w-full"
                  : "font-normal before:w-0"
              )
            }
          >
            Report Overview
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
                selected
                  ? "font-semibold before:w-full"
                  : "font-normal before:w-0"
              )
            }
          >
            Creators ({report.reportCreatorsCount})
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "mr-[20px] xxs:min-w-[80px] min-w-[50px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] xxs:px-[1rem] px-[0.2rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
                selected
                  ? "font-semibold before:w-full"
                  : "font-normal before:w-0"
              )
            }
          >
            Published content ({report.publishedContentCount})
          </Tab>
        </Tab.List>
        <Tab.Panels className="bg-transparent">
          <Tab.Panel>
            <OverviewTab />
          </Tab.Panel>
          <Tab.Panel>
            <CreatorsTab />
          </Tab.Panel>
          <Tab.Panel>
            <ContentTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ReportDetailTabs;
