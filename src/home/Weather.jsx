import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ onPohangWindSpeedData,onPohangTMXData,onPohangTMNData ,onUlsanWindSpeedData,onUlsanTMXData, onUlsanTMNData }) => {
    const [pohangWeather, setPohangWeather] = useState(null);
    const [ulsanWeather, setUlsanWeather] = useState(null);
  
    const fetchWeatherData = async (nx, ny, setWeatherData) => {
      try {
        const apiKey = 'JrDIvJyY%2F5nC4cM4h%2B%2BRTTFwta8XrWrlVQnatKlbqOz8FTo7eG8cdA0VrbJU5PldoMfabRTX2h1jjM4apPBXNQ%3D%3D';
        if (!apiKey) {
          console.error('API 키가 정의되지 않았습니다.');
          return;
        }
  
        const currentDate = '20240202';
        const baseTime = '0630';
        const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20240202&base_time=0500&nx=${nx}&ny=${ny}`;
  
        const response = await axios.get(apiUrl);
  
        if (!response.data || !response.data.response || !response.data.response.body || !response.data.response.body.items) {
          console.error('유효하지 않은 날씨 데이터 구조입니다:', response.data);
          return;
        }
  
        setWeatherData(response.data);
  
      } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
      }
    };
  
    useEffect(() => {
      fetchWeatherData(105, 94, setPohangWeather);
      fetchWeatherData(104, 83, setUlsanWeather);
    }, []);
  
    return (
      <div>
        {pohangWeather && (
          <div>
            {/* <h2>포항 날씨 정보</h2> */}
            {pohangWeather.response.body.items.item
            .filter((item) => item.category === 'WSD')
            .slice(0, 1)
            .map((item, index) => (
                    <div key={index}>
                    {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                    {onPohangWindSpeedData(item)}
                </div>
                ))}

               {/* 포항 최고 기온 정보 표시 */}
                {pohangWeather.response.body.items.item
                .filter((item) => item.category === 'TMX')
                .slice(0, 1)
                .map((item, index) => (
                    <div key={index}>
                    {onPohangTMXData(item)}
                    </div>
                ))}
                {pohangWeather.response.body.items.item
                .filter((item) => item.category === 'TMN')
                .slice(0, 1)
                .map((item, index) => (
                    <div key={index}>
                    {onPohangTMNData(item)}
                    </div>
                ))}
                    </div>
                    )}

        {ulsanWeather && (
          <div>
            {/* <h2>부산 날씨 정보</h2> */}
            {ulsanWeather.response.body.items.item
              .filter((item) => item.category === 'WSD')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onUlsanWindSpeedData(item)}
                </div>
              ))}
              {ulsanWeather.response.body.items.item
              .filter((item) => item.category === 'TMX')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onUlsanTMXData(item)}
                </div>
              ))}
              {ulsanWeather.response.body.items.item
              .filter((item) => item.category === 'TMN')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onUlsanTMNData(item)}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };
  

export default Weather;