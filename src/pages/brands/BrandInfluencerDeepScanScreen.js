import BrandInfluencerDeepScan from "@container/brands/BrandInfluencerDeepScan";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

export default function BrandInfluencerDeepScanScreen() {
	const params = useParams();
	const dispatch = useDispatch();
	return <BrandInfluencerDeepScan id={params.id} platform={params.platform} dispatch={dispatch} />;
}
