// import React from 'react';
import React, { useEffect, useState } from "react";
// import Modal from './Modal';
import Weather from "./Weather";
import style from "./Homepage.module.css";
// import RedDot from "./RedDot";
import { useSelector } from "react-redux";
import Sidenav from "../sidenav/Sidenav";
import Wrapper from "../pagechange/Wrapper";
// import CCTVModal from "./CCTVModal";
import axios from "axios";
import MaterialChart from "./MaterialChart";
import CCTVModal from "./CCTVModal";
import MaterialChart2 from "./MaterialChart2";
import CameraCircle from "./CameraCircle";
import AnnounceListHomepage from "../announce/AnnounceListHomepage";


const images = [
    "cctv-icon-1.png",
    "cctv-icon-2.png",
    "cctv-icon-3.png",
    "cctv-icon-4.png",
];
// const videos = ['video1.mp4', 'video2.mp4'];
const iconMappings = {
    "cctv-icon-1.png": {
        image: "cctv-icon-1.png",
        // style: { top: '48vh', position: 'absolute', right: '3.5vw', margin: '0%' },
        class: "cctv_1", // 스타일을 추가로 지정
    },
    "cctv-icon-2.png": {
        image: "cctv-icon-2.png",
        // style: { top: '60vh', position: 'absolute', right: '4vw' }, // 스타일을 추가로 지정
    },
    "cctv-icon-3.png": {
        image: "cctv-icon-3.png",
        // style: { top: '78vh', position: 'absolute', right: '27.5vw' }, // 스타일을 추가로 지정
    },
    "cctv-icon-4.png": {
        image: "cctv-icon-3.png",
        // style: { top: '76.5vh', position: 'absolute', right: '8.5vw' }, // 스타일을 추가로 지정
    },
    // 다른 이미지에 대한 매핑 추가
};

function Homepage() {
    // const [key, setKey] = useState(Date.now());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setKey(Date.now());
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    const [imageUrl, setImageUrl] = useState(
        `https://172.16.1.252:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const updateImage = () => {
            setLoading(true);
            const newImageUrl = `https://172.16.1.252:8000/static/webcamapp/detect/exp/temp.jpg?${Date.now()}`;

            // 이미지가 완전히 로드될 때까지 기다립니다.
            const img = new Image();
            img.onload = () => {
                setLoading(false);
                setImageUrl(newImageUrl);
            };
            img.src = newImageUrl;
        };

        const intervalId = setInterval(updateImage, 200); // 200ms 마다 이미지 업데이트

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const accessToken = useSelector((state) => state.auth.accessToken);

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

    const [selectedLog, setSelectedLog] = useState(null);
    // const [cctvLog, setCctvLog] = useState([]);

    // const [selectedId, setSelectedId] = useState(null);
    const [latestLogs, setLatestLogs] = useState([]);
    // const [selectedCctvId, setSelectedCctvId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태

    const handleClick1 = (cctvLogId) => {
        //클릭한 배열의 값의 첫번째값으로 cctvId찾는 과정
        // 이거 안하면 +1된 cctvId찾아서 보여주게됨
        const logData = latestLogs.find((log) => log.cctvId === String(cctvLogId));
        if (logData) {
            setSelectedLog(logData);
            setShowModal(true); // 클릭 시 모달을 표시하도록 상태 업데이트
            // setShowDetails(false); // 상세 정보를 바로 보여주지 않도록 설정
            // setCctvLog(logData)
        } else {
        }
    };

    const handleImageClick = (image) => {
        if (selectedImage === image) {
            setSelectedImage(null);
            setModalOpen(false);
            // setIsweather(true);
        } else {
            setSelectedImage(image);
            setModalOpen(true);
            // setIsweather(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalOpen(false);
        // setIsweather(true);
        // setSmallScreenImage(selectedImage); // 선택된 영상을 작은 화면으로 전환
        setSelectedImage(null);
        // setSelectedDetail([]);
        setSelectedLog([]);
    };
    // 모달 내용 클릭 시 이벤트 버블링 방지
    const handleModalContentClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const fetchCCTVDetail = async (cctvLogId) => {
            try {
                // 여기서 response를 직접 사용하지 않으므로 이 부분을 제거할 수 있습니다.
                await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // 필요한 데이터가 있다면 여기서 처리합니다.
            } catch (error) {
                console.error("CCTV 세부 정보 가져오기 오류:", error);
            }
        };

        if (selectedLog && selectedLog.cctvLogId) {
            fetchCCTVDetail(selectedLog.cctvLogId);
        }
    }, [selectedLog, accessToken]);

    useEffect(() => {
        const fetchLatestLogs = async () => {
            const cctvIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const logRequests = cctvIds.map((id) =>
                // axios.get(`/api/cctv//api/cctv/logs-static/${id}`, {
                axios
                    .get(`/api/cctv/logs-static-details/${id}`, {
                        params: { cctvId: id.toString() },
                        headers: { Authorization: `Bearer ${accessToken}` },
                    })
                    .then((response) => ({
                        cctvId: id,
                        data: response.data,
                    }))
                    .catch((error) =>
                        console.error(`Error fetching logs for CCTV ID ${id}:`, error)
                    )
            );

            const logResponses = await Promise.all(logRequests);
            let totalTrashCount = 0;

            const latestData = logResponses.map(({ cctvId, data }) => {
                if (!data || !data.length) return null;
                const latestLog = data.reduce((latest, current) => {
                    const latestDate = new Date(latest.detectedDate);
                    const currentDate = new Date(current.detectedDate);
                    if (latestDate > currentDate) {
                        totalTrashCount += latest.objectCount; // 최신 로그의 쓰레기 개수를 더합니다
                        return latest;
                    } else {
                        totalTrashCount += current.objectCount; // 현재 로그의 쓰레기 개수를 더합니다
                        return current;
                    }
                });
                return { cctvId, ...latestLog };
            }).filter(log => log !== null);

            setTotalDetectedTrash(totalTrashCount); // 상태 업데이트
            setLatestLogs(latestData);
        };

        fetchLatestLogs();
    }, [accessToken]);

    const pohangTableBody = (
        <tbody className={style.tbody}>
            {pohangData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <td
                            key={colIndex}
                            className={`${style.cell} ${colIndex > 0 ? style.clickable : ""}`}
                            // onClick={() => handleClick(cell)}
                            onClick={() => handleClick1(row[0])} // 첫 번째 셀의 값이 cctvId라고 가정합니다.
                            style={{ height: "1vh", width: "19vw" }}
                        >
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
    const ulsanTableBody = (
        <tbody>
            {ulsanData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <td
                            key={colIndex}
                            className={`${style.cell} ${colIndex > 0 ? style.clickable : ""}`}
                            onClick={() => handleClick1(row[0])} // 첫 번째 셀의 값이 cctvId라고 가정합니다.
                            style={{ height: "1vh", width: "19vw" }}
                        >
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
    const mokpoTableBody = (
        <tbody>
            {mokpoData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <td
                            key={colIndex}
                            className={`${style.cell} ${colIndex > 0 ? style.clickable : ""}`}
                            // onClick={() => {
                            // handleClick(cell);
                            // }}
                            onClick={() => handleClick1(row[0])}
                            style={{ height: "1vh", width: "19vw" }}
                        >
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
    const geojeTableBody = (
        <tbody>
            {geojeData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <td
                            key={colIndex}
                            className={`${style.cell} ${colIndex > 0 ? style.clickable : ""}`}
                            // onClick={() => {
                            // handleClick(cell);
                            // }}
                            onClick={() => handleClick1(row[0])}
                            style={{ height: "1vh", width: "19vw" }}
                        >
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );

    // _________날씨정보 변수 지정__________

    const pohangWeatherInfo = (
        <div>
            <h2>포항 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 포항 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onPohangTMXData={(item) => (
                    <div>
                        <p>최고 기온: {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onPohangTMNData={(item) => (
                    <div>
                        <p>최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
                onUlsanWindSpeedData={() => { }}
                onUlsanTMXData={() => { }}
                onUlsanTMNData={() => { }}
                onGoheungWindSpeedData={() => { }}
                onGoheungTMXData={() => { }}
                onGoheungTMNData={() => { }}
                onYeosuWindSpeedData={() => { }}
                onYeosuTMXData={() => { }}
                onYeosuTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onWandoWindSpeedData={() => { }}
                onWandoTMXData={() => { }}
                onWandoTMNData={() => { }}
                onShinanWindSpeedData={() => { }}
                onShinanTMXData={() => { }}
                onShinanTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
            />
        </div>
    );

    const ulsanWeatherInfo = (
        <div>
            <h2>울산 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={() => { }}
                onPohangTMXData={() => { }}
                onPohangTMNData={() => { }}
                onGoheungWindSpeedData={() => { }}
                onGoheungTMXData={() => { }}
                onGoheungTMNData={() => { }}
                onYeosuWindSpeedData={() => { }}
                onYeosuTMXData={() => { }}
                onYeosuTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onWandoWindSpeedData={() => { }}
                onWandoTMXData={() => { }}
                onWandoTMNData={() => { }}
                onShinanWindSpeedData={() => { }}
                onShinanTMXData={() => { }}
                onShinanTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
                onUlsanWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onUlsanTMXData={(item) => (
                    <div>
                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onUlsanTMNData={(item) => (
                    <div>
                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
            />
        </div>
    );
    const goheungWeatherInfo = (
        <div>
            <h2>고흥 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={() => { }}
                onPohangTMXData={() => { }}
                onPohangTMNData={() => { }}
                onUlsanWindSpeedData={() => { }}
                onUlsanTMXData={() => { }}
                onUlsanTMNData={() => { }}
                onYeosuWindSpeedData={() => { }}
                onYeosuTMXData={() => { }}
                onYeosuTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onWandoWindSpeedData={() => { }}
                onWandoTMXData={() => { }}
                onWandoTMNData={() => { }}
                onShinanWindSpeedData={() => { }}
                onShinanTMXData={() => { }}
                onShinanTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
                onGoheungWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onGoheungTMXData={(item) => (
                    <div>
                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onGoheungTMNData={(item) => (
                    <div>
                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
            />
        </div>
    );

    const yeosuWeatherInfo = (
        <div>
            <h2>여수 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={() => { }}
                onPohangTMXData={() => { }}
                onPohangTMNData={() => { }}
                onUlsanWindSpeedData={() => { }}
                onUlsanTMXData={() => { }}
                onUlsanTMNData={() => { }}
                onGoheungWindSpeedData={() => { }}
                onGoheungTMXData={() => { }}
                onGoheungTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onWandoWindSpeedData={() => { }}
                onWandoTMXData={() => { }}
                onWandoTMNData={() => { }}
                onShinanWindSpeedData={() => { }}
                onShinanTMXData={() => { }}
                onShinanTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
                onYeosuWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onYeosuTMXData={(item) => (
                    <div>
                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onYeosuTMNData={(item) => (
                    <div>
                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
            />
        </div>
    );

    const wandoWeatherInfo = (
        <div>
            <h2>완도 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={() => { }}
                onPohangTMXData={() => { }}
                onPohangTMNData={() => { }}
                onUlsanWindSpeedData={() => { }}
                onUlsanTMXData={() => { }}
                onUlsanTMNData={() => { }}
                onGoheungWindSpeedData={() => { }}
                onGoheungTMXData={() => { }}
                onGoheungTMNData={() => { }}
                onYeosuWindSpeedData={() => { }}
                onYeosuTMXData={() => { }}
                onYeosuTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onShinanWindSpeedData={() => { }}
                onShinanTMXData={() => { }}
                onShinanTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
                onWandoWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onWandoTMXData={(item) => (
                    <div>
                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onWandoTMNData={(item) => (
                    <div>
                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
            />
        </div>
    );

    const ShinanWeatherInfo = (
        <div>
            <h2> 신안 날씨 정보</h2>
            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
            <Weather
                onPohangWindSpeedData={() => { }}
                onPohangTMXData={() => { }}
                onPohangTMNData={() => { }}
                onUlsanWindSpeedData={() => { }}
                onUlsanTMXData={() => { }}
                onUlsanTMNData={() => { }}
                onGoheungWindSpeedData={() => { }}
                onGoheungTMXData={() => { }}
                onGoheungTMNData={() => { }}
                onYeosuWindSpeedData={() => { }}
                onYeosuTMXData={() => { }}
                onYeosuTMNData={() => { }}
                onWandoWindSpeedData={() => { }}
                onWandoTMXData={() => { }}
                onWandoTMNData={() => { }}
                onGeojeWindSpeedData={() => { }}
                onGeojeTMXData={() => { }}
                onGeojeTMNData={() => { }}
                onSuncheonWindSpeedData={() => { }}
                onSuncheonTMXData={() => { }}
                onSuncheonTMNData={() => { }}
                onShinanWindSpeedData={(item) => (
                    <div>
                        <p>풍속: {item.fcstValue} m/s</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onShinanTMXData={(item) => (
                    <div>
                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                    </div>
                )}
                onShinanTMNData={(item) => (
                    <div>
                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                        <p>
                            기준 시간: {item.baseDate} {item.baseTime}
                        </p>
                    </div>
                )}
            />
        </div>
    )

    //빨간원
    // 최신 로그를 저장할 상태를 추가합니다.
    const [objectCounts, setObjectCounts] = useState({});

    useEffect(() => {
        const interval = setInterval(async () => {
            const responses = await Promise.all(
                images.map((_, index) => axios.get(`/api/cctv/logs-static/${index + 1}`, {
                    params: { cctvId: (index + 1).toString() }
                }))
            );

            // 새로운 오브젝트 카운트 상태를 생성합니다.
            const newCounts = {};
            responses.forEach((response, index) => {
                const cctvId = index + 1;
                const logs = response.data;
                if (logs.length > 0) {
                    newCounts[cctvId] = logs.slice(0, 3).map(log => log.objectCount); // 가장 최근 로그의 objectCount를 사용합니다.
                }
            });

            setObjectCounts(newCounts);
            console.log(newCounts)
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // // CameraCircle 컴포넌트의 크기를 조절하는 함수를 추가합니다.
    // const calculateCircleSize = (count) => {
    //     // 숫자에 따른 원의 크기를 결정합니다.
    //     if (count > 30) return 100; // 'large'
    //     if (count > 20) return 75; // 'medium'
    //     return 10; // 'small'
    // };

    // 각 CCTV에 대해 원의 크기를 변경하는 로직
    useEffect(() => {
        const updateCircleSizes = () => {
            // 새로운 오브젝트 카운트 상태를 복사하고 업데이트합니다.
            const newCounts = { ...objectCounts };

            Object.keys(newCounts).forEach(cctvId => {
                const counts = newCounts[cctvId];
                if (counts && counts.length > 0) {
                    // 배열의 첫 번째 값을 사용하여 크기 업데이트
                    const firstCount = counts.shift(); // 배열에서 첫 번째 원소 제거
                    counts.push(firstCount); // 제거된 원소를 배열 끝에 추가
                    newCounts[cctvId] = counts; // 변경된 배열로 업데이트
                }
            });

            setObjectCounts(newCounts);
        };

        const intervalId = setInterval(updateCircleSizes, 3000); // 3초마다 원의 크기 업데이트

        return () => {
            clearInterval(intervalId);
        };
    }, [objectCounts]);



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
        const fetchDynamicLogForCameraOne = async () => {
            try {
                const response = await axios.get(`/api/cctv/logs-dynamic`, {
                    params: { cctvId: '1' } // 1번 카메라에 대한 정보만 요청
                });

                // 새로운 오브젝트 카운트 상태를 업데이트합니다.
                const logData = response.data;
                if (logData) {
                    // 오브젝트 카운트 정보 업데이트
                    setObjectCounts({ '1': logData.objectCount });
                }
            } catch (error) {
                console.error("Error fetching dynamic log for camera 1:", error);
            }
        };

        fetchDynamicLogForCameraOne();
    }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 호출되도록 함



    return (
        <Wrapper>
            {/* 조건 추가가능 */}
            {/* {userType === "관리자"&&( */}
            <div className={style.home_box} style={{ overflow: "hidden" }}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                <div className={style.home_box_2} style={{ overflow: "hidden" }}>
                    <div>
                        <table>
                            {/* <CCTVModal
                                                            icon="cctv-icon-1.png"
                                                            videoUrl="/videos/sea.mp4"
                                                            tableBody={pohangTableBody} 
                                                            // pohangTableBody를 props로 전달
                                                            /> */}
                        </table>
                        {/* {isweather &&(
                        <div >
                            {pohangWeatherInfo}
                        </div>
                    )} */}
                        {isModalOpen && (
                            <div className={style.modal} onClick={handleCloseModal}>
                                {/* <div className={style.sealist} onClick={handleCloseModal}>
                    {selectedImage === "cctv-icon-1.png" && pohangTableBody}
                    </div> */}

                                {selectedImage === "cctv-icon-1.png" && (
                                    // <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="Modal img2.jpg"
                                    //     style={{ width: '110%', height: '200%', position: 'relative', top: '-22%'}}
                                    // />
                                    <div
                                        className={style.modal_1_form}
                                        onClick={handleModalContentClick}
                                    >
                                        {/* {showModal && (
                <CCTVModal
                    selectedLog={selectedLog}
                    onClose={handleCloseModal}
                />
            )} */}

                                        {/* <video className={style.Bigvideo}
                                // width="700vw"
                                // height="380vh"
                                controls
                                autoPlay
                                muted
                            >
                                <source
                                    src={process.env.PUBLIC_URL + "/videos/sea.mp4"}
                                    type="video/mp4"
                                />
                            </video> */}

                                        {/* <VideoPlayer videoUrl={videoUrl} frameRate={24} />; */}

                                        {/* <video className={style.modal_video} controls autoPlay muted loop>                           
            <source src={'http://192.168.0.74:8000/static/webcamapp/video/video.mp4'} type="video/mp4" />
            </video> */}
                                        {selectedLog && (
                                            <div>
                                                {/* <img key={key} src={`http://192.168.0.33:8000/static/webcamapp/detect/exp/temp.jpg?${key}`} /> */}
                                                <div style={{ position: "relative" }}>
                                                    <img
                                                        src={imageUrl}
                                                        alt="감지된 활동"
                                                        style={{ opacity: loading ? 1 : 1 }}
                                                    />
                                                    {loading && (
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                left: 0,
                                                                width: "100%",
                                                                height: "100%",
                                                                background: "rgba(255, 255, 255, 0)",
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ height: "1vh" }}>
                                            <div className={style.weatherinfo}></div>

                                            <div className={style.trashinfo}>
                                                <div></div>
                                            </div>
                                        </div>
                                        <table style={{ height: "1vh" }}></table>
                                        <button
                                            onClick={handleCloseModal}
                                            className={style.closeButton}
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}

                                {selectedImage === "cctv-icon-2.png" && (
                                    <div
                                        className={style.modal_1_form}
                                        onClick={handleModalContentClick}
                                    >
                                        {selectedLog && (
                                            <div>
                                                <video
                                                    className={style.modal_video}
                                                    key={selectedLog.cctvId}
                                                    controls
                                                    autoPlay
                                                    muted
                                                    loop
                                                >
                                                    <source
                                                        src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                                <p>CCTV ID: {selectedLog.cctvId}</p>
                                                <p>최신 감지 날짜: {selectedLog.detectedDate}</p>
                                                <p>위험도: {selectedLog.riskIndex}</p>
                                                <p>쓰레기 수: {selectedLog.objectCount}</p>
                                                {/* <p>{goheungWeatherInfo}</p> */}
                                            </div>
                                        )}

                                        {/* <p>2번 CCTV / 울산 / 어딘가</p> */}

                                        <div style={{ height: "1vh" }}>
                                            <div className={style.weatherinfo}>
                                                {/* 쓰레기 불러오는 부분 */}
                                                {/* <ul style={{listStyleType: "none"}}>
                                    <li style={{listStyleType: "none"}}>
                                    {logdata.length > 0 ? `탐지된 쓰레기 수: ${logdata[0].objectCount}` : 'Loading...'}
                                    </li>
                                    <li style={{listStyleType: "none"}}>
                                        {logdata.length > 0 ? `위험도: ${logdata[0].riskIndex}` : 'Loading...'}
                                    </li>
                                </ul> */}
                                                {/* {ulsanWeatherInfo} */}
                                                {/* {selectedDetail.length > 0 && (
                                <ul style={{listStyleType: "none"}}>
                                        {selectedDetail.map((item, index) => (
                                            <li key={index} onClick={() => handleDetailClick(index)} style={{ cursor: 'pointer' }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                )} */}

                                                <div>{/* latestLogs를 사용하여 UI 렌더링 */}</div>
                                            </div>
                                        </div>
                                        {/* <table style={{height:'1vh'}}>
                                {selectedImage === "cctv-icon-2.png" && ulsanTableBody }
                                <CCTVModal tableBody={pohangTableBody} />
                                </table> */}
                                        {/* {selectedDetail.length > 0 && (
                                    <ul style={{listStyleType: "none"}}>
                                    {selectedDetail.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                    </ul>
                                )} */}

                                        <button
                                            onClick={handleCloseModal}
                                            className={style.closeButton}
                                        >
                                            Close2
                                        </button>
                                    </div>
                                )}
                                {selectedImage === "cctv-icon-3.png" && (
                                    <div
                                        className={style.modal_1_form}
                                        onClick={handleModalContentClick}
                                    >
                                        {/* <video className={style.Bigvideo}
                            // width="620vw"
                            // height="420vh"
                            controls
                            autoPlay
                            muted
                        >
                            <source
                            src={process.env.PUBLIC_URL + "/videos/g3.mp4"}
                            type="video/mp4"
                            style={{
                                width: "80%",
                                height: "200%",
                                position: "relative",
                                top: "-22%",
                            }}
                            />
                            Your browser does not support the video tag.
                        </video> */}

                                        {selectedLog && (
                                            <div>
                                                <video
                                                    className={style.modal_video}
                                                    key={selectedLog.cctvId}
                                                    controls
                                                    autoPlay
                                                    muted
                                                    loop
                                                >
                                                    <source
                                                        src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                                <>
                                                    <p>CCTV ID: {selectedLog.cctvId}</p>
                                                    <p>최신 감지 날짜: {selectedLog.detectedDate}</p>
                                                    <p>위험도: {selectedLog.riskIndex}</p>
                                                    <p>쓰레기 수: {selectedLog.objectCount}</p>
                                                    {/* <p>{goheungWeatherInfo}</p> */}
                                                </>
                                            </div>
                                        )}

                                        <div>
                                            {/* <p>3번 CCTV / 목포 / 아마도</p> */}
                                            <div style={{ height: "1vh" }}>
                                                <div className={style.weatherinfo}>
                                                    <div>{/* latestLogs를 사용하여 UI 렌더링 */}</div>
                                                </div>
                                            </div>
                                            {/* <table>
                                {selectedImage === "cctv-icon-3.png" && mokpoTableBody}
                            </table> */}
                                        </div>
                                        <button
                                            onClick={handleCloseModal}
                                            className={style.closeButton}
                                        >
                                            Close3
                                        </button>
                                    </div>
                                )}
                                {selectedImage === "cctv-icon-4.png" && (
                                    <div
                                        className={style.modal_1_form}
                                        onClick={handleModalContentClick}
                                    >
                                        <div>
                                            {selectedLog && (
                                                <div>
                                                    <video
                                                        className={style.modal_video}
                                                        key={selectedLog.cctvId}
                                                        controls
                                                        autoPlay
                                                        muted
                                                        loop
                                                    >
                                                        <source
                                                            src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`}
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                    <p>CCTV ID: {selectedLog.cctvId}</p>
                                                    <p>최신 감지 날짜: {selectedLog.detectedDate}</p>
                                                    <p>위험도: {selectedLog.riskIndex}</p>
                                                    <p>쓰레기 수: {selectedLog.objectCount}</p>
                                                    {/* <MaterialChart logData={selectedLog} /> */}
                                                    {/* <MaterialChart cctvId={selectedLog.cctvId} /> */}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {/* <p>4번 CCTV / 거제시 / 그럴껄</p> */}
                                            <div style={{ height: "1vh" }}>
                                                <div className={style.weatherinfo}>
                                                    {/* {ulsanWeatherInfo} */}
                                                </div>
                                            </div>

                                            <table>
                                                {/* {selectedImage === "cctv-icon-4.png" && geojeTableBody} */}
                                            </table>
                                        </div>
                                        <button onClick={handleCloseModal} className={style.closeButton}>Close4</button>

                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                    <div className={style.sub_title}>
                        해안쓰레기 현황 지도
                        <span className={style.clock}>
                            {currentTime.toLocaleTimeString()}
                        </span>
                    </div>
                    <div className={style.sub_1}>
                        <div className={style.sub_1_1}>
                            {/* 기존의 조건에 따른 렌더링 로직을 유지하면서, 추가적으로 사용자가 아무런 아이콘도 클릭하지 않았을 때의 조건을 추가합니다. */}
                            {selectedImage ? (
                                <>
                                    {/* 사용자가 선택한 이미지에 따른 정보 또는 차트 렌더링 */}
                                    {
                                        (selectedImage === "cctv-icon-2.png" ||
                                            selectedImage === "cctv-icon-3.png" || selectedImage === "cctv-icon-4.png") && (
                                            <div>
                                                {selectedLog && (
                                                    <div>
                                                        <MaterialChart logData={selectedLog} />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                    {selectedImage === "cctv-icon-1.png" && (
                                        <div>
                                            <MaterialChart2 data={selectedLog} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                // 사용자가 아무런 아이콘도 클릭하지 않았을 경우 보여줄 내용
                                <div className={style.circle_info}>
                                    <p className={style.circle_info_detail}>지도에 나타난 <span className={style.circle_info_detail_red}>붉은 원</span>은</p>
                                    <p className={style.circle_info_detail}><span className={style.circle_info_detail_blue}>해안쓰레기 탐지 갯수</span>에 따라 실시간으로 변화합니다.</p>
                                    <p className={style.circle_info_detail2}>지도에 나타난
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                            alt="logo"
                                            className={style.cctv_info_detail}
                                        /> CCTV 이미지를 클릭하시면</p>
                                    <p className={style.circle_info_detail}>해안 쓰레기 상세 내용과
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/cctv-icon-1.png`}
                                            alt="logo"
                                            className={style.cctv_info_detail}
                                        /> CCTV 영상을</p>
                                    <p className={style.circle_info_detail}>확인하실 수 있습니다.</p>
                                </div>
                            )}
                        </div>

                        <div className={style.sub_1_2}>
                            {selectedImage ? (
                                <table
                                    border="1"
                                    cellSpacing="0"
                                    className={style.sub_1_table}
                                // style={{ width: '25vw' }}
                                >
                                    {selectedImage === "cctv-icon-1.png" && (
                                        <div className={style.sub_1_2_title}>포항지사</div>
                                    )}

                                    {selectedImage === "cctv-icon-1.png" && (
                                        <thead className={style.thead}>
                                            <tr>
                                                <th>cctv번호</th>
                                                <th>지역</th>
                                                <th>위치</th>
                                            </tr>
                                        </thead>

                                    )}

                                    {selectedImage === "cctv-icon-1.png" && pohangTableBody}
                                    {/* {pohangTableBody} */}


                                    {selectedImage === "cctv-icon-2.png" && (
                                        <div className={style.sub_1_2_title}>울산지사</div>
                                    )}

                                    {selectedImage === "cctv-icon-2.png" && (
                                        <thead className={style.thead}>
                                            <tr>
                                                <th>인덱스번호</th>
                                                <th>지역</th>
                                                <th>위치</th>
                                            </tr>
                                        </thead>
                                    )}

                                    {selectedImage === "cctv-icon-2.png" && ulsanTableBody}

                                    {selectedImage === "cctv-icon-3.png" && (
                                        <div className={style.sub_1_2_title}>목포지사</div>
                                    )}

                                    {selectedImage === "cctv-icon-3.png" && (
                                        <thead className={style.thead}>
                                            <tr>
                                                <th>인덱스번호</th>
                                                <th>지역</th>
                                                <th>위치</th>
                                            </tr>
                                        </thead>
                                    )}

                                    {selectedImage === "cctv-icon-3.png" && mokpoTableBody}

                                    {/* {selectedImage === "cctv-icon-3.png" && (
                    <tbody>
                        {mokpoData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                className={`${style.cell} ${
                                colIndex > 0 ? style.clickable : ""
                                }`}
                                onClick={() => {
                                handleClick(cell);
                                }}
                                style={{ height: "1vh", width: "20vw" }}
                            >
                                {cell}
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    )} */}
                                    {selectedImage === "cctv-icon-4.png" && (
                                        <thead className={style.thead}>
                                            <tr>
                                                <th>인덱스번호</th>
                                                <th>지역</th>
                                                <th>위치</th>
                                            </tr>
                                        </thead>
                                    )}

                                    {selectedImage === "cctv-icon-4.png" && geojeTableBody}

                                </table>
                            ) : (
                                // 사용자가 아무 카메라도 클릭하지 않았을 때의 메시지
                                <div className={style.trash_detection}>
                                    오늘 탐지된 쓰레기의 총 개수: {totalDetectedTrash}개
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={style.sub_2}>
                        <div className={style.sub_2_1}>
                            <div className={style.sub_2_1_title}>2_1</div>
                            {/* <img
                                src={process.env.PUBLIC_URL + '/images/cctv-icon-2.png'}
                                alt="cctv-icon-2.png"
                                onClick={() => handleIconClick('cctv-icon-2.png')}
                                className={`${style.icon} ${style.icon2}`}
                            />
                            <img
                                src={process.env.PUBLIC_URL + '/images/cctv-icon-3.png'}
                                alt="cctv-icon-3.png"
                                onClick={() => handleIconClick('cctv-icon-3.png')}
                                className={`${style.icon} ${style.icon3}`}
                                style={{ top: '30px', left: '40px' }}
                            /> */}
                            {images.map((image, index) => {
                                const cctvId = index + 1;
                                const counts = objectCounts[cctvId] || []; // 현재 CCTV의 로그 배열을 가져옵니다.
                                // const circleSize = calculateCircleSize(counts); // 원의 크기를 결정합니다. (이 함수는 이미 존재해야 합니다.)

                                return (
                                    <div key={index} style={{ position: 'relative' }}>
                                        <img
                                            src={process.env.PUBLIC_URL + `/images/${image}`}
                                            alt={`Thumbnail ${image}`}
                                            className={`${style.thumbnail} ${style[`cctv-${cctvId}`]}`}
                                            onClick={() => handleImageClick(image)}
                                        />
                                        {/* 여기서 CameraCircle에 size와 count를 전달합니다. */}
                                        <div className={style.cameraCircleWrapper}>
                                            <CameraCircle count={counts.length > 0 ? counts[0] : 0} cctvId={cctvId} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={style.sub_2_2}>
                            <img className={style.map} src="/korea2.png" alt="지도사진" />
                            {/* {showModal && selectedLog && (
        <div>
            <CCTVModal
            logData={selectedLog}
            onClose={() => setShowModal(false)} // 모달을 닫기 위한 함수 prop
            />
        </div>
            )} */}
                            {/* <RedDot x={16.8} y={80} id="redDot1" onClick={() => handleCCTVClick(1)}/> */}
                            {/* <RedDot w={1} h={1} id="redDot1" /> */}
                            {/* <RedDot x={16.8} y={80} id="redDot2" onClick={() => handleCCTVClick(2)}/> */}
                            {/* <RedDot w={1} h={1} id="redDot2" /> */}
                            {/* <div id="map" className={style.map}>여긴어디</div> */}
                        </div>
                    </div>

                    <div className={style.sub_3}>
                        {/* sub_3 */}
                        {selectedImage === "cctv-icon-1.png" && (
                            <div className={style.weather}>
                                {pohangWeatherInfo}
                                {/* {showModal && showDetails && ( */}
                                <div>
                                    {/* <CCTVModal
            logData={selectedLog}
            
            onClose={() => setShowModal(false)} // 모달을 닫기 위한 함수 prop
            /> */}
                                    {showModal && (
                                        <CCTVModal accessToken={accessToken} onClose={handleCloseModal} />

                                        // <CCTVModal
                                        // //   accessToken={accessToken}
                                        //   onClose={() => setShowModal(false)}
                                        //   logData={selectedLog} // 필요한 경우
                                        // />
                                    )}
                                </div>
                                {/* )} */}
                            </div>
                        )}



                        {selectedImage === "cctv-icon-2.png" && (
                            <div className={style.weather}>
                                {ulsanWeatherInfo}
                            </div>
                        )}
                        {selectedImage === "cctv-icon-3.png" && (
                            <div className={style.weather}>
                                {/* 고흥 */}
                                {goheungWeatherInfo}
                                {/* 여수 */}
                                {yeosuWeatherInfo}
                                {/* ___________________________________________ */}
                                {wandoWeatherInfo}
                                {/* _______________________________________________________ */}
                                {ShinanWeatherInfo}

                                <h2> 순천 날씨 정보</h2>
                                {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                                <Weather
                                    onPohangWindSpeedData={() => { }}
                                    onPohangTMXData={() => { }}
                                    onPohangTMNData={() => { }}
                                    onUlsanWindSpeedData={() => { }}
                                    onUlsanTMXData={() => { }}
                                    onUlsanTMNData={() => { }}
                                    onGoheungWindSpeedData={() => { }}
                                    onGoheungTMXData={() => { }}
                                    onGoheungTMNData={() => { }}
                                    onYeosuWindSpeedData={() => { }}
                                    onYeosuTMXData={() => { }}
                                    onYeosuTMNData={() => { }}
                                    onWandoWindSpeedData={() => { }}
                                    onWandoTMXData={() => { }}
                                    onWandoTMNData={() => { }}
                                    onGeojeWindSpeedData={() => { }}
                                    onGeojeTMXData={() => { }}
                                    onGeojeTMNData={() => { }}
                                    onShinanWindSpeedData={() => { }}
                                    onShinanTMXData={() => { }}
                                    onShinanTMNData={() => { }}
                                    onSuncheonWindSpeedData={(item) => (
                                        <div>
                                            <p>풍속: {item.fcstValue} m/s</p>
                                            {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                        </div>
                                    )}
                                    onSuncheonTMXData={(item) => (
                                        <div>
                                            <p> 최고 기온 : {item.fcstValue} ℃</p>
                                            {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                        </div>
                                    )}
                                    onSuncheonTMNData={(item) => (
                                        <div>
                                            <p> 최저 기온 : {item.fcstValue} ℃</p>
                                            <p>
                                                기준 시간: {item.baseDate} {item.baseTime}
                                            </p>
                                        </div>
                                    )}
                                />

                                {/* <Weather onYeosuWindSpeedData={(item)=>(<div> <p>풍속: {item.fcstValue} m/s </p></div>   )} /> */}
                            </div>
                        )}
                        {selectedImage === "cctv-icon-4.png" && (
                            <div className={style.weather}>
                                <h2>거제 날씨 정보</h2>
                                {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                                <Weather
                                    onPohangWindSpeedData={() => { }}
                                    onPohangTMXData={() => { }}
                                    onPohangTMNData={() => { }}
                                    onUlsanWindSpeedData={() => { }}
                                    onUlsanTMXData={() => { }}
                                    onUlsanTMNData={() => { }}
                                    onGoheungWindSpeedData={() => { }}
                                    onGoheungTMXData={() => { }}
                                    onGoheungTMNData={() => { }}
                                    onYeosuWindSpeedData={() => { }}
                                    onYeosuTMXData={() => { }}
                                    onYeosuTMNData={() => { }}
                                    onWandoWindSpeedData={() => { }}
                                    onWandoTMXData={() => { }}
                                    onWandoTMNData={() => { }}
                                    onShinanWindSpeedData={() => { }}
                                    onShinanTMXData={() => { }}
                                    onShinanTMNData={() => { }}
                                    onSuncheonWindSpeedData={() => { }}
                                    onSuncheonTMXData={() => { }}
                                    onSuncheonTMNData={() => { }}
                                    onGeojeWindSpeedData={(item) => (
                                        <div>
                                            <p>풍속: {item.fcstValue} m/s</p>
                                            {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                        </div>
                                    )}
                                    onGeojeTMXData={(item) => (
                                        <div>
                                            <p> 최고 기온 : {item.fcstValue} ℃</p>
                                            {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                        </div>
                                    )}
                                    onGeojeTMNData={(item) => (
                                        <div>
                                            <p> 최저 기온 : {item.fcstValue} ℃</p>
                                            <p>
                                                기준 시간: {item.baseDate} {item.baseTime}
                                            </p>
                                        </div>
                                    )}
                                />
                            </div>
                        )}
                    </>
                    ) : (
                    <div className={style.homepage_announce}>
                        <p className={style.announce_title}>수거계약 공고</p>
                        < AnnounceListHomepage />
                    </div>
                        )}
                </div>
            </div>
        </div>
            {/* )} */ }

        </Wrapper >
    );
}

export default Homepage;
