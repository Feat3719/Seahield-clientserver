import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './CCTV.Module.css';
import SelectedLogDetails from './SelectedLogDetails'; // SelectedLogDetails 컴포넌트 import

function CCTVModal({ accessToken, onClose, setSelectedLogComponent }) { // setSelectedLogComponent를 추가하여 SelectedLogDetails 컴포넌트를 전달합니다.
    const [cctvLogs, setCctvLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCCTVDetails();
        }, 1000);

        // 컴포넌트가 언마운트될 때 interval 정리
        return () => clearInterval(intervalId);
    }, [accessToken]);

    const fetchCCTVDetails = async () => {
        try {
            const response = await axios.get("/api/cctv/logs-dynamic", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const newLogs = Array.isArray(response.data) ? response.data : [response.data];

            // 새 로그가 기존 로그에 없는 경우에만 추가
            setCctvLogs(prevLogs => {
                const updatedLogs = [...prevLogs];
                newLogs.forEach(newLog => {
                    if (!prevLogs.some(log => log.cctvLogId === newLog.cctvLogId)) {
                        updatedLogs.unshift(newLog); // 새로운 로그를 배열의 맨 앞에 추가
                    } else {
                        // 이미 존재하는 경우에는 detectedDate로 업데이트된 값인지 확인
                        const existingLogIndex = prevLogs.findIndex(log => log.cctvLogId === newLog.cctvLogId);
                        if (prevLogs[existingLogIndex].detectedDate !== newLog.detectedDate) {
                            updatedLogs[existingLogIndex] = newLog;
                        }
                    }
                });
                return updatedLogs;
            });
        } catch (error) {
            console.error("Error fetching CCTV details:", error);
        }
    };

    const handleClickCctvId = async (cctvLogId) => {
        try {
            const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const selectedLogData = response.data; // 객체 형태로 유지

            setSelectedLog(selectedLogData);
            setSelectedLogComponent(<SelectedLogDetails selectedLog={selectedLogData} onClose={() => setSelectedLog(null)} />);
        } catch (error) {
            console.error("Error fetching CCTV details:", error);
        }
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <div className={style.modalHeader}>
                    <h2>CCTV 상세 정보</h2>
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
                            <tbody className={style.tbody_cell}>
                                {cctvLogs.map((log, index) => (
                                    <tr key={index} onClick={() => handleClickCctvId(log.cctvLogId)}>
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
                    {/* <button onClick={onClose} className={style.closeButton}>닫기</button> */}

                </div>
            </div>
        </div>
    );
}

export default CCTVModal;