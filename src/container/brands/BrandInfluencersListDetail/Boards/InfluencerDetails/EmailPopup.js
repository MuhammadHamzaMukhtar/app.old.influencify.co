import Button from "@components/global/Button";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { HANDLE_CREDITS_ERRORS } from "@store/constants/action-types";
import {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions as influencerActions } from "@store/redux/InfluencerSearchRedux";
import { actions as gmailActions } from "@store/redux/CampaignRedux";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import moment from "moment";
import Popup from "@components/Popup";
import InfluencerTemplatePopup from "./InfluencerTemplatePopup";
import Select from "react-select";
import { IoCloseCircle } from "react-icons/io5";

const EmailPopup = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const templateRef = useRef();
  const confirmationRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const smtpSetting = useSelector((state) => state.smtp.form);
  const influencer = useSelector((state) => state.influencerSearch?.influencer);
  const errors = useSelector(
    (state) => state.influencerSearch.influencerEmailTemplatesErrors
  );
  const loader = useSelector(
    (state) => state.influencerSearch.isProfileLoading
  );
  const influencerEmailTemplates = useSelector(
    (state) => state.influencerSearch.influencerEmailTemplates
  );
  const currentLoggedUser = useSelector(
    (state) => state.HeaderReducer.currentLoggedUser
  );
  const gmailSetting = useSelector((state) => state.campaign.gmail_setting);
  const boardInfluencerEmails = useSelector(
    (state) => state.influencerSearch?.boardInfluencerEmails
  );

  useImperativeHandle(ref, () => ({
    open(boardId) {
      setIsOpen(true);
      fetchEmailTemplates(boardId);
    },
    close() {
      handleCloseModal();
    },
  }));

  const fetchEmailTemplates = async (boardId) => {
    const gmail = await gmailActions.fetchGmailSetting(dispatch);
    if (!currentLoggedUser.isGmailLinked) {
      setForm({
        ...form,
        emailProvider: smtpSetting,
        boardId: boardId || null,
        source: "smtp",
        to: boardId ? boardInfluencerEmails : influencer?.email,
        influencer: influencer,
        cc: false,
      });
    } else {
      setForm({
        ...form,
        emailProvider: gmail,
        boardId: boardId || null,
        source: "gmail",
        to: boardId ? boardInfluencerEmails : influencer?.email,
        influencer: influencer,
        cc: false,
      });
    }
    await influencerActions.fetchInfluencerEmailTemplates(dispatch);
  };

  const isEmptyOrSpaces = (str = "") => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const addForm = (key, value) => {
    if (key === "source") {
      if (value === "gmail") {
        setForm({ ...form, [key]: value, emailProvider: gmailSetting });
      } else if (value === "smtp") {
        setForm({ ...form, [key]: value, emailProvider: smtpSetting });
      }
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  const handleSendEmail = async () => {
    const json = await influencerActions.sendEmailToInfluencer(dispatch, form);
    if (json.data === "success") {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    confirmationRef?.current.close();
    setIsOpen(false);
    setForm({});
    setSearchValue("");
    dispatch({ type: HANDLE_CREDITS_ERRORS });
  };

  const handleSelectTemplate = (template) => {
    setSearchValue(template.title);
    setForm({
      ...form,
      id: template.id,
      subject: template.subject,
      title: template.title,
      body: template.body,
    });
  };

  const handleTemplatePopup = () => {
    if (!form?.subject || !form?.body) {
      toast.error("Kindly add subject and body");
    } else {
      templateRef?.current.open(form);
    }
  };

  const handleSearchTemplate = (value) => {
    setSearchValue(value);
    let params = {
      title: value,
    };
    influencerActions.fetchInfluencerEmailTemplates(dispatch, params);
  };

  const handleDateChange = (date) => {
    const targetDate = moment(date, "YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    const daysDifference = targetDate.diff(currentDate, "days");
    setForm({
      ...form,
      schedule: daysDifference,
      targetDate: targetDate.format("DD MMM, yyyy"),
      currentDate: currentDate,
    });
    confirmationRef?.current.open({
      title: "Schedule Email",
    });
  };

  const hanldeCancleClick = () => {
    confirmationRef?.current.close();
    if (form?.schedule) {
      delete form["schedule"];
    }
  };

  const isButtonDisabled =
    isEmptyOrSpaces(form.subject) ||
    isEmptyOrSpaces(form.body) ||
    (!form?.boardId ? isEmptyOrSpaces(form.to) : "") ||
    loader ||
    (form.cc ? isEmptyOrSpaces(form.ccEmail) : "");

  const sendingOptions = [];

  if (currentLoggedUser.isGmailLinked) {
    sendingOptions.push({
      label: "Gmail",
      value: "gmail",
    });
  }

  if (Object.keys(smtpSetting).length > 0) {
    sendingOptions.push({
      label: "Smtp",
      value: "smtp",
    });
  }

  const colourStyles = {
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        color: isSelected ? "#7d2d94" : null,
        fontWeight: isSelected ? "700" : null,
        backgroundColor: isSelected ? "#00000008" : null,
      };
    },
  };

  const removeEmail = (index) => {
    const newForm = { ...form };
    newForm.to.splice(index, 1);
    if (newForm.to.length <= 0) {
      handleCloseModal();
    }
    setForm(newForm);
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-[100]">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto h-[93vh] overflow-hidden w-[40%] rounded-[8px] bg-white">
                <Dialog.Title className="text-white text-center grow flex justify-between items-center border-b border-[#dee2e6] p-3 sticky top-0 bg-white z-10">
                  <h2 className="text-[17px] px-5 font-medium text-black">
                    Send Email
                  </h2>
                  <div
                    className="px-[12px] rounded-full mt-[2px] mr-[13px] h-[40px] w-[40px] shadow-[0px_10px_30px_#96969640] flex items-center cursor-pointer"
                    onClick={handleCloseModal}
                  >
                    <FiX size={24} className="text-black stroke-black" />
                  </div>
                </Dialog.Title>
                <div className="p-6 space-y-5 h-[82vh] overflow-y-auto">
                  <div>
                    <div className="flex justify-between">
                      <p className="font-medium">Template</p>
                      <p
                        className="text-gray-500 cursor-pointer"
                        onClick={handleTemplatePopup}
                      >
                        Save as new template
                      </p>
                    </div>
                    <Combobox onChange={(data) => handleSelectTemplate(data)}>
                      <div className="relative w-full">
                        <Combobox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 text-left focus:outline-none border border-[#22242626] h-[40px] border-none flex">
                          <Combobox.Input
                            type="text"
                            name="searchList"
                            onChange={(e) =>
                              handleSearchTemplate(e.target.value)
                            }
                            value={searchValue}
                            className="rounded-[8px] h-[36px] truncate inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] relative"
                            placeholder="Search for a template..."
                            autoComplete="off"
                          />
                          <BiSolidDownArrow
                            className="absolute top-[17px] right-[10px]"
                            size={13}
                          />
                        </Combobox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Combobox.Options className="absolute max-h-60 z-10 mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm">
                            {(influencerEmailTemplates || []).length > 0 ? (
                              influencerEmailTemplates.map((template) => (
                                <Combobox.Option
                                  key={template.id}
                                  className={`relative cursor-pointer select-none ${
                                    !isEmptyOrSpaces(searchValue) &&
                                    template.id === form?.id &&
                                    "bg-[#00000008]"
                                  } hover:bg-[#00000008] p-[.78571429rem_1.14285714rem]`}
                                  value={template}
                                >
                                  <span
                                    className={`block ${
                                      !isEmptyOrSpaces(searchValue) &&
                                      template.id === form?.id
                                        ? "purple font-semibold"
                                        : "text-gray-900 font-medium"
                                    }`}
                                  >
                                    {template.title}
                                  </span>
                                </Combobox.Option>
                              ))
                            ) : (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                No template found.
                              </div>
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>
                  <div>
                    <p className="font-medium">From</p>
                    <Select
                      options={sendingOptions}
                      isOptionSelected={true}
                      styles={colourStyles}
                      isSearchable={false}
                      defaultValue={sendingOptions[0]}
                      className="cursor-pointer"
                      onChange={(e) => addForm("source", e.value)}
                    />
                  </div>
                  <p className="font-medium">To</p>
                  {form?.boardId ? (
                    <div className="max-w-[500px] flex flex-wrap gap-2">
                      {(form.to || []).length > 0 &&
                        (form.to || []).map((email, index) => (
                          <div
                            className="bg-[#f7f7f7] flex rounded-full w-fit px-[1rem] py-[0.5rem] cursor-pointer items-center"
                            key={index}
                          >
                            <p className="text-[12px]">{email}</p>
                            <IoCloseCircle
                              className="purple ml-2"
                              size={18}
                              onClick={() => removeEmail(index)}
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        name="to"
                        onChange={(e) => addForm(e.target.name, e.target.value)}
                        value={form?.to}
                        className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      />
                      {errors && errors?.to && (
                        <p className="text-red-500">{errors.to[0]}</p>
                      )}
                    </div>
                  )}
                  {!form?.boardId && (
                    <>
                      <div>
                        <label
                          htmlFor="cc"
                          className="cursor-pointer inline-flex items-center text-[15px] font-normal uppercase"
                        >
                          <input
                            id="cc"
                            type="checkbox"
                            onChange={(e) => addForm("cc", e.target.checked)}
                            className="hidden peer"
                          />
                          <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
                          cc & bcc
                        </label>
                        {errors && errors?.cc && (
                          <p className="text-red-500">{errors.cc[0]}</p>
                        )}
                      </div>
                      {form?.cc && (
                        <div>
                          <p className="font-medium">CC Email</p>
                          <input
                            type="text"
                            name="ccEmail"
                            onChange={(e) =>
                              addForm(e.target.name, e.target.value)
                            }
                            value={form?.ccEmail}
                            className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                          />
                          {errors && errors?.ccEmail && (
                            <p className="text-red-500">{errors.ccEmail[0]}</p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  <div className="border-b-2 pb-2"></div>
                  <div>
                    <p className="font-medium">Subject</p>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Type a subject for your email"
                      onChange={(e) => addForm(e.target.name, e.target.value)}
                      value={form?.subject || ""}
                      className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                    />
                    {errors && errors?.subject && (
                      <p className="text-red-500">{errors.subject[0]}</p>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Body</p>
                    <ReactQuill
                      onChange={(editor) => addForm("body", editor)}
                      value={form?.body || ""}
                      className="h-[300px]"
                    />
                    {errors && errors?.body && (
                      <p className="text-red-500">{errors.body[0]}</p>
                    )}
                  </div>
                  <div className="multi-buttons pt-16 border-[#e5e7eb] flex items-center justify-end">
                    <DatePicker
                      onChange={handleDateChange}
                      customInput={
                        <button
                          className={`${
                            isButtonDisabled && "cursor-not-allowed"
                          } px-6 border rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2`}
                        >
                          <AiOutlineClockCircle size={20} className="mr-3" />
                          {"Delivery Schedule"}
                        </button>
                      }
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      isClearable
                      dropdownMode="select"
                      dateFormat="yyyy-MM-dd"
                      disabled={isButtonDisabled}
                      minDate={new Date().setDate(new Date().getDate() + 1)}
                    />
                    <Button
                      className={`${
                        isButtonDisabled && "cursor-not-allowed"
                      } px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-70 mt-2 ml-4`}
                      onClick={handleSendEmail}
                      disabled={isButtonDisabled}
                      text={
                        !form?.schedule && loader ? (
                          <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                        ) : (
                          "Send Now"
                        )
                      }
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Save Template Popup */}
      <InfluencerTemplatePopup ref={templateRef} />

      {/* Email Confirmation Popup */}
      <Popup ref={confirmationRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <h1 className="text-bold text-xl">Confirmation</h1>
          <p>Are you sure to schedule your email at {form?.targetDate} ?</p>
          {errors && (
            <div className="text-red-500">
              {errors.to && <p>{errors.to[0]}</p>}
              {errors.cc && <p>{errors.cc[0]}</p>}
              {errors.body && <p>{errors.body[0]}</p>}
              {errors.from && <p>{errors.from[0]}</p>}
              {errors.ccEmail && <p>{errors.ccEmail[0]}</p>}
              {errors.subject && <p>{errors.subject[0]}</p>}
            </div>
          )}
        </div>
        <div className="text-right multi-buttons border-0 border-t pt-3 border-[#e5e7eb]">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={hanldeCancleClick}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
            onClick={handleSendEmail}
            text={
              loader ? (
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
});

export default EmailPopup;
