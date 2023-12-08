import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";

export default function AnalyticDataRange({
  startDate,
  endDate,
  onDateChange,
}) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: moment(startDate).toDate(),
      endDate: moment(endDate).toDate(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setDateRange([
      {
        startDate: moment(startDate).toDate(),
        endDate: moment(endDate).toDate(),
        key: "selection",
      },
    ]);
  }, [startDate, endDate]);
  return (
    <>
      <div>
        <DateRangePicker
          onChange={(item) => onDateChange(item.selection)}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateRange}
          rangeColors={["#7f3a94", "#7f3a94", "#7f3a94"]}
          direction="horizontal"
          maxDate={new Date()}
        />
      </div>
    </>
  );
}
