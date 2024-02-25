import React from 'react';
import style from './MonitoringModalInfo.module.css';

function MonitoringModalInfo({ selectedLog }) {
    // detectedDate 배열을 YYYY-MM-DD HH:MM:SS 형식으로 변환하는 함수
    const formatDate = (detectedDate) => {
        if (!detectedDate || detectedDate.length !== 6) return '';
        // detectedDate 배열에서 각 요소를 추출
        const [year, month, day, hour, minute, second] = detectedDate;
        // Date 객체 생성
        const date = new Date(year, month - 1, day, hour, minute, second);
        // 로케일에 맞는 날짜와 시간 문자열로 변환
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
