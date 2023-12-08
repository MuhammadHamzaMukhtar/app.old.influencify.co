import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BrandSettingCredit from "@container/brands/BrandSettingCredit";
import Influencify from "@constants/Influencify";
import { refreshReports } from "@store/actions/HeaderActions";
import store from "@store";
import Loader from "@components/global/Loader";

export default function BrandSettingCreditScreen() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const charge_id = params.get("charge_id");

    useEffect(()=>{
        approveCharge();
    }, []);

    const approveCharge = async () => {
        if(charge_id){
            setLoading(true);
            const json = await Influencify.approvePurchaseCredit({charge_id});
            if(json.status==200){
                if(json.data?.success){
                    toast.success(json.data.message);
                    store.dispatch(refreshReports());
                }
            }
            setLoading(false);
        }
          
    }

    return <>
    {loading? <Loader  className="h-full w-full flex justify-center items-center mt-20"
		size="40" 
		/>:
            <BrandSettingCredit navigate={navigate} />
            }
        </>
    ;
}
