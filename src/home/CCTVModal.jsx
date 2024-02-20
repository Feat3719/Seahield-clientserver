import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import style from './CCTV.Module.css'; // 스타일 파일 경로 확인

function CCTVModal({ accessToken, onClose }) {
    const [cctvLogs, setCctvLogs] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);

    const fetchCCTVDetails = useCallback(async () => {
        try {
            const response = await axios.get("/api/cctv/logs-dynamic", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const newLogs = Array.isArray(response.data) ? response.data : [response.data];
            // 기존 로그와 새로운 로그를 합쳐서 상태에 업데이트합니다.
            setCctvLogs(prevLogs => [...prevLogs, ...newLogs]);
        } catch (error) {
            console.error("Error fetching CCTV details:", error);
        }
    }, [accessToken]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchCCTVDetails();
        }, 1000);
        // 컴포넌트가 언마운트될 때 interval 정리
        return () => clearInterval(intervalId);
    }, [fetchCCTVDetails]);

    const handleClickCctvId = async (cctvLogId) => {
        try {
            const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const selectedLogData = [response.data]; // 객체를 배열로 변환
            setSelectedLog(selectedLogData);
        } catch (error) {
            console.error("Error fetching CCTV details:", error);
        }
    };


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
                                </tr>
                            </thead>
                            <tbody>
                                {cctvLogs.map((log, index) => (
                                    <tr key={index} onClick={() => handleClickCctvId(log.cctvLogId)}>
                                        <td>{log.cctvId}</td>
                                        <td>{log.objectCount}</td>
                                        <td>{log.riskIndex}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>로딩 중이거나 데이터가 없습니다.</p>
                    )}
                </div>
            </div>
            {selectedLog && (
                <div className={style.modalBackground}>
                    <div className={style.modalContainer}>
                        <div className={style.modalHeader}>
                            <h2>Selected CCTV Log Details</h2>
                            <button onClick={() => setSelectedLog(null)} className={style.closeButton}>닫기</button>
                        </div>
                        <div className={style.modalContent}>
                            <table className={style.dataTable}>
                                <thead>
                                    <tr>
                                        {Object.keys(selectedLog[0]).map((key, index) => (
                                            <th key={index}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedLog.map((log, index) => (
                                        <tr key={index}>
                                            {Object.values(log).map((value, index) => (
                                                <td key={index}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CCTVModal;