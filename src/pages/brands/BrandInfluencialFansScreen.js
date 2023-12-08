import BrandInfluencialFans from "@container/brands/BrandInfluencialFans";
import { Navigate, useParams } from "react-router-dom";

export default function BrandInfluencialFansScreen() {
  const { platform } = useParams();
  const allowedPlatforms = ["tiktok", "youtube"];
  if (!allowedPlatforms.includes(platform)) {
    return <Navigate to="/error" />;
  }
  return <BrandInfluencialFans platform={platform} />;
}
