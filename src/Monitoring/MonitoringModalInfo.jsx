import React from 'react';
import style from './MonitoringModalInfo.module.css';

function MonitoringModalInfo({ selectedLog }) {
    // detectedDate를 YYYY-MM-DD HH:MM:SS 형식으로 변환
    const formatDate = (detectedDate) => {
        const date = new Date(detectedDate[0], detectedDate[1] - 1, detectedDate[2], detectedDate[3], detectedDate[4], detectedDate[5]);
        return date.toLocaleString();
    };

    return (
        <div className={style.cctv_info}>
            <p className={style.cctv_info_text1}>[ CCTV 정보 ]</p>
            <p className={style.cctv_info_text}>ID: {selectedLog.cctvId}</p>
            <p className={style.cctv_info_text}>최신 감지 날짜: {formatDate(selectedLog.detectedDate)}</p>
        </div>
    );
}

export default MonitoringModalInfo;
