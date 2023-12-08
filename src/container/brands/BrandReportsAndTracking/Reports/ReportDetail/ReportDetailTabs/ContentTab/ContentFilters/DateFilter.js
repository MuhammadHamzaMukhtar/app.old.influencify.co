import AnalyticDataRange from "@container/brands/BrandDashboard/components/AnalyticDateRange/Index";
import { actions, types } from "@store/redux/BrandReportsRedux";
import moment from "moment";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiCalendarEventFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const DateFilter = () => {
  const dispatch = useDispatch();
  const [dateRangeToggle, setDateRangeToggle] = useState(false);
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const searchQuery = useSelector((state) => state.BrandReports.searchQuery);

  const onDateChange = (item) => {
    const startingDate = moment(item.startDate).format("YYYY-MM-DD");
    const endingDate = moment(item.endDate).format("YYYY-MM-DD");
    const query = Object.assign({}, searchQuery);
    query["startDate"] = startingDate;
    query["endDate"] = endingDate;
    dispatch({ type: types.HANDLE_SEARCH_QUERY, data: query });
    actions.fetchContents(dispatch, report.id, query);
  };

  return (
    <div className="relative lg:flex-grow-0 flex justify-end flex-grow">
      <button
        className="flex items-center whitespace-nowrap text-white rounded bg-gray-500 hover:bg-gray-400 px-2 py-1"
        onClick={() => {
          setDateRangeToggle(!dateRangeToggle);
        }}
      >
        <RiCalendarEventFill color="white" className="mr-2" size={17} />
        {searchQuery.startDate} - {searchQuery.endDate}{" "}
        <IoIosArrowDown size={17} color="white" />
      </button>
      {dateRangeToggle && (
        <div className="absolute top-10 right-0 z-10 border shadow-lg">
          <AnalyticDataRange
            startDate={searchQuery.startDate}
            endDate={searchQuery.endDate}
            onDateChange={onDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
