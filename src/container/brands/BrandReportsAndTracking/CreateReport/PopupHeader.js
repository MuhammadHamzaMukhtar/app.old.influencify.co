import React, { useState } from "react";
import ReportPercircleChart from "./ReportPercircleChart";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { types } from "@store/redux/BrandReportsRedux";
import csvExample from "@assets/csv-example.png";
import moment from "moment";

const PopupHeader = () => {
  const dispatch = useDispatch();
  const [startCalendar, setStartCalendar] = useState(false);
  const form = useSelector((state) => state.BrandReports.creationForm);

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    if (key === "campaignStartDate") {
      creationForm["campaignEndDate"] = "";
    }
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  return (
    <div className="mb-6 flex items-center flex-wrap-reverse gap-y-3 gap-x-14 lg:justify-between md:justify-between justify-center">
      <div className="font-medium">
        <p className="text-gray-500">{form.step}/5</p>
        <h1 className="text-[24px]">
          {form.step === 1 && "What are we going to build?"}
          {form.step === 2 && "Tracking Setup"}
          {form.step === 3 &&
            (form.listImported ? (
              <span className="text-[20px]">
                Choose a list to import influencers from
              </span>
            ) : form.fileImporting ? (
              <div className="space-y-5">
                <p className="text-[24px]">Import influencers</p>
                <img src={csvExample} alt="csvExample" width={200} />
              </div>
            ) : (
              <div className="font-medium text-[16px] text-slate-600 space-y-4">
                <p>Great! Now select the type of content you want to track</p>
                <div className="flex flex-wrap gap-x-10 font-normal">
                  {form.trackingPlatform === "instagram" ? (
                    <>
                      <div className="flex gap-x-5 items-center">
                        <p>Posts</p>
                        <Switch
                          icons="false"
                          onChange={() =>
                            addForm("isTrackingPosts", !form.isTrackingPosts)
                          }
                          checked={form.isTrackingPosts}
                          onColor="#7c3292"
                          offColor="#888"
                          offHandleColor="#fff"
                          onHandleColor="#fff"
                          handleDiameter={15}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={40}
                          className="react-switch"
                          id="material-switch"
                        />
                      </div>
                      <div className="flex gap-x-5 items-center">
                        <p>Stories</p>
                        <Switch
                          icons="false"
                          onChange={() =>
                            addForm(
                              "isTrackingStories",
                              !form.isTrackingStories
                            )
                          }
                          checked={form.isTrackingStories}
                          onColor="#7c3292"
                          offColor="#888"
                          offHandleColor="#fff"
                          onHandleColor="#fff"
                          handleDiameter={15}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={40}
                          className="react-switch"
                          id="material-switch"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-x-5 items-center">
                      <p>Videos</p>
                      <Switch
                        icons="false"
                        onChange={() =>
                          addForm("isTrackingVideos", !form.isTrackingVideos)
                        }
                        checked={form.isTrackingVideos}
                        onColor="#7c3292"
                        offColor="#888"
                        offHandleColor="#fff"
                        onHandleColor="#fff"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={40}
                        className="react-switch"
                        id="material-switch"
                      />
                    </div>
                  )}
                  {form.trackingPlatform !== "tiktok" && (
                    <div className="flex gap-x-5 items-center">
                      <p>Reels</p>
                      <Switch
                        icons="false"
                        onChange={() =>
                          addForm("isTrackingReels", !form.isTrackingReels)
                        }
                        checked={form.isTrackingReels}
                        onColor="#7c3292"
                        offColor="#888"
                        offHandleColor="#fff"
                        onHandleColor="#fff"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={40}
                        className="react-switch"
                        id="material-switch"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          {form.step === 4 && (
            <div className="flex justify-between gap-x-16 gap-y-3 items-center lg:flex-nowrap flex-wrap text-[14px] w-full max-w-md font-normal">
              <div>
                <p className="font-semibold">Start Date</p>
                <p className="text-gray-600">
                  When did/does your campaign start?
                </p>
              </div>
              {startCalendar || form.campaignStartDate ? (
                <input
                  id="date"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="rounded-[8px] h-[36px] w-full max-w-[130px] inline-flex px-2 items-center border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                  value={form?.campaignStartDate}
                  onChange={(e) => addForm("campaignStartDate", e.target.value)}
                />
              ) : (
                <span
                  className="text-blue-500 cursor-pointer pl-[43px]"
                  onClick={() => setStartCalendar(true)}
                >
                  Choose
                </span>
              )}
            </div>
          )}
          {form.step === 5 && (
            <span className="font-semibold">
              Report cost: {form.cost} credits
            </span>
          )}
        </h1>
      </div>
      <div>
        <ReportPercircleChart
          completionPercentage={(((form.step - 1) / 5) * 100).toFixed(0)}
        />
      </div>
    </div>
  );
};

export default PopupHeader;
