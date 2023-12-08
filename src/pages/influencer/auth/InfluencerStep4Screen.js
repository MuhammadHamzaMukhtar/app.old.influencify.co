import InfluencerStep4 from "@container/influencer/auth/InfluencerStep4";
import { useNavigate } from "react-router-dom";
export default function InfluencerStep4Screen() {
  const navigate = useNavigate();
  return <InfluencerStep4 navigate={navigate} />;
}
