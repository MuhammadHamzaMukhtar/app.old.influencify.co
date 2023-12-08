import { types } from "@store/redux/BrandReportsRedux";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";

const Step3b = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.BrandReports.creationForm);

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const removeFile = () => {
    addForm("csvFile", "");
  };

  return (
    <div className="space-y-5">
      <div>
        <span>Upload a file you wish to import.</span>
        <span className="font-semibold">
          The file should have @handles or profile URLs in column A.
        </span>
      </div>
      {form?.csvFile ? (
        <div className="flex items-center justify-center flex-col">
          <div className="text-center">
            <RiFileExcel2Fill className="gray" size={50} />
          </div>
          <div className="text-center">
            <p className="gray">
              {form.csvFile ? form.csvFile.name : "unknown"}
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={removeFile}
              className="px-6 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80"
            >
              Remove file
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[url('@assets/uploader_bg.jpg')] bg-center bg-[length:100%_100%] bg-no-repeat mb-6">
          <label htmlFor="icon-button-file" className="w-full relative">
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="icon-button-file"
              type="file"
              onChange={(e) => addForm("csvFile", e.target.files[0])}
              className="absolute h-full w-full z-1 opacity-0 block cursor-pointer"
            />
            <div className="bg-transparent h-[14rem] w-full flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <IoCloudUploadOutline className="gray" size={50} />
                <p className="gray">
                  Drag and drop a file here or select a file to upload.
                </p>
                <p className="gray">Only .csv file types are supported.</p>
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default Step3b;
