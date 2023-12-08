import SocialListIcons from "@constants/SocialListIcons";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Interest from "@components/Interest";
import BrandAffinity from "@components/BrandAffinity";
import Button from "@components/global/Button";
import Emitter from "@constants/Emitter";
import AudienceAgeBox from "@components/AudienceAgeBox";
import EngagaementBox from "./EngagaementBox";
import AudienceCredibilityBox from "./AudienceCredibilityBox";
import Popup from "@components/Popup";
import { useDispatch } from "react-redux";
import { actions } from "@store/redux/InfluencerSearchRedux";
import EmailPopup from "../../EmailPopup";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import moment from "moment";
import AudienceGender from "./AudienceGender";

const InfluencerAnalyticsTab = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const connectionRef = useRef();
  const confirmationRef = useRef();
  const influencer = useSelector((state) => state.influencerSearch?.influencer);
  const smtpSetting = useSelector((state) => state.smtp.form);
  const currentList = useSelector((state) => state.brandList.current_list);
  const currentLoggedUser = useSelector(
    (state) => state.HeaderReducer.currentLoggedUser
  );
  const refreshData = useSelector((state) => state.HeaderReducer?.refreshData);
  const proceedLoader = useSelector(
    (state) => state.influencerSearch?.isProfileLoading
  );

  const handleClickFullProfile = () => {
    const data = {
      platform: currentList?.list_channel,
      influencer_iq_id: influencer.iq_user_id,
      influencer_id: influencer.id,
    };
    Emitter.emit("FULL_PROFILE_POPUP", data);
  };

  const fetchContact = async () => {
    const query = {
      influencer_id: influencer.iq_user_id,
      platform: influencer.platform || currentList.list_channel,
      cost: 1,
    };
    await actions.fetchInfluencerContact(dispatch, query);
    confirmationRef?.current.close();
  };

  const interests = influencer.interests
    ? influencer.interests
    : [
        {
          id: 3,
          name: "Music",
        },
        {
          id: 1708,
          name: "Friends, Family & Relationships",
        },
        {
          id: 21,
          name: "Sports",
        },
        {
          id: 139,
          name: "Restaurants, Food & Grocery",
        },
        {
          id: 1500,
          name: "Luxury Goods",
        },
        {
          id: 1,
          name: "Television & Film",
        },
      ];

  const brand_affinity = influencer.brand_affinity
    ? influencer.brand_affinity
    : [
        {
          id: 138,
          name: "Apple",
          interest: [
            {
              id: 3,
              name: "Music",
            },
          ],
        },
        {
          id: 201,
          name: "Balenciaga",
          interest: [
            {
              id: 1500,
              name: "Luxury Goods",
            },
          ],
        },
        {
          id: 409,
          name: "DC Entertainment",
          interest: [
            {
              id: 1,
              name: "Television & Film",
            },
          ],
        },
        {
          id: 1231,
          name: "Spotify Music",
          interest: [
            {
              id: 3,
              name: "Music",
            },
          ],
        },
        {
          id: 14081,
          name: "Live Nation",
          interest: [
            {
              id: 3,
              name: "Music",
            },
          ],
        },
      ];

  const handleConfirmationPopup = () => {
    const data = {
      title: "Find Email",
    };
    confirmationRef?.current.open(data);
  };

  const handleOpenEmailPopup = () => {
    if (
      currentLoggedUser.isGmailLinked ||
      Object.keys(smtpSetting).length > 0
    ) {
      emailRef.current.open();
    } else {
      const data = {
        title: "Connect Email",
      };
      connectionRef.current.open(data);
    }
  };

  let blur = "blur-[6px] pointer-events-none";
  const fourteenDaysAgo = moment().subtract(14, "days");
  const isMoreThanFourteenDaysAgo = moment(
    influencer.find_email_expire_on
  ).isBefore(fourteenDaysAgo);

  return (
    <div className="space-y-6 border p-5 rounded-xl h-[610px] overflow-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <span className="col-span-1">
            {SocialListIcons(currentList?.list_channel, 30)}
          </span>
          <p className="font-semibold text-lg">@{influencer?.username}</p>
        </div>
        <div className="flex gap-x-5 items-center">
          {(!influencer.find_email_expire_on || isMoreThanFourteenDaysAgo) && (
            <div>
              <Button
                onClick={handleConfirmationPopup}
                className="px-3 rounded-[8px] h-[36px] text-[14px] inline-flex justify-center border-[1px] items-center bg-white border-[#7c3292] hover:bg-[#7c3292] hover:text-white w-full black"
                type="button"
                text="Find Email"
              />
            </div>
          )}
          {influencer.email && (
            <div>
              <Button
                onClick={handleOpenEmailPopup}
                className="px-3 rounded-[8px] h-[36px] text-[14px] inline-flex justify-center border-[1px] items-center bg-white border-[#7c3292] hover:bg-[#7c3292] hover:text-white w-full black"
                type="button"
                text="Send Email"
                prefix={<HiOutlineMail size={20} className="mr-3" />}
              />
            </div>
          )}
          <Button
            onClick={handleClickFullProfile}
            className="px-8 justify-center rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
            type="button"
            text="See full profile"
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-5">
          <div
            className={`flex flex-col ${
              currentList?.list_channel === "instagram" && "lg:col-span-6"
            } col-span-12`}
          >
            <EngagaementBox />
          </div>
          {currentList?.list_channel === "instagram" && (
            <div
              className={`flex flex-col lg:col-span-6 col-span-12 border rounded-[8px] ${
                influencer.credibility === 0.0 &&
                "select-none cursor-not-allowed"
              }`}
            >
              <AudienceCredibilityBox />
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-5 mb-10">
          <div
            className={`mt-4 flex flex-col xl:col-span-5 col-span-12 rounded-[8px] ${
              influencer.audience_male_weight === 0.0 &&
              "select-none cursor-not-allowed border"
            }`}
          >
            <div
              className={`${influencer.audience_male_weight === 0.0 && blur}`}
            >
              <AudienceGender />
            </div>
          </div>
          <div
            className={`mt-4 flex flex-col xl:col-span-7 col-span-12 ${
              !influencer.audience_genders_per_age &&
              "select-none cursor-not-allowed border"
            } rounded-[8px]`}
          >
            <AudienceAgeBox />
          </div>
        </div>
        {currentList?.list_channel === "instagram" && (
          <>
            <p className="text-[18px] black font-medium col-span-12">
              Interests & Brand Affininty
            </p>
            <div className="grid grid-cols-12 gap-5">
              <div
                className={`mt-4 flex flex-col lg:col-span-6 col-span-12 rounded-[8px] ${
                  !influencer.interests &&
                  "border select-none cursor-not-allowed"
                }`}
              >
                <div className={`${!influencer.interests && blur}`}>
                  <Interest data={interests} />
                </div>
              </div>
              <div
                className={`mt-4 flex flex-col lg:col-span-6 col-span-12  rounded-[8px] ${
                  !influencer.brand_affinity &&
                  "border select-none cursor-not-allowed"
                }`}
              >
                <div className={`${!influencer.brand_affinity && blur}`}>
                  <BrandAffinity data={brand_affinity} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Send Email Popup */}
      <EmailPopup ref={emailRef} />

      {/* Email Connection Popup */}
      <Popup ref={connectionRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <p>Please connect your Gmail or SMTP to continue</p>
        </div>
        <div className="multi-buttons pt-3 flex justify-end">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => connectionRef.current.close()}
            text="Cancel"
          />
          <Link
            to={"/integration"}
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
          >
            Connect
          </Link>
        </div>
      </Popup>

      {/* Email Confirmation Popup */}
      <Popup ref={confirmationRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <h1 className="text-bold text-xl">Confirmation</h1>
          <div className="flex justify-between">
            <span className="text-[#979797]">Service Cost :</span>
            <span className="text-[#202020]">1 Credit (if email found)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#979797]">Your balance :</span>
            <span className="text-[#202020]">
              {refreshData?.remainingCredits || 0} Credit
            </span>
          </div>
        </div>
        <div className="text-right multi-buttons border-0 border-t pt-3 border-[#e5e7eb]">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => confirmationRef?.current.close()}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
            onClick={fetchContact}
            disabled={proceedLoader}
            text={
              proceedLoader ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "Proceed"
              )
            }
          />
        </div>
      </Popup>
    </div>
  );
};

export default InfluencerAnalyticsTab;
