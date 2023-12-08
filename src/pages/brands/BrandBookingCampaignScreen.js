import BrandBookingCampaign from "@container/brands/BrandBookingCampaign";
import { useNavigate, useParams } from "react-router-dom";

export default function BrandBookingCampaignScreen() {
	const params = useParams();
	const navigate = useNavigate();
	let param = new URL(document.location).searchParams;
	let name = param.get("tab");
	let subTab = param.get("subTab");

	return (
		<BrandBookingCampaign
			id={params.id}
			navigate={navigate}
			name={`?tab=${name}`}
			subTab={subTab}
		/>
	);
}
