import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './CCTV.Module.css';
// import SelectedLogDetails from './SelectedLogDetails';

function CCTVModal({ accessToken, onClose }) {
    const [cctvLogs, setCctvLogs] = useState([]);

    useEffect(() => {
        const fetchCCTVDetails = async () => {
            try {
                const response = await axios.get("/api/cctv/logs-dynamic", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const newLogs = Array.isArray(response.data) ? response.data : [response.data];

                setCctvLogs(prevLogs => {
                    const updatedLogs = [...prevLogs];
                    newLogs.forEach(newLog => {
                        const index = prevLogs.findIndex(log => log.cctvLogId === newLog.cctvLogId);
                        if (index === -1) {
                            updatedLogs.unshift(newLog);
                        } else if (prevLogs[index].detectedDate !== newLog.detectedDate) {
                            updatedLogs[index] = newLog;
                        }
                    });
                    return updatedLogs;
                });
            } catch (error) {
                console.error("Error fetching CCTV details:", error);
            }
        };

        const intervalId = setInterval(fetchCCTVDetails, 1000);
        return () => clearInterval(intervalId);
    }, [accessToken]);

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h2>CCTV 상세 정보</h2>
                    <button onClick={onClose} className={style.closeButton}>닫기</button>
                </div>
                <div className={style.modalContent}>
                    {cctvLogs.length > 0 ? (
                        <table className={style.dataTable}>
                            <thead>
                                <tr>
                                    <th>CCTV ID</th>
                                    <th>객체 수</th>
                                    <th>위험도</th>
                                    <th>시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cctvLogs.map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.cctvId}</td>
                                        <td>{log.objectCount}</td>
                                        <td>{log.riskIndex}</td>
                                        <td>{log.detectedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>로딩 중이거나 데이터가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CCTVModal;