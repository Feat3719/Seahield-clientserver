import React from 'react';
import style from './Homepage.module.css';


const CameraCircle = ({ count, cctvId }) => {
    const baseSize = 4; // 원의 기본 크기
    const sizeIncrement = 0.3; // 카운트 증가에 따른 크기 증가량
    const actualSize = baseSize + count * sizeIncrement; // 실제 원의 크기

    // 원의 스타일 지정
    const locations = {
        '1': { left: '39vh', top: '22vw', name: '포항' }, // CCTV 1 위치 및 이름
        '2': { left: '33vh', top: '27vw', name: '울산' }, // CCTV 2 위치 및 이름
        '3': { left: '-1.5vw', top: '72vh', name: '고흥' }, // CCTV 3 위치 및 이름
        '4': { left: '10vh', top: '33.5vw', name: '거제' }  // CCTV 4 위치 및 이름
    };

    // 현재 CCTV ID에 해당하는 위치 정보를 가져옵니다.
    const { left, right, top, name } = locations[cctvId];

    const circleStyle = {
        position: 'absolute',
        width: `${actualSize}vh`,
        height: `${actualSize}vh`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0.2) 70%, rgba(255,0,0,0) 100%)',
        transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '12px',
        left: left,
        top: top,
        right: right,
        transform: 'translate(-50%, -50%)'
    };

    return (
        <div style={circleStyle}>
            <p className={style.circle_location}>{name}</p> {/* CCTV의 이름을 표시 */}
        </div>
    );
};

export default CameraCircle;