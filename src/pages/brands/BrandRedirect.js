import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
const BrandRedirect = () => {
  useEffect(() => {
    redirect("/brand/login");
  }, []);
};
export default BrandRedirect;
