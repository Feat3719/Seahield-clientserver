import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './MWeather.module.css';

const MWeather = ({ cctvId }) => {
  const [weatherData, setWeatherData] = useState(null);

  // 카테고리 코드를 한국어로 매핑
  const categoryMap = {
    TMP: "온도",
    UUU: "동서바람성분",
    VVV: "남북바람성분",
    VEC: "풍향",
    WSD: "풍속",
    SKY: "하늘상태",
    PTY: "강수형태",
    POP: "강수확률",
    WAV: "파고",
    PCP: "1시간 강수량",
    REH: "습도",
    SNO: "1시간 신적설",
    TMX: "최고기온",
    TMN: "최저기온",
  };

  // 중복 데이터 필터링 및 최신 데이터 선택 로직
  const filterAndSelectLatestWeatherData = (items) => {
    const filtered = items.reduce((acc, item) => {
      // 예: item.category가 TMP이면, acc에서 TMP 카테고리 데이터를 찾습니다.
      if (!acc.find(i => i.category === item.category)) {
        acc.push(item); // 카테고리별로 첫 번째 데이터만 포함시킵니다.
      }
      return acc;
    }, []);
    setWeatherData(filtered);
  };

  const getCoordinatesByCctvId = (cctvId) => {
    const coordinatesMap = {
      '1': { nx: 105, ny: 94 }, // 포항
      '2': { nx: 104, ny: 83 }, // 울산
      '3': { nx: 104, ny: 83 }, // 울산
      '4': { nx: 59, ny: 69 }, // 고흥
      '5': { nx: 71, ny: 69 }, // 순천
      '6': { nx: 73, ny: 63 }, // 신안
      '7': { nx: 58, ny: 56 }, // 완도
      '8': { nx: 74, ny: 63 }, // 여수
      '9': { nx: 59, ny: 69 }, // 고흥
      '10': { nx: 91, ny: 71 }, // 거제
    };
    return coordinatesMap[cctvId] || null;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!cctvId) return;

      const coordinates = getCoordinatesByCctvId(cctvId);
      if (!coordinates) {
        console.error('Invalid cctvId for weather data.');
        return;
      }

      const { nx, ny } = coordinates;
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_WEATHER_API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${currentDate}&base_time=0500&nx=${nx}&ny=${ny}`;

      try {
        const response = await axios.get(apiUrl);
        if (response.data && response.data.response && response.data.response.body && response.data.response.body.items) {
          filterAndSelectLatestWeatherData(response.data.response.body.items.item);
        } else {
          console.error('Invalid weather data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [cctvId]); // cctvId는 여전히 의존성 배열에 포함되어야 합니다.


  // 한국어 지역명으로 변환
  const locationNameMap = {
    '1': "포항",
    '2': "울산",
    '3': "울산",
    '4': "고흥",
    '5': "순천",
    '6': "신안",
    '7': "완도",
    '8': "여수",
    '9': "고흥",
    '10': "거제",
  };

  return (
    <div className={style.mweather_detail}>
      {weatherData ? (
        <div className={style.weather_info}>
          <p className={style.mweather_title}>{locationNameMap[cctvId]}의 현재 날씨</p>
          {weatherData.map((item, index) => (
            <div key={index} className={style.mweather_contents_area}>
              <p className={style.mweather_contents}>
                {categoryMap[item.category] || item.category}: {item.fcstValue}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>{locationNameMap[cctvId]}의 날씨 정보를 불러오고 있습니다.</p>
      )}
    </div>
  );
};

export default MWeather;
