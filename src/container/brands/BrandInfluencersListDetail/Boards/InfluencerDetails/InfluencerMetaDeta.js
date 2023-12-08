import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialListIcons from "../../../../../constants/SocialListIcons";
import { AiFillStar, AiOutlineCheck, AiOutlineStar } from "react-icons/ai";
import { actions, types } from "@store/redux/InfluencerSearchRedux";
import { RxCross1 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

const InfluencerMetaDeta = () => {
  const [form, setForm] = useState({});
  const [originalForm, setOriginalForm] = useState({});
  const [rating, setRating] = useState(0);
  const [isEditing, setIsEditing] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.influencerSearch?.influencer);
  const errors = useSelector(
    (state) => state.influencerSearch?.influencerErrors
  );
  const currentList = useSelector((state) => state.brandList.current_list);

  useEffect(() => {
    setForm(data);
    setOriginalForm(data);
    setRating(data?.rating);
  }, [data]);

  const addForm = (e) => {
    let form = Object.assign({}, data);
    form[e.target.name] = e.target.value;
    form["update"] = { key: e.target.name, value: e.target.value };
    setForm(form);
  };

  const handleSaveForm = async () => {
    const result = await actions.saveInfluencer(dispatch, form);
    if (result.status !== 403) {
      setIsEditing({});
    }
  };

  const handleUndo = (key) => {
    dispatch({ type: types.REMOVE_VALIDATION_ERRORS });
    setForm(data);
    setIsEditing({ [key]: false });
  };

  const renderStars = () => {
    const maxRating = 5;
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const starIcon =
        i <= rating ? (
          <AiFillStar
            color="purple"
            key={i}
            size={25}
            className="cursor-pointer"
            onClick={() => handleRating(i)}
          />
        ) : (
          <AiOutlineStar
            key={i}
            size={25}
            className="cursor-pointer hover:purple"
            onClick={() => handleRating(i)}
          />
        );

      stars.push(starIcon);
    }
    return stars;
  };

  const handleRating = (value) => {
    setRating(value);
    form["rating"] = value;
    form["update"] = { key: "rating", value: value };
    handleSaveForm();
  };

  const handleEdit = (key) => {
    setForm(originalForm);
    setIsEditing({ [key]: true });
  };

  return (
    <div className="px-10 pt-5 max-w-[27%] h-[700px] rounded-3xl bg-[#F4F4F4] shadow-[0px_4px_5px_#e8deea]">
      <div className="grid grid-cols-12 pb-12 border-b-2 border-b-gray-300 border-dashed">
        <div className="col-span-10">
          <div className=" flex flex-col justify-between items-center">
            <img
              src={data?.profile_picture}
              alt={data?.full_name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="font-semibold">{data?.full_name}</span>
            <p className="text-slate-400 text-sm">@{data?.username}</p>
          </div>
        </div>
        <span className="col-span-1">
          {SocialListIcons(currentList?.list_channel, 30)}
        </span>
      </div>
      <div className="py-5 space-y-5">
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">First Name: </span>
          <input
            className="rounded-[8px] h-[28px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none truncate"
            value={form?.first_name || ""}
            name="first_name"
            readOnly={!isEditing.first_name}
            onChange={(e) => addForm(e)}
          />
          {isEditing.first_name ? (
            <>
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("first_name")}
              />
            </>
          ) : (
            <FiEdit
              color="gray"
              className="cursor-pointer"
              onClick={() => handleEdit("first_name")}
            />
          )}
        </div>
        {errors && errors.first_name && (
          <p className="red">{errors.first_name[0]}</p>
        )}
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">Last Name: </span>
          {isEditing.last_name ? (
            <>
              <input
                className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] break-all"
                name="last_name"
                value={form?.last_name || ""}
                onChange={(e) => addForm(e)}
              />
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("last_name")}
              />
            </>
          ) : (
            <>
              <span className="rounded-[8px] w-[60%] items-center px-3 xs:text-[14px] text-[12px] break-all">
                {form?.last_name || ""}
              </span>
              <FiEdit
                color="gray"
                className="cursor-pointer"
                onClick={() => handleEdit("last_name")}
              />
            </>
          )}
        </div>
        {errors && errors.last_name && (
          <p className="red">{errors.last_name[0]}</p>
        )}
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">Email: </span>
          <input
            className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none truncate"
            name="email"
            value={form?.email || ""}
            readOnly={!isEditing.email}
            onChange={(e) => addForm(e)}
            autoComplete="off"
          />
          {isEditing.email ? (
            <>
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("email")}
              />
            </>
          ) : (
            <FiEdit
              color="gray"
              className="cursor-pointer"
              onClick={() => handleEdit("email")}
            />
          )}
        </div>
        {errors && errors.email && <p className="red">{errors.email[0]}</p>}
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">Phone: </span>
          <input
            className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none truncate"
            name="phone"
            type="number"
            value={parseInt(form?.phone) || ""}
            readOnly={!isEditing.phone}
            onChange={(e) => addForm(e)}
          />
          {isEditing.phone ? (
            <>
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("phone")}
              />
            </>
          ) : (
            <FiEdit
              color="gray"
              className="cursor-pointer"
              onClick={() => handleEdit("phone")}
            />
          )}
        </div>
        {errors && errors.phone && <p className="red">{errors.phone[0]}</p>}
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">PayPal ID: </span>
          <input
            className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none truncate"
            name="paypal_email"
            value={form?.paypal_email || ""}
            readOnly={!isEditing.paypal_email}
            onChange={(e) => addForm(e)}
          />
          {isEditing.paypal_email ? (
            <>
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("paypal_email")}
              />
            </>
          ) : (
            <FiEdit
              color="gray"
              className="cursor-pointer"
              onClick={() => handleEdit("paypal_email")}
            />
          )}
        </div>
        {errors && errors.paypal_email && (
          <p className="red">{errors.paypal_email[0]}</p>
        )}
        <div className="bg-white p-3 rounded-xl flex gap-x-3 items-center">
          <span className="text-gray-500 pr-8">Rating: </span>
          {renderStars()}
        </div>
        <div className="bg-white p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-500">Fixed Pay: </span>
          <input
            className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none truncate"
            name="fixed_pay"
            type="number"
            value={form?.fixed_pay || ""}
            readOnly={!isEditing.fixed_pay}
            onChange={(e) => addForm(e)}
          />
          {isEditing.fixed_pay ? (
            <>
              <AiOutlineCheck
                className="cursor-pointer"
                color="gray"
                onClick={handleSaveForm}
              />
              <RxCross1
                className="cursor-pointer"
                color="gray"
                onClick={() => handleUndo("fixed_pay")}
              />
            </>
          ) : (
            <FiEdit
              color="gray"
              className="cursor-pointer"
              onClick={() => handleEdit("fixed_pay")}
            />
          )}
        </div>
        {errors && errors.fixed_pay && (
          <p className="red">{errors.fixed_pay[0]}</p>
        )}
        {/* <div className='bg-white p-3 rounded-xl flex justify-between items-center'>
                                                <span className='text-gray-500'>Affiliate: </span>
                                                <input
                                                    className="rounded-[8px] h-[25px] w-[60%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px] read-only:border-none"
                                                    value={data?.fixed_pay}
                                                    readOnly
                                                // onChange={(e) => handleSearchFilters("url", e.target.value)}
                                                />
                                                <FiEdit color='gray' />
                                            </div> */}
      </div>
    </div>
  );
};

export default InfluencerMetaDeta;
