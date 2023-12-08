import AnalyticsVerifyToken from "@container/brands/AnalyticsVerifyToken";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function GmailVerifyTokenScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  return (
    <AnalyticsVerifyToken
      navigate={navigate}
      params={query.get("code")}
      error={query.get('error')}
      search={search}
    />
  );
}
