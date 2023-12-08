import BrandAddProduct from "@container/brands/BrandAddProduct";
import { useNavigate } from "react-router-dom";

export default function BrandAddProductScreen() {
	const Navigate = useNavigate();
	return <BrandAddProduct Navigate={Navigate} />;
}
