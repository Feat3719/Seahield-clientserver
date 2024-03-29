import { Link } from 'react-router-dom';
import Sidenav from '../sidenav/Sidenav';
import style from './SignupVer.module.css';
import { motion } from 'framer-motion'
import Wrapper from '../pagechange/Wrapper';

function SignupVer() {
    return (
        <Wrapper>
            <div className={style.signup}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>

                <motion.div
                    className={style.signup_area}
                    initial={{ y: -250, opacity: 0 }} // 시작 위치와 투명도
                    animate={{ y: 0, opacity: 1 }} // 끝 위치와 투명도
                    transition={{ duration: 0.6, delay: 0.2 }} // 애니메이션 지속 시간과 지연 시간
                >

                    <h1 className={style.signup_title}>
                        회원가입
                    </h1>

                    <div className={style.select_area}>
                        <Link to="/signup" className={style.select_area_link}>
                            <motion.div
                                className={style.select_area1}
                                whileHover={{ scale: 1.1 }} // hover 시에 scale을 1.1로 설정
                                transition={{ type: "hover", stiffness: 300 }} // spring 애니메이션 적용
                            >
                                <img src={`${process.env.PUBLIC_URL}/images/user1.svg`} alt="user" className={style.user1} />
                                <p className={style.select_1}>일반 회원</p>
                                <p className={style.select_2}>가입하기</p>
                            </motion.div>
                        </Link>

                        <Link to="/signup?isBusinessUser=true" className={style.select_area_link}>
                            <motion.div
                                className={style.select_area2}
                                whileHover={{ scale: 1.1 }} // hover 시에 scale을 1.1로 설정
                                transition={{ type: "hover", stiffness: 300 }} // spring 애니메이션 적용
                            >
                                <img src={`${process.env.PUBLIC_URL}/images/user2.svg`} alt="user" className={style.user2} />
                                <p className={style.select_1}>사업자</p>
                                <p className={style.select_2}>가입하기</p>
                            </motion.div>
                        </Link>

                    </div>


                </motion.div>


            </div>
        </Wrapper>
    )
}

export default SignupVer;