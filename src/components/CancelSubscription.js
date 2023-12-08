import { FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";


const { actions } = require("@store/redux/BillingRedux");

export default function CancelSubscription() {
    const dispatch = useDispatch();
    const subscribed = useSelector((state)=>state.SettingSubscriptionReducer.subscribed);
    const onGracePeriod = useSelector((state)=>state.SettingSubscriptionReducer.onGracePeriod);
    const subscription = useSelector((state)=>state.SettingSubscriptionReducer.subscription);
    const canncelLoading = useSelector((state)=>state.billing.canncelLoading);
    const user = useSelector((state)=>Object.assign({},state.HeaderReducer?.currentLoggedUser));

    const cancelSubscription = async () => {
        const json = await actions.cancelSubscription(dispatch);
        dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
    }

    const resumeSubscription = async () => {
        const json = await actions.resumeSubscription(dispatch);
        dispatch(settingSubscriptionActions.fetchBrandSubscriptionPlans());
    }

    if(!user?.is_shopify && subscribed && subscription?.is_recurring==1 && (subscription?.stripe_status =="active"  || subscription?.stripe_status =="trialing" ) && process.env.REACT_APP_FREE_PLAN_ID!=subscription?.stripe_plan){
        return (
            <>
                <h2 className="text-[24px] black font-italic font-bold">Cancel Subscription</h2>
                <div className="p-6 bg-white sm:rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600">
                        You may cancel your subscription at any time. Once your subscription has been cancelled, you will have the option to resume the subscription until the end of your current billing cycle.
                    </div>
                    {onGracePeriod?
                    <button onClick={resumeSubscription} className="inline-flex items-center px-4 py-2 bg--purple border border-gray-300 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:text-white focus:outline-none focus:ring active:text-white transition ease-in-out duration-150 mt-4">
                        
                        {canncelLoading?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:"Resume Subscription"}

                    </button>
                    :
                    <button onClick={cancelSubscription} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:ring active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-4">
                        {canncelLoading?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:"Cancel Subscription"}
                    </button>
                    } 
                    
                </div>
            </>
        );
    }
    return null;
	
}
