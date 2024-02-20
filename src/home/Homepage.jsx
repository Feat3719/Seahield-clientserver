    // import React from 'react';
    import React, { useEffect,useState } from "react";
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
// import VideoPlayer from "./VideoPlayer";
    // import GoogleMap from './GoogleMap';
    // import Kakao from './kakao';
    // const {kakao} = window;

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
    const accessToken = useSelector((state) => state.auth.accessToken);
    // const data = [
    //     ['1', '포항시', '구룡포앞바다'],
    //     ['2', '울산시', '울주진하해변']
    // ]

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
    const geojeData = [['10', "거제시", "거제 두모 몽돌 해변"]];

    // const detailItems = [
    //     ["포항구룡포 대보해변", "쓰레기","플라스틱 경고"],
    //     ["울산대왕암", "쓰레기","유리병 주의"],
    //     ["울주진하해변", "쓰레기","쓰레기 안전"],
    // ];

    // const [logdata, setLogs] = useState({});




    // const [currentVideo, setCurrentVideo] = useState("");

    // const [selectedCell, setSelectedCell] = useState('');

    // function showWeatherInfo(cellValue) {
    //   setSelectedCell(cellValue);
    // }
    // const [selectedDetail, setSelectedDetail] = useState([]);
    const [selectedLog, setSelectedLog] = useState(null);
    const [cctvLog, setCctvLog] = useState([]);

    // const [selectedId, setSelectedId] = useState(null);
    const [latestLogs, setLatestLogs] = useState([]);
    // const [selectedCctvId, setSelectedCctvId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    const [showDetails, setShowDetails] = useState(false); // 모달 표시 상태
    const [detail, setDetail] = useState([]); // 모달 표시 상태
    const [valuesArray, setValuesArray] = useState([]);
    // const [isweather, setIsweather] = useState(false);
    
    // const [userType, setUserType] = useState("");



    

    const handleShowDetails = () => {
        setShowModal(true); // 모달 표시
        setShowDetails(true); // 상세 정보 보여주기
    };
    
    
    // const handleCellClick = (cell) => {
    //     // cell 값이 CCTV ID일 경우 로그를 불러오는 함수를 호출합니다.
    //     if (cell === "1" || cell === "2") {
    //       fetchCCTVLogs(cell);
    //     }
    //   };
      
    //   const fetchCCTVLogs = async (cctvId) => {
    //     try {
    //       const response = await axios.get(`/api/cctv/logs/${cctvId}`, {
    //         headers: { Authorization: `Bearer ${accessToken}` },
    //       });
      
    //       // 응답으로부터 로그 데이터를 추출합니다.
    //       const cctvLogData = response.data;
      
    //       // 선택한 CCTV ID에 해당하는 로그 데이터로 상태를 업데이트합니다.
    //       setLatestLogs([{
    //         cctvId: parseInt(cctvId),
    //         ...cctvLogData, // 이 부분은 실제 응답 데이터 구조에 따라 달라질 수 있습니다.
    //       }]);
    //     } catch (error) {
    //       console.error(`Error fetching logs for CCTV ID ${cctvId}:`, error);
    //     }
    //   };


    //   const handleDetailClick = (cctvId) => {
    //     const parsedCctvId = parseInt(cctvId, 10);
    //     // latestLogs에서 클릭된 cctvId에 해당하는 로그 정보를 찾습니다.
        
    //     const logInfo = latestLogs.find(log => log.cctvId === parsedCctvId);
    //     if (logInfo) {
    //       setSelectedLog(logInfo);
    //     }
    //   };



    // const handleClick = (value) => {
    //     // 클릭된 셀의 값이 ID와 일치할 경우만 세부 정보를 찾습니다.
    //     // 이 예제에서는 pohangData의 첫 번째 원소가 ID로 가정합니다.
    //     const details = detailItems.find(item => item[0] === value);
    //     if (details) {
    //         // 찾은 세부 정보의 두 번째와 세 번째 원소를 상태에 설정합니다.
    //         // 예: ["1", "쓰레기","플라스틱 경고"]에서 "플라스틱 경고"만 추출합니다.
    //         setSelectedDetail(details.slice(2));
    //     } else {
    //         // 일치하는 세부 정보가 없을 경우 상태를 비웁니다.
    //         setSelectedDetail([]);
    //     }
    // };
    const handleClick1 = (cctvLogId) => {
        // console.log(`Clicked cctvId: ${cctvId}, Type: ${typeof cctvId}`);
        // console.log('Current latestLogs state:', latestLogs);
     //클릭한 배열의 값의 첫번째값으로 cctvId찾는 과정
    // 이거 안하면 +1된 cctvId찾아서 보여주게됨
        const logData = latestLogs.find(log => log.cctvId === String(cctvLogId));
        if (logData) {
            setSelectedLog(logData);
            setShowModal(true); // 클릭 시 모달을 표시하도록 상태 업데이트
            setShowDetails(false); // 상세 정보를 바로 보여주지 않도록 설정
            setCctvLog(logData)
            console.log('Selected log data:', logData);
    } else {
        console.log('No log data found for cctvId:', cctvLogId);
    }
};
    // const [selectedVideo, setSelectedVideo] = useState('');

    // const showVideo = (videoUrl) => {
    //   setSelectedVideo(videoUrl);
    // };
    // const closeModal = () => {
    //     setSelectedVideo('');
    //   };

    // const [selectedMarker, setSelectedMarker] = useState(null);

    //   const data_2 = [
    //     ['1', '인천시', '을왕리해수욕장', 37.393652, 126.310506, '인천시 을왕리해수욕장입니다.'],
    //     ['2', '포항시', '구룡포앞바다', 36.020709, 129.368262, '포항시 구룡포앞바다입니다.'],
    //     ['3', '부산시', '해운대해수욕장', 35.158292, 129.160948, '부산시 해운대해수욕장입니다.']
    //   ];

    //   useEffect(() => {
    //     const container = document.getElementById('map');
    //     const options = {
    //       center: new window.kakao.maps.LatLng(36.3055967, 126.5160485),
    //       level: 13
    //     };

    //     const map = new window.kakao.maps.Map(container, options);

    //     data_2.forEach((item) => {
    //       const [id, city, name, lat, lng, description] = item;

    //       const markerPosition = new window.kakao.maps.LatLng(lat, lng);

    //       const marker = new window.kakao.maps.Marker({
    //         position: markerPosition,
    //         title: name,
    //         map: map
    //       });

    //       kakao.maps.event.addListener(marker, 'click', function () {
    //         setSelectedMarker(item);
    //       });
    //     });
    //   }, []);

    //   const closeModal = () => {
    //     setSelectedMarker(null);
    //   };

    // 부모 컴포넌트에서 받아온 날씨 정보를 사용하는 함수
    // const onPohangWindSpeedData = (item) => (
    //     <div>
    //         <p>최고 기온: {item.fcstValue} ℃</p>
    //         <p>풍속: {item.fcstValue} m/s</p>
    //         <p>기준 시간: {item.baseDate} {item.baseTime}</p>
    //     </div>
    // );



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
        

        const handleCCTVIdClick = async (cctvLogId) => {
            try {
                const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // setDetail(response.data);
                setSelectedLog(response.data)
            } catch (error) {
                console.error("Error fetching CCTV detail:", error);
            }
        };

        useEffect(() => {
            const fetchCCTVDetail = async (cctvLogId) => {
                try {
                    const response = await axios.get(`/api/cctv/logs-dynamic-details/${cctvLogId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const details = response.data;
                    const valuesArray = Object.entries(details);
                    setValuesArray(valuesArray)
                    // setDetail(details); // 필요에 따라 상세 정보 상태를 업데이트
                    // setSelectedLog(details);를 아래와 같이 수정할 수 있습니다.
                    console.log(valuesArray+"@@@@@"); // 디버깅을 위해 상세 정보 콘솔에 출력
                    // 여기서 petBottlePer 값을 확인하거나 사용할 수 있습니다.
                    // 예를 들어, UI에 표시하고 싶다면 상태에 저장하고 해당 상태를 사용합니다.
                } catch (error) {
                    console.error("Error fetching CCTV detail:", error);
                }
            };
        
            if (selectedLog && selectedLog.cctvLogId) { // cctvLogId가 유효한 경우에만 fetchCCTVDetail 호출
                fetchCCTVDetail(selectedLog.cctvLogId);
            }
        }, [selectedLog?.cctvLogId, accessToken]); // 종속성 배열 수정
      

        // useEffect(() => {
        //     const fetchCCTVDetails = async () => {
        //         try {
        //             const response = await axios.get("/api/cctv/logs-dynamic", {
        //                 headers: {
        //                     Authorization: `Bearer ${accessToken}`,
        //                 },
        //             });
        //             // 딕셔너리 형태의 데이터를 [키, 값] 쌍의 배열로 변환
        //             const entriesArray = Object.entries(response.data);
        //             // 이후 각 [키, 값] 쌍을 처리하여 필요한 데이터 구조로 변환
        //             const logsArray = entriesArray.map(([key, value]) => ({
        //                 ...value, // 스프레드 연산자를 사용하여 값 객체의 모든 속성을 복사
        //                 logKey: key, // 필요하다면 키도 포함시킬 수 있음
        //             }));
        
        //             setCctvLog(prevLogs => {
        //                 const newLogs = logsArray.filter(newLog => 
        //                     !prevLogs.some(log => log.cctvLogId === newLog.cctvLogId));
        
        //                 if (newLogs.length > 0) {
        //                     return [...prevLogs, ...newLogs];
        //                 } else {
        //                     return prevLogs;
        //                 }
        //             });
        //         } catch (error) {
        //             console.error("Error fetching CCTV details:", error);
        //         }
        //     };
        
        //     const intervalId = setInterval(fetchCCTVDetails, 1000); // 1초마다 데이터 업데이트
        
        //     return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
        // }, [accessToken]);





        


        useEffect(() => {
            const fetchLatestLogs = async () => {
                const cctvIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                const logRequests = cctvIds.map(id =>
                    // axios.get(`/api/cctv//api/cctv/logs-static/${id}`, {
                    axios.get(`/api/cctv/logs-static-details/${id}`, {
                        params: { cctvId: id.toString() },
                        headers: { Authorization: `Bearer ${accessToken}` },
                    })
                    .then(response => ({
                        cctvId: id,
                        data: response.data
                    }))
                    .catch(error => console.error(`Error fetching logs for CCTV ID ${id}:`, error))
                );
                    
                const logResponses = await Promise.all(logRequests);
        
                const latestData = logResponses.map(({ cctvId, data }) => {
                    if (!data || !data.length) return null;
                    const latestLog = data.reduce((latest, current) => {
                        const latestDate = new Date(latest.detectedDate);
                        const currentDate = new Date(current.detectedDate);
                        return latestDate > currentDate ? latest : current;
                    });
                    return { cctvId, ...latestLog };
                }).filter(log => log !== null);
        
                setLatestLogs(latestData);
        
                // ID가 1인 CCTV의 최신 데이터를 알림으로 표시
                // const cctv1LatestLog = latestData.find(log => log.cctvId === 2);
                // if (cctv1LatestLog) {
                //     alert(`CCTV ID 1 Latest Log: ${cctv1LatestLog.detectedDate}`);
                // }
                // console.log("Latest logs:", latestData);
            };
        
            fetchLatestLogs();
        }, [accessToken]);
        


        // useEffect(() => {
        //     const fetchLatestLogs = async () => {
        //       const cctvIds = [1,2];
        //       const logRequests = cctvIds.map(id =>
        //         axios.get(`/api/cctv/logs/${id}`, {
        //           headers: { Authorization: `Bearer ${accessToken}` },
        //         })
        //       );
        
        //       const logResponses = await Promise.all(logRequests);
        //       const latestData = {};
        //       logResponses.forEach((response, index) => {
        //         const cctvId = cctvIds[index];
        //         if (response.status === 200 && response.data.length > 0) {
        //           latestData[cctvId] = response.data.sort((a, b) => new Date(b.detectedDate) - new Date(a.detectedDate))[0];
        //         }
        //       });
        //       setLatestLogs(latestData);
        //     };
        
        //     fetchLatestLogs();
        //   }, [accessToken]);



    // };

    // 유저정보 필요할때
    // useEffect(() => {
    //     const usercheck = async () => {
    //     const response = await axios.get("/api/user/info", {
    //         headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     if (response.status === 200) {
    //         setUserType(response.data.userType);

    //     } else {
    //         alert("다시 시도해 주세요");
    //         window.location.href = "/";
    //     }
    //     };
    //     usercheck();
    // }, [accessToken]);




      // pohangData를 렌더링하는 JSX를 변수에 할당
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
    const ulsanTableBody =(
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
    const   mokpoTableBody =(
        <tbody>
                        {mokpoData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                className={`${style.cell} ${
                                colIndex > 0 ? style.clickable : ""
                                }`}
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
    const geojeTableBody =(
        <tbody>
                        {geojeData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                className={`${style.cell} ${
                                colIndex > 0 ? style.clickable : ""
                                }`}
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
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
                    
                    />
                </div>
        )

        const ulsanWeatherInfo = (
            <div>
            <h2>울산 날씨 정보</h2>
                    {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                    <Weather
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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
        )
const goheungWeatherInfo = (
    <div>
        <h2>고흥 날씨 정보</h2>
                    {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                    <Weather
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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
)

    const yeosuWeatherInfo = (
        <div>
            <h2>여수 날씨 정보</h2>
                    {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                    <Weather
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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
    )

    const wandoWeatherInfo = (
        <div>
           <h2>완도 날씨 정보</h2>
                    {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                    <Weather
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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
    )

    const ShinanWeatherInfo = (
        <div>
            <h2> 신안 날씨 정보</h2>
                    {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                    <Weather
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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









// const videoUrl = [
//     'http://192.168.0.74:8000/static/webcamapp/video/video.mp4'
//   ];



    // const [smallScreenImage, setSmallScreenImage] = useState(null);

    // // 큰 화면으로 CCTV 영상을 열기
    // const handleOpenModal = (image) => {
    //   setModalOpen(true);
    //   setSelectedImage(image);
    //   setSmallScreenImage(null); // 큰 화면에서는 작은 화면 영상을 숨깁니다.
    // };


    return (
        <Wrapper>
            {/* 조건 추가가능 */}
            {/* {userType === "관리자"&&( */}
        <div className={style.home_box} style={{overflow:'hidden'}}>
            <div className={style.login_nav}>
            <Sidenav />
            </div>
            <div className={style.home_box_2} style={{overflow:'hidden'}}>
            <div >
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
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>

{/* {showModal && (
                <CCTVModal
                    accessToken={accessToken}
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
            <video className={style.modal_video} controls autoPlay muted loop>                           
            <source src={'http://192.168.0.74:8000/static/webcamapp/video/video.mp4'} type="video/mp4" />
            </video>
          {/* <video className={style.modal_video} key={selectedLog.cctvId} controls autoPlay muted>                           
            <source src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`} type="video/mp4" />
          </video> */}
          {/* {selectedLog.styrofoamPiecePer}
          <table className={style.logTable}>
        <thead>
            <tr>
                <th>CCTV ID</th>
                <th>CCTV LOG ID</th>
                <th>스티로폼 비율</th>
                <th>스티로폼 갯수</th>
                <th>최신 감지 날짜</th>
            </tr>
        </thead>
        <tbody>
        
                <tr >
                    <td className={style.cursorPointer}>{selectedLog?.cctvId ?? 'N/A'}</td>
                    <td>{selectedLog?.cctvLogId ?? 'N/A'}</td>
                    <td>{`${((selectedLog?.styrofoamPiecePer ?? 0) * 100).toFixed(2)}%`}</td>
                    <td>{`${selectedLog?.styrofoamPieceCnt ?? 0}개`}</td>
                    <td>{selectedLog?.detectedDate ?? 'N/A'}</td>
                </tr>
        </tbody>
    </table> */}
          {/* <p>위험도: {selectedLog.riskIndex}</p>
          <p>쓰레기 수: {selectedLog.objectCount}</p> */}
          {/* 상세 조회 버튼 추가 */}
          {/* <button onClick={handleShowDetails} className={style.detail_btn}>상세 조회</button> */}
          {/* <button onClick={handleCloseModal} className={style.closeButton}>Close</button> */}
          {/* <p>{goheungWeatherInfo}</p> */}
          {/* {console.log(`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`)} */}
        </div>
      )}
      {/* <div>
        {showModal && selectedLog && (
        <div>
            <CCTVModal
            logData={selectedLog}
            onClose={() => setShowModal(false)} // 모달을 닫기 위한 함수 prop
            />
        </div>
            )}
        </div> */}

                            {/* <p>1번 CCTV / 포항 / 구룡포</p> */}
                            <div style={{height:'1vh'}}>
                                <div className={style.weatherinfo}>
                                {/* {pohangWeatherInfo} */}
                                </div>

                                <div className={style.trashinfo}>
                                {/* 여기서부터 selectedDetail과 selectedLog 정보를 렌더링 */}
                                <div>
            {/* latestLogs를 사용하여 UI 렌더링 */}
            
        </div>
                                </div>
                            </div>
                            <table style={{height:'1vh'}}>
                                {/* {selectedImage === "cctv-icon-1.png" && pohangTableBody} */}
                                {/* <CCTVModal tableBody={pohangTableBody} /> */}
                            </table>
                                {/* {selectedDetail.length > 0 && (
                                    <ul className={style.sealist}>
                                    {selectedDetail.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                    </ul>
                                )} */}
                            {/* 모달 닫기 버튼 */}
                            {/* <CCTVModal icon="cctv-icon-1.png" /> */}
                            <button onClick={handleCloseModal} className={style.closeButton}>Close</button>
                        </div>
                        )}


                        {/* {selectedVideo && (
                                                    <div className="modal">
                                                    <div className="modal-content">
                                                        <button className="close-btn" onClick={closeModal}>Close</button>
                                                        <video controls width="100%" height="auto" src={process.env.PUBLIC_URL + '/videos/sea.mp4'} />
                                                    </div>
                                                    </div>
                                                )} */}

                        {selectedImage === "cctv-icon-2.png" && (
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
                        
                        {/* <video className={style.Bigvideo}
                            // width="620vw"
                            // height="420vh"
                            controls
                            autoPlay
                            muted
                        >
                            <source
                            src={process.env.PUBLIC_URL + "/videos/river.mp4"}
                            type="video/mp4"
                            style={{
                                width: "110%",
                                height: "200%",
                                position: "relative",
                                top: "-22%",
                            }}
                            />
                            Your browser does not support the video tag.
                        </video> */}

{selectedLog && (
        <div>
          <video className={style.modal_video} key={selectedLog.cctvId} controls autoPlay muted loop>                           
            <source src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`} type="video/mp4" />
          </video>
          <p>CCTV ID: {selectedLog.cctvId}</p>
          <p>최신 감지 날짜: {selectedLog.detectedDate}</p>
          <p>위험도: {selectedLog.riskIndex}</p>
          <p>쓰레기 수: {selectedLog.objectCount}</p>
          {/* {console.log(`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`)} */}
          {/* <p>{goheungWeatherInfo}</p> */}
        </div>
      )}

                        {/* <p>2번 CCTV / 울산 / 어딘가</p> */}
                    

                        <div style={{height:'1vh'}}>
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

<div>
            {/* latestLogs를 사용하여 UI 렌더링 */}
            
        </div>
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
                        
                        
                        <button onClick={handleCloseModal} className={style.closeButton}>Close2</button>
                        </div>
                        )}
                        {selectedImage === "cctv-icon-3.png" && (
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
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
          <video className={style.modal_video} key={selectedLog.cctvId} controls autoPlay muted loop>                           
            <source src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`} type="video/mp4" />
          </video>
            <>
          <p>CCTV ID: {selectedLog.cctvId}</p>
          <p>최신 감지 날짜: {selectedLog.detectedDate}</p>
          <p>위험도: {selectedLog.riskIndex}</p>
          <p>쓰레기 수: {selectedLog.objectCount}</p>
          {/* {console.log(`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`)} */}
          {/* <p>{goheungWeatherInfo}</p> */}
          </>
        </div>
      )}

                        <div>
                            {/* <p>3번 CCTV / 목포 / 아마도</p> */}
                        <div style={{height:'1vh'}}>
                                <div className={style.weatherinfo}>
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
        <div>
            {/* latestLogs를 사용하여 UI 렌더링 */}

        </div>


                                </div>
                            </div>
                        {/* <table>
                                {selectedImage === "cctv-icon-3.png" && mokpoTableBody}
                            </table> */}
                        </div>
                        <button onClick={handleCloseModal} className={style.closeButton}>Close3</button>
                        </div>
                        )}
                        {selectedImage === "cctv-icon-4.png" && (
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
                        {/* <video className={style.Bigvideo}
                            // width="620vw"
                            // height="420vh"
                            controls
                            autoPlay
                            muted
                        >
                            <source
                            src={process.env.PUBLIC_URL + "/videos/river.mp4"}
                            type="video/mp4"
                            style={{
                                width: "110%",
                                height: "200%",
                                position: "relative",
                                top: "-22%",
                            }}
                            />
                            Your browser does not support the video tag.
                        </video> */}
                        <div>
            
            {selectedLog && (
        <div>
          {/* {console.log(`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`)} */}
          <video className={style.modal_video} key={selectedLog.cctvId} controls autoPlay muted loop>                           
            <source src={`${process.env.PUBLIC_URL}/videos/g${selectedLog.cctvId}.mp4`} type="video/mp4" />
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
                        <div style={{height:'1vh'}}>
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
                    타이틀_관제시스템
                </div>
            <div className={style.sub_1}>
                <div className={style.sub_1_1}>
                {/* <div className={style.sub_title}>
                    메인_서브_1_1_관제시스템

                </div> */}
                {/* <MaterialChart cctvId={selectedLog.cctvId} /> */}

                {
                    (selectedImage === "cctv-icon-2.png"||
                    selectedImage === "cctv-icon-3.png"||selectedImage === "cctv-icon-4.png") &&(
                    <div>
                        {selectedLog && (
                            <div>
                            <MaterialChart logData={selectedLog}/>
                            </div>
                        )}                    
                    </div>
                    ) 
                }
                {selectedImage === "cctv-icon-1.png"&&(
                    <div>
                        <MaterialChart2 data={selectedLog} /> 
                    </div>
                )}
                {/* <div>
        {showModal && selectedLog && (
        <div>
            <CCTVModal
            logData={selectedLog}
            onClose={() => setShowModal(false)} // 모달을 닫기 위한 함수 prop
            />
        </div>
            )}
        </div> */}
                
                </div>

                <div className={style.sub_1_2}>
                {/* <div className={style.sub_1_2_title}>메인_서브_1_2</div> */}
                {/* <table border="1" cellspacing="0" className={style.sub_1_table}>

                                <thead>
                                    <tr>
                                        <th>인덱스번호</th>
                                        <th>지역</th>
                                        <th>위치</th>
                                    </tr>
                                </thead>

                                <tbody className={style.tbody}>
                                    {data.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, colIndex) => (
                                                <td key={colIndex}
                                                    className={`${style.cell} ${colIndex > 0 ? style.clickable : ''}`}
                                                    onClick={() => handleClick(cell)}>
                                                    {cell}
                                                </td>
                                            )
                                            )}
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table> */}
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
                {images.map((image, index) => (
                    <img
                    key={image}
                    src={process.env.PUBLIC_URL + `/images/${image}`}
                    alt={`Thumbnail ${image}`}
                    className={`${style.thumbnail} ${
                        style[`cctv-${index + 1}`]
                    } ${selectedImage === image ? style.selected : ""}`}
                    style={{
                        zIndex: index + 1,
                        position: selectedImage === image ? "absolute" : "absolute",
                        ...iconMappings[image]?.style,
                    }}
                    onClick={() => handleImageClick(image)}
                    />
                ))}
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
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onGeojeWindSpeedData={() => {}}
                    onGeojeTMXData={() => {}}
                    onGeojeTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
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
                    onPohangWindSpeedData={() => {}}
                    onPohangTMXData={() => {}}
                    onPohangTMNData={() => {}}
                    onUlsanWindSpeedData={() => {}}
                    onUlsanTMXData={() => {}}
                    onUlsanTMNData={() => {}}
                    onGoheungWindSpeedData={() => {}}
                    onGoheungTMXData={() => {}}
                    onGoheungTMNData={() => {}}
                    onYeosuWindSpeedData={() => {}}
                    onYeosuTMXData={() => {}}
                    onYeosuTMNData={() => {}}
                    onWandoWindSpeedData={() => {}}
                    onWandoTMXData={() => {}}
                    onWandoTMNData={() => {}}
                    onShinanWindSpeedData={() => {}}
                    onShinanTMXData={() => {}}
                    onShinanTMNData={() => {}}
                    onSuncheonWindSpeedData={() => {}}
                    onSuncheonTMXData={() => {}}
                    onSuncheonTMNData={() => {}}
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
            </div>
            </div>
        </div>
            {/* )} */}

        </Wrapper>
    );
    }

    export default Homepage;
