import BrandMonitoringNewCampaign from "@container/brands/BrandMonitoringNewCampaign";
import { useNavigate } from "react-router-dom";

export default function BrandMonitoringNewCampaignScreen() {
    const navigate = useNavigate();
    return <BrandMonitoringNewCampaign navigate={navigate} />;
}
