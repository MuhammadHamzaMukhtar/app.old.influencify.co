import BrandResetPassword from "@container/brands/auth/BrandResetPassword";
import { useParams } from "react-router-dom";

export default function BrandResetPasswordScreen() {
	const params = useParams();
	return <BrandResetPassword params={params} />;
}
