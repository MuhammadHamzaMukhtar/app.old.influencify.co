import React from "react";
import ReportDetailHeader from "./ReportDetailHeader";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import ReportDetailTabs from "./ReportDetailTabs";
import { Helmet } from "react-helmet";

const BrandReportDetail = () => {
  const isLoading = useSelector((state) => state.BrandReports.isReportFetching);
  const url = window.location.href;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reporting | Influencify</title>
        <link rel="canonical" href={url} />
      </Helmet>
      <div className="bg-white shadow-[0px_4px_5px_#96969640] my-10 lg:mx-24 md:mx-12 mx-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[78vh]">
            <FaSpinner
              size={66}
              className="animate-[spin_2s_linear_infinite] pink mx-auto"
            />
          </div>
        ) : (
          <>
            <ReportDetailHeader />
            <ReportDetailTabs />
          </>
        )}
      </div>
    </>
  );
};

export default BrandReportDetail;
