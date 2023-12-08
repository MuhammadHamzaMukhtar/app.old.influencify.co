import BrandReportDetail from "@container/brands/BrandReportsAndTracking/Reports/ReportDetail";
import { actions } from "@store/redux/BrandReportsRedux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function BrandReportDetailScreen() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    actions.fetchReportDetail(dispatch, params.id);
  }, [params.id]);

  return <BrandReportDetail />;
}
