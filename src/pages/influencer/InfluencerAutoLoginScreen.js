import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Influencify from "../../constants/Influencify";
import store from "@store/index";

export default function InfluencerAutoLoginScreen() {
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl");

    useEffect(() => {

        const sendAutoLoginRequest = async () => {
            setLoader(true);
            const json = await Influencify.autoLoginInfluencer({ id: id });
            if (json.status === 200) {
                store.dispatch({
                    type: "HANDLE_INFLUENCER_LOGIN_SUCCESS",
                    payload: {
                        data: json.data,
                        redirectUrl: redirectUrl
                    },
                });
            } else {
                setMessage(json.data?.message)
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
                <p className="text-3xl text-gray-500 mt-2">{message}</p>
            </div>
        </div>
    );
}
