import { IoMdInformationCircle } from "react-icons/io";
import { useSelector } from "react-redux";

export default function AudienceAgeBox() {
  const influencer = useSelector((state) => state.influencerSearch?.influencer);

  const data = influencer.audience_genders_per_age
    ? influencer.audience_genders_per_age
    : [
        {
          code: "13-17",
          male: 0.015574,
          female: 0.016741,
        },
        {
          code: "18-24",
          male: 0.202023,
          female: 0.149495,
        },
        {
          code: "25-34",
          male: 0.380467,
          female: 0.157698,
        },
        {
          code: "35-44",
          male: 0.054727,
          female: 0.014732,
        },
        {
          code: "45-64",
          male: 0.005531,
          female: 0.003013,
        },
        {
          code: "65-",
          male: 0,
          female: 0,
        },
      ];

  return (
    <div
      className={`p-4 border-[1px] border-[#dee2e6] bg-white h-full audience-gender rounded-[8px] ${
        !influencer.audience_genders_per_age && "blur-[6px] pointer-events-none"
      }`}
    >
      <div className="flex justify-between">
        <h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center uppercase">
          Age & Gender Split
          <IoMdInformationCircle size={20} className="ml-2 text-[#c4c4c4]" />
        </h5>
      </div>
      <div className="grid sm:grid-cols-6 grid-cols-3 justify-center">
        {(data || []).map((item, key) => {
          let maleValue = ((item.male || 0) * 100).toFixed(2);
          let femaleValue = ((item.female || 0) * 100).toFixed(2);
          return (
            <div
              key={key}
              className="flex flex-col justify-end items-center mt-12"
            >
              <div className="flex">
                <div className="relative">
                  <p
                    className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
                    style={{ bottom: `${maleValue + 16}%` }}
                  >
                    {maleValue}%
                  </p>
                  <div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent ">
                    <div
                      className="bg-[#1fcfc5] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
                      style={{
                        height: `${maleValue + 16}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="relative ml-6">
                  <p
                    className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
                    style={{ bottom: `${femaleValue + 16}%` }}
                  >
                    {femaleValue}%
                  </p>
                  <div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent">
                    <div
                      className="bg-[#7c3292] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
                      style={{
                        height: `${femaleValue + 16}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h5 className="text-[15px] darkGray font-medium whitespace-nowrap">
                  {item.code}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
