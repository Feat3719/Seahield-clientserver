import { useEffect, useRef, useState } from 'react';
import Sidenav from '../sidenav/Sidenav';
import style from './Intro.module.css';

function Intro() {
    const videoSrc = `${process.env.PUBLIC_URL}/videos/turtle.mp4`; // 비디오 파일 경로 설정
    const videoSrc2 = `${process.env.PUBLIC_URL}/videos/trashsea.mp4`; // 비디오 파일 경로 설정
    const introRef = useRef(null); // intro div에 대한 ref를 생성합니다.
    const [timer, setTimer] = useState(null); // 타이머 상태 추가

    useEffect(() => {
        if (introRef.current) {
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { width, height, top, left } = introRef.current.getBoundingClientRect();
                const x = (clientX - left) / width * 100;
                const y = (clientY - top) / height * 100;

                introRef.current.style.setProperty('--x', `${x}%`);
                introRef.current.style.setProperty('--y', `${y}%`);

                if (timer) {
                    clearTimeout(timer); // 기존 타이머가 있다면 초기화
                }

                // 마우스가 멈춘 후 1초 후에 다시 비디오 위치를 초기 위치로 설정
                setTimer(setTimeout(() => {
                    introRef.current.style.setProperty('--x', '50%');
                    introRef.current.style.setProperty('--y', '50%');
                }, 1000));
            };

            const introElement = introRef.current;
            introElement.addEventListener('mousemove', handleMouseMove);

            return () => {
                introElement.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, [timer]); // timer가 변경될 때마다 useEffect가 실행됩니다.

    return (
        <div className={style.intro} ref={introRef}>
            <video autoPlay loop muted className={style.videoBg}>
                <source src={videoSrc} type="video/mp4" />
            </video>
            <video autoPlay loop muted className={style.videoBg2}>
                <source src={videoSrc2} type="video/mp4" />
            </video>
            {/* <img src={`${process.env.PUBLIC_URL}/img/user1.svg`} alt="user" className={style.trashBg} /> */}
            <div className={style.login_nav}>
                <Sidenav />
            </div>
        </div>
    )
}

export default Intro;




// function Intro() {
//     const [eyes, setEyes] = useState([]);

//     useEffect(() => {
//         const newEyes = [];
//         for (let i = 0; i < 10; i++) {
//             const x = Math.random() * 100;
//             const y = Math.random() * 100;
//             newEyes.push({ id: i, x, y, isVisible: true });
//         }
//         setEyes(newEyes);
//     }, []);

//     const handleMouseEnter = (id) => {
//         setEyes(eyes => eyes.map(eye => eye.id === id ? { ...eye, isVisible: false } : eye));
//     };

//     return (
//         <div className={style.intro}>
//             {eyes.map(eye => eye.isVisible && (
//                 <motion.div
//                     key={eye.id}
//                     initial={{ opacity: 1, scale: 1 }}
//                     whileHover={{ opacity: 0, scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     className={style.eye}
//                     style={{
//                         left: `${eye.x}vw`,
//                         top: `${eye.y}vh`,
//                     }}
//                     onMouseEnter={() => handleMouseEnter(eye.id)}
//                 />
//             ))}
//             <div className={style.login_nav}>
//                 <Sidenav />
//             </div>
//         </div>
//     )
// }

// export default Intro;
