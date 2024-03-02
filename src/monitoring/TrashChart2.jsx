import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function TrashChart2({ data }) {
    const [chartData, setChartData] = useState({
        datasets: [],
    });


    const options = {
        maintainAspectRatio: false, // 이 옵션을 추가하여 종횡비 관리
        plugins: {
            legend: {
                position: 'bottom', // 범례의 위치
                labels: {
                    color: 'white', // 글자 색상
                    font: {
                        size: '10vh' // 글자 크기
                    }
                }
            }
        }
    };


    useEffect(() => {
        if (data) {
            const newData = {
                labels: ['스티로폼 조각', '스티로폼 부표', '스티로폼 상자', '플라스틱', '페트병', '금속'],
                datasets: [
                    {
                        data: [
                            data.styrofoamPiecePer * 100,
                            data.styrofoamBuoyPer * 100,
                            data.styrofoamBoxPer * 100,
                            data.plasticEtcPer * 100,
                            data.petBottlePer * 100,
                            data.metalPer * 100
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            // console.log(data)
            setChartData(newData);
        }
    }, [data]);

    return (
        <div style={{ width: '40vh', height: '40vh' }}> {/* 필요에 따라 너비와 높이 조정 */}
            <Doughnut data={chartData} options={options} />
        </div>
    );
}

export default TrashChart2;
