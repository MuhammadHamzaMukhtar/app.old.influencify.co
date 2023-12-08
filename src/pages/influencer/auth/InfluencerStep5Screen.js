import InfluencerStep5 from "@container/influencer/auth/InfluencerStep5";
import { useNavigate } from "react-router-dom";
export default function InfluencerStep5Screen() {
  const navigate = useNavigate();
  return <InfluencerStep5 navigate={navigate} />;
}
