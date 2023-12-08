import EamilVerification from "../../unusedcomponents/EamilVerification";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function EamilVerificationScreen() {
	const navigate = useNavigate();
	const params = useParams();
	const { search } = useLocation();
	return (
		<EamilVerification navigate={navigate} params={params} search={search} />
	);
}
