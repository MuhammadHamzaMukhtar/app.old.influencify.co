import { types } from "@store/redux/BrandReportsRedux";
import React, { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { MdMusicNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";

const Step3 = () => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const form = useSelector((state) => state.BrandReports.creationForm);

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isSelected ? "#7d2d94" : null,
        fontWeight: isSelected ? "700" : null,
        fontSize: "16px",
        backgroundColor: isSelected ? "#00000008" : null,
      };
    },
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        border: 0,
        boxShadow: null,
      };
    },
    indicatorSeparator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
  };

  const platforms = [
    // {
    //   label: "Instagram",
    //   value: "instagram",
    //   icon: <AiOutlineInstagram size={20} />,
    // },
    // {
    //   label: "Youtube",
    //   value: "youtube",
    //   icon: <BsYoutube size={15} />,
    // },
    {
      label: "Tiktok",
      value: "tiktok",
      icon: <MdMusicNote size={18} />,
    },
  ];

  const customOption = ({ innerProps, label, data }) => (
    <div {...innerProps} className="flex items-center gap-x-2 cursor-pointer">
      {data.icon}
      <span className="text-[13]">{label}</span>
    </div>
  );

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if ((form.trackingUsernames || []).length >= 3) {
        toast.error("Max usernames limit is 3");
      } else {
        let tagName = tag;
        if (tag.startsWith("@")) {
          tagName = tag.substring(1);
        }
        if (
          !isEmptyOrSpaces(tagName) &&
          !(form.trackingUsernames || []).includes(tagName)
        ) {
          addForm(e.target.name, tagName);
          setTag("");
        }
      }
    }
  };

  const removeSearchFilters = (index) => {
    let creationForm = Object.assign({}, form);
    creationForm["trackingUsernames"].splice(index, 1);
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const addForm = (key, value) => {
    const creationForm = Object.assign({ trackingUsernames: [] }, form);
    if (key === "trackingUsernames") {
      creationForm.trackingUsernames.push(value);
    } else if (key === "clear") {
      creationForm["trackingUsernames"] = [];
    } else {
      creationForm[key] = value;
    }
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const selectedPlatform = platforms.find(
    (platform) => platform.value === form.trackingPlatform
  );

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\s/g, "");
    setTag(inputValue);
  };

  return (
    <div className="space-y-4">
      <div className="w-full max-w-xl text-slate-600 text-[16px]">
        <p className="inline-flex items-center">
          <span>add the </span>
          <span className="inline-flex items-center ml-2 border-b-2 border-slate-600">
            {selectedPlatform.icon}
            <Select
              options={platforms}
              styles={colourStyles}
              isSearchable={false}
              defaultValue={selectedPlatform}
              className="inline-flex min-w-[120px]"
              components={{ Option: customOption }}
              onChange={(e) => addForm("trackingPlatform", e.value)}
            />{" "}
          </span>
        </p>
        <span> usernames you want to track and click </span>
        <span className="font-semibold">Enter</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="inline-flex justify-end">
          <span
            className="pr-2 cursor-pointer text-blue-500"
            onClick={() => addForm("clear", "")}
          >
            Clear
          </span>
        </div>
        <div className="rounded-[8px] h-[200px] max-w-[605px] px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da]">
          <div className="flex flex-wrap items-center gap-2">
            {(form.trackingUsernames || []).length > 0 &&
              form.trackingUsernames.map((tag, index) => (
                <div
                  className="bg-[#f7f7f7] flex rounded-full w-fit px-[1rem] py-[0.5rem] cursor-pointer items-center"
                  key={index}
                >
                  <p className="text-[12px]">{`@${tag}`}</p>
                  <IoCloseCircle
                    className="purple ml-2"
                    size={18}
                    onClick={() => removeSearchFilters(index)}
                  />
                </div>
              ))}
            <input
              className="rounded-[5px] w-36 h-[30px] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
              name="trackingUsernames"
              value={tag}
              onChange={handleInputChange}
              onKeyDown={(e) => _handleKeyDown(e)}
              placeholder="@username"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
