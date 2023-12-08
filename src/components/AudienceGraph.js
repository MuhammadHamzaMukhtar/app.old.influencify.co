import React from 'react';
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


export default function AudienceGraph({ data }) {

    const options = {
        indexAxis: 'x',
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value + '%' // Add % to y-axis ticks
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => context.label + ': ' + context.parsed.y + '%' // Add % to tooltip label
                }
            }
        },
    };

    const labels = [];

    data?.map((item) => {
        let value = item.code;
        if (!labels.includes(value)) {
            if (value.startsWith('-')) {
                value =  '<' + value.slice(1);
            } else if (value.endsWith('-')) {
                value = '>' + value.slice(0, -1);
            }
            labels.push(value)
        }
    })
    const dataArray = [];

    data?.map((item) => {
        dataArray.push((item.weight * 100).toFixed(0))
    });
    
    const dataChart = {
        labels,
        datasets: [{
            borderColor: 'rgb(127, 58, 148)',
            backgroundColor: 'rgb(127, 58, 148)',
            data: dataArray
        }]
    };

    return <Bar options={options} data={dataChart} />;
}
