import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import { actions } from "@store/redux/BrandReportsRedux";
import moment from "moment";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ReportDetailHeader = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const [isEditing, setIsEditing] = useState(false);
  const [reportName, setReportName] = useState(report.report_name);

  const mentionTags = (report.brand_report_tags || []).filter((item) =>
    item.tag.startsWith("@")
  );

  const hashtags = (report.brand_report_tags || []).filter((item) =>
    item.tag.startsWith("#")
  );

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleEditClick = () => {
    setReportName(report.report_name);
    setIsEditing(true);
  };

  const handleUpdateName = async () => {
    let data = {
      id: report.id,
      name: reportName,
    };
    await actions.editReportName(dispatch, data);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      !isEmptyOrSpaces(e.target.value) &&
      e.target.value.length >= 3
    ) {
      handleUpdateName();
    }
  };

  return (
    <div className="containers py-8 space-y-6">
      <div className="flex gap-x-8 lg:items-center">
        <LinkTo
          to={"/reports"}
          className="text-[22px] black bg-[#7c3292] min-w-[30px] w-[30px] h-[30px] flex items-center justify-center rounded-full text-white"
          prefix={<FiChevronLeft size={20} className="text-white" />}
        />
        {isEditing ? (
          <div className="flex gap-x-3 gap-y-3 lg:flex-nowrap md:flex-nowrap flex-wrap items-center">
            <input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="rounded-[8px] h-[38px] min-w-[80%] inline-flex items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
              placeholder="Enter Report Name"
            />
            <Button
              type="button"
              className="py-0 px-4 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
              onClick={() => setIsEditing(false)}
              text="Cancel"
            />
            <Button
              type="button"
              className="py-0 px-4 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-80"
              disabled={isEmptyOrSpaces(reportName) || reportName.length < 3}
              onClick={handleUpdateName}
              text={"Update"}
            />
          </div>
        ) : (
          <>
            <p className="black text-[20px] font-semibold">
              {report.report_name}
            </p>
            {(!report.campaign_end_date ||
              moment(report.campaign_end_date).isAfter(moment())) && (
              <MdModeEditOutline
                size={25}
                className="ml-8 text-gray-400 opacity-40"
                cursor={"pointer"}
                onClick={handleEditClick}
              />
            )}
          </>
        )}
      </div>
      <p className="text-gray-600">
        Tracking when{" "}
        {report.reportCreatorsCount > 0 && (
          <span className="font-semibold black">{`@${
            report.brand_report_usernames[0].username
          } ${
            report.reportCreatorsCount > 1
              ? `and ${report.reportCreatorsCount - 1} others`
              : ""
          } `}</span>
        )}
        create a new {report.tracking_platform}{" "}
        {report.is_tracking_posts ? "post" : ""}
        {report.is_tracking_posts &&
        report.is_tracking_reels &&
        report.is_tracking_stories
          ? ", "
          : report.is_tracking_posts && report.is_tracking_reels
          ? " or "
          : ""}
        {report.is_tracking_reels ? "reel " : ""}
        {report.is_tracking_reels && report.is_tracking_stories
          ? "or"
          : ""}{" "}
        {report.is_tracking_stories ? "story " : ""}
        that
        {mentionTags.length > 0 && (
          <>
            {" mentions"}
            <span className="font-semibold black">{` ${mentionTags[0].tag} ${
              mentionTags.length > 1
                ? ` and ${mentionTags.length - 1} others `
                : ""
            }`}</span>
          </>
        )}
        {mentionTags.length > 0 && hashtags.length > 0 && "or"}
        {hashtags.length > 0 && (
          <>
            {" use hashtag(s) "}
            <span className="font-semibold black">{`${hashtags[0].tag} ${
              hashtags.length > 1 ? ` and ${hashtags.length - 1} others ` : ""
            }`}</span>
          </>
        )}
        at any time
      </p>
    </div>
  );
};
export default ReportDetailHeader;
