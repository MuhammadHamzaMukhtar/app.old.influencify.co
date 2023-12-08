import { BsCheck2 } from "react-icons/bs";
import Credibility from "@assets/svgs/profile_credibility.svg";
import { useSelector } from "react-redux";

const AudienceCredibilityBox = () => {
  const influencer = useSelector((state) => state.influencerSearch?.influencer);

  const audience_credibility = (
    influencer?.credibility && influencer?.credibility != 0.0
      ? influencer.credibility
      : Math.random() * 41 + 60
  ).toFixed(2);

  return (
    <div
      className={`bg-white rounded-[8px] p-6 h-full ${
        (influencer?.credibility === 0.0 || !influencer?.credibility) &&
        "border blur-[6px] pointer-events-none"
      }`}
    >
      <div className="flex items-end">
        <img src={Credibility} alt="credibility" className="w-[35px]" />
        <h4 className="ml-4 text-[30px] leading-[30px] text-[#8d8d8d] font-semibold">
          {((audience_credibility || 0) * 100).toFixed(2)}%
        </h4>
        <p className="text-[14px] font-regular text-[#8d8d8d] ml-3 mb-1">
          Credibility{" "}
        </p>
      </div>
      <p className="text-[14px] font-light text-[#8d8d8d] mt-5 mb-3">
        This parameter determines how reliable are the users following this
        account. The higher the parameter, the more real and engaged the
        account's audience. Following activities are considered as "not
        credible".
      </p>
      <div>
        <div className="flex items-start mb-3">
          <BsCheck2 className="success shrink-0" size={28} />
          <p className="text-[14px] font-light text-[#8d8d8d] ml-2">
            An account has no profile photo or photos or bio, but likes 50-100
            posts per day.
          </p>
        </div>
        <div className="flex items-start">
          <BsCheck2 className="success shrink-0" size={28} />
          <p className="text-[14px] font-light text-[#8d8d8d] ml-2">
            An account follows no-one, but likes all posts from 50 individuals.
          </p>
        </div>
        <div className="flex items-start">
          <BsCheck2 className="success shrink-0" size={28} />
          <p className="text-[14px] font-light text-[#8d8d8d] ml-2">
            An account has posted 100 comments in a day on multiple days. But
            has no bio or posts.
          </p>
        </div>
        <div className="flex items-start mb-3">
          <BsCheck2 className="success shrink-0" size={28} />
          <p className="text-[14px] font-light text-[#8d8d8d] ml-2">
            A profile has been active for months, but has no photos and has
            likes 500+ posts per day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudienceCredibilityBox;
