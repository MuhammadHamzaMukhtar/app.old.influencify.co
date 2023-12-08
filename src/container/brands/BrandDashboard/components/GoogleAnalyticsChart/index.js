import { useState } from "react";
import ReactTooltip from "react-tooltip";
import LineMap from "./LineMap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Tab } from "@headlessui/react";
import moment from "moment";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
	return num;
};

const getDaysBetweenDates = (startDate, endDate) => {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('YYYYMMDD'));
        now.add(1, 'days');
    }
    return dates;
};


export default function LineMapChart({ data }) {

    let dateArray = getDaysBetweenDates(moment(data.rows?.[0]?.dimensionValues[0]?.value), moment(data.rows?.[data.rows.length-1]?.dimensionValues[0]?.value))

    const activeUserData = [];
    const newUserData = [];
    const timeData = [];
    const revenueData = [];
    dateArray?.map(date => {
        activeUserData.push((data.rows.filter((i)=>i.dimensionValues[0]?.value==date)?.[0]?.metricValues[0].value || "0"))
        newUserData.push((data.rows.filter((i)=>i.dimensionValues[0]?.value==date)?.[0]?.metricValues[1].value || "0"))
        timeData.push((data.rows.filter((i)=>i.dimensionValues[0]?.value==date)?.[0]?.metricValues[2].value || "0"))
        revenueData.push((data.rows.filter((i)=>i.dimensionValues[0]?.value==date)?.[0]?.metricValues[3].value || "0"))
    });

    const labels = [];
    dateArray?.map(date => {
        labels.push(moment(date).format('DD MMMM'));
    });

    const [activeChart, setActiveChart] = useState(activeUserData);
    const [label, setLabel] = useState("Users");

    let engagementOption = {
        scales: {
            
            x:{                
                grid: {
                    display: false      
                  },
            },
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value;
                    }
                }
            }
        }
    };
    if(label == 'Average engagement time'){
        engagementOption = {
            scales: {
                x:{
                    grid: {
                        display: false      
                      },
                },
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return  moment().startOf('day').seconds(value).format("mm[m] ss[s]");
                        }
                    }
                }
            }
        }
    }
    const options = {
        responsive: true,
        
        plugins: {
            legend: {
                display: false
            },
           
        },
        ...engagementOption
    };
    const totalActiveUsers = (data?.rows || []).reduce((accumulator, current) => accumulator + parseInt(current.metricValues[0]?.value), 0)
    const totalNewUsers = (data?.rows || []).reduce((accumulator, current) => accumulator + parseInt(current.metricValues[1]?.value), 0)
    const totaluserEngagementDuration = (data?.rows || []).reduce((accumulator, current) => accumulator + parseFloat(current.metricValues[2]?.value), 0)
    const totaluserEngagementCount = (data?.rows || []).filter((item) => item.metricValues?.[2]?.value>0).length;
    const totalRevenue = (data?.rows || []).reduce((accumulator, current) => accumulator + parseInt(current.metricValues[3]?.value), 0)
    const dataChart = {
        labels,
        datasets:[{
            label: label, 
            data: activeChart, 
            borderColor: 'rgb(127, 58, 148)',
            backgroundColor: 'white',
        }]
    }
    const analyticTabs = [
        {
            title: 'Users',
            count: formatedNumber(totalActiveUsers),
        },
        {
            title: 'New Users',
            count: formatedNumber(totalNewUsers),
        },
        {
            title: 'Average engagement time',
            count: moment().startOf('day').seconds(totaluserEngagementDuration/totaluserEngagementCount).format("mm[m] ss[s]"),
        }, 
        {
            title: 'Total Revenue',
            count: '$ ' + totalRevenue,
        }
    ]

    const onClickHandler = (title) => {
        const dataArray = [];
        if (title == 'Users') {
            setActiveChart(activeUserData);
            setLabel("Users")
        } else if (title == 'New Users') {
            setLabel("New Users")
            setActiveChart(newUserData)
        } else if (title == 'Average engagement time') {
            setLabel("Average engagement time")
            setActiveChart(timeData)
        } else if (title == 'Total Revenue') {
            setLabel("Total Revenue")
            setActiveChart(revenueData)
        }
    }

    return (
        <>
            <Tab.Group>
                <Tab.List className={'flex overflow-y-hidden overflow-x-scroll'}>
                    {analyticTabs.map((tab, index) => {
                        return (
                            <Tab key={index} className={"text-gray-500 hover:bg-gray-100 hover:text-black relative"} onClick={() => onClickHandler(tab.title)}>
                                {({ selected }) => (
                                    <>
                                        {
                                            selected && <hr className="absolute mx-8 top-0 inset-x-0 h-1 bg-blue-500 border-0 rounded-t-none rounded-b"></hr>
                                        }
                                        <div className="px-7 py-3">
                                            <p className={selected ? 'text-blue-500 whitespace-nowrap' : 'whitespace-nowrap'}>{tab.title}</p>
                                            <p className={selected ? 'text-3xl text-black' : "text-3xl"}>{tab.count}</p>
                                        </div>
                                    </>
                                )}
                            </Tab>
                        )
                    })}
                </Tab.List>
            </Tab.Group>
            <div className="px-3 py-3">
                <LineMap options={options} data={dataChart} />
            </div>
        </>
    );
}

