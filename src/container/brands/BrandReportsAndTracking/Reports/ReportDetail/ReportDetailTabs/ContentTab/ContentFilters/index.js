import React from "react";
import GroupByFilters from "./GroupByFilters";
import DateFilter from "./DateFilter";
import { actions, types } from "@store/redux/BrandReportsRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ContentFilters = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const searchQuery = useSelector((state) => state.BrandReports.searchQuery);

  const handleSearchFilters = (user) => {
    const query = Object.assign({}, searchQuery);
    query["username"] = user;
    dispatch({ type: types.HANDLE_SEARCH_QUERY, data: query });
    actions.fetchContents(dispatch, report.id, query);
  };

  return (
    <div className="flex justify-between flex-wrap gap-3 items-center">
      <div className="grid lg:grid-col-2 md:grid-cols-2 grid-cols-1 gap-3 gap-x-9">
        <GroupByFilters />
        <div className="flex gap-x-3 w-full items-center">
          <span> Creator lookup:</span>
          <input
            type="text"
            placeholder="@username"
            className="rounded-[8px] h-[40px] px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
            onChange={(e) => handleSearchFilters(e.target.value)}
            value={searchQuery.username}
          />
        </div>
      </div>
      <DateFilter />
    </div>
  );
};

export default ContentFilters;
