import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Pagination from "@components/Pagination";
import BrandExportFilters from './Filters';
import Loader from '@components/global/Loader';
import InstagramLogo from "@assets/instagram_logo.png";
import YoutubeLogo from "@assets/youtube_logo.png";
import TiktokLogo from "@assets/tiktok_logo.png";
import Influencify from "../../../constants/Influencify";
import { RiContactsBook2Fill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';


const formatter = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3
});


const BrandExport = () => {
    const { actions } = require("@store/redux/BrandListRedux");
    const dispatch = useDispatch();
    let [loading, setLoading] = useState({});
    let [platform, setPlatform] = useState("");
    let [sort, setSort] = useState("created_at|desc");
    let [type, setType] = useState("");
    const data = useSelector(state => Object.assign([], state.brandList.exports));
    const isLoading = useSelector(state => state.brandList.exportsLoading);
    const total = useSelector(state => state.brandList.exportsTotal);
    const perPage = useSelector(state => state.brandList.exportsPerpage);



    useEffect(() => {
        let query = {
            page: 1,
            platform: platform,
            sort: sort,
            export_type: type,
        };

        actions.fetchExportList(dispatch, query);
    }, [sort, platform, type]);

    const onPageChanged = (pageData) => {
        let query = {
            page: pageData?.currentPage,
            platform: platform,
            sort: sort,
            export_type: type,
        };

        actions.fetchExportList(dispatch, query);
    }

    const download = async (id, fmt) => {
        const data = {
            export_id: id,
            fmt: fmt
        };

        loading = {
            ...loading,
            [id]: {
                ...loading?.[id],
                [fmt]: true
            }
        }
        setLoading(loading);



        const json = await Influencify.downloadExport(data);
        if (json.status == 200) {
            if (json.data) {
                window.open(json.data, "_blank");
            }
        }

        loading = {
            ...loading,
            [id]: {
                ...loading?.[id],
                [fmt]: false
            }
        }
        setLoading(loading);
    }

    return (
        <div className="mb-12">
            <div className="bg-white py-[20px] border border-b border-[#ddd] mb-0">
                <BrandExportFilters {...{ setPlatform, setSort, setType }} />
            </div>
            <div className="containers">
                <div className='mt-6'>
                    <h1 className='font-bold text-2xl'>Exports ({(total || 0)})</h1>
                </div>
                <div className="list-container mt-6">
                    {(data || []).length == 0 && isLoading &&
                        <div className="py-12">
                            <Loader
                                className="h-full w-full flex justify-center items-center"
                                size="67"
                            />

                        </div>
                    }
                    {data.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-5 items-center shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4 campaign-cards">
                            <div className="xl:col-span-4 lg:col-span-4 col-span-12 lg:!mb-0">
                                <span className='text-base font-medium'>{moment(item.created_at).format("MMMM DD, YYYY hh:mm a")}</span>
                                <div className='flex items-center'>
                                    <span className="text-gray-400 text-sm">{formatter.format(item?.total_accounts)} accounts</span>
                                    <img
                                        src={item.platform == "instagram" ? InstagramLogo : item.platform == "tiktok" ? TiktokLogo : YoutubeLogo}
                                        alt={item.platform}
                                        className="w-4 h-4 ml-2"
                                    />
                                </div>

                            </div>
                            <div className="xl:col-span-4 lg:col-span-4 col-span-12 md:!mb-0">
                                <span className='text-base text-slate-500'>{item.export_type == "SHORT" ? <FaUserAlt size={18} /> : <RiContactsBook2Fill size={18} />} </span>
                            </div>
                            <div className="xl:col-span-4 lg:col-span-4 col-span-12 md:!mb-0">
                                <div className='flex gap-3 items-center flex-nowrap'>
                                    <button disabled={loading?.[item.export_id]?.['xlsx'] === true || loading?.[item.export_id]?.['csv'] === true || loading?.[item.export_id]?.['json'] === true} onClick={() => download(item.export_id, 'xlsx')} className='flex gap-2 items-center rounded-lg border hover:bg-gray-100 px-3 py-2 cursor-pointer' >
                                        {loading?.[item.export_id]?.['xlsx'] ? <Loader size="18" /> :
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" width='1.4em' height='1.4em' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z"></path></svg>
                                        }
                                    </button>
                                    <button disabled={loading?.[item.export_id]?.['xlsx'] === true || loading?.[item.export_id]?.['csv'] === true || loading?.[item.export_id]?.['json'] === true} onClick={() => download(item.export_id, 'csv')} className='flex gap-2 items-center rounded-lg border hover:bg-gray-100 px-3 py-2 cursor-pointer'>
                                        {loading?.[item.export_id]?.['csv'] ? <Loader size="18" /> :
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" width='1.4em' height='1.4em' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"></path></svg>
                                        }
                                    </button>
                                    <button disabled={loading?.[item.export_id]?.['xlsx'] === true || loading?.[item.export_id]?.['csv'] === true || loading?.[item.export_id]?.['json'] === true} onClick={() => download(item.export_id, 'json')} className='flex gap-2 items-center rounded-lg border hover:bg-gray-100 px-3 py-2 cursor-pointer'>
                                        {loading?.[item.export_id]?.['json'] ? <Loader size="18" /> :
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" width='1.4em' height='1.4em' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM4.151 15.29a1.176 1.176 0 0 1-.111-.449h.764a.578.578 0 0 0 .255.384c.07.049.154.087.25.114.095.028.201.041.319.041.164 0 .301-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .084-.29.387.387 0 0 0-.152-.326c-.101-.08-.256-.144-.463-.193l-.618-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.352-.367 1.068 1.068 0 0 1-.123-.524c0-.244.064-.457.19-.639.128-.181.304-.322.528-.422.225-.1.484-.149.777-.149.304 0 .564.05.779.152.217.102.384.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.624.624 0 0 0-.246-.181.923.923 0 0 0-.37-.068c-.216 0-.387.05-.512.152a.472.472 0 0 0-.185.384c0 .121.048.22.144.3a.97.97 0 0 0 .404.175l.621.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-3.104-.033a1.32 1.32 0 0 1-.082-.466h.764a.576.576 0 0 0 .074.27.499.499 0 0 0 .454.246c.19 0 .33-.055.422-.164.091-.11.137-.265.137-.466v-2.745h.791v2.725c0 .44-.119.774-.357 1.005-.237.23-.565.345-.985.345a1.59 1.59 0 0 1-.568-.094 1.145 1.145 0 0 1-.407-.266 1.14 1.14 0 0 1-.243-.39Zm9.091-1.585v.522c0 .256-.039.47-.117.641a.862.862 0 0 1-.322.387.877.877 0 0 1-.47.126.883.883 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522c0-.258.039-.471.117-.641a.87.87 0 0 1 .32-.387.868.868 0 0 1 .47-.129c.177 0 .333.043.47.129a.862.862 0 0 1 .322.387c.078.17.117.383.117.641Zm.803.519v-.513c0-.377-.069-.701-.205-.973a1.46 1.46 0 0 0-.59-.63c-.253-.146-.559-.22-.916-.22-.356 0-.662.074-.92.22a1.441 1.441 0 0 0-.589.628c-.137.271-.205.596-.205.975v.513c0 .375.068.699.205.973.137.271.333.48.589.626.258.145.564.217.92.217.357 0 .663-.072.917-.217.256-.146.452-.355.589-.626.136-.274.205-.598.205-.973Zm1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676h-.032Z"></path></svg>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>

                <div className="inline-flex items-center justify-center">
                    {(total || 0) > perPage &&
                        <Pagination
                            totalRecords={(total || 0)}
                            pageLimit={perPage}
                            pageNeighbours={perPage}
                            onPageChanged={onPageChanged}
                            key={platform}
                        />
                    }

                    {(data || []).length > 0 && isLoading &&
                        <Loader
                            size="30"
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default BrandExport