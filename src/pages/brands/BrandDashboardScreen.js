import BrandDashboard from "@container/brands/BrandDashboard";
import { useNavigate } from "react-router-dom";

export default function BrandDashboardScreen() {
    const navigate = useNavigate();
    return <BrandDashboard navigate={navigate} />;
}
