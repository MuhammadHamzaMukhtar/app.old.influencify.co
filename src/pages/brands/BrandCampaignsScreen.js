import BrandCampaigns from "@container/brands/BrandCampaigns";
import { useNavigate } from "react-router-dom";

export default function BrandCampaignsScreen() {
  const navigate = useNavigate();
  let params = new URL(document.location).searchParams;

  let name = params.get("tab") ?? 'active';

  return <BrandCampaigns name={`?tab=${name}`} navigate={navigate} />;
}
