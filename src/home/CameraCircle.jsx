import React from 'react';
import styles from './Homepage.module.css'; // CSS 모듈 임포트를 수정합니다.

const CameraCircle = ({ count, size = 'small' }) => {
    let baseSize = 10; // 기본 크기
    if (size === 'medium') {
        baseSize = 20; // 중간 크기
    } else if (size === 'large') {
        baseSize = 30; // 큰 크기
    }
    const actualSize = baseSize + count * 2; // count에 따라 조정된 실제 크기

    const circleStyle = {
        position: 'absolute',
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        borderRadius: '50%',
        backgroundColor: 'red',
        zIndex: 1000,
    };

    return <div style={circleStyle}></div>;
};


export default CameraCircle;