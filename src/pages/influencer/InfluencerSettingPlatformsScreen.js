import InfluencerSettingPlatforms from "@container/influencer/InfluencerSettingPlatforms";
import { useLocation } from "react-router-dom";

export default function InfluencerSettingPlatformsScreen() {
    const location = useLocation();
    return <InfluencerSettingPlatforms  errors={location.state}/>;
}
