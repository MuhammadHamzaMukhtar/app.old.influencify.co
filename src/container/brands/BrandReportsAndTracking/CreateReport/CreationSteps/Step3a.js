import { Combobox, Transition } from "@headlessui/react";
import { types } from "@store/redux/BrandReportsRedux";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions } from "@store/redux/BrandListRedux";

const Step3a = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.BrandReports.creationForm);
  const [selectedList, setSelectedList] = useState({
    list_id: form?.selectedListId,
    board_id: form?.selectedBoardId,
  });
  const brandLists = useSelector((state) => state.brandList.brandlists);
  const listBoards = useSelector((state) => state.brandList.listBoards);

  useEffect(() => {
    if (form.listImported) {
      fetchBrandLists();
    }
  }, []);

  const addForm = (key, value) => {
    const creationForm = Object.assign({}, form);
    creationForm[key] = value;
    dispatch({ type: types.HANDLE_SAVE_FORM, form: creationForm });
  };

  const handleSelectList = (data) => {
    setSelectedList({ list_id: data.id, list_name: data.list_name });
    addForm("selectedListId", data.id);
    actions.fetchListBoards(dispatch, data.id);
  };

  const fetchBrandLists = () => {
    let query = {
      platform: form.trackingPlatform,
    };
    actions.fetchBrandLists(dispatch, query);
  };

  const searchBrandList = (event) => {
    setSelectedList({
      ...selectedList,
      list_name: event.target.value,
    });
    let query = {
      searchQuery: event.target.value,
      platform: form.trackingPlatform,
    };
    actions.fetchBrandLists(dispatch, query);
  };

  const handleSelectBoard = (data) => {
    setSelectedList({
      ...selectedList,
      board_id: data.id,
      board_name: data.board_name,
    });
    addForm("selectedBoardId", data.id);
  };

  return (
    <div className="space-y-10">
      <Combobox onChange={(data) => handleSelectList(data)}>
        <div className="relative w-full">
          <Combobox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 text-left focus:outline-none border border-[#22242626] h-[40px] border-none">
            <Combobox.Input
              type="text"
              name="searchList"
              onChange={(e) => searchBrandList(e)}
              value={selectedList?.list_name}
              className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
              placeholder="Search List"
              autoComplete="off"
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute max-h-[100px] z-10 mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm">
              {brandLists && brandLists.length > 0 ? (
                brandLists.map((list) => (
                  <Combobox.Option
                    key={list.id}
                    className={`relative cursor-pointer select-none ${
                      list.id === selectedList.list_id && "bg-[#00000008]"
                    } hover:bg-[#00000008] p-[.78571429rem_1.14285714rem]`}
                    value={list}
                  >
                    <span
                      className={`block ${
                        list.id === selectedList.list_id
                          ? "purple font-semibold"
                          : "text-gray-900 font-medium"
                      }`}
                    >
                      {list.list_name} ({list.listInfluencersCount})
                    </span>
                  </Combobox.Option>
                ))
              ) : (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No results found.
                </div>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <Combobox onChange={(data) => handleSelectBoard(data)}>
        <div className="relative w-full">
          <Combobox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
            <span className="block">
              {selectedList.hasOwnProperty("board_name")
                ? selectedList.board_name
                : "Choose Board"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown
                size={12}
                className="text-black opacity-80"
                aria-hidden="true"
              />
            </span>
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute max-h-[80px] z-10 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm">
              {listBoards && listBoards.length > 0 ? (
                listBoards.map((board) => (
                  <Combobox.Option
                    key={board.id}
                    className={`relative cursor-pointer ${
                      board.id === selectedList.board_id && "bg-[#00000008]"
                    } select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem]`}
                    value={board}
                  >
                    <span
                      className={`block ${
                        board.id === selectedList.board_id
                          ? "purple font-semibold"
                          : "text-gray-900 font-medium"
                      }`}
                    >
                      {board.board_name}
                    </span>
                  </Combobox.Option>
                ))
              ) : (
                <div
                  className={`relative select-none p-[.78571429rem_1.14285714rem]`}
                >
                  <span className={`block text-gray-500 font-medium`}>
                    No Board Found
                  </span>
                </div>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Step3a;
