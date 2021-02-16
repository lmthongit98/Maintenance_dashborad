import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function PastMaintenanceChart(props) {
    const { overdueInfo, intimeInfo } = props;

    const initDefaultData = (defaultData) => {
        const data = [];
        for (const item of defaultData) {
            data.push(item);
        }

        return data;
    }

    const overdue_data = initDefaultData(overdueInfo);
    const intime_data = initDefaultData(intimeInfo);

    return (
        <div>
            <Bar
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [{
                        label: 'In time',
                        data: intime_data,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Overdue',
                        data: overdue_data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }
                    ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}
