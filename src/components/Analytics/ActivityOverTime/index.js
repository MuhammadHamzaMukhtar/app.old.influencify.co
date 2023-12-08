import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Tab } from "@headlessui/react";
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ActivityOverTime() {

    const options = {
        responsive: true,
        scales: {
            x:{
                grid: {
                    display: false      
                },
            },
        },
        plugins: {
          legend: {
            position: 'right',
            fill:true,
            labels:{
                padding: 50,
                usePointStyle:true,
                pointStyle:"circle"
            }
          },
          title: {
            display: true,
          },
        },
      };

    const data = useSelector((state)=>Object.assign({}, state.BrandDashboardReducer.activity?.data?.reports?.[0]));


    const labels = [];

    data?.rows?.map((item) => {
        labels.push(moment(item.dimensionValues[0]?.value).format('DD MMMM'));
    });

    const dataArray30 = [];
    const dataArray7 = [];
    const dataArray1 = [];

    (data?.rows || []).map((item) => {
        dataArray30[item?.dimensionValues?.[0]?.value] = parseInt(item?.metricValues?.[0]?.value)
    });

    (data?.rows || []).map((item) => {
        dataArray7[item?.dimensionValues?.[0]?.value] = parseInt(item?.metricValues?.[1]?.value)
    });

    (data?.rows || []).map((item) => {
        dataArray1[item?.dimensionValues?.[0]?.value] = parseInt(item?.metricValues?.[2]?.value)
    });

    const dataSetsArray30 = [];
    const dataSetsArray7 = [];
    const dataSetsArray1 = [];

    Object.keys(dataArray30)?.forEach((key) => {
        dataSetsArray30.push(dataArray30[key]);
    })

    Object.keys(dataArray7)?.forEach((key) => {
        dataSetsArray7.push(dataArray7[key]);
    })

    Object.keys(dataArray1)?.forEach((key) => {
        dataSetsArray1.push(dataArray1[key]);
    })

    const dataChart = {
        labels,
        datasets: [
            {
                borderColor: 'rgb(26, 115, 232)',
                backgroundColor:  'rgb(26, 115, 232)',
                label: '30 Days',
                data: dataSetsArray30
            },
            {
                borderColor: 'rgb(71, 71, 235)',
                backgroundColor: 'rgb(71, 71, 235)',
                label: '7 Days',
                data: dataSetsArray7
            },
            {
                borderColor: 'rgb(115, 51, 204)',
                backgroundColor:'rgb(115, 51, 204)',
                label: '1 Days',
                data: dataSetsArray1
            }
    ]
    };


    return (
        <>
           <Line options={options} data={dataChart} />
        </>
    );
}

