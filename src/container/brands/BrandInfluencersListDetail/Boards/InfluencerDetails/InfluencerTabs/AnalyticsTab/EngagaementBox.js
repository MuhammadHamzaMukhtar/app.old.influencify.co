import React from "react";
import Followers from "@assets/svgs/followers_alt.svg";
import { useSelector } from "react-redux";
import Activity from "@assets/svgs/activity.svg";
import EngagementRateGraph from "@components/BrandInfluencerDiscover/Profile/MiniProfile/Sections/EngagementRateGraph";

const EngagaementBox = () => {
  const influencer = useSelector((state) => state.influencerSearch?.influencer);

  const FormatedNumber = ({ num }) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div className="rounded-[8px] border h-full p-4 space-y-6">
      <div className="flex items-center">
        <div className="flex items-center w-[120px]">
          <img src={Followers} alt="followers" width="30" />
          <h4 className="ml-3 text-[20px] darkGray font-semibold">
            <FormatedNumber num={influencer.followers_count} />
          </h4>
        </div>
        <p className="text-[14px] font-normal darkGray ml-10">Followers</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center w-[120px]">
          <img src={Activity} alt="followers" width="30" />
          <h4 className="ml-3 text-[20px] darkGray font-semibold">
            <FormatedNumber num={influencer.engagements || 0} />
          </h4>
        </div>
        <p className="text-[14px] font-normal darkGray ml-10">
          Enagagement Count
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center w-[120px]">
          <span className="text-3xl text-gray-500 w-[30px]">%</span>
          <h4 className="ml-3 text-[20px] darkGray font-semibold">
            {(influencer.engagement_rate * 100).toFixed(2)} %
          </h4>
        </div>
        <p className="text-[14px] font-normal darkGray ml-10">
          Enagagement Rate
        </p>
      </div>
      <EngagementRateGraph
        engagement_rate_histogram={influencer.engagement_rate_histogram}
        engagement_rate={influencer.engagement_rate}
        profile_picture_url={influencer.profile_picture}
      />
    </div>
  );
};

export default EngagaementBox;
