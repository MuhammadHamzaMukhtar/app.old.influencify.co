import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Middleware = () => {
	let token = localStorage.getItem("access-token");
	let role = localStorage.getItem("role");
	const navigate = useNavigate();
	const {pathname} = useLocation();
	const allowedPaths = ["/billing", "/billing/credit", "/billing/payment-method",  "/billing/invoice"];
	
	const user = useSelector((state)=>state.HeaderReducer.refreshData);

	useEffect(() => {
		
		if (token) {
			if ("is_main" in (user || {}) && role == "brand" && "remainingCredits" in (user || {})){
				if(user?.identifier != "sub_account"){

					if(!allowedPaths.includes(pathname)){
						if(!user?.is_appsumo){
							if(!user?.is_subscribed){
								navigate("/billing");
								toast.error('Upgrade your plan to see features!')
							} else {
								if(user?.remainingCredits<1){
									navigate("/billing/credit");
									toast.error('Upgrade your credits to see features!')
								}
							}
						}
					}
				}
				
				
			}	
		}
	  }, [token, pathname, user]);

	return <></>
};

export default Middleware;
