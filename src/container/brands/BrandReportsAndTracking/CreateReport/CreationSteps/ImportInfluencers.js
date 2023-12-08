import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import importBg from "@assets/import_bg.jpg";
import { toast } from "react-toastify";
import { actions, types } from "@store/redux/BrandReportsRedux";

const ImportInfluencers = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.BrandReports.creationForm);

  useEffect(() => {
    addForm("fileImported", true);
    submitCsvFile();
  }, []);

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const submitCsvFile = async () => {
    if (form.csvFile) {
      const formData = new FormData();
      formData.append("file", form.csvFile);
      formData.append(form.trackingPlatform, true);
      formData.append("totalInfluencers", form.trackingUsernames.length);
      const json = await actions.submitUsernameFile(dispatch, formData);
      if (json !== undefined) {
        if (json.status) {
          if (json.data.success) {
            setTimeout(() => {
              dispatch({ type: types.FILE_LOADING_SUCCESS });
            }, 5000);
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    }
  };

  return (
    <div className="space-y-10 w-[600px]">
      <h1 className="text-[20px] font-semibold">Import influencers</h1>
      {form?.isImportLoading ? (
        <>
          <div className="text-center w-[525px] mx-auto">
            <p className="font-medium">Stand by, we're collecting the data.</p>
            <p className="text-gray-700">
              We're collecting the data and creating a list for you. This might
              takes a few seconds.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={importBg} alt="import" width={500} />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2">
          <div className="space-y-3">
            <p className="bg-gray-200 p-3">Influencers added to the campaign</p>
            <p className="p-3">Influencers skipped</p>
          </div>
          <div className="space-y-3">
            <p className="bg-gray-200 p-3">
              {form.totalImportedInfluencers - form.skippedInfluencers}
            </p>
            <p className="p-3">{form.skippedInfluencers}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ImportInfluencers;
