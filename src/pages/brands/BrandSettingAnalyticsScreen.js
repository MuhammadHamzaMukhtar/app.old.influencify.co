import SettingBrandAnalytics from "@container/brands/SettingBrandAnalytics";

import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function BrandSettingAnalyticsScreen() {
	const navigate = useNavigate();
	const params = useParams();
	const { search } = useLocation();
	return (
		<SettingBrandAnalytics navigate={navigate} params={params} search={search} />
	);
}
