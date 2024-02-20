import { useEffect, useRef, useState } from 'react';
import Sidenav from '../sidenav/Sidenav';
import style from './Intro.module.css';
import { Link } from 'react-router-dom/dist';
import { motion } from 'framer-motion';
import Wrapper from '../pagechange/Wrapper';

function Intro() {
    //애니메이션 효과
    // 애니메이션을 위한 초기 설정
    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 20 // 시작 위치를 아래로 조정
        },
        visible: (i) => ({
            opacity: 1,
            y: 0, // 최종 위치
            transition: {
                delay: i * 0.6 + 0.5, // 각 텍스트의 등장 시간을 차례대로 설정, 전체적인 시작 지연을 추가
                duration: 1.5, // 지속 시간을 늘려 천천히 올라오게 설정
                ease: "easeOut" // 부드러운 종료를 위한 easeOut 효과 적용
            }
        })
    };

    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                yoyo: Infinity // 무한 애니메이션
            }
        }
    };

    // const videoSrc = "https://drive.google.com/file/d/1V_iiZilc9v2DEe5E5qI5Xbb3WAbYmdom/preview";
    // const videoSrc = "https://drive.google.com/uc?export=view&amp;id=1V_iiZilc9v2DEe5E5qI5Xbb3WAbYmdom" type = "video/webm"";
    // const videoSrc = `http://wwww.googledrive.com/host/1V_iiZilc9v2DEe5E5qI5Xbb3WAbYmdom`
    // const videoSrc = `https://file.notion.so/f/f/9e5e212d-2340-4784-ae34-c3d4a315b169/30865d76-d337-4a0f-b867-5045a076dd86/ocean3.mp4?id=ca8490e1-08ec-489b-b6d4-6b45e41e0968&table=block&spaceId=9e5e212d-2340-4784-ae34-c3d4a315b169&expirationTimestamp=1707264000000&signature=Lf6trndm9FWO0TScEMWUzWE7tT9zZxjYx7aJ1W_E0W8&downloadName=ocean3.mp4`; // 비디오 파일 경로 설정
    const videoSrc = `${process.env.PUBLIC_URL}/videos/ocean3.mp4`; // 비디오 파일 경로 설정
    const videoSrc2 = `${process.env.PUBLIC_URL}/videos/trashsea.mp4`; // 비디오 파일 경로 설정
    const introRef = useRef(null); // intro div에 대한 ref를 생성합니다.
    const [timer, setTimer] = useState(null); // 타이머 상태 추가

    useEffect(() => {
        const introElement = introRef.current;

        if (!introElement) {
            return;
        }

        // 마우스를 따라 움직이는 투명한 영역
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { width, height, top, left } = introElement.getBoundingClientRect();
            const x = (clientX - left) / width * 100;
            const y = (clientY - top) / height * 100;

            introElement.style.setProperty('--x', `${x}%`);
            introElement.style.setProperty('--y', `${y}%`);

            if (timer) {
                clearTimeout(timer); // 기존 타이머가 있다면 초기화
            }

            // 마우스가 멈춘 후 1초 후에 다시 비디오 위치를 초기 위치로 설정
            setTimer(setTimeout(() => {
                // 컴포넌트가 언마운트된 후 타이머가 실행되는 것을 방지
                if (introElement) {
                }
            }, 1000));
        };

        introElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            introElement.removeEventListener('mousemove', handleMouseMove);
            // 타이머가 있으면 컴포넌트 언마운트 시 정리
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]); // timer가 변경될 때마다 useEffect가 실행됩니다.

    return (
        <Wrapper>
            <div className={style.intro} ref={introRef}>
                <video autoPlay loop muted className={style.videoBg}>
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <video autoPlay loop muted className={style.videoBg2}>
                    <source src={videoSrc2} type="video/mp4" />
                </video>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>
                {/* <img src={`${process.env.PUBLIC_URL}/images/seahield_logo.png`} alt="logo" className={style.logo} /> */}

                <div className={style.intro_main}>
                    <div className={style.intro_title}>

                        <motion.div
                            custom={0} // custom prop으로 순서를 전달
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className={style.intro_slogan}>아름다운 파도에 숨겨진 상처를</h1>
                        </motion.div>

                        {/* 두 번째 텍스트 */}
                        <motion.div
                            custom={1} // custom prop으로 순서를 전달
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className={style.intro_slogan}>치료해 주세요.</h1>
                        </motion.div>


                        <div className={style.mapButtonContainer}>
                            <motion.div variants={buttonVariants} whileHover="hover">
                                <Link to="/map" className={style.mapButton}>해안 쓰레기 지도 확인하러 가기
                                    <img src={`${process.env.PUBLIC_URL}/images/arrow.svg`} alt="arrow" className={style.arrow} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Intro;

