import Button from "@components/global/Button";
import Tooltip from "@components/global/Tooltip";
import moment from "moment";
import React, { useRef } from "react";
import {
  BiInfoCircle,
  BiSolidAddToQueue,
  BiSolidCloudDownload,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import StatsCard from "./StatsCard";
import { RxAvatar } from "react-icons/rx";
import { RiCalendarEventFill } from "react-icons/ri";
import {
  BsFillCameraVideoFill,
  BsFillCollectionPlayFill,
  BsInfinity,
} from "react-icons/bs";
import { AiFillDollarCircle, AiFillHeart, AiFillPicture } from "react-icons/ai";
import { MdInsertComment, MdPeopleAlt, MdVideoLibrary } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { actions } from "@store/redux/BrandReportsRedux";
import { useDispatch } from "react-redux";
import Popup from "@components/Popup";

const OverviewTab = () => {
  const endCampaignRef = useRef(null);
  const dispatch = useDispatch();

  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const isReportTracking = useSelector(
    (state) => state.BrandReports.isReportTracking
  );
  const isCampaignEndLoading = useSelector(
    (state) => state.BrandReports.isCampaignEndLoading
  );

  const mentionTags = (report.brand_report_tags || []).filter((item) =>
    item.tag.startsWith("@")
  );

  const hashtags = (report.brand_report_tags || []).filter((item) =>
    item.tag.startsWith("#")
  );

  const capitalizeFirstLetter = (word) => {
    if (!word) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleEndCampaign = async () => {
    await actions.endReportCampaign(dispatch, report.id);
    endCampaignRef.current.close();
  };

  const stats = [
    {
      icon: <RxAvatar size={30} color="purple" />,
      count: (report.brand_report_usernames || []).length,
      title: "Influencers",
    },
    {
      icon: <RiCalendarEventFill size={30} color="purple" />,
      count: report.publishedContentCount,
      title: "Total Publications",
    },
    {
      icon: <BsInfinity size={30} color="purple" />,
      count: report.totalEngagements,
      title: "Total Engagements",
    },
    {
      icon: <AiFillPicture size={30} color="purple" />,
      count: report.totalPostsCount,
      title: "Posts",
    },
    {
      icon: <BiSolidAddToQueue size={30} color="purple" />,
      count: report.totalStoriesCount,
      title: "Stories",
    },
    {
      icon: <BsFillCollectionPlayFill size={30} color="purple" />,
      count: report.totalReelsCount,
      title: "Reels",
    },
    {
      icon: <MdVideoLibrary size={30} color="purple" />,
      count: report.totalVideosCount,
      title: "Videos",
    },
    {
      icon: <AiFillDollarCircle size={30} color="purple" />,
      count: `USD ${report.totalInfluencerCost}`,
      title: "Total influencer cost",
    },
    {
      icon: <MdPeopleAlt size={30} color="purple" />,
      count: report.totalReach,
      title: "Est. reach",
    },
    {
      icon: <AiFillHeart size={30} color="purple" />,
      count: report.totalLikes,
      title: "Total likes",
    },
    {
      icon: <MdInsertComment size={30} color="purple" />,
      count: report.totalComments,
      title: "Total comments",
    },
    {
      icon: <BsFillCameraVideoFill size={30} color="purple" />,
      count: report.totalViews,
      title: "Total video views",
    },
  ];

  const filteredStats = stats.filter((stat) => {
    switch (report.tracking_platform) {
      case "instagram":
        return stat.title !== "Videos";
      case "tiktok":
        return (
          stat.title !== "Reels" &&
          stat.title !== "Stories" &&
          stat.title !== "Posts"
        );
      case "youtube":
        return stat.title !== "Stories" && stat.title !== "Posts";
      default:
        return true;
    }
  });

  const handleTrackContent = () => {
    let totalCredits;
    totalCredits = (report.brand_report_usernames || []).length;
    if (report.tracking_platform !== "tiktok") {
      if (report.is_tracking_posts && report.is_tracking_stories) {
        totalCredits = totalCredits * 2;
      } else if (
        report.is_tracking_posts &&
        report.is_tracking_stories &&
        report.is_tracking_reels
      ) {
        totalCredits = totalCredits * 3;
      }
    }
    let query = {
      cost: totalCredits,
      reportId: report.id,
    };
    actions.trackReportContent(dispatch, query);
  };

  return (
    <>
      <div className="space-y-10 pb-8">
        <div className="flex justify-between items-center">
          <h1 className="black text-[20px] font-semibold">Report Overview</h1>
          <div className="flex items-center gap-x-5">
            {(!report.campaign_end_date ||
              moment(report.campaign_end_date).isAfter(moment())) && (
              <>
                {report.report_type === "manual_tracking" && (
                  <Button
                    onClick={handleTrackContent}
                    disabled={isReportTracking}
                    className="px-8 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                    prefix={
                      isReportTracking && (
                        <FaSpinner
                          className="animate-[spin_2s_linear_infinite] mr-2"
                          size={20}
                        />
                      )
                    }
                    text={"Track Content"}
                  />
                )}
                <Button
                  onClick={handleTrackContent}
                  disabled={isReportTracking}
                  className="px-8 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                  prefix={
                    isReportTracking && (
                      <FaSpinner
                        className="animate-[spin_2s_linear_infinite] mr-2"
                        size={20}
                      />
                    )
                  }
                  text={"Refresh Data"}
                />
                <Button
                  onClick={() =>
                    endCampaignRef.current.open({ title: "Are you sure?" })
                  }
                  className="px-6 justify-center rounded-[8px] h-[38px] text-[14px] inline-flex whitespace-nowrap items-center bg--red text-white hover:opacity-80 font-medium"
                  type="button"
                  text="End Campaign"
                />
              </>
            )}
          </div>
        </div>
        <div className="space-y-7">
          <p className="text-gray-500">
            Channel:{" "}
            <span className="black font-medium pl-3">
              {capitalizeFirstLetter(report.tracking_platform)}
            </span>
          </p>
          <p className="text-gray-500">
            Campaign start:{" "}
            <span className="black font-medium pl-3">
              {moment(report.campaign_start_date).format("MMM DD YYYY")}
            </span>
          </p>
          {hashtags.length > 0 && (
            <p className="text-gray-500 flex">
              Hashtags:
              <Tooltip
                trigger={
                  <div className="ml-2">
                    <BiInfoCircle className="dark" size={20} />
                  </div>
                }
                tooltipText="We will track all the posts and stories with the tags you have specified for this campaign. If influencers post includes at least one of the tags or other tracking indicators, it will appear in the campaign."
                placement="top-left"
              />{" "}
              <span className=" flex flex-wrap">
                {hashtags.map((tag, index) => (
                  <span className="black font-medium pl-3" key={index}>
                    {`${tag.tag}${index !== hashtags.length - 1 ? ", " : ""}`}
                  </span>
                ))}
              </span>
            </p>
          )}
          {mentionTags.length > 0 && (
            <p className="text-gray-500 flex">
              Tags:
              <Tooltip
                trigger={
                  <div className="ml-2">
                    <BiInfoCircle className="dark" size={20} />
                  </div>
                }
                tooltipText="We will track all the posts and stories with the tags you have specified for this campaign. If influencers post includes at least one of the tags or other tracking indicators, it will appear in the campaign."
                placement="top-left"
              />{" "}
              <span className=" flex flex-wrap">
                {mentionTags.map((tag, index) => (
                  <span className="black font-medium pl-3" key={index}>
                    {`${tag.tag}${
                      index !== mentionTags.length - 1 ? ", " : ""
                    }`}
                  </span>
                ))}
              </span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-7">
          {filteredStats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              count={stat.count}
              title={stat.title}
            />
          ))}
        </div>
      </div>

      {/* End Campaign Popup */}
      <Popup ref={endCampaignRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <p>Are you sure to end this campaign?</p>
          <p>
            Once campaign ended, the posts / stories will no longer be tracked.
          </p>
        </div>
        <div className="multi-buttons pt-3 flex justify-end gap-x-5">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => endCampaignRef.current.close()}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2"
            onClick={handleEndCampaign}
            disabled={isCampaignEndLoading}
            text={
              isCampaignEndLoading ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "End Campaign"
              )
            }
          />
        </div>
      </Popup>
    </>
  );
};

export default OverviewTab;
