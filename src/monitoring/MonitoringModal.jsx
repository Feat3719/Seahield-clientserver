import React, { useCallback, useEffect, useState } from 'react';
import style from './MonitoringModal.module.css';
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from 'react-redux';
import MonitoringModalPlace from './MonitoringModalPlace';
import TrashChart2 from './TrashChart2';
import MonitoringModalInfo from './MonitoringModalInfo';
import MonitoringModalLog from './MonitoringModalLog';
import MonitoringWeather from './MonitoringWeather';
import MonitoringCctvRealTime from './MonitoringCctvRealTime';

const MonitoringModal = ({ isOpen, onClose, cctvId }) => {

    const [selectedLog, setSelectedLog] = useState(null);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [selectedCctvId, setSelectedCctvId] = useState(cctvId);
    const [loading, setLoading] = useState(false);
    const [lastCctvLogId, setLastCctvLogId] = useState(null);
    const [cctvLogs, setCctvLogs] = useState([]);

    // 실시간 데이터 업데이트 로직을 개선합니다.
    const fetchDynamicData = useCallback(async () => {
        if (selectedCctvId === '1') {
            try {
                const response = await axios.get(`/api/cctv/logs-dynamic`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = response.data;

                // 새로운 로그가 있을 경우에만 상태를 업데이트합니다.
                if (data.cctvLogId !== lastCctvLogId) {
                    setSelectedLog(data);
                    setLastCctvLogId(data.cctvLogId);
                    setCctvLogs(prevLogs => [...prevLogs, data]);
                }
            } catch (error) {
                // console.error("Error fetching CCTV dynamic data:", error);
            }
        }
    }, [accessToken, selectedCctvId, lastCctvLogId]);


    // 1초마다 실시간 데이터를 확인하고 업데이트합니다.
    useEffect(() => {
        let intervalId;
        if (isOpen && selectedCctvId === '1') {
            intervalId = setInterval(fetchDynamicData, 1000);
        }

        return () => clearInterval(intervalId);
    }, [fetchDynamicData, isOpen, selectedCctvId]);


    // 2~10번 카메라에 대한 데이터를 정적으로 가져오는 함수
    const fetchStaticData = useCallback(async (id) => {
        try {
            const response = await axios.get(`/api/cctv/logs-static-details/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedLog(response.data[0]);
        } catch (error) {
            // console.error(`Error fetching data for CCTV ID ${id}:`, error);
        }
    }, [accessToken]);

    //TrashChart2
    const fetchDataForCctvId = useCallback(async (cctvId) => {
        if (cctvId === '1') {
            try {
                const response = await axios.get(`/api/cctv/logs-dynamic`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const data = response.data;
                if (data.cctvLogId !== lastCctvLogId) {
                    setSelectedLog(data);
                    setLastCctvLogId(data.cctvLogId);
                    setCctvLogs(prevLogs => [...prevLogs, data]);
                }
            } catch (error) {
                // console.error("Error fetching CCTV details:", error);
            }
        } else {
            try {
                const response = await axios.get(`/api/cctv/logs-static-details/${cctvId}`, {
                    params: { cctvId: cctvId.toString() },
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setSelectedLog(response.data[0]);
            } catch (error) {
                // console.error(`Error fetching data for CCTV ID ${cctvId}:`, error);
            }
        }
    }, [accessToken, lastCctvLogId]);

    const handleSelectLog = useCallback(async (cctvLogId) => {
        try {
            const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            // 선택된 로그에 대한 상세 정보로만 상태를 업데이트합니다.
            setSelectedLog(response.data);
        } catch (error) {
            // console.error("Error fetching CCTV log details:", error);
        }
    }, [accessToken]);

    const onRowClick = useCallback(async (id) => {
        // 클릭된 로그에 따라 적절한 데이터 패칭 함수 호출
        // 여기서는 상태 업데이트를 분리하여 진행합니다.
        if (id === '1') {
            // fetchDynamicData 호출 제거, 직접 handleSelectLog 호출로 대체
            handleSelectLog(id); // CCTV 실시간 기록의 행을 클릭했을 때만 호출
        } else {
            // fetchStaticData 호출 제거, 직접 handleSelectLog 호출로 대체
            handleSelectLog(id); // CCTV 실시간 기록의 행을 클릭했을 때만 호출
        }
        setSelectedCctvId(id.toString());
    }, [handleSelectLog]);


    const [imageUrl, setImageUrl] = useState(''); // 이미지 URL 상태


    // useEffect 예시
    useEffect(() => {
        if (isOpen) {
            if (cctvId === '1') {
                fetchDynamicData();
            } else {
                fetchStaticData(cctvId);
            }
        }
        // fetchDataForCctvId 함수가 정의되기 전에 사용되는 것을 피하기 위해
        // 함수를 상위로 이동시키거나, 함수 정의 후 useEffect를 배치
    }, [isOpen, cctvId, fetchDynamicData, fetchStaticData]);

    useEffect(() => {
        setSelectedCctvId(cctvId);
        if (cctvId && isOpen) {
            fetchDataForCctvId(cctvId).then(data => {
                setSelectedLog(data);
                // 모달이 열릴 때 첫 번째 데이터를 선택하는 로직을 추가
                if (data) {
                    onRowClick(data.cctvId);
                }
            });
        }
    }, [cctvId, isOpen, fetchDataForCctvId, onRowClick]);


    const updateImage = () => {
        setLoading(true);
        //강의실
        // const newImageUrl = `https://192.168.0.74:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`;
        //기숙사
        // const newImageUrl = `https://172.16.1.252:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`;
        //강당
        const newImageUrl = `https://192.168.0.12:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`;
        setImageUrl(newImageUrl);
        setLoading(false);
    };


    //로그 업데이트
    useEffect(() => {
        if (selectedCctvId === '1') {
            const intervalId = setInterval(() => {
                updateImage(); // 이미지 업데이트는 계속 진행
                // fetchDataForCctvId 호출을 통한 실시간 로그 업데이트도 계속 진행
                fetchDataForCctvId('1');
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [selectedCctvId, accessToken, fetchDataForCctvId]);




    const renderMedia = () => {
        if (selectedCctvId === '1') {
            return loading ? <p>Loading...</p> : <img src={imageUrl} alt="CCTV 1 View" className={style.modal_video} />;
        } else {
            const videoSrc = `${process.env.PUBLIC_URL}/videos/g${selectedCctvId}.mp4`;
            return (
                <video className={style.modal_video} controls autoPlay muted loop key={selectedCctvId}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }
    };

    const pohangData = [["1", "포항시", "포항구룡포 대보해변"]];
    const ulsanData = [
        ["2", "울산시", "울산대왕암"],
        ["3", "울산시", "울주진하해변"],
    ];

    const mokpoData = [
        ["4", "전남 고흥군", "고흥_신흥"],
        ["5", "전남 순천시", "순천반월"],
        ["6", "전남 신안군", "신안고장리해변"],
        ["7", "전남 완도군", "완도신지도해변"],
        ["8", "전남 여수시", "여수백야도해변"],
        ["9", "전남 고흥군", "고흥염포해변"],
    ];
    const geojeData = [["10", "거제시", "거제 두모 몽돌 해변"]];


    if (!isOpen) return null;

    //Modal 표
    let selectedData, title;
    switch (cctvId) {
        case 1:
            selectedData = pohangData;
            title = "포항지사";
            break;
        case 2:
            selectedData = ulsanData;
            title = "울산지사";
            break;
        case 4:
            selectedData = geojeData;
            title = "목포지사";
            break;
        case 10:
            selectedData = mokpoData;
            title = "거제지사";
            break;
        default:
            selectedData = []; // 기본값
            title = "지사 정보 없음";
    }






    return (
        <motion.div
            className={style.monitoringmodal}
            initial={{ y: -250, opacity: 0 }} // 시작 위치와 투명도
            animate={{ y: 0, opacity: 1 }} // 끝 위치와 투명도
            transition={{ duration: 0.3, delay: 0.2 }}>

            <div className={style.modalContent}>


                <div className={style.monitoringmodal_1}>

                    <div className={style.monitoringmodal_1_top}>
                        <div className={style.chart_title}>
                            <p className={style.chart_title_text}>폐기물 종류 비율</p>
                        </div>
                        {selectedLog ? <TrashChart2 key={JSON.stringify(selectedLog)} data={selectedLog} /> : <p>Loading...</p>}
                    </div>
                    <div className={style.monitoringmodal_1_bottom}>
                        <MonitoringModalPlace
                            data={selectedData}
                            title={title}
                            onRowClick={onRowClick}
                            selectedId={selectedCctvId}
                        />
                    </div>
                </div>

                <div className={style.monitoringmodal_2}>
                    <div className={style.video_area}>
                        {renderMedia(selectedCctvId)}
                    </div>

                    <div className={style.cctv_info_area}>
                        {selectedLog && <MonitoringModalInfo selectedLog={selectedLog} />}
                    </div>

                    <div className={style.cctv_log_area}>
                        {selectedLog && <MonitoringModalLog selectedLog={selectedLog} />}
                    </div>
                </div>

                <div className={style.monitoringmodal_3}>
                    <div className={style.closeButton} onClick={onClose}>X</div>

                    <div className={style.cctv_weather_area}>
                        <MonitoringWeather cctvId={selectedCctvId} />
                    </div>

                    {selectedCctvId === '1' && (
                        <div className={style.cctv_real_time}>
                            <MonitoringCctvRealTime
                                cctvLogs={cctvLogs} // cctvLogs는 1번 카메라의 로그 데이터
                                accessToken={accessToken}
                                onSelectLog={handleSelectLog} // 로그 선택 처리 함수 전달
                            />
                        </div>
                    )}

                </div>



            </div>

        </motion.div>
    );
};

export default MonitoringModal;