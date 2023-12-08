import Button from "@components/global/Button";
import { actions, types } from "@store/redux/BrandReportsRedux";
import moment from "moment";
import React from "react";
import { BsListUl } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PopupFooter = () => {
  const form = useSelector((state) => state.BrandReports.creationForm);
  const isReportCreationLoading = useSelector(
    (state) => state.BrandReports.isReportCreationLoading
  );

  const dispatch = useDispatch();

  const handleNextStep = () => {
    if (form.step === 3 && form.fileImporting) {
      addForm("importInfluencers", true);
    } else if (form.step === 3 && form.listImported) {
      const query = {
        selectedBoardId: form.selectedBoardId,
      };
      actions.addInfluencersFromList(dispatch, query);
    } else {
      if (form.step === 4) {
        let daysDifference = 30;
        let totalCredits;
        if (form?.hasCampaignEndDate && form?.campaignStartDate) {
          const endDate = moment(form?.campaignEndDate);
          const startDate = moment(form?.campaignStartDate);
          daysDifference = endDate.diff(startDate, "days");
        }
        totalCredits = daysDifference * (form.trackingUsernames || []).length;
        if (form.trackingPlatform !== "tiktok") {
          if (form.isTrackingPosts && form.isTrackingStories) {
            totalCredits = totalCredits * 2;
          } else if (
            form.isTrackingPosts &&
            form.isTrackingStories &&
            form.isTrackingReels
          ) {
            totalCredits = totalCredits * 3;
          }
        }
        addForm("cost", totalCredits);
      }
      dispatch({ type: types.HANDLE_NEXT_STEP });
    }
  };

  const handleCancel = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "px-7 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-5",
        cancelButton:
          "px-5 rounded-[8px] h-[36px] text-[14px] inline-flex items-center border border-gray-500 bg-slate-100 hover:opacity-80",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Your changes will be reverted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: types.HANDLE_CANCEL_STEPS });
        }
      });
  };

  const isEmptyOrSpaces = (str = "") => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const handleBackToStep3 = () => {
    dispatch({ type: types.HANDLE_MOVE_TO_STEP3 });
  };

  const handleConfirmCreation = () => {
    actions.confirmReportCreation(dispatch, form);
  };

  let isButtonDisabled,
    isImportDisabled = false;

  switch (form.step) {
    case 1:
      isButtonDisabled = !form.reportName || isEmptyOrSpaces(form?.reportName);
      break;
    case 2:
      isButtonDisabled = !form.tags || form.tags.length <= 0;
      break;
    case 3:
      if (form.listImported) {
        isButtonDisabled = !form.selectedListId || !form.selectedBoardId;
      } else if (form.fileImporting) {
        isButtonDisabled = !form.csvFile;
      } else {
        switch (form.trackingPlatform) {
          case "instagram":
            isImportDisabled =
              !form.isTrackingPosts &&
              !form.isTrackingStories &&
              !form.isTrackingReels;
            break;
          case "youtube":
            isImportDisabled = !form.isTrackingReels && !form.isTrackingVideos;
            break;
          case "tiktok":
            isImportDisabled = !form.isTrackingVideos;
            break;
          default:
            break;
        }
        isButtonDisabled =
          isImportDisabled || (form.trackingUsernames || []).length <= 0;
      }
      break;
    case 4:
      isButtonDisabled =
        !form.campaignStartDate ||
        (form.hasCampaignEndDate ? !form.campaignEndDate : "");
      break;
    default:
      break;
  }

  const handleImportInfluencers = (key) => {
    if ((form.trackingUsernames || []).length >= 3) {
      toast.error("Max usernames limit is 3");
    } else {
      addForm([key], true);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 lg:justify-between justify-center pt-3">
      <Button
        className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex items-center border border-gray-500 bg-slate-100 hover:opacity-80"
        onClick={handleCancel}
        text="Cancel"
      />
      {form.step === 3 && !form.listImported && !form.fileImporting && (
        <>
          <Button
            className={`${
              (isImportDisabled || form.trackingPlatform === "instagram") &&
              "cursor-not-allowed"
            } px-5 rounded-[8px] h-[34px] text-[14px] inline-flex items-center border border-gray-500`}
            onClick={() => handleImportInfluencers("listImported")}
            text="Import from list"
            disabled={isImportDisabled || form.trackingPlatform === "instagram"}
            prefix={<BsListUl className="mr-2" size={20} />}
          />
          <Button
            className={`${
              isImportDisabled && "cursor-not-allowed"
            } px-5 ml-2 rounded-[8px] h-[34px] text-[14px] inline-flex items-center border border-gray-500`}
            onClick={() => handleImportInfluencers("fileImporting")}
            text="Import from file"
            disabled={isImportDisabled}
            prefix={<IoCloudUploadOutline className="mr-2" size={20} />}
          />
        </>
      )}
      {!form.importInfluencers ? (
        form.step === 5 ? (
          <Button
            className={`px-7 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80`}
            onClick={handleConfirmCreation}
            disabled={isReportCreationLoading}
            text={
              isReportCreationLoading ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "Confirm"
              )
            }
          />
        ) : (
          <Button
            className={`px-7 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-70`}
            onClick={handleNextStep}
            disabled={isButtonDisabled}
            prefix={
              form.step === 3 &&
              form.fileImporting && (
                <IoCloudUploadOutline className="mr-2" size={20} />
              )
            }
            text={
              form.step === 3 && form.fileImporting
                ? "Import influencers"
                : "Next"
            }
          />
        )
      ) : (
        form.totalImportedInfluencers &&
        !form.isImportLoading && (
          <Button
            className={`px-7 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-70`}
            onClick={handleBackToStep3}
            text={"Back to campaign creation"}
          />
        )
      )}
    </div>
  );
};

export default PopupFooter;
