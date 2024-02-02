// import React from 'react';
import React, { useEffect, useState } from "react";
// import Modal from './Modal';
import Weather from "./Weather";
import style from './Homepage.module.css';
import RedDot from "./RedDot";
// import GoogleMap from './GoogleMap';
// import Kakao from './kakao';
// const {kakao} = window;


const images = ['cctv-icon-1.png', 'cctv-icon-2.png','cctv-icon-3.png'];
// const videos = ['video1.mp4', 'video2.mp4'];
const iconMappings = {
    'cctv-icon-1.png': {
        image: 'cctv-icon-1.png',
        style: { top: '50%', position: 'absolute', right: '14%', margin: '0%' } // 스타일을 추가로 지정
    },
    'cctv-icon-2.png': {
        image: 'cctv-icon-2.png',
        style: { top: '64%', position: 'absolute', right: '10%' }, // 스타일을 추가로 지정
    },
    'cctv-icon-3.png': {
        image: 'cctv-icon-3.png',
        style: { top: '81%', position: 'absolute', right: '72%' }, // 스타일을 추가로 지정
    },
    // 다른 이미지에 대한 매핑 추가
};


function Homepage() {
    const data = [
        ['1', '인천시', '을왕리해수욕장'],
        ['2', '포항시', '구룡포앞바다'],
        ['3', '부산시', '해운대해수욕장']
    ]
    const handleClick = (value) => {
        alert(`Clicked: ${value}`);
    };

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
    const onPohangWindSpeedData = (item) => (
        <div>
            <p>최고 기온: {item.fcstValue} ℃</p>
            <p>풍속: {item.fcstValue} m/s</p>
            <p>기준 시간: {item.baseDate} {item.baseTime}</p>
        </div>
    );
    const onBusanWindSpeedData = (item) => (
        <div>
            <p>풍속: {item.fcstValue} m/s</p>
            <p>최고 기온: {item.fcstValue} ℃</p>
            <p>기준 시간: {item.baseDate} {item.baseTime}</p>
        </div>
    );

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

    const handleIconClick = (icon) => {
        console.log('Icon Clicked:', icon);
        console.log('Mapped Image:', iconMappings[icon]);
        const image = iconMappings[icon];
        if (image) {
            setSelectedImage(image);
            setModalOpen(true);
        }
    };



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



    return (
        <div className={style.home_box}>
            <div className={style.home_box_2}>
                <div className={style.sub_1}>

                    <div className={style.sub_1_1}>
                        <div className={style.sub_1_1_title}>메인_서브_1_1
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
                            <div className={style.modal}>
                                
                                {selectedImage === 'cctv-icon-1.png' && (

                                    // <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="Modal img2.jpg" 
                                    //     style={{ width: '110%', height: '200%', position: 'relative', top: '-22%'}}
                                    // />
                                    <video width="100%" height="250%" controls autoPlay muted>
                                        <source src={process.env.PUBLIC_URL + '/videos/sea.mp4'} type="video/mp4"
                                            style={{ width: '110%', height: '200%', position: 'relative' }}
                                        />
                                    </video>

                                )}

                                {selectedImage === 'cctv-icon-2.png' && (
                                    <div>
                                        <video width="100%" height="100%" controls autoPlay muted>
                                            <source src={process.env.PUBLIC_URL + '/videos/river.mp4'} type="video/mp4"
                                                style={{ width: '110%', height: '200%', position: 'relative', top: '-22%' }}
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                {selectedImage === 'cctv-icon-3.png' && (
                                    <div>
                                        <video width="100%" height="100%" controls autoPlay muted>
                                            <source src={process.env.PUBLIC_URL + '/videos/river.mp4'} type="video/mp4"
                                                style={{ width: '110%', height: '200%', position: 'relative', top: '-22%' }}
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <button onClick={handleCloseModal}>Close Modal</button>
                            </div>
                        )}</div>


                    </div>

                    <div className={style.sub_1_2}>
                        <div className={style.sub_1_2_title}>메인_서브_1_2</div>
                        <table border="1" cellspacing="0" className={style.sub_1_table}>

                            <thead>
                                <tr>
                                    <th>인덱스번호</th>
                                    <th>지역</th>
                                    <th>위치</th>
                                </tr>
                            </thead>

                            <tbody>
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
                                className={`${style.thumbnail} ${selectedImage === image ? style.selected : ''}`}
                                style={{ zIndex: index + 1, position: selectedImage === image ? 'relative' : 'absolute', ...iconMappings[image]?.style }}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>

                    <div className={style.sub_2_2}>서브 2_2
                    <RedDot x={60} y={87} id="redDot1"/>
                    <RedDot x={47} y={83.5} id="redDot2" />
                        <div id="map" className={style.map}></div>

                    </div>
                </div>

                <div className={style.sub_3}>sub_3

                    {selectedImage === 'cctv-icon-1.png' && (
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
                                        <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                                    </div>

                                )}
                                onUlsanWindSpeedData={() => { }}
                                onUlsanTMXData={() =>{}}
                                onUlsanTMNData={() => {}}
                            />
                        </div>
                    )}
                    {selectedImage === 'cctv-icon-2.png' && (
                        <div>
                            <h2>울산 날씨 정보</h2>
                            {/* Weather 컴포넌트에서 받아온 부산 풍속 정보 표시 함수 */}
                            <Weather
                                onPohangWindSpeedData={() => { }}
                                onPohangTMXData={() => {}}
                                onPohangTMNData={() => {}}

                                onUlsanWindSpeedData={(item) => (
                                    <div>
                                        <p>풍속: {item.fcstValue} m/s</p>
                                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                    </div>
                                )}
                                onUlsanTMXData={(item) =>(
                                    <div>
                                        <p> 최고 기온 : {item.fcstValue} ℃</p>
                                        {/* <p>기준 시간: {item.baseDate} {item.baseTime}</p> */}
                                    </div>
                                )}
                                onUlsanTMNData={(item) => (
                                    <div>
                                        <p> 최저 기온 : {item.fcstValue} ℃</p>
                                        <p>기준 시간: {item.baseDate} {item.baseTime}</p>
                                    </div>

                                )}

                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Homepage;