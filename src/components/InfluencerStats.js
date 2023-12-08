import { Line } from "react-chartjs-2";
import moment from "moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
    return num.toFixed(2);
};

export default function InfluencerStats({ data, label }) {

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                ticks: {
                    callback: (value) => formatedNumber(value)
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: (context) => formatedNumber(context.parsed.y)
                }
            }
        },
    };

    const labels = [];

    data?.map((item) => {
        labels.push(moment(item.month).format('MMMM'));
    });

    const dataArray = [];

    (data || []).map((item) => {
        dataArray[item?.month] = parseInt(item?.[label])
    });

    const dataSetsArray = [];

    Object.keys(dataArray)?.forEach((key) => {
        dataSetsArray.push(dataArray[key]);
    })

    const dataChart = {
        labels,
        datasets: [
            {
                borderColor: 'rgb(115, 51, 204)',
                backgroundColor: 'rgb(115, 51, 204)',
                data: dataSetsArray
            }
        ]
    };

    const lastMonthData = (data || 0)[(data || 0).length - 1];
    const secondLastMonthData = (data || 0)[(data || 0).length - 2];

    const followersChange = lastMonthData?.[label] - secondLastMonthData?.[label];
    const percentageChange = (((followersChange / secondLastMonthData?.[label]) || 0) * 100).toFixed(2);

    return (
        <div className="p-4 bg-white rounded-[8px] border">
            <h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center">
                {label === 'avg_likes' ?
                    <span className="uppercase">likes</span> :
                    <>
                        <span className="uppercase">{label}</span>
                        <span className="pl-5 pr-1">{followersChange > 0 ? <BiSolidUpArrow color="#22b658" /> : (followersChange < 0 && <BiSolidDownArrow color="#980700" />)}</span>
                        <span className={`pr-2 font-medium ${followersChange >= 0 ? 'text-[#22b658]' : 'text-[#980700]'}`}>{percentageChange}%</span>  this month
                    </>
                }
            </h5>
            <Line options={options} data={dataChart} />
        </div>
    );
}

