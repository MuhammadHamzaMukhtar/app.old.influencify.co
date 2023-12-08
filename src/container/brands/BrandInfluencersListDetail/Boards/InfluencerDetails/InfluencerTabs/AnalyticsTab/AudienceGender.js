import MaleAge from "@assets/svgs/male_age.svg";
import AltMaleAge from "@assets/svgs/male_age_alt.svg";
import FemaleAge from "@assets/svgs/female_age.svg";
import AltFemaleAge from "@assets/svgs/female_age_alt.svg";
import { useSelector } from "react-redux";

export default function AudienceGender() {
  const influencer = useSelector((state) => state.influencerSearch?.influencer);
  const maleValue = ((influencer.audience_male_weight || 0) * 100).toFixed(1);
  const femaleValue = ((influencer.audience_female_weight || 0) * 100).toFixed(
    1
  );
  return (
    <div className="p-4 border-[1px] border-[#dee2e6] bg-white h-full rounded-[8px]">
      <div className="flex justify-between">
        <h5 className="font-normal text-[16px] text-[#8d8d8d]">
          Audience Gender
        </h5>
      </div>
      <div className="flex flex-wrap justify-center items-end mt-12 pt-3">
        <div className="flex w-7/12 justify-center mb-6 pr-4">
          <div className="inline-flex items-end relative mr-6">
            <img src={FemaleAge} alt="male age" className="h-[200px]" />
            <div
              className="absolute w-full overflow-hidden"
              style={{
                height: `${femaleValue}%`,
              }}
            >
              <img
                src={AltFemaleAge}
                className="absolute bottom-0 h-[200px]"
                alt="male age"
              />
            </div>
          </div>
          <div className="inline-flex items-end relative">
            <img src={MaleAge} alt="male age" className="h-[200px]" />
            <div
              className="absolute w-full overflow-hidden"
              style={{
                height: `${maleValue}%`,
              }}
            >
              <img
                src={AltMaleAge}
                className="absolute bottom-0 h-[200px]"
                alt="male age"
              />
            </div>
          </div>
        </div>
        <div className="md:hidden w-full"></div>
        <div className="">
          <div className="flex mb-4">
            <p className="text-[14px] darkGray font-normal w-24">FEMALE</p>
            <p className="text-[16px] pink font-normal">{femaleValue} %</p>
          </div>
          <div className="flex">
            <p className="text-[14px] darkGray font-normal w-24">MALE</p>
            <p className="text-[16px] purple font-normal">{maleValue} %</p>
          </div>
        </div>
      </div>
    </div>
  );
}
