import { Listbox, Transition } from "@headlessui/react";
import { actions, types } from "@store/redux/BrandReportsRedux";
import React, { Fragment } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const GroupByFilters = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const searchQuery = useSelector((state) => state.BrandReports.searchQuery);

  const sortOptions = ["Date", "Likes", "Comments", "Views"];

  const handleSearchFilters = (sort) => {
    const query = Object.assign({}, searchQuery);
    query["sortQuery"] = sort;
    dispatch({ type: types.HANDLE_SEARCH_QUERY, data: query });
    actions.fetchContents(dispatch, report.id, query);
  };

  return (
    <div className="flex items-center w-full">
      <p className="whitespace-nowrap mr-2 flex items-center">Group by:</p>

      <Listbox onChange={(data) => handleSearchFilters(data)}>
        <div className="relative w-full">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
            <span className="block">{searchQuery.sortQuery}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown
                size={12}
                className="text-black opacity-80"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-44 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-30">
              {sortOptions.map((sort, key) => (
                <Listbox.Option
                  key={key}
                  className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
                    sort === searchQuery.sortQuery
                      ? "bg-[#00000008] text-black font-semibold"
                      : "text-gray-900 font-medium"
                  }`}
                  value={sort}
                >
                  <span
                    className={`block ${
                      sort === searchQuery.sortQuery
                        ? "text-black font-semibold"
                        : "text-gray-900 font-medium"
                    }`}
                  >
                    {sort}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default GroupByFilters;
