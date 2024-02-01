import React, { useState } from 'react';
import Sidenav from '../sidenav/Sidenav';
import style from './Signin.module.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 글자 보이기
    const [rememberUsername, setRememberUsername] = useState(false); // 아이디 저장하기 상태

    const handleSignin = () => {
        console.log('로그인 정보:', username, password);
        // 로그인 로직 구현
    };

    const togglePasswordVisibility = () => { // 비밀번호 가시성 토글 함수
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={style.signin}>
            <div className={style.signin_nav}>
                <Sidenav />
            </div>

            <motion.div
                className={style.signin_area}
                initial={{ y: -250, opacity: 0 }} // 시작 위치와 투명도
                animate={{ y: 0, opacity: 1 }} // 끝 위치와 투명도
                transition={{ duration: 0.6, delay: 0.2 }} // 애니메이션 지속 시간과 지연 시간
            >
                <h1 className={style.signin_title}>
                    로그인
                </h1>

                <div className={style.signin_form}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={style.signin_input}
                    />
                    <div className={style.password_container}>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.signin_input}
                        />
                        <img
                            src={passwordVisible ? `${process.env.PUBLIC_URL}/img/eye1.svg` : `${process.env.PUBLIC_URL}/img/eye2.svg`} // 상태에 따라 아이콘 변경
                            className={style.eye_icon}
                            onClick={togglePasswordVisibility} // 아이콘 클릭 이벤트
                            alt="Toggle password visibility"
                        />
                    </div>

                    <div className={style.remember_container}>
                        <input
                            id="rememberUsername" // input에 id 속성 추가
                            type="checkbox"
                            checked={rememberUsername}
                            onChange={(e) => setRememberUsername(e.target.checked)}
                            className={style.remember_checkbox}
                        />
                        <label htmlFor="rememberUsername" className={style.remember_label}>아이디 저장하기</label> {/* htmlFor 속성을 사용해 input과 라벨 연결 */}
                    </div>

                    <div className={style.links}> {/* 링크를 위한 div 추가 */}
                        <Link to="/" className={style.link}>아이디 찾기</Link>
                        <Link to="/" className={style.link}>비밀번호 찾기</Link>
                    </div>
                    <button type="submit" className={style.signin_button}>로그인</button> {/* type을 submit으로 변경 */}
                    <Link to="/signupver" className={style.signup_button}>회원가입</Link> {/* 회원가입 버튼의 type을 button으로 명시적으로 설정 */}
                </div>
            </motion.div>
        </div>
    )
}

export default Signin;