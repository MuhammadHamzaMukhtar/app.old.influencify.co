import moment from "moment";
import React, { Fragment, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import avatar from "@assets/avatar.png";
import { Menu, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import Button from "@components/global/Button";
import Popup from "@components/Popup";
import { actions } from "@store/redux/BrandReportsRedux";
import { useDispatch } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ProxyImage from "@components/ProxyImage";

const CreatorsTab = () => {
  const dispatch = useDispatch();
  const deletePopupRef = useRef(null);
  const [deletedCreator, setDeletedCreator] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const isReportCreatorsLoading = useSelector(
    (state) => state.BrandReports.isReportCreatorsLoading
  );
  const reportCreatorsDetail = useSelector(
    (state) => state.BrandReports.reportCreatorsDetail
  );
  const [stats, setStats] = useState({});
  const isCreatorRemoving = useSelector(
    (state) => state.BrandReports.isCreatorRemoving
  );
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const isCreatorLoadingMore = useSelector(
    (state) => state.BrandReports.isCreatorLoadingMore
  );

  const initRemovePopup = (creatorId) => {
    setDeletedCreator(creatorId);
    deletePopupRef.current.open({ title: "Remove creator" });
  };

  const FormatedNumber = (num) => {
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

  const removeFromCampaign = async () => {
    let params = {
      creatorId: deletedCreator,
      reportId: report.id,
    };
    await actions.removeCreatorFromCampaign(dispatch, params);
    deletePopupRef.current.close();
  };

  const loadMoreCreators = () => {
    let params = {
      page: reportCreatorsDetail.current_page + 1,
    };
    actions.fetchCreatorsDetails(dispatch, report.id, params);
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const _handleKeyDown = (e, userId) => {
    if (e.key === "Enter" && !isEmptyOrSpaces(e.target.value)) {
      handleSaveForm(userId, e.target.name);
    }
  };

  const handleSaveForm = async (usernameId, key) => {
    const value = stats?.[key];
    if (value !== undefined && !isEmptyOrSpaces(value)) {
      let query = {
        key: key,
        value: key === "discount_code" ? value : parseInt(value),
        reportId: report.id,
      };
      await actions.updateCreatorData(dispatch, usernameId, query);
      handleCancelEditing();
    }
  };

  const handleCancelEditing = () => {
    setIsEditing({});
    setStats({});
  };

  const handleEditClick = (userId, key, value) => {
    setStats({ [key]: value });
    setIsEditing({
      [userId]: { [key]: true },
    });
  };

  const isCampaignInProgress =
    !report.campaign_end_date ||
    moment(report.campaign_end_date).isAfter(moment());

  if (isReportCreatorsLoading) {
    return (
      <div className="flex items-center justify-center h-[58vh]">
        <FaSpinner
          size={66}
          className="animate-[spin_2s_linear_infinite] pink mx-auto"
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10 min-h-[58vh]">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead>
                    <tr className="text-sm">
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        Influencer
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        Followers
                      </th>
                      {report.tracking_platform === "instagram" ? (
                        <>
                          <th
                            scope="col"
                            className="py-3 px-6 font-semibold tracking-wider text-left"
                          >
                            Stories
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-semibold tracking-wider text-left"
                          >
                            Posts
                          </th>
                        </>
                      ) : (
                        <th
                          scope="col"
                          className="py-3 px-6 font-semibold tracking-wider text-left"
                        >
                          Videos
                        </th>
                      )}
                      {report.tracking_platform !== "tiktok" && (
                        <th
                          scope="col"
                          className="py-3 px-6 font-semibold tracking-wider text-left"
                        >
                          Reels
                        </th>
                      )}
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        Last Content
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        Total Eng.
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        <p className=" flex justify-between">Revenue $ </p>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        <p className=" flex justify-between">
                          Influencer Cost $
                        </p>
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 font-semibold tracking-wider text-left"
                      >
                        <p className=" flex justify-between">Discount Code</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(reportCreatorsDetail.data || []).length > 0 ? (
                      reportCreatorsDetail.data.map((user, index) => (
                        <tr
                          className={`hover:bg-gray-100 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          }`}
                          key={index}
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {index + 1}.
                          </td>
                          <td className="py-1 px-4 text-sm font-medium text-gray-900 whitespace-nowrap flex items-center gap-x-2">
                            <ProxyImage
                              className="rounded-full w-10 h-10"
                              alt=""
                              url={user.profile_pic || avatar}
                              addCancelToken={() => {}}
                            />
                            @{user.username}
                          </td>
                          <td className="py-4 px-8 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {FormatedNumber(parseInt(user.follower_count)) || 0}
                          </td>
                          {report.tracking_platform === "instagram" ? (
                            <>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                {user.storyCount === 0 ? "-" : user.storyCount}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                {user.postCount === 0 ? "-" : user.postCount}
                              </td>
                            </>
                          ) : (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {user.videosCount === 0 ? "-" : user.videosCount}
                            </td>
                          )}
                          {report.tracking_platform !== "tiktok" && (
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {user.reelsCount === 0 ? "-" : user.reelsCount}
                            </td>
                          )}
                          <td
                            className={`py-4 px-6 text-sm font-medium text-center text-blue-400 ${
                              (user.brand_report_medias || []).length > 0 &&
                              "underline"
                            } whitespace-nowrap`}
                          >
                            {(user.brand_report_medias || []).length > 0
                              ? moment(
                                  user.brand_report_medias?.[0]?.created_at
                                ).fromNow()
                              : "-"}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {FormatedNumber(parseInt(user.totalEngagements)) ||
                              0}
                          </td>
                          <td className="py-2 px-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {isEditing?.[user.id]?.revenue ? (
                              <div className="flex gap-x-3 items-center">
                                <input
                                  type="number"
                                  placeholder="Revenue"
                                  name="revenue"
                                  className="rounded-[8px] h-[36px] inline-flex w-24 items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                                  onChange={(e) =>
                                    setStats({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                  onKeyDown={(e) => _handleKeyDown(e, user.id)}
                                  value={stats?.revenue || ""}
                                />
                                <div className="flex gap-x-2">
                                  <AiOutlineCheck
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={() =>
                                      handleSaveForm(user.id, "revenue")
                                    }
                                  />
                                  <RxCross1
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={handleCancelEditing}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between px-6">
                                {user.revenue || "-"}
                                {isCampaignInProgress && (
                                  <MdModeEditOutline
                                    size={15}
                                    className="text-gray-400 opacity-40"
                                    cursor={"pointer"}
                                    color="blue"
                                    onClick={() =>
                                      handleEditClick(
                                        user.id,
                                        "revenue",
                                        user.revenue
                                      )
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {isEditing?.[user.id]?.influencer_cost ? (
                              <div className="flex gap-x-3 items-center">
                                <input
                                  type="number"
                                  placeholder="Influencer Cost"
                                  name="influencer_cost"
                                  className="rounded-[8px] h-[36px] inline-flex w-24 items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                                  onChange={(e) =>
                                    setStats({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                  onKeyDown={(e) => _handleKeyDown(e, user.id)}
                                  value={stats?.influencer_cost || ""}
                                />
                                <div className="flex gap-x-2">
                                  <AiOutlineCheck
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={() =>
                                      handleSaveForm(user.id, "influencer_cost")
                                    }
                                  />
                                  <RxCross1
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={handleCancelEditing}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between px-6">
                                {user.influencer_cost || "-"}
                                {isCampaignInProgress && (
                                  <MdModeEditOutline
                                    size={15}
                                    className="text-gray-400 opacity-40"
                                    cursor={"pointer"}
                                    color="blue"
                                    onClick={() =>
                                      handleEditClick(
                                        user.id,
                                        "influencer_cost",
                                        user.influencer_cost
                                      )
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {isEditing?.[user.id]?.discount_code ? (
                              <div className="flex gap-x-3 items-center">
                                <input
                                  type="text"
                                  placeholder="Discount Code"
                                  name="discount_code"
                                  className="rounded-[8px] h-[36px] w-36 inline-flex items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                                  onChange={(e) =>
                                    setStats({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                  onKeyDown={(e) => _handleKeyDown(e, user.id)}
                                  value={stats?.discount_code || ""}
                                />
                                <div className="flex gap-x-2">
                                  <AiOutlineCheck
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={() =>
                                      handleSaveForm(user.id, "discount_code")
                                    }
                                  />
                                  <RxCross1
                                    className="cursor-pointer"
                                    color="gray"
                                    size={15}
                                    onClick={handleCancelEditing}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-between px-6">
                                {user.discount_code || "-"}
                                {isCampaignInProgress && (
                                  <MdModeEditOutline
                                    size={15}
                                    className="text-gray-400 opacity-40"
                                    cursor={"pointer"}
                                    color="blue"
                                    onClick={() =>
                                      handleEditClick(
                                        user.id,
                                        "discount_code",
                                        user.discount_code
                                      )
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </td>
                          {isCampaignInProgress && (
                            <td className="relative">
                              <Menu
                                as="div"
                                className="inline-block text-left z-50"
                              >
                                <div>
                                  <Menu.Button
                                    as="div"
                                    className="inline-flex items-center cursor-pointer"
                                  >
                                    <HiDotsVertical
                                      size={20}
                                      className="darkGray"
                                    />
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="fixed right-48 z-50 origin-top-right rounded-[8px] bg-white shadow-[0px_4px_5px_#96969640] focus:outline-none py-[0.5rem] text-center">
                                    <div className="px-1 hover:bg-[#0000000a] rounded-[8px] w-64">
                                      <Menu.Item>
                                        <Button
                                          onClick={() =>
                                            initRemovePopup(user.id)
                                          }
                                          className="text-[14px] py-3"
                                          text="Remove from the campaign"
                                        />
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <td
                        colSpan="10"
                        className="text-center w-full pt-4 px-[1rem] justify-center text-[#bbb] text-[25px] font-medium leading-[40px]"
                      >
                        No Creator Found
                      </td>
                    )}
                  </tbody>
                </table>
                {reportCreatorsDetail.last_page >
                  reportCreatorsDetail.current_page && (
                  <div className="flex justify-center mt-3">
                    <Button
                      className="px-6 rounded-[8px] h-[34px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2"
                      onClick={loadMoreCreators}
                      disabled={isCreatorLoadingMore}
                      text={
                        isCreatorLoadingMore ? (
                          <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                        ) : (
                          "Load more"
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Creator Popup */}
      <Popup ref={deletePopupRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <p>Are you sure to remove creator from the campaign?</p>
          <p>
            Once the creator removed, all his posts and stories will also be
            removed from the campaign.
          </p>
        </div>
        <div className="multi-buttons pt-3 flex justify-end gap-x-5">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => deletePopupRef.current.close()}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2"
            onClick={removeFromCampaign}
            disabled={isCreatorRemoving}
            text={
              isCreatorRemoving ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "Remove"
              )
            }
          />
        </div>
      </Popup>
    </>
  );
};

export default CreatorsTab;
