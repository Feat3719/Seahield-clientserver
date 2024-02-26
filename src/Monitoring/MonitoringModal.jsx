import React, { useEffect, useState } from 'react';
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

    // 1번 카메라에 대한 데이터를 동적으로 가져오는 함수
    const fetchDynamicData = async () => {
        try {
            const response = await axios.get(`/api/cctv/logs-dynamic`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = response.data;
            setSelectedLog(data);
            setCctvLogs(prevLogs => [...prevLogs, data]);
        } catch (error) {
            console.error("Error fetching CCTV details:", error);
        }
    };

    // 2~10번 카메라에 대한 데이터를 정적으로 가져오는 함수
    const fetchStaticData = async (id) => {
        try {
            const response = await axios.get(`/api/cctv/logs-static-details/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedLog(response.data[0]);
        } catch (error) {
            console.error(`Error fetching data for CCTV ID ${id}:`, error);
        }
    };

    const onRowClick = async (id) => {
        // 클릭된 로그에 따라 적절한 데이터 패칭 함수 호출
        if (id === '1') {
            fetchDynamicData();
        } else {
            fetchStaticData(id);
        }
        setSelectedCctvId(id.toString());
    };

    // 초기 데이터 로딩만을 위한 useEffect 사용
    useEffect(() => {
        if (isOpen && selectedCctvId) {
            if (cctvId === '1') {
                fetchDynamicData();
            } else {
                fetchStaticData(cctvId);
            }
        }
    }, [isOpen, selectedCctvId]);

    const [imageUrl, setImageUrl] = useState(''); // 이미지 URL 상태

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
    }, [cctvId, isOpen]);


    const updateImage = () => {
        setLoading(true);
        const newImageUrl = `https://192.168.0.74:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`;
        setImageUrl(newImageUrl);
        setLoading(false);
    };


    //로그 업데이트
    useEffect(() => {
        if (selectedCctvId === '1') {
            const intervalId = setInterval(() => {
                updateImage(); // 이미지만 업데이트
                // 이제 fetchDataForCctvId 함수는 여기서 호출되지 않음
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [selectedCctvId, accessToken]);


    // 로그 선택 처리 함수
    // MonitoringModal 컴포넌트 내부
    const handleSelectLog = async (cctvLogId) => {
        try {
            const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setSelectedLog(response.data); // 사용자가 선택한 로그에 대한 상세 정보로만 상태를 업데이트합니다.
        } catch (error) {
            console.error("Error fetching CCTV log details:", error);
        }
    };


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
            selectedData = mokpoData;
            title = "목포지사";
            break;
        case 10:
            selectedData = geojeData;
            title = "거제지사";
            break;
        default:
            selectedData = []; // 기본값
            title = "지사 정보 없음";
    }

    //TrashChart2
    const fetchDataForCctvId = async (cctvId) => {
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
                console.error("Error fetching CCTV details:", error);
            }
        } else {
            try {
                const response = await axios.get(`/api/cctv/logs-static-details/${cctvId}`, {
                    params: { cctvId: cctvId.toString() },
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setSelectedLog(response.data[0]);
            } catch (error) {
                console.error(`Error fetching data for CCTV ID ${cctvId}:`, error);
            }
        }
    };



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

                    <div className={style.cctv_real_time}>
                        <MonitoringCctvRealTime
                            cctvLogs={cctvLogs} // cctvLogs는 1번 카메라의 로그 데이터
                            accessToken={accessToken}
                            onSelectLog={handleSelectLog} // 로그 선택 처리 함수 전달
                        />
                    </div>


                </div>



            </div>

        </motion.div>
    );
};

export default MonitoringModal;