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

const MonitoringModal = ({ isOpen, onClose, cctvId }) => {

    const [selectedLog, setSelectedLog] = useState(null);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [selectedCctvId, setSelectedCctvId] = useState(cctvId);

    const onRowClick = async (id) => {
        const response = await fetchDataForCctvId(id); // 선택된 CCTV ID에 해당하는 데이터 가져오기
        setSelectedLog(response); // 가져온 데이터를 selectedLog 상태에 저장
        setSelectedCctvId(id.toString()); // 필요시 문자열로 변환
    };
    // console.log(setSelectedLog)

    const videoSrc = `${process.env.PUBLIC_URL}/videos/g${selectedLog?.cctvId}.mp4`;

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


    useEffect(() => {
        // 모달이 열릴 때마다 cctvId를 selectedCctvId로 설정
        setSelectedCctvId(cctvId);
        if (cctvId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/cctv/logs-static-details/${cctvId}`, {
                        params: { cctvId: cctvId.toString() },
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setSelectedLog(response.data[0]); // 최신 로그 데이터 설정
                } catch (error) {
                    console.error(`Error fetching data for CCTV ID ${cctvId}:`, error);
                }
            };
            fetchData();
        }
    }, [cctvId, accessToken, isOpen]);





    useEffect(() => {
        if (cctvId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/cctv/logs-static-details/${cctvId}`, {
                        params: { cctvId: cctvId.toString() },
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setSelectedLog(response.data[0]); // 최신 로그 데이터 설정
                } catch (error) {
                    console.error(`Error fetching data for CCTV ID ${cctvId}:`, error);
                }
            };

            fetchData();
        }
    }, [cctvId, accessToken]);

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
        try {
            const response = await axios.get(`/api/cctv/logs-static-details/${cctvId}`, {
                params: { cctvId: cctvId.toString() },
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            // setSelectedLog 호출 방식 수정
            return response.data[0]; // 수정된 부분
        } catch (error) {
            console.error(`Error fetching data for CCTV ID ${cctvId}:`, error);
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
                        />
                    </div>
                </div>

                <div className={style.monitoringmodal_2}>
                    <div className={style.video_area}>
                        <video
                            className={style.modal_video}
                            controls autoPlay muted loop
                            key={selectedLog?.cctvId} // key 속성으로 selectedLog의 변경 감지
                        >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
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

                    </div>


                </div>



            </div>

        </motion.div>
    );
};

export default MonitoringModal;