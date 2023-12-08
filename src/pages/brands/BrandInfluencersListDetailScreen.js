import BrandInfluencersListDetail from "@container/brands/BrandInfluencersListDetail";
import { useParams } from "react-router-dom";

export default function BrandInfluencersListDetailScreen() {
	const params = useParams();
	return <BrandInfluencersListDetail id={params.id} />;
}
