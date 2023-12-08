import React from "react";
import { useSelector } from "react-redux";

const Step5 = () => {
  const form = useSelector((state) => state.BrandReports.creationForm);

  return (
    <div className="space-y-4 font-medium">
      <p className="text-gray-600">
        It takes 1 credit to track 1 influencer
        <br />
        {form.trackingPlatform === "instagram" ? (
          <span>
            Posts/Stories per day (2 credits for both stories and posts)
          </span>
        ) : (
          <span>Videos per day (1 credits for videos)</span>
        )}
        {form.trackingPlatform !== "tiktok" && (
          <>
            <br />
            <span>Reels per day (1 credits for reels)</span>
          </>
        )}
      </p>
      <p className="text-[12px]">(number of tracked influencers x days)</p>
    </div>
  );
};

export default Step5;
