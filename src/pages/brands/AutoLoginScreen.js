import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Influencify from "../../constants/Influencify";
import store from "@store/index";

export default function AutoLoginScreen() {
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState("");
  // const location = useLocation();
  const {id} = useParams();

  useEffect(() => {
    
    const sendAutoLoginRequest = async () =>{
        setLoader(true);
        const json = await Influencify.autoLogin({id:id});
        if(json.status==200){
            store.dispatch({
				type: "HANDLE_BRAND_LOGIN_SUCCESS",
				payload: json.data,
			});
        }
        setLoader(false);
    }
    sendAutoLoginRequest();
  }, [id]);


  

  return (
    <div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div className="text-center">
            {loader &&
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Checking request...</h1>
            }
		<div className="mt-10 flex items-center justify-center gap-x-6">{message}</div>
	</div>
	</div>
  );
}
