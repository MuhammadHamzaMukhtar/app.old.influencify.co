import Button from "@components/global/Button";
import { types } from "@store/redux/BrandReportsRedux";
import moment from "moment";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import { toast } from "react-toastify";

const Step4 = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [endCalendar, setEndCalendar] = useState(false);
  const form = useSelector((state) => state.BrandReports.creationForm);

  const addForm = (key, value) => {
    const creationForm = Object.assign({ subscribedEmails: [] }, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\s/g, "");
    setEmail(inputValue);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddEmail();
    }
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleAddEmail = () => {
    let creationForm = Object.assign({ subscriptionEmails: [] }, form);
    if (creationForm.subscriptionEmails.length >= 5) {
      toast.error("Max 5 subscription emails allowed");
    } else {
      if (
        !isEmptyOrSpaces(email) &&
        email.includes("@") &&
        email.includes(".") &&
        !creationForm.subscriptionEmails.includes(email)
      ) {
        creationForm["subscriptionEmails"].push(email);
        dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
        setEmail("");
      }
    }
  };

  const removeSearchFilters = (index) => {
    let creationForm = Object.assign({}, form);
    creationForm["subscriptionEmails"].splice(index, 1);
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  return (
    <div className="space-y-7 max-w-lg w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">End Date (optional)</p>
          <p className="text-gray-600">
            Do you want to schedule a campaign end date?
          </p>
        </div>
        <Switch
          icons="false"
          onChange={() =>
            addForm("hasCampaignEndDate", !form.hasCampaignEndDate)
          }
          checked={form.hasCampaignEndDate}
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
      <div className="flex justify-between items-center">
        <p className="text-gray-600">When will your campaign end?</p>
        {form.hasCampaignEndDate &&
          (endCalendar || form?.campaignEndDate ? (
            <input
              type="date"
              min={
                form.campaignStartDate
                  ? moment(form.campaignStartDate)
                      .add(1, "day")
                      .format("YYYY-MM-DD")
                  : moment().add(1, "day").format("YYYY-MM-DD")
              }
              className="rounded-[8px] h-[36px] inline-flex px-2 items-center border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
              value={form?.campaignEndDate}
              onChange={(e) => addForm("campaignEndDate", e.target.value)}
            />
          ) : (
            <span
              className="text-blue-500 cursor-pointer pl-[43px]"
              onClick={() => setEndCalendar(true)}
            >
              Choose
            </span>
          ))}
      </div>
      <p className="text-gray-400">
        On this date, your campaign will automatically pause and no longer track
        for new media. If you don't set an end date, MightyScout will keep
        tracking until you manually pause this campaign.
      </p>
      <div>
        <p className="font-semibold">Email Notifications (optional)</p>
        <p className="text-gray-600">
          Do you or other teammates want email notifications whenever your
          influencers create a new post or story?
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[12px] uppercase">
          <p className="font-semibold text-gray-800">
            subscribe to new media notifications:
          </p>
          {/* <Button
            className={`px-4 rounded-[8px] h-[30px] text-[11px] inline-flex items-center border ${
              subscribe
                ? "bg-[#7c3292] text-white"
                : "border-[#7c3292] hover:bg-[#7c3292] hover:text-white"
            } hover:opacity-80`}
            onClick={() => setSubscribe(!subscribe)}
            text={subscribe ? "Subscribed" : "Subscribe me"}
          /> */}
        </div>
        <div className="flex">
          <div className="w-full">
            <input
              className="rounded-l-[8px] border-r-0 w-full px-[1rem] h-[38px] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
              value={email}
              onChange={handleInputChange}
              onKeyDown={(e) => _handleKeyDown(e)}
              placeholder="Enter email address and press enter"
              autoComplete="off"
            />
          </div>
          <Button
            className={`px-10 rounded-r-[8px] h-[38px] text-[14px] inline-flex items-center border border-[#7c3292] hover:bg-[#7c3292] hover:text-white hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={handleAddEmail}
            disabled={
              isEmptyOrSpaces(email) ||
              !email.includes("@") ||
              !email.includes(".")
            }
            text="+Add"
          />
        </div>
        <div className="max-w-[500px] flex flex-wrap gap-2">
          {form.subscriptionEmails &&
            form.subscriptionEmails.length > 0 &&
            form.subscriptionEmails.map((email, index) => (
              <div
                className="bg-[#f7f7f7] flex rounded-full w-fit px-[1rem] py-[0.5rem] cursor-pointer items-center"
                key={index}
              >
                <p className="text-[12px]">{email}</p>
                <IoCloseCircle
                  className="purple ml-2"
                  size={18}
                  onClick={() => removeSearchFilters(index)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Step4;
