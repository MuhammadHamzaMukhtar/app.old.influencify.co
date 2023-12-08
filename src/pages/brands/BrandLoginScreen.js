import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import BrandLogin from "@container/brands/auth/BrandLogin";
import Influencify from "@constants/Influencify";
import Popup from "@components/Popup";


export default function BrandLoginScreen() {
    const {search} = useLocation();
    const navigate = useNavigate();
    let query = new URLSearchParams(search);
    const shop = query.get("shop");
	
    const popupRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [isShopify, setIsShopify] = useState(false);
    const [data, setData] = useState({});

    const authRedirect = async () => {
        if(shop){
            setIsShopify(true);
            const json  = await Influencify.shopifyInstall({shop});
            if(json.status==200){
                setData(json.data);
                if(json.data?.status){
                    window.location.href = json.data?.url;
                } else {
                    popupRef?.current?.open({
                        title:"Attention required",
                        description:json.data?.message,
                    })
                    
                }
            }
        } else {
            if (localStorage.getItem("isLogin")) {
                navigate("/dashboard");
            }
        }
		
	}

    const cancelSubscription = async () => {
        setLoading(true);
		const json = await Influencify.cancelSubscriptionNow({});
		setLoading(false);
		if(json.status==200){
			toast.success(json.data);
			popupRef?.current?.close();
            window.location.href = data?.url;
		}
    }

    const close = () => {
        popupRef?.current?.close();
        navigate("/dashboard");
    }

    useEffect(()=> {
        authRedirect();
    }, []);
	return <>
    <Popup ref={popupRef} onClose={() => { }}>
				<div className="flex gap-2">
				<button disabled={loading} onClick={cancelSubscription} className={`self-end mt-4 mb-4 w-full bg--purple  py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center`}>{loading?"Cancel...":"Cancel Subscription"}</button>

				<button onClick={close} className={`self-end mt-4 mb-4 w-full bg-gray-400  py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center`}>No</button>
				</div>
            </Popup>
        {!isShopify && <BrandLogin />}
    </>;
}
