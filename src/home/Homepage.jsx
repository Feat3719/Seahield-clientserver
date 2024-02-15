    // import React from 'react';
    import React, { useState } from "react";
    // import Modal from './Modal';
    import Weather from "./Weather";
    import style from "./Homepage.module.css";
    import RedDot from "./RedDot";
    import Sidenav from "../sidenav/Sidenav";
    import Wrapper from "../pagechange/Wrapper";
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
    // const data = [
    //     ['1', '포항시', '구룡포앞바다'],
    //     ['2', '울산시', '울주진하해변']
    // ]

    const pohangData = [["1", "포항시", "포항구룡포 대보해변"]];
    const ulsanData = [
        ["1", "울산시", "울산대왕암"],
        ["2", "울산시", "울주진하해변"],
    ];

    const mokpoData = [
        ["1", "전남 고흥군", "고흥_신흥"],
        ["2", "전남 신안군", "신안고장리해변"],
        ["3", "전남 완도군", "완도신지도해변"],
        ["4", "전남 여수시", "여수백야도해변"],
        ["5", "전남 고흥군", "고흥염포해변"],
    ];
    const geojeData = [["1", "거제시", "거제 두모 몽돌 해변"]];

    // const [currentVideo, setCurrentVideo] = useState("");

    // const [selectedCell, setSelectedCell] = useState('');

    // function showWeatherInfo(cellValue) {
    //   setSelectedCell(cellValue);
    // }
    
    const handleClick = (value) => {
        alert(`Clicked: ${value}`);
        // const newVideoUrl = process.env.PUBLIC_URL + "/videos/river.mp4";
        // setCurrentVideo(newVideoUrl); 
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

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleImageClick = (image) => {
        if (selectedImage === image) {
        setSelectedImage(null);
        setModalOpen(false);
        } else {
        setSelectedImage(image);
        setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
        // 모달 내용 클릭 시 이벤트 버블링 방지
        const handleModalContentClick = (event) => {
            event.stopPropagation();
        };

    // const handleIconClick = (icon) => {
    //     console.log('Icon Clicked:', icon);
    //     console.log('Mapped Image:', iconMappings[icon]);
    //     const image = iconMappings[icon];
    //     if (image) {
    //         setSelectedImage(image);
    //         setModalOpen(true);
    //     }
    // };

    // const [selectedImage, setSelectedImage] = useState(images[0]);
    // const [isModalActive, setModalActive] = useState(false);

    // const handleImageClick = (image) => {
    //     setSelectedImage(image);
    //     setModalActive(true);
    // };

    // const handleCloseModal = () => {
    //     setSelectedImage(null);
    //     setModalActive(false);
    // };

      // pohangData를 렌더링하는 JSX를 변수에 할당
    const pohangTableBody = (
        <tbody className={style.tbody}>
        {pohangData.map((row, rowIndex) => (
            <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
                <td
                key={colIndex}
                className={`${style.cell} ${colIndex > 0 ? style.clickable : ""}`}
                onClick={() => handleClick(cell)}
                style={{ height: "1vh", width: "20vw" }}
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
    );
    const mokpoTableBody =(
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
    );




    return (
        <Wrapper>
        <div className={style.home_box}>
            <div className={style.login_nav}>
            <Sidenav />
            </div>
            <div className={style.home_box_2}>
            <div className={style.sub_1}>
                <div className={style.sub_1_1}>
                <div className={style.sub_1_1_title}>
                    메인_서브_1_1
                    {/* 모달 */}
                    {/* {selectedMarker && (
                                    <Modal closeModal={closeModal}>
                                    <div>
                                        <h2>{selectedMarker[2]}</h2>
                                        <p>{selectedMarker[5]}</p>
                                        <button onClick={closeModal}>닫기</button>
                                    </div>
                                    </Modal>
                                )} */}
                </div>
                <div className={style.modal_video}>
                    {isModalOpen && (
                    <div className={style.modal} onClick={handleCloseModal}>


                        {selectedImage === "cctv-icon-1.png" && (
                            // <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="Modal img2.jpg"
                        //     style={{ width: '110%', height: '200%', position: 'relative', top: '-22%'}}
                        // />
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
                            <video
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
                            </video>
                            <div><p>1번 CCTV / 포항 / 구룡포</p>
                            <table>
                                {selectedImage === "cctv-icon-1.png" && pohangTableBody}
                            </table>
                                
                            </div>
                            {/* 모달 닫기 버튼 */}
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
                        
                        <video
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
                        </video>
                        <div><p>2번 CCTV / 울산 / 어딘가</p>
                        <table>
                                {selectedImage === "cctv-icon-2.png" && ulsanTableBody}
                            </table>
                        </div>
                        <button onClick={handleCloseModal} className={style.closeButton}>Close</button>
                        </div>
                        )}
                        {selectedImage === "cctv-icon-3.png" && (
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
                        <video
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
                        </video>
                        <div><p>3번 CCTV / 목포 / 아마도</p>
                        <table>
                                {selectedImage === "cctv-icon-3.png" && mokpoTableBody}
                            </table>
                        </div>
                        <button onClick={handleCloseModal} className={style.closeButton}>Close</button>
                        </div>
                        )}
                        {selectedImage === "cctv-icon-4.png" && (
                        <div className={style.modal_1_form} onClick={handleModalContentClick}>
                        <video
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
                        </video>
                        <div><p>4번 CCTV / 거제시 / 그럴껄</p>
                        <table>
                                {selectedImage === "cctv-icon-4.png" && geojeTableBody}
                            </table>
                        </div>
                        <button onClick={handleCloseModal} className={style.closeButton}>Close</button>
                        </div>
                        )}
                        {/* <button onClick={handleCloseModal}>Close Modal</button> */}
                    </div>
                    )}
                </div>
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
                        <th>인덱스번호</th>
                        <th>지역</th>
                        <th>위치</th>
                        </tr>
                    </thead>
                    )}

                    {selectedImage === "cctv-icon-1.png" && pohangTableBody}


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

                {selectedImage === "cctv-icon-1.png" && ulsanTableBody}

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
                <div className={style.sub_2_1_title}>메인_서브_2_1</div>
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
                서브 2_2
                <RedDot x={16.8} y={80} id="redDot1" />
                {/* <RedDot w={1} h={1} id="redDot1" /> */}
                <RedDot x={16.8} y={80} id="redDot2" />
                {/* <RedDot w={1} h={1} id="redDot2" /> */}
                <div id="map" className={style.map}></div>
                </div>
            </div>

            <div className={style.sub_3}>
                sub_3
                {selectedImage === "cctv-icon-1.png" && (
                <div className={style.weather}>
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
                    />
                </div>
                )}
                {selectedImage === "cctv-icon-2.png" && (
                <div className={style.weather}>
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
                )}
                {selectedImage === "cctv-icon-3.png" && (
                <div className={style.weather}>
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
        </Wrapper>
    );
    }

    export default Homepage;
