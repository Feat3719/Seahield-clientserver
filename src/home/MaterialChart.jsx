import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// 필요한 차트 요소 등록
Chart.register(ArcElement, Tooltip, Legend);
function MaterialChart({ logData }) {
    const [chartData, setChartData] = useState({
      datasets: [],
    });
  
    useEffect(() => {
      if (logData) {
        // logData에서 필요한 정보를 추출하여 차트 데이터를 설정
        const data = {
          labels: ['Plastic', 'PET', 'Metal'],
          datasets: [
            {
              data: [logData.plasticEtcPer*100,logData.petBottlePer*100, logData.metalPer*100], // 예시 값
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      }
    }, [logData]); // logData가 바뀔 때마다 차트 데이터를 새로 설정
  
    return (
      <div>
        <h2>Material Distribution</h2>
        <Doughnut data={chartData} />
      </div>
    );
  }
export default MaterialChart;