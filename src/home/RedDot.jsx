import React, { useEffect } from 'react';
import style from './RedDot.module.css'

// const RedDot = ({ x, y, w, h }) => {
//   useEffect(() => {
//     const redDotElement = document.getElementById('redDot');
//     redDotElement.style.left = `${x}vw`;
//     redDotElement.style.top = `${y}vh`;
//     redDotElement.style.width = `5vh`;
//     redDotElement.style.height = `5vh`
//   }, [x, y]);

//   return (
//     <div id="redDot" className={style.RedDot}></div>
//   );
// };
// RedDot 컴포넌트 정의
const RedDot = ({ x, y, w, h, id, onClick }) => {
  // 원을 그릴지, 직사각형을 그릴지 결정하는 로직이 필요하다면 여기에 추가
  // 예시에서는 원을 그리는 것으로 진행
  return (
    <svg style={{ position: 'absolute', top: y, left: x, overflow: 'visible', cursor: 'pointer', zIndex: 1 }}>
      {/* 원을 그리는 경우 */}
      <circle cx="5" cy="0" r="10" fill="red" id={id} onClick={onClick} />
      {/* 직사각형을 그리는 경우 - 필요하다면 사용 */}
      {/* <rect width={w} height={h} fill="red" id={id} onClick={onClick} /> */}
    </svg>
  );
};
export default RedDot;