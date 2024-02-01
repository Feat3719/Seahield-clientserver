import React, { useEffect, useState } from 'react';
import Sidenav from '../sidenav/Sidenav';
import style from './Signup.module.css';
import { motion } from 'framer-motion';
import DaumPost from '../daumpost/DaumPost';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



function Signup() {
    const location = useLocation(); // location 객체를 사용합니다.
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 추가
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 가시성 상태
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 비밀번호 확인 가시성 상태
    const [isSmsSend, setIsSmsSend] = useState(false); //인증번호 발송
    const [timer, setTimer] = useState(null); // 타이머 상태 추가

    // 각 입력 필드가 한 번이라도 클릭되었는지 여부를 추적하는 상태 변수 추가
    const [useridTouched, setUseridTouched] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);

    //빈칸 검증
    const [isUserIdValid, setIsUserIdValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    // URL에서 쿼리 파라미터 파싱
    const queryParams = new URLSearchParams(location.search);
    const isBusinessUser = queryParams.get('isBusinessUser') === 'true';

    // 각 입력 필드의 onBlur 핸들러
    const handleUseridBlur = () => {
        setUseridTouched(true);
    };

    const handleUsernameBlur = () => {
        setUsernameTouched(true);
    };

    // 인증번호 입력값과 인증 상태를 관리하는 상태 변수 추가
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleVerificationSubmit = () => {
        // 인증번호 검증 로직
        // 예: 서버로 인증번호 검증 요청을 보내거나, 프론트엔드에서 간단한 검증 수행
        // 여기서는 예시로 입력된 인증번호가 '1234'일 경우를 인증 성공으로 가정
        if (verificationCode === '1234') {
            setIsVerified(true);
            alert('인증 성공!');
        } else {
            alert('인증번호가 일치하지 않습니다.');
        }
    };


    // handleSignup을 조정하여 필드 유효성을 확인
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isUserIdValid || !isUsernameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isVerified) {
            alert('모든 필드를 올바르게 채우고, 휴대폰 번호가 인증되었는지 확인해주세요.');
            return;
        }

        // 주소와 상세 주소를 합친 전체 주소
        const fullAddress = getFullAddress();

        // 백엔드로 보낼 데이터 구조를 맞춥니다.
        const signupData = {
            userId: userid,
            userPwd: password,
            userName: username,
            userEmail: email,
            userContact: phone,
            userAddress: fullAddress,
            userType: "일반",
        };

        try {
            const response = await axios.post("/api/auth/user", signupData);

            // 응답 상태 코드에 따른 처리
            if (response.status === 201) {
                // 회원가입 성공 로직
                if (window.confirm("회원가입을 성공했습니다. 로그인 화면으로 이동하시겠습니까?")) {
                    window.location.href = "/signin";
                } else {
                    window.location.href = "/";
                }
                // console.log('회원가입 성공:', response.data);
                // // 성공 시, 다른 페이지로 리다이렉트 혹은 사용자에게 성공 메시지 표시
            } else if (response.status === 404) {
                // 실패 로직
                console.log('회원가입 실패');
                // 실패 시, 사용자에게 실패 메시지 표시
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            alert('서버 오류가 발생했습니다.');
            // window.location.href = "/"; // 사용자를 홈페이지로 리다이렉트
        }
    };



    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    // 주소와 상세 주소를 합쳐서 하나의 문자열로 만드는 함수
    const getFullAddress = () => {
        return address + (detailAddress ? `, ${detailAddress}` : '');
    };

    const smsAuthBtn = async () => {
        setIsSmsSend(true);
        setTimer(180); // 타이머를 180초(3분)으로 설정
    }






    useEffect(() => {
        let interval = null;
        if (isSmsSend && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            // 타이머가 0이 되면 추가적인 처리를 할 수 있습니다 (예: 메시지 표시, 인증번호 입력 비활성화 등)
        }
        return () => clearInterval(interval);
    }, [isSmsSend, timer]);

    const formatTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }



    return (
        <div className={style.signup}>
            <div className={style.login_nav}>
                <Sidenav />
            </div>

            <motion.div
                className={style.signup_area}
                initial={{ y: -250, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h1 className={style.signup_title}>
                    회원가입
                </h1>

                <form className={style.signup_form} onSubmit={handleSignup}>

                    <div className={style.input_wrapper}>
                        <label className={style.input_label}>아이디</label>
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userid}
                            onChange={(e) => setUserid(e.target.value)}
                            onBlur={handleUseridBlur}
                            className={style.signup_input}
                        />
                        {!isUserIdValid && useridTouched && <div className={style.error_message}>값을 입력해주세요</div>}
                    </div>

                    <div className={style.input_wrapper}>
                        <label className={style.input_label}>이름</label>
                        <input type="text" placeholder="이름" value={username} onChange={(e) => setUsername(e.target.value)} className={style.signup_input} />
                        {!isUsernameValid && <div className={style.error_message}>값을 입력해주세요</div>}
                    </div>

                    <div className={style.input_wrapper}>
                        <label className={style.input_label}>비밀번호</label>
                        <div className={style.password_container}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={style.signup_input}
                            />
                            <img
                                src={passwordVisible ? `${process.env.PUBLIC_URL}/img/eye1.svg` : `${process.env.PUBLIC_URL}/img/eye2.svg`}
                                className={style.eye_icon}
                                onClick={togglePasswordVisibility}
                                alt="Toggle password visibility"
                            />
                        </div>
                    </div>

                    <div className={style.input_wrapper}>
                        <label className={style.input_label}>비밀번호 확인</label>
                        <div className={style.password_container}>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="비밀번호 확인"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={style.signup_input}
                            />
                            <img
                                src={confirmPasswordVisible ? `${process.env.PUBLIC_URL}/img/eye1.svg` : `${process.env.PUBLIC_URL}/img/eye2.svg`}
                                className={style.eye_icon}
                                onClick={toggleConfirmPasswordVisibility}
                                alt="Toggle confirm password visibility"
                            />
                        </div>
                    </div>

                    <div className={style.email_wrapper}>
                        <div className={style.email_put}>
                            <label className={style.input_label}>이메일</label>
                            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className={style.signup_input} />
                        </div>
                        <p className={style.email_how}>이메일은 아이디, 비밀번호 찾기에 활용됩니다. 실제 사용하는 이메일을 입력해주세요.</p>
                    </div>

                    <div className={style.input_with_button_wrapper}>
                        <div className={style.sms_wrapper}>
                            <label className={style.input_label}>연락처</label>
                            <div className={style.sms_button}>
                                <div className={style.sms_send}>
                                    <input type="text" placeholder="연락처" value={phone} onChange={(e) => setPhone(e.target.value)} className={style.signup_input} />
                                    <button type="button" onClick={smsAuthBtn} className={style.send_code_button}>인증번호발송</button>
                                </div>
                                {isSmsSend && (
                                    <div className={style.sms_verification}>
                                        <input className={style.sms_input} placeholder="인증번호를 입력하세요." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                                        <span className={style.timer}>{timer != null ? formatTimer() : ''}</span> {/* 타이머 표시 */}
                                        <button type="button" onClick={handleVerificationSubmit} className={style.submit_code_button}>제출</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className={style.input_with_button_wrapper}>
                        <div className={style.input_wrapper}>
                            <label className={style.input_label}>주소</label>
                            <div className={style.address_area}>
                                <div className={style.address_input_button}>
                                    <input
                                        type="text"
                                        value={address}
                                        className={style.signup_input1}
                                        readOnly
                                    />
                                    <DaumPost setAddress={setAddress} />
                                </div>
                                <input type="text" placeholder="상세주소를 입력하세요." value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} className={style.signup_input_detail} />
                            </div>
                        </div>
                    </div>

                    {isBusinessUser && (
                        <div className={style.input_wrapper}>
                            <label className={style.input_label}>사업자번호</label>
                            <input type="text" placeholder="사업자번호" className={style.signup_input} />
                            {/* 추가적인 사업자번호 인증 로직이 필요하다면 여기에 구현 */}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isUserIdValid || !isUsernameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isVerified}
                        className={style.signup_button}
                        onClick={() => {
                            if (!isUserIdValid || !isUsernameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isVerified) {
                                alert('모든 필수 항목을 채워주세요.');
                            }
                        }}
                    >
                        회원가입
                    </button>
                </form>


            </motion.div>
        </div>
    )
}

export default Signup;