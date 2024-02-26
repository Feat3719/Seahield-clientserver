// MonitoringWeather.jsx
import React from 'react';
import MWeather from './MWeather';
import style from './MWeather.module.css';

function MonitoringWeather({ cctvId }) {
    return (
        <div className={style.mweather}>
            <MWeather cctvId={cctvId} />
        </div>
    );
}

export default MonitoringWeather;
