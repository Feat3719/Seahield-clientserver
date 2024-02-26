import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import style from './Monitoring.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import AnnounceListHomepage from '../announce/AnnounceListHomepage';
import { motion } from "framer-motion";
import CameraCircle from '../home/CameraCircle';
import MonitoringModal from './MonitoringModal';


function Monitoring() {


    const accessToken = useSelector((state) => state.auth.accessToken);
    const [cctvData, setCctvData] = useState({ 1: [], 2: [], 10: [], 4: [] });
    const [selectedCounts, setSelectedCounts] = useState({ 1: 0, 2: 0, 10: 0, 4: 0 });
    const [selectedCctvId, setSelectedCctvId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //시간
    const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date()); // 매초마다 현재 시간 업데이트
        }, 1000);

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
        };
    }, []);


    // 탐지된 쓰레기의 총 개수를 저장할 상태 변수 추가
    const [totalDetectedTrash, setTotalDetectedTrash] = useState(0);

    useEffect(() => {
        const fetchLatestLogs = async () => {
            const cctvIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const logResponses = await Promise.all(cctvIds.map(id =>
                axios.get(`/api/cctv/logs-static-details/${id}`, {
                    params: { cctvId: id.toString() },
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                    .then(response => ({
                        cctvId: id,
                        data: response.data
                    }))
                    .catch(error => console.error(`Error fetching logs for CCTV ID ${id}:`, error))
            ));
            const totalTrashCount = logResponses.reduce((acc, { data }) => acc + data.reduce((sum, log) => sum + log.objectCount, 0), 0);
            setTotalDetectedTrash(totalTrashCount);
        };
        fetchLatestLogs();
    }, [accessToken]);


    // 숫자 애니메이션을 위한 상태 추가
    const [animatedCount, setAnimatedCount] = useState(0);

    useEffect(() => {
        let start = animatedCount;
        const end = totalDetectedTrash;

        // 시작 숫자가 목표 숫자에 도달하면 함수 종료
        if (start === end) return;

        // 숫자를 점진적으로 증가시키기 위한 함수
        const increment = (step) => {
            setAnimatedCount(prev => {
                if (prev < end) {
                    return prev + step;
                }
                return end;
            });
        };

        // 10ms마다 숫자를 1씩 증가
        const interval = setInterval(() => {
            increment(90); // 증가량 조절 가능
        }, 2);

        // 목표 숫자에 도달하거나 컴포넌트가 언마운트될 때 인터벌 정리
        return () => clearInterval(interval);
    }, [totalDetectedTrash, animatedCount]);

    //modal 모달

    // 모달을 열고 닫는 함수
    const openModal = (cctvId) => {
        setIsModalOpen(true);
        setSelectedCctvId(cctvId);
    };
    const closeModal = () => setIsModalOpen(false);


    //빨간원
    useEffect(() => {
        const fetchCctvData = async (id) => {
            try {
                const response = await axios.get(`/api/cctv/logs-static-details/${id}`, {
                    params: { cctvId: id.toString() },
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const latestLogs = response.data.slice(0, 3); // 최신 3개의 로그만 반환
                console.log(`CCTV ${id} 최신 로그:`, latestLogs.map(log => log.objectCount)); // 로그 출력
                return latestLogs;
            } catch (error) {
                console.error(`Error fetching data for CCTV ID ${id}:`, error);
                return [];
            }
        };

        const cctvIds = [1, 2, 10, 4];
        const updateCctvData = async () => {
            for (let id of cctvIds) {
                const data = await fetchCctvData(id);
                setCctvData(prev => ({ ...prev, [id]: data.map(item => item.objectCount) }));
            }
        };

        updateCctvData(); // 최초 실행으로 초기 데이터를 로드합니다.

        const interval = setInterval(() => {
            cctvIds.forEach(async (id) => {
                const data = await fetchCctvData(id);
                setCctvData(prev => ({ ...prev, [id]: data.map(item => item.objectCount) }));
            });
        }, 90000); // 9000마다 데이터 갱신

        return () => clearInterval(interval);
    }, [accessToken]);

    useEffect(() => {
        const updateCounts = () => {
            const ids = Object.keys(cctvData);
            ids.forEach(id => {
                // 각 CCTV ID별로 순차적으로 objectCounts를 업데이트합니다.
                let countIndex = 0; // 현재 objectCount의 인덱스
                const updateInterval = setInterval(() => {
                    if (cctvData[id].length > 0) {
                        setSelectedCounts(prev => ({ ...prev, [id]: cctvData[id][countIndex] }));
                        countIndex = (countIndex + 1) % cctvData[id].length; // 다음 objectCount로 이동
                    }
                }, 3000); // 3초 간격으로 변경

                return () => clearInterval(updateInterval); // Cleanup
            });
        };

        updateCounts(); // CCTV 데이터가 업데이트될 때마다 objectCounts를 업데이트합니다.
    }, [cctvData]); // CCTV 데이터가 변경될 때마다 이 useEffect를 실행합니다.



    return (
        <Wrapper>
            <div className={style.monitoring}>

                <div className={style.login_nav}>
                    <Sidenav />
                </div>


                <div className={style.monitoring_area}>

                    <div className={style.sub_title}>
                        해안쓰레기 현황 지도
                        <span className={style.clock}>
                            {currentTime.toLocaleTimeString()}
                        </span>
                    </div>


                    <div className={style.monitoring_place}>


                        <div className={style.monitoring_place_1}>

                            <div className={style.monitoring_place_1_top}>

                                <div className={style.circle_info1}>
                                    <p className={style.circle_info_detail}>지도에 나타난 <span className={style.circle_info_detail_red}>붉은 원</span>은</p>
                                    <p className={style.circle_info_detail}><span className={style.circle_info_detail_blue}>해안쓰레기 탐지 갯수</span>에 따라</p>
                                    <p className={style.circle_info_detail}>실시간으로 변화합니다.</p>
                                </div>


                                <div className={style.circle_info2}>
                                    <p className={style.circle_info_detail2}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                            alt="logo"
                                            className={style.cctv_img}
                                        /> CCTV 이미지를 클릭하시면</p>
                                    <p className={style.circle_info_detail2}>해안 쓰레기 상세 내용과</p>
                                    <p className={style.circle_info_detail2}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                            alt="logo"
                                            className={style.cctv_img}
                                        />
                                        CCTV 영상을</p>
                                    <p className={style.circle_info_detail2}>확인하실 수 있습니다.</p>
                                </div>


                            </div>

                            <div className={style.monitoring_place_1_bottom}>
                                <div className={style.trash_detection}>
                                    <p className={style.trash_detection_text}>[ 현재까지 탐지된 쓰레기의 총 개수 ]</p>
                                    <p className={style.trash_detection_text}>{animatedCount.toLocaleString()}개</p>
                                </div>
                            </div>


                        </div>


                        <div className={style.monitoring_place_2}>
                            <img src={`${process.env.PUBLIC_URL}/images/korea2.png`} alt="korea" className={style.korea} />
                            <MonitoringModal isOpen={isModalOpen} onClose={closeModal} cctvId={selectedCctvId} />
                            <motion.img
                                src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                alt="CCTV 1"
                                className={style.cctv1}
                                whileHover={{ scale: 1.3 }}
                                transition={{ type: "hover", stiffness: 300 }}
                                onClick={() => openModal(1)}
                            />
                            <motion.img
                                src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                alt="CCTV 2"
                                className={style.cctv2}
                                whileHover={{ scale: 1.3 }}
                                transition={{ type: "hover", stiffness: 300 }}
                                onClick={() => openModal(2)}
                            />
                            <motion.img
                                src={`${process.env.PUBLIC_URL}/images/cctv-icon-3.png`}
                                alt="CCTV 3"
                                className={style.cctv3}
                                whileHover={{ scale: 1.3 }}
                                transition={{ type: "hover", stiffness: 300 }}
                                onClick={() => openModal(4)}
                            />
                            <motion.img
                                src={`${process.env.PUBLIC_URL}/images/cctv-icon-3.png`}
                                alt="CCTV 4"
                                className={style.cctv4}
                                whileHover={{ scale: 1.3 }}
                                transition={{ type: "hover", stiffness: 300 }}
                                onClick={() => openModal(10)}
                            />
                            {Object.entries(selectedCounts).map(([id, count]) => (
                                // CameraCircle 컴포넌트에 현재 선택된 objectCount를 전달합니다.
                                <CameraCircle key={id} count={count} cctvId={id} />
                            ))}
                        </div>

                        <div className={style.monitoring_place_3}>
                            <div className={style.homepage_announce}>
                                <p className={style.announce_title}>수거계약 공고</p>
                                < AnnounceListHomepage />
                            </div>
                        </div>





                    </div>




                </div>







            </div >





        </Wrapper >
    )
}

export default Monitoring;