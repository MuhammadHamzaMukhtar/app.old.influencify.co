import BrandMonitoringCampaignDetail from "@container/brands/BrandMonitoringCampaignDetail";
import { useParams } from "react-router-dom";

export default function BrandMonitoringCampaignDetailScreen() {
    const { id } = useParams();
    return <BrandMonitoringCampaignDetail campaignId={id} />;
}
