import BrandInvitation from "@container/brands/BrandInvitation";
import { useParams } from "react-router-dom";

export default function BrandInvitationScreen() {
    const params = useParams();
    return <BrandInvitation params={params} />;
}
