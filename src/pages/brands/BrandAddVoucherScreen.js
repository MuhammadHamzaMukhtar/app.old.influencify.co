import BrandAddVoucher from "@container/brands/BrandAddVoucher";
import { useNavigate } from "react-router-dom";

export default function BrandAddVoucherScreen() {
  const navigate = useNavigate();
  return <BrandAddVoucher navigate={navigate} />;
}
