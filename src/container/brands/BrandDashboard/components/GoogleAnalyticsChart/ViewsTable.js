import Tooltip from "@components/global/Tooltip";

export default function ViewTable({ data, title1, title2, tootltip1, tootltip2 }) {
    const dataArray = [];

    (data?.rows || []).map((item) => {
        dataArray[item?.dimensionValues?.[0]?.value] = parseInt(dataArray[item?.dimensionValues?.[0]?.value] || 0) + parseInt(item?.metricValues?.[0]?.value)
    });

    const totalViews = data?.rows?.reduce((accumulator, current) => accumulator + parseInt(current.metricValues[0]?.value), 0);

    return (
        <div className="mx-4 grid grid-cols-1 gap-4">
            <div className="flex justify-between col-span-1 font-bold border-b-2">
                <p><Tooltip
                    trigger={title1}
                    tooltipText={<>
                        <span className="font-bold">{title1}</span><br />
                        <span>{tootltip1}</span>
                    </>}
                    placement="bottom-left"
                    backgroundColor="bg-white"
                    text="text-black"
                /></p>
                <p><Tooltip
                    trigger={title2}
                    tooltipText={<>
                    <span className="font-bold">{title2}</span><br />
                    <span>{tootltip2}</span><br />
                        </>}
                    placement="bottom-right"
                    backgroundColor="bg-white"
                    text="text-black"
                /></p>
            </div>
            {Object.keys(dataArray)?.filter(key => dataArray[key] !== 0).sort((a, b) => dataArray[b] - dataArray[a]).slice(0, 7).map((key) => (
                <>
                    <div key={key} className="flex justify-between col-span-1">
                        <p className="text-gray-600 text-[13px]"><Tooltip
                            trigger={key}
                            tooltipText={<>
                            <span className="text-gray-500">{title2}</span><br />
                            <span className="flex justify-between"><p>{key}</p> 
                            <p className="pl-3 font-bold">{dataArray[key]} ({((dataArray[key] / totalViews) * 100).toFixed(2)}%)</p>
                            </span>
                            </>}
                            placement="bottom-left"
                            backgroundColor="bg-white"
                            text="text-black"
                        /></p>
                        <p className="text-gray-600 text-[13px]"><Tooltip
                            trigger={dataArray[key]}
                            tooltipText={<>
                                <span className="text-gray-500">{title2}</span><br />
                                <span className="flex justify-between"><p>{key}</p>
                                    <p className="pl-3 font-bold">{dataArray[key]} ({((dataArray[key] / totalViews) * 100).toFixed(2)}%)</p>
                                </span>
                            </>}
                            placement="bottom-right"
                            backgroundColor="bg-white"
                            text="text-black"
                        /></p>
                    </div>
                    <div className="w-full col-span-1 bg-gray-200 rounded-full h-1">
                        <div className="bg-[#7f3a94] h-1 rounded-full" style={{ width: `${(dataArray[key] / totalViews) * 100}%` }}></div>
                    </div>
                </>
            ))}
        </div>
    )
}