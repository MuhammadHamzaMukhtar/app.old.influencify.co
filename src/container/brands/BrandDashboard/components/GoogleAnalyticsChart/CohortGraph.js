import Tooltip from "@components/global/Tooltip";
import moment from "moment"

export default function CohortGraph({ data }) {
    const weeks = [];

    (data?.data?.reports?.[1]?.rows || []).map((row) => {
        const value = row?.dimensionValues[0].value.split('_')[1];
        if (value && !weeks.includes(value)) {
            weeks.push(value);
        }
    })

    const totalUsersByWeek = (data?.data?.reports?.[1]?.rows || []).reduce((acc, row) => {
        const week = row.dimensionValues[1].value.slice(-1);
        const activeUsers = row.metricValues[0].value;
        const totalUsers = row.metricValues[1].value;
        const percentage = ((activeUsers / totalUsers) * 100).toFixed(1);

        acc[week] = percentage;

        return acc;
    }, {});

    return (
        <div className={`p-5 grid lg:grid-cols-7 sm:grid-cols-7 grid-cols-7"`}>
            <div className="space-y-4">
                <div className=" border-b-2 text-white text-[13px]">----</div>
                <div className=" border-b-2 text-gray-600 text-[13px]">All Users</div>
                {data?.range?.map((date) => (
                    <div className="border-b-2 whitespace-nowrap text-gray-600"><span className="text-[13px]">{moment(date?.dateRange?.startDate).format('D MMM')} - {moment(date?.dateRange?.endDate).format('D MMM')}</span></div>
                ))}
            </div>
            {Object.keys(weeks).sort((a, b) => weeks[a] - weeks[b]).map((key) => (
                <div className="space-y-4 text-center">
                    <p className="border-b-2 text-gray-600 text-[13px]">Week {weeks[key]}</p>
                    <p className="border-b-2 text-gray-600 text-[13px]"> {totalUsersByWeek[weeks[key]] ?? '0.0'}%</p>
                    {data?.data?.reports?.[1]?.rows?.map((row) => (
                        row.dimensionValues[1].value[row.dimensionValues[1].value.length - 1] === weeks[key] &&

                        <div className="border-b-2">
                            <Tooltip
                                trigger={<span className={`px-8 pt-4`} style={{ backgroundColor: `rgba(127, 58, 148, ${((row.metricValues[0].value / row.metricValues[1].value) * 100).toFixed(7) / 10}` }}></span>}
                                tooltipText={<>
                                    <span className="flex justify-between"><p>USERS:</p>  <p className="font-bold">{row.metricValues[0].value}</p></span><br />
                                    <span>{(((row.metricValues[0].value / row.metricValues[1].value) * 100).toFixed(0) == 0 ? '<1' : ((row.metricValues[0].value / row.metricValues[1].value) * 100).toFixed(0))} % retention</span>
                                </>}
                                placement="bottom-center"
                                backgroundColor="bg-white"
                                text="text-black"            
                            />
                        </div>


                    ))}
                </div>
            ))}
        </div>
    )
}
