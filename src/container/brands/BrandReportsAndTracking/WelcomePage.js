import React, { useRef } from "react";
import reportsBg from "@assets/reports-bg.png";
import Button from "@components/global/Button";
import { MdOutlineAddBox } from "react-icons/md";
import CreateReportPopup from "./CreateReport";

const WelcomePage = () => {
  const createReportRef = useRef(null);

  return (
    <>
      <div className="flex flex-col items-center py-24 gap-y-7">
        <img src={reportsBg} alt="reports-background" width={500} />
        <h1 className="font-semibold text-[18px] text-purple-900">
          Welcome to Reports
        </h1>
        <p className="font-medium text-slate-500">
          The best place to analyze your influencer campaigns and measure their
          performance
        </p>
        <Button
          onClick={() => createReportRef.current.open(true)}
          className="px-6 justify-center rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
          type="button"
          text="Create Report"
          prefix={<MdOutlineAddBox size={20} className="mr-3" />}
        />
      </div>

      {/* Create Report Popup */}
      <CreateReportPopup ref={createReportRef} />
    </>
  );
};

export default WelcomePage;
