import BrandJoin from "@container/brands/auth/BrandJoin";
import { useParams } from "react-router-dom";

export default function BrandJoinScreen() {
	const params = useParams();
	return <BrandJoin params={params} />;
}
