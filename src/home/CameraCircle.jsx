import React from 'react';
import './Homepage.module.css'; // 원하는 스타일링을 위한 CSS

const CameraCircle = ({ objectCount }) => {
    const circleSize = objectCount * 10; // objectCount에 따라 크기 조정, 기준은 변경 가능
    const circleStyle = {
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        backgroundColor: 'red',
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    };
    console.log(objectCount)

    return <div style={circleStyle}>
    </div>;
};

export default CameraCircle;