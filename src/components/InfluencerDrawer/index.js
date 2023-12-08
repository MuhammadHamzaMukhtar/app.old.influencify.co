import { Fragment, forwardRef, useState, useImperativeHandle, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Influencify from "../../constants/Influencify";
import avatar from "@assets/avatar.png";
import Loader from "@components/global/Loader";
import Popup from "@components/Popup";

const formatedNumber = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
};

const renderStatus = (code, label) => {
    return <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{(label || "").toUpperCase()}</span>

}

const renderPaymentStatus = (status) => {
    return status == 2 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Paid</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Pending</span>

}

let currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const tabs = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Campaign" },
    { id: 3, title: "Task" },
    { id: 4, title: "Payment" },
];



const InfluencerDrawer = forwardRef(({ onClose }, ref) => {

    const popupRef = useRef();

    const { actions } = require("@store/redux/InfluencerSearchRedux");

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [collapse, setCollapse] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("pay");
    const [required, setRequired] = useState(false);

    const fetchInfluencer = async (data) => {

        const json = await Influencify.fetchInfluencer(data);
        if (json.status == 200) {
            setData(json.data);
        }
    }

    useImperativeHandle(ref, () => ({
        open(data) {
            setIsOpen(true);
            setCollapse(1);
            fetchInfluencer(data)
        },
        close() {
            setIsOpen(false);
        }

    }));

    const onCollapse = (id) => {
        if (id == collapse) {
            setCollapse(0)
        } else {
            setCollapse(id)
        }

    }


    const close = () => {
        setIsOpen(false);
        onClose();
    }

    const onPay = () => {
        setRequired(false);
        setMessage("");
        setType("pay");
        popupRef?.current?.open({
            title: "Mark as paid",
            description: "Write message"
        })
    }

    const onConfirm = () => {
        setRequired(false);
        setMessage("");
        setType("confirm");
        popupRef?.current?.open({
            title: "Promise to pay",
            description: "Write message"
        })
    }

    const doConfirm = async () => {
        setLoading(true);
        const form = {
            status: "inprogress",
            user_id: data?.influencer?.id,
            campaign_id: data?.campaign?.id,
            fields: { flag: 2, message: message },
            type: "accepted"
        }

        await Influencify.submitInfluencer(form);
        const json = await Influencify.fetchInfluencer(form);
        if (json.status == 200) {
            setData(json.data);
        }
        setLoading(false);
        popupRef?.current?.close();

    }

    const onReject = async () => {
        setRequired(true);
        setMessage("");
        setType("rejected");
        popupRef?.current?.open({
            title: "Reject",
            description: "Write rejected reason"
        })

    }

    const doReject = async () => {

        setLoading(true);
        const form = {
            status: "rejected",
            user_id: data?.influencer?.id,
            campaign_id: data?.campaign?.id,
            fields: { flag: 5, message: message },
            type: "rejected"
        }

        await Influencify.submitInfluencer(form);
        const json = await Influencify.fetchInfluencer(form);
        if (json.status == 200) {
            setData(json.data);
        }
        setLoading(false);
        popupRef?.current?.close();


    }

    const onRevision = async () => {
        setRequired(true);
        setMessage("");
        setType("revision");
        popupRef?.current?.open({
            title: "Revision",
            description: "Write revision message"
        })

    }

    const doRevision = async () => {

        setLoading(true);
        const form = {
            status: "requested",
            user_id: data?.influencer?.id,
            campaign_id: data?.campaign?.id,
            fields: { is_lock: 0, message: message },
            type: "revision"
        }

        await Influencify.submitInfluencer(form);
        const json = await Influencify.fetchInfluencer(form);
        if (json.status == 200) {
            setData(json.data);
        }
        setLoading(false);
        popupRef?.current?.close();

    }

    const doPay = async () => {
        setLoading(true);
        const form = {
            status: "closed",
            user_id: data?.influencer?.id,
            campaign_id: data?.campaign?.id,
            fields: { is_paid: 1 },
            message: message,
            type: "paid"
        }

        await Influencify.submitInfluencer(form);
        const json = await Influencify.fetchInfluencer(form);
        if (json.status == 200) {
            setData(json.data);
        }
        setLoading(false);
        popupRef?.current?.close();
    }

    if (Object.keys(data).length == 0) {
        return null;
    }

    const status = (data?.campaignUser?.status?.name || "requested");
    const label = (data?.campaignUser?.status?.label || "");
    const disabled = (required && message.length < 5) ? true : false;

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[1021]" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#00000033] bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-300"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen xl:max-w-[25%] lg:max-w-[25%]">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 right-0 mr-[25px]  z-10">
                                                <button
                                                    type="button"
                                                    className="!outline-0 !border-0 flex mt-4 bg-[#00000080] w-[35px] h-[35px] rounded-full items-center justify-center"
                                                    onClick={close}
                                                >
                                                    <FiX className="fill-white text-white text-[30px]" />
                                                </button>
                                            </div>
                                        </Transition.Child>

                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">

                                            <div id="accordion-collapse" className="mt-10">

                                                {tabs.map((item, key) => (
                                                    <div key={key}>
                                                        <h2 id="accordion-collapse-heading-1">
                                                            <button type="button" onClick={() => onCollapse(item.id)} className={` ${item.id == 1 && "rounded-t-xl"} ${item.id == collapse ? "text-white bg--purple" : "text-gray-500  bg-gray-100"} flex items-center justify-between w-full p-5 font-medium text-left  border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1`}>
                                                                <span>{item.title}</span>
                                                                {collapse == item.id ?
                                                                    <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                    :
                                                                    <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                }

                                                            </button>
                                                        </h2>
                                                        <div id="accordion-collapse-body-1" className={`${collapse == item.id ? "" : "hidden"} `} aria-labelledby="accordion-collapse-heading-1">
                                                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                                                {item.id == 1 &&
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <img
                                                                                src={data?.influencer?.profile_picture}
                                                                                onError={({ currentTarget }) => {
                                                                                    currentTarget.src = data?.influencer?.profile_picture
                                                                                        ? data?.influencer?.profile_picture
                                                                                        : avatar;
                                                                                }}
                                                                                alt={data?.influencer.username}
                                                                                className="rounded-full w-[52px] h-[52px] overflow-hidden shrink-0"
                                                                            />
                                                                            <div className="flex flex-col ml-4">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">{data?.influencer.full_name}</p>
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm">@{data?.influencer.username}</p>
                                                                            </div>

                                                                        </div>
                                                                        <div className="w-full mt-4">

                                                                            <div className="flex flex-row justify-between">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Followers</p>
                                                                                <p className="mb-2 text-green-500 dark:text-green-400 font-sm">{formatedNumber(data?.influencer.followers_count)}</p>
                                                                            </div>

                                                                        </div>
                                                                        <div className="w-full">

                                                                            <div className="flex flex-row justify-between">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Engagement rate</p>
                                                                                <p className="mb-2 text-green-500 dark:text-green-400 font-sm">{((data?.influencer?.engagement_rate || 0) * 100).toFixed(2)}%</p>
                                                                            </div>

                                                                        </div>
                                                                        <div className="w-full">

                                                                            <div className="flex flex-row">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Email: </p>
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm">{data?.influencer?.email}</p>
                                                                            </div>

                                                                        </div>
                                                                        {data?.influencer?.paypal_email &&
                                                                            <div className="w-full">

                                                                                <div className="flex flex-row">
                                                                                    <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Paypal email: </p>
                                                                                    <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm">{data?.influencer?.paypal_email}</p>
                                                                                </div>

                                                                            </div>
                                                                        }

                                                                    </>
                                                                }

                                                                {item.id == 2 && <>

                                                                    <div className="w-full">

                                                                        <div className="flex flex-row">
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Campaign:</p>
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm pl-2">{data?.campaign?.title}</p>
                                                                        </div>

                                                                    </div>
                                                                    <div className="w-full">

                                                                        <div className="flex flex-row">
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Duration:</p>
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm ml-1">{moment(data?.campaign?.campaign_date?.posting_from).format("DD MMM, YYYY")}</p>
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm ml-1">-</p>
                                                                            <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm ml-1">{moment(data?.campaign?.campaign_date?.posting_to).format("DD MMM, YYYY")}</p>
                                                                        </div>

                                                                    </div>

                                                                </>
                                                                }

                                                                {item.id == 3 && <>
                                                                    {(data?.tasks || []).map((item, key) => (
                                                                        <div className="w-full" key={key}>
                                                                            <div className="flex justify-between">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Task {key + 1}  </p>
                                                                                <div className="ml-2">
                                                                                    {item.campaign_contents_count > 0 ? <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Complete</span>
                                                                                        : <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Pending</span>
                                                                                    }

                                                                                </div>
                                                                            </div>



                                                                            <div className="flex">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm ml-1"><span className="text-gray-500 dark:text-gray-400 font-semibold">Title:</span> {item?.title}</p>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm ml-1"><span className="text-gray-500 dark:text-gray-400 font-semibold">Description:</span> {item?.description}</p>
                                                                            </div>
                                                                            {(data?.tasks).length != (key + 1) &&
                                                                                <div className="border mt-2 mb-2" />
                                                                            }

                                                                        </div>
                                                                    ))}


                                                                </>
                                                                }

                                                                {item.id == 4 && <>

                                                                    {(data?.campaignUser?.price > 0) &&
                                                                        <div className="w-full">

                                                                            <div className="flex flex-row  justify-between">
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Price: </p>
                                                                                <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm">{currency.format(data?.campaignUser?.price)}</p>
                                                                            </div>
                                                                            <div className="border mt-2 mb-2" />
                                                                        </div>
                                                                    }

                                                                    {(data?.campaign?.influencer_products || []).length > 0 &&
                                                                        <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Products</p>
                                                                    }
                                                                    {(data?.campaign?.influencer_products || []).map((item, key) => (
                                                                        <div className="w-full " key={key}>

                                                                            <div className="flex flex-row justify-between">
                                                                                <div>
                                                                                    {item?.offer_images?.[0]?.image_base_64 &&
                                                                                        <img
                                                                                            src={item?.offer_images?.[0]?.image_base_64}
                                                                                            alt={item.name}
                                                                                            class="object-cover h-20 w-20"
                                                                                        />}
                                                                                </div>
                                                                                <div>
                                                                                    <p className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">{currency.format(item?.influencer_discount_value)}</p>
                                                                                    <p className="mb-2 text-gray-500 dark:text-gray-400 font-sm">{item?.name}</p>
                                                                                </div>
                                                                            </div>
                                                                            {(data?.campaign?.influencer_products || []).length != (key + 1) &&
                                                                                <div className="border mt-2 mb-2" />
                                                                            }

                                                                        </div>
                                                                    ))}



                                                                </>
                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>

                                            <div className="w-90 m-5">
                                                <div className="flex flex-row justify-between">
                                                    <p className=" text-gray-500 dark:text-gray-400 font-semibold">Email Status</p>
                                                    <p className=" text-green-500 dark:text-green-400 font-sm">{data?.campaignUser?.email_log_count > 0 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Invited</span> : (data?.campaignUser?.is_sent ?
                                                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Sent</span> :
                                                        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Pending</span>
                                                    )}</p>
                                                </div>

                                            </div>

                                            <div className="w-90 m-5">

                                                <div className="flex flex-row justify-between">
                                                    <p className=" text-gray-500 dark:text-gray-400 font-semibold">Workflow Current Status</p>
                                                    <p className=" text-green-500 dark:text-green-400 font-sm">{renderStatus(status, label)}</p>
                                                </div>

                                            </div>

                                            {(status == "closed") &&

                                                <div className="w-90 m-5">

                                                    <div className="flex flex-row justify-between">
                                                        <p className=" text-gray-500 dark:text-gray-400 font-semibold">Payment Status</p>
                                                        <p className=" text-green-500 dark:text-green-400 font-sm">{renderPaymentStatus(data?.campaignUser?.is_paid)}</p>
                                                    </div>

                                                </div>
                                            }

                                            {(status == "waiting") &&
                                                <div className="w-90 m-5">
                                                    <div className="bg-[#f8d7da] p-3 rounded-[8px] mt-2 mb-2">Use the messaging section to agree with the influencers onhow they will be compensated</div>
                                                    <div className="flex flex-row  justify-between">
                                                        {loading ?
                                                            <Loader size={30} />
                                                            :
                                                            <>
                                                                <button onClick={onConfirm} type="button" className="text-white  bg--purple focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Approve</button>
                                                                <button onClick={onRevision} type="button" className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900">Revision</button>
                                                                <button onClick={onReject} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
                                                            </>
                                                        }

                                                    </div>
                                                </div>

                                            }
                                            {/* {(status=="inprogress") && 
                                                    <div className="w-90 m-5">
                                                        
                                                    <label for="message" className="block mb-2 text-gray-500 dark:text-gray-400 font-semibold">Message</label>
                                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                                    <button type="button" className="text-white mt-4  bg--purple focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Send</button>


                                                    </div>
                                                } */}

                                            {(status == "closed") && data?.campaignUser?.is_paid == 0 &&
                                                <div className="w-90 m-5">

                                                    <button onClick={onPay} type="button" className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Marked as Paid</button>


                                                </div>
                                            }


                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Popup ref={popupRef} onClose={() => { }}>
                <div className="flex flex-col">
                    <textarea onChange={(e) => setMessage(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={message} />
                    {loading ?
                        <div className="self-end mt-4 mb-4">
                            <Loader size={25} />
                        </div>
                        :
                        <button disabled={disabled} onClick={type == "rejected" ? doReject : type == "revision" ? doRevision : type == "confirm" ? doConfirm : doPay} className={`self-end mt-4 mb-4 w-50 ${disabled ? "bg-gray-400" : "bg--purple"}  py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center`}>Confirm</button>
                    }

                </div>
            </Popup>
        </>
    );
});

export default InfluencerDrawer;
