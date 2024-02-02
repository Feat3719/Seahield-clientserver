import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidenav from '../sidenav/Sidenav';
import style from './Signin.module.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate를 import
import { motion } from 'framer-motion';
import Swal from "sweetalert2";


function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberUsername, setRememberUsername] = useState(false);
    const navigate = useNavigate(); // useNavigate hook을 사용하여 navigation 인스턴스에 접근

    useEffect(() => {
        // 컴포넌트가 마운트될 때 localStorage에서 저장된 username을 가져옵니다.
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberUsername(true);
        }
    }, []);


    const handleSignin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/signin', {
                userId: username,
                userPwd: password,
            });

            // Response에서 accessToken과 refreshToken을 추출합니다.
            const { accessToken } = response.data;
            const refreshToken = response.headers['Set-Cookie'];

            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);

            // TODO: accessToken과 refreshToken을 적절히 처리 (예: 저장, 상태 업데이트 등)
            // 아이디 저장하기가 체크되어 있다면, username을 localStorage에 저장합니다.
            if (rememberUsername) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername'); // 체크되어 있지 않다면, 저장된 username을 제거합니다.
            }

            navigate('/'); // 사용자를 홈 페이지로 리다이렉트
        } catch (error) {
            console.error('로그인 실패:', error);
            Swal.fire({
                title: '로그인 실패',
                text: '로그인을 실패하였습니다.',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#e65a50b2',
            });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={style.signin}>
            <div className={style.signin_nav}>
                <Sidenav />
            </div>

            <motion.div
                className={style.signin_area}
                initial={{ y: -250, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className={style.signin_title}>
                    로그인
                </h1>

                <form className={style.signin_form} onSubmit={handleSignin}>
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
                            src={passwordVisible ? `${process.env.PUBLIC_URL}/img/eye1.svg` : `${process.env.PUBLIC_URL}/img/eye2.svg`}
                            className={style.eye_icon}
                            onClick={togglePasswordVisibility}
                            alt="Toggle password visibility"
                        />
                    </div>

                    <div className={style.remember_container}>
                        <input
                            id="rememberUsername"
                            type="checkbox"
                            checked={rememberUsername}
                            onChange={(e) => setRememberUsername(e.target.checked)}
                            className={style.remember_checkbox}
                        />
                        <label htmlFor="rememberUsername" className={style.remember_label}>아이디 저장하기</label>
                    </div>

                    <div className={style.links}>
                        <Link to="/idfind?type=idFind" className={style.link}>아이디 찾기</Link>
                        <p className={style.bar}>|</p>
                        <Link to="/idfind?type=passwordChange" className={style.link}>비밀번호 변경</Link>

                    </div>

                    <button type="submit" className={style.signin_button}>로그인</button>
                    <Link to="/signupver" className={style.signup_button}>회원가입</Link>
                </form>
            </motion.div>
        </div>
    )
}

export default Signin;
