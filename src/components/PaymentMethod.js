import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { useSelector, useDispatch } from "react-redux";
import Influencify from "../constants/Influencify";

const { actions } = require("@store/redux/BillingRedux");



export default function PaymentMethod() {
 
    const dispatch = useDispatch();
    const defaultLoader = useSelector((state)=>Object.assign({},state.billing.defaultLoader));
    const deleteLoader = useSelector((state)=>Object.assign({},state.billing.deleteLoader));
    const paymentMethods = useSelector((state)=>Object.assign([],state.billing.paymentMethods));
    const defaultPaymentMethod = useSelector((state)=>Object.assign({}, state.billing.defaultPaymentMethod));
    const [loading, setLoading] = useState(false);

    const addPaymentMethod = async () => {
        setLoading(true);
        const json = await Influencify.addPaymentMethod();
        if(json.status==200){
            if(json.data?.url){
                window.location.href = json.data?.url;
            }
        }
        setLoading(false);
    }

    const setDefault = async (id) => {
        const json = await actions.setDefaultPayment(dispatch, {id:id});
        actions.fetchPaymentMethod(dispatch);
    }

    const deletePaymentMethod = async (id) => {
        const json = await actions.deletePaymentMethod(dispatch, {id:id});
        actions.fetchPaymentMethod(dispatch);
    }

	return (
		<>
			<h2 className="text-[24px] black font-italic font-bold">Payment Methods</h2>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4 rounded-t-[8px] mt-3">
           
            <dl class=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            {(paymentMethods || []).map((item,key)=>(
                <div class="flex justify-between items-center  flex-row pb-3" key={key}>
                    
                    {/* <BsCreditCard />  */}
                    <div>
                    <dd class="text-lg font-semibold">{item?.card?.brand}....{item?.card?.last4} {defaultPaymentMethod?.id==item.id && <span class="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Default</span>}</dd>
                    <dt class="mb-1 text-sm text-gray-500 dark:text-gray-400">Expires {item?.card?.exp_month}/{item?.card?.exp_year}</dt>
                    </div>
                    {defaultPaymentMethod?.id!=item.id &&
                    <div className="flex justify-between items-center  flex-row ">
                    <Button
                        disabled={loading}
                        onClick={()=>setDefault(item.id)}
                        className="px-4 rounded-[8px] h-[30px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
                        text={defaultLoader?.[item.id]?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:"Set default"}

                        />
                    <div className="cursor-pointer" onClick={()=>deletePaymentMethod(item.id)}>
                        {deleteLoader?.[item.id]?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:
                        <svg className="ml-2 h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                        }
                    </div>
                    </div>
                    }
                </div>
                ))}
            </dl>

            <Button
            disabled={loading}
            onClick={addPaymentMethod}
            className=" mt-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
            text={loading?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:"Add Payment Method"}

            />
            
			</div>
			
		</>
	);
}
