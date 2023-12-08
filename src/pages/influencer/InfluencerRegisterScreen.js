import InfluencerRegister from "@container/influencer/InfluencerRegister";
import { useNavigate } from "react-router-dom";

export default function InfluencerRegisterScreen() {
  const navigate = useNavigate();
  return <InfluencerRegister navigate={navigate} />;
}
