import InfluencerBookingID from "@container/influencer/InfluencerBookingID";
import { useLocation, useParams } from "react-router-dom";

export default function InfluencerBookingIDScreen() {
	const params = useParams();
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const tab = searchParams.get("tab");
	return <InfluencerBookingID params={params} tab={tab} />;
}
