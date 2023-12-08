import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function BarChart({ data }) {

    const options = {
        indexAxis: 'y',
        scales: {
            x:{
                grid: {
                    display: false      
                  },
            },
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const labels = [];

    data?.rows?.map((item) => {
        const value = item.dimensionValues?.[1]?.value;
        if (!labels.includes(value)) {
            labels.push(item.dimensionValues?.[1]?.value)
        }
    })
    const dataArray = [];

    (data?.rows || []).map((item) => {
        dataArray[item?.dimensionValues?.[1]?.value] = parseInt(dataArray[item?.dimensionValues?.[1]?.value] || 0) + parseInt(item?.metricValues?.[0]?.value)
    });

    const dataSetsArray = [];

    Object.keys(dataArray)?.forEach((key) => {
        dataSetsArray.push(dataArray[key]);
    })

    const dataChart = {
        labels,
        datasets: [{
            borderColor: 'rgb(127, 58, 148)',
            backgroundColor: 'rgb(127, 58, 148)',
            data: dataSetsArray
        }]
    };

    return <Bar options={options} data={dataChart} />;
}
