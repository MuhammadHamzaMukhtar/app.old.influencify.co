import Button from "@components/global/Button";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CreateReportPopup from "./CreateReport";
import { MdOutlineAddBox } from "react-icons/md";

const Header = () => {
  const reports = useSelector((state) => state.BrandReports.reportDetail);
  const createReportRef = useRef(null);

  return (
    <>
      <div className="containers p-8 flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2 black text-[20px] font-medium">
            Reports
          </div>
          <p className="font-medium text-gray-500">
            {reports.total || 0} Reports
          </p>
        </div>
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

export default Header;
