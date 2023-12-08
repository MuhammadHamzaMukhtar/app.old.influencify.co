import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Reports = ({ checkBox, setCheckBox }) => {
  const reports = useSelector((state) => state.BrandReports.reportDetail);

  const checkBoxValues = Object.values(checkBox);

  const handleCheckAll = () => {
    const updatedCheckBox = {};
    const allChecked =
      checkBoxValues.length > 0
        ? checkBoxValues.every((value) => value)
        : false;

    reports.data.forEach((report) => {
      updatedCheckBox[report.id] = !allChecked;
    });

    setCheckBox(updatedCheckBox);
  };

  const handleCheckBoxChange = (reportId) => {
    setCheckBox((prevCheckBox) => ({
      ...prevCheckBox,
      [reportId]: !prevCheckBox[reportId],
    }));
  };

  return (
    <div className="flex flex-col border-b-2">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="h-[60vh]">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr className="divide-x divide-gray-200 uppercase text-sm">
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        checked={
                          checkBoxValues.length >= reports.data.length
                            ? checkBoxValues.every((value) => value === true)
                            : false
                        }
                        onChange={handleCheckAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label for="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 font-medium tracking-wider text-left text-gray-700"
                  >
                    report name
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 font-medium tracking-wider text-left text-gray-700"
                  >
                    no of publications
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 font-medium tracking-wider text-left text-gray-700"
                  >
                    no of profiles
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 font-medium tracking-wider text-left text-gray-700"
                  >
                    creation date
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 font-medium tracking-wider text-left text-gray-700"
                  >
                    description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 h-16 overflow-auto">
                {reports && (reports.data || []).length > 0 ? (
                  reports.data.map((report) => (
                    <tr className="hover:bg-gray-100">
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            checked={checkBox?.[report.id] || false}
                            onChange={() => handleCheckBoxChange(report.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <label for="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <Link to={`/report/${report.id}`}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {report.report_name}
                        </td>
                      </Link>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {report.publishedContentCount}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {report.reportCreatorsCount}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {moment
                          .utc(report.created_at)
                          .local()
                          .format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {report.description || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <td
                    colSpan="6"
                    className="text-center w-full pt-4 px-[1rem] justify-center text-[#bbb] text-[25px] font-medium leading-[40px]"
                  >
                    No Report Found
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
