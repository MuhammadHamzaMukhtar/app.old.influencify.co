import InfluencerStep6 from "@container/influencer/auth/InfluencerStep6";
import { useNavigate } from "react-router-dom";

export default function InfluencerStep6Screen() {
    const navigate = useNavigate();
    return <InfluencerStep6 navigate={navigate} />;
}
