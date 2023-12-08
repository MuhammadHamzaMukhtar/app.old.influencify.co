import BrandRegister from "@container/brands/auth/BrandRegister";

import { useNavigate } from "react-router-dom";

export default function BrandRegisterScreen() {
	const navigate = useNavigate();
	return <BrandRegister navigate={navigate} />;
}
