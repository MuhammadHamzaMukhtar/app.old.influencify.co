import BrandNewCampaignType from "@container/brands/BrandCampaigns/components/BrandNewCampaignType";
import { useNavigate } from "react-router-dom";
export default function BrandNewCampaignTypeScreen() {
  const navigate = useNavigate();
  return <BrandNewCampaignType navigate={navigate} />;
}
