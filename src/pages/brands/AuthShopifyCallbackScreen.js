import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Api from "@services/axios";
import * as settingShopifyActions from "@store/actions/SettingShopifyActions";
import * as headerActions from "@store/actions/HeaderActions";
import store from "@store/index";

export default function AuthShopifyCallbackScreen() {
	const locationn = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const search = locationn.search;
	const query = new URLSearchParams(search);

	useEffect(() => {
		const shopify = async () => {
			const data = {
				hmac: query.get("hmac"),
				shop: query.get("shop"),
				code: query.get("code"),
				timestamp: query.get("timestamp"),
			};
	
			const json = await settingShopifyActions.brandVerifyShopifyToken(data, dispatch);
			if(json.status==200){
				if(json.data?.error){
					setError(json.data?.error)
				} else if(json.data?.login){
					Api.setClientToken(json.data?.login?.access_token);

					store.dispatch({
						type: "SHOPIFY_HANDLE_LOGIN_SUBMIT",
						payload: json.data?.login,
					});
					if (json.data?.login.role === "brand") {
						window.location.href = "/dashboard";
					} else {
						window.location.href = "/influencer/dashboard";
					}
				} else if(json.data?.shop) {
					const shop = json.data?.shop;
					const shopData = json.data?.data;
					store.dispatch({
						type: "HANDLE_BULK_SUCCESS",
						payload: {
							errorsObj:{},
							displayName:shop?.name,
							email:shop?.email, 
							lock:true, 
							domain:shop?.domain, 
							access_token:shopData?.access_token, 
							scope:shopData?.scope,
							hmac:data?.hmac,
							shop:data?.shop,
							code:data?.code,
							timestamp:data?.timestamp,
						},
					});
					
					navigate("/signup");
				} else {
					dispatch(headerActions.currentLoggedInUser())
					navigate("/integration/shopify");
				}
			}
		}
		shopify();
		
	}, []);

	return  <div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div className="text-center">
		<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Shopify</h1>
		{!!error?
		<>
		<p className="mt-6 text-base leading-7 text-red-600">{error}</p>
		<Link to="/dashboard" 
		className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
 >Dashboard</Link>
		</>:
		<p className="mt-6 text-base leading-7 text-gray-600">Connecting...</p>
		}
		<div className="mt-10 flex items-center justify-center gap-x-6">
		</div>
	</div>
	</div>;
}
