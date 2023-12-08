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


export default function AudienceAgeGraph({ data }) {

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
                    label: (context) => context.parsed.y + '%' // Add % to tooltip label
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
                value = value.slice(0, -1) + "+";
            }
            labels.push(value)
        }
    })
    const maleDataArray = [];
    const femaleDataArray = [];

    data?.map((item) => {
        maleDataArray.push((item.male * 100).toFixed(0))
    });
    
    data?.map((item) => {
        femaleDataArray.push((item.female * 100).toFixed(0))
    });
    
    const dataChart = {
        labels,
        datasets: [{
            borderColor: 'rgb(253, 41, 101)',
            backgroundColor: 'rgb(253, 41, 101)',
            data: femaleDataArray
        },{
            borderColor: 'rgb(127, 58, 148)',
            backgroundColor: 'rgb(127, 58, 148)',
            data: maleDataArray
        }]
    };

    return <Bar options={options} data={dataChart} />;
}
