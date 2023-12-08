import Button from "@components/global/Button";
import Tooltip from "@components/global/Tooltip";
import { types } from "@store/redux/BrandReportsRedux";
import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Step2 = () => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const form = useSelector((state) => state.BrandReports.creationForm);

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    let creationForm = Object.assign({ tags: [] }, form);
    if (creationForm.tags.length >= 7) {
      toast.error("Max tags limit is 7");
    } else {
      const validTagRegex = /[@#][^@\s#]+$/;
      if (validTagRegex.test(tag) && !creationForm.tags.includes(tag)) {
        creationForm["tags"].push(tag);
        dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
        setTag("");
      }
    }
  };

  const removeSearchFilters = (index) => {
    let creationForm = Object.assign({}, form);
    creationForm["tags"].splice(index, 1);
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\s/g, "");
    setTag(inputValue);
  };

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xl">
        <p className="font-medium text-slate-600">
          Which brands and hashtags will your influencers be using for your
          campaign?
          <span className="-mb-1 inline-block">
            <Tooltip
              trigger={
                <div className="ml-2">
                  <AiOutlineQuestionCircle size={20} />
                </div>
              }
              tooltipText={"hashtags and brands"}
              placement="top-left"
            />
          </span>
        </p>
      </div>
      <div className="flex">
        <div className="w-full">
          <input
            className="rounded-l-[8px] border-r-0 w-full px-[1rem] h-[38px] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
            name="reportName"
            value={tag}
            onChange={handleInputChange}
            onKeyDown={(e) => _handleKeyDown(e)}
            placeholder="@username or #hashtag"
            autoComplete="off"
          />
          <span className="text-sm text-gray-400">ex: @nike or #justdoit</span>
        </div>
        <Button
          className={`px-10 rounded-r-[8px] h-[38px] text-[14px] inline-flex items-center border border-[#7c3292] hover:bg-[#7c3292] hover:text-white hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed`}
          onClick={handleAddTag}
          disabled={
            isEmptyOrSpaces(tag) ||
            (!tag.startsWith("@") && !tag.startsWith("#"))
          }
          text="+Add"
        />
      </div>
      <div className="max-w-[500px] flex flex-wrap gap-2">
        {form.tags &&
          form.tags.length > 0 &&
          form.tags.map((tag, index) => (
            <div
              className="bg-[#f7f7f7] flex rounded-full w-fit px-[1rem] py-[0.5rem] cursor-pointer items-center"
              key={index}
            >
              <p className="text-[12px]">{tag}</p>
              <IoCloseCircle
                className="purple ml-2"
                size={18}
                onClick={() => removeSearchFilters(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Step2;
