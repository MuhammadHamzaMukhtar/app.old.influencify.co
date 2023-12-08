import Tooltip from "@components/global/Tooltip";
import tootltip from "../../../../../constants/tooltip";
import moment from "moment";

export default function SessionTable({ data }) {
    const dataArray = [];

    (data?.rows || []).map((item) => {
        dataArray[item?.dimensionValues?.[1]?.value] = parseInt(dataArray[item?.dimensionValues?.[1]?.value] || 0) + parseInt(item?.metricValues?.[0]?.value)
    });

    const totalUsers = data?.rows?.reduce((accumulator, current) => accumulator + parseInt(current.metricValues[0]?.value), 0);

    let toolTip = moment(data?.rows?.[0]?.dimensionValues?.[0]?.value).format('DD MMM') + ' - ' + moment(data?.rows?.[data?.rowCount - 1]?.dimensionValues?.[0]?.value).format('DD MMMM YYYY');

    return (
        <div className="mx-4 grid grid-cols-1 gap-4">
            <div className="flex justify-between col-span-1 font-bold border-b-2">
                <p className="text-gray-600 text-[13px]"><Tooltip
                    trigger={'SESSION DEFAULT CHANNEL GROUP'}
                    tooltipText={<>
                        <span className="font-bold">SESSION DEFAULT CHANNEL GROUP</span><br />
                        <span>{tootltip.session_default_channel_group}</span>
                    </>}
                    placement="bottom-left"
                    backgroundColor="bg-white"
                    text="text-black"
                /></p>
                <p className="text-gray-600 text-[13px]"><Tooltip
                    trigger={'SESSIONS'}
                    tooltipText={<>
                        <span className="font-bold">SESSIONS</span><br />
                        <span>{tootltip.sessions}</span>
                    </>}
                    placement="bottom-right"
                    backgroundColor="bg-white"
                    text="text-black"
                /></p>
            </div>
            {Object.keys(dataArray)?.filter(key => dataArray[key] !== 0).sort((a, b) => dataArray[b] - dataArray[a]).map((key) => (
                <>
                    <div key={key} className="flex justify-between col-span-1">
                        <p className="text-gray-600 text-[13px]"><Tooltip
                            trigger={key}
                            tooltipText={<>
                                <span className="text-gray-500 pt-3">{toolTip}</span><br />
                                <span className="text-gray-500">SESSIONS</span><br />
                                <span className="flex justify-between"><p>{key}</p>
                                    <p className="pl-3 font-bold">{dataArray[key]} ({((dataArray[key] / totalUsers) * 100).toFixed(2)}%)</p>
                                </span>
                            </>}
                            placement="bottom-left"
                            backgroundColor="bg-white"
                            text="text-black"
                        /></p>
                        <p className="text-gray-600 text-[13px]"><Tooltip
                            trigger={dataArray[key]}
                            tooltipText={<>
                                <span className="text-gray-500">{toolTip}</span><br />
                                <span className="text-gray-500">SESSIONS</span><br />
                                <span className="flex justify-between"><p>{key}</p>
                                    <p className="pl-3 font-bold">{dataArray[key]} ({((dataArray[key] / totalUsers) * 100).toFixed(2)}%)</p>
                                </span>
                            </>}
                            placement="bottom-right"
                            backgroundColor="bg-white"
                            text="text-black"
                        /></p>
                    </div>
                    <div className="w-full col-span-1 bg-gray-200 rounded-full h-1">
                        <div className="bg-[#7f3a94] h-1 rounded-full" style={{ width: `${(dataArray[key] / totalUsers) * 100}%` }}></div>
                    </div>
                </>
            ))}
        </div>
    )
}