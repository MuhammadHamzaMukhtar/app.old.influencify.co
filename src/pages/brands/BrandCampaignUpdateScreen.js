import BrandCampaignUpdate from "@container/brands/BrandCampaignUpdate";
import { useParams } from "react-router-dom";
export default function BrandCampaignUpdateScreen() {
  const params = useParams();

  return <BrandCampaignUpdate id={params.id} />;
}
