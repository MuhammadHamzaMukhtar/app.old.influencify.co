import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import SettingBrandTopTab from "@components/SettingBrandTopTab";
import SettingBrandAccount from "@container/brands/BrandSettingProfile/SettingBrandAccount";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AccountChangePasswordScreen() {
  const navigate = useNavigate();
  return (
    <div>
        <SettingHeader />
        <SettingBrandTopTab />
        <div className="containers mb-12">
            <div className="grid grid-cols-12 gap-5">
                <div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
                    <SettingBrandSidebar />
                    
                </div>
                <div className="md:col-span-9 col-span-12 md:!mt-0">
                <SettingBrandAccount
                navigate={navigate}
                />
                </div>
                
            </div>
        </div>
    </div>
  );
}
