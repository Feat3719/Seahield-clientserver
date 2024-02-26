import React from 'react';
import style from './MonitoringModalLog.module.css';

function MonitoringModalLog({ selectedLog }) {
    // detectedDate를 YYYY-MM-DD HH:MM:SS 형식으로 변환하는 함수
    const formatDate = (detectedDate) => {
        const date = new Date(detectedDate[0], detectedDate[1] - 1, detectedDate[2], detectedDate[3], detectedDate[4], detectedDate[5]);
        return date.toLocaleString();
    };

    return (
        <div className={style.cctv_log_contents}>
            <p className={style.cctv_log_title}>[ CCTV 상세 정보 ]</p>
            <p className={style.cctv_log_detail}>단위 : 개</p>
            <table className={style.modallog_table}>
                <thead>
                    <tr>
                        <th>CCTV ID</th>
                        <th>감지 날짜</th>
                        <th>객체 수</th>
                        <th>위험 지수</th>
                        <th>페트병</th>
                        <th>플라스틱</th>
                        <th>철</th>
                        <th>유리</th>
                        <th>망</th>
                        <th>밧줄</th>
                        <th>플라스틱 부표 외국기인</th>
                        <th>플라스틱 부표</th>
                        <th>스티로폼 조각</th>
                        <th>스티로폼 부표</th>
                        <th>스티로폼 박스</th>

                        {/* 추가적인 로그 정보의 제목 */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectedLog.cctvId}</td>
                        <td>{formatDate(selectedLog.detectedDate)}</td>
                        <td>{selectedLog.objectCount}</td>
                        <td>{selectedLog.riskIndex}</td>
                        <td>{selectedLog.petBottleCnt}</td>
                        <td>{selectedLog.plasticEtcCnt}</td>
                        <td>{selectedLog.metalCnt}</td>
                        <td>{selectedLog.glassCnt}</td>
                        <td>{selectedLog.netCnt}</td>
                        <td>{selectedLog.ropeCnt}</td>
                        <td>{selectedLog.plasticBuoyChinaCnt}</td>
                        <td>{selectedLog.plasticBuoyCnt}</td>
                        <td>{selectedLog.styrofoamPieceCnt}</td>
                        <td>{selectedLog.styrofoamBuoyCnt}</td>
                        <td>{selectedLog.styrofoamBoxCnt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MonitoringModalLog;