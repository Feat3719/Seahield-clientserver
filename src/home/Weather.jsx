import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ onPohangWindSpeedData,onPohangTMXData,onPohangTMNData ,
                onUlsanWindSpeedData,onUlsanTMXData, onUlsanTMNData,
                onGoheungWindSpeedData, onGoheungTMXData, onGoheungTMNData,onYeosuWindSpeedData,onYeosuTMXData, onYeosuTMNData}) => {
    const [pohangWeather, setPohangWeather] = useState(null);
    const [ulsanWeather, setUlsanWeather] = useState(null);
    const [goheungWeather, setGoheungWeather] = useState(null);
    const [yeosuWeather, setYeosuWeather] = useState(null);
  
    const fetchWeatherData = async (nx, ny, setWeatherData) => {
      try {
        const apiKey = 'JrDIvJyY%2F5nC4cM4h%2B%2BRTTFwta8XrWrlVQnatKlbqOz8FTo7eG8cdA0VrbJU5PldoMfabRTX2h1jjM4apPBXNQ%3D%3D';
        if (!apiKey) {
          console.error('API 키가 정의되지 않았습니다.');
          return;
        }
  
        const getCurrentDate = () => {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}${month}${day}`;
        };
        
        // const currentDate = '20240202';
        const currentDate = getCurrentDate();
        const baseTime = '0630';
        const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${currentDate}&base_time=0500&nx=${nx}&ny=${ny}`;
  
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
      const fetchWeatherDataByImage = async () => {
        try {
          // 각 이미지에 따라 선택적으로 fetchWeatherData 호출
          await fetchWeatherData(105, 94, setPohangWeather);
          await fetchWeatherData(104, 83, setUlsanWeather);
          await fetchWeatherData(59, 69, setGoheungWeather);
          await fetchWeatherData(74, 63, setYeosuWeather);
        } catch (error) {
          console.error('날씨 정보를 가져오는 중 오류 발생:', error);
        }
      };
    
      fetchWeatherDataByImage();
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
            {/* <h2>울산 날씨 정보</h2> */}
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

        {goheungWeather &&(
          <div>
            {goheungWeather.response.body.items.item
            .filter((item) => item.category==='WSD' )
            .slice(0, 1)
            .map( (item, index) =>(
              <div key={index}>

                  {onGoheungWindSpeedData(item)}
                </div>
            ))
            }
            {/* ______________수정 필요할지도___________________ */}
            {goheungWeather.response.body.items.item
              .filter((item) => item.category === 'TMX')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onGoheungTMXData(item)}
                </div>
              ))}
              {goheungWeather.response.body.items.item
              .filter((item) => item.category === 'TMN')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onGoheungTMNData(item)}
                </div>
              ))}
          </div>
        )}
        

        {yeosuWeather &&(
          <div>
            {yeosuWeather.response.body.items.item
            .filter((item) => item.category==='WSD' )
            .slice(0, 1)
            .map( (item, index) =>(
              <div key={index}>
                {/* <p>풍속: {item.fcstValue} m/s</p> */}
                  {onYeosuWindSpeedData(item)}
                </div>
            ))}
            {yeosuWeather.response.body.items.item
              .filter((item) => item.category === 'TMX')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onYeosuTMXData(item)}
                </div>
              ))}
              {yeosuWeather.response.body.items.item
              .filter((item) => item.category === 'TMN')
              .slice(0, 1)
              .map((item, index) => (
                <div key={index}>
                  {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                  <p>풍속: {item.fcstValue} m/s</p> */}
                  {onYeosuTMNData(item)}
                </div>
              ))}
            
          </div>
        )}



      </div>
    );
  };
  

export default Weather;