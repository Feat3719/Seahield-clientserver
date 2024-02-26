import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.defaults.font.color = '#000000'; // 진한 검정색으로 설정
Chart.defaults.font.size = 16; // 기본 폰트 크기를 16으로 설정

// chart.js에 필요한 모듈 등록
Chart.register(ArcElement, Tooltip, Legend);

function MaterialChart2({ data }) {
    if (!data) {
        return <div>로딩 중...</div>; // 또는 다른 대체 UI
      }
    // data는 { styrofoamPiecePer, styrofoamBuoyPer, styrofoamBoxPer } 객체를 예상합니다.
    const chartData = {
        labels: ['스티로폼 조각', '스티로폼 부표', '스티로폼 상자',
                '플라스틱', '페트병', '금속'],
        datasets: [
            {
                label: '비율(%)',
                data: [data.styrofoamPiecePer, data.styrofoamBuoyPer, data.styrofoamBoxPer,
                        data.plasticEtcPer,data.petBottlePer, data.metalPer],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(255, 206, 86, 0.4)',
                            'rgba(75, 192, 192, 0.4)',
                            'rgba(153, 102, 255, 0.4)',
                            'rgba(255, 159, 64, 0.4)'
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

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
}

export default MaterialChart2;