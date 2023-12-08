import React, { Fragment, useEffect, useRef, useState } from "react";
import { actions } from "@store/redux/BrandReportsRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import WelcomePage from "./WelcomePage";
import { FaSpinner } from "react-icons/fa";
import Reports from "./Reports";
import Header from "./Header";
import Button from "@components/global/Button";
import Popup from "@components/Popup";
import Pagination from "@components/Pagination";
import Loader from "@components/global/Loader";
import { Helmet } from "react-helmet";

const BrandReportsAndTracking = () => {
  const dispatch = useDispatch();
  const deletePopupRef = useRef(null);
  const [checkBox, setCheckBox] = useState({});
  const reports = useSelector((state) => state.BrandReports.reportDetail);
  const loader = useSelector((state) => state.BrandReports.isReportFetching);
  const isLoading = useSelector((state) => state.BrandReports.isReportFetching);
  const loadMore = useSelector((state) => state.BrandReports.isReportLoadMore);
  const isReportDeleting = useSelector(
    (state) => state.BrandReports.isReportDeleting
  );

  useEffect(() => {
    actions.fetchBrandReports(dispatch);
  }, []);

  const deletSelectedReports = async () => {
    const selectedReports = Object.entries(checkBox)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    let query = {
      selectedReports: selectedReports,
    };
    await actions.deleteBrandReports(dispatch, query);
    setCheckBox({});
    deletePopupRef.current.close();
  };

  const onPageChanged = (pageData) => {
    actions.fetchBrandReports(dispatch, {
      page: pageData.currentPage,
    });
  };

  const url = window.location.href;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reporting | Influencify</title>
        <link rel="canonical" href={url} />
      </Helmet>
      <div className="mb-12">
        <div className="bg-white shadow-[0px_4px_5px_#96969640]">
          <Header />
        </div>
        <div className="containers">
          {!loader &&
            Object.values(checkBox).some((value) => value === true) && (
              <div className="flex justify-end mt-8">
                <Button
                  className="px-12 rounded-[8px] h-[36px] text-[14px] flex items-center bg--purple text-white hover:opacity-80"
                  onClick={() =>
                    deletePopupRef.current.open({ title: "Are you sure?" })
                  }
                  text="Delete"
                />
              </div>
            )}
          <div className="shadow-[0px_4px_5px_#96969640] bg-white rounded-[8px] mt-12 relative min-h-[50vh]">
            {loader ? (
              <div className="flex items-center justify-center h-[70vh]">
                <FaSpinner
                  size={66}
                  className="animate-[spin_2s_linear_infinite] pink mx-auto"
                />
              </div>
            ) : (
              <>
                {reports && (reports.data || []).length > 0 ? (
                  <>
                    <Reports checkBox={checkBox} setCheckBox={setCheckBox} />
                    {(reports.total || 0) > 10 && (
                      <div className="inline-flex items-center justify-center m-6">
                        {!isLoading && (reports.total || 0) > 10 && (
                          <Pagination
                            totalRecords={Math.min(reports.total || 0, 10000)}
                            pageLimit={10}
                            pageNeighbours={10}
                            onPageChanged={onPageChanged}
                          />
                        )}
                        {reports &&
                          !isLoading &&
                          (reports.data || []).length > 0 &&
                          loadMore && <Loader size="20" />}
                      </div>
                    )}
                  </>
                ) : (
                  <WelcomePage />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Report Popup */}
      <Popup ref={deletePopupRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <p>Are you sure to delete the selected report(s)?</p>
        </div>
        <div className="multi-buttons pt-3 flex justify-end gap-x-5">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => deletePopupRef.current.close()}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2"
            onClick={deletSelectedReports}
            disabled={isReportDeleting}
            text={
              isReportDeleting ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "Delete"
              )
            }
          />
        </div>
      </Popup>
    </>
  );
};

export default BrandReportsAndTracking;
