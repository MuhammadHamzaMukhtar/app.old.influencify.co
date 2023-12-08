import InfluencerStep2 from "@container/influencer/auth/InfluencerStep2";
import { useNavigate } from "react-router-dom";
export default function InfluencerStep2Screen() {
  const navigate = useNavigate();
  return <InfluencerStep2 navigate={navigate} />;
}
