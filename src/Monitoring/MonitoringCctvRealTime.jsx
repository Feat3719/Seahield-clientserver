import style from './MonitoringCctvRealTime.module.css';

function MonitoringCctvRealTime({ cctvLogs, onSelectLog }) {
    // 선택된 로그의 상세 정보를 저장할 상태

    const handleRowClick = async (cctvLogId) => {
        try {
            onSelectLog(cctvLogId);
            console.log(cctvLogId)
        } catch (error) {
            console.error("Error fetching CCTV log details:", error);
        }
    }

    // 원본 배열을 변경하지 않고 역순으로 만들어 사용
    const reversedCctvLogs = [...cctvLogs].reverse();


    return (
        <div className={style.realTimeContainer}>
            <div className={style.realTime_title}>
                <p className={style.realTime_title_text}>CCTV 실시간 기록</p>
            </div>
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
                        {reversedCctvLogs.map((log, index) => (
                            <tr key={index} onClick={() => handleRowClick(log.cctvLogId)}>
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
    );
}

export default MonitoringCctvRealTime;
