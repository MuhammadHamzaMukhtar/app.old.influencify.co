import BrandEditProduct from "@container/brands/BrandEditProduct";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BrandEditProductScreen() {
  const params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return <BrandEditProduct id={params.id} Navigate={Navigate} />;
}
