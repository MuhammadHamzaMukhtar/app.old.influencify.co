import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Worldmap from "./Worldmap";
import Tooltip from "@components/global/Tooltip";
import tootltip from "../../../../../../constants/tooltip";
import moment from "moment";

export default function Index({ data }) {

    const country_chart = [];

    (data?.rows || []).map((item) => {
        country_chart[item?.dimensionValues?.[0]?.value] = parseInt(country_chart[item?.dimensionValues?.[0]?.value] || 0) + parseInt(item?.metricValues?.[0]?.value)
    });

    const [content, setContent] = useState("");

    const totalUsers = data?.rows?.reduce((accumulator, current) => accumulator + parseInt(current.metricValues[0]?.value), 0);

    let toolTip = moment(data?.rows?.[0]?.dimensionValues?.[1]?.value).format('DD MMM') + ' - ' + moment(data?.rows?.[data?.rowCount - 1]?.dimensionValues?.[1]?.value).format('DD MMMM YYYY');

    return (
        <>
            <div className="col-span-8">
                <Worldmap setTooltipContent={setContent} data={country_chart} />
                <ReactTooltip textColor='black' backgroundColor='white' className="border border-gray-500 shadow-lg">{content}</ReactTooltip>
            </div>
            <div className="col-span-4">
                <div className="mx-4 grid grid-cols-1 gap-3">
                    <div className="flex justify-between col-span-1 font-bold border-b-2">
                        <p>
                            <Tooltip
                                trigger={'COUNTRY'}
                                tooltipText={<>
                                    <span className=" font-bold">COUNTRY </span><br/>
                                    <span>{tootltip.country}</span>
                                </>}
                                placement="bottom-left"
                                backgroundColor="bg-white"
                                text="text-black"
                            />
                        </p>
                        <p><Tooltip
                            trigger={'USERS'}
                            tooltipText={<>
                                <span className="font-bold">USERS </span><br />
                                <span>{tootltip.users}</span>
                            </>}
                            placement="bottom-right"
                            backgroundColor="bg-white"
                            text="text-black"
                        /></p>
                    </div>
                    {Object.keys(country_chart)?.sort((a, b) => country_chart[b] - country_chart[a]).slice(0, 7).map((key) => (
                        <>
                            <div key={key} className="flex justify-between col-span-1">
                                <p><Tooltip
                                    trigger={key}
                                    tooltipText={<>
                                        <span className="text-gray-500">{toolTip}</span><br/>
                                        <span className="text-gray-500">USERS</span><br/>
                                        <span className="flex justify-between"><p>{key}</p> <p className="pl-3 font-bold">{country_chart[key]} ({((country_chart[key] / totalUsers) * 100).toFixed(2)}%)</p></span>
                                    </>}
                                    placement="bottom-left"
                                    backgroundColor="bg-white"
                                    text="text-black"
                                /></p>
                                <p><Tooltip
                                    trigger={country_chart[key]}
                                    tooltipText={<>
                                        <span className="text-gray-500">{toolTip}</span><br />
                                        <span className="text-gray-500">USERS</span><br />
                                        <span className="flex justify-between"><p>{key}</p> <p className="pl-3 font-bold">{country_chart[key]} ({((country_chart[key] / totalUsers) * 100).toFixed(2)}%)</p></span>
                                    </>}
                                    placement="bottom-right"
                                    backgroundColor="bg-white"
                                    text="text-black"
                                /></p>
                            </div>
                            <div className="w-full col-span-1 bg-gray-200 rounded-full h-1">
                                <div className="bg-[#7f3a94] h-1 rounded-full" style={{ width: `${(country_chart[key] / totalUsers) * 100}%` }}></div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}
