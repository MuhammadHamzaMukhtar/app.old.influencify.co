import { useEffect } from "react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import PaymentMethod from "@components/PaymentMethod";
import SettingBrandBillingTopTab from "@components/SettingBrandBillingTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function BillingPaymentMethodScreen() {
    const { actions } = require("@store/redux/BillingRedux");
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    actions.fetchPaymentMethod(dispatch);
  }, []);

  
  return (
    <div>
       <SettingHeader />
        <SettingBrandBillingTopTab />
        <div className="containers mb-12">
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
                    <SettingBrandSidebar />
                    
                </div>
                <div className="md:col-span-9 col-span-12 md:!mt-0">
                <div className="mb-12">
                    <PaymentMethod />
                </div>
                </div>
                
            </div>
        </div>
    </div>
  );
}
