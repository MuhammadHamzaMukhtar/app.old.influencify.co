import { useRef, useState } from "react";
import avatar from "@assets/avatar.png";
import { FaSpinner, FaYoutube, FaTiktok } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import { BsQuestionCircle } from "react-icons/bs";
import Tooltip from "@components/global/Tooltip";
import AudienceGender from "@components/AudienceGender";
import AudienceAge from "@components/AudienceAge";
import AudienceGeoCountry from "@components/AudienceGeoCountry";
import AudienceGeoCity from "@components/AudienceGeoCity";
import AudienceLanguage from "@components/AudienceLanguage";
import Interest from "@components/Interest";
import BrandAffinity from "@components/BrandAffinity";
import AudienceInterest from "@components/AudienceInterest";
import AudienceBrandAffinity from "@components/AudienceBrandAffinity";
import AudienceReachability from "@components/AudienceReachability";
import InfluencerMeta from "@components/InfluencerMeta";
import AudienceCredibility from "@components/AudienceCredibility";
import RecentPost from "@components/RecentPost";
import CommercialPost from "@components/CommercialPost";
import AudienceLookalike from "@components/AudienceLookalike";
import Influencify from "../../../constants/Influencify";
import Mentions from "@components/Mentions";
import Hashtags from "@components/Hashtags";
import TopReels from "@components/TopReels";
import InfluencerStats from "@components/InfluencerStats";
import NotableFollowers from "@components/NotableFollowers";
import Button from "@components/global/Button";
import Emitter from "@constants/Emitter";
import InfluencerListModal from "@components/InfluencerListModal";
import { actions } from "@store/redux/BrandListRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// function truncate(input) {
// 	if (input.length > 50) {
// 		return input.substring(0, 50) + "...";
// 	}
// 	return input;
// }

// const A4_PAPER_DIMENSIONS = {
// 	width: 210,
// 	height: 297,
// };
// const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

// const imageDimensionsOnA4 = (width, height) => {
// 	const isLandscapeImage = width >= height;
// 	if (isLandscapeImage) {
// 		return {
// 			width: A4_PAPER_DIMENSIONS.width,
// 			height: A4_PAPER_DIMENSIONS.width / (width / height),
// 		};
// 	}
// 	const imageRatio = width / height;
// 	if (imageRatio > A4_PAPER_RATIO) {
// 		const imageScaleFactor = (A4_PAPER_RATIO * height) / width;
// 		const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;
// 		return {
// 			height: scaledImageHeight,
// 			width: scaledImageHeight * imageRatio,
// 		};
// 	}
// 	return {
// 		width: A4_PAPER_DIMENSIONS.height / (height / width),
// 		height: A4_PAPER_DIMENSIONS.height,
// 	};
// };

function InstagramProfile(props) {
  const dispatch = useDispatch();
  const profileDataRef = useRef(null);
  const postRef = useRef(null);
  const audienceDataRef = useRef(null);
  const affinintyInterestsRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClicked, setIsClicked] = useState({
    name: "influencer-post-popular",
  });
  const [pagination, setPagination] = useState({ min: 0, max: 3 });
  const brandLists = useSelector((state) => state.brandList.brandlists);
  const { current_influencer } = props;

  const onMouseEnter = (e) => {
    switch (e) {
      case "influencer-post-popular":
        if (current_influencer?.user_profile?.top_posts?.length < 3) {
          setPagination({
            min: 0,
            max: current_influencer?.user_profile?.top_posts?.length,
          });
        } else {
          setPagination({ min: 0, max: 3 });
        }
        break;
      case "influencer-post-sponsored":
        if (current_influencer?.user_profile?.commercial_posts?.length < 3) {
          setPagination({
            min: 0,
            max: current_influencer?.user_profile?.commercial_posts?.length,
          });
        } else {
          setPagination({ min: 0, max: 3 });
        }
        break;
      case "influencer-top-reels":
        if (current_influencer?.user_profile?.top_reels?.length < 3) {
          setPagination({
            min: 0,
            max: current_influencer?.user_profile?.top_reels?.length,
          });
        } else {
          setPagination({ min: 0, max: 3 });
        }
        break;
      default:
        break;
    }
    const el = document.getElementById(e);
    setIsClicked({ name: e });
    const popular = document.getElementById("influencer-post-popular");
    const sponsored = document.getElementById("influencer-post-sponsored");
    const reels = document.getElementById("influencer-top-reels");
    popular.classList.add("hidden");
    popular.classList.remove("grid");
    sponsored.classList.add("hidden");
    sponsored.classList.remove("grid");
    reels.classList.add("hidden");
    reels.classList.remove("grid");
    el.classList.remove("hidden");
    el.classList.add("grid");

    document
      .getElementById("influencer-post-popular-text")
      .classList.remove("font-bold");
    document
      .getElementById("influencer-post-sponsored-text")
      .classList.remove("font-bold");
    document
      .getElementById("influencer-top-reels-text")
      .classList.remove("font-bold");
    document.getElementById(e + "-text").classList.add("font-bold");
  };

  const download = async () => {
    setLoader(true);
    const params = { report_id: current_influencer?.report_info?.report_id };
    const json = await Influencify.influencerDownloadReports(params);
    setLoader(false);
    window.open(json.data, "_blank");
  };

  const showInfluencerList = () => {
    setShowModal(true);
    let query = {
      platform: props.platform,
    };
    actions.fetchBrandLists(dispatch, query);
  };

  const currentURL = window.location.href;

  return (
    <>
      <div className="user-profile-page px-[20px]" id="user-profile-page">
        <div className="grid grid-cols-12 gap-5 my-5">
          <div className="col-span-12 relative flex flex-col">
            <div className="p-3 mb-10">
              <div className="grid grid-cols-12 gap-5">
                <div className="lg:col-span-2 col-span-12">
                  <img
                    src={
                      current_influencer?.user_profile &&
                      current_influencer?.user_profile.picture
                        ? current_influencer.user_profile.picture
                        : avatar
                    }
                    alt={current_influencer?.user_profile?.fullname}
                    className="w-[152px] rounded-full shrink-0"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="items-center  h-[21px] text-[0.75em] rounded-[4px] text-center font-bold text-black inline-flex">
                    {current_influencer?.user_profile?.type === "youtube" && (
                      <FaYoutube size={22} />
                    )}

                    {current_influencer?.user_profile?.type === "tiktok" && (
                      <FaTiktok size={22} />
                    )}

                    <a
                      className="text-lg ml-2"
                      target={"_blank"}
                      rel="noreferrer"
                      href={current_influencer?.user_profile?.url}
                    >
                      {current_influencer?.user_profile?.username ||
                        current_influencer?.user_profile?.custom_name ||
                        current_influencer?.user_profile?.handle}
                    </a>
                  </div>
                  <h3 className="mt-6 mb-4 black font-medium text-[28px] flex items-center">
                    {current_influencer?.user_profile &&
                    current_influencer?.user_profile.fullname
                      ? current_influencer.user_profile?.fullname
                      : ""}
                    {current_influencer?.user_profile?.is_verified && (
                      <MdVerified size={22} className="ml-2 text-blue-500" />
                    )}
                  </h3>

                  <div className="mt-4">
                    <span className="text-[14px] font-light text-[#8d8d8d] mt-12 mb-6">
                      {current_influencer?.user_profile &&
                      current_influencer?.user_profile.description
                        ? current_influencer?.user_profile.description
                        : ""}
                    </span>
                  </div>
                  {/* <div className="mt-4 flex flex-wrap gap-1">
									{current_influencer?.user_profile &&
									current_influencer?.user_profile.interests &&
									current_influencer?.user_profile.interests.length
										? current_influencer.user_profile.interests
												.slice(0, 3)
												.map((interest, index) => (
													<span
														key={index}
														className="p-[2px_10px] h-[28px] text-[12pt] rounded-[30px] text-center text-white bg-[#4c5065] inline-block font-normal"
													>
														{interest.name}
													</span>
												))
										: ""}
								</div> */}
                </div>
                <div className="lg:col-span-4 col-span-12 ignore-element mt-6 flex gap-x-5 justify-end">
                  {!currentURL.includes("list") && (
                    <Button
                      onClick={showInfluencerList}
                      className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                      text="Add to list"
                    />
                  )}
                  <button
                    type="button"
                    onClick={download}
                    className="px-6 rounded-[8px] h-[40px] text-[14px] font-medium inline-flex items-center bg--purple text-white hover:opacity-80"
                  >
                    {loader ? (
                      <FaSpinner className="animate-[spin_2s_linear_infinite] text-white" />
                    ) : (
                      <>Download PDF</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b flex flex-wrap py-3 gap-x-5 mb-10 ignore-element">
          <p
            className="pr-3 darkGray font-medium cursor-pointer"
            onClick={() =>
              profileDataRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Profile data
          </p>
          <p
            className="pr-3 darkGray font-medium cursor-pointer"
            onClick={() =>
              postRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Posts
          </p>
          <p
            className="pr-3 darkGray font-medium cursor-pointer"
            onClick={() =>
              audienceDataRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Audience Demographics
          </p>
          <p
            className="pr-3 darkGray font-medium cursor-pointer"
            onClick={() =>
              affinintyInterestsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Interests & brand affinity
          </p>
          <p
            className="pr-3 darkGray font-medium cursor-pointer"
            onClick={() =>
              affinintyInterestsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Influential followers
          </p>
        </div>
        {/* <p className="text-[18px] black font-medium">Profile data</p> */}
        <div
          className={`grid xl:grid-cols-2 lg:grid-cols-2'} grid-cols-1 gap-7 mb-10`}
        >
          <div>
            <AudienceReachability
              profile={current_influencer.user_profile}
              data={
                current_influencer?.audience_followers?.data
                  ?.audience_reachability
              }
            />
          </div>
          <div>
            <InfluencerMeta
              profile={current_influencer?.user_profile}
              data={current_influencer.extra?.engagement_rate_histogram}
              audience_likers={current_influencer.audience_likers?.data}
            />
          </div>
        </div>
        <div ref={postRef} className="mb-6">
          <div className="bg-white rounded-[8px] shadow-none p-4 mb-0">
            <div className="flex justify-between items-center text-slate-400 font-medium">
              <p className="text-3xl uppercase">Posts</p>
              <div className="flex flex-wrap items-center mt-2 mb-4 divide-[#ddd] rounded-[8px]">
                <p
                  id="influencer-post-popular-text"
                  className={`ml-2 ${
                    isClicked.name == "influencer-post-popular" && "bg-gray-200"
                  } font-bold px-5 py-2 cursor-pointer rounded-[8px] border-[2px] border-[#ddd]`}
                  type="button"
                  onClick={() => onMouseEnter("influencer-post-popular")}
                >
                  Popular
                </p>
              </div>
            </div>
            <div>
              <div id="influencer-post-popular">
                <RecentPost
                  platform={current_influencer?.user_profile?.type}
                  data={current_influencer?.user_profile?.top_posts}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </div>
              <div id="influencer-post-sponsored" className="hidden">
                <CommercialPost
                  platform={current_influencer?.user_profile?.type}
                  data={current_influencer?.user_profile?.commercial_posts}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </div>
              <div id="influencer-top-reels" className="hidden">
                <TopReels
                  platform={current_influencer?.user_profile?.type}
                  data={current_influencer?.user_profile?.top_reels}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 mb-10">
          {current_influencer?.user_profile?.top_mentions?.length > 0 && (
            <div className="mt-4 flex flex-col xl:col-span-5 col-span-12">
              <Mentions data={current_influencer?.user_profile?.top_mentions} />
            </div>
          )}
          {current_influencer?.user_profile?.top_hashtags?.length > 0 && (
            <div className="mt-4 flex flex-col xl:col-span-7 col-span-12">
              <Hashtags data={current_influencer?.user_profile?.top_hashtags} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 gap-5 mb-10">
          <div className="mt-4 flex flex-col xl:col-span-4 col-span-12">
            <InfluencerStats
              data={current_influencer?.user_profile?.stat_history}
              label="followers"
            />
          </div>
          {(current_influencer?.user_profile?.stat_history || [])?.filter(
            (i) => "following" in i
          ).length > 0 && (
            <div className="mt-4 flex flex-col xl:col-span-4 col-span-12">
              <InfluencerStats
                data={current_influencer?.user_profile?.stat_history}
                label="following"
              />
            </div>
          )}
          <div className="mt-4 flex flex-col xl:col-span-4 col-span-12">
            <InfluencerStats
              data={current_influencer?.user_profile?.stat_history}
              label="avg_likes"
            />
          </div>
        </div>
        {/* <p className="text-[18px] black font-medium">Audience data</p> */}
        <div ref={audienceDataRef} className="grid grid-cols-12 gap-5 mb-10">
          <div className="mt-4 flex flex-col xl:col-span-5 col-span-12">
            <AudienceGender
              data={
                current_influencer?.audience_followers?.data?.audience_genders
              }
            />
          </div>
          <div className="mt-4 flex flex-col xl:col-span-7 col-span-12">
            <AudienceAge
              data={
                current_influencer?.audience_followers?.data
                  ?.audience_genders_per_age
              }
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 mb-10">
          <div>
            <AudienceGeoCountry
              data={
                current_influencer?.audience_followers?.data?.audience_geo
                  ?.countries
              }
              likers={
                current_influencer?.audience_likers?.data?.audience_geo
                  ?.countries
              }
            />
          </div>
          {current_influencer?.audience_followers?.data?.audience_geo?.cities
            ?.length > 0 && (
            <div>
              <AudienceGeoCity
                data={
                  current_influencer?.audience_followers?.data?.audience_geo
                    ?.cities
                }
                likers={
                  current_influencer?.audience_likers?.data?.audience_geo
                    ?.cities
                }
              />
            </div>
          )}
          <div>
            <AudienceLanguage
              data={
                current_influencer?.audience_followers?.data?.audience_languages
              }
              likers={
                current_influencer?.audience_likers?.data?.audience_languages
              }
            />
          </div>
        </div>
        {/* <p className="text-[18px] black font-medium mb-2 pt-3">
				Interests & Brand Affininty
			</p> */}
        <div ref={affinintyInterestsRef} className="grid grid-cols-12 gap-5">
          {current_influencer?.user_profile?.interests?.length > 0 && (
            <div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
              <Interest data={current_influencer?.user_profile?.interests} />
            </div>
          )}
          {current_influencer?.user_profile?.brand_affinity?.length > 0 && (
            <div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
              <BrandAffinity
                data={current_influencer?.user_profile?.brand_affinity}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 gap-5">
          {current_influencer?.audience_followers?.data?.audience_interests
            ?.length > 0 && (
            <div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
              <AudienceInterest
                data={
                  current_influencer?.audience_followers?.data
                    ?.audience_interests
                }
                likers={
                  current_influencer?.audience_likers?.data?.audience_interests
                }
              />
            </div>
          )}
          {current_influencer?.audience_likers?.data?.audience_interests
            ?.length > 0 && (
            <div className="mt-4 flex flex-col lg:col-span-6 col-span-12">
              <AudienceBrandAffinity
                data={
                  current_influencer?.audience_followers?.data
                    ?.audience_brand_affinity
                }
                likers={
                  current_influencer?.audience_likers?.data
                    ?.audience_brand_affinity
                }
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 gap-5 mb-10">
          <div className="col-span-12">
            <h5 className="mb-6 mt-4 text-[20px] black font-medium flex items-center">
              Lookalike Profiles
              <Tooltip
                trigger={
                  <div className="ml-2">
                    <BsQuestionCircle className="darkGray" size={22} />
                  </div>
                }
                tooltipText="Influencers that have similar audience demographics"
                placement="top-left"
              />
            </h5>
            <AudienceLookalike
              data={
                current_influencer?.audience_followers?.data
                  ?.audience_lookalikes
              }
              platform={current_influencer?.user_profile?.type}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 mb-10">
          <div className="col-span-12">
            <h5 className="mb-6 mt-4 text-[20px] black font-medium flex items-center">
              <span className="uppercase">notable followers</span>
              <Tooltip
                trigger={
                  <div className="ml-2">
                    <BsQuestionCircle className="darkGray" size={22} />
                  </div>
                }
                tooltipText="Top followers of this user with more than 1000 followers"
                placement="top-left"
              />
            </h5>
            <NotableFollowers
              data={current_influencer?.audience_followers?.data?.notable_users}
            />
          </div>
        </div>
      </div>
      <InfluencerListModal
        show={showModal}
        platform={props.platform}
        closeModal={() => setShowModal(false)}
        selectedInfluencers={[current_influencer]}
        brandLists={brandLists}
        searchBrand={(data) => actions.searchBrand(dispatch, data)}
        createBrand={(data) => actions.addNewBrand(dispatch, data)}
        addInfluencer={(data) => actions.addInfluencersToList(dispatch, data)}
      />
    </>
  );
}

export default InstagramProfile;
