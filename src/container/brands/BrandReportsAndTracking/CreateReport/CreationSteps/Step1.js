import React from "react";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { types } from "@store/redux/BrandReportsRedux";

const Step1 = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.BrandReports.creationForm);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="font-medium text-[#521b4f]">Report Name*</label>
        <input
          className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
          name="reportName"
          autoFocus
          onChange={(e) => addForm(e.target.name, e.target.value)}
          value={form?.reportName}
          placeholder="Add a report name"
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium text-[#521b4f]">Description</label>
        <textarea
          name="description"
          onChange={(e) => addForm(e.target.name, e.target.value)}
          className="rounded-[8px] w-full items-center px-3 py-1 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
          placeholder="Add a description for your report"
          rows={6}
          value={form?.description}
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium text-[#521b4f]">Report Type</label>
        <Tab.Group
          defaultIndex={form?.reportType}
          onChange={(index) => {
            addForm("reportType", index);
          }}
        >
          <Tab.List className="grid lg:grid-cols-2 grid-cols-1 gap-5 items-center grow mb-[30px]">
            {/* <Tab
              className={({ selected }) =>
                classNames(
                  "rounded-[8px] h-[183px] px-10 py-6 border flex flex-col items-center gap-y-8",
                  selected && "shadow-[0px_4px_8px_#7c3292]"
                )
              }
            >
              <h2 className="text-[18px] font-medium">Manual Input</h2>
              <p className="w-48 text-center">
                Build report of already published posts
              </p>
            </Tab> */}
            <Tab
              className={({ selected }) =>
                classNames(
                  "rounded-[8px] h-[183px] px-10 py-6 border flex flex-col items-center gap-y-8",
                  selected && "shadow-[0px_4px_8px_#7c3292]"
                )
              }
            >
              <h2 className="text-[18px] font-medium">Automatic Tracking</h2>
              <p className="w-48 text-center">
                Automatically capture every new story or post that mentions your
                brands or hashtags
              </p>
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Step1;
