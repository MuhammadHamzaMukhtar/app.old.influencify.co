import { FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const { actions } = require("@store/redux/BillingRedux");

export default function BillingInvoice() {
    const dispatch = useDispatch();
    const invoices = useSelector((state)=>Object.assign([],state.billing.invoices?.data));
    const has_more = useSelector((state)=>(state.billing.invoices?.has_more || false));
    const next_page = useSelector((state)=>(state.billing.invoices?.next_page || null));
    const paymentLoading = useSelector((state)=>(state.billing.paymentLoading || false));

    
    const downloadLoader = useSelector((state)=>Object.assign([],state.billing.downloadLoader));

    const downloadInvoice = async (data) => {
        const query = {url:data.invoice_pdf, id:data.id}
        const json = await actions.downloadInvoice(dispatch, query);
        if(json.status==200){
            if(json.data?.file_url){
                window.open(json.data?.file_url, '_blank', 'noopener,noreferrer');
            }
        }
    }

    const next = async () => {
        const query = {
            next_page:next_page
        }
        const json = await actions.fetchInvoices(dispatch, query);
    }

	return (
		<>
			<h2 className="text-[24px] black font-italic font-bold mb-3">Invoices</h2>
            <div class="bg-white sm:rounded-lg shadow-sm divide-y divide-gray-100">
            {(invoices || []).map((item,key)=>(
                <div class="flex items-center px-6 py-4" key={key}>
                    <div class="text-sm w-full">{moment.unix(item.created).format("MMM DD, YYYY")}</div>
                    <div class="text-sm w-full">
                        <div class="px-2"> ${item?.amount_paid/100} </div>
                    </div>
                    <div class="text-sm w-full"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item?.status}
                            </span></div>
                    <div class="text-sm text-gray-700 shrink-0 flex items-center justify-end">
                        <div class="w-52 text-right">
                            <div onClick={()=>downloadInvoice(item)} target="_blank" title="Download Receipt" className="cursor-pointer underline hover:text-gray-500">
                                
                                {downloadLoader?.[item.id]?<FaSpinner className="animate-[spin_2s_linear_infinite] pink inline" />:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="h-5 w-5 inline">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>}

                            </div>
                        </div>
                    </div>
                </div>
                ))}
               
            </div>
            {has_more &&
            <div className="flex items-center justify-center">
                <button onClick={next} className="inline-flex items-center px-4 py-2 bg--purple border border-gray-300 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:text-white focus:outline-none focus:ring active:text-white transition ease-in-out duration-150 mt-4">
                        
                    {paymentLoading?<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />:"load more"}

                </button>
            </div>
            }
			
		</>
	);
}
